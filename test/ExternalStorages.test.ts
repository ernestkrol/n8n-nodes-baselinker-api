import { describe, it } from 'node:test';
import assert from 'node:assert';
import { BaseLinker } from '../nodes/BaseLinker/BaseLinker.node';

function createMockContext(options: {
	resource: string;
	operation: string;
	params?: Record<string, any>;
	mockResponse?: any;
	mockResponses?: any[];
}) {
	const capturedCalls: Array<{ method: string; parameters: any }> = [];
	let responseIndex = 0;

	const context = {
		getNode: () => ({ name: 'baseLinkerMock' }),
		getCredentials: async () => ({ token: 'mock-token' }),
		getInputData: () => [{ json: {} }],
		continueOnFail: () => false,
		getNodeParameter: (paramName: string, _index?: number, defaultValue?: any) => {
			if (paramName === 'resource') return options.resource;
			if (paramName === 'operation') return options.operation;
			if (options.params && options.params[paramName] !== undefined) {
				return options.params[paramName];
			}
			return defaultValue;
		},
		helpers: {
			httpRequest: async (reqOptions: any) => {
				const bodyStr = reqOptions.body.toString();
				const params = new URLSearchParams(bodyStr);
				const method = params.get('method') || '';
				const parameters = JSON.parse(params.get('parameters') || '{}');

				capturedCalls.push({ method, parameters });

				if (options.mockResponses && options.mockResponses.length > 0) {
					const resp = options.mockResponses[responseIndex];
					responseIndex++;
					return resp;
				}

				return options.mockResponse;
			},
		},
	};

	return { context: context as any, capturedCalls };
}

describe('External Storages operations', () => {
	const node = new BaseLinker();

	// 1. getExternalStoragesList
	it('should execute getExternalStoragesList and unpack storages', async () => {
		const mockStorages = [
			{
				storage_id: 'shop_2444',
				name: 'Online store',
				methods: ['getExternalStorageCategories', 'getExternalStorageProductsList'],
				read: true,
				write: false,
			},
			{
				storage_id: 'warehouse_1334',
				name: 'Wholesaler',
				methods: ['getExternalStorageCategories'],
				read: true,
				write: false,
			},
		];

		const { context, capturedCalls } = createMockContext({
			resource: 'externalStorages',
			operation: 'getExternalStoragesList',
			mockResponse: { status: 'SUCCESS', storages: mockStorages },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 2);
		assert.strictEqual(result[0][0].json.storage_id, 'shop_2444');
		assert.strictEqual(result[0][0].json.name, 'Online store');
		assert.strictEqual(result[0][1].json.storage_id, 'warehouse_1334');
		assert.strictEqual(capturedCalls[0].method, 'getExternalStoragesList');
		assert.deepStrictEqual(capturedCalls[0].parameters, {});
	});

	it('should handle empty getExternalStoragesList response', async () => {
		const { context } = createMockContext({
			resource: 'externalStorages',
			operation: 'getExternalStoragesList',
			mockResponse: { status: 'SUCCESS', storages: [] },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(result[0].length, 1);
		assert.deepStrictEqual(result[0][0].json, { success: true, storages: [] });
	});

	it('should load dynamic dropdown options for getExternalStorages', async () => {
		const mockStorages = [
			{
				storage_id: 'shop_100',
				name: 'Main PrestaShop',
				methods: ['getExternalStorageCategories'],
				read: true,
				write: true,
			},
		];

		const { context } = createMockContext({
			resource: 'externalStorages',
			operation: 'getExternalStoragesList',
			mockResponse: { status: 'SUCCESS', storages: mockStorages },
		});

		const loadOptions = node.methods.loadOptions.getExternalStorages;
		const options = await loadOptions.call(context);

		assert.strictEqual(options.length, 1);
		assert.strictEqual(options[0].value, 'shop_100');
		assert.strictEqual(options[0].name, 'Main PrestaShop (shop_100)');
	});

	// 2. getExternalStorageCategories
	it('should execute getExternalStorageCategories in UI fields mode', async () => {
		const mockCategories = [
			{ category_id: 235, name: 'Shoes', parent_id: 0 },
			{ category_id: 654, name: 'Winter shoes', parent_id: 235 },
		];

		const { context, capturedCalls } = createMockContext({
			resource: 'externalStorages',
			operation: 'getExternalStorageCategories',
			params: {
				parameterMode: 'fields',
				storage_id: 'shop_2445',
			},
			mockResponse: {
				status: 'SUCCESS',
				storage_id: 'shop_2445',
				categories: mockCategories,
			},
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 2);
		assert.strictEqual(result[0][0].json.category_id, 235);
		assert.strictEqual(result[0][0].json.storage_id, 'shop_2445');
		assert.strictEqual(result[0][1].json.name, 'Winter shoes');
		assert.strictEqual(capturedCalls[0].method, 'getExternalStorageCategories');
		assert.strictEqual(capturedCalls[0].parameters.storage_id, 'shop_2445');
	});

	it('should execute getExternalStorageCategories in JSON mode', async () => {
		const mockCategories = [{ category_id: 10, name: 'Electronics', parent_id: 0 }];

		const { context, capturedCalls } = createMockContext({
			resource: 'externalStorages',
			operation: 'getExternalStorageCategories',
			params: {
				parameterMode: 'json',
				parametersJson: JSON.stringify({ storage_id: 'warehouse_999' }),
			},
			mockResponse: {
				status: 'SUCCESS',
				storage_id: 'warehouse_999',
				categories: mockCategories,
			},
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.category_id, 10);
		assert.strictEqual(capturedCalls[0].parameters.storage_id, 'warehouse_999');
	});

	it('should throw error on invalid JSON in getExternalStorageCategories', async () => {
		const { context } = createMockContext({
			resource: 'externalStorages',
			operation: 'getExternalStorageCategories',
			params: {
				parameterMode: 'json',
				parametersJson: '{ invalid_json ',
			},
		});

		await assert.rejects(async () => {
			await node.execute.call(context);
		}, /Invalid JSON provided for getExternalStorageCategories/);
	});

	it('should load dynamic dropdown options for getExternalStorageCategories', async () => {
		const mockCategories = [
			{ category_id: 543, name: 'T-Shirts', parent_id: 0 },
		];

		const { context } = createMockContext({
			resource: 'externalStorages',
			operation: 'getExternalStorageCategories',
			params: {
				storage_id: 'shop_123',
			},
			mockResponse: { status: 'SUCCESS', storage_id: 'shop_123', categories: mockCategories },
		});

		const loadOptions = node.methods.loadOptions.getExternalStorageCategories;
		const options = await loadOptions.call(context);

		assert.strictEqual(options.length, 1);
		assert.strictEqual(options[0].value, 543);
		assert.strictEqual(options[0].name, 'T-Shirts (ID: 543)');
	});

	// 3. getExternalStorageProductsList
	it('should execute getExternalStorageProductsList in UI fields mode with filters', async () => {
		const mockProducts = [
			{
				product_id: '2546',
				sku: 'PL53F',
				ean: '63576363463',
				asin: 'B07EXAMPLE3',
				name: 'Nike PL35 shoes',
				quantity: 5,
				price_brutto: 254.55,
			},
		];

		const { context, capturedCalls } = createMockContext({
			resource: 'externalStorages',
			operation: 'getExternalStorageProductsList',
			params: {
				parameterMode: 'fields',
				storage_id: 'shop_2445',
				returnAll: false,
				limit: 50,
				page: 2,
				filters: {
					filter_category_id: 543,
					filter_sort: 'price ASC',
					filter_name: 'Nike',
				},
			},
			mockResponse: {
				status: 'SUCCESS',
				storage_id: 'shop_2445',
				products: mockProducts,
			},
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.product_id, '2546');
		assert.strictEqual(result[0][0].json.storage_id, 'shop_2445');
		assert.strictEqual(capturedCalls[0].method, 'getExternalStorageProductsList');
		assert.strictEqual(capturedCalls[0].parameters.storage_id, 'shop_2445');
		assert.strictEqual(capturedCalls[0].parameters.filter_category_id, 543);
		assert.strictEqual(capturedCalls[0].parameters.filter_sort, 'price ASC');
		assert.strictEqual(capturedCalls[0].parameters.filter_name, 'Nike');
		assert.strictEqual(capturedCalls[0].parameters.page, 2);
	});

	it('should paginate getExternalStorageProductsList when returnAll is true', async () => {
		const page1Products = [{ product_id: '1', name: 'Item 1' }];
		const page2Products = [{ product_id: '2', name: 'Item 2' }];

		const { context, capturedCalls } = createMockContext({
			resource: 'externalStorages',
			operation: 'getExternalStorageProductsList',
			params: {
				parameterMode: 'fields',
				storage_id: 'shop_2445',
				returnAll: true,
				limit: 2,
				delayMs: 0,
			},
			mockResponses: [
				{ status: 'SUCCESS', storage_id: 'shop_2445', products: page1Products },
				{ status: 'SUCCESS', storage_id: 'shop_2445', products: page2Products },
			],
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 2);
		assert.strictEqual(result[0][0].json.product_id, '1');
		assert.strictEqual(result[0][1].json.product_id, '2');
		assert.strictEqual(capturedCalls.length, 2);
		assert.strictEqual(capturedCalls[0].parameters.page, 1);
		assert.strictEqual(capturedCalls[1].parameters.page, 2);
	});

	it('should execute getExternalStorageProductsList in JSON mode', async () => {
		const mockProducts = [{ product_id: '888', name: 'Raw product' }];

		const { context, capturedCalls } = createMockContext({
			resource: 'externalStorages',
			operation: 'getExternalStorageProductsList',
			params: {
				parameterMode: 'json',
				parametersJson: JSON.stringify({ storage_id: 'shop_555', page: 3 }),
			},
			mockResponse: { status: 'SUCCESS', storage_id: 'shop_555', products: mockProducts },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.product_id, '888');
		assert.strictEqual(capturedCalls[0].parameters.page, 3);
	});

	// 4. getExternalStorageProductsData
	it('should execute getExternalStorageProductsData in UI fields mode with dictionary response', async () => {
		const mockProductDict = {
			'524': {
				product_id: '524',
				name: 'Adidas SG53 shoes',
				quantity: '0',
				price_brutto: '1110.05',
				features: { Material: 'Poliester' },
			},
			'734': {
				product_id: '734',
				name: 'Nike M34 shoes',
				quantity: 2,
				price_brutto: 503.05,
			},
		};

		const { context, capturedCalls } = createMockContext({
			resource: 'externalStorages',
			operation: 'getExternalStorageProductsData',
			params: {
				parameterMode: 'fields',
				storage_id: 'shop_2445',
				productIds: '524, 734',
			},
			mockResponse: {
				status: 'SUCCESS',
				storage_id: 'shop_2445',
				products: mockProductDict,
			},
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 2);
		assert.strictEqual(result[0][0].json.product_id, '524');
		assert.strictEqual(result[0][0].json.name, 'Adidas SG53 shoes');
		assert.strictEqual(result[0][1].json.product_id, '734');
		assert.strictEqual(capturedCalls[0].method, 'getExternalStorageProductsData');
		assert.deepStrictEqual(capturedCalls[0].parameters.products, ['524', '734']);
	});

	it('should execute getExternalStorageProductsData in JSON mode with array response', async () => {
		const mockProductList = [
			{ product_id: '999', name: 'Array product', price_brutto: 19.99 },
		];

		const { context, capturedCalls } = createMockContext({
			resource: 'externalStorages',
			operation: 'getExternalStorageProductsData',
			params: {
				parameterMode: 'json',
				parametersJson: JSON.stringify({ storage_id: 'shop_1', products: [999] }),
			},
			mockResponse: {
				status: 'SUCCESS',
				storage_id: 'shop_1',
				products: mockProductList,
			},
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.product_id, '999');
		assert.deepStrictEqual(capturedCalls[0].parameters.products, [999]);
	});

	// 5. getExternalStorageProductsQuantity
	it('should execute getExternalStorageProductsQuantity in UI fields mode', async () => {
		const mockQuantities = [
			{
				product_id: '2546',
				quantity: 30,
				variants: [{ variant_id: '7231', quantity: 14 }],
			},
		];

		const { context, capturedCalls } = createMockContext({
			resource: 'externalStorages',
			operation: 'getExternalStorageProductsQuantity',
			params: {
				parameterMode: 'fields',
				storage_id: 'shop_2445',
				returnAll: false,
				page: 1,
			},
			mockResponse: {
				status: 'SUCCESS',
				storage_id: 'shop_2445',
				products: mockQuantities,
			},
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.product_id, '2546');
		assert.strictEqual(result[0][0].json.quantity, 30);
		assert.strictEqual(capturedCalls[0].method, 'getExternalStorageProductsQuantity');
		assert.strictEqual(capturedCalls[0].parameters.storage_id, 'shop_2445');
	});

	it('should paginate getExternalStorageProductsQuantity when returnAll is true', async () => {
		const page1 = [{ product_id: '10', quantity: 5 }];
		const page2 = [{ product_id: '20', quantity: 12 }];

		const { context, capturedCalls } = createMockContext({
			resource: 'externalStorages',
			operation: 'getExternalStorageProductsQuantity',
			params: {
				parameterMode: 'fields',
				storage_id: 'shop_2445',
				returnAll: true,
				limit: 2,
				delayMs: 0,
			},
			mockResponses: [
				{ status: 'SUCCESS', storage_id: 'shop_2445', products: page1 },
				{ status: 'SUCCESS', storage_id: 'shop_2445', products: page2 },
			],
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 2);
		assert.strictEqual(capturedCalls.length, 2);
	});

	// 6. getExternalStorageProductsPrices
	it('should execute getExternalStorageProductsPrices in UI fields mode', async () => {
		const mockPrices = [
			{
				product_id: '2546',
				price: 199.9,
				variants: [{ variant_id: '7231', price: 189.9 }],
			},
		];

		const { context, capturedCalls } = createMockContext({
			resource: 'externalStorages',
			operation: 'getExternalStorageProductsPrices',
			params: {
				parameterMode: 'fields',
				storage_id: 'shop_2445',
				returnAll: false,
				page: 1,
			},
			mockResponse: {
				status: 'SUCCESS',
				storage_id: 'shop_2445',
				products: mockPrices,
			},
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.product_id, '2546');
		assert.strictEqual(result[0][0].json.price, 199.9);
		assert.strictEqual(capturedCalls[0].method, 'getExternalStorageProductsPrices');
		assert.strictEqual(capturedCalls[0].parameters.storage_id, 'shop_2445');
	});

	it('should paginate getExternalStorageProductsPrices when returnAll is true', async () => {
		const page1 = [{ product_id: '10', price: 50.0 }];
		const page2 = [{ product_id: '20', price: 75.5 }];

		const { context, capturedCalls } = createMockContext({
			resource: 'externalStorages',
			operation: 'getExternalStorageProductsPrices',
			params: {
				parameterMode: 'fields',
				storage_id: 'shop_2445',
				returnAll: true,
				limit: 2,
				delayMs: 0,
			},
			mockResponses: [
				{ status: 'SUCCESS', storage_id: 'shop_2445', products: page1 },
				{ status: 'SUCCESS', storage_id: 'shop_2445', products: page2 },
			],
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 2);
		assert.strictEqual(capturedCalls.length, 2);
	});

	// 7. updateExternalStorageProductsQuantity
	it('should execute updateExternalStorageProductsQuantity in single product mode', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'externalStorages',
			operation: 'updateExternalStorageProductsQuantity',
			params: {
				parameterMode: 'fields',
				storage_id: 'shop_2445',
				stockUpdateMode: 'single',
				product_id: '1081730',
				variant_id: '0',
				quantity: 100,
			},
			mockResponse: {
				status: 'SUCCESS',
				counter: 1,
				warnings: '',
			},
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.success, true);
		assert.strictEqual(result[0][0].json.counter, 1);
		assert.strictEqual(capturedCalls[0].method, 'updateExternalStorageProductsQuantity');
		assert.strictEqual(capturedCalls[0].parameters.storage_id, 'shop_2445');
		assert.deepStrictEqual(capturedCalls[0].parameters.products, [['1081730', 0, 100]]);
	});

	it('should execute updateExternalStorageProductsQuantity in multipleUi mode', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'externalStorages',
			operation: 'updateExternalStorageProductsQuantity',
			params: {
				parameterMode: 'fields',
				storage_id: 'shop_2445',
				stockUpdateMode: 'multipleUi',
				'productsUi.values': [
					{ product_id: '1081730', variant_id: '0', quantity: 100 },
					{ product_id: '1081730', variant_id: '1734642', quantity: 150 },
				],
			},
			mockResponse: {
				status: 'SUCCESS',
				counter: 2,
				warnings: '',
			},
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0][0].json.counter, 2);
		assert.deepStrictEqual(capturedCalls[0].parameters.products, [
			['1081730', 0, 100],
			['1081730', 1734642, 150],
		]);
	});

	it('should execute updateExternalStorageProductsQuantity in multipleJson mode', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'externalStorages',
			operation: 'updateExternalStorageProductsQuantity',
			params: {
				parameterMode: 'fields',
				storage_id: 'shop_2445',
				stockUpdateMode: 'multipleJson',
				productsJson: JSON.stringify([
					['1081730', 0, 100],
					['1081730', 1734642, 150],
				]),
			},
			mockResponse: {
				status: 'SUCCESS',
				counter: 2,
				warnings: '',
			},
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0][0].json.counter, 2);
		assert.deepStrictEqual(capturedCalls[0].parameters.products, [
			['1081730', 0, 100],
			['1081730', 1734642, 150],
		]);
	});

	it('should execute updateExternalStorageProductsQuantity in raw JSON mode', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'externalStorages',
			operation: 'updateExternalStorageProductsQuantity',
			params: {
				parameterMode: 'json',
				parametersJson: JSON.stringify({
					storage_id: 'shop_2445',
					products: [[1081730, 0, 100]],
				}),
			},
			mockResponse: {
				status: 'SUCCESS',
				counter: 1,
				warnings: '',
			},
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0][0].json.counter, 1);
		assert.strictEqual(capturedCalls[0].parameters.storage_id, 'shop_2445');
		assert.deepStrictEqual(capturedCalls[0].parameters.products, [[1081730, 0, 100]]);
	});
});
