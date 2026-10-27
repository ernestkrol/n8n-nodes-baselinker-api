import {
	IExecuteFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	IPollFunctions,
	JsonObject,
	NodeApiError,
	IHttpRequestOptions,
	IDataObject,
} from 'n8n-workflow';
import { IBaseLinkerApiResponse, IBaseLinkerOrder, IGetOrdersFilterParameters, IBaseLinkerPickList } from './Orders/OrdersInterface';
import { IBaseLinkerStatus } from './OrderStatus/OrderStatusInterface';
import { IBaseLinkerCrmClient } from './Crm/CrmInterface';
import { IBaseLinkerInvoice, IBaseLinkerReceipt } from './Invoices/InvoicesInterface';
import {
	IBaseLinkerProductListItem,
	IBaseLinkerProductStockItem,
	IBaseLinkerProductPriceItem,
	IBaseLinkerProductLog,
	IBaseLinkerManufacturer,
} from './ProductCatalog/ProductCatalogInterface';
import { IBaseLinkerOrderReturn, IGetOrderReturnsFilterParameters } from './OrderReturns/OrderReturnsInterface';
import {
	IBaseLinkerExternalProductListItem,
	IBaseLinkerExternalProductQuantityItem,
	IBaseLinkerExternalProductPriceItem,
} from './ExternalStorages/ExternalStoragesInterface';

/**
 * Utility function to sleep for a specified amount of milliseconds
 */
export const sleep = (ms: number): Promise<void> =>
	new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Normalizes date / timestamp input into a UNIX timestamp in seconds
 */
export function normalizeTimestamp(value: unknown): number | undefined {
	if (value === undefined || value === null || value === '') {
		return undefined;
	}

	if (typeof value === 'number') {
		// If in milliseconds (more than 10 digits), convert to seconds
		if (value > 9999999999) {
			return Math.floor(value / 1000);
		}
		return Math.floor(value);
	}

	if (typeof value === 'string') {
		const trimmed = value.trim();
		if (/^\d+$/.test(trimmed)) {
			const num = parseInt(trimmed, 10);
			if (num > 9999999999) {
				return Math.floor(num / 1000);
			}
			return num;
		}

		// Try parsing ISO date or standard date string
		const parsedDate = new Date(trimmed);
		if (!isNaN(parsedDate.getTime())) {
			return Math.floor(parsedDate.getTime() / 1000);
		}
	}

	return undefined;
}

/**
 * Make an API request to BaseLinker
 */
export async function baselinkerApiRequest(
	this: IExecuteFunctions | IHookFunctions | ILoadOptionsFunctions | IPollFunctions,
	method: string,
	parameters: IDataObject = {},
): Promise<IBaseLinkerApiResponse> {
	const credentials = await this.getCredentials('baseLinkerApi');

	if (!credentials || !credentials.token) {
		throw new NodeApiError(this.getNode(), {
			message: 'BaseLinker credentials are missing or token is not provided',
		} as JsonObject);
	}

	const token = credentials.token as string;
	const apiUrl = ((credentials.apiUrl as string) || 'https://api.baselinker.com/connector.php').trim();

	const bodyParams = new URLSearchParams();
	bodyParams.append('method', method);
	bodyParams.append('parameters', JSON.stringify(parameters));

	const options: IHttpRequestOptions = {
		method: 'POST',
		url: apiUrl,
		headers: {
			'X-BLToken': token,
		},
		body: bodyParams,
		json: true,
	};

	let response: IBaseLinkerApiResponse;
	try {
		response = (await this.helpers.httpRequest(options)) as IBaseLinkerApiResponse;
	} catch (error: any) {
		throw new NodeApiError(this.getNode(), error as JsonObject, {
			message: `Failed to connect to BaseLinker API: ${error.message || error}`,
		});
	}

	if (!response) {
		throw new NodeApiError(this.getNode(), {
			message: 'Empty response received from BaseLinker API',
		} as JsonObject);
	}

	// BaseLinker returns HTTP 200 even on logical errors, with status: 'ERROR'
	if (response.status === 'ERROR') {
		throw new NodeApiError(this.getNode(), response as unknown as JsonObject, {
			message: `BaseLinker API error [${response.error_code || 'UNKNOWN'}]: ${response.error_message || 'No error message provided'}`,
		});
	}

	return response;
}

/**
 * Handles pagination for getOrders method with customizable cursor and delay
 */
export async function baselinkerGetOrdersAll(
	this: IExecuteFunctions,
	initialParameters: IGetOrdersFilterParameters,
	paginationOptions: {
		returnAll: boolean;
		limit: number;
		paginationField: 'date_confirmed_from' | 'date_from' | 'id_from';
		delayMs: number;
	},
): Promise<IBaseLinkerOrder[]> {
	const { returnAll, limit, paginationField, delayMs } = paginationOptions;
	const allOrders: IBaseLinkerOrder[] = [];
	const currentParams: IGetOrdersFilterParameters = { ...initialParameters };

	let lastCursorValue: number | undefined = undefined;
	const maxSafetyIterations = 1000;
	let iteration = 0;

	while (iteration < maxSafetyIterations) {
		iteration++;

		const response = await baselinkerApiRequest.call(this, 'getOrders', currentParams);
		const orders: IBaseLinkerOrder[] = response.orders || [];

		if (!Array.isArray(orders) || orders.length === 0) {
			break;
		}

		allOrders.push(...orders);

		// If single batch requested (returnAll === false)
		if (!returnAll) {
			if (limit > 0 && allOrders.length > limit) {
				return allOrders.slice(0, limit);
			}
			return allOrders;
		}

		// Check if user-defined limit is reached
		if (limit > 0 && allOrders.length >= limit) {
			return allOrders.slice(0, limit);
		}

		// In BaseLinker, if less than 100 orders are returned, there are no more orders left
		if (orders.length < 100) {
			break;
		}

		// Determine the next cursor based on the last order in the current batch
		const lastOrder = orders[orders.length - 1];
		let nextCursor: number | undefined;

		if (paginationField === 'date_confirmed_from') {
			if (lastOrder.date_confirmed && Number(lastOrder.date_confirmed) > 0) {
				nextCursor = Number(lastOrder.date_confirmed) + 1;
				currentParams.date_confirmed_from = nextCursor;
			} else {
				// Handle unconfirmed orders or orders with 0 confirmation date:
				// Fallback to id_from to avoid getting stuck in an infinite loop
				nextCursor = Number(lastOrder.order_id) + 1;
				currentParams.id_from = nextCursor;
				delete currentParams.date_confirmed_from;
			}
		} else if (paginationField === 'date_from') {
			nextCursor = Number(lastOrder.date_add) + 1;
			currentParams.date_from = nextCursor;
		} else if (paginationField === 'id_from') {
			nextCursor = Number(lastOrder.order_id) + 1;
			currentParams.id_from = nextCursor;
		}

		// Infinite loop guard: cursor must advance
		if (nextCursor === undefined || nextCursor === lastCursorValue) {
			break;
		}
		lastCursorValue = nextCursor;

		// Delay between requests to comply with BaseLinker API rate limit (100 req/min)
		if (delayMs > 0) {
			await sleep(delayMs);
		}
	}

	if (limit > 0 && allOrders.length > limit) {
		return allOrders.slice(0, limit);
	}

	return allOrders;
}

/**
 * Handles fetching orders for all statuses belonging to a specific status group
 */
export async function baselinkerGetOrdersForStatusGroup(
	this: IExecuteFunctions,
	statusGroupId: number,
	initialParameters: IGetOrdersFilterParameters,
	paginationOptions: {
		returnAll: boolean;
		limit: number;
		paginationField: 'date_confirmed_from' | 'date_from' | 'id_from';
		delayMs: number;
	},
): Promise<IBaseLinkerOrder[]> {
	// 1. Fetch all statuses
	const statusResponse = await baselinkerApiRequest.call(this, 'getOrderStatusList', {});
	const allStatuses: IBaseLinkerStatus[] = statusResponse.statuses || [];

	// 2. Filter statuses by group_id
	const targetStatuses = allStatuses.filter((s) => s.group_id === statusGroupId);

	if (targetStatuses.length === 0) {
		return [];
	}

	const allGroupOrders: IBaseLinkerOrder[] = [];
	const { returnAll, limit, paginationField, delayMs } = paginationOptions;

	// 3. For each status in the group, fetch orders
	for (let idx = 0; idx < targetStatuses.length; idx++) {
		const status = targetStatuses[idx];
		const statusParams: IGetOrdersFilterParameters = {
			...initialParameters,
			status_id: status.id,
		};
		delete statusParams.status_group_id;

		const remainingLimit = limit > 0 ? Math.max(0, limit - allGroupOrders.length) : 0;
		if (limit > 0 && remainingLimit === 0) {
			break;
		}

		const orders = await baselinkerGetOrdersAll.call(this, statusParams, {
			returnAll,
			limit: remainingLimit,
			paginationField,
			delayMs,
		});

		allGroupOrders.push(...orders);

		if (limit > 0 && allGroupOrders.length >= limit) {
			return allGroupOrders.slice(0, limit);
		}

		// Delay between status queries to comply with API rate limit (100 req/min)
		if (delayMs > 0 && idx < targetStatuses.length - 1) {
			await sleep(delayMs);
		}
	}

	return allGroupOrders;
}

/**
 * Handles pagination for getCrmClients method with customizable page limit and delay
 */
export async function baselinkerGetCrmClientsAll(
	this: IExecuteFunctions,
	initialParameters: IDataObject,
	paginationOptions: {
		returnAll: boolean;
		limit: number;
		delayMs: number;
	},
): Promise<IBaseLinkerCrmClient[]> {
	const { returnAll, limit, delayMs } = paginationOptions;
	const allClients: IBaseLinkerCrmClient[] = [];
	let page =
		typeof initialParameters.page === 'number' && initialParameters.page > 0
			? initialParameters.page
			: 1;
	const baseParams: IDataObject = { ...initialParameters };

	const maxSafetyIterations = 500;
	let iteration = 0;

	while (iteration < maxSafetyIterations) {
		iteration++;

		const currentParams = { ...baseParams, page };
		const response = await baselinkerApiRequest.call(this, 'getCrmClients', currentParams);
		const clients: IBaseLinkerCrmClient[] = response.clients || [];

		if (!Array.isArray(clients) || clients.length === 0) {
			break;
		}

		allClients.push(...clients);

		if (!returnAll) {
			if (limit > 0 && allClients.length > limit) {
				return allClients.slice(0, limit);
			}
			return allClients;
		}

		if (limit > 0 && allClients.length >= limit) {
			return allClients.slice(0, limit);
		}

		if (clients.length < 100) {
			break;
		}

		page++;

		if (delayMs > 0) {
			await sleep(delayMs);
		}
	}

	return allClients;
}

/**
 * Handles pagination for getInvoices method with customizable cursor and delay
 */
export async function baselinkerGetInvoicesAll(
	this: IExecuteFunctions,
	initialParameters: IDataObject,
	paginationOptions: {
		returnAll: boolean;
		limit: number;
		paginationField: 'id_from' | 'date_from';
		delayMs: number;
	},
): Promise<IBaseLinkerInvoice[]> {
	const { returnAll, limit, paginationField, delayMs } = paginationOptions;
	const allInvoices: IBaseLinkerInvoice[] = [];
	const currentParams: IDataObject = { ...initialParameters };

	let lastCursorValue: number | undefined = undefined;
	const maxSafetyIterations = 1000;
	let iteration = 0;

	while (iteration < maxSafetyIterations) {
		iteration++;

		const response = await baselinkerApiRequest.call(this, 'getInvoices', currentParams);
		const invoices: IBaseLinkerInvoice[] = response.invoices || [];

		if (!Array.isArray(invoices) || invoices.length === 0) {
			break;
		}

		allInvoices.push(...invoices);

		if (!returnAll) {
			if (limit > 0 && allInvoices.length > limit) {
				return allInvoices.slice(0, limit);
			}
			return allInvoices;
		}

		if (limit > 0 && allInvoices.length >= limit) {
			return allInvoices.slice(0, limit);
		}

		if (invoices.length < 100) {
			break;
		}

		const lastInvoice = invoices[invoices.length - 1];
		let nextCursor: number;

		if (paginationField === 'date_from') {
			nextCursor = Number(lastInvoice.date_add) + 1;
			if (lastCursorValue !== undefined && nextCursor <= lastCursorValue) {
				currentParams.id_from = Number(lastInvoice.invoice_id) + 1;
				delete currentParams.date_from;
			} else {
				currentParams.date_from = nextCursor;
				lastCursorValue = nextCursor;
			}
		} else {
			nextCursor = Number(lastInvoice.invoice_id) + 1;
			if (lastCursorValue !== undefined && nextCursor <= lastCursorValue) {
				break;
			}
			currentParams.id_from = nextCursor;
			lastCursorValue = nextCursor;
		}

		if (delayMs > 0) {
			await sleep(delayMs);
		}
	}

	return allInvoices;
}

/**
 * Handles pagination for getReceipts method with id_from cursor and delay
 */
export async function baselinkerGetReceiptsAll(
	this: IExecuteFunctions,
	initialParameters: IDataObject,
	paginationOptions: {
		returnAll: boolean;
		limit: number;
		delayMs: number;
	},
): Promise<IBaseLinkerReceipt[]> {
	const { returnAll, limit, delayMs } = paginationOptions;
	const allReceipts: IBaseLinkerReceipt[] = [];
	const currentParams: IDataObject = { ...initialParameters };

	let lastCursorValue: number | undefined = undefined;
	const maxSafetyIterations = 1000;
	let iteration = 0;

	while (iteration < maxSafetyIterations) {
		iteration++;

		const response = await baselinkerApiRequest.call(this, 'getReceipts', currentParams);
		const receipts: IBaseLinkerReceipt[] = response.receipts || [];

		if (!Array.isArray(receipts) || receipts.length === 0) {
			break;
		}

		allReceipts.push(...receipts);

		if (!returnAll) {
			if (limit > 0 && allReceipts.length > limit) {
				return allReceipts.slice(0, limit);
			}
			return allReceipts;
		}

		if (limit > 0 && allReceipts.length >= limit) {
			return allReceipts.slice(0, limit);
		}

		if (receipts.length < 100) {
			break;
		}

		const lastReceipt = receipts[receipts.length - 1];
		const nextCursor = Number(lastReceipt.receipt_id) + 1;
		if (lastCursorValue !== undefined && nextCursor <= lastCursorValue) {
			break;
		}
		currentParams.id_from = nextCursor;
		lastCursorValue = nextCursor;

		if (delayMs > 0) {
			await sleep(delayMs);
		}
	}

	return allReceipts;
}

/**
 * Handles pagination for getOrderPickLists method with id_from cursor and delay
 */
export async function baselinkerGetOrderPickListsAll(
	this: IExecuteFunctions,
	initialParameters: IDataObject,
	paginationOptions: {
		returnAll: boolean;
		limit: number;
		delayMs: number;
	},
): Promise<IBaseLinkerPickList[]> {
	const { returnAll, limit, delayMs } = paginationOptions;
	const allPickLists: IBaseLinkerPickList[] = [];
	const currentParams: IDataObject = { ...initialParameters };

	let lastCursorValue: number | undefined = undefined;
	const maxSafetyIterations = 1000;
	let iteration = 0;

	while (iteration < maxSafetyIterations) {
		iteration++;

		const response = await baselinkerApiRequest.call(this, 'getOrderPickLists', currentParams);
		const picklists: IBaseLinkerPickList[] = response.picklists || [];

		if (!Array.isArray(picklists) || picklists.length === 0) {
			break;
		}

		allPickLists.push(...picklists);

		if (!returnAll) {
			if (limit > 0 && allPickLists.length > limit) {
				return allPickLists.slice(0, limit);
			}
			return allPickLists;
		}

		if (limit > 0 && allPickLists.length >= limit) {
			return allPickLists.slice(0, limit);
		}

		if (picklists.length < 100) {
			break;
		}

		const lastPickList = picklists[picklists.length - 1];
		const nextCursor = Number(lastPickList.pick_list_id) + 1;
		if (lastCursorValue !== undefined && nextCursor <= lastCursorValue) {
			break;
		}
		currentParams.id_from = nextCursor;
		lastCursorValue = nextCursor;

		if (delayMs > 0) {
			await sleep(delayMs);
		}
	}

	return allPickLists;
}


/**
 * Handles pagination for getInventoryProductsList with page-based retrieval and delay
 */
export async function baselinkerGetInventoryProductsListAll(
	this: IExecuteFunctions,
	initialParameters: IDataObject,
	paginationOptions: {
		returnAll: boolean;
		limit: number;
		delayMs: number;
	},
): Promise<IBaseLinkerProductListItem[]> {
	const { returnAll, limit, delayMs } = paginationOptions;
	const allProducts: IBaseLinkerProductListItem[] = [];
	let page =
		typeof initialParameters.page === 'number' && initialParameters.page > 0
			? initialParameters.page
			: 1;
	const baseParams: IDataObject = { ...initialParameters };

	const maxSafetyIterations = 500;
	let iteration = 0;

	while (iteration < maxSafetyIterations) {
		iteration++;

		const currentParams = { ...baseParams, page };
		const response = await baselinkerApiRequest.call(this, 'getInventoryProductsList', currentParams);
		const rawProducts = response.products || {};
		const products: IBaseLinkerProductListItem[] = Array.isArray(rawProducts)
			? rawProducts
			: Object.values(rawProducts);

		if (!Array.isArray(products) || products.length === 0) {
			break;
		}

		allProducts.push(...products);

		if (!returnAll) {
			if (limit > 0 && allProducts.length > limit) {
				return allProducts.slice(0, limit);
			}
			return allProducts;
		}

		if (limit > 0 && allProducts.length >= limit) {
			return allProducts.slice(0, limit);
		}

		if (products.length < 1000) {
			break;
		}

		page++;

		if (delayMs > 0) {
			await sleep(delayMs);
		}
	}

	return allProducts;
}

/**
 * Handles pagination for getInventoryProductsStock with page-based retrieval and delay
 */
export async function baselinkerGetInventoryProductsStockAll(
	this: IExecuteFunctions,
	initialParameters: IDataObject,
	paginationOptions: {
		returnAll: boolean;
		limit: number;
		delayMs: number;
	},
): Promise<IBaseLinkerProductStockItem[]> {
	const { returnAll, limit, delayMs } = paginationOptions;
	const allProducts: IBaseLinkerProductStockItem[] = [];
	let page =
		typeof initialParameters.page === 'number' && initialParameters.page > 0
			? initialParameters.page
			: 1;
	const baseParams: IDataObject = { ...initialParameters };

	const maxSafetyIterations = 500;
	let iteration = 0;

	while (iteration < maxSafetyIterations) {
		iteration++;

		const currentParams = { ...baseParams, page };
		const response = await baselinkerApiRequest.call(this, 'getInventoryProductsStock', currentParams);
		const rawProducts = response.products || {};
		const products: IBaseLinkerProductStockItem[] = Array.isArray(rawProducts)
			? rawProducts
			: Object.values(rawProducts);

		if (!Array.isArray(products) || products.length === 0) {
			break;
		}

		allProducts.push(...products);

		if (!returnAll) {
			if (limit > 0 && allProducts.length > limit) {
				return allProducts.slice(0, limit);
			}
			return allProducts;
		}

		if (limit > 0 && allProducts.length >= limit) {
			return allProducts.slice(0, limit);
		}

		if (products.length < 1000) {
			break;
		}

		page++;

		if (delayMs > 0) {
			await sleep(delayMs);
		}
	}

	return allProducts;
}

/**
 * Handles pagination for getInventoryProductsPrices with page-based retrieval and delay
 */
export async function baselinkerGetInventoryProductsPricesAll(
	this: IExecuteFunctions,
	initialParameters: IDataObject,
	paginationOptions: {
		returnAll: boolean;
		limit: number;
		delayMs: number;
	},
): Promise<IBaseLinkerProductPriceItem[]> {
	const { returnAll, limit, delayMs } = paginationOptions;
	const allProducts: IBaseLinkerProductPriceItem[] = [];
	let page =
		typeof initialParameters.page === 'number' && initialParameters.page > 0
			? initialParameters.page
			: 1;
	const baseParams: IDataObject = { ...initialParameters };

	const maxSafetyIterations = 500;
	let iteration = 0;

	while (iteration < maxSafetyIterations) {
		iteration++;

		const currentParams = { ...baseParams, page };
		const response = await baselinkerApiRequest.call(this, 'getInventoryProductsPrices', currentParams);
		const rawProducts = response.products || {};
		const products: IBaseLinkerProductPriceItem[] = Array.isArray(rawProducts)
			? rawProducts
			: Object.values(rawProducts);

		if (!Array.isArray(products) || products.length === 0) {
			break;
		}

		allProducts.push(...products);

		if (!returnAll) {
			if (limit > 0 && allProducts.length > limit) {
				return allProducts.slice(0, limit);
			}
			return allProducts;
		}

		if (limit > 0 && allProducts.length >= limit) {
			return allProducts.slice(0, limit);
		}

		if (products.length < 1000) {
			break;
		}

		page++;

		if (delayMs > 0) {
			await sleep(delayMs);
		}
	}

	return allProducts;
}

/**
 * Handles pagination for getInventoryProductLogs with page-based retrieval and delay
 */
export async function baselinkerGetInventoryProductLogsAll(
	this: IExecuteFunctions,
	initialParameters: IDataObject,
	paginationOptions: {
		returnAll: boolean;
		limit: number;
		delayMs: number;
	},
): Promise<IBaseLinkerProductLog[]> {
	const { returnAll, limit, delayMs } = paginationOptions;
	const allLogs: IBaseLinkerProductLog[] = [];
	let page =
		typeof initialParameters.page === 'number' && initialParameters.page > 0
			? initialParameters.page
			: 1;
	const baseParams: IDataObject = { ...initialParameters };

	const maxSafetyIterations = 500;
	let iteration = 0;

	while (iteration < maxSafetyIterations) {
		iteration++;

		const currentParams = { ...baseParams, page };
		const response = await baselinkerApiRequest.call(this, 'getInventoryProductLogs', currentParams);
		const logs: IBaseLinkerProductLog[] = response.logs || [];

		if (!Array.isArray(logs) || logs.length === 0) {
			break;
		}

		allLogs.push(...logs);

		if (!returnAll) {
			if (limit > 0 && allLogs.length > limit) {
				return allLogs.slice(0, limit);
			}
			return allLogs;
		}

		if (limit > 0 && allLogs.length >= limit) {
			return allLogs.slice(0, limit);
		}

		if (logs.length < 100) {
			break;
		}

		page++;

		if (delayMs > 0) {
			await sleep(delayMs);
		}
	}

	return allLogs;
}

/**
 * Handles pagination for getInventoryManufacturers with page-based retrieval and delay
 */
export async function baselinkerGetInventoryManufacturersAll(
	this: IExecuteFunctions,
	initialParameters: IDataObject,
	paginationOptions: {
		returnAll: boolean;
		limit: number;
		delayMs: number;
	},
): Promise<IBaseLinkerManufacturer[]> {
	const { returnAll, limit, delayMs } = paginationOptions;
	const allManufacturers: IBaseLinkerManufacturer[] = [];
	let page =
		typeof initialParameters.page === 'number' && initialParameters.page > 0
			? initialParameters.page
			: 1;
	const baseParams: IDataObject = { ...initialParameters };

	const maxSafetyIterations = 100;
	let iteration = 0;

	while (iteration < maxSafetyIterations) {
		iteration++;

		const currentParams = { ...baseParams, page };
		const response = await baselinkerApiRequest.call(this, 'getInventoryManufacturers', currentParams);
		const rawManufacturers = response.manufacturers || [];
		const manufacturers: IBaseLinkerManufacturer[] = Array.isArray(rawManufacturers)
			? rawManufacturers
			: Object.values(rawManufacturers);

		if (!Array.isArray(manufacturers) || manufacturers.length === 0) {
			break;
		}

		allManufacturers.push(...manufacturers);

		if (!returnAll) {
			if (limit > 0 && allManufacturers.length > limit) {
				return allManufacturers.slice(0, limit);
			}
			return allManufacturers;
		}

		if (limit > 0 && allManufacturers.length >= limit) {
			return allManufacturers.slice(0, limit);
		}

		if (manufacturers.length < 1000) {
			break;
		}

		page++;

		if (delayMs > 0) {
			await sleep(delayMs);
		}
	}

	return allManufacturers;
}

/**
 * Handles pagination for getOrderReturns method with customizable cursor and delay
 */
export async function baselinkerGetOrderReturnsAll(
	this: IExecuteFunctions,
	initialParameters: IGetOrderReturnsFilterParameters,
	paginationOptions: {
		returnAll: boolean;
		limit: number;
		paginationField: 'id_from' | 'date_from';
		delayMs: number;
	},
): Promise<IBaseLinkerOrderReturn[]> {
	const { returnAll, limit, paginationField, delayMs } = paginationOptions;
	const allReturns: IBaseLinkerOrderReturn[] = [];
	const currentParams: IGetOrderReturnsFilterParameters = { ...initialParameters };

	let lastCursorValue: number | undefined = undefined;
	const maxSafetyIterations = 1000;
	let iteration = 0;

	while (iteration < maxSafetyIterations) {
		iteration++;

		const response = await baselinkerApiRequest.call(this, 'getOrderReturns', currentParams);
		const returns: IBaseLinkerOrderReturn[] = response.returns || [];

		if (!Array.isArray(returns) || returns.length === 0) {
			break;
		}

		allReturns.push(...returns);

		// If single batch requested (returnAll === false)
		if (!returnAll) {
			if (limit > 0 && allReturns.length > limit) {
				return allReturns.slice(0, limit);
			}
			return allReturns;
		}

		// Check if user-defined limit is reached
		if (limit > 0 && allReturns.length >= limit) {
			return allReturns.slice(0, limit);
		}

		// In BaseLinker, if less than 100 returns are returned, there are no more returns left
		if (returns.length < 100) {
			break;
		}

		// Determine the next cursor based on the last return in the current batch
		const lastReturn = returns[returns.length - 1];
		let nextCursor: number | undefined;

		if (paginationField === 'date_from') {
			nextCursor = Number(lastReturn.date_add) + 1;
			currentParams.date_from = nextCursor;
		} else {
			nextCursor = Number(lastReturn.return_id) + 1;
			currentParams.id_from = nextCursor;
		}

		// Infinite loop guard: cursor must advance
		if (nextCursor === undefined || nextCursor === lastCursorValue) {
			break;
		}
		lastCursorValue = nextCursor;

		// Delay between requests to comply with BaseLinker API rate limit (100 req/min)
		if (delayMs > 0) {
			await sleep(delayMs);
		}
	}

	if (limit > 0 && allReturns.length > limit) {
		return allReturns.slice(0, limit);
	}

	return allReturns;
}

/**
 * Handles pagination for getExternalStorageProductsList with page-based retrieval and delay
 */
export async function baselinkerGetExternalStorageProductsListAll(
	this: IExecuteFunctions,
	initialParameters: IDataObject,
	paginationOptions: {
		returnAll: boolean;
		limit: number;
		delayMs: number;
	},
): Promise<IBaseLinkerExternalProductListItem[]> {
	const { returnAll, limit, delayMs } = paginationOptions;
	const allProducts: IBaseLinkerExternalProductListItem[] = [];
	let page =
		typeof initialParameters.page === 'number' && initialParameters.page > 0
			? initialParameters.page
			: 1;
	const baseParams: IDataObject = { ...initialParameters };

	const maxSafetyIterations = 500;
	let iteration = 0;
	let lastFirstProductId: string | undefined;

	while (iteration < maxSafetyIterations) {
		iteration++;

		const currentParams = { ...baseParams, page };
		const response = await baselinkerApiRequest.call(this, 'getExternalStorageProductsList', currentParams);
		const rawProducts = response.products || [];
		const products: IBaseLinkerExternalProductListItem[] = Array.isArray(rawProducts)
			? rawProducts
			: Object.values(rawProducts);

		if (!Array.isArray(products) || products.length === 0) {
			break;
		}

		if (lastFirstProductId !== undefined && products[0]?.product_id === lastFirstProductId) {
			break;
		}
		lastFirstProductId = products[0]?.product_id;

		allProducts.push(...products);

		if (!returnAll) {
			if (limit > 0 && allProducts.length > limit) {
				return allProducts.slice(0, limit);
			}
			return allProducts;
		}

		if (limit > 0 && allProducts.length >= limit) {
			return allProducts.slice(0, limit);
		}

		page++;

		if (delayMs > 0) {
			await sleep(delayMs);
		}
	}

	if (limit > 0 && allProducts.length > limit) {
		return allProducts.slice(0, limit);
	}

	return allProducts;
}

/**
 * Handles pagination for getExternalStorageProductsQuantity with page-based retrieval and delay
 */
export async function baselinkerGetExternalStorageProductsQuantityAll(
	this: IExecuteFunctions,
	initialParameters: IDataObject,
	paginationOptions: {
		returnAll: boolean;
		limit: number;
		delayMs: number;
	},
): Promise<IBaseLinkerExternalProductQuantityItem[]> {
	const { returnAll, limit, delayMs } = paginationOptions;
	const allProducts: IBaseLinkerExternalProductQuantityItem[] = [];
	let page =
		typeof initialParameters.page === 'number' && initialParameters.page > 0
			? initialParameters.page
			: 1;
	const baseParams: IDataObject = { ...initialParameters };

	const maxSafetyIterations = 500;
	let iteration = 0;
	let lastFirstProductId: string | undefined;

	while (iteration < maxSafetyIterations) {
		iteration++;

		const currentParams = { ...baseParams, page };
		const response = await baselinkerApiRequest.call(this, 'getExternalStorageProductsQuantity', currentParams);
		const rawProducts = response.products || [];
		const products: IBaseLinkerExternalProductQuantityItem[] = Array.isArray(rawProducts)
			? rawProducts
			: Object.values(rawProducts);

		if (!Array.isArray(products) || products.length === 0) {
			break;
		}

		if (lastFirstProductId !== undefined && products[0]?.product_id === lastFirstProductId) {
			break;
		}
		lastFirstProductId = products[0]?.product_id;

		allProducts.push(...products);

		if (!returnAll) {
			if (limit > 0 && allProducts.length > limit) {
				return allProducts.slice(0, limit);
			}
			return allProducts;
		}

		if (limit > 0 && allProducts.length >= limit) {
			return allProducts.slice(0, limit);
		}

		page++;

		if (delayMs > 0) {
			await sleep(delayMs);
		}
	}

	if (limit > 0 && allProducts.length > limit) {
		return allProducts.slice(0, limit);
	}

	return allProducts;
}

/**
 * Handles pagination for getExternalStorageProductsPrices with page-based retrieval and delay
 */
export async function baselinkerGetExternalStorageProductsPricesAll(
	this: IExecuteFunctions,
	initialParameters: IDataObject,
	paginationOptions: {
		returnAll: boolean;
		limit: number;
		delayMs: number;
	},
): Promise<IBaseLinkerExternalProductPriceItem[]> {
	const { returnAll, limit, delayMs } = paginationOptions;
	const allProducts: IBaseLinkerExternalProductPriceItem[] = [];
	let page =
		typeof initialParameters.page === 'number' && initialParameters.page > 0
			? initialParameters.page
			: 1;
	const baseParams: IDataObject = { ...initialParameters };

	const maxSafetyIterations = 500;
	let iteration = 0;
	let lastFirstProductId: string | undefined;

	while (iteration < maxSafetyIterations) {
		iteration++;

		const currentParams = { ...baseParams, page };
		const response = await baselinkerApiRequest.call(this, 'getExternalStorageProductsPrices', currentParams);
		const rawProducts = response.products || [];
		const products: IBaseLinkerExternalProductPriceItem[] = Array.isArray(rawProducts)
			? rawProducts
			: Object.values(rawProducts);

		if (!Array.isArray(products) || products.length === 0) {
			break;
		}

		if (lastFirstProductId !== undefined && products[0]?.product_id === lastFirstProductId) {
			break;
		}
		lastFirstProductId = products[0]?.product_id;

		allProducts.push(...products);

		if (!returnAll) {
			if (limit > 0 && allProducts.length > limit) {
				return allProducts.slice(0, limit);
			}
			return allProducts;
		}

		if (limit > 0 && allProducts.length >= limit) {
			return allProducts.slice(0, limit);
		}

		page++;

		if (delayMs > 0) {
			await sleep(delayMs);
		}
	}

	if (limit > 0 && allProducts.length > limit) {
		return allProducts.slice(0, limit);
	}

	return allProducts;
}




