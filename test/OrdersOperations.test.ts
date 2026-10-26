import { describe, it } from 'node:test';
import assert from 'node:assert';
import { BaseLinker } from '../nodes/BaseLinker/BaseLinker.node';

function createMockContext(options: {
	resource: string;
	operation: string;
	params?: Record<string, any>;
	mockResponse: any;
}) {
	const capturedCalls: Array<{ method: string; parameters: any }> = [];

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
				return options.mockResponse;
			},
		},
	};

	return { context: context as any, capturedCalls };
}

describe('Orders and Order Products operations', () => {
	const node = new BaseLinker();

	// 1. addOrder
	it('should execute addOrder in fields mode with products and custom fields', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orders',
			operation: 'addOrder',
			params: {
				addOrderMode: 'fields',
				order_status_id: 8060,
				currency: 'PLN',
				additionalFields: {
					email: 'customer@example.com',
					delivery_fullname: 'Anna Nowak',
					paid: true,
					date_add: '2026-03-25T10:00:00Z',
				},
				productsUi: {
					items: [
						{
							name: 'Keyboard RGB',
							price_brutto: 199.99,
							quantity: 1,
							tax_rate: 23,
							storage: 'db',
							sku: 'KB-01',
						},
					],
				},
				customExtraFieldsUi: {
					fields: [
						{ field_id: 'extra_vip', value: 'yes' },
					],
				},
			},
			mockResponse: { status: 'SUCCESS', order_id: 998877 },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].method, 'addOrder');
		assert.strictEqual(capturedCalls[0].parameters.order_status_id, 8060);
		assert.strictEqual(capturedCalls[0].parameters.currency, 'PLN');
		assert.strictEqual(capturedCalls[0].parameters.email, 'customer@example.com');
		assert.strictEqual(capturedCalls[0].parameters.products.length, 1);
		assert.strictEqual(capturedCalls[0].parameters.products[0].name, 'Keyboard RGB');
		assert.strictEqual(capturedCalls[0].parameters.custom_extra_fields.extra_vip, 'yes');
		assert.strictEqual(result[0][0].json.order_id, 998877);
		assert.strictEqual(result[0][0].json.success, true);
	});

	it('should execute addOrder in json mode', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orders',
			operation: 'addOrder',
			params: {
				addOrderMode: 'json',
				addOrderJson: JSON.stringify({
					order_status_id: 1234,
					currency: 'EUR',
					email: 'buyer@test.de',
					products: [{ name: 'Test Product', price_brutto: 10, quantity: 2 }],
				}),
			},
			mockResponse: { status: 'SUCCESS', order_id: 123456 },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].method, 'addOrder');
		assert.strictEqual(capturedCalls[0].parameters.currency, 'EUR');
		assert.strictEqual(result[0][0].json.order_id, 123456);
	});

	it('should throw error on invalid JSON in addOrder', async () => {
		const { context } = createMockContext({
			resource: 'orders',
			operation: 'addOrder',
			params: {
				addOrderMode: 'json',
				addOrderJson: '{ invalid json',
			},
			mockResponse: { status: 'SUCCESS' },
		});

		await assert.rejects(async () => {
			await node.execute.call(context);
		}, /Invalid JSON in Parameters/);
	});

	// 2. addOrderBySplit
	it('should execute addOrderBySplit in fields mode', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orders',
			operation: 'addOrderBySplit',
			params: {
				addOrderBySplitMode: 'fields',
				order_id: 112233,
				itemsToSplitUi: {
					items: [
						{ order_product_id: 4455, quantity: 2 },
					],
				},
				delivery_cost_to_split: 12.5,
			},
			mockResponse: { status: 'SUCCESS', new_order_id: 112234 },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].method, 'addOrderBySplit');
		assert.strictEqual(capturedCalls[0].parameters.order_id, 112233);
		assert.strictEqual(capturedCalls[0].parameters.items_to_split[0].order_product_id, 4455);
		assert.strictEqual(capturedCalls[0].parameters.delivery_cost_to_split, 12.5);
		assert.strictEqual(result[0][0].json.new_order_id, 112234);
		assert.strictEqual(result[0][0].json.original_order_id, 112233);
	});

	it('should execute addOrderBySplit in json mode', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orders',
			operation: 'addOrderBySplit',
			params: {
				addOrderBySplitMode: 'json',
				addOrderBySplitJson: JSON.stringify({
					order_id: 9988,
					items_to_split: [{ order_product_id: 77, quantity: 1 }],
				}),
			},
			mockResponse: { status: 'SUCCESS', new_order_id: 9989 },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].method, 'addOrderBySplit');
		assert.strictEqual(result[0][0].json.new_order_id, 9989);
	});

	// 3. addOrderDuplicate
	it('should execute addOrderDuplicate in fields mode', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orders',
			operation: 'addOrderDuplicate',
			params: {
				addOrderDuplicateMode: 'fields',
				order_id: 554433,
			},
			mockResponse: { status: 'SUCCESS', order_id: 554434 },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].method, 'addOrderDuplicate');
		assert.strictEqual(capturedCalls[0].parameters.order_id, 554433);
		assert.strictEqual(result[0][0].json.order_id, 554434);
		assert.strictEqual(result[0][0].json.original_order_id, 554433);
	});

	// 4. deleteOrders
	it('should execute deleteOrders in fields mode with comma-separated IDs', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orders',
			operation: 'deleteOrders',
			params: {
				deleteOrdersMode: 'fields',
				order_ids: '1001, 1002, 1003',
			},
			mockResponse: { status: 'SUCCESS', deleted_order_ids: [1001, 1002, 1003] },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].method, 'deleteOrders');
		assert.deepStrictEqual(capturedCalls[0].parameters.order_ids, [1001, 1002, 1003]);
		assert.deepStrictEqual(result[0][0].json.deleted_order_ids, [1001, 1002, 1003]);
	});

	it('should execute deleteOrders in json mode', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orders',
			operation: 'deleteOrders',
			params: {
				deleteOrdersMode: 'json',
				deleteOrdersJson: JSON.stringify({ order_ids: [2001, 2002] }),
			},
			mockResponse: { status: 'SUCCESS', deleted_order_ids: [2001, 2002] },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].method, 'deleteOrders');
		assert.deepStrictEqual(capturedCalls[0].parameters.order_ids, [2001, 2002]);
		assert.deepStrictEqual(result[0][0].json.deleted_order_ids, [2001, 2002]);
	});

	// 5. setOrdersMerge
	it('should execute setOrdersMerge in fields mode', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orders',
			operation: 'setOrdersMerge',
			params: {
				setOrdersMergeMode: 'fields',
				main_order_id: 3001,
				order_ids_to_merge: '3002, 3003',
				merge_mode: 'into_main_order',
				sum_delivery_costs: true,
			},
			mockResponse: { status: 'SUCCESS', merged_order_id: 3001 },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].method, 'setOrdersMerge');
		assert.strictEqual(capturedCalls[0].parameters.main_order_id, 3001);
		assert.deepStrictEqual(capturedCalls[0].parameters.order_ids_to_merge, [3002, 3003]);
		assert.strictEqual(capturedCalls[0].parameters.merge_mode, 'into_main_order');
		assert.strictEqual(capturedCalls[0].parameters.sum_delivery_costs, true);
		assert.strictEqual(result[0][0].json.merged_order_id, 3001);
	});

	// 6. addOrderProduct
	it('should execute addOrderProduct in fields mode', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orders',
			operation: 'addOrderProduct',
			params: {
				addOrderProductMode: 'fields',
				order_id: 4001,
				name: 'Gaming Headset',
				price_brutto: 89.99,
				quantity: 1,
				additionalFields: {
					sku: 'GH-89',
					tax_rate: 23,
					storage: 'db',
				},
			},
			mockResponse: { status: 'SUCCESS', order_product_id: 556677 },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].method, 'addOrderProduct');
		assert.strictEqual(capturedCalls[0].parameters.order_id, 4001);
		assert.strictEqual(capturedCalls[0].parameters.name, 'Gaming Headset');
		assert.strictEqual(capturedCalls[0].parameters.sku, 'GH-89');
		assert.strictEqual(result[0][0].json.order_product_id, 556677);
	});

	it('should execute addOrderProduct in json mode', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orders',
			operation: 'addOrderProduct',
			params: {
				addOrderProductMode: 'json',
				addOrderProductJson: JSON.stringify({
					order_id: 4002,
					name: 'Mousepad',
					price_brutto: 19.99,
					quantity: 2,
				}),
			},
			mockResponse: { status: 'SUCCESS', order_product_id: 556678 },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].method, 'addOrderProduct');
		assert.strictEqual(result[0][0].json.order_product_id, 556678);
	});

	// 7. deleteOrderProduct
	it('should execute deleteOrderProduct in fields mode', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orders',
			operation: 'deleteOrderProduct',
			params: {
				deleteOrderProductMode: 'fields',
				order_id: 5001,
				order_product_id: 6001,
			},
			mockResponse: { status: 'SUCCESS' },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].method, 'deleteOrderProduct');
		assert.strictEqual(capturedCalls[0].parameters.order_id, 5001);
		assert.strictEqual(capturedCalls[0].parameters.order_product_id, 6001);
		assert.strictEqual(result[0][0].json.success, true);
	});

	// 8. setOrderProductFields
	it('should execute setOrderProductFields in fields mode', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orders',
			operation: 'setOrderProductFields',
			params: {
				setOrderProductFieldsMode: 'fields',
				order_id: 7001,
				order_product_id: 8001,
				updateProductFields: {
					quantity: 5,
					price_brutto: 15.5,
					attributes: 'Color: Red',
				},
			},
			mockResponse: { status: 'SUCCESS' },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].method, 'setOrderProductFields');
		assert.strictEqual(capturedCalls[0].parameters.order_id, 7001);
		assert.strictEqual(capturedCalls[0].parameters.order_product_id, 8001);
		assert.strictEqual(capturedCalls[0].parameters.quantity, 5);
		assert.strictEqual(capturedCalls[0].parameters.price_brutto, 15.5);
		assert.strictEqual(capturedCalls[0].parameters.attributes, 'Color: Red');
		assert.strictEqual(result[0][0].json.success, true);
	});

	// 9. setOrderPayment
	it('should execute setOrderPayment in fields mode with date normalization', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orders',
			operation: 'setOrderPayment',
			params: {
				setOrderPaymentMode: 'fields',
				order_id: 9001,
				payment_done: 250.75,
				additionalFields: {
					payment_date: '2026-04-10T12:00:00Z',
					payment_comment: 'Bank transfer Santander',
					external_payment_id: 'EXT-PAY-99',
				},
			},
			mockResponse: { status: 'SUCCESS' },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].method, 'setOrderPayment');
		assert.strictEqual(capturedCalls[0].parameters.order_id, 9001);
		assert.strictEqual(capturedCalls[0].parameters.payment_done, 250.75);
		assert.strictEqual(typeof capturedCalls[0].parameters.payment_date, 'number');
		assert.strictEqual(capturedCalls[0].parameters.payment_comment, 'Bank transfer Santander');
		assert.strictEqual(capturedCalls[0].parameters.external_payment_id, 'EXT-PAY-99');
		assert.strictEqual(result[0][0].json.success, true);
		assert.strictEqual(result[0][0].json.payment_done, 250.75);
	});

	it('should execute setOrderPayment in json mode', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orders',
			operation: 'setOrderPayment',
			params: {
				setOrderPaymentMode: 'json',
				setOrderPaymentJson: JSON.stringify({
					order_id: 9002,
					payment_done: 100,
					payment_comment: 'Cash on delivery',
				}),
			},
			mockResponse: { status: 'SUCCESS' },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].method, 'setOrderPayment');
		assert.strictEqual(capturedCalls[0].parameters.order_id, 9002);
		assert.strictEqual(result[0][0].json.success, true);
	});

	it('should throw error when order_id or payment_done is missing in setOrderPayment', async () => {
		const { context } = createMockContext({
			resource: 'orders',
			operation: 'setOrderPayment',
			params: {
				setOrderPaymentMode: 'json',
				setOrderPaymentJson: JSON.stringify({
					order_id: 9003,
				}),
			},
			mockResponse: { status: 'SUCCESS' },
		});

		await assert.rejects(async () => {
			await node.execute.call(context);
		}, /Parameters "order_id" and "payment_done" are required/);
	});
});
