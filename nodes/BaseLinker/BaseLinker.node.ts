import {
	IExecuteFunctions,
	IDataObject,
	ILoadOptionsFunctions,
	INodeExecutionData,
	INodePropertyOptions,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';
import { orderFields, orderOperations } from './Orders/OrdersDescription';
import {
	IBaseLinkerOrder,
	IBaseLinkerOrderExtraField,
	IBaseLinkerOrderPayment,
	IGetOrdersFilterParameters,
	IBaseLinkerPickList,
	IBaseLinkerPickPackCart,
	IBaseLinkerPickPackHistoryEntry,
	IBaseLinkerPrintoutTemplate,
} from './Orders/OrdersInterface';
import { orderStatusFields, orderStatusOperations } from './OrderStatus/OrderStatusDescription';
import { IBaseLinkerStatus, IBaseLinkerStatusGroup } from './OrderStatus/OrderStatusInterface';
import { courierShipmentsFields, courierShipmentsOperations } from './CourierShipments/CourierShipmentsDescription';
import { IBaseLinkerCourier, IBaseLinkerCourierAccount } from './CourierShipments/CourierShipmentsInterface';
import { crmFields, crmOperations } from './Crm/CrmDescription';
import {
	IBaseLinkerCrmClient,
	IBaseLinkerCrmClientExtraField,
	IBaseLinkerCrmStatus,
	IBaseLinkerCrmStatusGroup,
} from './Crm/CrmInterface';
import { invoicesFields, invoicesOperations } from './Invoices/InvoicesDescription';
import { IBaseLinkerInvoice, IBaseLinkerInvoiceSeries, IBaseLinkerReceipt } from './Invoices/InvoicesInterface';
import { productCatalogFields, productCatalogOperations } from './ProductCatalog/ProductCatalogDescription';
import {
	IBaseLinkerInventory,
	IBaseLinkerProductListItem,
	IBaseLinkerProductPriceItem,
	IBaseLinkerProductStockItem,
	IBaseLinkerProductLog,
	IBaseLinkerWarehouse,
	IBaseLinkerCategory,
	IBaseLinkerManufacturer,
	IBaseLinkerPriceGroup,
	IBaseLinkerTag,
	IBaseLinkerInventoryExtraField,
	IBaseLinkerInventoryMap,
	IBaseLinkerInventoryParameter,
	IBaseLinkerShippingTemplate,
	IBaseLinkerInventoryPrintoutTemplate,
	IBaseLinkerSyncLog,
	IBaseLinkerPromotion,
} from './ProductCatalog/ProductCatalogInterface';
import { orderReturnsFields, orderReturnsOperations } from './OrderReturns/OrderReturnsDescription';
import {
	IBaseLinkerOrderReturn,
	IBaseLinkerOrderReturnStatus,
	IBaseLinkerOrderReturnStatusGroup,
	IBaseLinkerOrderReturnProductStatus,
	IBaseLinkerOrderReturnReason,
	IBaseLinkerOrderReturnExtraField,
	IBaseLinkerOrderReturnPayment,
	IBaseLinkerOrderReturnJournalLog,
	IGetOrderReturnsFilterParameters,
} from './OrderReturns/OrderReturnsInterface';
import { externalStoragesFields, externalStoragesOperations } from './ExternalStorages/ExternalStoragesDescription';
import {
	IBaseLinkerExternalStorage,
	IBaseLinkerExternalCategory,
	IBaseLinkerExternalProductListItem,
	IBaseLinkerExternalProductData,
	IBaseLinkerExternalProductQuantityItem,
	IBaseLinkerExternalProductPriceItem,
} from './ExternalStorages/ExternalStoragesInterface';
import { baseConnectFields, baseConnectOperations } from './BaseConnect/BaseConnectDescription';
import {
	IBaseLinkerConnectIntegration,
	IBaseLinkerConnectContractor,
	IBaseLinkerConnectCreditEntry,
} from './BaseConnect/BaseConnectInterface';
import {
	baselinkerApiRequest,
	baselinkerGetCrmClientsAll,
	baselinkerGetInvoicesAll,
	baselinkerGetReceiptsAll,
	baselinkerGetOrderPickListsAll,
	baselinkerGetInventoryProductLogsAll,
	baselinkerGetInventoryProductsListAll,
	baselinkerGetInventoryProductsPricesAll,
	baselinkerGetInventoryProductsStockAll,
	baselinkerGetInventoryManufacturersAll,
	baselinkerGetOrderReturnsAll,
	baselinkerGetOrdersAll,
	baselinkerGetOrdersForStatusGroup,
	baselinkerGetExternalStorageProductsListAll,
	baselinkerGetExternalStorageProductsQuantityAll,
	baselinkerGetExternalStorageProductsPricesAll,
	normalizeTimestamp,
} from './GenericFunctions';

export class BaseLinker implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'BaseLinker',
		name: 'baseLinker',
		icon: 'file:baselinker.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Consume BaseLinker API for ecommerce management, orders, products, and shipments',
		defaults: {
			name: 'BaseLinker',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'baseLinkerApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Order',
						value: 'orders',
						description: 'Manage BaseLinker orders (download, edit, statuses, journal, sources)',
					},
					{
						name: 'Order Status',
						value: 'orderStatus',
						description: 'Manage and retrieve order statuses and status groups',
					},
					{
						name: 'Courier Shipment',
						value: 'courierShipments',
						description: 'Manage and retrieve courier shipments, package details, and tracking history',
					},
					{
						name: 'Clients (CRM)',
						value: 'crm',
						description: 'Manage and retrieve CRM clients, client details, and CRM statuses',
					},
					{
						name: 'Invoice',
						value: 'invoices',
						description: 'Manage and retrieve invoices, invoice PDF files, and numbering series',
					},
					{
						name: 'Product Catalog',
						value: 'productCatalog',
						description: 'Manage BaseLinker product catalog, inventories, warehouses, stocks, prices, and product logs',
					},
					{
						name: 'Order Return',
						value: 'orderReturns',
						description: 'Manage BaseLinker order returns, return products, return statuses, and refunds',
					},
					{
						name: 'External Storage',
						value: 'externalStorages',
						description: 'Manage external storages (shops, wholesalers), products, stock, prices, and categories',
					},
					{
						name: 'Base Connect',
						value: 'baseConnect',
						description: 'Manage Base Connect integrations, contractors, trade credit limits, and settlements',
					},
				],
				default: 'orders',
			},
			...orderOperations,
			...orderFields,
			...orderStatusOperations,
			...orderStatusFields,
			...courierShipmentsOperations,
			...courierShipmentsFields,
			...crmOperations,
			...crmFields,
			...invoicesOperations,
			...invoicesFields,
			...productCatalogOperations,
			...productCatalogFields,
			...orderReturnsOperations,
			...orderReturnsFields,
			...externalStoragesOperations,
			...externalStoragesFields,
			...baseConnectOperations,
			...baseConnectFields,
		],
	};

	methods = {
		loadOptions: {
			async getOrderStatuses(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = await baselinkerApiRequest.call(this, 'getOrderStatusList', {});
				const statuses: IBaseLinkerStatus[] = response.statuses || [];
				return statuses.map((status) => ({
					name: `${status.name} (ID: ${status.id})`,
					value: status.id,
					description: `Customer name: ${status.name_for_customer || status.name}, Group: ${status.group_id}`,
				}));
			},
			async getOrderStatusList(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = await baselinkerApiRequest.call(this, 'getOrderStatusList', {});
				const statuses: IBaseLinkerStatus[] = response.statuses || [];
				return statuses.map((status) => ({
					name: `${status.name} (ID: ${status.id})`,
					value: status.id,
					description: `Customer name: ${status.name_for_customer || status.name}, Group: ${status.group_id}`,
				}));
			},
			async getOrderStatusGroups(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = await baselinkerApiRequest.call(this, 'getOrderStatusGroups', {});
				const groups: IBaseLinkerStatusGroup[] = response.status_groups || [];
				return groups.map((group) => ({
					name: `${group.name} (ID: ${group.group_id})`,
					value: group.group_id,
				}));
			},
			async getCrmClientStatuses(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = await baselinkerApiRequest.call(this, 'getCrmClientStatuses', {});
				const statuses: IBaseLinkerCrmStatus[] = response.statuses || [];
				return statuses.map((status) => ({
					name: `${status.name} (ID: ${status.id})`,
					value: status.id,
					description: `Group: ${status.group_id}${status.is_primary ? ' [Primary]' : ''}`,
				}));
			},
			async getCrmClientStatusGroups(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = await baselinkerApiRequest.call(this, 'getCrmClientStatusGroups', {});
				const groups: IBaseLinkerCrmStatusGroup[] = response.status_groups || [];
				return groups.map((group) => ({
					name: `${group.name} (ID: ${group.group_id})`,
					value: group.group_id,
					description: group.is_main_group ? '[Main Group]' : undefined,
				}));
			},
			async getCrmClientExtraFields(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = await baselinkerApiRequest.call(this, 'getCrmClientExtraFields', {});
				const rawFields = response.extra_fields || [];
				const extraFields: IBaseLinkerCrmClientExtraField[] = Array.isArray(rawFields)
					? rawFields
					: Object.values(rawFields);
				return extraFields.map((f) => ({
					name: `${f.name} (ID: ${f.extra_field_id})`,
					value: f.extra_field_id,
					description: f.editor_type ? `Type: ${f.editor_type}` : undefined,
				}));
			},
			async getInvoiceSeries(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = await baselinkerApiRequest.call(this, 'getSeries', {});
				const series: IBaseLinkerInvoiceSeries[] = response.series || [];
				return series.map((s) => ({
					name: `${s.name} (${s.type}: ${s.format}) [ID: ${s.id}]`,
					value: Number(s.id),
					description: `Type: ${s.type}, Format: ${s.format}`,
				}));
			},
			async getOrderExtraFieldsList(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = await baselinkerApiRequest.call(this, 'getOrderExtraFields', {});
				const rawFields = response.extra_fields || [];
				const extraFields: IBaseLinkerOrderExtraField[] = Array.isArray(rawFields)
					? rawFields
					: Object.values(rawFields);
				return extraFields.map((field) => ({
					name: `${field.name} (ID: ${field.extra_field_id}) [${field.editor_type || 'custom'}]`,
					value: field.extra_field_id,
					description: `Type: ${field.editor_type || 'custom'}${field.options && field.options.length ? ` (Options: ${field.options.join(', ')})` : ''}`,
				}));
			},
			async getInventories(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = await baselinkerApiRequest.call(this, 'getInventories', {});
				const inventories: IBaseLinkerInventory[] = response.inventories || [];
				return inventories.map((inv) => ({
					name: `${inv.name} (ID: ${inv.inventory_id})${inv.is_default ? ' [Default]' : ''}`,
					value: inv.inventory_id,
					description: inv.description || undefined,
				}));
			},
			async getInventoryWarehouses(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = await baselinkerApiRequest.call(this, 'getInventoryWarehouses', {});
				const warehouses: IBaseLinkerWarehouse[] = response.warehouses || [];
				return warehouses.map((wh) => ({
					name: `${wh.name} (${wh.warehouse_type}_${wh.warehouse_id})${wh.is_default ? ' [Default]' : ''}`,
					value: `${wh.warehouse_type}_${wh.warehouse_id}`,
					description: `Type: ${wh.warehouse_type}, City: ${wh.city || 'N/A'}, Country: ${wh.country || 'N/A'}`,
				}));
			},
			async getInventoryPriceGroups(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = await baselinkerApiRequest.call(this, 'getInventoryPriceGroups', {});
				const groups: IBaseLinkerPriceGroup[] = response.price_groups || [];
				return groups.map((g) => ({
					name: `${g.name} (${g.currency}) [ID: ${g.price_group_id}]${g.is_default ? ' [Default]' : ''}`,
					value: g.price_group_id,
					description: g.description || undefined,
				}));
			},
			async getInventoryCategories(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				let inventoryId: any = '';
				try {
					inventoryId = this.getNodeParameter('inventory_id', 0);
				} catch {}
				const params: IDataObject = {};
				if (inventoryId) {
					params.inventory_id = Number(inventoryId);
				}
				const response = await baselinkerApiRequest.call(this, 'getInventoryCategories', params);
				const rawCategories = response.categories || [];
				const categories: IBaseLinkerCategory[] = Array.isArray(rawCategories)
					? rawCategories
					: Object.values(rawCategories);
				return categories.map((c) => ({
					name: `${c.name} (ID: ${c.category_id})`,
					value: c.category_id,
					description: c.parent_id ? `Parent ID: ${c.parent_id}` : undefined,
				}));
			},
			async getInventoryManufacturers(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = await baselinkerApiRequest.call(this, 'getInventoryManufacturers', {});
				const rawManufacturers = response.manufacturers || [];
				const manufacturers: IBaseLinkerManufacturer[] = Array.isArray(rawManufacturers)
					? rawManufacturers
					: Object.values(rawManufacturers);
				return manufacturers.map((m) => ({
					name: `${m.name} (ID: ${m.manufacturer_id})`,
					value: m.manufacturer_id,
				}));
			},
			async getInventoryTags(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = await baselinkerApiRequest.call(this, 'getInventoryTags', {});
				const rawTags = response.tags || [];
				const tags: IBaseLinkerTag[] = Array.isArray(rawTags)
					? rawTags
					: Object.values(rawTags);
				return tags.map((t) => ({
					name: `${t.name} (ID: ${t.tag_id})`,
					value: t.tag_id,
				}));
			},
			async getInventoryExtraFields(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = await baselinkerApiRequest.call(this, 'getInventoryExtraFields', {});
				const rawFields = response.extra_fields || [];
				const extraFields: IBaseLinkerInventoryExtraField[] = Array.isArray(rawFields)
					? rawFields
					: Object.values(rawFields);
				return extraFields.map((f) => ({
					name: `${f.name} (ID: ${f.extra_field_id})`,
					value: f.extra_field_id,
					description: f.editor_type ? `Type: ${f.editor_type}` : undefined,
				}));
			},
			async getInventoryShippingTemplates(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = await baselinkerApiRequest.call(this, 'getInventoryShippingTemplates', {});
				const rawTemplates = response.shipping_templates || [];
				const templates: IBaseLinkerShippingTemplate[] = Array.isArray(rawTemplates)
					? rawTemplates
					: Object.values(rawTemplates);
				return templates.map((s) => ({
					name: `${s.name || s.template_id} (ID: ${s.template_id})`,
					value: s.template_id,
				}));
			},
			async getPickPackCarts(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = await baselinkerApiRequest.call(this, 'getPickPackCarts', {});
				const carts: IBaseLinkerPickPackCart[] = response.carts || [];
				return carts.map((cart) => ({
					name: `${cart.name} (ID: ${cart.cart_id})`,
					value: cart.cart_id,
					description: cart.color ? `Color: ${cart.color}` : undefined,
				}));
			},
			async getOrderPrintoutTemplates(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = await baselinkerApiRequest.call(this, 'getOrderPrintoutTemplates', {});
				const printouts: IBaseLinkerPrintoutTemplate[] = response.printouts || [];
				return printouts.map((p) => ({
					name: `${p.name} (ID: ${p.printout_id})`,
					value: p.printout_id,
					description: `Format: ${p.file_format}, Language: ${p.language}`,
				}));
			},
			async getCouriersList(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = await baselinkerApiRequest.call(this, 'getCouriersList', {});
				const couriers: IBaseLinkerCourier[] = response.couriers || [];
				return couriers.map((c) => ({
					name: `${c.name} (${c.code})`,
					value: c.code,
				}));
			},
			async getCourierAccounts(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const courierCode = this.getCurrentNodeParameter('courier_code') as string;
				if (!courierCode) {
					return [];
				}
				const response = await baselinkerApiRequest.call(this, 'getCourierAccounts', { courier_code: courierCode });
				const accounts: IBaseLinkerCourierAccount[] = response.accounts || [];
				return accounts.map((acc) => ({
					name: `${acc.name} (ID: ${acc.id})`,
					value: acc.id,
				}));
			},
			async getOrderReturnStatuses(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = await baselinkerApiRequest.call(this, 'getOrderReturnStatusList', {});
				const statuses: IBaseLinkerOrderReturnStatus[] = response.statuses || [];
				return statuses.map((status) => ({
					name: `${status.name} (ID: ${status.id})`,
					value: status.id,
					description: `Customer name: ${status.name_for_customer || status.name}, Group: ${status.group_id}`,
				}));
			},
			async getOrderReturnStatusList(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = await baselinkerApiRequest.call(this, 'getOrderReturnStatusList', {});
				const statuses: IBaseLinkerOrderReturnStatus[] = response.statuses || [];
				return statuses.map((status) => ({
					name: `${status.name} (ID: ${status.id})`,
					value: status.id,
					description: `Customer name: ${status.name_for_customer || status.name}, Group: ${status.group_id}`,
				}));
			},
			async getOrderReturnStatusGroups(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = await baselinkerApiRequest.call(this, 'getOrderReturnStatusGroups', {});
				const groups: IBaseLinkerOrderReturnStatusGroup[] = response.status_groups || [];
				return groups.map((group) => ({
					name: `${group.name} (ID: ${group.group_id})`,
					value: group.group_id,
				}));
			},
			async getOrderReturnProductStatuses(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = await baselinkerApiRequest.call(this, 'getOrderReturnProductStatuses', {});
				const statuses: IBaseLinkerOrderReturnProductStatus[] = response.order_return_product_statuses || [];
				return statuses.map((status) => ({
					name: `${status.name} (ID: ${status.status_id})`,
					value: status.status_id,
				}));
			},
			async getOrderReturnReasonsList(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = await baselinkerApiRequest.call(this, 'getOrderReturnReasonsList', {});
				const reasons: IBaseLinkerOrderReturnReason[] = response.return_reasons || [];
				return reasons.map((reason) => ({
					name: `${reason.name} (ID: ${reason.return_reason_id})`,
					value: reason.return_reason_id,
				}));
			},
			async getOrderReturnExtraFieldsList(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = await baselinkerApiRequest.call(this, 'getOrderReturnExtraFields', {});
				const rawFields = response.extra_fields || [];
				const extraFields: IBaseLinkerOrderReturnExtraField[] = Array.isArray(rawFields)
					? rawFields
					: Object.values(rawFields);
				return extraFields.map((field) => ({
					name: `${field.name} (ID: ${field.extra_field_id}) [${field.editor_type || 'custom'}]`,
					value: field.extra_field_id,
					description: `Type: ${field.editor_type || 'custom'}${field.options && field.options.length ? ` (Options: ${field.options.join(', ')})` : ''}`,
				}));
			},
			async getExternalStorages(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = await baselinkerApiRequest.call(this, 'getExternalStoragesList', {});
				const storages: IBaseLinkerExternalStorage[] = response.storages || [];
				return storages.map((storage) => ({
					name: `${storage.name} (${storage.storage_id})`,
					value: storage.storage_id,
					description: `Methods: ${storage.methods?.join(', ') || 'none'}, Read: ${storage.read}, Write: ${storage.write}`,
				}));
			},
			async getExternalStorageCategories(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				let storageId: any = '';
				try {
					storageId = this.getNodeParameter('storage_id', 0);
				} catch {}
				if (!storageId) {
					return [];
				}
				const response = await baselinkerApiRequest.call(this, 'getExternalStorageCategories', { storage_id: storageId });
				const rawCategories = response.categories || [];
				const categories: IBaseLinkerExternalCategory[] = Array.isArray(rawCategories)
					? rawCategories
					: Object.values(rawCategories);
				return categories.map((c) => ({
					name: `${c.name} (ID: ${c.category_id})`,
					value: c.category_id,
					description: c.parent_id ? `Parent ID: ${c.parent_id}` : undefined,
				}));
			},
			async getConnectIntegrations(this: ILoadOptionsFunctions): Promise<INodePropertyOptions[]> {
				const response = await baselinkerApiRequest.call(this, 'getConnectIntegrations', {});
				const ownIntegrations: IBaseLinkerConnectIntegration[] = response.integrations?.own_integrations || [];
				const connectedIntegrations: IBaseLinkerConnectIntegration[] = response.integrations?.connected_integrations || [];
				const options: INodePropertyOptions[] = [];

				for (const item of ownIntegrations) {
					options.push({
						name: `${item.name} (Own, ID: ${item.connect_integration_id})`,
						value: item.connect_integration_id,
						description: `Connect integration ID: ${item.connect_integration_id} (Created on this account)`,
					});
				}

				for (const item of connectedIntegrations) {
					options.push({
						name: `${item.name} (Connected, ID: ${item.connect_integration_id})`,
						value: item.connect_integration_id,
						description: `Connect integration ID: ${item.connect_integration_id} (Connected to this account)`,
					});
				}

				return options;
			},
		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;

				if (resource === 'orders' && operation === 'getOrders') {
					const inputMode = this.getNodeParameter('parameterInputMode', i, 'fields') as string;
					let parameters: IGetOrdersFilterParameters = {};
					let statusGroupId: number | undefined;

					if (inputMode === 'json') {
						const rawJson = this.getNodeParameter('parametersJson', i) as string | IDataObject;
						if (typeof rawJson === 'string') {
							try {
								parameters = JSON.parse(rawJson);
							} catch (jsonErr: any) {
								throw new NodeOperationError(
									this.getNode(),
									`Invalid JSON in Parameters (JSON): ${jsonErr.message}`,
									{ itemIndex: i },
								);
							}
						} else if (typeof rawJson === 'object' && rawJson !== null) {
							parameters = { ...rawJson };
						}

						if (parameters.status_group_id !== undefined && Number(parameters.status_group_id) > 0) {
							statusGroupId = Number(parameters.status_group_id);
							delete parameters.status_group_id;
						}
					} else {
						// UI Fields mode
						const orderId = this.getNodeParameter('order_id', i, undefined) as number | undefined;
						if (orderId !== undefined && orderId > 0) {
							parameters.order_id = orderId;
						}

						const dateConfirmedFromRaw = this.getNodeParameter('date_confirmed_from', i, undefined);
						const normalizedConfirmed = normalizeTimestamp(dateConfirmedFromRaw);
						if (normalizedConfirmed !== undefined) {
							parameters.date_confirmed_from = normalizedConfirmed;
						}

						const dateFromRaw = this.getNodeParameter('date_from', i, undefined);
						const normalizedDateFrom = normalizeTimestamp(dateFromRaw);
						if (normalizedDateFrom !== undefined) {
							parameters.date_from = normalizedDateFrom;
						}

						const idFrom = this.getNodeParameter('id_from', i, undefined) as number | undefined;
						if (idFrom !== undefined && idFrom > 0) {
							parameters.id_from = idFrom;
						}

						const getUnconfirmed = this.getNodeParameter('get_unconfirmed_orders', i, false) as boolean;
						if (getUnconfirmed) {
							parameters.get_unconfirmed_orders = true;
						}

						const includeCustomExtraFields = this.getNodeParameter(
							'include_custom_extra_fields',
							i,
							false,
						) as boolean;
						if (includeCustomExtraFields) {
							parameters.include_custom_extra_fields = true;
						}

						const statusFilter = this.getNodeParameter('statusFilter', i, 'all') as string;
						if (statusFilter === 'group') {
							const rawGroupId = this.getNodeParameter('status_group_id', i, undefined);
							if (rawGroupId !== undefined && rawGroupId !== '') {
								statusGroupId = Number(rawGroupId);
							}
						} else if (statusFilter === 'single') {
							const rawStatusId = this.getNodeParameter('status_id', i, undefined);
							if (rawStatusId !== undefined && rawStatusId !== '') {
								parameters.status_id = Number(rawStatusId);
							}
						}

						// Additional Filters
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
						for (const key of Object.keys(additionalFields)) {
							const val = additionalFields[key];
							if (val !== undefined && val !== null && val !== '') {
								parameters[key] = val;
							}
						}
					}

					// Pagination settings
					const returnAll = this.getNodeParameter('returnAll', i, false) as boolean;
					let limit = 100;
					let paginationField: 'date_confirmed_from' | 'date_from' | 'id_from' = 'date_confirmed_from';
					let delayMs = 650;

					if (returnAll) {
						paginationField = this.getNodeParameter(
							'paginationField',
							i,
							'date_confirmed_from',
						) as 'date_confirmed_from' | 'date_from' | 'id_from';
						delayMs = this.getNodeParameter('delayMs', i, 650) as number;
						limit = this.getNodeParameter('maxTotalOrders', i, 0) as number;
					} else {
						limit = this.getNodeParameter('limit', i, 100) as number;
					}

					let orders: IBaseLinkerOrder[];
					if (statusGroupId !== undefined && statusGroupId > 0) {
						orders = await baselinkerGetOrdersForStatusGroup.call(this, statusGroupId, parameters, {
							returnAll,
							limit,
							paginationField,
							delayMs,
						});
					} else {
						orders = await baselinkerGetOrdersAll.call(this, parameters, {
							returnAll,
							limit,
							paginationField,
							delayMs,
						});
					}

					for (const order of orders) {
						returnData.push({
							json: order,
							pairedItem: { item: i },
						});
					}
				} else if (operation === 'getOrderStatusList') {
					const response = await baselinkerApiRequest.call(this, 'getOrderStatusList', {});
					let statuses: IBaseLinkerStatus[] = response.statuses || [];

					const filterGroupId = this.getNodeParameter('filterGroupId', i, undefined) as number | undefined;
					if (filterGroupId !== undefined && filterGroupId > 0) {
						statuses = statuses.filter((s) => s.group_id === filterGroupId);
					}

					for (const status of statuses) {
						returnData.push({
							json: status,
							pairedItem: { item: i },
						});
					}
				} else if (operation === 'getOrderStatusGroups') {
					const response = await baselinkerApiRequest.call(this, 'getOrderStatusGroups', {});
					const groups: IBaseLinkerStatusGroup[] = response.status_groups || [];

					for (const group of groups) {
						returnData.push({
							json: group,
							pairedItem: { item: i },
						});
					}
				} else if (operation === 'setOrderStatus') {
					const mode = this.getNodeParameter('setOrderStatusMode', i, 'fields') as string;
					let params: IDataObject = {};

					if (mode === 'json') {
						const rawJson = this.getNodeParameter('setOrderStatusJson', i) as string | IDataObject;
						let parsedParams: IDataObject;
						if (typeof rawJson === 'string') {
							try {
								parsedParams = JSON.parse(rawJson);
							} catch (err: any) {
								throw new NodeOperationError(
									this.getNode(),
									`Invalid JSON in Parameters (JSON): ${err.message}`,
									{ itemIndex: i },
								);
							}
						} else {
							parsedParams = rawJson;
						}

						if (parsedParams.order_id === undefined || parsedParams.status_id === undefined) {
							throw new NodeOperationError(
								this.getNode(),
								'Parameters "order_id" and "status_id" are required in setOrderStatus JSON payload',
								{ itemIndex: i },
							);
						}
						params = {
							order_id: Number(parsedParams.order_id),
							status_id: Number(parsedParams.status_id),
							...parsedParams,
						};
					} else {
						const orderId = Number(this.getNodeParameter('order_id', i));
						const statusId = Number(this.getNodeParameter('status_id', i));
						params = {
							order_id: orderId,
							status_id: statusId,
						};
					}

					const response = await baselinkerApiRequest.call(this, 'setOrderStatus', params);
					returnData.push({
						json: {
							success: true,
							order_id: Number(params.order_id),
							status_id: Number(params.status_id),
							...response,
						},
						pairedItem: { item: i },
					});
				} else if (operation === 'setOrderStatuses') {
					const mode = this.getNodeParameter('setOrderStatusesMode', i, 'fields') as string;
					let orderIds: number[] = [];
					let statusId: number | undefined;

					if (mode === 'json') {
						const rawJson = this.getNodeParameter('setOrderStatusesJson', i) as string | IDataObject;
						let parsedParams: IDataObject;
						if (typeof rawJson === 'string') {
							try {
								parsedParams = JSON.parse(rawJson);
							} catch (err: any) {
								throw new NodeOperationError(
									this.getNode(),
									`Invalid JSON in Parameters (JSON): ${err.message}`,
									{ itemIndex: i },
								);
							}
						} else {
							parsedParams = rawJson;
						}

						if (Array.isArray(parsedParams.order_ids)) {
							orderIds = parsedParams.order_ids.map(Number);
						}
						if (parsedParams.status_id !== undefined) {
							statusId = Number(parsedParams.status_id);
						}
					} else {
						const rawOrderIds = this.getNodeParameter('order_ids', i) as string;
						if (typeof rawOrderIds === 'string') {
							if (rawOrderIds.trim().startsWith('[') && rawOrderIds.trim().endsWith(']')) {
								try {
									const parsed = JSON.parse(rawOrderIds.trim());
									if (Array.isArray(parsed)) {
										orderIds = parsed.map(Number);
									}
								} catch {
									// fallback
								}
							}
							if (orderIds.length === 0) {
								orderIds = rawOrderIds
									.split(',')
									.map((s) => s.trim())
									.filter(Boolean)
									.map(Number);
							}
						}
						const rawStatusId = this.getNodeParameter('status_id', i);
						if (rawStatusId !== undefined && rawStatusId !== '') {
							statusId = Number(rawStatusId);
						}
					}

					if (orderIds.length === 0 || statusId === undefined || isNaN(statusId)) {
						throw new NodeOperationError(
							this.getNode(),
							'Parameters "order_ids" (array with at least one order ID) and "status_id" are required',
							{ itemIndex: i },
						);
					}

					const response = await baselinkerApiRequest.call(this, 'setOrderStatuses', {
						order_ids: orderIds,
						status_id: statusId,
					});
					returnData.push({
						json: {
							success: true,
							order_ids: orderIds,
							status_id: statusId,
							...response,
						},
						pairedItem: { item: i },
					});
				} else if (operation === 'addOrderStatus') {
					const mode = this.getNodeParameter('addOrderStatusMode', i, 'fields') as string;
					let params: IDataObject = {};

					if (mode === 'json') {
						const rawJson = this.getNodeParameter('addOrderStatusJson', i) as string | IDataObject;
						let parsedParams: IDataObject;
						if (typeof rawJson === 'string') {
							try {
								parsedParams = JSON.parse(rawJson);
							} catch (err: any) {
								throw new NodeOperationError(
									this.getNode(),
									`Invalid JSON in Parameters (JSON): ${err.message}`,
									{ itemIndex: i },
								);
							}
						} else {
							parsedParams = rawJson;
						}

						if (!parsedParams.name) {
							throw new NodeOperationError(
								this.getNode(),
								'Parameter "name" is required in addOrderStatus JSON payload',
								{ itemIndex: i },
							);
						}
						params = parsedParams;
					} else {
						const name = this.getNodeParameter('name', i) as string;
						if (!name || name.trim() === '') {
							throw new NodeOperationError(
								this.getNode(),
								'Parameter "name" is required for addOrderStatus',
								{ itemIndex: i },
							);
						}
						params.name = name;

						const rawStatusId = this.getNodeParameter('status_id', i, undefined);
						if (rawStatusId !== undefined && rawStatusId !== '') {
							params.status_id = Number(rawStatusId);
						}

						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
						for (const key of Object.keys(additionalFields)) {
							const val = additionalFields[key];
							if (val !== undefined && val !== null && val !== '') {
								if (key === 'group_id' || key === 'type') {
									params[key] = Number(val);
								} else {
									params[key] = val;
								}
							}
						}
					}

					const response = await baselinkerApiRequest.call(this, 'addOrderStatus', params);
					returnData.push({
						json: {
							success: true,
							status_id: response.status_id ?? params.status_id,
							...params,
							...response,
						},
						pairedItem: { item: i },
					});
				} else if (operation === 'addOrderStatusGroup') {
					const mode = this.getNodeParameter('addOrderStatusGroupMode', i, 'fields') as string;
					let params: IDataObject = {};

					if (mode === 'json') {
						const rawJson = this.getNodeParameter('addOrderStatusGroupJson', i) as string | IDataObject;
						let parsedParams: IDataObject;
						if (typeof rawJson === 'string') {
							try {
								parsedParams = JSON.parse(rawJson);
							} catch (err: any) {
								throw new NodeOperationError(
									this.getNode(),
									`Invalid JSON in Parameters (JSON): ${err.message}`,
									{ itemIndex: i },
								);
							}
						} else {
							parsedParams = rawJson;
						}

						if (!parsedParams.name) {
							throw new NodeOperationError(
								this.getNode(),
								'Parameter "name" is required in addOrderStatusGroup JSON payload',
								{ itemIndex: i },
							);
						}
						params = parsedParams;
					} else {
						const name = this.getNodeParameter('name', i) as string;
						if (!name || name.trim() === '') {
							throw new NodeOperationError(
								this.getNode(),
								'Parameter "name" is required for addOrderStatusGroup',
								{ itemIndex: i },
							);
						}
						params.name = name;

						const rawGroupId = this.getNodeParameter('group_id', i, undefined);
						if (rawGroupId !== undefined && rawGroupId !== '') {
							params.group_id = Number(rawGroupId);
						}
					}

					const response = await baselinkerApiRequest.call(this, 'addOrderStatusGroup', params);
					returnData.push({
						json: {
							success: true,
							group_id: response.group_id ?? params.group_id,
							...params,
							...response,
						},
						pairedItem: { item: i },
					});
				} else if (operation === 'deleteOrderStatus') {
					const mode = this.getNodeParameter('deleteOrderStatusMode', i, 'fields') as string;
					let statusId: number | undefined;
					let targetStatusId: number | undefined;

					if (mode === 'json') {
						const rawJson = this.getNodeParameter('deleteOrderStatusJson', i) as string | IDataObject;
						let parsedParams: IDataObject;
						if (typeof rawJson === 'string') {
							try {
								parsedParams = JSON.parse(rawJson);
							} catch (err: any) {
								throw new NodeOperationError(
									this.getNode(),
									`Invalid JSON in Parameters (JSON): ${err.message}`,
									{ itemIndex: i },
								);
							}
						} else {
							parsedParams = rawJson;
						}

						if (parsedParams.status_id === undefined || parsedParams.target_status_id === undefined) {
							throw new NodeOperationError(
								this.getNode(),
								'Parameters "status_id" and "target_status_id" are required in deleteOrderStatus JSON payload',
								{ itemIndex: i },
							);
						}
						statusId = Number(parsedParams.status_id);
						targetStatusId = Number(parsedParams.target_status_id);
					} else {
						const rawStatusId = this.getNodeParameter('status_id', i);
						const rawTargetStatusId = this.getNodeParameter('target_status_id', i);
						statusId = Number(rawStatusId);
						targetStatusId = Number(rawTargetStatusId);
					}

					if (isNaN(statusId) || isNaN(targetStatusId)) {
						throw new NodeOperationError(
							this.getNode(),
							'Parameters "status_id" and "target_status_id" must be valid numbers',
							{ itemIndex: i },
						);
					}

					if (statusId === targetStatusId) {
						throw new NodeOperationError(
							this.getNode(),
							'Parameter "target_status_id" must be different from "status_id"',
							{ itemIndex: i },
						);
					}

					const response = await baselinkerApiRequest.call(this, 'deleteOrderStatus', {
						status_id: statusId,
						target_status_id: targetStatusId,
					});
					returnData.push({
						json: {
							success: true,
							status_id: statusId,
							target_status_id: targetStatusId,
							...response,
						},
						pairedItem: { item: i },
					});
				} else if (operation === 'deleteOrderStatusGroup') {
					const mode = this.getNodeParameter('deleteOrderStatusGroupMode', i, 'fields') as string;
					let groupId: number | undefined;

					if (mode === 'json') {
						const rawJson = this.getNodeParameter('deleteOrderStatusGroupJson', i) as string | IDataObject;
						let parsedParams: IDataObject;
						if (typeof rawJson === 'string') {
							try {
								parsedParams = JSON.parse(rawJson);
							} catch (err: any) {
								throw new NodeOperationError(
									this.getNode(),
									`Invalid JSON in Parameters (JSON): ${err.message}`,
									{ itemIndex: i },
								);
							}
						} else {
							parsedParams = rawJson;
						}

						if (parsedParams.group_id === undefined) {
							throw new NodeOperationError(
								this.getNode(),
								'Parameter "group_id" is required in deleteOrderStatusGroup JSON payload',
								{ itemIndex: i },
							);
						}
						groupId = Number(parsedParams.group_id);
					} else {
						const rawGroupId = this.getNodeParameter('group_id', i);
						groupId = Number(rawGroupId);
					}

					if (isNaN(groupId)) {
						throw new NodeOperationError(
							this.getNode(),
							'Parameter "group_id" must be a valid number',
							{ itemIndex: i },
						);
					}

					const response = await baselinkerApiRequest.call(this, 'deleteOrderStatusGroup', {
						group_id: groupId,
					});
					returnData.push({
						json: {
							success: true,
							group_id: groupId,
							...response,
						},
						pairedItem: { item: i },
					});
				} else if (operation === 'getJournalList') {
					const journalParams: IDataObject = {};
					const lastLogId = this.getNodeParameter('last_log_id', i, undefined) as number | undefined;
					if (lastLogId !== undefined && lastLogId > 0) {
						journalParams.last_log_id = lastLogId;
					}
					const logsTypes = this.getNodeParameter('logs_types', i, []) as number[];
					if (Array.isArray(logsTypes) && logsTypes.length > 0) {
						journalParams.logs_types = logsTypes;
					}
					const journalOrderId = this.getNodeParameter('journal_order_id', i, undefined) as number | undefined;
					if (journalOrderId !== undefined && journalOrderId > 0) {
						journalParams.order_id = journalOrderId;
					}

					const response = await baselinkerApiRequest.call(this, 'getJournalList', journalParams);
					const logs = response.logs || [];
					for (const log of logs) {
						returnData.push({
							json: log,
							pairedItem: { item: i },
						});
					}
				} else if (operation === 'getOrderExtraFields') {
					const response = await baselinkerApiRequest.call(this, 'getOrderExtraFields', {});
					const rawFields = response.extra_fields || [];
					const extraFields: IBaseLinkerOrderExtraField[] = Array.isArray(rawFields)
						? rawFields
						: Object.values(rawFields);
					for (const field of extraFields) {
						returnData.push({
							json: field as IDataObject,
							pairedItem: { item: i },
						});
					}
				} else if (operation === 'getOrderSources') {
					const response = await baselinkerApiRequest.call(this, 'getOrderSources', {});
					const sources = response.sources || {};
					const format = this.getNodeParameter('sourcesOutputFormat', i, 'flattened') as string;

					if (format === 'raw') {
						returnData.push({
							json: sources as IDataObject,
							pairedItem: { item: i },
						});
					} else {
						for (const sourceType of Object.keys(sources)) {
							const typeData = sources[sourceType];
							if (Array.isArray(typeData)) {
								for (let idx = 0; idx < typeData.length; idx++) {
									returnData.push({
										json: {
											source_type: sourceType,
											source_id: idx,
											source_name: typeData[idx],
										},
										pairedItem: { item: i },
									});
								}
							} else if (typeof typeData === 'object' && typeData !== null) {
								for (const sourceId of Object.keys(typeData)) {
									returnData.push({
										json: {
											source_type: sourceType,
											source_id: isNaN(Number(sourceId)) ? sourceId : Number(sourceId),
											source_name: typeData[sourceId],
										},
										pairedItem: { item: i },
									});
								}
							}
						}
					}
				} else if (operation === 'getOrderPackages') {
					let orderId: number;
					if (resource === 'orders') {
						orderId = this.getNodeParameter('order_packages_order_id', i) as number;
					} else {
						orderId = this.getNodeParameter('order_id', i) as number;
					}

					const response = await baselinkerApiRequest.call(this, 'getOrderPackages', { order_id: orderId });
					const packages = response.packages || [];
					for (const pkg of packages) {
						returnData.push({
							json: pkg,
							pairedItem: { item: i },
						});
					}
				} else if (operation === 'getOrderPaymentsHistory') {
					const orderId = this.getNodeParameter('order_id', i) as number;
					const showFullHistory = this.getNodeParameter('show_full_history', i, true) as boolean;

					const response = await baselinkerApiRequest.call(this, 'getOrderPaymentsHistory', {
						order_id: orderId,
						show_full_history: showFullHistory,
					});

					const payments: IBaseLinkerOrderPayment[] = response.payments || [];
					for (const payment of payments) {
						returnData.push({
							json: {
								order_id: orderId,
								...payment,
							},
							pairedItem: { item: i },
						});
					}
				} else if (operation === 'setOrderFields') {
					const mode = this.getNodeParameter('setOrderFieldsMode', i, 'fields') as string;
					let params: IDataObject = {};

					if (mode === 'json') {
						const rawJson = this.getNodeParameter('setOrderFieldsJson', i) as string | IDataObject;
						let parsedParams: IDataObject;
						if (typeof rawJson === 'string') {
							try {
								parsedParams = JSON.parse(rawJson);
							} catch (err: any) {
								throw new NodeOperationError(
									this.getNode(),
									`Invalid JSON in Parameters (JSON): ${err.message}`,
									{ itemIndex: i },
								);
							}
						} else {
							parsedParams = rawJson;
						}

						if (!parsedParams.order_id) {
							throw new NodeOperationError(
								this.getNode(),
								'Parameter "order_id" is required in setOrderFields JSON payload',
								{ itemIndex: i },
							);
						}
						params = parsedParams;
					} else {
						const orderId = this.getNodeParameter('order_id', i) as number;
						if (!orderId) {
							throw new NodeOperationError(this.getNode(), 'Order ID is required', { itemIndex: i });
						}
						const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;
						params = {
							order_id: orderId,
							...updateFields,
						};

						const customExtraFields: Record<string, any> = {};

						// Process customExtraFieldsJson if provided
						const customExtraFieldsJson = this.getNodeParameter('customExtraFieldsJson', i, '') as string | IDataObject;
						if (customExtraFieldsJson) {
							let parsedJson: any = customExtraFieldsJson;
							if (typeof parsedJson === 'string') {
								const trimmed = parsedJson.trim();
								if (trimmed) {
									try {
										parsedJson = JSON.parse(trimmed);
									} catch (err: any) {
										throw new NodeOperationError(
											this.getNode(),
											`Invalid JSON provided for Custom Extra Fields (JSON): ${err.message}`,
											{ itemIndex: i },
										);
									}
								} else {
									parsedJson = null;
								}
							}
							if (parsedJson && typeof parsedJson === 'object' && !Array.isArray(parsedJson)) {
								for (const [key, val] of Object.entries(parsedJson)) {
									customExtraFields[key] = val;
								}
							}
						}

						// Process customExtraFieldsUi if provided
						const customFieldsUi = this.getNodeParameter('customExtraFieldsUi', i, {}) as {
							fields?: Array<{ field_id: string | number; value: any }>;
						};

						if (customFieldsUi?.fields && Array.isArray(customFieldsUi.fields)) {
							for (const item of customFieldsUi.fields) {
								if (item.field_id !== undefined && item.field_id !== '') {
									let val = item.value !== undefined ? item.value : '';
									if (typeof val === 'string' && val.trim().startsWith('{') && val.trim().endsWith('}')) {
										try {
											const parsed = JSON.parse(val.trim());
											if (parsed && typeof parsed === 'object' && ('title' in parsed || 'file' in parsed)) {
												val = parsed;
											}
										} catch {
											// keep as string
										}
									}
									customExtraFields[String(item.field_id)] = val;
								}
							}
						}

						if (Object.keys(customExtraFields).length > 0) {
							params.custom_extra_fields = customExtraFields;
						}
					}

					if (typeof params.custom_extra_fields === 'string') {
						try {
							params.custom_extra_fields = JSON.parse(params.custom_extra_fields);
						} catch {
							// keep as string
						}
					}

					const response = await baselinkerApiRequest.call(this, 'setOrderFields', params);
					returnData.push({
						json: {
							success: true,
							order_id: params.order_id,
							updated_fields: params,
							...response,
						},
						pairedItem: { item: i },
					});
				} else if (operation === 'addOrder') {
					const mode = this.getNodeParameter('addOrderMode', i, 'fields') as string;
					let params: IDataObject = {};

					if (mode === 'json') {
						const rawJson = this.getNodeParameter('addOrderJson', i) as string | IDataObject;
						let parsedParams: IDataObject;
						if (typeof rawJson === 'string') {
							try {
								parsedParams = JSON.parse(rawJson);
							} catch (err: any) {
								throw new NodeOperationError(
									this.getNode(),
									`Invalid JSON in Parameters (JSON): ${err.message}`,
									{ itemIndex: i },
								);
							}
						} else {
							parsedParams = rawJson;
						}

						if (parsedParams.order_status_id === undefined) {
							throw new NodeOperationError(
								this.getNode(),
								'Parameter "order_status_id" is required in addOrder JSON payload',
								{ itemIndex: i },
							);
						}
						params = parsedParams;
					} else {
						const orderStatusId = this.getNodeParameter('order_status_id', i) as number;
						const currency = this.getNodeParameter('currency', i, 'PLN') as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

						params = {
							order_status_id: orderStatusId,
							currency,
							...additionalFields,
						};

						if (params.date_add) {
							const normalizedDate = normalizeTimestamp(params.date_add);
							if (normalizedDate !== undefined) {
								params.date_add = normalizedDate;
							}
						}

						// Process products
						const productsList: IDataObject[] = [];
						const productsUi = this.getNodeParameter('productsUi', i, {}) as {
							items?: Array<IDataObject>;
						};
						if (productsUi?.items && Array.isArray(productsUi.items)) {
							for (const prod of productsUi.items) {
								productsList.push({ ...prod });
							}
						}

						const productsJson = this.getNodeParameter('productsJson', i, '') as string | IDataObject[];
						if (productsJson) {
							let parsedProds: any = productsJson;
							if (typeof parsedProds === 'string') {
								const trimmed = parsedProds.trim();
								if (trimmed) {
									try {
										parsedProds = JSON.parse(trimmed);
									} catch (err: any) {
										throw new NodeOperationError(
											this.getNode(),
											`Invalid JSON provided for Products (JSON): ${err.message}`,
											{ itemIndex: i },
										);
									}
								}
							}
							if (Array.isArray(parsedProds)) {
								productsList.push(...parsedProds);
							}
						}

						if (productsList.length > 0) {
							params.products = productsList;
						}

						// Process custom extra fields
						const customExtraFields: Record<string, any> = {};
						const customExtraFieldsJson = this.getNodeParameter('customExtraFieldsJson', i, '') as string | IDataObject;
						if (customExtraFieldsJson) {
							let parsedJson: any = customExtraFieldsJson;
							if (typeof parsedJson === 'string') {
								const trimmed = parsedJson.trim();
								if (trimmed) {
									try {
										parsedJson = JSON.parse(trimmed);
									} catch (err: any) {
										throw new NodeOperationError(
											this.getNode(),
											`Invalid JSON provided for Custom Extra Fields (JSON): ${err.message}`,
											{ itemIndex: i },
										);
									}
								} else {
									parsedJson = null;
								}
							}
							if (parsedJson && typeof parsedJson === 'object' && !Array.isArray(parsedJson)) {
								for (const [key, val] of Object.entries(parsedJson)) {
									customExtraFields[key] = val;
								}
							}
						}

						const customFieldsUi = this.getNodeParameter('customExtraFieldsUi', i, {}) as {
							fields?: Array<{ field_id: string | number; value: any }>;
						};
						if (customFieldsUi?.fields && Array.isArray(customFieldsUi.fields)) {
							for (const item of customFieldsUi.fields) {
								if (item.field_id !== undefined && item.field_id !== '') {
									let val = item.value !== undefined ? item.value : '';
									if (typeof val === 'string' && val.trim().startsWith('{') && val.trim().endsWith('}')) {
										try {
											const parsed = JSON.parse(val.trim());
											if (parsed && typeof parsed === 'object' && ('title' in parsed || 'file' in parsed)) {
												val = parsed;
											}
										} catch {
											// keep as string
										}
									}
									customExtraFields[String(item.field_id)] = val;
								}
							}
						}

						if (Object.keys(customExtraFields).length > 0) {
							params.custom_extra_fields = customExtraFields;
						}
					}

					const response = await baselinkerApiRequest.call(this, 'addOrder', params);
					returnData.push({
						json: {
							success: true,
							order_id: response.order_id,
							...response,
						},
						pairedItem: { item: i },
					});
				} else if (operation === 'addOrderBySplit') {
					const mode = this.getNodeParameter('addOrderBySplitMode', i, 'fields') as string;
					let params: IDataObject = {};

					if (mode === 'json') {
						const rawJson = this.getNodeParameter('addOrderBySplitJson', i) as string | IDataObject;
						let parsedParams: IDataObject;
						if (typeof rawJson === 'string') {
							try {
								parsedParams = JSON.parse(rawJson);
							} catch (err: any) {
								throw new NodeOperationError(
									this.getNode(),
									`Invalid JSON in Parameters (JSON): ${err.message}`,
									{ itemIndex: i },
								);
							}
						} else {
							parsedParams = rawJson;
						}

						if (!parsedParams.order_id) {
							throw new NodeOperationError(
								this.getNode(),
								'Parameter "order_id" is required in addOrderBySplit JSON payload',
								{ itemIndex: i },
							);
						}
						params = parsedParams;
					} else {
						const orderId = this.getNodeParameter('order_id', i) as number;
						const deliveryCostToSplit = this.getNodeParameter('delivery_cost_to_split', i, 0) as number;
						const itemsToSplit: IDataObject[] = [];

						const itemsUi = this.getNodeParameter('itemsToSplitUi', i, {}) as {
							items?: Array<{ order_product_id: number; quantity: number }>;
						};
						if (itemsUi?.items && Array.isArray(itemsUi.items)) {
							for (const item of itemsUi.items) {
								itemsToSplit.push({ ...item });
							}
						}

						const itemsJson = this.getNodeParameter('itemsToSplitJson', i, '') as string | IDataObject[];
						if (itemsJson) {
							let parsedItems: any = itemsJson;
							if (typeof parsedItems === 'string') {
								const trimmed = parsedItems.trim();
								if (trimmed) {
									try {
										parsedItems = JSON.parse(trimmed);
									} catch (err: any) {
										throw new NodeOperationError(
											this.getNode(),
											`Invalid JSON in Items to Split (JSON): ${err.message}`,
											{ itemIndex: i },
										);
									}
								}
							}
							if (Array.isArray(parsedItems)) {
								itemsToSplit.push(...parsedItems);
							}
						}

						params = {
							order_id: orderId,
							items_to_split: itemsToSplit,
						};

						if (deliveryCostToSplit > 0) {
							params.delivery_cost_to_split = deliveryCostToSplit;
						}
					}

					const response = await baselinkerApiRequest.call(this, 'addOrderBySplit', params);
					returnData.push({
						json: {
							success: true,
							new_order_id: response.new_order_id,
							original_order_id: params.order_id,
							...response,
						},
						pairedItem: { item: i },
					});
				} else if (operation === 'addOrderDuplicate') {
					const mode = this.getNodeParameter('addOrderDuplicateMode', i, 'fields') as string;
					let orderId: number;

					if (mode === 'json') {
						const rawJson = this.getNodeParameter('addOrderDuplicateJson', i) as string | IDataObject;
						let parsedParams: IDataObject;
						if (typeof rawJson === 'string') {
							try {
								parsedParams = JSON.parse(rawJson);
							} catch (err: any) {
								throw new NodeOperationError(
									this.getNode(),
									`Invalid JSON in Parameters (JSON): ${err.message}`,
									{ itemIndex: i },
								);
							}
						} else {
							parsedParams = rawJson;
						}
						orderId = Number(parsedParams.order_id);
					} else {
						orderId = this.getNodeParameter('order_id', i) as number;
					}

					if (!orderId) {
						throw new NodeOperationError(
							this.getNode(),
							'Parameter "order_id" is required for addOrderDuplicate',
							{ itemIndex: i },
						);
					}

					const response = await baselinkerApiRequest.call(this, 'addOrderDuplicate', { order_id: orderId });
					returnData.push({
						json: {
							success: true,
							order_id: response.order_id,
							original_order_id: orderId,
							...response,
						},
						pairedItem: { item: i },
					});
				} else if (operation === 'deleteOrders') {
					const mode = this.getNodeParameter('deleteOrdersMode', i, 'fields') as string;
					let orderIds: number[] = [];

					if (mode === 'json') {
						const rawJson = this.getNodeParameter('deleteOrdersJson', i) as string | IDataObject;
						let parsedParams: IDataObject;
						if (typeof rawJson === 'string') {
							try {
								parsedParams = JSON.parse(rawJson);
							} catch (err: any) {
								throw new NodeOperationError(
									this.getNode(),
									`Invalid JSON in Parameters (JSON): ${err.message}`,
									{ itemIndex: i },
								);
							}
						} else {
							parsedParams = rawJson;
						}
						if (Array.isArray(parsedParams.order_ids)) {
							orderIds = parsedParams.order_ids.map(Number);
						}
					} else {
						const rawOrderIds = this.getNodeParameter('order_ids', i) as string;
						if (typeof rawOrderIds === 'string') {
							if (rawOrderIds.trim().startsWith('[') && rawOrderIds.trim().endsWith(']')) {
								try {
									const parsed = JSON.parse(rawOrderIds.trim());
									if (Array.isArray(parsed)) {
										orderIds = parsed.map(Number);
									}
								} catch {
									// fallback
								}
							}
							if (orderIds.length === 0) {
								orderIds = rawOrderIds
									.split(',')
									.map((s) => s.trim())
									.filter(Boolean)
									.map(Number);
							}
						}
					}

					if (orderIds.length === 0) {
						throw new NodeOperationError(
							this.getNode(),
							'Parameter "order_ids" must contain at least one order ID to delete',
							{ itemIndex: i },
						);
					}

					const response = await baselinkerApiRequest.call(this, 'deleteOrders', { order_ids: orderIds });
					returnData.push({
						json: {
							success: true,
							deleted_order_ids: response.deleted_order_ids || [],
							...response,
						},
						pairedItem: { item: i },
					});
				} else if (operation === 'setOrdersMerge') {
					const mode = this.getNodeParameter('setOrdersMergeMode', i, 'fields') as string;
					let params: IDataObject = {};

					if (mode === 'json') {
						const rawJson = this.getNodeParameter('setOrdersMergeJson', i) as string | IDataObject;
						let parsedParams: IDataObject;
						if (typeof rawJson === 'string') {
							try {
								parsedParams = JSON.parse(rawJson);
							} catch (err: any) {
								throw new NodeOperationError(
									this.getNode(),
									`Invalid JSON in Parameters (JSON): ${err.message}`,
									{ itemIndex: i },
								);
							}
						} else {
							parsedParams = rawJson;
						}

						if (!parsedParams.main_order_id) {
							throw new NodeOperationError(
								this.getNode(),
								'Parameter "main_order_id" is required in setOrdersMerge JSON payload',
								{ itemIndex: i },
							);
						}
						params = parsedParams;
					} else {
						const mainOrderId = this.getNodeParameter('main_order_id', i) as number;
						const rawOrderIdsToMerge = this.getNodeParameter('order_ids_to_merge', i) as string;
						const mergeMode = this.getNodeParameter('merge_mode', i, 'technical_merge') as string;
						const sumDeliveryCosts = this.getNodeParameter('sum_delivery_costs', i, false) as boolean;

						let orderIdsToMerge: number[] = [];
						if (typeof rawOrderIdsToMerge === 'string') {
							if (rawOrderIdsToMerge.trim().startsWith('[') && rawOrderIdsToMerge.trim().endsWith(']')) {
								try {
									const parsed = JSON.parse(rawOrderIdsToMerge.trim());
									if (Array.isArray(parsed)) {
										orderIdsToMerge = parsed.map(Number);
									}
								} catch {
									// fallback
								}
							}
							if (orderIdsToMerge.length === 0) {
								orderIdsToMerge = rawOrderIdsToMerge
									.split(',')
									.map((s) => s.trim())
									.filter(Boolean)
									.map(Number);
							}
						}

						params = {
							main_order_id: mainOrderId,
							order_ids_to_merge: orderIdsToMerge,
							merge_mode: mergeMode,
							sum_delivery_costs: sumDeliveryCosts,
						};
					}

					const response = await baselinkerApiRequest.call(this, 'setOrdersMerge', params);
					returnData.push({
						json: {
							success: true,
							merged_order_id: response.merged_order_id,
							main_order_id: params.main_order_id,
							...response,
						},
						pairedItem: { item: i },
					});
				} else if (operation === 'addOrderProduct') {
					const mode = this.getNodeParameter('addOrderProductMode', i, 'fields') as string;
					let params: IDataObject = {};

					if (mode === 'json') {
						const rawJson = this.getNodeParameter('addOrderProductJson', i) as string | IDataObject;
						let parsedParams: IDataObject;
						if (typeof rawJson === 'string') {
							try {
								parsedParams = JSON.parse(rawJson);
							} catch (err: any) {
								throw new NodeOperationError(
									this.getNode(),
									`Invalid JSON in Parameters (JSON): ${err.message}`,
									{ itemIndex: i },
								);
							}
						} else {
							parsedParams = rawJson;
						}

						if (!parsedParams.order_id) {
							throw new NodeOperationError(
								this.getNode(),
								'Parameter "order_id" is required in addOrderProduct JSON payload',
								{ itemIndex: i },
							);
						}
						params = parsedParams;
					} else {
						const orderId = this.getNodeParameter('order_id', i) as number;
						const name = this.getNodeParameter('name', i) as string;
						const priceBrutto = this.getNodeParameter('price_brutto', i) as number;
						const quantity = this.getNodeParameter('quantity', i, 1) as number;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

						params = {
							order_id: orderId,
							name,
							price_brutto: priceBrutto,
							quantity,
							...additionalFields,
						};
					}

					const response = await baselinkerApiRequest.call(this, 'addOrderProduct', params);
					returnData.push({
						json: {
							success: true,
							order_id: params.order_id,
							order_product_id: response.order_product_id,
							...response,
						},
						pairedItem: { item: i },
					});
				} else if (operation === 'deleteOrderProduct') {
					const mode = this.getNodeParameter('deleteOrderProductMode', i, 'fields') as string;
					let orderId: number;
					let orderProductId: number;

					if (mode === 'json') {
						const rawJson = this.getNodeParameter('deleteOrderProductJson', i) as string | IDataObject;
						let parsedParams: IDataObject;
						if (typeof rawJson === 'string') {
							try {
								parsedParams = JSON.parse(rawJson);
							} catch (err: any) {
								throw new NodeOperationError(
									this.getNode(),
									`Invalid JSON in Parameters (JSON): ${err.message}`,
									{ itemIndex: i },
								);
							}
						} else {
							parsedParams = rawJson;
						}
						orderId = Number(parsedParams.order_id);
						orderProductId = Number(parsedParams.order_product_id);
					} else {
						orderId = this.getNodeParameter('order_id', i) as number;
						orderProductId = this.getNodeParameter('order_product_id', i) as number;
					}

					if (!orderId || !orderProductId) {
						throw new NodeOperationError(
							this.getNode(),
							'Parameters "order_id" and "order_product_id" are required for deleteOrderProduct',
							{ itemIndex: i },
						);
					}

					const response = await baselinkerApiRequest.call(this, 'deleteOrderProduct', {
						order_id: orderId,
						order_product_id: orderProductId,
					});
					returnData.push({
						json: {
							success: true,
							order_id: orderId,
							order_product_id: orderProductId,
							...response,
						},
						pairedItem: { item: i },
					});
				} else if (operation === 'setOrderProductFields') {
					const mode = this.getNodeParameter('setOrderProductFieldsMode', i, 'fields') as string;
					let params: IDataObject = {};

					if (mode === 'json') {
						const rawJson = this.getNodeParameter('setOrderProductFieldsJson', i) as string | IDataObject;
						let parsedParams: IDataObject;
						if (typeof rawJson === 'string') {
							try {
								parsedParams = JSON.parse(rawJson);
							} catch (err: any) {
								throw new NodeOperationError(
									this.getNode(),
									`Invalid JSON in Parameters (JSON): ${err.message}`,
									{ itemIndex: i },
								);
							}
						} else {
							parsedParams = rawJson;
						}

						if (!parsedParams.order_id || !parsedParams.order_product_id) {
							throw new NodeOperationError(
								this.getNode(),
								'Parameters "order_id" and "order_product_id" are required in setOrderProductFields JSON payload',
								{ itemIndex: i },
							);
						}
						params = parsedParams;
					} else {
						const orderId = this.getNodeParameter('order_id', i) as number;
						const orderProductId = this.getNodeParameter('order_product_id', i) as number;
						const updateProductFields = this.getNodeParameter('updateProductFields', i, {}) as IDataObject;

						params = {
							order_id: orderId,
							order_product_id: orderProductId,
							...updateProductFields,
						};
					}

					const response = await baselinkerApiRequest.call(this, 'setOrderProductFields', params);
					returnData.push({
						json: {
							success: true,
							order_id: params.order_id,
							order_product_id: params.order_product_id,
							updated_fields: params,
							...response,
						},
						pairedItem: { item: i },
					});
				} else if (operation === 'setOrderPayment') {
					const mode = this.getNodeParameter('setOrderPaymentMode', i, 'fields') as string;
					let params: IDataObject = {};

					if (mode === 'json') {
						const rawJson = this.getNodeParameter('setOrderPaymentJson', i) as string | IDataObject;
						let parsedParams: IDataObject;
						if (typeof rawJson === 'string') {
							try {
								parsedParams = JSON.parse(rawJson);
							} catch (err: any) {
								throw new NodeOperationError(
									this.getNode(),
									`Invalid JSON in Parameters (JSON): ${err.message}`,
									{ itemIndex: i },
								);
							}
						} else {
							parsedParams = rawJson;
						}

						if (!parsedParams.order_id || parsedParams.payment_done === undefined) {
							throw new NodeOperationError(
								this.getNode(),
								'Parameters "order_id" and "payment_done" are required in setOrderPayment JSON payload',
								{ itemIndex: i },
							);
						}
						params = parsedParams;
					} else {
						const orderId = this.getNodeParameter('order_id', i) as number;
						const paymentDone = this.getNodeParameter('payment_done', i) as number;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

						params = {
							order_id: orderId,
							payment_done: paymentDone,
							...additionalFields,
						};

						if (params.payment_date) {
							const normalizedDate = normalizeTimestamp(params.payment_date);
							if (normalizedDate !== undefined) {
								params.payment_date = normalizedDate;
							}
						}
					}

					const response = await baselinkerApiRequest.call(this, 'setOrderPayment', params);
					returnData.push({
						json: {
							success: true,
							order_id: params.order_id,
							payment_done: params.payment_done,
							...response,
						},
						pairedItem: { item: i },
					});
				} else if (operation === 'getPackageDetails') {
					const packageId = this.getNodeParameter('package_id', i) as number;
					const response = await baselinkerApiRequest.call(this, 'getPackageDetails', { package_id: packageId });
					const subpackages = response.package_details || [];
					const additionalFields = response.additional_fields || {};

					if (subpackages.length === 0) {
						returnData.push({
							json: { package_id: packageId, additional_fields: additionalFields },
							pairedItem: { item: i },
						});
					} else {
						for (const subpkg of subpackages) {
							returnData.push({
								json: {
									package_id: packageId,
									...subpkg,
									additional_fields: additionalFields,
								},
								pairedItem: { item: i },
							});
						}
					}
				} else if (operation === 'getCourierPackagesStatusHistory') {
					const rawPackageIds = this.getNodeParameter('package_ids', i) as string | number[];
					let packageIds: number[] = [];

					if (Array.isArray(rawPackageIds)) {
						packageIds = rawPackageIds.map(Number);
					} else if (typeof rawPackageIds === 'string') {
						try {
							const parsed = JSON.parse(rawPackageIds);
							if (Array.isArray(parsed)) {
								packageIds = parsed.map(Number);
							} else {
								packageIds = [Number(parsed)];
							}
						} catch {
							packageIds = rawPackageIds
								.split(',')
								.map((s) => s.trim())
								.filter((s) => s.length > 0)
								.map(Number);
						}
					}

					const response = await baselinkerApiRequest.call(this, 'getCourierPackagesStatusHistory', {
						package_ids: packageIds,
					});

					const packagesHistory = response.packages_history || {};
					const outputFormat = this.getNodeParameter('statusHistoryOutputFormat', i, 'perPackage') as string;

					for (const pkgId of Object.keys(packagesHistory)) {
						const historyList = packagesHistory[pkgId] || [];
						if (outputFormat === 'flatEvents') {
							for (const event of historyList) {
								returnData.push({
									json: {
										package_id: isNaN(Number(pkgId)) ? pkgId : Number(pkgId),
										...event,
									},
									pairedItem: { item: i },
								});
							}
						} else {
							returnData.push({
								json: {
									package_id: isNaN(Number(pkgId)) ? pkgId : Number(pkgId),
									history: historyList,
								},
								pairedItem: { item: i },
							});
						}
					}
				} else if (operation === 'getLabel') {
					const courierCode = this.getNodeParameter('courier_code', i) as string;
					const packageId = this.getNodeParameter('package_id', i, 0) as number;
					const packageNumber = this.getNodeParameter('package_number', i, '') as string;

					if (!packageId && !packageNumber) {
						throw new NodeOperationError(
							this.getNode(),
							'Either Package ID or Package Number must be provided for getLabel',
							{ itemIndex: i },
						);
					}

					const labelParams: IDataObject = { courier_code: courierCode };
					if (packageId) {
						labelParams.package_id = packageId;
					}
					if (packageNumber) {
						labelParams.package_number = packageNumber;
					}

					const response = await baselinkerApiRequest.call(this, 'getLabel', labelParams);
					const downloadBinary = this.getNodeParameter('downloadBinary', i, false) as boolean;

					const itemData: INodeExecutionData = {
						json: {
							courier_code: courierCode,
							package_id: packageId || undefined,
							package_number: packageNumber || undefined,
							extension: response.extension,
							label: response.label,
						},
						pairedItem: { item: i },
					};

					if (downloadBinary && response.label) {
						const binaryPropertyName = this.getNodeParameter('binaryPropertyName', i, 'data') as string;
						const ext = (response.extension as string) || 'pdf';
						const customFileName = this.getNodeParameter('fileName', i, '') as string;
						const fileName =
							customFileName ||
							`label_${packageId || packageNumber || 'shipment'}.${ext}`;

						const buffer = Buffer.from(response.label as string, 'base64');
						const binaryData = await this.helpers.prepareBinaryData(buffer, fileName);
						itemData.binary = {
							[binaryPropertyName]: binaryData,
						};
					}

					returnData.push(itemData);
				} else if (operation === 'createPackage') {
					const mode = this.getNodeParameter('createPackageMode', i, 'fields') as string;
					let params: IDataObject = {};

					if (mode === 'json') {
						const rawJson = this.getNodeParameter('createPackageJson', i) as string | IDataObject;
						let parsedParams: IDataObject;
						if (typeof rawJson === 'string') {
							try {
								parsedParams = JSON.parse(rawJson);
							} catch (err: any) {
								throw new NodeOperationError(
									this.getNode(),
									`Invalid JSON in Parameters (JSON): ${err.message}`,
									{ itemIndex: i },
								);
							}
						} else {
							parsedParams = rawJson;
						}
						params = parsedParams;
					} else {
						const orderId = this.getNodeParameter('order_id', i) as number;
						const courierCode = this.getNodeParameter('courier_code', i) as string;
						const accountId = this.getNodeParameter('account_id', i, 0) as number;

						const fieldsUi =
							((this.getNodeParameter('fieldsUi', i, {}) as IDataObject)?.fieldValues as Array<{
								id: string;
								value: any;
							}>) || [];
						const rawFieldsJson = this.getNodeParameter('fieldsJson', i, '') as string;
						let fields: Array<{ id: string; value: any }> = [...fieldsUi];
						if (rawFieldsJson) {
							try {
								const parsed = JSON.parse(rawFieldsJson);
								if (Array.isArray(parsed)) {
									fields = fields.concat(parsed);
								}
							} catch (err: any) {
								throw new NodeOperationError(
									this.getNode(),
									`Invalid JSON in Additional Form Fields: ${err.message}`,
									{ itemIndex: i },
								);
							}
						}

						const packagesUi =
							((this.getNodeParameter('packagesUi', i, {}) as IDataObject)
								?.packageValues as IDataObject[]) || [];
						const rawPackagesJson = this.getNodeParameter('packagesJson', i, '') as string;
						let packages: IDataObject[] = [];
						if (packagesUi.length > 0) {
							packages = packagesUi.map((pkg) => {
								const res: IDataObject = { weight: pkg.weight };
								if (pkg.length) res.length = pkg.length;
								if (pkg.width) res.width = pkg.width;
								if (pkg.height) res.height = pkg.height;
								if (pkg.size_custom !== undefined) res.size_custom = pkg.size_custom ? 1 : 0;
								return res;
							});
						}
						if (rawPackagesJson) {
							try {
								const parsed = JSON.parse(rawPackagesJson);
								if (Array.isArray(parsed)) {
									packages = parsed;
								}
							} catch (err: any) {
								throw new NodeOperationError(
									this.getNode(),
									`Invalid JSON in Packages / Parcels (JSON): ${err.message}`,
									{ itemIndex: i },
								);
							}
						}

						params = {
							order_id: orderId,
							courier_code: courierCode,
							fields,
							packages,
						};
						if (accountId) {
							params.account_id = accountId;
						}
					}

					const response = await baselinkerApiRequest.call(this, 'createPackage', params);
					returnData.push({
						json: {
							order_id: params.order_id,
							courier_code: params.courier_code,
							package_id: response.package_id,
							package_number: response.package_number,
							courier_inner_number: response.courier_inner_number,
							packages: response.packages || [],
							...response,
						},
						pairedItem: { item: i },
					});
				} else if (operation === 'createPackageManual') {
					const orderId = this.getNodeParameter('order_id', i) as number;
					const courierCode = this.getNodeParameter('courier_code', i) as string;
					const packageNumber = this.getNodeParameter('manual_package_number', i) as string;
					const rawPickupDate = this.getNodeParameter('pickup_date', i, '') as string | number;
					const returnShipment = this.getNodeParameter('return_shipment', i, false) as boolean;

					const params: IDataObject = {
						order_id: orderId,
						courier_code: courierCode,
						package_number: packageNumber,
					};

					if (rawPickupDate) {
						const normalizedDate = normalizeTimestamp(rawPickupDate);
						if (normalizedDate !== undefined) {
							params.pickup_date = normalizedDate;
						}
					}
					if (returnShipment) {
						params.return_shipment = true;
					}

					const response = await baselinkerApiRequest.call(this, 'createPackageManual', params);
					returnData.push({
						json: {
							order_id: orderId,
							courier_code: courierCode,
							package_id: response.package_id,
							package_number: response.package_number,
							...response,
						},
						pairedItem: { item: i },
					});
				} else if (operation === 'deleteCourierPackage') {
					const courierCode = this.getNodeParameter('courier_code', i) as string;
					const packageId = this.getNodeParameter('package_id', i, 0) as number;
					const packageNumber = this.getNodeParameter('package_number', i, '') as string;
					const forceDelete = this.getNodeParameter('force_delete', i, false) as boolean;

					if (!packageId && !packageNumber) {
						throw new NodeOperationError(
							this.getNode(),
							'Either Package ID or Package Number must be provided for deleteCourierPackage',
							{ itemIndex: i },
						);
					}

					const params: IDataObject = {
						courier_code: courierCode,
					};
					if (packageId) {
						params.package_id = packageId;
					}
					if (packageNumber) {
						params.package_number = packageNumber;
					}
					if (forceDelete) {
						params.force_delete = true;
					}

					const response = await baselinkerApiRequest.call(this, 'deleteCourierPackage', params);
					returnData.push({
						json: {
							success: true,
							courier_code: courierCode,
							package_id: packageId || undefined,
							package_number: packageNumber || undefined,
							...response,
						},
						pairedItem: { item: i },
					});
				} else if (operation === 'getPricePackage') {
					const mode = this.getNodeParameter('getPricePackageMode', i, 'fields') as string;
					let params: IDataObject = {};

					if (mode === 'json') {
						const rawJson = this.getNodeParameter('getPricePackageJson', i) as string | IDataObject;
						let parsedParams: IDataObject;
						if (typeof rawJson === 'string') {
							try {
								parsedParams = JSON.parse(rawJson);
							} catch (err: any) {
								throw new NodeOperationError(
									this.getNode(),
									`Invalid JSON in Parameters (JSON): ${err.message}`,
									{ itemIndex: i },
								);
							}
						} else {
							parsedParams = rawJson;
						}
						params = parsedParams;
					} else {
						const orderId = this.getNodeParameter('order_id', i) as number;
						const courierCode = this.getNodeParameter('courier_code', i) as string;
						const accountId = this.getNodeParameter('account_id', i, 0) as number;

						const fieldsUi =
							((this.getNodeParameter('fieldsUi', i, {}) as IDataObject)?.fieldValues as Array<{
								id: string;
								value: any;
							}>) || [];
						const rawFieldsJson = this.getNodeParameter('fieldsJson', i, '') as string;
						let fields: Array<{ id: string; value: any }> = [...fieldsUi];
						if (rawFieldsJson) {
							try {
								const parsed = JSON.parse(rawFieldsJson);
								if (Array.isArray(parsed)) {
									fields = fields.concat(parsed);
								}
							} catch (err: any) {
								throw new NodeOperationError(
									this.getNode(),
									`Invalid JSON in Additional Form Fields: ${err.message}`,
									{ itemIndex: i },
								);
							}
						}

						const packagesUi =
							((this.getNodeParameter('packagesUi', i, {}) as IDataObject)
								?.packageValues as IDataObject[]) || [];
						const rawPackagesJson = this.getNodeParameter('packagesJson', i, '') as string;
						let packages: IDataObject[] = [];
						if (packagesUi.length > 0) {
							packages = packagesUi.map((pkg) => {
								const res: IDataObject = { weight: pkg.weight };
								if (pkg.length) res.length = pkg.length;
								if (pkg.width) res.width = pkg.width;
								if (pkg.height) res.height = pkg.height;
								if (pkg.size_custom !== undefined) res.size_custom = pkg.size_custom ? 1 : 0;
								return res;
							});
						}
						if (rawPackagesJson) {
							try {
								const parsed = JSON.parse(rawPackagesJson);
								if (Array.isArray(parsed)) {
									packages = parsed;
								}
							} catch (err: any) {
								throw new NodeOperationError(
									this.getNode(),
									`Invalid JSON in Packages / Parcels (JSON): ${err.message}`,
									{ itemIndex: i },
								);
							}
						}

						params = {
							order_id: orderId,
							courier_code: courierCode,
							fields,
							packages,
						};
						if (accountId) {
							params.account_id = accountId;
						}
					}

					const response = await baselinkerApiRequest.call(this, 'getPricePackage', params);
					const prices = response.prices || [];
					if (prices.length === 0) {
						returnData.push({
							json: {
								order_id: params.order_id,
								courier_code: params.courier_code,
								prices: [],
								header: response.header,
								notices: response.notices,
							},
							pairedItem: { item: i },
						});
					} else {
						for (const price of prices) {
							returnData.push({
								json: {
									order_id: params.order_id,
									courier_code: params.courier_code,
									...price,
									header: response.header,
									notices: response.notices,
								},
								pairedItem: { item: i },
							});
						}
					}
				} else if (operation === 'getCourierAccounts') {
					const courierCode = this.getNodeParameter('courier_code', i) as string;
					const response = await baselinkerApiRequest.call(this, 'getCourierAccounts', {
						courier_code: courierCode,
					});
					const accounts = response.accounts || [];
					if (accounts.length === 0) {
						returnData.push({
							json: { courier_code: courierCode, accounts: [] },
							pairedItem: { item: i },
						});
					} else {
						for (const acc of accounts) {
							returnData.push({
								json: {
									courier_code: courierCode,
									...acc,
								},
								pairedItem: { item: i },
							});
						}
					}
				} else if (operation === 'getCourierFields') {
					const courierCode = this.getNodeParameter('courier_code', i) as string;
					const response = await baselinkerApiRequest.call(this, 'getCourierFields', {
						courier_code: courierCode,
					});
					returnData.push({
						json: {
							courier_code: courierCode,
							multi_packages: response.multi_packages,
							fields: response.fields || [],
							package_fields: response.package_fields || [],
							...response,
						},
						pairedItem: { item: i },
					});
				} else if (operation === 'getCourierServices') {
					const mode = this.getNodeParameter('getCourierServicesMode', i, 'fields') as string;
					let params: IDataObject = {};

					if (mode === 'json') {
						const rawJson = this.getNodeParameter('getCourierServicesJson', i) as string | IDataObject;
						let parsedParams: IDataObject;
						if (typeof rawJson === 'string') {
							try {
								parsedParams = JSON.parse(rawJson);
							} catch (err: any) {
								throw new NodeOperationError(
									this.getNode(),
									`Invalid JSON in Parameters (JSON): ${err.message}`,
									{ itemIndex: i },
								);
							}
						} else {
							parsedParams = rawJson;
						}
						params = parsedParams;
					} else {
						const orderId = this.getNodeParameter('order_id', i) as number;
						const courierCode = this.getNodeParameter('courier_code', i) as string;
						const accountId = this.getNodeParameter('account_id', i, 0) as number;

						const fieldsUi =
							((this.getNodeParameter('fieldsUi', i, {}) as IDataObject)?.fieldValues as Array<{
								id: string;
								value: any;
							}>) || [];
						const rawFieldsJson = this.getNodeParameter('fieldsJson', i, '') as string;
						let fields: Array<{ id: string; value: any }> = [...fieldsUi];
						if (rawFieldsJson) {
							try {
								const parsed = JSON.parse(rawFieldsJson);
								if (Array.isArray(parsed)) {
									fields = fields.concat(parsed);
								}
							} catch (err: any) {
								throw new NodeOperationError(
									this.getNode(),
									`Invalid JSON in Additional Form Fields: ${err.message}`,
									{ itemIndex: i },
								);
							}
						}

						const packagesUi =
							((this.getNodeParameter('packagesUi', i, {}) as IDataObject)
								?.packageValues as IDataObject[]) || [];
						const rawPackagesJson = this.getNodeParameter('packagesJson', i, '') as string;
						let packages: IDataObject[] = [];
						if (packagesUi.length > 0) {
							packages = packagesUi.map((pkg) => {
								const res: IDataObject = { weight: pkg.weight };
								if (pkg.length) res.length = pkg.length;
								if (pkg.width) res.width = pkg.width;
								if (pkg.height) res.height = pkg.height;
								if (pkg.size_custom !== undefined) res.size_custom = pkg.size_custom ? 1 : 0;
								return res;
							});
						}
						if (rawPackagesJson) {
							try {
								const parsed = JSON.parse(rawPackagesJson);
								if (Array.isArray(parsed)) {
									packages = parsed;
								}
							} catch (err: any) {
								throw new NodeOperationError(
									this.getNode(),
									`Invalid JSON in Packages / Parcels (JSON): ${err.message}`,
									{ itemIndex: i },
								);
							}
						}

						params = {
							order_id: orderId,
							courier_code: courierCode,
							fields,
							packages,
						};
						if (accountId) {
							params.account_id = accountId;
						}
					}

					const response = await baselinkerApiRequest.call(this, 'getCourierServices', params);
					const services = response.services || {};
					const serviceKeys = Object.keys(services);
					if (serviceKeys.length === 0) {
						returnData.push({
							json: {
								order_id: params.order_id,
								courier_code: params.courier_code,
								services: {},
							},
							pairedItem: { item: i },
						});
					} else {
						for (const serviceId of serviceKeys) {
							returnData.push({
								json: {
									order_id: params.order_id,
									courier_code: params.courier_code,
									service_id: serviceId,
									service_name: services[serviceId],
								},
								pairedItem: { item: i },
							});
						}
					}
				} else if (operation === 'getCouriersList') {
					const response = await baselinkerApiRequest.call(this, 'getCouriersList', {});
					const couriers = response.couriers || [];
					for (const courier of couriers) {
						returnData.push({
							json: courier,
							pairedItem: { item: i },
						});
					}
				} else if (operation === 'getCourierDocument') {
					const courierCode = this.getNodeParameter('courier_code', i) as string;
					const documentType = this.getNodeParameter('document_type', i, 'manifest') as string;
					const accountId = this.getNodeParameter('account_id', i, 0) as number;
					const rawPackageIds = this.getNodeParameter('document_package_ids', i, '') as string;
					const rawPackageNumbers = this.getNodeParameter('document_package_numbers', i, '') as string;

					const params: IDataObject = {
						courier_code: courierCode,
						document_type: documentType,
					};
					if (accountId) {
						params.account_id = accountId;
					}
					if (rawPackageIds) {
						let packageIds: number[] = [];
						try {
							const parsed = JSON.parse(rawPackageIds);
							packageIds = Array.isArray(parsed) ? parsed.map(Number) : [Number(parsed)];
						} catch {
							packageIds = rawPackageIds
								.split(',')
								.map((s) => s.trim())
								.filter((s) => s.length > 0)
								.map(Number);
						}
						if (packageIds.length > 0) {
							params.package_ids = packageIds;
						}
					}
					if (rawPackageNumbers) {
						let packageNumbers: string[] = [];
						try {
							const parsed = JSON.parse(rawPackageNumbers);
							packageNumbers = Array.isArray(parsed) ? parsed.map(String) : [String(parsed)];
						} catch {
							packageNumbers = rawPackageNumbers
								.split(',')
								.map((s) => s.trim())
								.filter((s) => s.length > 0);
						}
						if (packageNumbers.length > 0) {
							params.package_numbers = packageNumbers;
						}
					}

					const response = await baselinkerApiRequest.call(this, 'getCourierDocument', params);
					const downloadBinary = this.getNodeParameter('downloadBinary', i, false) as boolean;

					const itemData: INodeExecutionData = {
						json: {
							courier_code: courierCode,
							document_type: documentType,
							extension: response.extension,
							document: response.document,
						},
						pairedItem: { item: i },
					};

					if (downloadBinary && response.document) {
						const binaryPropertyName = this.getNodeParameter('binaryPropertyName', i, 'data') as string;
						const ext = (response.extension as string) || 'pdf';
						const customFileName = this.getNodeParameter('fileName', i, '') as string;
						const fileName = customFileName || `${documentType}_${courierCode}.${ext}`;

						const buffer = Buffer.from(response.document as string, 'base64');
						const binaryData = await this.helpers.prepareBinaryData(buffer, fileName);
						itemData.binary = {
							[binaryPropertyName]: binaryData,
						};
					}

					returnData.push(itemData);
				} else if (operation === 'getProtocol') {
					const courierCode = this.getNodeParameter('courier_code', i) as string;
					const accountId = this.getNodeParameter('account_id', i, 0) as number;
					const rawPackageIds = this.getNodeParameter('document_package_ids', i, '') as string;
					const rawPackageNumbers = this.getNodeParameter('document_package_numbers', i, '') as string;

					const params: IDataObject = {
						courier_code: courierCode,
					};
					if (accountId) {
						params.account_id = accountId;
					}
					if (rawPackageIds) {
						let packageIds: number[] = [];
						try {
							const parsed = JSON.parse(rawPackageIds);
							packageIds = Array.isArray(parsed) ? parsed.map(Number) : [Number(parsed)];
						} catch {
							packageIds = rawPackageIds
								.split(',')
								.map((s) => s.trim())
								.filter((s) => s.length > 0)
								.map(Number);
						}
						if (packageIds.length > 0) {
							params.package_ids = packageIds;
						}
					}
					if (rawPackageNumbers) {
						let packageNumbers: string[] = [];
						try {
							const parsed = JSON.parse(rawPackageNumbers);
							packageNumbers = Array.isArray(parsed) ? parsed.map(String) : [String(parsed)];
						} catch {
							packageNumbers = rawPackageNumbers
								.split(',')
								.map((s) => s.trim())
								.filter((s) => s.length > 0);
						}
						if (packageNumbers.length > 0) {
							params.package_numbers = packageNumbers;
						}
					}

					const response = await baselinkerApiRequest.call(this, 'getProtocol', params);
					const downloadBinary = this.getNodeParameter('downloadBinary', i, false) as boolean;

					const itemData: INodeExecutionData = {
						json: {
							courier_code: courierCode,
							extension: response.extension,
							protocol: response.protocol,
						},
						pairedItem: { item: i },
					};

					if (downloadBinary && response.protocol) {
						const binaryPropertyName = this.getNodeParameter('binaryPropertyName', i, 'data') as string;
						const ext = (response.extension as string) || 'pdf';
						const customFileName = this.getNodeParameter('fileName', i, '') as string;
						const fileName = customFileName || `protocol_${courierCode}.${ext}`;

						const buffer = Buffer.from(response.protocol as string, 'base64');
						const binaryData = await this.helpers.prepareBinaryData(buffer, fileName);
						itemData.binary = {
							[binaryPropertyName]: binaryData,
						};
					}

					returnData.push(itemData);
				} else if (operation === 'getRequestParcelPickupFields') {
					const courierCode = this.getNodeParameter('courier_code', i) as string;
					const response = await baselinkerApiRequest.call(this, 'getRequestParcelPickupFields', {
						courier_code: courierCode,
					});
					const fields = response.fields || [];
					returnData.push({
						json: {
							courier_code: courierCode,
							fields,
							...response,
						},
						pairedItem: { item: i },
					});
				} else if (operation === 'runRequestParcelPickup') {
					const mode = this.getNodeParameter('runPickupMode', i, 'fields') as string;
					let params: IDataObject = {};

					if (mode === 'json') {
						const rawJson = this.getNodeParameter('runPickupJson', i) as string | IDataObject;
						let parsedParams: IDataObject;
						if (typeof rawJson === 'string') {
							try {
								parsedParams = JSON.parse(rawJson);
							} catch (err: any) {
								throw new NodeOperationError(
									this.getNode(),
									`Invalid JSON in Parameters (JSON): ${err.message}`,
									{ itemIndex: i },
								);
							}
						} else {
							parsedParams = rawJson;
						}
						params = parsedParams;
					} else {
						const courierCode = this.getNodeParameter('courier_code', i) as string;
						const accountId = this.getNodeParameter('account_id', i, 0) as number;
						const rawPackageIds = this.getNodeParameter('document_package_ids', i, '') as string;
						const rawPackageNumbers = this.getNodeParameter('document_package_numbers', i, '') as string;

						const fieldsUi =
							((this.getNodeParameter('pickupFieldsUi', i, {}) as IDataObject)
								?.pickupFieldValues as Array<{ id: string; value: any }>) || [];
						const rawFieldsJson = this.getNodeParameter('pickupFieldsJson', i, '') as string;
						let fields: Array<{ id: string; value: any }> = [...fieldsUi];
						if (rawFieldsJson) {
							try {
								const parsed = JSON.parse(rawFieldsJson);
								if (Array.isArray(parsed)) {
									fields = fields.concat(parsed);
								}
							} catch (err: any) {
								throw new NodeOperationError(
									this.getNode(),
									`Invalid JSON in Additional Pickup Fields: ${err.message}`,
									{ itemIndex: i },
								);
							}
						}

						params = {
							courier_code: courierCode,
							fields,
						};
						if (accountId) {
							params.account_id = accountId;
						}
						if (rawPackageIds) {
							let packageIds: number[] = [];
							try {
								const parsed = JSON.parse(rawPackageIds);
								packageIds = Array.isArray(parsed) ? parsed.map(Number) : [Number(parsed)];
							} catch {
								packageIds = rawPackageIds
									.split(',')
									.map((s) => s.trim())
									.filter((s) => s.length > 0)
									.map(Number);
							}
							if (packageIds.length > 0) {
								params.package_ids = packageIds;
							}
						}
						if (rawPackageNumbers) {
							let packageNumbers: string[] = [];
							try {
								const parsed = JSON.parse(rawPackageNumbers);
								packageNumbers = Array.isArray(parsed) ? parsed.map(String) : [String(parsed)];
							} catch {
								packageNumbers = rawPackageNumbers
									.split(',')
									.map((s) => s.trim())
									.filter((s) => s.length > 0);
							}
							if (packageNumbers.length > 0) {
								params.package_numbers = packageNumbers;
							}
						}
					}

					const response = await baselinkerApiRequest.call(this, 'runRequestParcelPickup', params);
					returnData.push({
						json: {
							success: true,
							courier_code: params.courier_code,
							pickup_number: response.pickup_number,
							...response,
						},
						pairedItem: { item: i },
					});
				} else if (operation === 'getOrdersByEmail') {
					const email = this.getNodeParameter('orderByEmail', i) as string;
					const response = await baselinkerApiRequest.call(this, 'getOrdersByEmail', { email });
					const orders = response.orders || [];
					for (const ord of orders) {
						returnData.push({
							json: { email, ...ord },
							pairedItem: { item: i },
						});
					}
				} else if (operation === 'getOrdersByPhone') {
					const phone = this.getNodeParameter('orderByPhone', i) as string;
					const response = await baselinkerApiRequest.call(this, 'getOrdersByPhone', { phone });
					const orders = response.orders || [];
					for (const ord of orders) {
						returnData.push({
							json: { phone, ...ord },
							pairedItem: { item: i },
						});
					}
				} else if (operation === 'getOrderTransactionData') {
					const orderId = this.getNodeParameter('transactionDataOrderId', i) as number;
					const includeComplexTaxes = this.getNodeParameter('includeComplexTaxes', i, false) as boolean;
					const includeAmazonData = this.getNodeParameter('includeAmazonData', i, true) as boolean;

					const response = await baselinkerApiRequest.call(this, 'getOrderTransactionData', {
						order_id: orderId,
						include_complex_taxes: includeComplexTaxes,
						include_amazon_data: includeAmazonData,
					});
					returnData.push({
						json: {
							order_id: orderId,
							...response,
						},
						pairedItem: { item: i },
					});
				} else if (operation === 'getOrderPrintoutTemplates') {
					const response = await baselinkerApiRequest.call(this, 'getOrderPrintoutTemplates', {});
					const printouts: IBaseLinkerPrintoutTemplate[] = response.printouts || [];
					for (const p of printouts) {
						returnData.push({
							json: p,
							pairedItem: { item: i },
						});
					}
				} else if (operation === 'runOrderMacroTrigger') {
					const orderId = this.getNodeParameter('macroTriggerOrderId', i) as number;
					const triggerId = this.getNodeParameter('macroTriggerId', i) as number;

					const response = await baselinkerApiRequest.call(this, 'runOrderMacroTrigger', {
						order_id: orderId,
						trigger_id: triggerId,
					});
					returnData.push({
						json: {
							success: true,
							order_id: orderId,
							trigger_id: triggerId,
							...response,
						},
						pairedItem: { item: i },
					});
				} else if (operation === 'addOrderPickList') {
					const rawOrderIds = this.getNodeParameter('pickListOrderIds', i) as string | number[];
					let orderIds: number[] = [];
					if (Array.isArray(rawOrderIds)) {
						orderIds = rawOrderIds.map(Number);
					} else if (typeof rawOrderIds === 'string') {
						try {
							const parsed = JSON.parse(rawOrderIds);
							if (Array.isArray(parsed)) {
								orderIds = parsed.map(Number);
							} else {
								orderIds = [Number(parsed)];
							}
						} catch {
							orderIds = rawOrderIds
								.split(',')
								.map((s) => s.trim())
								.filter((s) => s.length > 0)
								.map(Number);
						}
					}

					const response = await baselinkerApiRequest.call(this, 'addOrderPickList', {
						order_ids: orderIds,
					});
					returnData.push({
						json: {
							success: true,
							pick_list_id: response.pick_list_id,
							order_ids: orderIds,
							...response,
						},
						pairedItem: { item: i },
					});
				} else if (operation === 'getOrderPickLists') {
					const filterMode = this.getNodeParameter('pickListsFilterMode', i, 'all') as string;
					let picklists: IBaseLinkerPickList[] = [];

					if (filterMode === 'single') {
						const pickListId = this.getNodeParameter('pickListsPickListId', i) as number;
						const response = await baselinkerApiRequest.call(this, 'getOrderPickLists', {
							pick_list_id: pickListId,
						});
						picklists = response.picklists || [];
					} else {
						const returnAll = this.getNodeParameter('pickListsReturnAll', i, false) as boolean;
						const limit = returnAll ? 0 : (this.getNodeParameter('pickListsLimit', i, 100) as number);
						const delayMs = this.getNodeParameter('pickListsDelayMs', i, 650) as number;
						const params: IDataObject = {};
						if (filterMode === 'id_from') {
							const idFrom = this.getNodeParameter('pickListsIdFrom', i, '') as number | string;
							if (idFrom !== '' && idFrom !== undefined && idFrom !== null) {
								params.id_from = Number(idFrom);
							}
						}

						picklists = await baselinkerGetOrderPickListsAll.call(this, params, {
							returnAll,
							limit,
							delayMs,
						});
					}

					for (const pl of picklists) {
						returnData.push({
							json: pl,
							pairedItem: { item: i },
						});
					}
				} else if (operation === 'getOrderPickPackHistory') {
					const orderId = this.getNodeParameter('pickPackHistoryOrderId', i) as number;
					const actionType = this.getNodeParameter('pickPackHistoryActionType', i, 0) as number;
					const params: IDataObject = { order_id: orderId };
					if (actionType > 0) {
						params.action_type = actionType;
					}

					const response = await baselinkerApiRequest.call(this, 'getOrderPickPackHistory', params);
					const history: IBaseLinkerPickPackHistoryEntry[] = response.history || [];
					for (const h of history) {
						returnData.push({
							json: {
								order_id: orderId,
								...h,
							},
							pairedItem: { item: i },
						});
					}
				} else if (operation === 'getPickPackCarts') {
					const response = await baselinkerApiRequest.call(this, 'getPickPackCarts', {});
					const carts: IBaseLinkerPickPackCart[] = response.carts || [];
					for (const cart of carts) {
						returnData.push({
							json: cart,
							pairedItem: { item: i },
						});
					}
				} else if (operation === 'addPickPackCart') {
					const name = this.getNodeParameter('cartName', i, '') as string;
					const color = this.getNodeParameter('cartColor', i, '') as string;
					const cartUpdateId = this.getNodeParameter('cartUpdateId', i, '') as number | string;

					const params: IDataObject = {};
					if (cartUpdateId !== '' && cartUpdateId !== undefined && cartUpdateId !== null) {
						params.cart_id = Number(cartUpdateId);
					}
					if (name) {
						params.name = name;
					}
					if (color) {
						params.color = color;
					}

					const response = await baselinkerApiRequest.call(this, 'addPickPackCart', params);
					returnData.push({
						json: {
							success: true,
							cart_id: response.cart_id,
							...response,
						},
						pairedItem: { item: i },
					});
				} else if (operation === 'deletePickPackCart') {
					const cartId = this.getNodeParameter('deleteCartId', i) as number;
					const response = await baselinkerApiRequest.call(this, 'deletePickPackCart', { cart_id: cartId });
					returnData.push({
						json: {
							success: true,
							cart_id: cartId,
							...response,
						},
						pairedItem: { item: i },
					});
				} else if (operation === 'getPickPackCartOrders') {
					const cartId = this.getNodeParameter('cartOrdersCartId', i) as number;
					const response = await baselinkerApiRequest.call(this, 'getPickPackCartOrders', { cart_id: cartId });
					returnData.push({
						json: {
							cart_id: cartId,
							orders: response.orders || [],
							total_count: response.total_count ?? (response.orders ? response.orders.length : 0),
						},
						pairedItem: { item: i },
					});
				} else if (operation === 'getPickPackOrderCart') {
					const orderId = this.getNodeParameter('orderCartOrderId', i) as number;
					const response = await baselinkerApiRequest.call(this, 'getPickPackOrderCart', { order_id: orderId });
					returnData.push({
						json: {
							order_id: orderId,
							cart_id: response.cart_id,
							cart_name: response.cart_name,
							cart_color: response.cart_color,
						},
						pairedItem: { item: i },
					});
				} else if (operation === 'addPickPackOrdersToCart') {
					const cartId = this.getNodeParameter('assignOrdersCartId', i) as number;
					const rawOrderIds = this.getNodeParameter('assignOrdersOrderIds', i) as string | number[];
					let orderIds: number[] = [];
					if (Array.isArray(rawOrderIds)) {
						orderIds = rawOrderIds.map(Number);
					} else if (typeof rawOrderIds === 'string') {
						try {
							const parsed = JSON.parse(rawOrderIds);
							if (Array.isArray(parsed)) {
								orderIds = parsed.map(Number);
							} else {
								orderIds = [Number(parsed)];
							}
						} catch {
							orderIds = rawOrderIds
								.split(',')
								.map((s) => s.trim())
								.filter((s) => s.length > 0)
								.map(Number);
						}
					}

					const response = await baselinkerApiRequest.call(this, 'addPickPackOrdersToCart', {
						cart_id: cartId,
						order_ids: orderIds,
					});
					returnData.push({
						json: {
							success: true,
							cart_id: cartId,
							orders_assigned: response.orders_assigned,
							orders_failed: response.orders_failed || [],
							...response,
						},
						pairedItem: { item: i },
					});
				} else if (operation === 'deletePickPackCartOrders') {
					const cartId = this.getNodeParameter('clearCartId', i) as number;
					const response = await baselinkerApiRequest.call(this, 'deletePickPackCartOrders', { cart_id: cartId });
					returnData.push({
						json: {
							success: true,
							cart_id: cartId,
							orders_removed: response.orders_removed,
							...response,
						},
						pairedItem: { item: i },
					});
				} else if (operation === 'deletePickPackOrderFromCart') {
					const orderId = this.getNodeParameter('removeOrderCartOrderId', i) as number;
					const response = await baselinkerApiRequest.call(this, 'deletePickPackOrderFromCart', { order_id: orderId });
					returnData.push({
						json: {
							success: true,
							order_id: orderId,
							...response,
						},
						pairedItem: { item: i },
					});
				} else if (resource === 'crm') {
					if (operation === 'getCrmClients') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let clients: IBaseLinkerCrmClient[] = [];

						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('parametersJson', i) as string | IDataObject;
							let parsedParams: IDataObject = {};
							if (typeof rawJson === 'string') {
								try {
									parsedParams = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for getCrmClients: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								parsedParams = rawJson;
							}
							const response = await baselinkerApiRequest.call(this, 'getCrmClients', parsedParams);
							clients = response.clients || [];
						} else {
							const returnAll = this.getNodeParameter('returnAll', i, false) as boolean;
							const limit = this.getNodeParameter('limit', i, 100) as number;
							const delayMs = this.getNodeParameter('delayMs', i, 650) as number;
							const page = this.getNodeParameter('page', i, 1) as number;
							const filters = this.getNodeParameter('filters', i, {}) as IDataObject;

							const params: IDataObject = { ...filters };
							if (!returnAll) {
								params.page = page;
							}

							clients = await baselinkerGetCrmClientsAll.call(this, params, {
								returnAll,
								limit,
								delayMs,
							});
						}

						for (const client of clients) {
							returnData.push({
								json: client,
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'getCrmClientData') {
						const crmClientId = this.getNodeParameter('crm_client_id', i) as number;
						const includeCustomExtraFields = this.getNodeParameter(
							'include_custom_extra_fields',
							i,
							false,
						) as boolean;

						const params: IDataObject = {
							crm_client_id: crmClientId,
						};
						if (includeCustomExtraFields) {
							params.include_custom_extra_fields = true;
						}

						const response = await baselinkerApiRequest.call(this, 'getCrmClientData', params);
						const { status: _status, ...clientData } = response;

						returnData.push({
							json: clientData,
							pairedItem: { item: i },
						});
					} else if (operation === 'getCrmClientStatusGroups') {
						const response = await baselinkerApiRequest.call(this, 'getCrmClientStatusGroups', {});
						const groups: IBaseLinkerCrmStatusGroup[] = response.status_groups || [];
						for (const group of groups) {
							returnData.push({
								json: group,
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'getCrmClientStatuses') {
						const filterGroupId = this.getNodeParameter('filterGroupId', i, undefined) as
							| number
							| undefined;
						const response = await baselinkerApiRequest.call(this, 'getCrmClientStatuses', {});
						let statuses: IBaseLinkerCrmStatus[] = response.statuses || [];

						if (filterGroupId !== undefined && filterGroupId !== null && String(filterGroupId) !== '') {
							statuses = statuses.filter((st) => st.group_id === Number(filterGroupId));
						}

						for (const st of statuses) {
							returnData.push({
								json: st,
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'addCrmClient') {
						const mode = this.getNodeParameter('addCrmClientMode', i, 'fields') as string;
						let params: IDataObject = {};

						if (mode === 'json') {
							const rawJson = this.getNodeParameter('addCrmClientJson', i) as string | IDataObject;
							let parsedParams: IDataObject;
							if (typeof rawJson === 'string') {
								try {
									parsedParams = JSON.parse(rawJson);
								} catch (err: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON in Parameters (JSON): ${err.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								parsedParams = rawJson;
							}
							params = parsedParams;
						} else {
							const rawClientId = this.getNodeParameter('crm_client_id', i, '') as number | string;
							const email = this.getNodeParameter('email', i, '') as string;
							const phone = this.getNodeParameter('phone', i, '') as string;
							const statusId = this.getNodeParameter('status_id', i, '') as number | string;
							const star = this.getNodeParameter('star', i, 0) as number;
							const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

							params = {
								...additionalFields,
							};

							if (rawClientId !== '' && rawClientId !== undefined && rawClientId !== null) {
								params.crm_client_id = Number(rawClientId);
							}
							if (email) {
								params.email = email;
							}
							if (phone) {
								params.phone = phone;
							}
							if (statusId !== '' && statusId !== undefined && statusId !== null) {
								params.status_id = Number(statusId);
							}
							if (star !== undefined && star !== null) {
								params.star = star;
							}

							// Process custom extra fields
							const customExtraFields: Record<string, any> = {};
							const customExtraFieldsJson = this.getNodeParameter('customExtraFieldsJson', i, '') as string | IDataObject;
							if (customExtraFieldsJson) {
								let parsedJson: any = customExtraFieldsJson;
								if (typeof parsedJson === 'string') {
									const trimmed = parsedJson.trim();
									if (trimmed) {
										try {
											parsedJson = JSON.parse(trimmed);
										} catch (err: any) {
											throw new NodeOperationError(
												this.getNode(),
												`Invalid JSON provided for Custom Extra Fields (JSON): ${err.message}`,
												{ itemIndex: i },
											);
										}
									} else {
										parsedJson = null;
									}
								}
								if (parsedJson && typeof parsedJson === 'object' && !Array.isArray(parsedJson)) {
									for (const [key, val] of Object.entries(parsedJson)) {
										customExtraFields[key] = val;
									}
								}
							}

							const customFieldsUi = this.getNodeParameter('customExtraFieldsUi', i, {}) as {
								fields?: Array<{ field_id: string | number; value: any }>;
							};
							if (customFieldsUi?.fields && Array.isArray(customFieldsUi.fields)) {
								for (const item of customFieldsUi.fields) {
									if (item.field_id !== undefined && item.field_id !== '') {
										customExtraFields[String(item.field_id)] = item.value !== undefined ? item.value : '';
									}
								}
							}

							if (Object.keys(customExtraFields).length > 0) {
								params.custom_extra_fields = customExtraFields;
							}
						}

						const response = await baselinkerApiRequest.call(this, 'addCrmClient', params);
						returnData.push({
							json: {
								success: true,
								crm_client_id: response.crm_client_id ?? params.crm_client_id,
								...params,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'deleteCrmClient') {
						const clientId = this.getNodeParameter('delete_crm_client_id', i) as number;
						if (!clientId) {
							throw new NodeOperationError(
								this.getNode(),
								'Parameter "CRM Client ID" is required for deleteCrmClient',
								{ itemIndex: i },
							);
						}

						const response = await baselinkerApiRequest.call(this, 'deleteCrmClient', {
							crm_client_id: clientId,
						});
						returnData.push({
							json: {
								success: true,
								crm_client_id: clientId,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'getCrmClientExtraFields') {
						const response = await baselinkerApiRequest.call(this, 'getCrmClientExtraFields', {});
						const rawFields = response.extra_fields || [];
						const extraFields: IBaseLinkerCrmClientExtraField[] = Array.isArray(rawFields)
							? rawFields
							: Object.values(rawFields);
						for (const field of extraFields) {
							returnData.push({
								json: field as IDataObject,
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'addCrmClientStatus') {
						const mode = this.getNodeParameter('addCrmClientStatusMode', i, 'fields') as string;
						let params: IDataObject = {};

						if (mode === 'json') {
							const rawJson = this.getNodeParameter('addCrmClientStatusJson', i) as string | IDataObject;
							let parsedParams: IDataObject;
							if (typeof rawJson === 'string') {
								try {
									parsedParams = JSON.parse(rawJson);
								} catch (err: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON in Parameters (JSON): ${err.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								parsedParams = rawJson;
							}
							if (!parsedParams.name) {
								throw new NodeOperationError(
									this.getNode(),
									'Parameter "name" is required in addCrmClientStatus JSON payload',
									{ itemIndex: i },
								);
							}
							params = parsedParams;
						} else {
							const name = this.getNodeParameter('status_name', i) as string;
							const color = this.getNodeParameter('status_color', i, '#336699') as string;
							const groupId = this.getNodeParameter('status_group_id', i, '') as number | string;
							const updateStatusId = this.getNodeParameter('update_status_id', i, '') as number | string;

							params = {
								name,
								color,
							};
							if (groupId !== '' && groupId !== undefined && groupId !== null) {
								params.group_id = Number(groupId);
							}
							if (updateStatusId !== '' && updateStatusId !== undefined && updateStatusId !== null) {
								params.status_id = Number(updateStatusId);
							}
						}

						const response = await baselinkerApiRequest.call(this, 'addCrmClientStatus', params);
						returnData.push({
							json: {
								success: true,
								status_id: response.status_id ?? params.status_id,
								...params,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'addCrmClientStatusGroup') {
						const mode = this.getNodeParameter('addCrmClientStatusGroupMode', i, 'fields') as string;
						let params: IDataObject = {};

						if (mode === 'json') {
							const rawJson = this.getNodeParameter('addCrmClientStatusGroupJson', i) as string | IDataObject;
							let parsedParams: IDataObject;
							if (typeof rawJson === 'string') {
								try {
									parsedParams = JSON.parse(rawJson);
								} catch (err: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON in Parameters (JSON): ${err.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								parsedParams = rawJson;
							}
							if (!parsedParams.name) {
								throw new NodeOperationError(
									this.getNode(),
									'Parameter "name" is required in addCrmClientStatusGroup JSON payload',
									{ itemIndex: i },
								);
							}
							params = parsedParams;
						} else {
							const name = this.getNodeParameter('group_name', i) as string;
							const updateGroupId = this.getNodeParameter('update_group_id', i, '') as number | string;

							params = {
								name,
							};
							if (updateGroupId !== '' && updateGroupId !== undefined && updateGroupId !== null) {
								params.group_id = Number(updateGroupId);
							}
						}

						const response = await baselinkerApiRequest.call(this, 'addCrmClientStatusGroup', params);
						returnData.push({
							json: {
								success: true,
								group_id: response.group_id ?? params.group_id,
								...params,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'deleteCrmClientStatus') {
						const mode = this.getNodeParameter('deleteCrmClientStatusMode', i, 'fields') as string;
						let statusId: number;
						let targetStatusId: number;

						if (mode === 'json') {
							const rawJson = this.getNodeParameter('deleteCrmClientStatusJson', i) as string | IDataObject;
							let parsedParams: IDataObject;
							if (typeof rawJson === 'string') {
								try {
									parsedParams = JSON.parse(rawJson);
								} catch (err: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON in Parameters (JSON): ${err.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								parsedParams = rawJson;
							}

							if (parsedParams.status_id === undefined || parsedParams.target_status_id === undefined) {
								throw new NodeOperationError(
									this.getNode(),
									'Parameters "status_id" and "target_status_id" are required in deleteCrmClientStatus JSON payload',
									{ itemIndex: i },
								);
							}
							statusId = Number(parsedParams.status_id);
							targetStatusId = Number(parsedParams.target_status_id);
						} else {
							const rawStatusId = this.getNodeParameter('delete_status_id', i);
							const rawTargetStatusId = this.getNodeParameter('target_status_id', i);
							statusId = Number(rawStatusId);
							targetStatusId = Number(rawTargetStatusId);
						}

						if (isNaN(statusId) || isNaN(targetStatusId)) {
							throw new NodeOperationError(
								this.getNode(),
								'Parameters "status_id" and "target_status_id" must be valid numbers',
								{ itemIndex: i },
							);
						}

						if (statusId === targetStatusId) {
							throw new NodeOperationError(
								this.getNode(),
								'Parameter "target_status_id" must be different from "status_id"',
								{ itemIndex: i },
							);
						}

						const response = await baselinkerApiRequest.call(this, 'deleteCrmClientStatus', {
							status_id: statusId,
							target_status_id: targetStatusId,
						});
						returnData.push({
							json: {
								success: true,
								status_id: statusId,
								target_status_id: targetStatusId,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'deleteCrmClientStatusGroup') {
						const mode = this.getNodeParameter('deleteCrmClientStatusGroupMode', i, 'fields') as string;
						let groupId: number;

						if (mode === 'json') {
							const rawJson = this.getNodeParameter('deleteCrmClientStatusGroupJson', i) as string | IDataObject;
							let parsedParams: IDataObject;
							if (typeof rawJson === 'string') {
								try {
									parsedParams = JSON.parse(rawJson);
								} catch (err: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON in Parameters (JSON): ${err.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								parsedParams = rawJson;
							}

							if (parsedParams.group_id === undefined) {
								throw new NodeOperationError(
									this.getNode(),
									'Parameter "group_id" is required in deleteCrmClientStatusGroup JSON payload',
									{ itemIndex: i },
								);
							}
							groupId = Number(parsedParams.group_id);
						} else {
							const rawGroupId = this.getNodeParameter('delete_group_id', i);
							groupId = Number(rawGroupId);
						}

						if (isNaN(groupId)) {
							throw new NodeOperationError(
								this.getNode(),
								'Parameter "group_id" must be a valid number',
								{ itemIndex: i },
							);
						}

						const response = await baselinkerApiRequest.call(this, 'deleteCrmClientStatusGroup', {
							group_id: groupId,
						});
						returnData.push({
							json: {
								success: true,
								group_id: groupId,
								...response,
							},
							pairedItem: { item: i },
						});
					}
				} else if (resource === 'invoices') {
					if (operation === 'getInvoices') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let invoices: IBaseLinkerInvoice[] = [];

						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('parametersJson', i) as string | IDataObject;
							let parsedParams: IDataObject = {};
							if (typeof rawJson === 'string') {
								try {
									parsedParams = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for getInvoices: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								parsedParams = rawJson;
							}
							const response = await baselinkerApiRequest.call(this, 'getInvoices', parsedParams);
							invoices = response.invoices || [];
						} else {
							const returnAll = this.getNodeParameter('returnAll', i, false) as boolean;
							const limit = this.getNodeParameter('limit', i, 100) as number;
							const paginationField = this.getNodeParameter('paginationField', i, 'id_from') as
								| 'id_from'
								| 'date_from';
							const delayMs = this.getNodeParameter('delayMs', i, 650) as number;
							const filters = this.getNodeParameter('filters', i, {}) as IDataObject;

							const params: IDataObject = { ...filters };
							if (params.date_from) {
								const normalizedDate = normalizeTimestamp(params.date_from);
								if (normalizedDate !== undefined) {
									params.date_from = normalizedDate;
								}
							}

							invoices = await baselinkerGetInvoicesAll.call(this, params, {
								returnAll,
								limit,
								paginationField,
								delayMs,
							});
						}

						for (const inv of invoices) {
							returnData.push({
								json: inv,
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'getInvoiceFile') {
						const invoiceId = this.getNodeParameter('invoice_id', i) as number;
						const getExternal = this.getNodeParameter('get_external', i, false) as boolean;
						const downloadBinary = this.getNodeParameter('downloadBinary', i, false) as boolean;

						const response = await baselinkerApiRequest.call(this, 'getInvoiceFile', {
							invoice_id: invoiceId,
							get_external: getExternal,
						});

						const itemData: INodeExecutionData = {
							json: {
								invoice_id: invoiceId,
								invoice_number: response.invoice_number,
								invoice: response.invoice,
							},
							pairedItem: { item: i },
						};

						if (downloadBinary && response.invoice) {
							const binaryPropertyName = this.getNodeParameter('binaryPropertyName', i, 'data') as string;
							const customFileName = this.getNodeParameter('fileName', i, '') as string;
							const sanitizedNumber = (response.invoice_number || `${invoiceId}`)
								.replace(/[\/\\]/g, '_')
								.replace(/\s+/g, '_');
							const fileName = customFileName || `invoice_${sanitizedNumber}.pdf`;

							let base64Data = (response.invoice as string) || '';
							if (base64Data.startsWith('data:')) {
								base64Data = base64Data.slice(5);
							}

							const buffer = Buffer.from(base64Data, 'base64');
							const binaryData = await this.helpers.prepareBinaryData(buffer, fileName, 'application/pdf');
							itemData.binary = {
								[binaryPropertyName]: binaryData,
							};
						}

						returnData.push(itemData);
					} else if (operation === 'getSeries') {
						const seriesTypeFilter = this.getNodeParameter('seriesTypeFilter', i, 'all') as string;
						const response = await baselinkerApiRequest.call(this, 'getSeries', {});
						let series: IBaseLinkerInvoiceSeries[] = response.series || [];

						if (seriesTypeFilter !== 'all') {
							series = series.filter((s) => s.type === seriesTypeFilter);
						}

						for (const s of series) {
							returnData.push({
								json: s,
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'addInvoice') {
						const mode = this.getNodeParameter('addInvoiceMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (mode === 'json') {
							const rawJson = this.getNodeParameter('addInvoiceJson', i) as string | IDataObject;
							let parsedParams: IDataObject;
							if (typeof rawJson === 'string') {
								try {
									parsedParams = JSON.parse(rawJson);
								} catch (err: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON in Parameters (JSON): ${err.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								parsedParams = rawJson;
							}
							if (!parsedParams.order_id) {
								throw new NodeOperationError(
									this.getNode(),
									'Parameter "order_id" is required for addInvoice',
									{ itemIndex: i },
								);
							}
							params = parsedParams;
						} else {
							const orderId = this.getNodeParameter('addInvoiceOrderId', i) as number;
							const seriesId = this.getNodeParameter('addInvoiceSeriesId', i, '') as number | string;
							const vatRate = this.getNodeParameter('addInvoiceVatRate', i, 'DEFAULT') as string;

							params = { order_id: orderId };
							if (seriesId !== '' && seriesId !== undefined && seriesId !== null) {
								params.series_id = Number(seriesId);
							}
							if (vatRate === 'custom') {
								params.vat_rate = this.getNodeParameter('addInvoiceVatRateCustom', i, 23);
							} else if (vatRate) {
								params.vat_rate = vatRate;
							}
						}

						const response = await baselinkerApiRequest.call(this, 'addInvoice', params);
						returnData.push({
							json: {
								success: true,
								invoice_id: response.invoice_id,
								order_id: params.order_id,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'addInvoiceCorrection') {
						const mode = this.getNodeParameter('addCorrectionMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (mode === 'json') {
							const rawJson = this.getNodeParameter('addCorrectionJson', i) as string | IDataObject;
							let parsedParams: IDataObject;
							if (typeof rawJson === 'string') {
								try {
									parsedParams = JSON.parse(rawJson);
								} catch (err: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON in Parameters (JSON): ${err.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								parsedParams = rawJson;
							}
							if (!parsedParams.original_invoice_id && !parsedParams.return_order_id) {
								throw new NodeOperationError(
									this.getNode(),
									'Either "original_invoice_id" or "return_order_id" must be provided in addInvoiceCorrection',
									{ itemIndex: i },
								);
							}
							params = parsedParams;
						} else {
							const idType = this.getNodeParameter('correctionIdentifierType', i, 'original_invoice_id') as string;
							if (idType === 'original_invoice_id') {
								params.original_invoice_id = this.getNodeParameter('correctionOriginalInvoiceId', i) as number;
							} else {
								params.return_order_id = this.getNodeParameter('correctionReturnOrderId', i) as number;
							}

							const seriesId = this.getNodeParameter('correctionSeriesId', i, '') as number | string;
							if (seriesId !== '' && seriesId !== undefined && seriesId !== null) {
								params.series_id = Number(seriesId);
							}

							const additional = this.getNodeParameter('correctionAdditionalFields', i, {}) as IDataObject;
							const { itemsJson, date_sell, ...restAdditional } = additional;
							Object.assign(params, restAdditional);

							if (date_sell) {
								const normalized = normalizeTimestamp(date_sell);
								if (normalized !== undefined) {
									params.date_sell = normalized;
								}
							}

							if (itemsJson) {
								if (typeof itemsJson === 'string' && itemsJson.trim()) {
									try {
										params.items = JSON.parse(itemsJson);
									} catch (err: any) {
										throw new NodeOperationError(
											this.getNode(),
											`Invalid JSON in Items (JSON): ${err.message}`,
											{ itemIndex: i },
										);
									}
								} else if (Array.isArray(itemsJson)) {
									params.items = itemsJson;
								}
							}
						}

						const response = await baselinkerApiRequest.call(this, 'addInvoiceCorrection', params);
						returnData.push({
							json: {
								success: true,
								invoice_id: response.invoice_id,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'addOrderInvoiceFile') {
						const invoiceId = this.getNodeParameter('invoiceFileInvoiceId', i) as number;
						const fileSource = this.getNodeParameter('invoiceFileInputSource', i, 'binary') as string;
						const externalNumber = this.getNodeParameter('invoiceFileExternalNumber', i, '') as string;
						let fileStr = '';

						if (fileSource === 'binary') {
							const binaryProp = this.getNodeParameter('invoiceFileBinaryPropertyName', i, 'data') as string;
							const itemBinary = items[i].binary;
							if (!itemBinary || !itemBinary[binaryProp]) {
								throw new NodeOperationError(
									this.getNode(),
									`Binary property "${binaryProp}" not found on input item`,
									{ itemIndex: i },
								);
							}
							const base64Data = itemBinary[binaryProp].data;
							fileStr = base64Data.startsWith('data:') ? base64Data : `data:${base64Data}`;
						} else {
							fileStr = this.getNodeParameter('invoiceFileBase64', i) as string;
							if (!fileStr.startsWith('data:')) {
								fileStr = `data:${fileStr}`;
							}
						}

						const params: IDataObject = {
							invoice_id: invoiceId,
							file: fileStr,
						};
						if (externalNumber) {
							params.external_invoice_number = externalNumber;
						}

						const response = await baselinkerApiRequest.call(this, 'addOrderInvoiceFile', params);
						returnData.push({
							json: {
								success: true,
								invoice_id: invoiceId,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'addReceipt') {
						const mode = this.getNodeParameter('addReceiptMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (mode === 'json') {
							const rawJson = this.getNodeParameter('addReceiptJson', i) as string | IDataObject;
							let parsedParams: IDataObject;
							if (typeof rawJson === 'string') {
								try {
									parsedParams = JSON.parse(rawJson);
								} catch (err: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON in Parameters (JSON): ${err.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								parsedParams = rawJson;
							}
							if (!parsedParams.order_id) {
								throw new NodeOperationError(
									this.getNode(),
									'Parameter "order_id" is required for addReceipt',
									{ itemIndex: i },
								);
							}
							params = parsedParams;
						} else {
							const orderId = this.getNodeParameter('addReceiptOrderId', i) as number;
							const seriesId = this.getNodeParameter('addReceiptSeriesId', i, '') as number | string;
							params = { order_id: orderId };
							if (seriesId !== '' && seriesId !== undefined && seriesId !== null) {
								params.series_id = Number(seriesId);
							}
						}

						const response = await baselinkerApiRequest.call(this, 'addReceipt', params);
						returnData.push({
							json: {
								success: true,
								receipt_id: response.receipt_id,
								order_id: params.order_id,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'getReceipt') {
						const lookupBy = this.getNodeParameter('getReceiptLookupBy', i, 'receipt_id') as string;
						const params: IDataObject = {};
						if (lookupBy === 'receipt_id') {
							params.receipt_id = this.getNodeParameter('getReceiptReceiptId', i) as number;
						} else {
							params.order_id = this.getNodeParameter('getReceiptOrderId', i) as number;
						}

						const response = await baselinkerApiRequest.call(this, 'getReceipt', params);
						returnData.push({
							json: response,
							pairedItem: { item: i },
						});
					} else if (operation === 'getReceipts') {
						const mode = this.getNodeParameter('getReceiptsMode', i, 'fields') as string;
						let receipts: IBaseLinkerReceipt[] = [];

						if (mode === 'json') {
							const rawJson = this.getNodeParameter('getReceiptsJson', i) as string | IDataObject;
							let parsedParams: IDataObject = {};
							if (typeof rawJson === 'string') {
								try {
									parsedParams = JSON.parse(rawJson);
								} catch (err: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for getReceipts: ${err.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								parsedParams = rawJson;
							}
							const response = await baselinkerApiRequest.call(this, 'getReceipts', parsedParams);
							receipts = response.receipts || [];
						} else {
							const returnAll = this.getNodeParameter('getReceiptsReturnAll', i, false) as boolean;
							const limit = returnAll ? 0 : (this.getNodeParameter('getReceiptsLimit', i, 100) as number);
							const delayMs = this.getNodeParameter('getReceiptsDelayMs', i, 650) as number;
							const filters = this.getNodeParameter('getReceiptsFilters', i, {}) as IDataObject;

							const params: IDataObject = { ...filters };
							if (params.date_from) {
								const normalized = normalizeTimestamp(params.date_from);
								if (normalized !== undefined) params.date_from = normalized;
							}
							if (params.date_to) {
								const normalized = normalizeTimestamp(params.date_to);
								if (normalized !== undefined) params.date_to = normalized;
							}

							receipts = await baselinkerGetReceiptsAll.call(this, params, {
								returnAll,
								limit,
								delayMs,
							});
						}

						for (const receipt of receipts) {
							returnData.push({
								json: receipt,
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'getNewReceipts') {
						const seriesId = this.getNodeParameter('getNewReceiptsSeriesId', i, '') as number | string;
						const idFrom = this.getNodeParameter('getNewReceiptsIdFrom', i, 0) as number;
						const deviceId = this.getNodeParameter('getNewReceiptsDeviceId', i, '') as string;

						const params: IDataObject = {};
						if (seriesId !== '' && seriesId !== undefined && seriesId !== null) {
							params.series_id = Number(seriesId);
						}
						if (idFrom) {
							params.id_from = idFrom;
						}
						if (deviceId) {
							params.device_id = deviceId;
						}

						const response = await baselinkerApiRequest.call(this, 'getNewReceipts', params);
						const orders = response.orders || [];
						for (const ord of orders) {
							returnData.push({
								json: ord,
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'setOrderReceipt') {
						const mode = this.getNodeParameter('setOrderReceiptMode', i, 'fields') as string;
						let params: IDataObject = {};

						if (mode === 'json') {
							const rawJson = this.getNodeParameter('setOrderReceiptJson', i) as string | IDataObject;
							let parsedParams: IDataObject;
							if (typeof rawJson === 'string') {
								try {
									parsedParams = JSON.parse(rawJson);
								} catch (err: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON in Parameters (JSON): ${err.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								parsedParams = rawJson;
							}
							if (!parsedParams.receipt_id) {
								throw new NodeOperationError(
									this.getNode(),
									'Parameter "receipt_id" is required for setOrderReceipt',
									{ itemIndex: i },
								);
							}
							params = parsedParams;
						} else {
							const receiptId = this.getNodeParameter('setReceiptId', i) as number;
							const receiptNr = this.getNodeParameter('setReceiptNr', i, '') as string;
							const receiptDate = this.getNodeParameter('setReceiptDate', i, '') as string;
							const printerError = this.getNodeParameter('setReceiptPrinterError', i, false) as boolean;
							const printerName = this.getNodeParameter('setReceiptPrinterName', i, '') as string;

							params = {
								receipt_id: receiptId,
								printer_error: printerError,
							};
							if (receiptNr) {
								params.receipt_nr = receiptNr;
							}
							if (receiptDate) {
								const normalized = normalizeTimestamp(receiptDate);
								if (normalized !== undefined) {
									params.date = normalized;
								}
							}
							if (printerName) {
								params.printer_name = printerName;
							}
						}

						const response = await baselinkerApiRequest.call(this, 'setOrderReceipt', params);
						returnData.push({
							json: {
								success: true,
								receipt_id: params.receipt_id,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'addOrderReceiptFile') {
						const receiptId = this.getNodeParameter('receiptFileReceiptId', i) as number;
						const fileSource = this.getNodeParameter('receiptFileInputSource', i, 'binary') as string;
						const externalNumber = this.getNodeParameter('receiptFileExternalNumber', i, '') as string;
						let fileStr = '';

						if (fileSource === 'binary') {
							const binaryProp = this.getNodeParameter('receiptFileBinaryPropertyName', i, 'data') as string;
							const itemBinary = items[i].binary;
							if (!itemBinary || !itemBinary[binaryProp]) {
								throw new NodeOperationError(
									this.getNode(),
									`Binary property "${binaryProp}" not found on input item`,
									{ itemIndex: i },
								);
							}
							const base64Data = itemBinary[binaryProp].data;
							fileStr = base64Data.startsWith('data:') ? base64Data : `data:${base64Data}`;
						} else {
							fileStr = this.getNodeParameter('receiptFileString', i) as string;
						}

						const params: IDataObject = {
							receipt_id: receiptId,
							file: fileStr,
						};
						if (externalNumber) {
							params.external_receipt_number = externalNumber;
						}

						const response = await baselinkerApiRequest.call(this, 'addOrderReceiptFile', params);
						returnData.push({
							json: {
								success: true,
								receipt_id: receiptId,
								...response,
							},
							pairedItem: { item: i },
						});
					}
				} else if (resource === 'productCatalog') {
					if (operation === 'getInventories') {
						const response = await baselinkerApiRequest.call(this, 'getInventories', {});
						const inventories: IBaseLinkerInventory[] = response.inventories || [];
						for (const inv of inventories) {
							returnData.push({
								json: inv,
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'getInventoryWarehouses') {
						const response = await baselinkerApiRequest.call(this, 'getInventoryWarehouses', {});
						const warehouses: IBaseLinkerWarehouse[] = response.warehouses || [];
						for (const wh of warehouses) {
							returnData.push({
								json: wh,
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'getInventoryProductsList') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let products: IBaseLinkerProductListItem[] = [];

						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('parametersJson', i) as string | IDataObject;
							let parsedParams: IDataObject = {};
							if (typeof rawJson === 'string') {
								try {
									parsedParams = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for getInventoryProductsList: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								parsedParams = rawJson;
							}
							const response = await baselinkerApiRequest.call(
								this,
								'getInventoryProductsList',
								parsedParams,
							);
							const rawProducts = response.products || {};
							products = Array.isArray(rawProducts) ? rawProducts : Object.values(rawProducts);
						} else {
							const inventoryId = this.getNodeParameter('inventory_id', i) as number;
							const returnAll = this.getNodeParameter('returnAll', i, false) as boolean;
							const limit = this.getNodeParameter('limit', i, 100) as number;
							const delayMs = this.getNodeParameter('delayMs', i, 650) as number;
							const page = this.getNodeParameter('page', i, 1) as number;
							const filters = this.getNodeParameter('filters', i, {}) as IDataObject;

							const params: IDataObject = {
								inventory_id: Number(inventoryId),
								...filters,
							};
							if (!returnAll) {
								params.page = page;
							}

							products = await baselinkerGetInventoryProductsListAll.call(this, params, {
								returnAll,
								limit,
								delayMs,
							});
						}

						for (const prod of products) {
							returnData.push({
								json: prod,
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'getInventoryProductsData') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let rawProducts: Record<string, any> = {};

						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('parametersJson', i) as string | IDataObject;
							let parsedParams: IDataObject = {};
							if (typeof rawJson === 'string') {
								try {
									parsedParams = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for getInventoryProductsData: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								parsedParams = rawJson;
							}
							const response = await baselinkerApiRequest.call(
								this,
								'getInventoryProductsData',
								parsedParams,
							);
							rawProducts = response.products || {};
						} else {
							const inventoryId = this.getNodeParameter('inventory_id', i) as number;
							const rawInput = this.getNodeParameter('products', i) as string | number[];
							let productIds: number[] = [];

							if (Array.isArray(rawInput)) {
								productIds = rawInput.map(Number);
							} else if (typeof rawInput === 'string') {
								try {
									const parsed = JSON.parse(rawInput);
									if (Array.isArray(parsed)) {
										productIds = parsed.map(Number);
									} else {
										productIds = [Number(parsed)];
									}
								} catch {
									productIds = rawInput
										.split(',')
										.map((s) => s.trim())
										.filter((s) => s.length > 0)
										.map(Number);
								}
							}

							const additionalOptions = this.getNodeParameter('additionalOptions', i, {}) as IDataObject;
							const params: IDataObject = {
								inventory_id: Number(inventoryId),
								products: productIds,
								...additionalOptions,
							};

							const response = await baselinkerApiRequest.call(
								this,
								'getInventoryProductsData',
								params,
							);
							rawProducts = response.products || {};
						}

						for (const [prodId, prodData] of Object.entries(rawProducts)) {
							if (typeof prodData === 'object' && prodData !== null) {
								returnData.push({
									json: {
										id: (prodData as any).id ?? (isNaN(Number(prodId)) ? prodId : Number(prodId)),
										...(prodData as object),
									},
									pairedItem: { item: i },
								});
							}
						}
					} else if (operation === 'getInventoryProductsStock') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let stockItems: IBaseLinkerProductStockItem[] = [];

						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('parametersJson', i) as string | IDataObject;
							let parsedParams: IDataObject = {};
							if (typeof rawJson === 'string') {
								try {
									parsedParams = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for getInventoryProductsStock: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								parsedParams = rawJson;
							}
							const response = await baselinkerApiRequest.call(
								this,
								'getInventoryProductsStock',
								parsedParams,
							);
							const rawStock = response.products || {};
							stockItems = Array.isArray(rawStock) ? rawStock : Object.values(rawStock);
						} else {
							const inventoryId = this.getNodeParameter('inventory_id', i) as number;
							const returnAll = this.getNodeParameter('returnAll', i, false) as boolean;
							const limit = this.getNodeParameter('limit', i, 100) as number;
							const delayMs = this.getNodeParameter('delayMs', i, 650) as number;
							const page = this.getNodeParameter('page', i, 1) as number;
							const filters = this.getNodeParameter('filters', i, {}) as IDataObject;

							const params: IDataObject = {
								inventory_id: Number(inventoryId),
								...filters,
							};
							if (!returnAll) {
								params.page = page;
							}

							stockItems = await baselinkerGetInventoryProductsStockAll.call(this, params, {
								returnAll,
								limit,
								delayMs,
							});
						}

						for (const item of stockItems) {
							returnData.push({
								json: item,
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'getInventoryProductsPrices') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let priceItems: IBaseLinkerProductPriceItem[] = [];

						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('parametersJson', i) as string | IDataObject;
							let parsedParams: IDataObject = {};
							if (typeof rawJson === 'string') {
								try {
									parsedParams = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for getInventoryProductsPrices: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								parsedParams = rawJson;
							}
							const response = await baselinkerApiRequest.call(
								this,
								'getInventoryProductsPrices',
								parsedParams,
							);
							const rawPrices = response.products || {};
							priceItems = Array.isArray(rawPrices) ? rawPrices : Object.values(rawPrices);
						} else {
							const inventoryId = this.getNodeParameter('inventory_id', i) as number;
							const returnAll = this.getNodeParameter('returnAll', i, false) as boolean;
							const limit = this.getNodeParameter('limit', i, 100) as number;
							const delayMs = this.getNodeParameter('delayMs', i, 650) as number;
							const page = this.getNodeParameter('page', i, 1) as number;

							const params: IDataObject = {
								inventory_id: Number(inventoryId),
							};
							if (!returnAll) {
								params.page = page;
							}

							priceItems = await baselinkerGetInventoryProductsPricesAll.call(this, params, {
								returnAll,
								limit,
								delayMs,
							});
						}

						for (const item of priceItems) {
							returnData.push({
								json: item,
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'getInventoryProductLogs') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let logs: IBaseLinkerProductLog[] = [];
						let outputFormat = 'perLog';
						let parsedProductId: number | undefined;

						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('parametersJson', i) as string | IDataObject;
							let parsedParams: IDataObject = {};
							if (typeof rawJson === 'string') {
								try {
									parsedParams = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for getInventoryProductLogs: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								parsedParams = rawJson;
							}
							if (parsedParams.product_id) {
								parsedProductId = Number(parsedParams.product_id);
							}
							const response = await baselinkerApiRequest.call(
								this,
								'getInventoryProductLogs',
								parsedParams,
							);
							logs = response.logs || [];
						} else {
							const productId = this.getNodeParameter('product_id', i) as number;
							parsedProductId = Number(productId);
							outputFormat = this.getNodeParameter('outputFormat', i, 'perLog') as string;
							const returnAll = this.getNodeParameter('returnAll', i, false) as boolean;
							const limit = this.getNodeParameter('limit', i, 100) as number;
							const delayMs = this.getNodeParameter('delayMs', i, 650) as number;
							const page = this.getNodeParameter('page', i, 1) as number;
							const filters = this.getNodeParameter('filters', i, {}) as IDataObject;

							const params: IDataObject = {
								product_id: Number(productId),
							};
							if (filters.date_from) {
								const normalized = normalizeTimestamp(filters.date_from as string | number);
								if (normalized !== undefined) {
									params.date_from = normalized;
								}
							}
							if (filters.date_to) {
								const normalized = normalizeTimestamp(filters.date_to as string | number);
								if (normalized !== undefined) {
									params.date_to = normalized;
								}
							}
							if (filters.log_types) {
								params.log_type = Array.isArray(filters.log_types)
									? filters.log_types.map(Number)
									: [Number(filters.log_types)];
							}
							if (filters.sort) {
								params.sort = filters.sort;
							}
							if (!returnAll) {
								params.page = page;
							}

							logs = await baselinkerGetInventoryProductLogsAll.call(this, params, {
								returnAll,
								limit,
								delayMs,
							});
						}

						if (outputFormat === 'flatEntries') {
							for (const log of logs) {
								for (const entry of log.entries || []) {
									returnData.push({
										json: {
											product_id: parsedProductId,
											profile: log.profile,
											date: log.date,
											...entry,
										},
										pairedItem: { item: i },
									});
								}
							}
						} else {
							for (const log of logs) {
								returnData.push({
									json: {
										product_id: parsedProductId,
										...log,
									},
									pairedItem: { item: i },
								});
							}
						}
					} else if (operation === 'addInventory') {
						const mode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};

						if (mode === 'json') {
							const rawJson = this.getNodeParameter('parametersJson', i) as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for addInventory: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const name = this.getNodeParameter('name', i) as string;
							const inventoryId = this.getNodeParameter('inventory_id', i, 0) as number;
							const description = this.getNodeParameter('description', i, '') as string;
							const defaultLanguage = this.getNodeParameter('default_language', i, 'pl') as string;
							const languagesRaw = this.getNodeParameter('languages', i, 'pl') as string;
							const defaultPriceGroup = this.getNodeParameter('default_price_group', i, '') as number | string;
							const priceGroupsRaw = this.getNodeParameter('price_groups', i, '') as string;
							const defaultWarehouse = this.getNodeParameter('default_warehouse', i, '') as string;
							const warehousesRaw = this.getNodeParameter('warehouses', i, '') as string;
							const reservations = this.getNodeParameter('reservations', i, true) as boolean;

							params = {
								name,
								default_language: defaultLanguage,
								reservations,
							};
							if (inventoryId && Number(inventoryId) > 0) {
								params.inventory_id = Number(inventoryId);
							}
							if (description) {
								params.description = description;
							}
							if (languagesRaw) {
								params.languages = languagesRaw.split(',').map((s) => s.trim()).filter((s) => s.length > 0);
							}
							if (defaultPriceGroup !== '' && defaultPriceGroup !== undefined && defaultPriceGroup !== null) {
								params.default_price_group = Number(defaultPriceGroup);
							}
							if (priceGroupsRaw) {
								params.price_groups = priceGroupsRaw.split(',').map((s) => s.trim()).filter((s) => s.length > 0).map(Number);
							}
							if (defaultWarehouse) {
								params.default_warehouse = defaultWarehouse;
							}
							if (warehousesRaw) {
								params.warehouses = warehousesRaw.split(',').map((s) => s.trim()).filter((s) => s.length > 0);
							}
						}

						const response = await baselinkerApiRequest.call(this, 'addInventory', params);
						returnData.push({
							json: {
								success: true,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'deleteInventory') {
						const inventoryId = this.getNodeParameter('inventory_id', i) as number;
						const params = { inventory_id: Number(inventoryId) };
						const response = await baselinkerApiRequest.call(this, 'deleteInventory', params);
						returnData.push({
							json: {
								success: true,
								inventory_id: Number(inventoryId),
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'addInventoryWarehouse') {
						const mode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};

						if (mode === 'json') {
							const rawJson = this.getNodeParameter('parametersJson', i) as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for addInventoryWarehouse: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const name = this.getNodeParameter('name', i) as string;
							const warehouseId = this.getNodeParameter('warehouse_id', i, 0) as number;
							const description = this.getNodeParameter('description', i, '') as string;
							const stockEdition = this.getNodeParameter('stock_edition', i, false) as boolean;
							const country = this.getNodeParameter('country', i, 'PL') as string;
							const address = this.getNodeParameter('address', i, '') as string;
							const city = this.getNodeParameter('city', i, '') as string;
							const postcode = this.getNodeParameter('postcode', i, '') as string;

							params = {
								name,
								stock_edition: stockEdition,
								country,
							};
							if (warehouseId && Number(warehouseId) > 0) {
								params.warehouse_id = Number(warehouseId);
							}
							if (description) params.description = description;
							if (address) params.address = address;
							if (city) params.city = city;
							if (postcode) params.postcode = postcode;
						}

						const response = await baselinkerApiRequest.call(this, 'addInventoryWarehouse', params);
						returnData.push({
							json: {
								success: true,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'deleteInventoryWarehouse') {
						const warehouseId = this.getNodeParameter('warehouse_id', i) as number;
						const params = { warehouse_id: Number(warehouseId) };
						const response = await baselinkerApiRequest.call(this, 'deleteInventoryWarehouse', params);
						returnData.push({
							json: {
								success: true,
								warehouse_id: Number(warehouseId),
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'getInventoryMaps') {
						const response = await baselinkerApiRequest.call(this, 'getInventoryMaps', {});
						const maps = response.maps || [];
						for (const m of maps) {
							returnData.push({
								json: m,
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'getInventoryMapDetails') {
						const mapId = this.getNodeParameter('map_id', i) as number;
						const response = await baselinkerApiRequest.call(this, 'getInventoryMapDetails', {
							map_id: Number(mapId),
						});
						returnData.push({
							json: {
								map_id: Number(mapId),
								...(response.map || response),
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'updateInventoryProductsStock') {
						const mode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};

						if (mode === 'json') {
							const rawJson = this.getNodeParameter('parametersJson', i) as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for updateInventoryProductsStock: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const inventoryId = this.getNodeParameter('inventory_id', i) as number;
							const stockUpdateMode = this.getNodeParameter('stockUpdateMode', i, 'single') as string;

							if (stockUpdateMode === 'single') {
								const productId = String(this.getNodeParameter('product_id', i));
								const warehouseId = String(this.getNodeParameter('warehouse_id', i));
								const quantity = Number(this.getNodeParameter('quantity', i, 0));

								params = {
									inventory_id: Number(inventoryId),
									products: {
										[productId]: {
											[warehouseId]: quantity,
										},
									},
								};
							} else {
								const rawStr = this.getNodeParameter('productsStockJson', i) as string | IDataObject;
								let products: IDataObject = {};
								if (typeof rawStr === 'string') {
									try {
										products = JSON.parse(rawStr);
									} catch (e: any) {
										throw new NodeOperationError(
											this.getNode(),
											`Invalid JSON in productsStockJson: ${e.message}`,
											{ itemIndex: i },
										);
									}
								} else {
									products = rawStr;
								}
								params = {
									inventory_id: Number(inventoryId),
									products,
								};
							}
						}

						const response = await baselinkerApiRequest.call(this, 'updateInventoryProductsStock', params);
						returnData.push({
							json: {
								success: true,
								inventory_id: params.inventory_id,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'updateInventoryProductsPrices') {
						const mode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};

						if (mode === 'json') {
							const rawJson = this.getNodeParameter('parametersJson', i) as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for updateInventoryProductsPrices: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const inventoryId = this.getNodeParameter('inventory_id', i) as number;
							const priceUpdateMode = this.getNodeParameter('priceUpdateMode', i, 'single') as string;

							if (priceUpdateMode === 'single') {
								const productId = String(this.getNodeParameter('product_id', i));
								const priceGroupId = String(this.getNodeParameter('price_group_id', i));
								const priceBrutto = Number(this.getNodeParameter('price_brutto', i, 0));

								params = {
									inventory_id: Number(inventoryId),
									products: {
										[productId]: {
											[priceGroupId]: priceBrutto,
										},
									},
								};
							} else {
								const rawStr = this.getNodeParameter('productsPricesJson', i) as string | IDataObject;
								let products: IDataObject = {};
								if (typeof rawStr === 'string') {
									try {
										products = JSON.parse(rawStr);
									} catch (e: any) {
										throw new NodeOperationError(
											this.getNode(),
											`Invalid JSON in productsPricesJson: ${e.message}`,
											{ itemIndex: i },
										);
									}
								} else {
									products = rawStr;
								}
								params = {
									inventory_id: Number(inventoryId),
									products,
								};
							}
						}

						const response = await baselinkerApiRequest.call(this, 'updateInventoryProductsPrices', params);
						returnData.push({
							json: {
								success: true,
								inventory_id: params.inventory_id,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'addInventoryProduct') {
						const mode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};

						if (mode === 'json') {
							const rawJson = this.getNodeParameter('parametersJson', i) as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for addInventoryProduct: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const inventoryId = this.getNodeParameter('inventory_id', i) as number;
							const name = this.getNodeParameter('name', i) as string;
							const productId = this.getNodeParameter('product_id', i, 0) as number;
							const sku = this.getNodeParameter('sku', i, '') as string;
							const ean = this.getNodeParameter('ean', i, '') as string;
							const categoryId = this.getNodeParameter('category_id', i, '') as number | string;
							const manufacturerId = this.getNodeParameter('manufacturer_id', i, '') as number | string;
							const taxRate = this.getNodeParameter('tax_rate', i, 23) as number;
							const priceBrutto = this.getNodeParameter('price_brutto', i, 0) as number;
							const priceGroupId = this.getNodeParameter('price_group_id', i, '') as number | string;
							const warehouseId = this.getNodeParameter('warehouse_id', i, '') as string;
							const stockQuantity = this.getNodeParameter('stock_quantity', i, 0) as number;
							const weight = this.getNodeParameter('weight', i, 0) as number;
							const description = this.getNodeParameter('description', i, '') as string;
							const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

							params = {
								inventory_id: Number(inventoryId),
								text_fields: {
									name,
									...(description ? { description } : {}),
								},
							};
							if (productId && Number(productId) > 0) params.product_id = Number(productId);
							if (sku) params.sku = sku;
							if (ean) params.ean = ean;
							if (categoryId !== '' && categoryId !== undefined && categoryId !== null) {
								params.category_id = Number(categoryId);
							}
							if (manufacturerId !== '' && manufacturerId !== undefined && manufacturerId !== null) {
								params.manufacturer_id = Number(manufacturerId);
							}
							if (taxRate !== undefined) params.tax_rate = taxRate;
							if (weight) params.weight = weight;

							if (priceBrutto && priceGroupId) {
								params.prices = { [String(priceGroupId)]: priceBrutto };
							}
							if (stockQuantity !== undefined && warehouseId) {
								params.stock = { [String(warehouseId)]: stockQuantity };
							}

							for (const [k, v] of Object.entries(additionalFields)) {
								if (v === undefined || v === null || v === '') continue;
								if (k === 'tags') {
									params.tags = typeof v === 'string' ? v.split(',').map((s) => s.trim()).filter((s) => s.length > 0) : v;
								} else if (k.endsWith('_json')) {
									const targetKey = k.replace('_json', '');
									try {
										const parsed = typeof v === 'string' ? JSON.parse(v) : v;
										if (targetKey === 'text_fields') {
											params.text_fields = { ...((params.text_fields as object) || {}), ...parsed };
										} else if (targetKey === 'prices') {
											params.prices = { ...((params.prices as object) || {}), ...parsed };
										} else if (targetKey === 'stock') {
											params.stock = { ...((params.stock as object) || {}), ...parsed };
										} else {
											params[targetKey] = parsed;
										}
									} catch (e: any) {
										throw new NodeOperationError(
											this.getNode(),
											`Invalid JSON in ${k}: ${e.message}`,
											{ itemIndex: i },
										);
									}
								} else {
									params[k] = v;
								}
							}
						}

						const response = await baselinkerApiRequest.call(this, 'addInventoryProduct', params);
						returnData.push({
							json: {
								success: true,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'deleteInventoryProduct') {
						const productId = this.getNodeParameter('product_id', i) as number;
						const params = { product_id: Number(productId) };
						const response = await baselinkerApiRequest.call(this, 'deleteInventoryProduct', params);
						returnData.push({
							json: {
								success: true,
								product_id: Number(productId),
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'getInventoryParameters') {
						const inventoryId = this.getNodeParameter('inventory_id', i, '') as number | string;
						const params: IDataObject = {};
						if (inventoryId !== '' && inventoryId !== undefined && inventoryId !== null) {
							params.inventory_id = Number(inventoryId);
						}
						const response = await baselinkerApiRequest.call(this, 'getInventoryParameters', params);
						const parameters = response.parameters || [];
						for (const p of parameters) {
							returnData.push({
								json: p,
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'runProductMacroTrigger') {
						const productId = this.getNodeParameter('product_id', i) as number;
						const triggerId = this.getNodeParameter('trigger_id', i) as number;
						const params = {
							product_id: Number(productId),
							trigger_id: Number(triggerId),
						};
						const response = await baselinkerApiRequest.call(this, 'runProductMacroTrigger', params);
						returnData.push({
							json: {
								success: true,
								product_id: Number(productId),
								trigger_id: Number(triggerId),
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'runFulfillmentLinkProducts') {
						const fulfillmentWarehouseId = this.getNodeParameter('fulfillment_warehouse_id', i) as number;
						const rawProductIds = this.getNodeParameter('product_ids', i) as string | number[];
						let productIds: number[] = [];
						if (Array.isArray(rawProductIds)) {
							productIds = rawProductIds.map(Number);
						} else if (typeof rawProductIds === 'string') {
							try {
								const parsed = JSON.parse(rawProductIds);
								productIds = Array.isArray(parsed) ? parsed.map(Number) : [Number(parsed)];
							} catch {
								productIds = rawProductIds.split(',').map((s) => s.trim()).filter((s) => s.length > 0).map(Number);
							}
						}
						const params = {
							fulfillment_warehouse_id: Number(fulfillmentWarehouseId),
							product_ids: productIds,
						};
						const response = await baselinkerApiRequest.call(this, 'runFulfillmentLinkProducts', params);
						returnData.push({
							json: {
								success: true,
								fulfillment_warehouse_id: Number(fulfillmentWarehouseId),
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'getInventoryCategories') {
						const inventoryId = this.getNodeParameter('inventory_id', i) as number;
						const response = await baselinkerApiRequest.call(this, 'getInventoryCategories', {
							inventory_id: Number(inventoryId),
						});
						const rawCategories = response.categories || [];
						const categories = Array.isArray(rawCategories) ? rawCategories : Object.values(rawCategories);
						for (const cat of categories) {
							returnData.push({
								json: cat,
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'addInventoryCategory') {
						const mode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};

						if (mode === 'json') {
							const rawJson = this.getNodeParameter('parametersJson', i) as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for addInventoryCategory: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const inventoryId = this.getNodeParameter('inventory_id', i) as number;
							const name = this.getNodeParameter('name', i) as string;
							const parentId = this.getNodeParameter('parent_id', i, 0) as number;
							const categoryId = this.getNodeParameter('category_id', i, 0) as number;

							params = {
								inventory_id: Number(inventoryId),
								name,
								parent_id: Number(parentId),
							};
							if (categoryId && Number(categoryId) > 0) {
								params.category_id = Number(categoryId);
							}
						}

						const response = await baselinkerApiRequest.call(this, 'addInventoryCategory', params);
						returnData.push({
							json: {
								success: true,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'deleteInventoryCategory') {
						const categoryId = this.getNodeParameter('category_id', i) as number;
						const params = { category_id: Number(categoryId) };
						const response = await baselinkerApiRequest.call(this, 'deleteInventoryCategory', params);
						returnData.push({
							json: {
								success: true,
								category_id: Number(categoryId),
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'getInventoryManufacturers') {
						const returnAll = this.getNodeParameter('returnAll', i, false) as boolean;
						const limit = this.getNodeParameter('limit', i, returnAll ? 0 : 100) as number;
						const delayMs = this.getNodeParameter('delayMs', i, 650) as number;
						const page = this.getNodeParameter('page', i, 1) as number;

						const params: IDataObject = {};
						if (!returnAll) {
							params.page = page;
						}

						const manufacturers = await baselinkerGetInventoryManufacturersAll.call(this, params, {
							returnAll,
							limit,
							delayMs,
						});

						for (const m of manufacturers) {
							returnData.push({
								json: m,
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'addInventoryManufacturer') {
						const mode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};

						if (mode === 'json') {
							const rawJson = this.getNodeParameter('parametersJson', i) as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for addInventoryManufacturer: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const manufacturerName = this.getNodeParameter('manufacturer_name', i) as string;
							const manufacturerId = this.getNodeParameter('manufacturer_id', i, 0) as number;
							const manufacturerUrl = this.getNodeParameter('manufacturer_url', i, '') as string;
							const manufacturerPhoto = this.getNodeParameter('manufacturer_photo', i, '') as string;
							const addressDetails = this.getNodeParameter('addressDetails', i, {}) as IDataObject;

							params = {
								manufacturer_name: manufacturerName,
								...addressDetails,
							};
							if (manufacturerId && Number(manufacturerId) > 0) {
								params.manufacturer_id = Number(manufacturerId);
							}
							if (manufacturerUrl) params.manufacturer_url = manufacturerUrl;
							if (manufacturerPhoto) params.manufacturer_photo = manufacturerPhoto;
						}

						const response = await baselinkerApiRequest.call(this, 'addInventoryManufacturer', params);
						returnData.push({
							json: {
								success: true,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'deleteInventoryManufacturer') {
						const manufacturerId = this.getNodeParameter('manufacturer_id', i) as number;
						const params = { manufacturer_id: Number(manufacturerId) };
						const response = await baselinkerApiRequest.call(this, 'deleteInventoryManufacturer', params);
						returnData.push({
							json: {
								success: true,
								manufacturer_id: Number(manufacturerId),
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'getInventoryPriceGroups') {
						const response = await baselinkerApiRequest.call(this, 'getInventoryPriceGroups', {});
						const priceGroups = response.price_groups || [];
						for (const pg of priceGroups) {
							returnData.push({
								json: pg,
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'addInventoryPriceGroup') {
						const mode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};

						if (mode === 'json') {
							const rawJson = this.getNodeParameter('parametersJson', i) as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for addInventoryPriceGroup: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const name = this.getNodeParameter('name', i) as string;
							const currency = this.getNodeParameter('currency', i) as string;
							const priceGroupId = this.getNodeParameter('price_group_id', i, 0) as number;
							const description = this.getNodeParameter('description', i, '') as string;
							const priceGroupType = this.getNodeParameter('price_group_type', i, 'independent') as string;

							params = {
								name,
								currency,
								price_group_type: priceGroupType,
							};
							if (priceGroupId && Number(priceGroupId) > 0) {
								params.price_group_id = Number(priceGroupId);
							}
							if (description) params.description = description;

							if (priceGroupType === 'dependent_on_price_group') {
								const sourcePriceGroupId = this.getNodeParameter('source_price_group_id', i) as number;
								const priceMultiplier = this.getNodeParameter('price_multiplier', i, 1) as number;
								const priceAddition = this.getNodeParameter('price_addition', i, 0) as number;
								params.source_price_group_id = Number(sourcePriceGroupId);
								params.price_multiplier = priceMultiplier;
								params.price_addition = priceAddition;
							}
						}

						const response = await baselinkerApiRequest.call(this, 'addInventoryPriceGroup', params);
						returnData.push({
							json: {
								success: true,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'deleteInventoryPriceGroup') {
						const priceGroupId = this.getNodeParameter('price_group_id', i) as number;
						const params = { price_group_id: Number(priceGroupId) };
						const response = await baselinkerApiRequest.call(this, 'deleteInventoryPriceGroup', params);
						returnData.push({
							json: {
								success: true,
								price_group_id: Number(priceGroupId),
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'getInventoryTags') {
						const response = await baselinkerApiRequest.call(this, 'getInventoryTags', {});
						const tags = response.tags || [];
						for (const t of tags) {
							returnData.push({
								json: t,
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'addInventoryTag') {
						const mode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};

						if (mode === 'json') {
							const rawJson = this.getNodeParameter('parametersJson', i) as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for addInventoryTag: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const name = this.getNodeParameter('name', i) as string;
							const tagId = this.getNodeParameter('tag_id', i, 0) as number;

							params = { name };
							if (tagId && Number(tagId) > 0) {
								params.tag_id = Number(tagId);
							}
						}

						const response = await baselinkerApiRequest.call(this, 'addInventoryTag', params);
						returnData.push({
							json: {
								success: true,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'deleteInventoryTag') {
						const tagId = this.getNodeParameter('tag_id', i) as number;
						const params = { tag_id: Number(tagId) };
						const response = await baselinkerApiRequest.call(this, 'deleteInventoryTag', params);
						returnData.push({
							json: {
								success: true,
								tag_id: Number(tagId),
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'getInventoryExtraFields') {
						const response = await baselinkerApiRequest.call(this, 'getInventoryExtraFields', {});
						const rawFields = response.extra_fields || [];
						const extraFields = Array.isArray(rawFields) ? rawFields : Object.values(rawFields);
						for (const f of extraFields) {
							returnData.push({
								json: f,
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'getInventoryAvailableTextFieldKeys') {
						const inventoryId = this.getNodeParameter('inventory_id', i) as number;
						const response = await baselinkerApiRequest.call(this, 'getInventoryAvailableTextFieldKeys', {
							inventory_id: Number(inventoryId),
						});
						const rawKeys = response.text_field_keys || [];
						const keys = Array.isArray(rawKeys) ? rawKeys : Object.values(rawKeys);
						for (const k of keys) {
							returnData.push({
								json: typeof k === 'object' && k !== null ? k : { key: k },
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'getInventoryIntegrations') {
						const inventoryId = this.getNodeParameter('inventory_id', i) as number;
						const response = await baselinkerApiRequest.call(this, 'getInventoryIntegrations', {
							inventory_id: Number(inventoryId),
						});
						const rawIntegrations = response.integrations || [];
						const integrations = Array.isArray(rawIntegrations) ? rawIntegrations : Object.values(rawIntegrations);
						for (const integ of integrations) {
							returnData.push({
								json: integ,
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'getInventoryShippingTemplates') {
						const response = await baselinkerApiRequest.call(this, 'getInventoryShippingTemplates', {});
						const templates = response.shipping_templates || [];
						for (const st of templates) {
							returnData.push({
								json: st,
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'getSyncLogList') {
						const mode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};

						if (mode === 'json') {
							const rawJson = this.getNodeParameter('parametersJson', i) as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for getSyncLogList: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const source = this.getNodeParameter('source', i, 'allegro') as string;
							const lastLogId = this.getNodeParameter('last_log_id', i, 0) as number;
							const errorsOnly = this.getNodeParameter('errors_only', i, false) as boolean;

							params = {
								source,
								errors_only: errorsOnly,
							};
							if (lastLogId && Number(lastLogId) > 0) {
								params.last_log_id = Number(lastLogId);
							}
						}

						const response = await baselinkerApiRequest.call(this, 'getSyncLogList', params);
						const logs = response.logs || [];
						for (const log of logs) {
							returnData.push({
								json: log,
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'getInventoryPrintoutTemplates') {
						const response = await baselinkerApiRequest.call(this, 'getInventoryPrintoutTemplates', {});
						const printouts = response.printouts || [];
						for (const p of printouts) {
							returnData.push({
								json: p,
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'addInventoryPromotion') {
						const mode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};

						if (mode === 'json') {
							const rawJson = this.getNodeParameter('parametersJson', i) as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for addInventoryPromotion: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const promotionId = this.getNodeParameter('promotion_id', i, 0) as number;
							const rawDef = this.getNodeParameter('promotionDefinitionJson', i) as string | IDataObject;
							let def: IDataObject = {};
							if (typeof rawDef === 'string') {
								try {
									def = JSON.parse(rawDef);
								} catch (e: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON in promotionDefinitionJson: ${e.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								def = rawDef;
							}
							params = { ...def };
							if (promotionId && Number(promotionId) > 0) {
								params.promotion_id = Number(promotionId);
							}
						}

						const response = await baselinkerApiRequest.call(this, 'addInventoryPromotion', params);
						returnData.push({
							json: {
								success: true,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'getInventoryPromotionsList') {
						const page = this.getNodeParameter('page', i, 1) as number;
						const params = { page: Number(page) };
						const response = await baselinkerApiRequest.call(this, 'getInventoryPromotionsList', params);
						const promotions = response.promotions || [];
						for (const promo of promotions) {
							returnData.push({
								json: promo,
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'getInventoryWarehouseLocations') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for getInventoryWarehouseLocations: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_warehouse_id = this.getNodeParameter('warehouse_id', i, 0) as number;
							if (val_warehouse_id !== undefined && val_warehouse_id !== null) params['warehouse_id'] = Number(val_warehouse_id);
							const val_warehouse_type = this.getNodeParameter('warehouse_type', i, '') as string;
							if (val_warehouse_type) params['warehouse_type'] = val_warehouse_type;
							const val_filter_location_id = this.getNodeParameter('filter_location_id', i, 0) as number;
							if (val_filter_location_id !== undefined && val_filter_location_id !== null) params['filter_location_id'] = Number(val_filter_location_id);
							const val_filter_name = this.getNodeParameter('filter_name', i, '') as string;
							if (val_filter_name) params['filter_name'] = val_filter_name;
							const val_filter_rack_id = this.getNodeParameter('filter_rack_id', i, 0) as number;
							if (val_filter_rack_id !== undefined && val_filter_rack_id !== null) params['filter_rack_id'] = Number(val_filter_rack_id);
							const val_filter_zone_id = this.getNodeParameter('filter_zone_id', i, 0) as number;
							if (val_filter_zone_id !== undefined && val_filter_zone_id !== null) params['filter_zone_id'] = Number(val_filter_zone_id);
						}
						const returnAll = parameterMode === 'fields' ? (this.getNodeParameter('returnAll', i, false) as boolean) : false;
						const limit = parameterMode === 'fields' && !returnAll ? (this.getNodeParameter('limit', i, 100) as number) : 0;
						let page = parameterMode === 'fields' && !returnAll ? (this.getNodeParameter('page', i, 1) as number) : (params.page as number || 1);
						let allItems: any[] = [];
						while (true) {
							params.page = page;
							const response = await baselinkerApiRequest.call(this, 'getInventoryWarehouseLocations', params);
							const rawList = response['locations'] || response.items || response.list || [];
							const items = Array.isArray(rawList) ? rawList : Object.values(rawList);
							allItems.push(...items);
							if (!returnAll || items.length < 100) break;
							if (limit > 0 && allItems.length >= limit) {
								allItems = allItems.slice(0, limit);
								break;
							}
							page++;
							await new Promise((res) => setTimeout(res, 650));
						}
						for (const item of allItems) {
							returnData.push({
								json: typeof item === 'object' && item !== null ? item : { item },
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'getInventoryWarehouseLocationTypes') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for getInventoryWarehouseLocationTypes: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
						}
						const response = await baselinkerApiRequest.call(this, 'getInventoryWarehouseLocationTypes', params);
						const rawList = response['types'] || response.list || [];
						const items = Array.isArray(rawList) ? rawList : Object.values(rawList);
						for (const item of items) {
							returnData.push({
								json: typeof item === 'object' && item !== null ? item : { item },
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'addInventoryWarehouseLocation') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for addInventoryWarehouseLocation: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_location_id = this.getNodeParameter('location_id', i, 0) as number;
							if (val_location_id !== undefined && val_location_id !== null) params['location_id'] = Number(val_location_id);
							const val_warehouse_id = this.getNodeParameter('warehouse_id', i, 0) as number;
							if (val_warehouse_id !== undefined && val_warehouse_id !== null) params['warehouse_id'] = Number(val_warehouse_id);
							const val_warehouse_type = this.getNodeParameter('warehouse_type', i, '') as string;
							if (val_warehouse_type) params['warehouse_type'] = val_warehouse_type;
							const val_name = this.getNodeParameter('name', i, '') as string;
							if (val_name) params['name'] = val_name;
							const val_color = this.getNodeParameter('color', i, '') as string;
							if (val_color) params['color'] = val_color;
							const val_is_pickable = this.getNodeParameter('is_pickable', i, false) as boolean;
							if (val_is_pickable !== undefined) params['is_pickable'] = Boolean(val_is_pickable);
							const val_priority = this.getNodeParameter('priority', i, 0) as number;
							if (val_priority !== undefined && val_priority !== null) params['priority'] = Number(val_priority);
							const val_location_type_id = this.getNodeParameter('location_type_id', i, 0) as number;
							if (val_location_type_id !== undefined && val_location_type_id !== null) params['location_type_id'] = Number(val_location_type_id);
							const val_zone_id = this.getNodeParameter('zone_id', i, 0) as number;
							if (val_zone_id !== undefined && val_zone_id !== null) params['zone_id'] = Number(val_zone_id);
							const val_rack_id = this.getNodeParameter('rack_id', i, 0) as number;
							if (val_rack_id !== undefined && val_rack_id !== null) params['rack_id'] = Number(val_rack_id);
						}
						const response = await baselinkerApiRequest.call(this, 'addInventoryWarehouseLocation', params);
						returnData.push({
							json: {
								success: true,
								...params,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'addInventoryWarehouseLocationType') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for addInventoryWarehouseLocationType: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_location_type_id = this.getNodeParameter('location_type_id', i, 0) as number;
							if (val_location_type_id !== undefined && val_location_type_id !== null) params['location_type_id'] = Number(val_location_type_id);
							const val_name = this.getNodeParameter('name', i, '') as string;
							if (val_name) params['name'] = val_name;
							const val_max_quantity = this.getNodeParameter('max_quantity', i, 0) as number;
							if (val_max_quantity !== undefined && val_max_quantity !== null) params['max_quantity'] = Number(val_max_quantity);
							const val_max_weight = this.getNodeParameter('max_weight', i, 0) as number;
							if (val_max_weight !== undefined && val_max_weight !== null) params['max_weight'] = Number(val_max_weight);
							const val_width = this.getNodeParameter('width', i, 0) as number;
							if (val_width !== undefined && val_width !== null) params['width'] = Number(val_width);
							const val_height = this.getNodeParameter('height', i, 0) as number;
							if (val_height !== undefined && val_height !== null) params['height'] = Number(val_height);
							const val_depth = this.getNodeParameter('depth', i, 0) as number;
							if (val_depth !== undefined && val_depth !== null) params['depth'] = Number(val_depth);
							const val_is_transfer_bin = this.getNodeParameter('is_transfer_bin', i, false) as boolean;
							if (val_is_transfer_bin !== undefined) params['is_transfer_bin'] = Boolean(val_is_transfer_bin);
							const val_is_receiving_bin = this.getNodeParameter('is_receiving_bin', i, false) as boolean;
							if (val_is_receiving_bin !== undefined) params['is_receiving_bin'] = Boolean(val_is_receiving_bin);
						}
						const response = await baselinkerApiRequest.call(this, 'addInventoryWarehouseLocationType', params);
						returnData.push({
							json: {
								success: true,
								...params,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'deleteInventoryWarehouseLocation') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for deleteInventoryWarehouseLocation: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_warehouse_id = this.getNodeParameter('warehouse_id', i, 0) as number;
							if (val_warehouse_id !== undefined && val_warehouse_id !== null) params['warehouse_id'] = Number(val_warehouse_id);
							const val_warehouse_type = this.getNodeParameter('warehouse_type', i, '') as string;
							if (val_warehouse_type) params['warehouse_type'] = val_warehouse_type;
							const val_location_id = this.getNodeParameter('location_id', i, 0) as number;
							if (val_location_id !== undefined && val_location_id !== null) params['location_id'] = Number(val_location_id);
						}
						const response = await baselinkerApiRequest.call(this, 'deleteInventoryWarehouseLocation', params);
						returnData.push({
							json: {
								success: true,
								...params,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'deleteInventoryWarehouseLocationType') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for deleteInventoryWarehouseLocationType: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_location_type_id = this.getNodeParameter('location_type_id', i, 0) as number;
							if (val_location_type_id !== undefined && val_location_type_id !== null) params['location_type_id'] = Number(val_location_type_id);
						}
						const response = await baselinkerApiRequest.call(this, 'deleteInventoryWarehouseLocationType', params);
						returnData.push({
							json: {
								success: true,
								...params,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'getInventoryWarehouseZones') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for getInventoryWarehouseZones: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
						}
						const response = await baselinkerApiRequest.call(this, 'getInventoryWarehouseZones', params);
						const rawList = response['zones'] || response.list || [];
						const items = Array.isArray(rawList) ? rawList : Object.values(rawList);
						for (const item of items) {
							returnData.push({
								json: typeof item === 'object' && item !== null ? item : { item },
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'addInventoryWarehouseZone') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for addInventoryWarehouseZone: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_zone_id = this.getNodeParameter('zone_id', i, 0) as number;
							if (val_zone_id !== undefined && val_zone_id !== null) params['zone_id'] = Number(val_zone_id);
							const val_name = this.getNodeParameter('name', i, '') as string;
							if (val_name) params['name'] = val_name;
							const val_color = this.getNodeParameter('color', i, '') as string;
							if (val_color) params['color'] = val_color;
							const val_location_prefix = this.getNodeParameter('location_prefix', i, '') as string;
							if (val_location_prefix) params['location_prefix'] = val_location_prefix;
						}
						const response = await baselinkerApiRequest.call(this, 'addInventoryWarehouseZone', params);
						returnData.push({
							json: {
								success: true,
								...params,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'deleteInventoryWarehouseZone') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for deleteInventoryWarehouseZone: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_zone_id = this.getNodeParameter('zone_id', i, 0) as number;
							if (val_zone_id !== undefined && val_zone_id !== null) params['zone_id'] = Number(val_zone_id);
						}
						const response = await baselinkerApiRequest.call(this, 'deleteInventoryWarehouseZone', params);
						returnData.push({
							json: {
								success: true,
								...params,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'getInventoryWarehouseRacks') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for getInventoryWarehouseRacks: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
						}
						const response = await baselinkerApiRequest.call(this, 'getInventoryWarehouseRacks', params);
						const rawList = response['racks'] || response.list || [];
						const items = Array.isArray(rawList) ? rawList : Object.values(rawList);
						for (const item of items) {
							returnData.push({
								json: typeof item === 'object' && item !== null ? item : { item },
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'addInventoryWarehouseRack') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for addInventoryWarehouseRack: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_rack_id = this.getNodeParameter('rack_id', i, 0) as number;
							if (val_rack_id !== undefined && val_rack_id !== null) params['rack_id'] = Number(val_rack_id);
							const val_name = this.getNodeParameter('name', i, '') as string;
							if (val_name) params['name'] = val_name;
							const val_zone_id = this.getNodeParameter('zone_id', i, 0) as number;
							if (val_zone_id !== undefined && val_zone_id !== null) params['zone_id'] = Number(val_zone_id);
							const val_layout = this.getNodeParameter('layout', i, 0) as number;
							if (val_layout !== undefined && val_layout !== null) params['layout'] = Number(val_layout);
							const val_location_prefix = this.getNodeParameter('location_prefix', i, '') as string;
							if (val_location_prefix) params['location_prefix'] = val_location_prefix;
						}
						const response = await baselinkerApiRequest.call(this, 'addInventoryWarehouseRack', params);
						returnData.push({
							json: {
								success: true,
								...params,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'deleteInventoryWarehouseRack') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for deleteInventoryWarehouseRack: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_rack_id = this.getNodeParameter('rack_id', i, 0) as number;
							if (val_rack_id !== undefined && val_rack_id !== null) params['rack_id'] = Number(val_rack_id);
						}
						const response = await baselinkerApiRequest.call(this, 'deleteInventoryWarehouseRack', params);
						returnData.push({
							json: {
								success: true,
								...params,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'getInventorySuppliers') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for getInventorySuppliers: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_filter_id = this.getNodeParameter('filter_id', i, 0) as number;
							if (val_filter_id !== undefined && val_filter_id !== null) params['filter_id'] = Number(val_filter_id);
							const val_filter_name = this.getNodeParameter('filter_name', i, '') as string;
							if (val_filter_name) params['filter_name'] = val_filter_name;
						}
						const response = await baselinkerApiRequest.call(this, 'getInventorySuppliers', params);
						const rawList = response['suppliers'] || response.list || [];
						const items = Array.isArray(rawList) ? rawList : Object.values(rawList);
						for (const item of items) {
							returnData.push({
								json: typeof item === 'object' && item !== null ? item : { item },
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'addInventorySupplier') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for addInventorySupplier: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_supplier_id = this.getNodeParameter('supplier_id', i, 0) as number;
							if (val_supplier_id !== undefined && val_supplier_id !== null) params['supplier_id'] = Number(val_supplier_id);
							const val_name = this.getNodeParameter('name', i, '') as string;
							if (val_name) params['name'] = val_name;
							const val_take_product_cost_from = this.getNodeParameter('take_product_cost_from', i, '') as string;
							if (val_take_product_cost_from) params['take_product_cost_from'] = val_take_product_cost_from;
							const val_take_product_code_from = this.getNodeParameter('take_product_code_from', i, '') as string;
							if (val_take_product_code_from) params['take_product_code_from'] = val_take_product_code_from;
							const val_address = this.getNodeParameter('address', i, '') as string;
							if (val_address) params['address'] = val_address;
							const val_postcode = this.getNodeParameter('postcode', i, '') as string;
							if (val_postcode) params['postcode'] = val_postcode;
							const val_city = this.getNodeParameter('city', i, '') as string;
							if (val_city) params['city'] = val_city;
							const val_phone = this.getNodeParameter('phone', i, '') as string;
							if (val_phone) params['phone'] = val_phone;
							const val_email = this.getNodeParameter('email', i, '') as string;
							if (val_email) params['email'] = val_email;
							const val_email_copy_to = this.getNodeParameter('email_copy_to', i, '') as string;
							if (val_email_copy_to) params['email_copy_to'] = val_email_copy_to;
							const val_currency = this.getNodeParameter('currency', i, '') as string;
							if (val_currency) params['currency'] = val_currency;
							const val_tax_no = this.getNodeParameter('tax_no', i, '') as string;
							if (val_tax_no) params['tax_no'] = val_tax_no;
						}
						const response = await baselinkerApiRequest.call(this, 'addInventorySupplier', params);
						returnData.push({
							json: {
								success: true,
								...params,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'deleteInventorySupplier') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for deleteInventorySupplier: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_supplier_id = this.getNodeParameter('supplier_id', i, 0) as number;
							if (val_supplier_id !== undefined && val_supplier_id !== null) params['supplier_id'] = Number(val_supplier_id);
						}
						const response = await baselinkerApiRequest.call(this, 'deleteInventorySupplier', params);
						returnData.push({
							json: {
								success: true,
								...params,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'getInventoryPayers') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for getInventoryPayers: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_filter_id = this.getNodeParameter('filter_id', i, 0) as number;
							if (val_filter_id !== undefined && val_filter_id !== null) params['filter_id'] = Number(val_filter_id);
							const val_filter_name = this.getNodeParameter('filter_name', i, '') as string;
							if (val_filter_name) params['filter_name'] = val_filter_name;
						}
						const response = await baselinkerApiRequest.call(this, 'getInventoryPayers', params);
						const rawList = response['payers'] || response.list || [];
						const items = Array.isArray(rawList) ? rawList : Object.values(rawList);
						for (const item of items) {
							returnData.push({
								json: typeof item === 'object' && item !== null ? item : { item },
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'addInventoryPayer') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for addInventoryPayer: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_payer_id = this.getNodeParameter('payer_id', i, 0) as number;
							if (val_payer_id !== undefined && val_payer_id !== null) params['payer_id'] = Number(val_payer_id);
							const val_name = this.getNodeParameter('name', i, '') as string;
							if (val_name) params['name'] = val_name;
							const val_address = this.getNodeParameter('address', i, '') as string;
							if (val_address) params['address'] = val_address;
							const val_postcode = this.getNodeParameter('postcode', i, '') as string;
							if (val_postcode) params['postcode'] = val_postcode;
							const val_city = this.getNodeParameter('city', i, '') as string;
							if (val_city) params['city'] = val_city;
							const val_tax_no = this.getNodeParameter('tax_no', i, '') as string;
							if (val_tax_no) params['tax_no'] = val_tax_no;
						}
						const response = await baselinkerApiRequest.call(this, 'addInventoryPayer', params);
						returnData.push({
							json: {
								success: true,
								...params,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'deleteInventoryPayer') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for deleteInventoryPayer: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_payer_id = this.getNodeParameter('payer_id', i, 0) as number;
							if (val_payer_id !== undefined && val_payer_id !== null) params['payer_id'] = Number(val_payer_id);
						}
						const response = await baselinkerApiRequest.call(this, 'deleteInventoryPayer', params);
						returnData.push({
							json: {
								success: true,
								...params,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'getInventoryDocuments') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for getInventoryDocuments: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_filter_source_object_type = this.getNodeParameter('filter_source_object_type', i, 0) as number;
							if (val_filter_source_object_type !== undefined && val_filter_source_object_type !== null) params['filter_source_object_type'] = Number(val_filter_source_object_type);
							const val_filter_source_object_id = this.getNodeParameter('filter_source_object_id', i, 0) as number;
							if (val_filter_source_object_id !== undefined && val_filter_source_object_id !== null) params['filter_source_object_id'] = Number(val_filter_source_object_id);
							const val_filter_document_id = this.getNodeParameter('filter_document_id', i, 0) as number;
							if (val_filter_document_id !== undefined && val_filter_document_id !== null) params['filter_document_id'] = Number(val_filter_document_id);
							const val_filter_document_type = this.getNodeParameter('filter_document_type', i, 0) as number;
							if (val_filter_document_type !== undefined && val_filter_document_type !== null) params['filter_document_type'] = Number(val_filter_document_type);
							const val_filter_document_status = this.getNodeParameter('filter_document_status', i, 0) as number;
							if (val_filter_document_status !== undefined && val_filter_document_status !== null) params['filter_document_status'] = Number(val_filter_document_status);
							const val_filter_date_from = this.getNodeParameter('filter_date_from', i, 0) as number;
							if (val_filter_date_from !== undefined && val_filter_date_from !== null) params['filter_date_from'] = Number(val_filter_date_from);
							const val_filter_date_to = this.getNodeParameter('filter_date_to', i, 0) as number;
							if (val_filter_date_to !== undefined && val_filter_date_to !== null) params['filter_date_to'] = Number(val_filter_date_to);
							const val_filter_warehouse_id = this.getNodeParameter('filter_warehouse_id', i, 0) as number;
							if (val_filter_warehouse_id !== undefined && val_filter_warehouse_id !== null) params['filter_warehouse_id'] = Number(val_filter_warehouse_id);
						}
						const returnAll = parameterMode === 'fields' ? (this.getNodeParameter('returnAll', i, false) as boolean) : false;
						const limit = parameterMode === 'fields' && !returnAll ? (this.getNodeParameter('limit', i, 100) as number) : 0;
						let page = parameterMode === 'fields' && !returnAll ? (this.getNodeParameter('page', i, 1) as number) : (params.page as number || 1);
						let allItems: any[] = [];
						while (true) {
							params.page = page;
							const response = await baselinkerApiRequest.call(this, 'getInventoryDocuments', params);
							const rawList = response['documents'] || response.items || response.list || [];
							const items = Array.isArray(rawList) ? rawList : Object.values(rawList);
							allItems.push(...items);
							if (!returnAll || items.length < 100) break;
							if (limit > 0 && allItems.length >= limit) {
								allItems = allItems.slice(0, limit);
								break;
							}
							page++;
							await new Promise((res) => setTimeout(res, 650));
						}
						for (const item of allItems) {
							returnData.push({
								json: typeof item === 'object' && item !== null ? item : { item },
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'getInventoryDocumentItems') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for getInventoryDocumentItems: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_document_id = this.getNodeParameter('document_id', i, 0) as number;
							if (val_document_id !== undefined && val_document_id !== null) params['document_id'] = Number(val_document_id);
						}
						const returnAll = parameterMode === 'fields' ? (this.getNodeParameter('returnAll', i, false) as boolean) : false;
						const limit = parameterMode === 'fields' && !returnAll ? (this.getNodeParameter('limit', i, 100) as number) : 0;
						let page = parameterMode === 'fields' && !returnAll ? (this.getNodeParameter('page', i, 1) as number) : (params.page as number || 1);
						let allItems: any[] = [];
						while (true) {
							params.page = page;
							const response = await baselinkerApiRequest.call(this, 'getInventoryDocumentItems', params);
							const rawList = response['items'] || response.items || response.list || [];
							const items = Array.isArray(rawList) ? rawList : Object.values(rawList);
							allItems.push(...items);
							if (!returnAll || items.length < 100) break;
							if (limit > 0 && allItems.length >= limit) {
								allItems = allItems.slice(0, limit);
								break;
							}
							page++;
							await new Promise((res) => setTimeout(res, 650));
						}
						for (const item of allItems) {
							returnData.push({
								json: typeof item === 'object' && item !== null ? item : { item },
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'getInventoryDocumentSeries') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for getInventoryDocumentSeries: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_warehouse_id = this.getNodeParameter('warehouse_id', i, 0) as number;
							if (val_warehouse_id !== undefined && val_warehouse_id !== null) params['warehouse_id'] = Number(val_warehouse_id);
						}
						const response = await baselinkerApiRequest.call(this, 'getInventoryDocumentSeries', params);
						const rawList = response['series'] || response.list || [];
						const items = Array.isArray(rawList) ? rawList : Object.values(rawList);
						for (const item of items) {
							returnData.push({
								json: typeof item === 'object' && item !== null ? item : { item },
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'getInventoryDocumentFile') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for getInventoryDocumentFile: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_document_id = this.getNodeParameter('document_id', i, 0) as number;
							if (val_document_id !== undefined && val_document_id !== null) params['document_id'] = Number(val_document_id);
							const val_get_external = this.getNodeParameter('get_external', i, false) as boolean;
							if (val_get_external !== undefined) params['get_external'] = Boolean(val_get_external);
						}
						const response = await baselinkerApiRequest.call(this, 'getInventoryDocumentFile', params);
						const downloadBinary = parameterMode === 'fields' ? (this.getNodeParameter('downloadAsBinary', i, false) as boolean) : false;
						const itemData: INodeExecutionData = {
							json: { ...response },
							pairedItem: { item: i },
						};
						if (downloadBinary && response.file) {
							const binaryProp = this.getNodeParameter('binaryPropertyName', i, 'data') as string;
							let fileContent = response.file as string;
							if (fileContent.startsWith('data:')) {
								fileContent = fileContent.replace(/^data:[^;]+;base64,/, '');
							}
							const buffer = Buffer.from(fileContent, 'base64');
							const binaryData = await this.helpers.prepareBinaryData(buffer, 'getInventoryDocumentFile.pdf');
							itemData.binary = { [binaryProp]: binaryData };
						}
						returnData.push(itemData);
					} else if (operation === 'addInventoryDocument') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for addInventoryDocument: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_warehouse_id = this.getNodeParameter('warehouse_id', i, 0) as number;
							if (val_warehouse_id !== undefined && val_warehouse_id !== null) params['warehouse_id'] = Number(val_warehouse_id);
							const val_document_type = this.getNodeParameter('document_type', i, 0) as number;
							if (val_document_type !== undefined && val_document_type !== null) params['document_type'] = Number(val_document_type);
							const val_target_warehouse_id = this.getNodeParameter('target_warehouse_id', i, 0) as number;
							if (val_target_warehouse_id !== undefined && val_target_warehouse_id !== null) params['target_warehouse_id'] = Number(val_target_warehouse_id);
							const val_date_add = this.getNodeParameter('date_add', i, 0) as number;
							if (val_date_add !== undefined && val_date_add !== null) params['date_add'] = Number(val_date_add);
							const val_date_execute = this.getNodeParameter('date_execute', i, 0) as number;
							if (val_date_execute !== undefined && val_date_execute !== null) params['date_execute'] = Number(val_date_execute);
							const val_contractor = this.getNodeParameter('contractor', i, '') as string;
							if (val_contractor) params['contractor'] = val_contractor;
							const val_invoice_no = this.getNodeParameter('invoice_no', i, '') as string;
							if (val_invoice_no) params['invoice_no'] = val_invoice_no;
							const val_notes = this.getNodeParameter('notes', i, '') as string;
							if (val_notes) params['notes'] = val_notes;
						}
						const response = await baselinkerApiRequest.call(this, 'addInventoryDocument', params);
						returnData.push({
							json: {
								success: true,
								...params,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'addInventoryDocumentItems') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for addInventoryDocumentItems: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_document_id = this.getNodeParameter('document_id', i, 0) as number;
							if (val_document_id !== undefined && val_document_id !== null) params['document_id'] = Number(val_document_id);
							const raw_items = this.getNodeParameter('items', i, '[]') as string | any[];
							if (typeof raw_items === 'string') {
								try {
									params['items'] = JSON.parse(raw_items);
								} catch {
									params['items'] = raw_items.split(',').map((s: string) => s.trim()).filter(Boolean);
								}
							} else {
								params['items'] = raw_items;
							}
						}
						const response = await baselinkerApiRequest.call(this, 'addInventoryDocumentItems', params);
						returnData.push({
							json: {
								success: true,
								...params,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'addInventoryDocumentFile') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for addInventoryDocumentFile: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_document_id = this.getNodeParameter('document_id', i, 0) as number;
							if (val_document_id !== undefined && val_document_id !== null) params['document_id'] = Number(val_document_id);
							const val_file = this.getNodeParameter('file', i, '') as string;
							if (val_file) params['file'] = val_file;
							const val_external_document_number = this.getNodeParameter('external_document_number', i, '') as string;
							if (val_external_document_number) params['external_document_number'] = val_external_document_number;
						}
						const response = await baselinkerApiRequest.call(this, 'addInventoryDocumentFile', params);
						returnData.push({
							json: {
								success: true,
								...params,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'setInventoryDocumentStatusConfirmed') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for setInventoryDocumentStatusConfirmed: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_document_id = this.getNodeParameter('document_id', i, 0) as number;
							if (val_document_id !== undefined && val_document_id !== null) params['document_id'] = Number(val_document_id);
						}
						const response = await baselinkerApiRequest.call(this, 'setInventoryDocumentStatusConfirmed', params);
						returnData.push({
							json: {
								success: true,
								...params,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'getInventoryPurchaseOrders') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for getInventoryPurchaseOrders: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_warehouse_id = this.getNodeParameter('warehouse_id', i, 0) as number;
							if (val_warehouse_id !== undefined && val_warehouse_id !== null) params['warehouse_id'] = Number(val_warehouse_id);
							const val_supplier_id = this.getNodeParameter('supplier_id', i, 0) as number;
							if (val_supplier_id !== undefined && val_supplier_id !== null) params['supplier_id'] = Number(val_supplier_id);
							const val_series_id = this.getNodeParameter('series_id', i, 0) as number;
							if (val_series_id !== undefined && val_series_id !== null) params['series_id'] = Number(val_series_id);
							const val_date_from = this.getNodeParameter('date_from', i, 0) as number;
							if (val_date_from !== undefined && val_date_from !== null) params['date_from'] = Number(val_date_from);
							const val_date_to = this.getNodeParameter('date_to', i, 0) as number;
							if (val_date_to !== undefined && val_date_to !== null) params['date_to'] = Number(val_date_to);
							const val_filter_document_number = this.getNodeParameter('filter_document_number', i, '') as string;
							if (val_filter_document_number) params['filter_document_number'] = val_filter_document_number;
							const val_filter_product_id = this.getNodeParameter('filter_product_id', i, 0) as number;
							if (val_filter_product_id !== undefined && val_filter_product_id !== null) params['filter_product_id'] = Number(val_filter_product_id);
						}
						const returnAll = parameterMode === 'fields' ? (this.getNodeParameter('returnAll', i, false) as boolean) : false;
						const limit = parameterMode === 'fields' && !returnAll ? (this.getNodeParameter('limit', i, 100) as number) : 0;
						let page = parameterMode === 'fields' && !returnAll ? (this.getNodeParameter('page', i, 1) as number) : (params.page as number || 1);
						let allItems: any[] = [];
						while (true) {
							params.page = page;
							const response = await baselinkerApiRequest.call(this, 'getInventoryPurchaseOrders', params);
							const rawList = response['orders'] || response.items || response.list || [];
							const items = Array.isArray(rawList) ? rawList : Object.values(rawList);
							allItems.push(...items);
							if (!returnAll || items.length < 100) break;
							if (limit > 0 && allItems.length >= limit) {
								allItems = allItems.slice(0, limit);
								break;
							}
							page++;
							await new Promise((res) => setTimeout(res, 650));
						}
						for (const item of allItems) {
							returnData.push({
								json: typeof item === 'object' && item !== null ? item : { item },
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'getInventoryPurchaseOrderItems') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for getInventoryPurchaseOrderItems: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_order_id = this.getNodeParameter('order_id', i, 0) as number;
							if (val_order_id !== undefined && val_order_id !== null) params['order_id'] = Number(val_order_id);
						}
						const returnAll = parameterMode === 'fields' ? (this.getNodeParameter('returnAll', i, false) as boolean) : false;
						const limit = parameterMode === 'fields' && !returnAll ? (this.getNodeParameter('limit', i, 100) as number) : 0;
						let page = parameterMode === 'fields' && !returnAll ? (this.getNodeParameter('page', i, 1) as number) : (params.page as number || 1);
						let allItems: any[] = [];
						while (true) {
							params.page = page;
							const response = await baselinkerApiRequest.call(this, 'getInventoryPurchaseOrderItems', params);
							const rawList = response['items'] || response.items || response.list || [];
							const items = Array.isArray(rawList) ? rawList : Object.values(rawList);
							allItems.push(...items);
							if (!returnAll || items.length < 100) break;
							if (limit > 0 && allItems.length >= limit) {
								allItems = allItems.slice(0, limit);
								break;
							}
							page++;
							await new Promise((res) => setTimeout(res, 650));
						}
						for (const item of allItems) {
							returnData.push({
								json: typeof item === 'object' && item !== null ? item : { item },
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'getInventoryPurchaseOrderSeries') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for getInventoryPurchaseOrderSeries: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_warehouse_id = this.getNodeParameter('warehouse_id', i, 0) as number;
							if (val_warehouse_id !== undefined && val_warehouse_id !== null) params['warehouse_id'] = Number(val_warehouse_id);
						}
						const response = await baselinkerApiRequest.call(this, 'getInventoryPurchaseOrderSeries', params);
						const rawList = response['series'] || response.list || [];
						const items = Array.isArray(rawList) ? rawList : Object.values(rawList);
						for (const item of items) {
							returnData.push({
								json: typeof item === 'object' && item !== null ? item : { item },
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'getInventoryPurchaseOrderLogs') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for getInventoryPurchaseOrderLogs: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_purchase_order_id = this.getNodeParameter('purchase_order_id', i, 0) as number;
							if (val_purchase_order_id !== undefined && val_purchase_order_id !== null) params['purchase_order_id'] = Number(val_purchase_order_id);
							const val_date_from = this.getNodeParameter('date_from', i, 0) as number;
							if (val_date_from !== undefined && val_date_from !== null) params['date_from'] = Number(val_date_from);
							const val_date_to = this.getNodeParameter('date_to', i, 0) as number;
							if (val_date_to !== undefined && val_date_to !== null) params['date_to'] = Number(val_date_to);
							const raw_log_type = this.getNodeParameter('log_type', i, '[]') as string | any[];
							if (typeof raw_log_type === 'string') {
								try {
									params['log_type'] = JSON.parse(raw_log_type);
								} catch {
									params['log_type'] = raw_log_type.split(',').map((s: string) => s.trim()).filter(Boolean);
								}
							} else {
								params['log_type'] = raw_log_type;
							}
							const val_sort = this.getNodeParameter('sort', i, '') as string;
							if (val_sort) params['sort'] = val_sort;
						}
						const returnAll = parameterMode === 'fields' ? (this.getNodeParameter('returnAll', i, false) as boolean) : false;
						const limit = parameterMode === 'fields' && !returnAll ? (this.getNodeParameter('limit', i, 100) as number) : 0;
						let page = parameterMode === 'fields' && !returnAll ? (this.getNodeParameter('page', i, 1) as number) : (params.page as number || 1);
						let allItems: any[] = [];
						while (true) {
							params.page = page;
							const response = await baselinkerApiRequest.call(this, 'getInventoryPurchaseOrderLogs', params);
							const rawList = response['logs'] || response.items || response.list || [];
							const items = Array.isArray(rawList) ? rawList : Object.values(rawList);
							allItems.push(...items);
							if (!returnAll || items.length < 100) break;
							if (limit > 0 && allItems.length >= limit) {
								allItems = allItems.slice(0, limit);
								break;
							}
							page++;
							await new Promise((res) => setTimeout(res, 650));
						}
						for (const item of allItems) {
							returnData.push({
								json: typeof item === 'object' && item !== null ? item : { item },
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'getInventoryPurchaseOrderFile') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for getInventoryPurchaseOrderFile: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_purchase_order_id = this.getNodeParameter('purchase_order_id', i, 0) as number;
							if (val_purchase_order_id !== undefined && val_purchase_order_id !== null) params['purchase_order_id'] = Number(val_purchase_order_id);
						}
						const response = await baselinkerApiRequest.call(this, 'getInventoryPurchaseOrderFile', params);
						const downloadBinary = parameterMode === 'fields' ? (this.getNodeParameter('downloadAsBinary', i, false) as boolean) : false;
						const itemData: INodeExecutionData = {
							json: { ...response },
							pairedItem: { item: i },
						};
						if (downloadBinary && response.file) {
							const binaryProp = this.getNodeParameter('binaryPropertyName', i, 'data') as string;
							let fileContent = response.file as string;
							if (fileContent.startsWith('data:')) {
								fileContent = fileContent.replace(/^data:[^;]+;base64,/, '');
							}
							const buffer = Buffer.from(fileContent, 'base64');
							const binaryData = await this.helpers.prepareBinaryData(buffer, 'getInventoryPurchaseOrderFile.pdf');
							itemData.binary = { [binaryProp]: binaryData };
						}
						returnData.push(itemData);
					} else if (operation === 'addInventoryPurchaseOrder') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for addInventoryPurchaseOrder: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_warehouse_id = this.getNodeParameter('warehouse_id', i, 0) as number;
							if (val_warehouse_id !== undefined && val_warehouse_id !== null) params['warehouse_id'] = Number(val_warehouse_id);
							const val_supplier_id = this.getNodeParameter('supplier_id', i, 0) as number;
							if (val_supplier_id !== undefined && val_supplier_id !== null) params['supplier_id'] = Number(val_supplier_id);
							const val_payer_id = this.getNodeParameter('payer_id', i, 0) as number;
							if (val_payer_id !== undefined && val_payer_id !== null) params['payer_id'] = Number(val_payer_id);
							const val_currency = this.getNodeParameter('currency', i, '') as string;
							if (val_currency) params['currency'] = val_currency;
							const val_name = this.getNodeParameter('name', i, '') as string;
							if (val_name) params['name'] = val_name;
							const val_notes = this.getNodeParameter('notes', i, '') as string;
							if (val_notes) params['notes'] = val_notes;
							const val_invoice_no = this.getNodeParameter('invoice_no', i, '') as string;
							if (val_invoice_no) params['invoice_no'] = val_invoice_no;
							const val_date_cost_invoice_issue = this.getNodeParameter('date_cost_invoice_issue', i, 0) as number;
							if (val_date_cost_invoice_issue !== undefined && val_date_cost_invoice_issue !== null) params['date_cost_invoice_issue'] = Number(val_date_cost_invoice_issue);
							const val_date_delivery_expected = this.getNodeParameter('date_delivery_expected', i, 0) as number;
							if (val_date_delivery_expected !== undefined && val_date_delivery_expected !== null) params['date_delivery_expected'] = Number(val_date_delivery_expected);
							const raw_additional_costs = this.getNodeParameter('additional_costs', i, '[]') as string | any[];
							if (typeof raw_additional_costs === 'string') {
								try {
									params['additional_costs'] = JSON.parse(raw_additional_costs);
								} catch {
									params['additional_costs'] = raw_additional_costs.split(',').map((s: string) => s.trim()).filter(Boolean);
								}
							} else {
								params['additional_costs'] = raw_additional_costs;
							}
							const raw_packages = this.getNodeParameter('packages', i, '[]') as string | any[];
							if (typeof raw_packages === 'string') {
								try {
									params['packages'] = JSON.parse(raw_packages);
								} catch {
									params['packages'] = raw_packages.split(',').map((s: string) => s.trim()).filter(Boolean);
								}
							} else {
								params['packages'] = raw_packages;
							}
						}
						const response = await baselinkerApiRequest.call(this, 'addInventoryPurchaseOrder', params);
						returnData.push({
							json: {
								success: true,
								...params,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'addInventoryPurchaseOrderItems') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for addInventoryPurchaseOrderItems: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_order_id = this.getNodeParameter('order_id', i, 0) as number;
							if (val_order_id !== undefined && val_order_id !== null) params['order_id'] = Number(val_order_id);
							const raw_items = this.getNodeParameter('items', i, '[]') as string | any[];
							if (typeof raw_items === 'string') {
								try {
									params['items'] = JSON.parse(raw_items);
								} catch {
									params['items'] = raw_items.split(',').map((s: string) => s.trim()).filter(Boolean);
								}
							} else {
								params['items'] = raw_items;
							}
						}
						const response = await baselinkerApiRequest.call(this, 'addInventoryPurchaseOrderItems', params);
						returnData.push({
							json: {
								success: true,
								...params,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'addInventoryPurchaseOrderFile') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for addInventoryPurchaseOrderFile: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_purchase_order_id = this.getNodeParameter('purchase_order_id', i, 0) as number;
							if (val_purchase_order_id !== undefined && val_purchase_order_id !== null) params['purchase_order_id'] = Number(val_purchase_order_id);
							const val_file = this.getNodeParameter('file', i, '') as string;
							if (val_file) params['file'] = val_file;
							const val_cost_invoice_no = this.getNodeParameter('cost_invoice_no', i, '') as string;
							if (val_cost_invoice_no) params['cost_invoice_no'] = val_cost_invoice_no;
						}
						const response = await baselinkerApiRequest.call(this, 'addInventoryPurchaseOrderFile', params);
						returnData.push({
							json: {
								success: true,
								...params,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'deleteInventoryPurchaseOrderItems') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for deleteInventoryPurchaseOrderItems: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_order_id = this.getNodeParameter('order_id', i, 0) as number;
							if (val_order_id !== undefined && val_order_id !== null) params['order_id'] = Number(val_order_id);
							const raw_item_ids = this.getNodeParameter('item_ids', i, '[]') as string | any[];
							if (typeof raw_item_ids === 'string') {
								try {
									params['item_ids'] = JSON.parse(raw_item_ids);
								} catch {
									params['item_ids'] = raw_item_ids.split(',').map((s: string) => s.trim()).filter(Boolean);
								}
							} else {
								params['item_ids'] = raw_item_ids;
							}
						}
						const response = await baselinkerApiRequest.call(this, 'deleteInventoryPurchaseOrderItems', params);
						returnData.push({
							json: {
								success: true,
								...params,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'setInventoryPurchaseOrderStatus') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for setInventoryPurchaseOrderStatus: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_order_id = this.getNodeParameter('order_id', i, 0) as number;
							if (val_order_id !== undefined && val_order_id !== null) params['order_id'] = Number(val_order_id);
							const val_status = this.getNodeParameter('status', i, 0) as number;
							if (val_status !== undefined && val_status !== null) params['status'] = Number(val_status);
							const raw_completed_items = this.getNodeParameter('completed_items', i, '[]') as string | any[];
							if (typeof raw_completed_items === 'string') {
								try {
									params['completed_items'] = JSON.parse(raw_completed_items);
								} catch {
									params['completed_items'] = raw_completed_items.split(',').map((s: string) => s.trim()).filter(Boolean);
								}
							} else {
								params['completed_items'] = raw_completed_items;
							}
						}
						const response = await baselinkerApiRequest.call(this, 'setInventoryPurchaseOrderStatus', params);
						returnData.push({
							json: {
								success: true,
								...params,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'getInventoryTransfers') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for getInventoryTransfers: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_filter_transfer_id = this.getNodeParameter('filter_transfer_id', i, 0) as number;
							if (val_filter_transfer_id !== undefined && val_filter_transfer_id !== null) params['filter_transfer_id'] = Number(val_filter_transfer_id);
							const val_filter_warehouse_id = this.getNodeParameter('filter_warehouse_id', i, 0) as number;
							if (val_filter_warehouse_id !== undefined && val_filter_warehouse_id !== null) params['filter_warehouse_id'] = Number(val_filter_warehouse_id);
							const val_filter_target_warehouse_id = this.getNodeParameter('filter_target_warehouse_id', i, 0) as number;
							if (val_filter_target_warehouse_id !== undefined && val_filter_target_warehouse_id !== null) params['filter_target_warehouse_id'] = Number(val_filter_target_warehouse_id);
							const val_filter_transfer_status = this.getNodeParameter('filter_transfer_status', i, 0) as number;
							if (val_filter_transfer_status !== undefined && val_filter_transfer_status !== null) params['filter_transfer_status'] = Number(val_filter_transfer_status);
							const val_filter_transfer_type = this.getNodeParameter('filter_transfer_type', i, 0) as number;
							if (val_filter_transfer_type !== undefined && val_filter_transfer_type !== null) params['filter_transfer_type'] = Number(val_filter_transfer_type);
							const val_filter_series_id = this.getNodeParameter('filter_series_id', i, 0) as number;
							if (val_filter_series_id !== undefined && val_filter_series_id !== null) params['filter_series_id'] = Number(val_filter_series_id);
							const val_filter_date_from = this.getNodeParameter('filter_date_from', i, 0) as number;
							if (val_filter_date_from !== undefined && val_filter_date_from !== null) params['filter_date_from'] = Number(val_filter_date_from);
							const val_filter_date_to = this.getNodeParameter('filter_date_to', i, 0) as number;
							if (val_filter_date_to !== undefined && val_filter_date_to !== null) params['filter_date_to'] = Number(val_filter_date_to);
							const val_filter_transfer_number = this.getNodeParameter('filter_transfer_number', i, '') as string;
							if (val_filter_transfer_number) params['filter_transfer_number'] = val_filter_transfer_number;
						}
						const returnAll = parameterMode === 'fields' ? (this.getNodeParameter('returnAll', i, false) as boolean) : false;
						const limit = parameterMode === 'fields' && !returnAll ? (this.getNodeParameter('limit', i, 100) as number) : 0;
						let page = parameterMode === 'fields' && !returnAll ? (this.getNodeParameter('page', i, 1) as number) : (params.page as number || 1);
						let allItems: any[] = [];
						while (true) {
							params.page = page;
							const response = await baselinkerApiRequest.call(this, 'getInventoryTransfers', params);
							const rawList = response['transfers'] || response.items || response.list || [];
							const items = Array.isArray(rawList) ? rawList : Object.values(rawList);
							allItems.push(...items);
							if (!returnAll || items.length < 100) break;
							if (limit > 0 && allItems.length >= limit) {
								allItems = allItems.slice(0, limit);
								break;
							}
							page++;
							await new Promise((res) => setTimeout(res, 650));
						}
						for (const item of allItems) {
							returnData.push({
								json: typeof item === 'object' && item !== null ? item : { item },
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'getInventoryTransferItems') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for getInventoryTransferItems: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_transfer_id = this.getNodeParameter('transfer_id', i, 0) as number;
							if (val_transfer_id !== undefined && val_transfer_id !== null) params['transfer_id'] = Number(val_transfer_id);
						}
						const returnAll = parameterMode === 'fields' ? (this.getNodeParameter('returnAll', i, false) as boolean) : false;
						const limit = parameterMode === 'fields' && !returnAll ? (this.getNodeParameter('limit', i, 100) as number) : 0;
						let page = parameterMode === 'fields' && !returnAll ? (this.getNodeParameter('page', i, 1) as number) : (params.page as number || 1);
						let allItems: any[] = [];
						while (true) {
							params.page = page;
							const response = await baselinkerApiRequest.call(this, 'getInventoryTransferItems', params);
							const rawList = response['items'] || response.items || response.list || [];
							const items = Array.isArray(rawList) ? rawList : Object.values(rawList);
							allItems.push(...items);
							if (!returnAll || items.length < 100) break;
							if (limit > 0 && allItems.length >= limit) {
								allItems = allItems.slice(0, limit);
								break;
							}
							page++;
							await new Promise((res) => setTimeout(res, 650));
						}
						for (const item of allItems) {
							returnData.push({
								json: typeof item === 'object' && item !== null ? item : { item },
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'getInventoryTransferSeries') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for getInventoryTransferSeries: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_warehouse_id = this.getNodeParameter('warehouse_id', i, 0) as number;
							if (val_warehouse_id !== undefined && val_warehouse_id !== null) params['warehouse_id'] = Number(val_warehouse_id);
						}
						const response = await baselinkerApiRequest.call(this, 'getInventoryTransferSeries', params);
						const rawList = response['series'] || response.list || [];
						const items = Array.isArray(rawList) ? rawList : Object.values(rawList);
						for (const item of items) {
							returnData.push({
								json: typeof item === 'object' && item !== null ? item : { item },
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'addInventoryTransfer') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for addInventoryTransfer: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_warehouse_id = this.getNodeParameter('warehouse_id', i, 0) as number;
							if (val_warehouse_id !== undefined && val_warehouse_id !== null) params['warehouse_id'] = Number(val_warehouse_id);
							const val_target_warehouse_id = this.getNodeParameter('target_warehouse_id', i, 0) as number;
							if (val_target_warehouse_id !== undefined && val_target_warehouse_id !== null) params['target_warehouse_id'] = Number(val_target_warehouse_id);
							const val_transfer_type = this.getNodeParameter('transfer_type', i, 0) as number;
							if (val_transfer_type !== undefined && val_transfer_type !== null) params['transfer_type'] = Number(val_transfer_type);
							const val_name = this.getNodeParameter('name', i, '') as string;
							if (val_name) params['name'] = val_name;
							const val_priority = this.getNodeParameter('priority', i, 0) as number;
							if (val_priority !== undefined && val_priority !== null) params['priority'] = Number(val_priority);
							const val_assigned_to = this.getNodeParameter('assigned_to', i, 0) as number;
							if (val_assigned_to !== undefined && val_assigned_to !== null) params['assigned_to'] = Number(val_assigned_to);
							const val_date_scheduled = this.getNodeParameter('date_scheduled', i, 0) as number;
							if (val_date_scheduled !== undefined && val_date_scheduled !== null) params['date_scheduled'] = Number(val_date_scheduled);
							const val_date_due = this.getNodeParameter('date_due', i, 0) as number;
							if (val_date_due !== undefined && val_date_due !== null) params['date_due'] = Number(val_date_due);
							const val_notes = this.getNodeParameter('notes', i, '') as string;
							if (val_notes) params['notes'] = val_notes;
						}
						const response = await baselinkerApiRequest.call(this, 'addInventoryTransfer', params);
						returnData.push({
							json: {
								success: true,
								...params,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'addInventoryTransferItems') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for addInventoryTransferItems: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_transfer_id = this.getNodeParameter('transfer_id', i, 0) as number;
							if (val_transfer_id !== undefined && val_transfer_id !== null) params['transfer_id'] = Number(val_transfer_id);
							const raw_items = this.getNodeParameter('items', i, '[]') as string | any[];
							if (typeof raw_items === 'string') {
								try {
									params['items'] = JSON.parse(raw_items);
								} catch {
									params['items'] = raw_items.split(',').map((s: string) => s.trim()).filter(Boolean);
								}
							} else {
								params['items'] = raw_items;
							}
						}
						const response = await baselinkerApiRequest.call(this, 'addInventoryTransferItems', params);
						returnData.push({
							json: {
								success: true,
								...params,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'setInventoryTransferStatus') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for setInventoryTransferStatus: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_transfer_id = this.getNodeParameter('transfer_id', i, 0) as number;
							if (val_transfer_id !== undefined && val_transfer_id !== null) params['transfer_id'] = Number(val_transfer_id);
							const val_status = this.getNodeParameter('status', i, 0) as number;
							if (val_status !== undefined && val_status !== null) params['status'] = Number(val_status);
							const raw_completed_items = this.getNodeParameter('completed_items', i, '[]') as string | any[];
							if (typeof raw_completed_items === 'string') {
								try {
									params['completed_items'] = JSON.parse(raw_completed_items);
								} catch {
									params['completed_items'] = raw_completed_items.split(',').map((s: string) => s.trim()).filter(Boolean);
								}
							} else {
								params['completed_items'] = raw_completed_items;
							}
						}
						const response = await baselinkerApiRequest.call(this, 'setInventoryTransferStatus', params);
						returnData.push({
							json: {
								success: true,
								...params,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'getInventoryStocktakes') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for getInventoryStocktakes: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_filter_stocktake_id = this.getNodeParameter('filter_stocktake_id', i, 0) as number;
							if (val_filter_stocktake_id !== undefined && val_filter_stocktake_id !== null) params['filter_stocktake_id'] = Number(val_filter_stocktake_id);
							const val_filter_warehouse_id = this.getNodeParameter('filter_warehouse_id', i, 0) as number;
							if (val_filter_warehouse_id !== undefined && val_filter_warehouse_id !== null) params['filter_warehouse_id'] = Number(val_filter_warehouse_id);
							const val_filter_stocktake_status = this.getNodeParameter('filter_stocktake_status', i, 0) as number;
							if (val_filter_stocktake_status !== undefined && val_filter_stocktake_status !== null) params['filter_stocktake_status'] = Number(val_filter_stocktake_status);
							const val_filter_series_id = this.getNodeParameter('filter_series_id', i, 0) as number;
							if (val_filter_series_id !== undefined && val_filter_series_id !== null) params['filter_series_id'] = Number(val_filter_series_id);
							const val_filter_stocktake_number = this.getNodeParameter('filter_stocktake_number', i, '') as string;
							if (val_filter_stocktake_number) params['filter_stocktake_number'] = val_filter_stocktake_number;
							const val_filter_date_from = this.getNodeParameter('filter_date_from', i, 0) as number;
							if (val_filter_date_from !== undefined && val_filter_date_from !== null) params['filter_date_from'] = Number(val_filter_date_from);
							const val_filter_date_to = this.getNodeParameter('filter_date_to', i, 0) as number;
							if (val_filter_date_to !== undefined && val_filter_date_to !== null) params['filter_date_to'] = Number(val_filter_date_to);
						}
						const returnAll = parameterMode === 'fields' ? (this.getNodeParameter('returnAll', i, false) as boolean) : false;
						const limit = parameterMode === 'fields' && !returnAll ? (this.getNodeParameter('limit', i, 100) as number) : 0;
						let page = parameterMode === 'fields' && !returnAll ? (this.getNodeParameter('page', i, 1) as number) : (params.page as number || 1);
						let allItems: any[] = [];
						while (true) {
							params.page = page;
							const response = await baselinkerApiRequest.call(this, 'getInventoryStocktakes', params);
							const rawList = response['stocktakes'] || response.items || response.list || [];
							const items = Array.isArray(rawList) ? rawList : Object.values(rawList);
							allItems.push(...items);
							if (!returnAll || items.length < 100) break;
							if (limit > 0 && allItems.length >= limit) {
								allItems = allItems.slice(0, limit);
								break;
							}
							page++;
							await new Promise((res) => setTimeout(res, 650));
						}
						for (const item of allItems) {
							returnData.push({
								json: typeof item === 'object' && item !== null ? item : { item },
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'getInventoryStocktakeItems') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for getInventoryStocktakeItems: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_stocktake_id = this.getNodeParameter('stocktake_id', i, 0) as number;
							if (val_stocktake_id !== undefined && val_stocktake_id !== null) params['stocktake_id'] = Number(val_stocktake_id);
						}
						const returnAll = parameterMode === 'fields' ? (this.getNodeParameter('returnAll', i, false) as boolean) : false;
						const limit = parameterMode === 'fields' && !returnAll ? (this.getNodeParameter('limit', i, 100) as number) : 0;
						let page = parameterMode === 'fields' && !returnAll ? (this.getNodeParameter('page', i, 1) as number) : (params.page as number || 1);
						let allItems: any[] = [];
						while (true) {
							params.page = page;
							const response = await baselinkerApiRequest.call(this, 'getInventoryStocktakeItems', params);
							const rawList = response['items'] || response.items || response.list || [];
							const items = Array.isArray(rawList) ? rawList : Object.values(rawList);
							allItems.push(...items);
							if (!returnAll || items.length < 100) break;
							if (limit > 0 && allItems.length >= limit) {
								allItems = allItems.slice(0, limit);
								break;
							}
							page++;
							await new Promise((res) => setTimeout(res, 650));
						}
						for (const item of allItems) {
							returnData.push({
								json: typeof item === 'object' && item !== null ? item : { item },
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'getInventoryStocktakeSeries') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for getInventoryStocktakeSeries: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_warehouse_id = this.getNodeParameter('warehouse_id', i, 0) as number;
							if (val_warehouse_id !== undefined && val_warehouse_id !== null) params['warehouse_id'] = Number(val_warehouse_id);
						}
						const response = await baselinkerApiRequest.call(this, 'getInventoryStocktakeSeries', params);
						const rawList = response['series'] || response.list || [];
						const items = Array.isArray(rawList) ? rawList : Object.values(rawList);
						for (const item of items) {
							returnData.push({
								json: typeof item === 'object' && item !== null ? item : { item },
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'addInventoryStocktake') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for addInventoryStocktake: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_warehouse_id = this.getNodeParameter('warehouse_id', i, 0) as number;
							if (val_warehouse_id !== undefined && val_warehouse_id !== null) params['warehouse_id'] = Number(val_warehouse_id);
							const val_scope = this.getNodeParameter('scope', i, 0) as number;
							if (val_scope !== undefined && val_scope !== null) params['scope'] = Number(val_scope);
							const val_name = this.getNodeParameter('name', i, '') as string;
							if (val_name) params['name'] = val_name;
							const val_priority = this.getNodeParameter('priority', i, 0) as number;
							if (val_priority !== undefined && val_priority !== null) params['priority'] = Number(val_priority);
							const val_assigned_to = this.getNodeParameter('assigned_to', i, 0) as number;
							if (val_assigned_to !== undefined && val_assigned_to !== null) params['assigned_to'] = Number(val_assigned_to);
							const val_date_scheduled = this.getNodeParameter('date_scheduled', i, 0) as number;
							if (val_date_scheduled !== undefined && val_date_scheduled !== null) params['date_scheduled'] = Number(val_date_scheduled);
							const val_date_due = this.getNodeParameter('date_due', i, 0) as number;
							if (val_date_due !== undefined && val_date_due !== null) params['date_due'] = Number(val_date_due);
							const val_approval_method = this.getNodeParameter('approval_method', i, '') as string;
							if (val_approval_method) params['approval_method'] = val_approval_method;
							const val_blind_count = this.getNodeParameter('blind_count', i, false) as boolean;
							if (val_blind_count !== undefined) params['blind_count'] = Boolean(val_blind_count);
							const val_confirm_location = this.getNodeParameter('confirm_location', i, false) as boolean;
							if (val_confirm_location !== undefined) params['confirm_location'] = Boolean(val_confirm_location);
							const val_allow_add_remove_items = this.getNodeParameter('allow_add_remove_items', i, false) as boolean;
							if (val_allow_add_remove_items !== undefined) params['allow_add_remove_items'] = Boolean(val_allow_add_remove_items);
							const raw_product_ids = this.getNodeParameter('product_ids', i, '[]') as string | any[];
							if (typeof raw_product_ids === 'string') {
								try {
									params['product_ids'] = JSON.parse(raw_product_ids);
								} catch {
									params['product_ids'] = raw_product_ids.split(',').map((s: string) => s.trim()).filter(Boolean);
								}
							} else {
								params['product_ids'] = raw_product_ids;
							}
							const raw_scope_zones = this.getNodeParameter('scope_zones', i, '[]') as string | any[];
							if (typeof raw_scope_zones === 'string') {
								try {
									params['scope_zones'] = JSON.parse(raw_scope_zones);
								} catch {
									params['scope_zones'] = raw_scope_zones.split(',').map((s: string) => s.trim()).filter(Boolean);
								}
							} else {
								params['scope_zones'] = raw_scope_zones;
							}
							const val_scope_locations_prefix = this.getNodeParameter('scope_locations_prefix', i, '') as string;
							if (val_scope_locations_prefix) params['scope_locations_prefix'] = val_scope_locations_prefix;
							const val_scope_random_count = this.getNodeParameter('scope_random_count', i, 0) as number;
							if (val_scope_random_count !== undefined && val_scope_random_count !== null) params['scope_random_count'] = Number(val_scope_random_count);
						}
						const response = await baselinkerApiRequest.call(this, 'addInventoryStocktake', params);
						returnData.push({
							json: {
								success: true,
								...params,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'addInventoryStocktakeItems') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for addInventoryStocktakeItems: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_stocktake_id = this.getNodeParameter('stocktake_id', i, 0) as number;
							if (val_stocktake_id !== undefined && val_stocktake_id !== null) params['stocktake_id'] = Number(val_stocktake_id);
							const raw_items = this.getNodeParameter('items', i, '[]') as string | any[];
							if (typeof raw_items === 'string') {
								try {
									params['items'] = JSON.parse(raw_items);
								} catch {
									params['items'] = raw_items.split(',').map((s: string) => s.trim()).filter(Boolean);
								}
							} else {
								params['items'] = raw_items;
							}
						}
						const response = await baselinkerApiRequest.call(this, 'addInventoryStocktakeItems', params);
						returnData.push({
							json: {
								success: true,
								...params,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'setInventoryStocktakeStatus') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for setInventoryStocktakeStatus: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_stocktake_id = this.getNodeParameter('stocktake_id', i, 0) as number;
							if (val_stocktake_id !== undefined && val_stocktake_id !== null) params['stocktake_id'] = Number(val_stocktake_id);
							const val_status = this.getNodeParameter('status', i, 0) as number;
							if (val_status !== undefined && val_status !== null) params['status'] = Number(val_status);
							const raw_completed_items = this.getNodeParameter('completed_items', i, '[]') as string | any[];
							if (typeof raw_completed_items === 'string') {
								try {
									params['completed_items'] = JSON.parse(raw_completed_items);
								} catch {
									params['completed_items'] = raw_completed_items.split(',').map((s: string) => s.trim()).filter(Boolean);
								}
							} else {
								params['completed_items'] = raw_completed_items;
							}
						}
						const response = await baselinkerApiRequest.call(this, 'setInventoryStocktakeStatus', params);
						returnData.push({
							json: {
								success: true,
								...params,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'getInventoryFulfillmentDeliveries') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for getInventoryFulfillmentDeliveries: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_fulfillment_warehouse_id = this.getNodeParameter('fulfillment_warehouse_id', i, 0) as number;
							if (val_fulfillment_warehouse_id !== undefined && val_fulfillment_warehouse_id !== null) params['fulfillment_warehouse_id'] = Number(val_fulfillment_warehouse_id);
							const raw_fulfillment_warehouse_ids = this.getNodeParameter('fulfillment_warehouse_ids', i, '[]') as string | any[];
							if (typeof raw_fulfillment_warehouse_ids === 'string') {
								try {
									params['fulfillment_warehouse_ids'] = JSON.parse(raw_fulfillment_warehouse_ids);
								} catch {
									params['fulfillment_warehouse_ids'] = raw_fulfillment_warehouse_ids.split(',').map((s: string) => s.trim()).filter(Boolean);
								}
							} else {
								params['fulfillment_warehouse_ids'] = raw_fulfillment_warehouse_ids;
							}
							const val_external_warehouse_id = this.getNodeParameter('external_warehouse_id', i, '') as string;
							if (val_external_warehouse_id) params['external_warehouse_id'] = val_external_warehouse_id;
							const raw_external_warehouse_ids = this.getNodeParameter('external_warehouse_ids', i, '[]') as string | any[];
							if (typeof raw_external_warehouse_ids === 'string') {
								try {
									params['external_warehouse_ids'] = JSON.parse(raw_external_warehouse_ids);
								} catch {
									params['external_warehouse_ids'] = raw_external_warehouse_ids.split(',').map((s: string) => s.trim()).filter(Boolean);
								}
							} else {
								params['external_warehouse_ids'] = raw_external_warehouse_ids;
							}
							const val_warehouse_id = this.getNodeParameter('warehouse_id', i, 0) as number;
							if (val_warehouse_id !== undefined && val_warehouse_id !== null) params['warehouse_id'] = Number(val_warehouse_id);
							const val_status = this.getNodeParameter('status', i, 0) as number;
							if (val_status !== undefined && val_status !== null) params['status'] = Number(val_status);
							const raw_statuses = this.getNodeParameter('statuses', i, '[]') as string | any[];
							if (typeof raw_statuses === 'string') {
								try {
									params['statuses'] = JSON.parse(raw_statuses);
								} catch {
									params['statuses'] = raw_statuses.split(',').map((s: string) => s.trim()).filter(Boolean);
								}
							} else {
								params['statuses'] = raw_statuses;
							}
							const val_date_from = this.getNodeParameter('date_from', i, 0) as number;
							if (val_date_from !== undefined && val_date_from !== null) params['date_from'] = Number(val_date_from);
							const val_date_to = this.getNodeParameter('date_to', i, 0) as number;
							if (val_date_to !== undefined && val_date_to !== null) params['date_to'] = Number(val_date_to);
							const val_filter_document_number = this.getNodeParameter('filter_document_number', i, '') as string;
							if (val_filter_document_number) params['filter_document_number'] = val_filter_document_number;
						}
						const returnAll = parameterMode === 'fields' ? (this.getNodeParameter('returnAll', i, false) as boolean) : false;
						const limit = parameterMode === 'fields' && !returnAll ? (this.getNodeParameter('limit', i, 100) as number) : 0;
						let page = parameterMode === 'fields' && !returnAll ? (this.getNodeParameter('page', i, 1) as number) : (params.page as number || 1);
						let allItems: any[] = [];
						while (true) {
							params.page = page;
							const response = await baselinkerApiRequest.call(this, 'getInventoryFulfillmentDeliveries', params);
							const rawList = response['deliveries'] || response.items || response.list || [];
							const items = Array.isArray(rawList) ? rawList : Object.values(rawList);
							allItems.push(...items);
							if (!returnAll || items.length < 100) break;
							if (limit > 0 && allItems.length >= limit) {
								allItems = allItems.slice(0, limit);
								break;
							}
							page++;
							await new Promise((res) => setTimeout(res, 650));
						}
						for (const item of allItems) {
							returnData.push({
								json: typeof item === 'object' && item !== null ? item : { item },
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'getInventoryFulfillmentDeliveryItems') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for getInventoryFulfillmentDeliveryItems: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_delivery_id = this.getNodeParameter('delivery_id', i, 0) as number;
							if (val_delivery_id !== undefined && val_delivery_id !== null) params['delivery_id'] = Number(val_delivery_id);
						}
						const returnAll = parameterMode === 'fields' ? (this.getNodeParameter('returnAll', i, false) as boolean) : false;
						const limit = parameterMode === 'fields' && !returnAll ? (this.getNodeParameter('limit', i, 100) as number) : 0;
						let page = parameterMode === 'fields' && !returnAll ? (this.getNodeParameter('page', i, 1) as number) : (params.page as number || 1);
						let allItems: any[] = [];
						while (true) {
							params.page = page;
							const response = await baselinkerApiRequest.call(this, 'getInventoryFulfillmentDeliveryItems', params);
							const rawList = response['items'] || response.items || response.list || [];
							const items = Array.isArray(rawList) ? rawList : Object.values(rawList);
							allItems.push(...items);
							if (!returnAll || items.length < 100) break;
							if (limit > 0 && allItems.length >= limit) {
								allItems = allItems.slice(0, limit);
								break;
							}
							page++;
							await new Promise((res) => setTimeout(res, 650));
						}
						for (const item of allItems) {
							returnData.push({
								json: typeof item === 'object' && item !== null ? item : { item },
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'getInventoryFulfillmentDeliveryLabels') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for getInventoryFulfillmentDeliveryLabels: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_delivery_id = this.getNodeParameter('delivery_id', i, 0) as number;
							if (val_delivery_id !== undefined && val_delivery_id !== null) params['delivery_id'] = Number(val_delivery_id);
							const val_type = this.getNodeParameter('type', i, '') as string;
							if (val_type) params['type'] = val_type;
						}
						const response = await baselinkerApiRequest.call(this, 'getInventoryFulfillmentDeliveryLabels', params);
						const downloadBinary = parameterMode === 'fields' ? (this.getNodeParameter('downloadAsBinary', i, false) as boolean) : false;
						const itemData: INodeExecutionData = {
							json: { ...response },
							pairedItem: { item: i },
						};
						if (downloadBinary && response.file) {
							const binaryProp = this.getNodeParameter('binaryPropertyName', i, 'data') as string;
							let fileContent = response.file as string;
							if (fileContent.startsWith('data:')) {
								fileContent = fileContent.replace(/^data:[^;]+;base64,/, '');
							}
							const buffer = Buffer.from(fileContent, 'base64');
							const binaryData = await this.helpers.prepareBinaryData(buffer, 'getInventoryFulfillmentDeliveryLabels.pdf');
							itemData.binary = { [binaryProp]: binaryData };
						}
						returnData.push(itemData);
					} else if (operation === 'addInventoryFulfillmentDelivery') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for addInventoryFulfillmentDelivery: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_warehouse_id = this.getNodeParameter('warehouse_id', i, 0) as number;
							if (val_warehouse_id !== undefined && val_warehouse_id !== null) params['warehouse_id'] = Number(val_warehouse_id);
							const val_fulfillment_warehouse_id = this.getNodeParameter('fulfillment_warehouse_id', i, 0) as number;
							if (val_fulfillment_warehouse_id !== undefined && val_fulfillment_warehouse_id !== null) params['fulfillment_warehouse_id'] = Number(val_fulfillment_warehouse_id);
							const val_name = this.getNodeParameter('name', i, '') as string;
							if (val_name) params['name'] = val_name;
						}
						const response = await baselinkerApiRequest.call(this, 'addInventoryFulfillmentDelivery', params);
						returnData.push({
							json: {
								success: true,
								...params,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'addInventoryFulfillmentDeliveryItems') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for addInventoryFulfillmentDeliveryItems: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_delivery_id = this.getNodeParameter('delivery_id', i, 0) as number;
							if (val_delivery_id !== undefined && val_delivery_id !== null) params['delivery_id'] = Number(val_delivery_id);
							const raw_items = this.getNodeParameter('items', i, '[]') as string | any[];
							if (typeof raw_items === 'string') {
								try {
									params['items'] = JSON.parse(raw_items);
								} catch {
									params['items'] = raw_items.split(',').map((s: string) => s.trim()).filter(Boolean);
								}
							} else {
								params['items'] = raw_items;
							}
						}
						const response = await baselinkerApiRequest.call(this, 'addInventoryFulfillmentDeliveryItems', params);
						returnData.push({
							json: {
								success: true,
								...params,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'runInventoryFulfillmentDeliverySubmission') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('jsonParameters', i, '{}') as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for runInventoryFulfillmentDeliverySubmission: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const val_delivery_id = this.getNodeParameter('delivery_id', i, 0) as number;
							if (val_delivery_id !== undefined && val_delivery_id !== null) params['delivery_id'] = Number(val_delivery_id);
							const val_date_arrival = this.getNodeParameter('date_arrival', i, 0) as number;
							if (val_date_arrival !== undefined && val_date_arrival !== null) params['date_arrival'] = Number(val_date_arrival);
						}
						const response = await baselinkerApiRequest.call(this, 'runInventoryFulfillmentDeliverySubmission', params);
						returnData.push({
							json: {
								success: true,
								...params,
								...response,
							},
							pairedItem: { item: i },
						});
					}

				} else if (resource === 'orderReturns') {
					if (operation === 'getOrderReturns') {
						const mode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let parameters: IGetOrderReturnsFilterParameters = {};

						if (mode === 'json') {
							const rawJson = this.getNodeParameter('parametersJson', i) as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									parameters = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON in Parameters (JSON): ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else if (typeof rawJson === 'object' && rawJson !== null) {
								parameters = { ...rawJson };
							}
						} else {
							const returnId = this.getNodeParameter('return_id', i, undefined) as number | undefined;
							if (returnId !== undefined && returnId > 0) {
								parameters.return_id = returnId;
							}
							const orderId = this.getNodeParameter('order_id', i, undefined) as number | undefined;
							if (orderId !== undefined && orderId > 0) {
								parameters.order_id = orderId;
							}
							const idFrom = this.getNodeParameter('id_from', i, undefined) as number | undefined;
							if (idFrom !== undefined && idFrom > 0) {
								parameters.id_from = idFrom;
							}
							const dateFromRaw = this.getNodeParameter('date_from', i, undefined);
							const normalizedDateFrom = normalizeTimestamp(dateFromRaw);
							if (normalizedDateFrom !== undefined) {
								parameters.date_from = normalizedDateFrom;
							}
							const statusId = this.getNodeParameter('status_id', i, undefined);
							if (statusId !== undefined && statusId !== '') {
								parameters.status_id = Number(statusId);
							}
							const filterSource = this.getNodeParameter('filter_order_return_source', i, '') as string;
							if (filterSource) {
								parameters.filter_order_return_source = filterSource;
							}
							const filterSourceId = this.getNodeParameter('filter_order_return_source_id', i, undefined);
							if (filterSourceId !== undefined && filterSourceId !== '') {
								parameters.filter_order_return_source_id = Number(filterSourceId);
							}
							const includeCustomExtraFields = this.getNodeParameter('include_custom_extra_fields', i, false) as boolean;
							if (includeCustomExtraFields) {
								parameters.include_custom_extra_fields = true;
							}
							const includeConnectData = this.getNodeParameter('include_connect_data', i, false) as boolean;
							if (includeConnectData) {
								parameters.include_connect_data = true;
							}
						}

						let returns: IBaseLinkerOrderReturn[] = [];
						const returnAll = mode === 'fields' ? (this.getNodeParameter('returnAll', i, false) as boolean) : false;

						if (returnAll) {
							const limit = this.getNodeParameter('limit', i, 100) as number;
							const paginationField = this.getNodeParameter('paginationField', i, 'id_from') as 'id_from' | 'date_from';
							const delayMs = this.getNodeParameter('delayMs', i, 650) as number;
							returns = await baselinkerGetOrderReturnsAll.call(this, parameters, {
								returnAll,
								limit,
								paginationField,
								delayMs,
							});
						} else {
							const response = await baselinkerApiRequest.call(this, 'getOrderReturns', parameters);
							returns = response.returns || [];
							if (mode === 'fields') {
								const limit = this.getNodeParameter('limit', i, 100) as number;
								if (limit > 0 && returns.length > limit) {
									returns = returns.slice(0, limit);
								}
							}
						}

						for (const ret of returns) {
							returnData.push({
								json: ret as IDataObject,
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'getOrderReturnExtraFields') {
						const response = await baselinkerApiRequest.call(this, 'getOrderReturnExtraFields', {});
						const rawFields = response.extra_fields || [];
						const extraFields: IBaseLinkerOrderReturnExtraField[] = Array.isArray(rawFields)
							? rawFields
							: Object.values(rawFields);
						for (const field of extraFields) {
							returnData.push({
								json: field as unknown as IDataObject,
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'addOrderReturn') {
						const mode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};

						if (mode === 'json') {
							const rawJson = this.getNodeParameter('parametersJson', i) as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON in Parameters (JSON): ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else if (typeof rawJson === 'object' && rawJson !== null) {
								params = { ...rawJson };
							}
						} else {
							params.status_id = Number(this.getNodeParameter('status_id', i));
							params.currency = this.getNodeParameter('currency', i, 'PLN') as string;

							const orderId = this.getNodeParameter('order_id', i, undefined);
							if (orderId !== undefined && orderId !== '') params.order_id = Number(orderId);

							const customSourceId = this.getNodeParameter('custom_source_id', i, undefined);
							if (customSourceId !== undefined && customSourceId !== '') params.custom_source_id = Number(customSourceId);

							const refNr = this.getNodeParameter('reference_number', i, '') as string;
							if (refNr) params.reference_number = refNr;

							const dateAddRaw = this.getNodeParameter('date_add', i, undefined);
							const normalizedDateAdd = normalizeTimestamp(dateAddRaw);
							if (normalizedDateAdd !== undefined) params.date_add = normalizedDateAdd;

							const refunded = this.getNodeParameter('refunded', i, false) as boolean;
							if (refunded) params.refunded = true;

							const adminComments = this.getNodeParameter('admin_comments', i, '') as string;
							if (adminComments) params.admin_comments = adminComments;

							const email = this.getNodeParameter('email', i, '') as string;
							if (email) params.email = email;

							const phone = this.getNodeParameter('phone', i, '') as string;
							if (phone) params.phone = phone;

							const userLogin = this.getNodeParameter('user_login', i, '') as string;
							if (userLogin) params.user_login = userLogin;

							const deliveryPrice = this.getNodeParameter('delivery_price', i, 0) as number;
							if (deliveryPrice) params.delivery_price = Number(deliveryPrice);

							const delFullname = this.getNodeParameter('delivery_fullname', i, '') as string;
							if (delFullname) params.delivery_fullname = delFullname;

							const delCompany = this.getNodeParameter('delivery_company', i, '') as string;
							if (delCompany) params.delivery_company = delCompany;

							const delAddress = this.getNodeParameter('delivery_address', i, '') as string;
							if (delAddress) params.delivery_address = delAddress;

							const delPostcode = this.getNodeParameter('delivery_postcode', i, '') as string;
							if (delPostcode) params.delivery_postcode = delPostcode;

							const delCity = this.getNodeParameter('delivery_city', i, '') as string;
							if (delCity) params.delivery_city = delCity;

							const delState = this.getNodeParameter('delivery_state', i, '') as string;
							if (delState) params.delivery_state = delState;

							const delCountryCode = this.getNodeParameter('delivery_country_code', i, '') as string;
							if (delCountryCode) params.delivery_country_code = delCountryCode;

							const extraField1 = this.getNodeParameter('extra_field_1', i, '') as string;
							if (extraField1) params.extra_field_1 = extraField1;

							const extraField2 = this.getNodeParameter('extra_field_2', i, '') as string;
							if (extraField2) params.extra_field_2 = extraField2;

							const refundAccNr = this.getNodeParameter('refund_account_number', i, '') as string;
							if (refundAccNr) params.refund_account_number = refundAccNr;

							const refundIban = this.getNodeParameter('refund_iban', i, '') as string;
							if (refundIban) params.refund_iban = refundIban;

							const refundSwift = this.getNodeParameter('refund_swift', i, '') as string;
							if (refundSwift) params.refund_swift = refundSwift;

							// Custom Extra Fields
							const customFields: Record<string, any> = {};
							const customFieldsJson = this.getNodeParameter('customExtraFieldsJson', i, '') as string | IDataObject;
							if (customFieldsJson) {
								if (typeof customFieldsJson === 'string' && customFieldsJson.trim() !== '') {
									try {
										Object.assign(customFields, JSON.parse(customFieldsJson));
									} catch (err: any) {
										throw new NodeOperationError(this.getNode(), `Invalid JSON in Custom Extra Fields (JSON): ${err.message}`, { itemIndex: i });
									}
								} else if (typeof customFieldsJson === 'object') {
									Object.assign(customFields, customFieldsJson);
								}
							}
							const customFieldsUi = this.getNodeParameter('customExtraFieldsUi', i, {}) as IDataObject;
							if (customFieldsUi && Array.isArray((customFieldsUi as any).fields)) {
								for (const f of (customFieldsUi as any).fields) {
									if (f.field_id !== undefined && f.field_id !== '') {
										customFields[String(f.field_id)] = f.value;
									}
								}
							}
							if (Object.keys(customFields).length > 0) {
								params.custom_extra_fields = customFields;
							}

							// Products
							const productsJson = this.getNodeParameter('productsJson', i, '') as string | IDataObject[];
							if (productsJson) {
								if (typeof productsJson === 'string' && productsJson.trim() !== '') {
									try {
										params.products = JSON.parse(productsJson);
									} catch (err: any) {
										throw new NodeOperationError(this.getNode(), `Invalid JSON in Return Products (JSON): ${err.message}`, { itemIndex: i });
									}
								} else if (Array.isArray(productsJson)) {
									params.products = productsJson;
								}
							} else {
								const productsUi = this.getNodeParameter('productsUi', i, {}) as IDataObject;
								if (productsUi && Array.isArray((productsUi as any).items) && (productsUi as any).items.length > 0) {
									params.products = (productsUi as any).items.map((item: any) => {
										const p: Record<string, any> = {
											name: item.name,
											quantity: Number(item.quantity || 1),
											price_brutto: Number(item.price_brutto || 0),
										};
										if (item.tax_rate !== undefined && item.tax_rate !== '') p.tax_rate = Number(item.tax_rate);
										if (item.order_product_id !== undefined && item.order_product_id !== '') p.order_product_id = Number(item.order_product_id);
										if (item.storage) p.storage = item.storage;
										if (item.storage_id !== undefined && item.storage_id !== '') p.storage_id = item.storage_id;
										if (item.product_id) p.product_id = item.product_id;
										if (item.variant_id) p.variant_id = item.variant_id;
										if (item.sku) p.sku = item.sku;
										if (item.ean) p.ean = item.ean;
										if (item.location) p.location = item.location;
										if (item.warehouse_id !== undefined && item.warehouse_id !== '') p.warehouse_id = Number(item.warehouse_id);
										if (item.attributes) p.attributes = item.attributes;
										if (item.weight !== undefined && item.weight !== '') p.weight = Number(item.weight);
										if (item.status_id !== undefined && item.status_id !== '') p.status_id = Number(item.status_id);
										if (item.return_reason_id !== undefined && item.return_reason_id !== '') p.return_reason_id = Number(item.return_reason_id);
										return p;
									});
								}
							}
						}

						const response = await baselinkerApiRequest.call(this, 'addOrderReturn', params);
						returnData.push({
							json: response as IDataObject,
							pairedItem: { item: i },
						});
					} else if (operation === 'setOrderReturnFields') {
						const mode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};

						if (mode === 'json') {
							const rawJson = this.getNodeParameter('parametersJson', i) as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON in Parameters (JSON): ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else if (typeof rawJson === 'object' && rawJson !== null) {
								params = { ...rawJson };
							}
						} else {
							params.return_id = Number(this.getNodeParameter('return_id', i));

							const adminComments = this.getNodeParameter('admin_comments', i, undefined);
							if (adminComments !== undefined && adminComments !== '') params.admin_comments = adminComments;

							const email = this.getNodeParameter('email', i, undefined);
							if (email !== undefined && email !== '') params.email = email;

							const phone = this.getNodeParameter('phone', i, undefined);
							if (phone !== undefined && phone !== '') params.phone = phone;

							const userLogin = this.getNodeParameter('user_login', i, undefined);
							if (userLogin !== undefined && userLogin !== '') params.user_login = userLogin;

							const deliveryPrice = this.getNodeParameter('delivery_price', i, undefined);
							if (deliveryPrice !== undefined && deliveryPrice !== '') params.delivery_price = Number(deliveryPrice);

							const delFullname = this.getNodeParameter('delivery_fullname', i, undefined);
							if (delFullname !== undefined && delFullname !== '') params.delivery_fullname = delFullname;

							const delCompany = this.getNodeParameter('delivery_company', i, undefined);
							if (delCompany !== undefined && delCompany !== '') params.delivery_company = delCompany;

							const delAddress = this.getNodeParameter('delivery_address', i, undefined);
							if (delAddress !== undefined && delAddress !== '') params.delivery_address = delAddress;

							const delPostcode = this.getNodeParameter('delivery_postcode', i, undefined);
							if (delPostcode !== undefined && delPostcode !== '') params.delivery_postcode = delPostcode;

							const delCity = this.getNodeParameter('delivery_city', i, undefined);
							if (delCity !== undefined && delCity !== '') params.delivery_city = delCity;

							const delState = this.getNodeParameter('delivery_state', i, undefined);
							if (delState !== undefined && delState !== '') params.delivery_state = delState;

							const delCountryCode = this.getNodeParameter('delivery_country_code', i, undefined);
							if (delCountryCode !== undefined && delCountryCode !== '') params.delivery_country_code = delCountryCode;

							const extraField1 = this.getNodeParameter('extra_field_1', i, undefined);
							if (extraField1 !== undefined && extraField1 !== '') params.extra_field_1 = extraField1;

							const extraField2 = this.getNodeParameter('extra_field_2', i, undefined);
							if (extraField2 !== undefined && extraField2 !== '') params.extra_field_2 = extraField2;

							// Custom Extra Fields
							const customFields: Record<string, any> = {};
							const customFieldsJson = this.getNodeParameter('customExtraFieldsJson', i, '') as string | IDataObject;
							if (customFieldsJson) {
								if (typeof customFieldsJson === 'string' && customFieldsJson.trim() !== '') {
									try {
										Object.assign(customFields, JSON.parse(customFieldsJson));
									} catch (err: any) {
										throw new NodeOperationError(this.getNode(), `Invalid JSON in Custom Extra Fields (JSON): ${err.message}`, { itemIndex: i });
									}
								} else if (typeof customFieldsJson === 'object') {
									Object.assign(customFields, customFieldsJson);
								}
							}
							const customFieldsUi = this.getNodeParameter('customExtraFieldsUi', i, {}) as IDataObject;
							if (customFieldsUi && Array.isArray((customFieldsUi as any).fields)) {
								for (const f of (customFieldsUi as any).fields) {
									if (f.field_id !== undefined && f.field_id !== '') {
										customFields[String(f.field_id)] = f.value;
									}
								}
							}
							if (Object.keys(customFields).length > 0) {
								params.custom_extra_fields = customFields;
							}
						}

						const response = await baselinkerApiRequest.call(this, 'setOrderReturnFields', params);
						returnData.push({
							json: response as IDataObject,
							pairedItem: { item: i },
						});
					} else if (operation === 'addOrderReturnProduct') {
						const mode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};

						if (mode === 'json') {
							const rawJson = this.getNodeParameter('parametersJson', i) as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON in Parameters (JSON): ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else if (typeof rawJson === 'object' && rawJson !== null) {
								params = { ...rawJson };
							}
						} else {
							params.return_id = Number(this.getNodeParameter('return_id', i));
							params.name = this.getNodeParameter('name', i) as string;
							params.price_brutto = Number(this.getNodeParameter('price_brutto', i));
							params.quantity = Number(this.getNodeParameter('quantity', i, 1));

							const taxRate = this.getNodeParameter('tax_rate', i, undefined);
							if (taxRate !== undefined && taxRate !== '') params.tax_rate = Number(taxRate);

							const orderProductId = this.getNodeParameter('order_product_id', i, undefined);
							if (orderProductId !== undefined && orderProductId !== '') params.order_product_id = Number(orderProductId);

							const storage = this.getNodeParameter('storage', i, undefined);
							if (storage) params.storage = storage;

							const storageId = this.getNodeParameter('storage_id', i, undefined);
							if (storageId !== undefined && storageId !== '') params.storage_id = storageId;

							const productId = this.getNodeParameter('product_id', i, undefined);
							if (productId) params.product_id = productId;

							const variantId = this.getNodeParameter('variant_id', i, undefined);
							if (variantId) params.variant_id = variantId;

							const sku = this.getNodeParameter('sku', i, undefined);
							if (sku) params.sku = sku;

							const ean = this.getNodeParameter('ean', i, undefined);
							if (ean) params.ean = ean;

							const location = this.getNodeParameter('location', i, undefined);
							if (location) params.location = location;

							const warehouseId = this.getNodeParameter('warehouse_id', i, undefined);
							if (warehouseId !== undefined && warehouseId !== '') params.warehouse_id = Number(warehouseId);

							const attributes = this.getNodeParameter('attributes', i, undefined);
							if (attributes) params.attributes = attributes;

							const weight = this.getNodeParameter('weight', i, undefined);
							if (weight !== undefined && weight !== '') params.weight = Number(weight);

							const statusId = this.getNodeParameter('status_id', i, undefined);
							if (statusId !== undefined && statusId !== '') params.status_id = Number(statusId);

							const returnReasonId = this.getNodeParameter('return_reason_id', i, undefined);
							if (returnReasonId !== undefined && returnReasonId !== '') params.return_reason_id = Number(returnReasonId);
						}

						const response = await baselinkerApiRequest.call(this, 'addOrderReturnProduct', params);
						returnData.push({
							json: response as IDataObject,
							pairedItem: { item: i },
						});
					} else if (operation === 'deleteOrderReturnProduct') {
						const returnId = Number(this.getNodeParameter('return_id', i));
						const orderReturnProductId = Number(this.getNodeParameter('order_return_product_id', i));
						const response = await baselinkerApiRequest.call(this, 'deleteOrderReturnProduct', {
							return_id: returnId,
							order_return_product_id: orderReturnProductId,
						});
						returnData.push({
							json: response as IDataObject,
							pairedItem: { item: i },
						});
					} else if (operation === 'setOrderReturnProductFields') {
						const mode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};

						if (mode === 'json') {
							const rawJson = this.getNodeParameter('parametersJson', i) as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON in Parameters (JSON): ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else if (typeof rawJson === 'object' && rawJson !== null) {
								params = { ...rawJson };
							}
						} else {
							params.return_id = Number(this.getNodeParameter('return_id', i));
							params.order_return_product_id = Number(this.getNodeParameter('order_return_product_id', i));

							const name = this.getNodeParameter('name', i, undefined);
							if (name !== undefined && name !== '') params.name = name;

							const priceBrutto = this.getNodeParameter('price_brutto', i, undefined);
							if (priceBrutto !== undefined && priceBrutto !== '') params.price_brutto = Number(priceBrutto);

							const quantity = this.getNodeParameter('quantity', i, undefined);
							if (quantity !== undefined && quantity !== '') params.quantity = Number(quantity);

							const taxRate = this.getNodeParameter('tax_rate', i, undefined);
							if (taxRate !== undefined && taxRate !== '') params.tax_rate = Number(taxRate);

							const storage = this.getNodeParameter('storage', i, undefined);
							if (storage) params.storage = storage;

							const storageId = this.getNodeParameter('storage_id', i, undefined);
							if (storageId !== undefined && storageId !== '') params.storage_id = storageId;

							const productId = this.getNodeParameter('product_id', i, undefined);
							if (productId) params.product_id = productId;

							const variantId = this.getNodeParameter('variant_id', i, undefined);
							if (variantId) params.variant_id = variantId;

							const sku = this.getNodeParameter('sku', i, undefined);
							if (sku) params.sku = sku;

							const ean = this.getNodeParameter('ean', i, undefined);
							if (ean) params.ean = ean;

							const location = this.getNodeParameter('location', i, undefined);
							if (location) params.location = location;

							const warehouseId = this.getNodeParameter('warehouse_id', i, undefined);
							if (warehouseId !== undefined && warehouseId !== '') params.warehouse_id = Number(warehouseId);

							const attributes = this.getNodeParameter('attributes', i, undefined);
							if (attributes) params.attributes = attributes;

							const weight = this.getNodeParameter('weight', i, undefined);
							if (weight !== undefined && weight !== '') params.weight = Number(weight);

							const statusId = this.getNodeParameter('status_id', i, undefined);
							if (statusId !== undefined && statusId !== '') params.status_id = Number(statusId);

							const returnReasonId = this.getNodeParameter('return_reason_id', i, undefined);
							if (returnReasonId !== undefined && returnReasonId !== '') params.return_reason_id = Number(returnReasonId);
						}

						const response = await baselinkerApiRequest.call(this, 'setOrderReturnProductFields', params);
						returnData.push({
							json: response as IDataObject,
							pairedItem: { item: i },
						});
					} else if (operation === 'getOrderReturnStatusList') {
						const filterGroupId = this.getNodeParameter('filterGroupId', i, undefined);
						const response = await baselinkerApiRequest.call(this, 'getOrderReturnStatusList', {});
						let statuses: IBaseLinkerOrderReturnStatus[] = response.statuses || [];
						if (filterGroupId !== undefined && filterGroupId !== '') {
							statuses = statuses.filter((s) => s.group_id === Number(filterGroupId));
						}
						for (const status of statuses) {
							returnData.push({
								json: status as unknown as IDataObject,
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'getOrderReturnStatusGroups') {
						const response = await baselinkerApiRequest.call(this, 'getOrderReturnStatusGroups', {});
						const groups: IBaseLinkerOrderReturnStatusGroup[] = response.status_groups || [];
						for (const group of groups) {
							returnData.push({
								json: group as unknown as IDataObject,
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'setOrderReturnStatus') {
						const mode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};

						if (mode === 'json') {
							const rawJson = this.getNodeParameter('parametersJson', i) as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON in Parameters (JSON): ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else if (typeof rawJson === 'object' && rawJson !== null) {
								params = { ...rawJson };
							}
						} else {
							params.return_id = Number(this.getNodeParameter('return_id', i));
							params.status_id = Number(this.getNodeParameter('status_id', i));
						}

						const response = await baselinkerApiRequest.call(this, 'setOrderReturnStatus', params);
						returnData.push({
							json: response as IDataObject,
							pairedItem: { item: i },
						});
					} else if (operation === 'setOrderReturnStatuses') {
						const mode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let returnIds: number[] = [];
						let statusId: number;

						if (mode === 'json') {
							const rawJson = this.getNodeParameter('parametersJson', i) as string | IDataObject;
							let params: IDataObject = {};
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON in Parameters (JSON): ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else if (typeof rawJson === 'object' && rawJson !== null) {
								params = { ...rawJson };
							}
							returnIds = (params.return_ids as number[]) || [];
							statusId = Number(params.status_id);
						} else {
							const rawIds = this.getNodeParameter('return_ids', i) as string;
							if (rawIds.startsWith('[') && rawIds.endsWith(']')) {
								try {
									returnIds = JSON.parse(rawIds).map((id: any) => Number(id));
								} catch {
									returnIds = rawIds.slice(1, -1).split(',').map((id) => Number(id.trim())).filter((n) => !isNaN(n));
								}
							} else {
								returnIds = rawIds.split(',').map((id) => Number(id.trim())).filter((n) => !isNaN(n));
							}
							statusId = Number(this.getNodeParameter('status_id', i));
						}

						const response = await baselinkerApiRequest.call(this, 'setOrderReturnStatuses', {
							return_ids: returnIds,
							status_id: statusId,
						});
						returnData.push({
							json: response as IDataObject,
							pairedItem: { item: i },
						});
					} else if (operation === 'addOrderReturnStatus') {
						const mode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};

						if (mode === 'json') {
							const rawJson = this.getNodeParameter('parametersJson', i) as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON in Parameters (JSON): ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else if (typeof rawJson === 'object' && rawJson !== null) {
								params = { ...rawJson };
							}
						} else {
							params.name = this.getNodeParameter('name', i) as string;
							const statusId = this.getNodeParameter('status_id', i, undefined);
							if (statusId !== undefined && statusId !== '') params.status_id = Number(statusId);

							const color = this.getNodeParameter('color', i, '') as string;
							if (color) params.color = color;

							const groupId = this.getNodeParameter('group_id', i, undefined);
							if (groupId !== undefined && groupId !== '') params.group_id = Number(groupId);

							const nameForCustomer = this.getNodeParameter('name_for_customer', i, '') as string;
							if (nameForCustomer) params.name_for_customer = nameForCustomer;
						}

						const response = await baselinkerApiRequest.call(this, 'addOrderReturnStatus', params);
						returnData.push({
							json: response as IDataObject,
							pairedItem: { item: i },
						});
					} else if (operation === 'addOrderReturnStatusGroup') {
						const mode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};

						if (mode === 'json') {
							const rawJson = this.getNodeParameter('parametersJson', i) as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON in Parameters (JSON): ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else if (typeof rawJson === 'object' && rawJson !== null) {
								params = { ...rawJson };
							}
						} else {
							params.name = this.getNodeParameter('name', i) as string;
							const groupId = this.getNodeParameter('group_id', i, undefined);
							if (groupId !== undefined && groupId !== '') params.group_id = Number(groupId);
						}

						const response = await baselinkerApiRequest.call(this, 'addOrderReturnStatusGroup', params);
						returnData.push({
							json: response as IDataObject,
							pairedItem: { item: i },
						});
					} else if (operation === 'deleteOrderReturnStatus') {
						const statusId = Number(this.getNodeParameter('status_id', i));
						const targetStatusId = Number(this.getNodeParameter('target_status_id', i));
						if (statusId === targetStatusId) {
							throw new NodeOperationError(
								this.getNode(),
								'Target status ID must be different from status ID to delete',
								{ itemIndex: i },
							);
						}
						const response = await baselinkerApiRequest.call(this, 'deleteOrderReturnStatus', {
							status_id: statusId,
							target_status_id: targetStatusId,
						});
						returnData.push({
							json: response as IDataObject,
							pairedItem: { item: i },
						});
					} else if (operation === 'deleteOrderReturnStatusGroup') {
						const groupId = Number(this.getNodeParameter('group_id', i));
						const response = await baselinkerApiRequest.call(this, 'deleteOrderReturnStatusGroup', {
							group_id: groupId,
						});
						returnData.push({
							json: response as IDataObject,
							pairedItem: { item: i },
						});
					} else if (operation === 'getOrderReturnProductStatuses') {
						const response = await baselinkerApiRequest.call(this, 'getOrderReturnProductStatuses', {});
						const statuses: IBaseLinkerOrderReturnProductStatus[] = response.order_return_product_statuses || [];
						for (const status of statuses) {
							returnData.push({
								json: status as unknown as IDataObject,
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'getOrderReturnReasonsList') {
						const response = await baselinkerApiRequest.call(this, 'getOrderReturnReasonsList', {});
						const reasons: IBaseLinkerOrderReturnReason[] = response.return_reasons || [];
						for (const reason of reasons) {
							returnData.push({
								json: reason as unknown as IDataObject,
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'getOrderReturnPaymentsHistory') {
						const returnId = Number(this.getNodeParameter('return_id', i));
						const showFullHistory = this.getNodeParameter('show_full_history', i, false) as boolean;
						const response = await baselinkerApiRequest.call(this, 'getOrderReturnPaymentsHistory', {
							return_id: returnId,
							show_full_history: showFullHistory,
						});
						const payments: IBaseLinkerOrderReturnPayment[] = response.payments || [];
						for (const payment of payments) {
							returnData.push({
								json: payment as unknown as IDataObject,
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'setOrderReturnRefund') {
						const mode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};

						if (mode === 'json') {
							const rawJson = this.getNodeParameter('parametersJson', i) as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON in Parameters (JSON): ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else if (typeof rawJson === 'object' && rawJson !== null) {
								params = { ...rawJson };
							}
						} else {
							params.return_id = Number(this.getNodeParameter('return_id', i));
							params.order_refund_done = Number(this.getNodeParameter('order_refund_done', i));

							const refundDateRaw = this.getNodeParameter('refund_date', i, undefined);
							const normalizedDate = normalizeTimestamp(refundDateRaw);
							if (normalizedDate !== undefined) params.refund_date = normalizedDate;

							const refundComment = this.getNodeParameter('refund_comment', i, '') as string;
							if (refundComment) params.refund_comment = refundComment;

							const externalRefundId = this.getNodeParameter('external_refund_id', i, '') as string;
							if (externalRefundId) params.external_refund_id = externalRefundId;
						}

						const response = await baselinkerApiRequest.call(this, 'setOrderReturnRefund', params);
						returnData.push({
							json: response as IDataObject,
							pairedItem: { item: i },
						});
					} else if (operation === 'getOrderReturnJournalList') {
						const mode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};

						if (mode === 'json') {
							const rawJson = this.getNodeParameter('parametersJson', i) as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON in Parameters (JSON): ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else if (typeof rawJson === 'object' && rawJson !== null) {
								params = { ...rawJson };
							}
						} else {
							const lastLogId = this.getNodeParameter('last_log_id', i, 0) as number;
							if (lastLogId !== undefined) params.last_log_id = Number(lastLogId);

							const returnId = this.getNodeParameter('return_id', i, undefined);
							if (returnId !== undefined && returnId !== '') params.return_id = Number(returnId);

							const logsTypesRaw = this.getNodeParameter('logs_types', i, '') as string;
							if (logsTypesRaw) {
								if (logsTypesRaw.startsWith('[') && logsTypesRaw.endsWith(']')) {
									try {
										params.logs_types = JSON.parse(logsTypesRaw).map((id: any) => Number(id));
									} catch {
										params.logs_types = logsTypesRaw.slice(1, -1).split(',').map((id) => Number(id.trim())).filter((n) => !isNaN(n));
									}
								} else {
									params.logs_types = logsTypesRaw.split(',').map((id) => Number(id.trim())).filter((n) => !isNaN(n));
								}
							}
						}

						const response = await baselinkerApiRequest.call(this, 'getOrderReturnJournalList', params);
						const logs: IBaseLinkerOrderReturnJournalLog[] = response.logs || [];
						for (const log of logs) {
							returnData.push({
								json: log as unknown as IDataObject,
								pairedItem: { item: i },
							});
						}
					} else if (operation === 'runOrderReturnMacroTrigger') {
						const returnId = Number(this.getNodeParameter('return_id', i));
						const triggerId = Number(this.getNodeParameter('trigger_id', i));
						const response = await baselinkerApiRequest.call(this, 'runOrderReturnMacroTrigger', {
							return_id: returnId,
							trigger_id: triggerId,
						});
						returnData.push({
							json: response as IDataObject,
							pairedItem: { item: i },
						});
					}
				} else if (resource === 'externalStorages') {
					if (operation === 'getExternalStoragesList') {
						const response = await baselinkerApiRequest.call(this, 'getExternalStoragesList', {});
						const storages: IBaseLinkerExternalStorage[] = response.storages || [];
						if (storages.length === 0) {
							returnData.push({
								json: { success: true, storages: [] },
								pairedItem: { item: i },
							});
						} else {
							for (const storage of storages) {
								returnData.push({
									json: storage as unknown as IDataObject,
									pairedItem: { item: i },
								});
							}
						}
					} else if (operation === 'getExternalStorageCategories') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('parametersJson', i) as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for getExternalStorageCategories: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const storageId = this.getNodeParameter('storage_id', i) as string;
							params = { storage_id: storageId };
						}
						const response = await baselinkerApiRequest.call(this, 'getExternalStorageCategories', params);
						const rawCategories = response.categories || [];
						const categories: IBaseLinkerExternalCategory[] = Array.isArray(rawCategories)
							? rawCategories
							: Object.values(rawCategories);
						if (categories.length === 0) {
							returnData.push({
								json: { success: true, storage_id: response.storage_id || params.storage_id, categories: [] },
								pairedItem: { item: i },
							});
						} else {
							for (const category of categories) {
								returnData.push({
									json: {
										storage_id: response.storage_id || params.storage_id,
										...category,
									},
									pairedItem: { item: i },
								});
							}
						}
					} else if (operation === 'getExternalStorageProductsList') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let products: IBaseLinkerExternalProductListItem[] = [];
						let storageId = '';

						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('parametersJson', i) as string | IDataObject;
							let parsedParams: IDataObject = {};
							if (typeof rawJson === 'string') {
								try {
									parsedParams = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for getExternalStorageProductsList: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								parsedParams = rawJson;
							}
							storageId = String(parsedParams.storage_id || '');
							const response = await baselinkerApiRequest.call(this, 'getExternalStorageProductsList', parsedParams);
							const rawProducts = response.products || [];
							products = Array.isArray(rawProducts) ? rawProducts : Object.values(rawProducts);
						} else {
							storageId = this.getNodeParameter('storage_id', i) as string;
							const returnAll = this.getNodeParameter('returnAll', i, false) as boolean;
							const limit = this.getNodeParameter('limit', i, 100) as number;
							const delayMs = this.getNodeParameter('delayMs', i, 650) as number;
							const page = this.getNodeParameter('page', i, 1) as number;
							const filters = this.getNodeParameter('filters', i, {}) as IDataObject;

							const params: IDataObject = {
								storage_id: storageId,
								...filters,
							};

							if (returnAll) {
								products = await baselinkerGetExternalStorageProductsListAll.call(this, params, {
									returnAll: true,
									limit,
									delayMs,
								});
							} else {
								params.page = page;
								const response = await baselinkerApiRequest.call(this, 'getExternalStorageProductsList', params);
								const rawProducts = response.products || [];
								products = Array.isArray(rawProducts) ? rawProducts : Object.values(rawProducts);
								if (limit > 0 && products.length > limit) {
									products = products.slice(0, limit);
								}
							}
						}

						if (products.length === 0) {
							returnData.push({
								json: { success: true, storage_id: storageId, products: [] },
								pairedItem: { item: i },
							});
						} else {
							for (const product of products) {
								returnData.push({
									json: {
										storage_id: storageId,
										...product,
									},
									pairedItem: { item: i },
								});
							}
						}
					} else if (operation === 'getExternalStorageProductsData') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('parametersJson', i) as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for getExternalStorageProductsData: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const storageId = this.getNodeParameter('storage_id', i) as string;
							const productIdsRaw = this.getNodeParameter('productIds', i) as string | number[] | string[];
							let productIds: Array<string | number> = [];
							if (typeof productIdsRaw === 'string') {
								const trimmed = productIdsRaw.trim();
								if (trimmed.startsWith('[')) {
									try {
										productIds = JSON.parse(trimmed);
									} catch {
										productIds = trimmed.split(',').map((id) => id.trim()).filter((id) => id !== '');
									}
								} else {
									productIds = trimmed.split(',').map((id) => id.trim()).filter((id) => id !== '');
								}
							} else if (Array.isArray(productIdsRaw)) {
								productIds = productIdsRaw;
							}
							params = {
								storage_id: storageId,
								products: productIds,
							};
						}

						const response = await baselinkerApiRequest.call(this, 'getExternalStorageProductsData', params);
						const rawProducts = response.products || {};
						const storageId = response.storage_id || params.storage_id;

						if (Array.isArray(rawProducts)) {
							if (rawProducts.length === 0) {
								returnData.push({
									json: { success: true, storage_id: storageId, products: [] },
									pairedItem: { item: i },
								});
							} else {
								for (const prod of rawProducts) {
									returnData.push({
										json: {
											storage_id: storageId,
											...prod,
										},
										pairedItem: { item: i },
									});
								}
							}
						} else if (typeof rawProducts === 'object' && rawProducts !== null) {
							const entries = Object.entries(rawProducts);
							if (entries.length === 0) {
								returnData.push({
									json: { success: true, storage_id: storageId, products: {} },
									pairedItem: { item: i },
								});
							} else {
								for (const [key, val] of entries) {
									const prodData = typeof val === 'object' && val !== null ? val : { value: val };
									returnData.push({
										json: {
											storage_id: storageId,
											product_id: key,
											...prodData,
										},
										pairedItem: { item: i },
									});
								}
							}
						}
					} else if (operation === 'getExternalStorageProductsQuantity') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let products: IBaseLinkerExternalProductQuantityItem[] = [];
						let storageId = '';

						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('parametersJson', i) as string | IDataObject;
							let parsedParams: IDataObject = {};
							if (typeof rawJson === 'string') {
								try {
									parsedParams = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for getExternalStorageProductsQuantity: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								parsedParams = rawJson;
							}
							storageId = String(parsedParams.storage_id || '');
							const response = await baselinkerApiRequest.call(this, 'getExternalStorageProductsQuantity', parsedParams);
							const rawProducts = response.products || [];
							products = Array.isArray(rawProducts) ? rawProducts : Object.values(rawProducts);
						} else {
							storageId = this.getNodeParameter('storage_id', i) as string;
							const returnAll = this.getNodeParameter('returnAll', i, false) as boolean;
							const limit = this.getNodeParameter('limit', i, 100) as number;
							const delayMs = this.getNodeParameter('delayMs', i, 650) as number;
							const page = this.getNodeParameter('page', i, 1) as number;

							const params: IDataObject = {
								storage_id: storageId,
							};

							if (returnAll) {
								products = await baselinkerGetExternalStorageProductsQuantityAll.call(this, params, {
									returnAll: true,
									limit,
									delayMs,
								});
							} else {
								params.page = page;
								const response = await baselinkerApiRequest.call(this, 'getExternalStorageProductsQuantity', params);
								const rawProducts = response.products || [];
								products = Array.isArray(rawProducts) ? rawProducts : Object.values(rawProducts);
								if (limit > 0 && products.length > limit) {
									products = products.slice(0, limit);
								}
							}
						}

						if (products.length === 0) {
							returnData.push({
								json: { success: true, storage_id: storageId, products: [] },
								pairedItem: { item: i },
							});
						} else {
							for (const product of products) {
								returnData.push({
									json: {
										storage_id: storageId,
										...product,
									},
									pairedItem: { item: i },
								});
							}
						}
					} else if (operation === 'getExternalStorageProductsPrices') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let products: IBaseLinkerExternalProductPriceItem[] = [];
						let storageId = '';

						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('parametersJson', i) as string | IDataObject;
							let parsedParams: IDataObject = {};
							if (typeof rawJson === 'string') {
								try {
									parsedParams = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for getExternalStorageProductsPrices: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								parsedParams = rawJson;
							}
							storageId = String(parsedParams.storage_id || '');
							const response = await baselinkerApiRequest.call(this, 'getExternalStorageProductsPrices', parsedParams);
							const rawProducts = response.products || [];
							products = Array.isArray(rawProducts) ? rawProducts : Object.values(rawProducts);
						} else {
							storageId = this.getNodeParameter('storage_id', i) as string;
							const returnAll = this.getNodeParameter('returnAll', i, false) as boolean;
							const limit = this.getNodeParameter('limit', i, 100) as number;
							const delayMs = this.getNodeParameter('delayMs', i, 650) as number;
							const page = this.getNodeParameter('page', i, 1) as number;

							const params: IDataObject = {
								storage_id: storageId,
							};

							if (returnAll) {
								products = await baselinkerGetExternalStorageProductsPricesAll.call(this, params, {
									returnAll: true,
									limit,
									delayMs,
								});
							} else {
								params.page = page;
								const response = await baselinkerApiRequest.call(this, 'getExternalStorageProductsPrices', params);
								const rawProducts = response.products || [];
								products = Array.isArray(rawProducts) ? rawProducts : Object.values(rawProducts);
								if (limit > 0 && products.length > limit) {
									products = products.slice(0, limit);
								}
							}
						}

						if (products.length === 0) {
							returnData.push({
								json: { success: true, storage_id: storageId, products: [] },
								pairedItem: { item: i },
							});
						} else {
							for (const product of products) {
								returnData.push({
									json: {
										storage_id: storageId,
										...product,
									},
									pairedItem: { item: i },
								});
							}
						}
					} else if (operation === 'updateExternalStorageProductsQuantity') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};

						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('parametersJson', i) as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for updateExternalStorageProductsQuantity: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const storageId = this.getNodeParameter('storage_id', i) as string;
							const stockUpdateMode = this.getNodeParameter('stockUpdateMode', i, 'single') as string;

							if (stockUpdateMode === 'single') {
								const productId = this.getNodeParameter('product_id', i) as string | number;
								const variantIdRaw = this.getNodeParameter('variant_id', i, 0) as string | number;
								const variantId = variantIdRaw === '' ? 0 : isNaN(Number(variantIdRaw)) ? variantIdRaw : Number(variantIdRaw);
								const quantity = Number(this.getNodeParameter('quantity', i, 0));

								params = {
									storage_id: storageId,
									products: [
										[productId, variantId, quantity],
									],
								};
							} else if (stockUpdateMode === 'multipleUi') {
								const productsUi = this.getNodeParameter('productsUi.values', i, []) as Array<{
									product_id: string | number;
									variant_id?: string | number;
									quantity: number;
								}>;

								const productsList: Array<[string | number, string | number, number]> = productsUi.map((p) => {
									const vId = p.variant_id === undefined || p.variant_id === '' ? 0 : isNaN(Number(p.variant_id)) ? p.variant_id : Number(p.variant_id);
									return [p.product_id, vId, Number(p.quantity || 0)];
								});

								params = {
									storage_id: storageId,
									products: productsList,
								};
							} else {
								const rawProducts = this.getNodeParameter('productsJson', i) as string | Array<[string | number, string | number, number]>;
								let parsedProducts: any[] = [];
								if (typeof rawProducts === 'string') {
									try {
										parsedProducts = JSON.parse(rawProducts);
									} catch (jsonErr: any) {
										throw new NodeOperationError(
											this.getNode(),
											`Invalid JSON provided for productsJson: ${jsonErr.message}`,
											{ itemIndex: i },
										);
									}
								} else {
									parsedProducts = rawProducts;
								}

								params = {
									storage_id: storageId,
									products: parsedProducts,
								};
							}
						}

						const response = await baselinkerApiRequest.call(this, 'updateExternalStorageProductsQuantity', params);
						returnData.push({
							json: {
								success: true,
								storage_id: params.storage_id,
								...response,
							},
							pairedItem: { item: i },
						});
					}
				} else if (resource === 'baseConnect') {
					if (operation === 'getConnectIntegrations') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};
						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('parametersJson', i) as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for getConnectIntegrations: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						}

						const response = await baselinkerApiRequest.call(this, 'getConnectIntegrations', params);
						const format = parameterMode === 'json' ? 'raw' : (this.getNodeParameter('integrationsOutputFormat', i, 'unpacked') as string);
						const ownIntegrations: IBaseLinkerConnectIntegration[] = response.integrations?.own_integrations || [];
						const connectedIntegrations: IBaseLinkerConnectIntegration[] = response.integrations?.connected_integrations || [];

						if (format === 'raw') {
							returnData.push({
								json: (response.integrations || { own_integrations: ownIntegrations, connected_integrations: connectedIntegrations }) as IDataObject,
								pairedItem: { item: i },
							});
						} else {
							const allIntegrations: IBaseLinkerConnectIntegration[] = [
								...ownIntegrations.map((item) => ({ ...item, integration_type: 'own' as const })),
								...connectedIntegrations.map((item) => ({ ...item, integration_type: 'connected' as const })),
							];

							if (allIntegrations.length === 0) {
								returnData.push({
									json: { success: true, integrations: [] },
									pairedItem: { item: i },
								});
							} else {
								for (const item of allIntegrations) {
									returnData.push({
										json: item as unknown as IDataObject,
										pairedItem: { item: i },
									});
								}
							}
						}
					} else if (operation === 'getConnectIntegrationContractors') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};

						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('parametersJson', i) as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for getConnectIntegrationContractors: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const integrationId = Number(this.getNodeParameter('connect_integration_id', i));
							params = { connect_integration_id: integrationId };
						}

						const response = await baselinkerApiRequest.call(this, 'getConnectIntegrationContractors', params);
						const rawContractors = response.contractors || {};
						const contractors: IBaseLinkerConnectContractor[] = Array.isArray(rawContractors)
							? rawContractors
							: Object.values(rawContractors);

						if (contractors.length === 0) {
							returnData.push({
								json: { success: true, connect_integration_id: params.connect_integration_id, contractors: [] },
								pairedItem: { item: i },
							});
						} else {
							for (const contractor of contractors) {
								returnData.push({
									json: {
										connect_integration_id: params.connect_integration_id,
										...contractor,
									},
									pairedItem: { item: i },
								});
							}
						}
					} else if (operation === 'getConnectContractorCreditHistory') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};

						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('parametersJson', i) as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for getConnectContractorCreditHistory: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const contractorId = Number(this.getNodeParameter('connect_contractor_id', i));
							params = { connect_contractor_id: contractorId };
						}

						const response = await baselinkerApiRequest.call(this, 'getConnectContractorCreditHistory', params);
						const creditEntries: IBaseLinkerConnectCreditEntry[] = response.credit_data || [];

						if (creditEntries.length === 0) {
							returnData.push({
								json: { success: true, connect_contractor_id: params.connect_contractor_id, credit_data: [] },
								pairedItem: { item: i },
							});
						} else {
							for (const entry of creditEntries) {
								returnData.push({
									json: {
										connect_contractor_id: params.connect_contractor_id,
										...entry,
									},
									pairedItem: { item: i },
								});
							}
						}
					} else if (operation === 'addConnectContractorCreditSettlement') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};

						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('parametersJson', i) as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for addConnectContractorCreditSettlement: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const contractorId = Number(this.getNodeParameter('connect_contractor_id', i));
							const amount = Number(this.getNodeParameter('amount', i));
							const message = this.getNodeParameter('message', i, '') as string;
							const orderId = Number(this.getNodeParameter('order_id', i, 0));

							params = {
								connect_contractor_id: contractorId,
								amount,
							};
							if (message) {
								params.message = message;
							}
							if (orderId && orderId > 0) {
								params.order_id = orderId;
							}
						}

						const response = await baselinkerApiRequest.call(this, 'addConnectContractorCreditSettlement', params);
						returnData.push({
							json: {
								success: true,
								connect_contractor_id: params.connect_contractor_id,
								...response,
							},
							pairedItem: { item: i },
						});
					} else if (operation === 'setConnectContractorCreditLimit') {
						const parameterMode = this.getNodeParameter('parameterMode', i, 'fields') as string;
						let params: IDataObject = {};

						if (parameterMode === 'json') {
							const rawJson = this.getNodeParameter('parametersJson', i) as string | IDataObject;
							if (typeof rawJson === 'string') {
								try {
									params = JSON.parse(rawJson);
								} catch (jsonErr: any) {
									throw new NodeOperationError(
										this.getNode(),
										`Invalid JSON provided for setConnectContractorCreditLimit: ${jsonErr.message}`,
										{ itemIndex: i },
									);
								}
							} else {
								params = rawJson;
							}
						} else {
							const contractorId = Number(this.getNodeParameter('connect_contractor_id', i));
							const newLimit = Number(this.getNodeParameter('new_limit', i));
							const message = this.getNodeParameter('message', i, '') as string;

							params = {
								connect_contractor_id: contractorId,
								new_limit: newLimit,
							};
							if (message) {
								params.message = message;
							}
						}

						const response = await baselinkerApiRequest.call(this, 'setConnectContractorCreditLimit', params);
						returnData.push({
							json: {
								success: true,
								connect_contractor_id: params.connect_contractor_id,
								...response,
							},
							pairedItem: { item: i },
						});
					}
				}
			} catch (error: any) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error.message || error,
						},
						pairedItem: { item: i },
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
