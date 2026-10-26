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
			prepareBinaryData: async (buffer: any, filename: string) => ({
				data: buffer.toString('base64'),
				fileName: filename,
				fileSize: `${buffer.length} B`,
				mimeType: 'application/pdf',
			}),
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

describe('Product Catalog operations', () => {
	const node = new BaseLinker();

	// ----------------------------------
	// getInventories
	// ----------------------------------
	it('should execute getInventories', async () => {
		const mockInventories = [
			{
				inventory_id: 307,
				name: 'Main Catalog',
				description: 'Primary product catalog',
				languages: ['pl', 'en'],
				default_language: 'pl',
				price_groups: [105],
				default_price_group: 105,
				warehouses: ['bl_205'],
				default_warehouse: 'bl_205',
				reservations: true,
				is_default: true,
			},
		];

		const { context, capturedCalls } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventories',
			mockResponse: { status: 'SUCCESS', inventories: mockInventories },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.inventory_id, 307);
		assert.strictEqual(result[0][0].json.name, 'Main Catalog');
		assert.strictEqual(capturedCalls[0].method, 'getInventories');
		assert.deepStrictEqual(capturedCalls[0].parameters, {});
	});

	// ----------------------------------
	// getInventoryWarehouses
	// ----------------------------------
	it('should execute getInventoryWarehouses', async () => {
		const mockWarehouses = [
			{
				warehouse_type: 'bl',
				warehouse_id: 205,
				internal_warehouse_id: 205,
				name: 'Main Warehouse',
				description: 'Central facility',
				stock_edition: true,
				is_default: true,
				address: 'Main Street 1',
				postcode: '00-001',
				city: 'Warsaw',
				country: 'PL',
			},
		];

		const { context, capturedCalls } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryWarehouses',
			mockResponse: { status: 'SUCCESS', warehouses: mockWarehouses },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.warehouse_id, 205);
		assert.strictEqual(result[0][0].json.warehouse_type, 'bl');
		assert.strictEqual(capturedCalls[0].method, 'getInventoryWarehouses');
		assert.deepStrictEqual(capturedCalls[0].parameters, {});
	});

	// ----------------------------------
	// getInventoryProductsList
	// ----------------------------------
	it('should execute getInventoryProductsList in UI fields mode', async () => {
		const mockProducts = {
			'2685': {
				id: 2685,
				parent_id: 0,
				ean: '5901234567890',
				sku: 'TSHIRT-BLK-M',
				name: 'Black T-Shirt M',
				prices: { '105': 49.99 },
				stock: { bl_205: 12 },
			},
		};

		const { context, capturedCalls } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryProductsList',
			params: {
				parameterMode: 'fields',
				inventory_id: 307,
				returnAll: false,
				page: 1,
				limit: 50,
				filters: {
					filter_sku: 'TSHIRT',
					include_variants: true,
				},
			},
			mockResponse: { status: 'SUCCESS', products: mockProducts },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.id, 2685);
		assert.strictEqual(result[0][0].json.sku, 'TSHIRT-BLK-M');
		assert.strictEqual(capturedCalls[0].method, 'getInventoryProductsList');
		assert.strictEqual(capturedCalls[0].parameters.inventory_id, 307);
		assert.strictEqual(capturedCalls[0].parameters.filter_sku, 'TSHIRT');
		assert.strictEqual(capturedCalls[0].parameters.include_variants, true);
		assert.strictEqual(capturedCalls[0].parameters.page, 1);
	});

	it('should execute getInventoryProductsList in JSON mode', async () => {
		const mockProducts = {
			'101': {
				id: 101,
				name: 'Raw Product',
			},
		};

		const { context, capturedCalls } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryProductsList',
			params: {
				parameterMode: 'json',
				parametersJson: JSON.stringify({ inventory_id: 307, filter_category_id: 12 }),
			},
			mockResponse: { status: 'SUCCESS', products: mockProducts },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.id, 101);
		assert.strictEqual(capturedCalls[0].parameters.inventory_id, 307);
		assert.strictEqual(capturedCalls[0].parameters.filter_category_id, 12);
	});

	it('should paginate getInventoryProductsList when returnAll is true', async () => {
		const page1Products: Record<string, any> = {};
		for (let i = 0; i < 1000; i++) {
			page1Products[`${i + 1}`] = { id: i + 1, name: `Product ${i + 1}` };
		}
		const page2Products: Record<string, any> = {
			'1001': { id: 1001, name: 'Product 1001' },
		};

		const { context, capturedCalls } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryProductsList',
			params: {
				parameterMode: 'fields',
				inventory_id: 307,
				returnAll: true,
				limit: 1500,
				delayMs: 0,
				filters: {},
			},
			mockResponses: [
				{ status: 'SUCCESS', products: page1Products },
				{ status: 'SUCCESS', products: page2Products },
			],
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 1001);
		assert.strictEqual(capturedCalls.length, 2);
		assert.strictEqual(capturedCalls[0].parameters.page, 1);
		assert.strictEqual(capturedCalls[1].parameters.page, 2);
	});

	// ----------------------------------
	// getInventoryProductsData
	// ----------------------------------
	it('should execute getInventoryProductsData in UI fields mode', async () => {
		const mockProductData = {
			'2685': {
				id: 2685,
				is_bundle: false,
				sku: 'TSHIRT-BLK-M',
				ean: '5901234567890',
				tax_rate: 23,
				weight: 0.2,
				height: 1,
				width: 20,
				length: 30,
				category_id: 5,
				prices: { '105': 49.99 },
				stock: { bl_205: 12 },
				text_fields: { name: 'Black T-Shirt M' },
			},
		};

		const { context, capturedCalls } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryProductsData',
			params: {
				parameterMode: 'fields',
				inventory_id: 307,
				products: '2685, 2686',
				additionalOptions: {
					include_relations: true,
					include_suppliers: true,
				},
			},
			mockResponse: { status: 'SUCCESS', products: mockProductData },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.id, 2685);
		assert.strictEqual(result[0][0].json.sku, 'TSHIRT-BLK-M');
		assert.strictEqual(capturedCalls[0].method, 'getInventoryProductsData');
		assert.strictEqual(capturedCalls[0].parameters.inventory_id, 307);
		assert.deepStrictEqual(capturedCalls[0].parameters.products, [2685, 2686]);
		assert.strictEqual(capturedCalls[0].parameters.include_relations, true);
		assert.strictEqual(capturedCalls[0].parameters.include_suppliers, true);
	});

	it('should execute getInventoryProductsData in JSON mode', async () => {
		const mockProductData = {
			'500': {
				sku: 'TEST-SKU',
			},
		};

		const { context, capturedCalls } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryProductsData',
			params: {
				parameterMode: 'json',
				parametersJson: JSON.stringify({ inventory_id: 307, products: [500] }),
			},
			mockResponse: { status: 'SUCCESS', products: mockProductData },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.id, 500);
		assert.strictEqual(result[0][0].json.sku, 'TEST-SKU');
		assert.deepStrictEqual(capturedCalls[0].parameters.products, [500]);
	});

	// ----------------------------------
	// getInventoryProductsStock
	// ----------------------------------
	it('should execute getInventoryProductsStock in UI fields mode', async () => {
		const mockStock = {
			'2685': {
				product_id: 2685,
				stock: { bl_205: 15 },
				reservations: { bl_205: 2 },
			},
		};

		const { context, capturedCalls } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryProductsStock',
			params: {
				parameterMode: 'fields',
				inventory_id: 307,
				returnAll: false,
				page: 1,
				limit: 100,
				filters: {
					filter_stock_from: 10,
				},
			},
			mockResponse: { status: 'SUCCESS', products: mockStock },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.product_id, 2685);
		assert.strictEqual((result[0][0].json.stock as any).bl_205, 15);
		assert.strictEqual(capturedCalls[0].method, 'getInventoryProductsStock');
		assert.strictEqual(capturedCalls[0].parameters.inventory_id, 307);
		assert.strictEqual(capturedCalls[0].parameters.filter_stock_from, 10);
	});

	it('should execute getInventoryProductsStock in JSON mode', async () => {
		const mockStock = {
			'777': {
				product_id: 777,
				stock: { bl_205: 50 },
			},
		};

		const { context, capturedCalls } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryProductsStock',
			params: {
				parameterMode: 'json',
				parametersJson: JSON.stringify({ inventory_id: 307, filter_id: 777 }),
			},
			mockResponse: { status: 'SUCCESS', products: mockStock },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.product_id, 777);
		assert.strictEqual(capturedCalls[0].parameters.filter_id, 777);
	});

	// ----------------------------------
	// getInventoryProductsPrices
	// ----------------------------------
	it('should execute getInventoryProductsPrices in UI fields mode', async () => {
		const mockPrices = {
			'2685': {
				product_id: 2685,
				prices: { '105': 19.99, '106': 24.99 },
			},
		};

		const { context, capturedCalls } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryProductsPrices',
			params: {
				parameterMode: 'fields',
				inventory_id: 307,
				returnAll: false,
				page: 1,
				limit: 100,
			},
			mockResponse: { status: 'SUCCESS', products: mockPrices },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.product_id, 2685);
		assert.strictEqual((result[0][0].json.prices as any)['105'], 19.99);
		assert.strictEqual(capturedCalls[0].method, 'getInventoryProductsPrices');
		assert.strictEqual(capturedCalls[0].parameters.inventory_id, 307);
	});

	it('should execute getInventoryProductsPrices in JSON mode', async () => {
		const mockPrices = {
			'999': {
				product_id: 999,
				prices: { '105': 99.0 },
			},
		};

		const { context, capturedCalls } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryProductsPrices',
			params: {
				parameterMode: 'json',
				parametersJson: JSON.stringify({ inventory_id: 307, page: 2 }),
			},
			mockResponse: { status: 'SUCCESS', products: mockPrices },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.product_id, 999);
		assert.strictEqual(capturedCalls[0].parameters.page, 2);
	});

	// ----------------------------------
	// getInventoryProductLogs
	// ----------------------------------
	it('should execute getInventoryProductLogs in perLog mode with filters', async () => {
		const mockLogs = [
			{
				profile: 'API',
				date: 1609459200,
				entries: [
					{
						type: 1,
						info: 'bl_205',
						from: 50,
						to: 100,
					},
					{
						type: 2,
						info: 105,
						from: 19.99,
						to: 24.99,
					},
				],
			},
		];

		const { context, capturedCalls } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryProductLogs',
			params: {
				parameterMode: 'fields',
				product_id: 2685,
				outputFormat: 'perLog',
				returnAll: false,
				page: 1,
				limit: 50,
				filters: {
					date_from: 1609459200,
					log_types: [1, 2],
					sort: 'DESC',
				},
			},
			mockResponse: { status: 'SUCCESS', logs: mockLogs },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.product_id, 2685);
		assert.strictEqual(result[0][0].json.profile, 'API');
		assert.strictEqual((result[0][0].json.entries as any[]).length, 2);
		assert.strictEqual(capturedCalls[0].method, 'getInventoryProductLogs');
		assert.strictEqual(capturedCalls[0].parameters.product_id, 2685);
		assert.strictEqual(capturedCalls[0].parameters.date_from, 1609459200);
		assert.deepStrictEqual(capturedCalls[0].parameters.log_type, [1, 2]);
		assert.strictEqual(capturedCalls[0].parameters.sort, 'DESC');
	});

	it('should execute getInventoryProductLogs in flatEntries mode', async () => {
		const mockLogs = [
			{
				profile: 'Admin',
				date: 1609459200,
				entries: [
					{ type: 1, info: 'bl_205', from: 10, to: 20 },
					{ type: 2, info: 105, from: 15.0, to: 18.0 },
				],
			},
		];

		const { context } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryProductLogs',
			params: {
				parameterMode: 'fields',
				product_id: 3000,
				outputFormat: 'flatEntries',
				returnAll: false,
				page: 1,
				limit: 50,
				filters: {},
			},
			mockResponse: { status: 'SUCCESS', logs: mockLogs },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 2);
		assert.strictEqual(result[0][0].json.product_id, 3000);
		assert.strictEqual(result[0][0].json.type, 1);
		assert.strictEqual(result[0][0].json.to, 20);
		assert.strictEqual(result[0][1].json.type, 2);
		assert.strictEqual(result[0][1].json.to, 18.0);
	});

	it('should throw error when invalid JSON is provided for product catalog operations', async () => {
		const { context } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryProductsList',
			params: {
				parameterMode: 'json',
				parametersJson: '{ invalid json',
			},
			mockResponse: { status: 'SUCCESS' },
		});

		await assert.rejects(async () => {
			await node.execute.call(context);
		}, /Invalid JSON provided for getInventoryProductsList/);
	});

	// ----------------------------------
	// loadOptions
	// ----------------------------------
	it('should load dynamic dropdown options for getInventories and getInventoryWarehouses', async () => {
		const loadOptionsContext = {
			getNode: () => ({ name: 'baseLinkerMock' }),
			getCredentials: async () => ({ token: 'mock-token' }),
			helpers: {
				httpRequest: async (reqOptions: any) => {
					const bodyStr = reqOptions.body.toString();
					const params = new URLSearchParams(bodyStr);
					const method = params.get('method') || '';

					if (method === 'getInventories') {
						return {
							status: 'SUCCESS',
							inventories: [
								{ inventory_id: 307, name: 'Default Catalog', is_default: true },
								{ inventory_id: 308, name: 'Secondary Catalog', is_default: false },
							],
						};
					}
					if (method === 'getInventoryWarehouses') {
						return {
							status: 'SUCCESS',
							warehouses: [
								{
									warehouse_type: 'bl',
									warehouse_id: 205,
									name: 'Warsaw Hub',
									city: 'Warsaw',
									country: 'PL',
									is_default: true,
								},
							],
						};
					}
					return { status: 'SUCCESS' };
				},
			},
		};

		const inventories = await node.methods.loadOptions.getInventories.call(loadOptionsContext as any);
		assert.strictEqual(inventories.length, 2);
		assert.strictEqual(inventories[0].value, 307);
		assert.match(inventories[0].name, /Default Catalog/);
		assert.match(inventories[0].name, /\[Default\]/);

		const warehouses = await node.methods.loadOptions.getInventoryWarehouses.call(loadOptionsContext as any);
		assert.strictEqual(warehouses.length, 1);
		assert.strictEqual(warehouses[0].value, 'bl_205');
		assert.match(warehouses[0].name, /Warsaw Hub/);
	});
	// ----------------------------------
	// addInventory & deleteInventory
	// ----------------------------------
	it('should execute addInventory in fields mode', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'productCatalog',
			operation: 'addInventory',
			params: {
				parameterMode: 'fields',
				name: 'New Catalog',
				description: 'Catalog description',
				default_language: 'en',
				languages: 'en, de',
				default_price_group: 105,
				price_groups: '105, 106',
				default_warehouse: 'bl_205',
				warehouses: 'bl_205, shop_10',
				reservations: true,
			},
			mockResponse: { status: 'SUCCESS', inventory_id: 309 },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(result[0][0].json.success, true);
		assert.strictEqual(result[0][0].json.inventory_id, 309);
		assert.strictEqual(capturedCalls[0].method, 'addInventory');
		assert.strictEqual(capturedCalls[0].parameters.name, 'New Catalog');
		assert.deepStrictEqual(capturedCalls[0].parameters.languages, ['en', 'de']);
		assert.deepStrictEqual(capturedCalls[0].parameters.price_groups, [105, 106]);
	});

	it('should execute addInventory in json mode', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'productCatalog',
			operation: 'addInventory',
			params: {
				parameterMode: 'json',
				parametersJson: JSON.stringify({ name: 'Raw Catalog', default_language: 'pl' }),
			},
			mockResponse: { status: 'SUCCESS', inventory_id: 310 },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(result[0][0].json.success, true);
		assert.strictEqual(capturedCalls[0].parameters.name, 'Raw Catalog');
	});

	it('should execute deleteInventory', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'productCatalog',
			operation: 'deleteInventory',
			params: {
				inventory_id: 309,
			},
			mockResponse: { status: 'SUCCESS' },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(result[0][0].json.success, true);
		assert.strictEqual(result[0][0].json.inventory_id, 309);
		assert.strictEqual(capturedCalls[0].method, 'deleteInventory');
		assert.deepStrictEqual(capturedCalls[0].parameters, { inventory_id: 309 });
	});

	// ----------------------------------
	// addInventoryWarehouse & deleteInventoryWarehouse
	// ----------------------------------
	it('should execute addInventoryWarehouse in fields mode', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'productCatalog',
			operation: 'addInventoryWarehouse',
			params: {
				parameterMode: 'fields',
				name: 'Berlin Depot',
				stock_edition: false,
				country: 'DE',
				city: 'Berlin',
			},
			mockResponse: { status: 'SUCCESS', warehouse_id: 206 },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(result[0][0].json.success, true);
		assert.strictEqual(result[0][0].json.warehouse_id, 206);
		assert.strictEqual(capturedCalls[0].method, 'addInventoryWarehouse');
		assert.strictEqual(capturedCalls[0].parameters.name, 'Berlin Depot');
		assert.strictEqual(capturedCalls[0].parameters.country, 'DE');
	});

	it('should execute deleteInventoryWarehouse', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'productCatalog',
			operation: 'deleteInventoryWarehouse',
			params: {
				warehouse_id: 206,
			},
			mockResponse: { status: 'SUCCESS' },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(result[0][0].json.success, true);
		assert.strictEqual(result[0][0].json.warehouse_id, 206);
		assert.strictEqual(capturedCalls[0].method, 'deleteInventoryWarehouse');
		assert.deepStrictEqual(capturedCalls[0].parameters, { warehouse_id: 206 });
	});

	// ----------------------------------
	// getInventoryMaps & getInventoryMapDetails
	// ----------------------------------
	it('should execute getInventoryMaps', async () => {
		const mockMaps = [{ map_id: 1, name: 'Main Map' }];
		const { context, capturedCalls } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryMaps',
			mockResponse: { status: 'SUCCESS', maps: mockMaps },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.map_id, 1);
		assert.strictEqual(capturedCalls[0].method, 'getInventoryMaps');
	});

	it('should execute getInventoryMapDetails', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryMapDetails',
			params: { map_id: 5 },
			mockResponse: { status: 'SUCCESS', map: { name: 'Ground Floor', layout: {} } },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(result[0][0].json.map_id, 5);
		assert.strictEqual(result[0][0].json.name, 'Ground Floor');
		assert.strictEqual(capturedCalls[0].method, 'getInventoryMapDetails');
		assert.deepStrictEqual(capturedCalls[0].parameters, { map_id: 5 });
	});

	// ----------------------------------
	// updateInventoryProductsStock & updateInventoryProductsPrices
	// ----------------------------------
	it('should execute updateInventoryProductsStock in fields mode (single update)', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'productCatalog',
			operation: 'updateInventoryProductsStock',
			params: {
				parameterMode: 'fields',
				inventory_id: 307,
				stockUpdateMode: 'single',
				product_id: 2685,
				warehouse_id: 'bl_206',
				quantity: 25,
			},
			mockResponse: { status: 'SUCCESS', counter: 1 },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(result[0][0].json.success, true);
		assert.strictEqual(result[0][0].json.counter, 1);
		assert.strictEqual(capturedCalls[0].method, 'updateInventoryProductsStock');
		assert.deepStrictEqual(capturedCalls[0].parameters, {
			inventory_id: 307,
			products: {
				'2685': {
					'bl_206': 25,
				},
			},
		});
	});

	it('should execute updateInventoryProductsStock in json mode', async () => {
		const rawPayload = {
			inventory_id: 307,
			products: { '2685': { bl_206: 15 } },
		};
		const { context, capturedCalls } = createMockContext({
			resource: 'productCatalog',
			operation: 'updateInventoryProductsStock',
			params: {
				parameterMode: 'json',
				parametersJson: JSON.stringify(rawPayload),
			},
			mockResponse: { status: 'SUCCESS', counter: 1 },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(result[0][0].json.success, true);
		assert.deepStrictEqual(capturedCalls[0].parameters, rawPayload);
	});

	it('should execute updateInventoryProductsPrices in fields mode (single update)', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'productCatalog',
			operation: 'updateInventoryProductsPrices',
			params: {
				parameterMode: 'fields',
				inventory_id: 307,
				priceUpdateMode: 'single',
				product_id: 2685,
				price_group_id: 105,
				price_brutto: 39.99,
			},
			mockResponse: { status: 'SUCCESS', counter: 1 },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(result[0][0].json.success, true);
		assert.strictEqual(capturedCalls[0].method, 'updateInventoryProductsPrices');
		assert.deepStrictEqual(capturedCalls[0].parameters, {
			inventory_id: 307,
			products: {
				'2685': {
					'105': 39.99,
				},
			},
		});
	});

	it('should execute updateInventoryProductsPrices in json mode', async () => {
		const rawPayload = {
			inventory_id: 307,
			products: { '2685': { '105': 29.99 } },
		};
		const { context, capturedCalls } = createMockContext({
			resource: 'productCatalog',
			operation: 'updateInventoryProductsPrices',
			params: {
				parameterMode: 'json',
				parametersJson: JSON.stringify(rawPayload),
			},
			mockResponse: { status: 'SUCCESS', counter: 1 },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(result[0][0].json.success, true);
		assert.deepStrictEqual(capturedCalls[0].parameters, rawPayload);
	});

	// ----------------------------------
	// addInventoryProduct & deleteInventoryProduct
	// ----------------------------------
	it('should execute addInventoryProduct in fields mode with product details and overrides', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'productCatalog',
			operation: 'addInventoryProduct',
			params: {
				parameterMode: 'fields',
				inventory_id: 307,
				name: 'Awesome T-Shirt',
				sku: 'TSHIRT-001',
				ean: '5901234567890',
				category_id: 3,
				manufacturer_id: 5,
				tax_rate: 23,
				price_brutto: 59.99,
				price_group_id: 105,
				stock_quantity: 10,
				warehouse_id: 'bl_206',
				weight: 0.35,
				description: '<p>High quality cotton</p>',
				additionalFields: {
					asin: 'B08XYZ123',
					tags: 'Summer, Cotton',
					text_fields_json: JSON.stringify({ 'features': { 'Material': 'Cotton' } }),
				},
			},
			mockResponse: { status: 'SUCCESS', product_id: 4501 },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(result[0][0].json.success, true);
		assert.strictEqual(result[0][0].json.product_id, 4501);
		assert.strictEqual(capturedCalls[0].method, 'addInventoryProduct');
		assert.strictEqual(capturedCalls[0].parameters.inventory_id, 307);
		assert.strictEqual(capturedCalls[0].parameters.sku, 'TSHIRT-001');
		assert.deepStrictEqual(capturedCalls[0].parameters.prices, { '105': 59.99 });
		assert.deepStrictEqual(capturedCalls[0].parameters.stock, { 'bl_206': 10 });
		assert.deepStrictEqual(capturedCalls[0].parameters.tags, ['Summer', 'Cotton']);
		assert.strictEqual(capturedCalls[0].parameters.asin, 'B08XYZ123');
	});

	it('should execute addInventoryProduct in json mode', async () => {
		const rawProduct = {
			inventory_id: 307,
			sku: 'RAW-001',
			name: 'Raw Product',
		};
		const { context, capturedCalls } = createMockContext({
			resource: 'productCatalog',
			operation: 'addInventoryProduct',
			params: {
				parameterMode: 'json',
				parametersJson: JSON.stringify(rawProduct),
			},
			mockResponse: { status: 'SUCCESS', product_id: 4502 },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(result[0][0].json.success, true);
		assert.deepStrictEqual(capturedCalls[0].parameters, rawProduct);
	});

	it('should execute deleteInventoryProduct', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'productCatalog',
			operation: 'deleteInventoryProduct',
			params: {
				product_id: 4501,
			},
			mockResponse: { status: 'SUCCESS' },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(result[0][0].json.success, true);
		assert.strictEqual(result[0][0].json.product_id, 4501);
		assert.strictEqual(capturedCalls[0].method, 'deleteInventoryProduct');
		assert.deepStrictEqual(capturedCalls[0].parameters, { product_id: 4501 });
	});

	// ----------------------------------
	// getInventoryParameters, runProductMacroTrigger & runFulfillmentLinkProducts
	// ----------------------------------
	it('should execute getInventoryParameters', async () => {
		const mockParams = [{ parameter_id: 10, name: 'Color' }];
		const { context, capturedCalls } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryParameters',
			params: { inventory_id: 307 },
			mockResponse: { status: 'SUCCESS', parameters: mockParams },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.parameter_id, 10);
		assert.strictEqual(capturedCalls[0].method, 'getInventoryParameters');
		assert.deepStrictEqual(capturedCalls[0].parameters, { inventory_id: 307 });
	});

	it('should execute runProductMacroTrigger', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'productCatalog',
			operation: 'runProductMacroTrigger',
			params: { product_id: 2685, trigger_id: 12413 },
			mockResponse: { status: 'SUCCESS' },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(result[0][0].json.success, true);
		assert.strictEqual(result[0][0].json.product_id, 2685);
		assert.strictEqual(result[0][0].json.trigger_id, 12413);
		assert.strictEqual(capturedCalls[0].method, 'runProductMacroTrigger');
	});

	it('should execute runFulfillmentLinkProducts with comma-separated IDs', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'productCatalog',
			operation: 'runFulfillmentLinkProducts',
			params: { fulfillment_warehouse_id: 123, product_ids: '1001, 1002, 1003' },
			mockResponse: { status: 'SUCCESS' },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(result[0][0].json.success, true);
		assert.strictEqual(capturedCalls[0].method, 'runFulfillmentLinkProducts');
		assert.deepStrictEqual(capturedCalls[0].parameters, {
			fulfillment_warehouse_id: 123,
			product_ids: [1001, 1002, 1003],
		});
	});

	// ----------------------------------
	// Categories operations
	// ----------------------------------
	it('should execute getInventoryCategories', async () => {
		const mockCats = [{ category_id: 10, name: 'Shoes', parent_id: 0 }];
		const { context, capturedCalls } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryCategories',
			params: { inventory_id: 307 },
			mockResponse: { status: 'SUCCESS', categories: mockCats },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.category_id, 10);
		assert.strictEqual(capturedCalls[0].method, 'getInventoryCategories');
	});

	it('should execute addInventoryCategory in fields and json modes', async () => {
		const { context: ctx1, capturedCalls: calls1 } = createMockContext({
			resource: 'productCatalog',
			operation: 'addInventoryCategory',
			params: {
				parameterMode: 'fields',
				inventory_id: 307,
				name: 'Sneakers',
				parent_id: 10,
			},
			mockResponse: { status: 'SUCCESS', category_id: 15 },
		});

		const res1 = await node.execute.call(ctx1);
		assert.strictEqual(res1[0][0].json.success, true);
		assert.strictEqual(res1[0][0].json.category_id, 15);
		assert.strictEqual(calls1[0].parameters.name, 'Sneakers');

		const { context: ctx2, capturedCalls: calls2 } = createMockContext({
			resource: 'productCatalog',
			operation: 'addInventoryCategory',
			params: {
				parameterMode: 'json',
				parametersJson: JSON.stringify({ inventory_id: 307, name: 'Boots' }),
			},
			mockResponse: { status: 'SUCCESS', category_id: 16 },
		});

		const res2 = await node.execute.call(ctx2);
		assert.strictEqual(res2[0][0].json.success, true);
		assert.strictEqual(calls2[0].parameters.name, 'Boots');
	});

	it('should execute deleteInventoryCategory', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'productCatalog',
			operation: 'deleteInventoryCategory',
			params: { category_id: 15 },
			mockResponse: { status: 'SUCCESS' },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(result[0][0].json.success, true);
		assert.strictEqual(result[0][0].json.category_id, 15);
		assert.strictEqual(capturedCalls[0].method, 'deleteInventoryCategory');
	});

	// ----------------------------------
	// Manufacturers operations
	// ----------------------------------
	it('should execute getInventoryManufacturers and paginate with returnAll', async () => {
		const page1 = Array.from({ length: 1000 }, (_, i) => ({ manufacturer_id: i + 1, name: `M-${i + 1}` }));
		const page2 = [{ manufacturer_id: 1001, name: 'M-1001' }];

		const { context, capturedCalls } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryManufacturers',
			params: { returnAll: true, delayMs: 0 },
			mockResponses: [
				{ status: 'SUCCESS', manufacturers: page1 },
				{ status: 'SUCCESS', manufacturers: page2 },
			],
		});

		const result = await node.execute.call(context);
		assert.strictEqual(result[0].length, 1001);
		assert.strictEqual(capturedCalls.length, 2);
		assert.strictEqual(capturedCalls[0].parameters.page, 1);
		assert.strictEqual(capturedCalls[1].parameters.page, 2);
	});

	it('should execute addInventoryManufacturer and deleteInventoryManufacturer', async () => {
		const { context: ctx1, capturedCalls: calls1 } = createMockContext({
			resource: 'productCatalog',
			operation: 'addInventoryManufacturer',
			params: {
				parameterMode: 'fields',
				manufacturer_name: 'Acme Corp',
				manufacturer_url: 'https://acme.com',
				addressDetails: {
					manufacturer_city: 'London',
					manufacturer_country_code: 'GB',
				},
			},
			mockResponse: { status: 'SUCCESS', manufacturer_id: 8 },
		});

		const res1 = await node.execute.call(ctx1);
		assert.strictEqual(res1[0][0].json.success, true);
		assert.strictEqual(calls1[0].parameters.manufacturer_name, 'Acme Corp');
		assert.strictEqual(calls1[0].parameters.manufacturer_city, 'London');

		const { context: ctx2, capturedCalls: calls2 } = createMockContext({
			resource: 'productCatalog',
			operation: 'deleteInventoryManufacturer',
			params: { manufacturer_id: 8 },
			mockResponse: { status: 'SUCCESS' },
		});

		const res2 = await node.execute.call(ctx2);
		assert.strictEqual(res2[0][0].json.success, true);
		assert.strictEqual(calls2[0].method, 'deleteInventoryManufacturer');
	});

	// ----------------------------------
	// Price groups operations
	// ----------------------------------
	it('should execute getInventoryPriceGroups', async () => {
		const mockGroups = [{ price_group_id: 105, name: 'Retail', currency: 'PLN' }];
		const { context, capturedCalls } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryPriceGroups',
			mockResponse: { status: 'SUCCESS', price_groups: mockGroups },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.price_group_id, 105);
		assert.strictEqual(capturedCalls[0].method, 'getInventoryPriceGroups');
	});

	it('should execute addInventoryPriceGroup (dependent) and deleteInventoryPriceGroup', async () => {
		const { context: ctx1, capturedCalls: calls1 } = createMockContext({
			resource: 'productCatalog',
			operation: 'addInventoryPriceGroup',
			params: {
				parameterMode: 'fields',
				name: 'EUR Retail',
				currency: 'EUR',
				price_group_type: 'dependent_on_price_group',
				source_price_group_id: 104,
				price_multiplier: 0.95,
				price_addition: 0.99,
			},
			mockResponse: { status: 'SUCCESS', price_group_id: 106 },
		});

		const res1 = await node.execute.call(ctx1);
		assert.strictEqual(res1[0][0].json.success, true);
		assert.strictEqual(calls1[0].parameters.name, 'EUR Retail');
		assert.strictEqual(calls1[0].parameters.source_price_group_id, 104);
		assert.strictEqual(calls1[0].parameters.price_multiplier, 0.95);

		const { context: ctx2, capturedCalls: calls2 } = createMockContext({
			resource: 'productCatalog',
			operation: 'deleteInventoryPriceGroup',
			params: { price_group_id: 106 },
			mockResponse: { status: 'SUCCESS' },
		});

		const res2 = await node.execute.call(ctx2);
		assert.strictEqual(res2[0][0].json.success, true);
		assert.strictEqual(calls2[0].method, 'deleteInventoryPriceGroup');
	});

	// ----------------------------------
	// Tags operations
	// ----------------------------------
	it('should execute getInventoryTags, addInventoryTag and deleteInventoryTag', async () => {
		const mockTags = [{ tag_id: 5, name: 'Summer' }];
		const { context: ctxGet } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryTags',
			mockResponse: { status: 'SUCCESS', tags: mockTags },
		});
		const resGet = await node.execute.call(ctxGet);
		assert.strictEqual(resGet[0].length, 1);
		assert.strictEqual(resGet[0][0].json.tag_id, 5);

		const { context: ctxAdd, capturedCalls: callsAdd } = createMockContext({
			resource: 'productCatalog',
			operation: 'addInventoryTag',
			params: { parameterMode: 'fields', name: 'Winter' },
			mockResponse: { status: 'SUCCESS', tag_id: 6 },
		});
		const resAdd = await node.execute.call(ctxAdd);
		assert.strictEqual(resAdd[0][0].json.success, true);
		assert.strictEqual(callsAdd[0].parameters.name, 'Winter');

		const { context: ctxDel, capturedCalls: callsDel } = createMockContext({
			resource: 'productCatalog',
			operation: 'deleteInventoryTag',
			params: { tag_id: 6 },
			mockResponse: { status: 'SUCCESS' },
		});
		const resDel = await node.execute.call(ctxDel);
		assert.strictEqual(resDel[0][0].json.success, true);
		assert.strictEqual(callsDel[0].method, 'deleteInventoryTag');
	});

	// ----------------------------------
	// Metadata, Integrations, Shipping Templates & Logs
	// ----------------------------------
	it('should execute getInventoryExtraFields', async () => {
		const mockFields = [{ extra_field_id: 20, name: 'Warranty' }];
		const { context, capturedCalls } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryExtraFields',
			mockResponse: { status: 'SUCCESS', extra_fields: mockFields },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.extra_field_id, 20);
		assert.strictEqual(capturedCalls[0].method, 'getInventoryExtraFields');
	});

	it('should execute getInventoryAvailableTextFieldKeys and getInventoryIntegrations', async () => {
		const { context: ctx1 } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryAvailableTextFieldKeys',
			params: { inventory_id: 307 },
			mockResponse: { status: 'SUCCESS', text_field_keys: ['name', 'description'] },
		});
		const res1 = await node.execute.call(ctx1);
		assert.strictEqual(res1[0].length, 2);

		const { context: ctx2 } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryIntegrations',
			params: { inventory_id: 307 },
			mockResponse: { status: 'SUCCESS', integrations: [{ account_id: 1, name: 'Allegro Shop' }] },
		});
		const res2 = await node.execute.call(ctx2);
		assert.strictEqual(res2[0].length, 1);
	});

	it('should execute getInventoryShippingTemplates and getInventoryPrintoutTemplates', async () => {
		const { context: ctx1 } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryShippingTemplates',
			mockResponse: { status: 'SUCCESS', shipping_templates: [{ template_id: 'allegro_1', name: 'Allegro Standard' }] },
		});
		const res1 = await node.execute.call(ctx1);
		assert.strictEqual(res1[0].length, 1);

		const { context: ctx2 } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryPrintoutTemplates',
			mockResponse: { status: 'SUCCESS', printouts: [{ printout_id: 42, name: 'Product Label' }] },
		});
		const res2 = await node.execute.call(ctx2);
		assert.strictEqual(res2[0].length, 1);
	});

	it('should execute getSyncLogList', async () => {
		const mockLogs = [{ log_id: 100, date: 1700000000, source: 'allegro', message: 'Sync OK' }];
		const { context, capturedCalls } = createMockContext({
			resource: 'productCatalog',
			operation: 'getSyncLogList',
			params: {
				parameterMode: 'fields',
				source: 'allegro',
				last_log_id: 50,
				errors_only: false,
			},
			mockResponse: { status: 'SUCCESS', logs: mockLogs },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.log_id, 100);
		assert.strictEqual(capturedCalls[0].method, 'getSyncLogList');
		assert.strictEqual(capturedCalls[0].parameters.source, 'allegro');
	});

	it('should execute addInventoryPromotion and getInventoryPromotionsList', async () => {
		const promoDef = {
			price_group_filter: { name: 'Promo Weekend', target_price_group_id: 105 },
		};
		const { context: ctx1, capturedCalls: calls1 } = createMockContext({
			resource: 'productCatalog',
			operation: 'addInventoryPromotion',
			params: {
				parameterMode: 'fields',
				promotion_id: 0,
				promotionDefinitionJson: JSON.stringify(promoDef),
			},
			mockResponse: { status: 'SUCCESS', promotion_id: 7 },
		});

		const res1 = await node.execute.call(ctx1);
		assert.strictEqual(res1[0][0].json.success, true);
		assert.strictEqual(res1[0][0].json.promotion_id, 7);
		assert.strictEqual(calls1[0].method, 'addInventoryPromotion');

		const { context: ctx2, capturedCalls: calls2 } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryPromotionsList',
			params: { page: 2 },
			mockResponse: { status: 'SUCCESS', promotions: [{ promotion_id: 7, name: 'Promo Weekend' }] },
		});

		const res2 = await node.execute.call(ctx2);
		assert.strictEqual(res2[0].length, 1);
		assert.strictEqual(res2[0][0].json.promotion_id, 7);
		assert.deepStrictEqual(calls2[0].parameters, { page: 2 });
	});

	it('should load dynamic dropdown options for price groups, categories, manufacturers, tags, extra fields and shipping templates', async () => {
		const loadOptionsContext = {
			getNode: () => ({ name: 'baseLinkerMock' }),
			getNodeParameter: (param: string) => {
				if (param === 'inventory_id') return 307;
				return '';
			},
			getCredentials: async () => ({ token: 'mock-token' }),
			helpers: {
				httpRequest: async (reqOptions: any) => {
					const bodyStr = reqOptions.body.toString();
					const params = new URLSearchParams(bodyStr);
					const method = params.get('method') || '';

					if (method === 'getInventoryPriceGroups') {
						return {
							status: 'SUCCESS',
							price_groups: [{ price_group_id: 105, name: 'PLN Retail', currency: 'PLN', is_default: true }],
						};
					}
					if (method === 'getInventoryCategories') {
						return {
							status: 'SUCCESS',
							categories: [{ category_id: 12, name: 'Apparel', parent_id: 0 }],
						};
					}
					if (method === 'getInventoryManufacturers') {
						return {
							status: 'SUCCESS',
							manufacturers: [{ manufacturer_id: 99, name: 'Nike' }],
						};
					}
					if (method === 'getInventoryTags') {
						return {
							status: 'SUCCESS',
							tags: [{ tag_id: 3, name: 'Bestseller' }],
						};
					}
					if (method === 'getInventoryExtraFields') {
						return {
							status: 'SUCCESS',
							extra_fields: [{ extra_field_id: 7, name: 'Material', editor_type: 'text' }],
						};
					}
					if (method === 'getInventoryShippingTemplates') {
						return {
							status: 'SUCCESS',
							shipping_templates: [{ template_id: 'allegro_123', name: 'Kurier Allegro' }],
						};
					}
					return { status: 'SUCCESS' };
				},
			},
		};

		const priceGroups = await node.methods.loadOptions.getInventoryPriceGroups.call(loadOptionsContext as any);
		assert.strictEqual(priceGroups.length, 1);
		assert.strictEqual(priceGroups[0].value, 105);

		const categories = await node.methods.loadOptions.getInventoryCategories.call(loadOptionsContext as any);
		assert.strictEqual(categories.length, 1);
		assert.strictEqual(categories[0].value, 12);

		const manufacturers = await node.methods.loadOptions.getInventoryManufacturers.call(loadOptionsContext as any);
		assert.strictEqual(manufacturers.length, 1);
		assert.strictEqual(manufacturers[0].value, 99);

		const tags = await node.methods.loadOptions.getInventoryTags.call(loadOptionsContext as any);
		assert.strictEqual(tags.length, 1);
		assert.strictEqual(tags[0].value, 3);

		const extraFields = await node.methods.loadOptions.getInventoryExtraFields.call(loadOptionsContext as any);
		assert.strictEqual(extraFields.length, 1);
		assert.strictEqual(extraFields[0].value, 7);

		const shippingTemplates = await node.methods.loadOptions.getInventoryShippingTemplates.call(loadOptionsContext as any);
		assert.strictEqual(shippingTemplates.length, 1);
		assert.strictEqual(shippingTemplates[0].value, 'allegro_123');
	});


	// =========================================================================
	//   BATCH 2: WMS, Documents, Logistics & Taxonomy Tests (54 Operations)
	// =========================================================================

	// ----------------------------------
	// Warehouse Locations & Types
	// ----------------------------------
	it('should execute getInventoryWarehouseLocations with pagination and returnAll', async () => {
		const mockLocations = [{ location_id: 17, name: 'A-01-A-1' }];
		const { context, capturedCalls } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryWarehouseLocations',
			params: {
				parameterMode: 'fields',
				warehouse_id: 205,
				warehouse_type: 'bl',
				returnAll: false,
				page: 1,
			},
			mockResponse: { status: 'SUCCESS', locations: mockLocations },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.location_id, 17);
		assert.strictEqual(capturedCalls[0].method, 'getInventoryWarehouseLocations');
		assert.strictEqual(capturedCalls[0].parameters.warehouse_id, 205);
	});

	it('should execute getInventoryWarehouseLocationTypes, addInventoryWarehouseLocation, and deleteInventoryWarehouseLocation', async () => {
		const { context: ctxTypes, capturedCalls: callsTypes } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryWarehouseLocationTypes',
			mockResponse: { status: 'SUCCESS', types: [{ location_type_id: 1, name: 'Pallet' }] },
		});
		const resTypes = await node.execute.call(ctxTypes);
		assert.strictEqual(resTypes[0][0].json.location_type_id, 1);
		assert.strictEqual(callsTypes[0].method, 'getInventoryWarehouseLocationTypes');

		const { context: ctxAdd, capturedCalls: callsAdd } = createMockContext({
			resource: 'productCatalog',
			operation: 'addInventoryWarehouseLocation',
			params: {
				parameterMode: 'fields',
				warehouse_id: 205,
				warehouse_type: 'bl',
				name: 'A-01-A-1',
				color: '5cb85c',
				is_pickable: true,
			},
			mockResponse: { status: 'SUCCESS', location_id: 17 },
		});
		const resAdd = await node.execute.call(ctxAdd);
		assert.strictEqual(resAdd[0][0].json.success, true);
		assert.strictEqual(callsAdd[0].parameters.name, 'A-01-A-1');

		const { context: ctxDel, capturedCalls: callsDel } = createMockContext({
			resource: 'productCatalog',
			operation: 'deleteInventoryWarehouseLocation',
			params: {
				parameterMode: 'fields',
				warehouse_id: 205,
				warehouse_type: 'bl',
				location_id: 17,
			},
			mockResponse: { status: 'SUCCESS' },
		});
		const resDel = await node.execute.call(ctxDel);
		assert.strictEqual(resDel[0][0].json.success, true);
		assert.strictEqual(callsDel[0].method, 'deleteInventoryWarehouseLocation');
	});

	it('should execute addInventoryWarehouseLocationType and deleteInventoryWarehouseLocationType', async () => {
		const { context: ctxAdd, capturedCalls: callsAdd } = createMockContext({
			resource: 'productCatalog',
			operation: 'addInventoryWarehouseLocationType',
			params: {
				parameterMode: 'fields',
				name: 'Box Shelf',
				max_quantity: 50,
			},
			mockResponse: { status: 'SUCCESS', location_type_id: 5 },
		});
		const resAdd = await node.execute.call(ctxAdd);
		assert.strictEqual(resAdd[0][0].json.success, true);
		assert.strictEqual(callsAdd[0].parameters.name, 'Box Shelf');

		const { context: ctxDel, capturedCalls: callsDel } = createMockContext({
			resource: 'productCatalog',
			operation: 'deleteInventoryWarehouseLocationType',
			params: {
				parameterMode: 'fields',
				location_type_id: 5,
			},
			mockResponse: { status: 'SUCCESS' },
		});
		const resDel = await node.execute.call(ctxDel);
		assert.strictEqual(resDel[0][0].json.success, true);
		assert.strictEqual(callsDel[0].method, 'deleteInventoryWarehouseLocationType');
	});

	// ----------------------------------
	// Warehouse Zones & Racks
	// ----------------------------------
	it('should execute warehouse zones operations (get, add, delete)', async () => {
		const { context: ctxGet } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryWarehouseZones',
			mockResponse: { status: 'SUCCESS', zones: [{ zone_id: 101, name: 'Cold Storage' }] },
		});
		const resGet = await node.execute.call(ctxGet);
		assert.strictEqual(resGet[0][0].json.zone_id, 101);

		const { context: ctxAdd, capturedCalls: callsAdd } = createMockContext({
			resource: 'productCatalog',
			operation: 'addInventoryWarehouseZone',
			params: {
				parameterMode: 'fields',
				name: 'Cold Storage',
				color: '4285f4',
				location_prefix: 'CS',
			},
			mockResponse: { status: 'SUCCESS', zone_id: 101 },
		});
		const resAdd = await node.execute.call(ctxAdd);
		assert.strictEqual(resAdd[0][0].json.success, true);
		assert.strictEqual(callsAdd[0].parameters.name, 'Cold Storage');

		const { context: ctxDel } = createMockContext({
			resource: 'productCatalog',
			operation: 'deleteInventoryWarehouseZone',
			params: { parameterMode: 'fields', zone_id: 101 },
			mockResponse: { status: 'SUCCESS' },
		});
		const resDel = await node.execute.call(ctxDel);
		assert.strictEqual(resDel[0][0].json.success, true);
	});

	it('should execute warehouse racks operations (get, add, delete)', async () => {
		const { context: ctxGet } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryWarehouseRacks',
			mockResponse: { status: 'SUCCESS', racks: [{ rack_id: 501, name: 'Rack A-01' }] },
		});
		const resGet = await node.execute.call(ctxGet);
		assert.strictEqual(resGet[0][0].json.rack_id, 501);

		const { context: ctxAdd, capturedCalls: callsAdd } = createMockContext({
			resource: 'productCatalog',
			operation: 'addInventoryWarehouseRack',
			params: {
				parameterMode: 'fields',
				name: 'Rack A-01',
				zone_id: 101,
				layout: 0,
				location_prefix: 'A01',
			},
			mockResponse: { status: 'SUCCESS', rack_id: 501 },
		});
		const resAdd = await node.execute.call(ctxAdd);
		assert.strictEqual(resAdd[0][0].json.success, true);
		assert.strictEqual(callsAdd[0].parameters.name, 'Rack A-01');

		const { context: ctxDel } = createMockContext({
			resource: 'productCatalog',
			operation: 'deleteInventoryWarehouseRack',
			params: { parameterMode: 'fields', rack_id: 501 },
			mockResponse: { status: 'SUCCESS' },
		});
		const resDel = await node.execute.call(ctxDel);
		assert.strictEqual(resDel[0][0].json.success, true);
	});

	// ----------------------------------
	// Suppliers & Payers
	// ----------------------------------
	it('should execute suppliers operations (get, add, delete)', async () => {
		const { context: ctxGet } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventorySuppliers',
			params: { parameterMode: 'fields', filter_name: 'Supplier Ltd' },
			mockResponse: { status: 'SUCCESS', suppliers: [{ supplier_id: 1, name: 'Supplier Ltd' }] },
		});
		const resGet = await node.execute.call(ctxGet);
		assert.strictEqual(resGet[0][0].json.supplier_id, 1);

		const { context: ctxAdd, capturedCalls: callsAdd } = createMockContext({
			resource: 'productCatalog',
			operation: 'addInventorySupplier',
			params: {
				parameterMode: 'fields',
				name: 'Supplier Ltd',
				email: 'contact@supplier.com',
				currency: 'GBP',
			},
			mockResponse: { status: 'SUCCESS', supplier_id: 1 },
		});
		const resAdd = await node.execute.call(ctxAdd);
		assert.strictEqual(resAdd[0][0].json.success, true);
		assert.strictEqual(callsAdd[0].parameters.name, 'Supplier Ltd');

		const { context: ctxDel } = createMockContext({
			resource: 'productCatalog',
			operation: 'deleteInventorySupplier',
			params: { parameterMode: 'fields', supplier_id: 1 },
			mockResponse: { status: 'SUCCESS' },
		});
		const resDel = await node.execute.call(ctxDel);
		assert.strictEqual(resDel[0][0].json.success, true);
	});

	it('should execute payers operations (get, add, delete)', async () => {
		const { context: ctxGet } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryPayers',
			params: { parameterMode: 'fields', filter_name: 'Company Ltd' },
			mockResponse: { status: 'SUCCESS', payers: [{ payer_id: 1, name: 'Company Ltd' }] },
		});
		const resGet = await node.execute.call(ctxGet);
		assert.strictEqual(resGet[0][0].json.payer_id, 1);

		const { context: ctxAdd, capturedCalls: callsAdd } = createMockContext({
			resource: 'productCatalog',
			operation: 'addInventoryPayer',
			params: {
				parameterMode: 'fields',
				name: 'Company Ltd',
				city: 'London',
			},
			mockResponse: { status: 'SUCCESS', payer_id: 1 },
		});
		const resAdd = await node.execute.call(ctxAdd);
		assert.strictEqual(resAdd[0][0].json.success, true);
		assert.strictEqual(callsAdd[0].parameters.name, 'Company Ltd');

		const { context: ctxDel } = createMockContext({
			resource: 'productCatalog',
			operation: 'deleteInventoryPayer',
			params: { parameterMode: 'fields', payer_id: 1 },
			mockResponse: { status: 'SUCCESS' },
		});
		const resDel = await node.execute.call(ctxDel);
		assert.strictEqual(resDel[0][0].json.success, true);
	});

	// ----------------------------------
	// Inventory Documents
	// ----------------------------------
	it('should execute inventory documents operations (get, items, series, file, add, addItems, addFile, confirm)', async () => {
		const { context: ctxDocs } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryDocuments',
			params: { parameterMode: 'fields', filter_warehouse_id: 205 },
			mockResponse: { status: 'SUCCESS', documents: [{ document_id: 101, full_number: 'GRN/0001' }] },
		});
		const resDocs = await node.execute.call(ctxDocs);
		assert.strictEqual(resDocs[0][0].json.document_id, 101);

		const { context: ctxItems } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryDocumentItems',
			params: { parameterMode: 'fields', document_id: 101 },
			mockResponse: { status: 'SUCCESS', items: [{ item_id: 1, product_id: 5432, quantity: 5 }] },
		});
		const resItems = await node.execute.call(ctxItems);
		assert.strictEqual(resItems[0][0].json.product_id, 5432);

		const { context: ctxSeries } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryDocumentSeries',
			params: { parameterMode: 'fields', warehouse_id: 205 },
			mockResponse: { status: 'SUCCESS', series: [{ series_id: 3, name: 'GR Series' }] },
		});
		const resSeries = await node.execute.call(ctxSeries);
		assert.strictEqual(resSeries[0][0].json.series_id, 3);

		const { context: ctxFile } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryDocumentFile',
			params: { parameterMode: 'fields', document_id: 101, downloadAsBinary: true },
			mockResponse: { status: 'SUCCESS', file: 'data:application/pdf;base64,JVBERi0xLjQK' },
		});
		const resFile = await node.execute.call(ctxFile);
		assert.ok(resFile[0][0].binary?.data);

		const { context: ctxAdd } = createMockContext({
			resource: 'productCatalog',
			operation: 'addInventoryDocument',
			params: { parameterMode: 'fields', warehouse_id: 205, document_type: 2, notes: 'Goods issue' },
			mockResponse: { status: 'SUCCESS', document_id: 102 },
		});
		const resAdd = await node.execute.call(ctxAdd);
		assert.strictEqual(resAdd[0][0].json.success, true);

		const { context: ctxAddItems, capturedCalls: callsAddItems } = createMockContext({
			resource: 'productCatalog',
			operation: 'addInventoryDocumentItems',
			params: {
				parameterMode: 'fields',
				document_id: 102,
				items: '[{"product_id": 5432, "quantity": 5}]',
			},
			mockResponse: { status: 'SUCCESS' },
		});
		const resAddItems = await node.execute.call(ctxAddItems);
		assert.strictEqual(resAddItems[0][0].json.success, true);
		assert.deepStrictEqual(callsAddItems[0].parameters.items, [{ product_id: 5432, quantity: 5 }]);

		const { context: ctxAddFile } = createMockContext({
			resource: 'productCatalog',
			operation: 'addInventoryDocumentFile',
			params: { parameterMode: 'fields', document_id: 102, file: 'base64data', external_document_number: 'WZ/1' },
			mockResponse: { status: 'SUCCESS' },
		});
		const resAddFile = await node.execute.call(ctxAddFile);
		assert.strictEqual(resAddFile[0][0].json.success, true);

		const { context: ctxConf } = createMockContext({
			resource: 'productCatalog',
			operation: 'setInventoryDocumentStatusConfirmed',
			params: { parameterMode: 'fields', document_id: 102 },
			mockResponse: { status: 'SUCCESS' },
		});
		const resConf = await node.execute.call(ctxConf);
		assert.strictEqual(resConf[0][0].json.success, true);
	});

	// ----------------------------------
	// Purchase Orders
	// ----------------------------------
	it('should execute purchase orders operations (get, items, series, logs, file, add, addItems, addFile, deleteItems, setStatus)', async () => {
		const { context: ctxPOs } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryPurchaseOrders',
			params: { parameterMode: 'fields', filter_warehouse_id: 1 },
			mockResponse: { status: 'SUCCESS', orders: [{ order_id: 1234, name: 'Monthly delivery' }] },
		});
		const resPOs = await node.execute.call(ctxPOs);
		assert.strictEqual(resPOs[0][0].json.order_id, 1234);

		const { context: ctxItems } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryPurchaseOrderItems',
			params: { parameterMode: 'fields', purchase_order_id: 1234 },
			mockResponse: { status: 'SUCCESS', items: [{ item_id: 1001, quantity: 8 }] },
		});
		const resItems = await node.execute.call(ctxItems);
		assert.strictEqual(resItems[0][0].json.item_id, 1001);

		const { context: ctxSeries } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryPurchaseOrderSeries',
			params: { parameterMode: 'fields', warehouse_id: 1 },
			mockResponse: { status: 'SUCCESS', series: [{ series_id: 2, name: 'PO Series' }] },
		});
		const resSeries = await node.execute.call(ctxSeries);
		assert.strictEqual(resSeries[0][0].json.series_id, 2);

		const { context: ctxLogs } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryPurchaseOrderLogs',
			params: { parameterMode: 'fields', purchase_order_id: 1234 },
			mockResponse: { status: 'SUCCESS', logs: [{ date: 1700000000, profile: 'admin' }] },
		});
		const resLogs = await node.execute.call(ctxLogs);
		assert.strictEqual(resLogs[0][0].json.date, 1700000000);

		const { context: ctxFile } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryPurchaseOrderFile',
			params: { parameterMode: 'fields', purchase_order_id: 1234, downloadAsBinary: true },
			mockResponse: { status: 'SUCCESS', file: 'data:application/pdf;base64,JVBERi0xLjQK' },
		});
		const resFile = await node.execute.call(ctxFile);
		assert.ok(resFile[0][0].binary?.data);

		const { context: ctxAdd } = createMockContext({
			resource: 'productCatalog',
			operation: 'addInventoryPurchaseOrder',
			params: { parameterMode: 'fields', warehouse_id: 1, supplier_id: 5, currency: 'EUR' },
			mockResponse: { status: 'SUCCESS', order_id: 1235 },
		});
		const resAdd = await node.execute.call(ctxAdd);
		assert.strictEqual(resAdd[0][0].json.success, true);

		const { context: ctxAddItems } = createMockContext({
			resource: 'productCatalog',
			operation: 'addInventoryPurchaseOrderItems',
			params: { parameterMode: 'fields', order_id: 1235, items: '[{"product_id": 5432, "quantity": 5}]' },
			mockResponse: { status: 'SUCCESS' },
		});
		const resAddItems = await node.execute.call(ctxAddItems);
		assert.strictEqual(resAddItems[0][0].json.success, true);

		const { context: ctxAddFile } = createMockContext({
			resource: 'productCatalog',
			operation: 'addInventoryPurchaseOrderFile',
			params: { parameterMode: 'fields', purchase_order_id: 1235, file: 'base64', cost_invoice_no: 'FV/01' },
			mockResponse: { status: 'SUCCESS' },
		});
		const resAddFile = await node.execute.call(ctxAddFile);
		assert.strictEqual(resAddFile[0][0].json.success, true);

		const { context: ctxDelItems } = createMockContext({
			resource: 'productCatalog',
			operation: 'deleteInventoryPurchaseOrderItems',
			params: { parameterMode: 'fields', order_id: 1235, item_ids: '[1002, 1003]' },
			mockResponse: { status: 'SUCCESS' },
		});
		const resDelItems = await node.execute.call(ctxDelItems);
		assert.strictEqual(resDelItems[0][0].json.success, true);

		const { context: ctxStatus } = createMockContext({
			resource: 'productCatalog',
			operation: 'setInventoryPurchaseOrderStatus',
			params: { parameterMode: 'fields', order_id: 1235, status: 2 },
			mockResponse: { status: 'SUCCESS' },
		});
		const resStatus = await node.execute.call(ctxStatus);
		assert.strictEqual(resStatus[0][0].json.success, true);
	});

	// ----------------------------------
	// Transfers
	// ----------------------------------
	it('should execute transfers operations (get, items, series, add, addItems, setStatus)', async () => {
		const { context: ctxTrans } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryTransfers',
			params: { parameterMode: 'fields', filter_warehouse_id: 205 },
			mockResponse: { status: 'SUCCESS', transfers: [{ transfer_id: 452, name: 'Replenishment' }] },
		});
		const resTrans = await node.execute.call(ctxTrans);
		assert.strictEqual(resTrans[0][0].json.transfer_id, 452);

		const { context: ctxItems } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryTransferItems',
			params: { parameterMode: 'fields', transfer_id: 452 },
			mockResponse: { status: 'SUCCESS', items: [{ item_id: 1001, quantity: 10 }] },
		});
		const resItems = await node.execute.call(ctxItems);
		assert.strictEqual(resItems[0][0].json.item_id, 1001);

		const { context: ctxSeries } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryTransferSeries',
			params: { parameterMode: 'fields', warehouse_id: 205 },
			mockResponse: { status: 'SUCCESS', series: [{ series_id: 1, name: 'Transfer Series' }] },
		});
		const resSeries = await node.execute.call(ctxSeries);
		assert.strictEqual(resSeries[0][0].json.series_id, 1);

		const { context: ctxAdd } = createMockContext({
			resource: 'productCatalog',
			operation: 'addInventoryTransfer',
			params: { parameterMode: 'fields', warehouse_id: 205, target_warehouse_id: 310, name: 'March stock' },
			mockResponse: { status: 'SUCCESS', transfer_id: 453 },
		});
		const resAdd = await node.execute.call(ctxAdd);
		assert.strictEqual(resAdd[0][0].json.success, true);

		const { context: ctxAddItems } = createMockContext({
			resource: 'productCatalog',
			operation: 'addInventoryTransferItems',
			params: { parameterMode: 'fields', transfer_id: 453, items: '[{"product_id": 5432, "quantity": 10}]' },
			mockResponse: { status: 'SUCCESS' },
		});
		const resAddItems = await node.execute.call(ctxAddItems);
		assert.strictEqual(resAddItems[0][0].json.success, true);

		const { context: ctxStatus } = createMockContext({
			resource: 'productCatalog',
			operation: 'setInventoryTransferStatus',
			params: { parameterMode: 'fields', transfer_id: 453, status: 3 },
			mockResponse: { status: 'SUCCESS' },
		});
		const resStatus = await node.execute.call(ctxStatus);
		assert.strictEqual(resStatus[0][0].json.success, true);
	});

	// ----------------------------------
	// Stocktakes
	// ----------------------------------
	it('should execute stocktakes operations (get, items, series, add, addItems, setStatus)', async () => {
		const { context: ctxStock } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryStocktakes',
			params: { parameterMode: 'fields', filter_warehouse_id: 205 },
			mockResponse: { status: 'SUCCESS', stocktakes: [{ stocktake_id: 789, name: 'Full count' }] },
		});
		const resStock = await node.execute.call(ctxStock);
		assert.strictEqual(resStock[0][0].json.stocktake_id, 789);

		const { context: ctxItems } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryStocktakeItems',
			params: { parameterMode: 'fields', stocktake_id: 789 },
			mockResponse: { status: 'SUCCESS', items: [{ item_id: 1001, quantity: 12 }] },
		});
		const resItems = await node.execute.call(ctxItems);
		assert.strictEqual(resItems[0][0].json.item_id, 1001);

		const { context: ctxSeries } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryStocktakeSeries',
			params: { parameterMode: 'fields', warehouse_id: 205 },
			mockResponse: { status: 'SUCCESS', series: [{ series_id: 4, name: 'Stocktake Series' }] },
		});
		const resSeries = await node.execute.call(ctxSeries);
		assert.strictEqual(resSeries[0][0].json.series_id, 4);

		const { context: ctxAdd } = createMockContext({
			resource: 'productCatalog',
			operation: 'addInventoryStocktake',
			params: { parameterMode: 'fields', warehouse_id: 205, scope: 0, name: 'March stocktake' },
			mockResponse: { status: 'SUCCESS', stocktake_id: 790 },
		});
		const resAdd = await node.execute.call(ctxAdd);
		assert.strictEqual(resAdd[0][0].json.success, true);

		const { context: ctxAddItems } = createMockContext({
			resource: 'productCatalog',
			operation: 'addInventoryStocktakeItems',
			params: { parameterMode: 'fields', stocktake_id: 790, items: '[{"product_id": 5432, "quantity": 10}]' },
			mockResponse: { status: 'SUCCESS' },
		});
		const resAddItems = await node.execute.call(ctxAddItems);
		assert.strictEqual(resAddItems[0][0].json.success, true);

		const { context: ctxStatus } = createMockContext({
			resource: 'productCatalog',
			operation: 'setInventoryStocktakeStatus',
			params: { parameterMode: 'fields', stocktake_id: 790, status: 3 },
			mockResponse: { status: 'SUCCESS' },
		});
		const resStatus = await node.execute.call(ctxStatus);
		assert.strictEqual(resStatus[0][0].json.success, true);
	});

	// ----------------------------------
	// Fulfillment Deliveries
	// ----------------------------------
	it('should execute fulfillment deliveries operations (get, items, labels, add, addItems, submit)', async () => {
		const { context: ctxDels } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryFulfillmentDeliveries',
			params: { parameterMode: 'fields', warehouse_id: 1 },
			mockResponse: { status: 'SUCCESS', deliveries: [{ delivery_id: 42, name: 'March delivery' }] },
		});
		const resDels = await node.execute.call(ctxDels);
		assert.strictEqual(resDels[0][0].json.delivery_id, 42);

		const { context: ctxItems } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryFulfillmentDeliveryItems',
			params: { parameterMode: 'fields', delivery_id: 42 },
			mockResponse: { status: 'SUCCESS', items: [{ product_id: 101, quantity: 10 }] },
		});
		const resItems = await node.execute.call(ctxItems);
		assert.strictEqual(resItems[0][0].json.product_id, 101);

		const { context: ctxLabels } = createMockContext({
			resource: 'productCatalog',
			operation: 'getInventoryFulfillmentDeliveryLabels',
			params: { parameterMode: 'fields', delivery_id: 42, type: 'box', downloadAsBinary: true },
			mockResponse: { status: 'SUCCESS', file: 'data:application/pdf;base64,JVBERi0xLjQK' },
		});
		const resLabels = await node.execute.call(ctxLabels);
		assert.ok(resLabels[0][0].binary?.data);

		const { context: ctxAdd } = createMockContext({
			resource: 'productCatalog',
			operation: 'addInventoryFulfillmentDelivery',
			params: { parameterMode: 'fields', warehouse_id: 1, fulfillment_warehouse_id: 5, name: 'Delivery' },
			mockResponse: { status: 'SUCCESS', delivery_id: 43 },
		});
		const resAdd = await node.execute.call(ctxAdd);
		assert.strictEqual(resAdd[0][0].json.success, true);

		const { context: ctxAddItems } = createMockContext({
			resource: 'productCatalog',
			operation: 'addInventoryFulfillmentDeliveryItems',
			params: { parameterMode: 'fields', delivery_id: 43, items: '[{"product_id": 101, "quantity": 10}]' },
			mockResponse: { status: 'SUCCESS' },
		});
		const resAddItems = await node.execute.call(ctxAddItems);
		assert.strictEqual(resAddItems[0][0].json.success, true);

		const { context: ctxSubmit } = createMockContext({
			resource: 'productCatalog',
			operation: 'runInventoryFulfillmentDeliverySubmission',
			params: { parameterMode: 'fields', delivery_id: 43, date_arrival: 1772668800 },
			mockResponse: { status: 'SUCCESS' },
		});
		const resSubmit = await node.execute.call(ctxSubmit);
		assert.strictEqual(resSubmit[0][0].json.success, true);
	});

});
