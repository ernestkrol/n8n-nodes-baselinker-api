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

describe('Orders Extended operations (Lookups, PickLists & PickPack)', () => {
	const node = new BaseLinker();

	// 1. getOrdersByEmail
	it('should execute getOrdersByEmail', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orders',
			operation: 'getOrdersByEmail',
			params: {
				orderByEmail: 'buyer@example.com',
			},
			mockResponse: {
				status: 'SUCCESS',
				orders: [
					{ order_id: 101, date_add: 1600000000 },
					{ order_id: 102, date_add: 1600001000 },
				],
			},
		});

		const result = await node.execute.call(context);
		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].method, 'getOrdersByEmail');
		assert.deepStrictEqual(capturedCalls[0].parameters, { email: 'buyer@example.com' });

		assert.strictEqual(result[0].length, 2);
		assert.strictEqual(result[0][0].json.order_id, 101);
		assert.strictEqual(result[0][0].json.email, 'buyer@example.com');
		assert.strictEqual(result[0][1].json.order_id, 102);
	});

	// 2. getOrdersByPhone
	it('should execute getOrdersByPhone', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orders',
			operation: 'getOrdersByPhone',
			params: {
				orderByPhone: '+48123456789',
			},
			mockResponse: {
				status: 'SUCCESS',
				orders: [
					{ order_id: 201, date_add: 1600002000 },
				],
			},
		});

		const result = await node.execute.call(context);
		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].method, 'getOrdersByPhone');
		assert.deepStrictEqual(capturedCalls[0].parameters, { phone: '+48123456789' });

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.order_id, 201);
		assert.strictEqual(result[0][0].json.phone, '+48123456789');
	});

	// 3. getOrderTransactionData
	it('should execute getOrderTransactionData', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orders',
			operation: 'getOrderTransactionData',
			params: {
				transactionDataOrderId: 301,
				includeComplexTaxes: true,
				includeAmazonData: false,
			},
			mockResponse: {
				status: 'SUCCESS',
				transaction_id: 'TX-999',
				payment_method: 'PayU',
				taxes: { vat: 23 },
			},
		});

		const result = await node.execute.call(context);
		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].method, 'getOrderTransactionData');
		assert.deepStrictEqual(capturedCalls[0].parameters, {
			order_id: 301,
			include_complex_taxes: true,
			include_amazon_data: false,
		});

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.order_id, 301);
		assert.strictEqual(result[0][0].json.transaction_id, 'TX-999');
	});

	// 4. getOrderPrintoutTemplates
	it('should execute getOrderPrintoutTemplates in node execute', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orders',
			operation: 'getOrderPrintoutTemplates',
			mockResponse: {
				status: 'SUCCESS',
				printouts: [
					{ printout_id: 1, name: 'Standard Order Sheet', file_format: 'pdf', language: 'pl' },
					{ printout_id: 2, name: 'Packing Slip EN', file_format: 'pdf', language: 'en' },
				],
			},
		});

		const result = await node.execute.call(context);
		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].method, 'getOrderPrintoutTemplates');
		assert.strictEqual(result[0].length, 2);
		assert.strictEqual(result[0][0].json.name, 'Standard Order Sheet');
	});

	// 5. getOrderPrintoutTemplates loadOptions
	it('should load options for getOrderPrintoutTemplates', async () => {
		const capturedCalls: Array<{ method: string; parameters: any }> = [];
		const loadOptionsContext = {
			getNode: () => ({ name: 'baseLinkerMock' }),
			getCredentials: async () => ({ token: 'mock-token' }),
			helpers: {
				httpRequest: async (reqOptions: any) => {
					const bodyStr = reqOptions.body.toString();
					const params = new URLSearchParams(bodyStr);
					capturedCalls.push({
						method: params.get('method') || '',
						parameters: JSON.parse(params.get('parameters') || '{}'),
					});
					return {
						status: 'SUCCESS',
						printouts: [
							{ printout_id: 15, name: 'Invoice Printout', file_format: 'pdf', language: 'pl' },
						],
					};
				},
			},
		};

		const options = await (node.methods!.loadOptions!.getOrderPrintoutTemplates as any).call(loadOptionsContext);
		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].method, 'getOrderPrintoutTemplates');
		assert.strictEqual(options.length, 1);
		assert.strictEqual(options[0].name, 'Invoice Printout (ID: 15)');
		assert.strictEqual(options[0].value, 15);
	});

	// 6. runOrderMacroTrigger
	it('should execute runOrderMacroTrigger', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orders',
			operation: 'runOrderMacroTrigger',
			params: {
				macroTriggerOrderId: 401,
				macroTriggerId: 99,
			},
			mockResponse: {
				status: 'SUCCESS',
			},
		});

		const result = await node.execute.call(context);
		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].method, 'runOrderMacroTrigger');
		assert.deepStrictEqual(capturedCalls[0].parameters, {
			order_id: 401,
			trigger_id: 99,
		});

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.success, true);
		assert.strictEqual(result[0][0].json.order_id, 401);
		assert.strictEqual(result[0][0].json.trigger_id, 99);
	});

	// 7. addOrderPickList
	it('should execute addOrderPickList with JSON array and comma-separated string', async () => {
		// Test JSON array string
		const { context: context1, capturedCalls: calls1 } = createMockContext({
			resource: 'orders',
			operation: 'addOrderPickList',
			params: {
				pickListOrderIds: '[501, 502, 503]',
			},
			mockResponse: {
				status: 'SUCCESS',
				pick_list_id: 12,
			},
		});

		const result1 = await node.execute.call(context1);
		assert.strictEqual(calls1.length, 1);
		assert.strictEqual(calls1[0].method, 'addOrderPickList');
		assert.deepStrictEqual(calls1[0].parameters, { order_ids: [501, 502, 503] });
		assert.strictEqual(result1[0][0].json.pick_list_id, 12);

		// Test comma separated string
		const { context: context2, capturedCalls: calls2 } = createMockContext({
			resource: 'orders',
			operation: 'addOrderPickList',
			params: {
				pickListOrderIds: '504, 505',
			},
			mockResponse: {
				status: 'SUCCESS',
				pick_list_id: 13,
			},
		});

		const result2 = await node.execute.call(context2);
		assert.strictEqual(calls2.length, 1);
		assert.deepStrictEqual(calls2[0].parameters, { order_ids: [504, 505] });
		assert.strictEqual(result2[0][0].json.pick_list_id, 13);
	});

	// 8. getOrderPickLists (single mode and paginated all mode)
	it('should execute getOrderPickLists in single mode', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orders',
			operation: 'getOrderPickLists',
			params: {
				pickListsFilterMode: 'single',
				pickListsPickListId: 10,
			},
			mockResponse: {
				status: 'SUCCESS',
				picklists: [
					{ pick_list_id: 10, name: 'Batch 10', date_add: 1600000000, total_orders: 5 },
				],
			},
		});

		const result = await node.execute.call(context);
		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].method, 'getOrderPickLists');
		assert.deepStrictEqual(capturedCalls[0].parameters, { pick_list_id: 10 });
		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.pick_list_id, 10);
	});

	it('should execute getOrderPickLists in all mode with pagination cursor', async () => {
		const page1 = {
			status: 'SUCCESS',
			picklists: Array.from({ length: 100 }, (_, idx) => ({
				pick_list_id: idx + 1,
				name: `PL ${idx + 1}`,
			})),
		};
		const page2 = {
			status: 'SUCCESS',
			picklists: [
				{ pick_list_id: 101, name: 'PL 101' },
			],
		};

		const { context, capturedCalls } = createMockContext({
			resource: 'orders',
			operation: 'getOrderPickLists',
			params: {
				pickListsFilterMode: 'all',
				pickListsReturnAll: true,
				pickListsDelayMs: 0,
			},
			mockResponses: [page1, page2],
		});

		const result = await node.execute.call(context);
		assert.strictEqual(capturedCalls.length, 2);
		assert.strictEqual(capturedCalls[0].method, 'getOrderPickLists');
		assert.deepStrictEqual(capturedCalls[0].parameters, {});
		assert.deepStrictEqual(capturedCalls[1].parameters, { id_from: 101 });

		assert.strictEqual(result[0].length, 101);
		assert.strictEqual(result[0][0].json.pick_list_id, 1);
		assert.strictEqual(result[0][99].json.pick_list_id, 100);
		assert.strictEqual(result[0][100].json.pick_list_id, 101);
	});

	// 9. getOrderPickPackHistory
	it('should execute getOrderPickPackHistory', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orders',
			operation: 'getOrderPickPackHistory',
			params: {
				pickPackHistoryOrderId: 601,
				pickPackHistoryActionType: 2,
			},
			mockResponse: {
				status: 'SUCCESS',
				history: [
					{
						action_id: 1,
						action_type: 2,
						date: 1600005000,
						user_login: 'warehouse_user_1',
						product_id: 88,
					},
				],
			},
		});

		const result = await node.execute.call(context);
		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].method, 'getOrderPickPackHistory');
		assert.deepStrictEqual(capturedCalls[0].parameters, {
			order_id: 601,
			action_type: 2,
		});

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.order_id, 601);
		assert.strictEqual(result[0][0].json.action_id, 1);
		assert.strictEqual(result[0][0].json.user_login, 'warehouse_user_1');
	});

	// 10. getPickPackCarts node execute
	it('should execute getPickPackCarts in node execute', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orders',
			operation: 'getPickPackCarts',
			mockResponse: {
				status: 'SUCCESS',
				carts: [
					{ cart_id: 1, name: 'Cart Red', color: '#ff0000', total_orders: 4 },
					{ cart_id: 2, name: 'Cart Blue', color: '#0000ff', total_orders: 2 },
				],
			},
		});

		const result = await node.execute.call(context);
		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].method, 'getPickPackCarts');
		assert.strictEqual(result[0].length, 2);
		assert.strictEqual(result[0][0].json.cart_id, 1);
		assert.strictEqual(result[0][1].json.name, 'Cart Blue');
	});

	// 11. getPickPackCarts loadOptions
	it('should load options for getPickPackCarts', async () => {
		const capturedCalls: Array<{ method: string; parameters: any }> = [];
		const loadOptionsContext = {
			getNode: () => ({ name: 'baseLinkerMock' }),
			getCredentials: async () => ({ token: 'mock-token' }),
			helpers: {
				httpRequest: async (reqOptions: any) => {
					const bodyStr = reqOptions.body.toString();
					const params = new URLSearchParams(bodyStr);
					capturedCalls.push({
						method: params.get('method') || '',
						parameters: JSON.parse(params.get('parameters') || '{}'),
					});
					return {
						status: 'SUCCESS',
						carts: [
							{ cart_id: 5, name: 'Cart 5', color: 'green' },
						],
					};
				},
			},
		};

		const options = await (node.methods!.loadOptions!.getPickPackCarts as any).call(loadOptionsContext);
		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].method, 'getPickPackCarts');
		assert.strictEqual(options.length, 1);
		assert.strictEqual(options[0].name, 'Cart 5 (ID: 5)');
		assert.strictEqual(options[0].value, 5);
		assert.strictEqual(options[0].description, 'Color: green');
	});

	// 12. addPickPackCart (create & update)
	it('should execute addPickPackCart to create new cart', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orders',
			operation: 'addPickPackCart',
			params: {
				cartName: 'Trolley 3',
				cartColor: '#00FF00',
			},
			mockResponse: {
				status: 'SUCCESS',
				cart_id: 33,
			},
		});

		const result = await node.execute.call(context);
		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].method, 'addPickPackCart');
		assert.deepStrictEqual(capturedCalls[0].parameters, {
			name: 'Trolley 3',
			color: '#00FF00',
		});
		assert.strictEqual(result[0][0].json.success, true);
		assert.strictEqual(result[0][0].json.cart_id, 33);
	});

	it('should execute addPickPackCart to update existing cart', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orders',
			operation: 'addPickPackCart',
			params: {
				cartUpdateId: 33,
				cartName: 'Trolley 3 Updated',
			},
			mockResponse: {
				status: 'SUCCESS',
				cart_id: 33,
			},
		});

		const result = await node.execute.call(context);
		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].method, 'addPickPackCart');
		assert.deepStrictEqual(capturedCalls[0].parameters, {
			cart_id: 33,
			name: 'Trolley 3 Updated',
		});
		assert.strictEqual(result[0][0].json.cart_id, 33);
	});

	// 13. deletePickPackCart
	it('should execute deletePickPackCart', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orders',
			operation: 'deletePickPackCart',
			params: {
				deleteCartId: 33,
			},
			mockResponse: {
				status: 'SUCCESS',
			},
		});

		const result = await node.execute.call(context);
		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].method, 'deletePickPackCart');
		assert.deepStrictEqual(capturedCalls[0].parameters, { cart_id: 33 });
		assert.strictEqual(result[0][0].json.success, true);
		assert.strictEqual(result[0][0].json.cart_id, 33);
	});

	// 14. getPickPackCartOrders
	it('should execute getPickPackCartOrders', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orders',
			operation: 'getPickPackCartOrders',
			params: {
				cartOrdersCartId: 44,
			},
			mockResponse: {
				status: 'SUCCESS',
				orders: [701, 702, 703],
				total_count: 3,
			},
		});

		const result = await node.execute.call(context);
		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].method, 'getPickPackCartOrders');
		assert.deepStrictEqual(capturedCalls[0].parameters, { cart_id: 44 });
		assert.strictEqual(result[0][0].json.cart_id, 44);
		assert.deepStrictEqual(result[0][0].json.orders, [701, 702, 703]);
		assert.strictEqual(result[0][0].json.total_count, 3);
	});

	// 15. getPickPackOrderCart
	it('should execute getPickPackOrderCart', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orders',
			operation: 'getPickPackOrderCart',
			params: {
				orderCartOrderId: 801,
			},
			mockResponse: {
				status: 'SUCCESS',
				cart_id: 44,
				cart_name: 'Trolley 44',
				cart_color: 'yellow',
			},
		});

		const result = await node.execute.call(context);
		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].method, 'getPickPackOrderCart');
		assert.deepStrictEqual(capturedCalls[0].parameters, { order_id: 801 });
		assert.strictEqual(result[0][0].json.order_id, 801);
		assert.strictEqual(result[0][0].json.cart_id, 44);
		assert.strictEqual(result[0][0].json.cart_name, 'Trolley 44');
		assert.strictEqual(result[0][0].json.cart_color, 'yellow');
	});

	// 16. addPickPackOrdersToCart
	it('should execute addPickPackOrdersToCart', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orders',
			operation: 'addPickPackOrdersToCart',
			params: {
				assignOrdersCartId: 44,
				assignOrdersOrderIds: '801, 802',
			},
			mockResponse: {
				status: 'SUCCESS',
				orders_assigned: 2,
				orders_failed: [],
			},
		});

		const result = await node.execute.call(context);
		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].method, 'addPickPackOrdersToCart');
		assert.deepStrictEqual(capturedCalls[0].parameters, {
			cart_id: 44,
			order_ids: [801, 802],
		});
		assert.strictEqual(result[0][0].json.success, true);
		assert.strictEqual(result[0][0].json.cart_id, 44);
		assert.strictEqual(result[0][0].json.orders_assigned, 2);
	});

	// 17. deletePickPackCartOrders
	it('should execute deletePickPackCartOrders', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orders',
			operation: 'deletePickPackCartOrders',
			params: {
				clearCartId: 44,
			},
			mockResponse: {
				status: 'SUCCESS',
				orders_removed: 2,
			},
		});

		const result = await node.execute.call(context);
		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].method, 'deletePickPackCartOrders');
		assert.deepStrictEqual(capturedCalls[0].parameters, { cart_id: 44 });
		assert.strictEqual(result[0][0].json.success, true);
		assert.strictEqual(result[0][0].json.cart_id, 44);
		assert.strictEqual(result[0][0].json.orders_removed, 2);
	});

	// 18. deletePickPackOrderFromCart
	it('should execute deletePickPackOrderFromCart', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orders',
			operation: 'deletePickPackOrderFromCart',
			params: {
				removeOrderCartOrderId: 801,
			},
			mockResponse: {
				status: 'SUCCESS',
			},
		});

		const result = await node.execute.call(context);
		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].method, 'deletePickPackOrderFromCart');
		assert.deepStrictEqual(capturedCalls[0].parameters, { order_id: 801 });
		assert.strictEqual(result[0][0].json.success, true);
		assert.strictEqual(result[0][0].json.order_id, 801);
	});
});
