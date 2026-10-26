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

describe('Order Returns operations', () => {
	const node = new BaseLinker();

	// 1. getOrderReturns
	it('should execute getOrderReturns in UI fields mode', async () => {
		const mockReturns = [
			{
				return_id: 101,
				order_id: 202,
				status_id: 1,
				email: 'customer@example.com',
				currency: 'PLN',
			},
		];

		const { context, capturedCalls } = createMockContext({
			resource: 'orderReturns',
			operation: 'getOrderReturns',
			params: {
				parameterMode: 'fields',
				returnAll: false,
				limit: 10,
				return_id: 101,
				order_id: 202,
				id_from: 100,
				date_from: 1700000000,
				status_id: 1,
				filter_order_return_source: 'allegro',
				filter_order_return_source_id: 5,
				include_custom_extra_fields: true,
				include_connect_data: true,
			},
			mockResponse: { status: 'SUCCESS', returns: mockReturns },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.return_id, 101);
		assert.strictEqual(result[0][0].json.email, 'customer@example.com');
		assert.strictEqual(capturedCalls[0].method, 'getOrderReturns');
		assert.strictEqual(capturedCalls[0].parameters.return_id, 101);
		assert.strictEqual(capturedCalls[0].parameters.order_id, 202);
		assert.strictEqual(capturedCalls[0].parameters.id_from, 100);
		assert.strictEqual(capturedCalls[0].parameters.date_from, 1700000000);
		assert.strictEqual(capturedCalls[0].parameters.status_id, 1);
		assert.strictEqual(capturedCalls[0].parameters.filter_order_return_source, 'allegro');
		assert.strictEqual(capturedCalls[0].parameters.filter_order_return_source_id, 5);
		assert.strictEqual(capturedCalls[0].parameters.include_custom_extra_fields, true);
		assert.strictEqual(capturedCalls[0].parameters.include_connect_data, true);
	});

	it('should execute getOrderReturns in JSON mode', async () => {
		const mockReturns = [{ return_id: 301, currency: 'EUR' }];

		const { context, capturedCalls } = createMockContext({
			resource: 'orderReturns',
			operation: 'getOrderReturns',
			params: {
				parameterMode: 'json',
				parametersJson: JSON.stringify({ id_from: 300, status_id: 2 }),
			},
			mockResponse: { status: 'SUCCESS', returns: mockReturns },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.return_id, 301);
		assert.strictEqual(capturedCalls[0].method, 'getOrderReturns');
		assert.strictEqual(capturedCalls[0].parameters.id_from, 300);
		assert.strictEqual(capturedCalls[0].parameters.status_id, 2);
	});

	it('should paginate getOrderReturns when returnAll is true', async () => {
		const page1 = Array.from({ length: 100 }, (_, i) => ({
			return_id: 1000 + i,
			status_id: 1,
		}));
		const page2 = Array.from({ length: 30 }, (_, i) => ({
			return_id: 1100 + i,
			status_id: 1,
		}));

		const { context, capturedCalls } = createMockContext({
			resource: 'orderReturns',
			operation: 'getOrderReturns',
			params: {
				parameterMode: 'fields',
				returnAll: true,
				limit: 200,
				paginationField: 'id_from',
				delayMs: 0,
			},
			mockResponses: [
				{ status: 'SUCCESS', returns: page1 },
				{ status: 'SUCCESS', returns: page2 },
			],
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 130);
		assert.strictEqual(capturedCalls.length, 2);
		assert.strictEqual(capturedCalls[0].method, 'getOrderReturns');
		assert.strictEqual(capturedCalls[1].parameters.id_from, 1100);
	});

	// 2. getOrderReturnExtraFields
	it('should execute getOrderReturnExtraFields', async () => {
		const mockExtraFields = [
			{ extra_field_id: 1, name: 'Fault Reason', editor_type: 'text' },
			{ extra_field_id: 2, name: 'Refund Type', editor_type: 'select', options: ['Bank', 'Voucher'] },
		];

		const { context, capturedCalls } = createMockContext({
			resource: 'orderReturns',
			operation: 'getOrderReturnExtraFields',
			mockResponse: { status: 'SUCCESS', extra_fields: mockExtraFields },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 2);
		assert.strictEqual(result[0][0].json.name, 'Fault Reason');
		assert.strictEqual(capturedCalls[0].method, 'getOrderReturnExtraFields');
	});

	// 3. addOrderReturn
	it('should execute addOrderReturn in UI fields mode with custom fields and products', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orderReturns',
			operation: 'addOrderReturn',
			params: {
				parameterMode: 'fields',
				status_id: 10,
				currency: 'PLN',
				order_id: 999,
				custom_source_id: 1,
				reference_number: 'REF-1234',
				date_add: 1700000000,
				refunded: true,
				admin_comments: 'Return processed',
				email: 'buyer@example.com',
				phone: '+48111222333',
				user_login: 'buyer_login',
				delivery_price: 15.5,
				delivery_fullname: 'Jan Kowalski',
				delivery_company: 'JanCorp',
				delivery_address: 'Prosta 1',
				delivery_postcode: '00-001',
				delivery_city: 'Warszawa',
				delivery_state: 'Mazowieckie',
				delivery_country_code: 'PL',
				extra_field_1: 'Val1',
				extra_field_2: 'Val2',
				refund_account_number: '1234567890',
				refund_iban: 'PL1234567890',
				refund_swift: 'BPKOPLPW',
				customExtraFieldsUi: {
					fields: [{ field_id: '50', value: 'Special Handle' }],
				},
				productsUi: {
					items: [
						{
							name: 'Keyboard',
							quantity: 1,
							price_brutto: 199.99,
							tax_rate: 23,
							order_product_id: 555,
							storage: 'db',
							storage_id: '0',
							sku: 'KB-1',
							ean: '1234567890123',
						},
					],
				},
			},
			mockResponse: { status: 'SUCCESS', return_id: 501 },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0][0].json.return_id, 501);
		assert.strictEqual(capturedCalls[0].method, 'addOrderReturn');
		assert.strictEqual(capturedCalls[0].parameters.status_id, 10);
		assert.strictEqual(capturedCalls[0].parameters.currency, 'PLN');
		assert.strictEqual(capturedCalls[0].parameters.order_id, 999);
		assert.strictEqual(capturedCalls[0].parameters.refunded, true);
		assert.strictEqual(capturedCalls[0].parameters.custom_extra_fields['50'], 'Special Handle');
		assert.strictEqual(capturedCalls[0].parameters.products.length, 1);
		assert.strictEqual(capturedCalls[0].parameters.products[0].name, 'Keyboard');
	});

	it('should execute addOrderReturn in JSON mode', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orderReturns',
			operation: 'addOrderReturn',
			params: {
				parameterMode: 'json',
				parametersJson: JSON.stringify({
					status_id: 5,
					currency: 'EUR',
					email: 'json@example.com',
				}),
			},
			mockResponse: { status: 'SUCCESS', return_id: 502 },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0][0].json.return_id, 502);
		assert.strictEqual(capturedCalls[0].method, 'addOrderReturn');
		assert.strictEqual(capturedCalls[0].parameters.status_id, 5);
		assert.strictEqual(capturedCalls[0].parameters.currency, 'EUR');
	});

	// 4. setOrderReturnFields
	it('should execute setOrderReturnFields in UI fields mode', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orderReturns',
			operation: 'setOrderReturnFields',
			params: {
				parameterMode: 'fields',
				return_id: 501,
				admin_comments: 'Updated seller note',
				delivery_city: 'Krakow',
				customExtraFieldsUi: {
					fields: [{ field_id: '12', value: 'Updated Custom Value' }],
				},
			},
			mockResponse: { status: 'SUCCESS' },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0][0].json.status, 'SUCCESS');
		assert.strictEqual(capturedCalls[0].method, 'setOrderReturnFields');
		assert.strictEqual(capturedCalls[0].parameters.return_id, 501);
		assert.strictEqual(capturedCalls[0].parameters.admin_comments, 'Updated seller note');
		assert.strictEqual(capturedCalls[0].parameters.delivery_city, 'Krakow');
		assert.strictEqual(capturedCalls[0].parameters.custom_extra_fields['12'], 'Updated Custom Value');
	});

	it('should execute setOrderReturnFields in JSON mode', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orderReturns',
			operation: 'setOrderReturnFields',
			params: {
				parameterMode: 'json',
				parametersJson: JSON.stringify({ return_id: 501, email: 'updated@example.com' }),
			},
			mockResponse: { status: 'SUCCESS' },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0][0].json.status, 'SUCCESS');
		assert.strictEqual(capturedCalls[0].method, 'setOrderReturnFields');
		assert.strictEqual(capturedCalls[0].parameters.return_id, 501);
		assert.strictEqual(capturedCalls[0].parameters.email, 'updated@example.com');
	});

	// 5. addOrderReturnProduct
	it('should execute addOrderReturnProduct in UI fields mode', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orderReturns',
			operation: 'addOrderReturnProduct',
			params: {
				parameterMode: 'fields',
				return_id: 501,
				name: 'Mouse',
				price_brutto: 49.99,
				quantity: 2,
				tax_rate: 23,
				storage: 'db',
				storage_id: '0',
				sku: 'MS-2',
			},
			mockResponse: { status: 'SUCCESS', order_return_product_id: 777 },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0][0].json.order_return_product_id, 777);
		assert.strictEqual(capturedCalls[0].method, 'addOrderReturnProduct');
		assert.strictEqual(capturedCalls[0].parameters.return_id, 501);
		assert.strictEqual(capturedCalls[0].parameters.name, 'Mouse');
		assert.strictEqual(capturedCalls[0].parameters.quantity, 2);
	});

	it('should execute addOrderReturnProduct in JSON mode', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orderReturns',
			operation: 'addOrderReturnProduct',
			params: {
				parameterMode: 'json',
				parametersJson: JSON.stringify({ return_id: 501, name: 'Headphones', price_brutto: 89.99 }),
			},
			mockResponse: { status: 'SUCCESS', order_return_product_id: 778 },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0][0].json.order_return_product_id, 778);
		assert.strictEqual(capturedCalls[0].method, 'addOrderReturnProduct');
	});

	// 6. deleteOrderReturnProduct
	it('should execute deleteOrderReturnProduct', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orderReturns',
			operation: 'deleteOrderReturnProduct',
			params: {
				return_id: 501,
				order_return_product_id: 777,
			},
			mockResponse: { status: 'SUCCESS' },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0][0].json.status, 'SUCCESS');
		assert.strictEqual(capturedCalls[0].method, 'deleteOrderReturnProduct');
		assert.strictEqual(capturedCalls[0].parameters.return_id, 501);
		assert.strictEqual(capturedCalls[0].parameters.order_return_product_id, 777);
	});

	// 7. setOrderReturnProductFields
	it('should execute setOrderReturnProductFields in UI fields mode', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orderReturns',
			operation: 'setOrderReturnProductFields',
			params: {
				parameterMode: 'fields',
				return_id: 501,
				order_return_product_id: 777,
				quantity: 3,
				price_brutto: 45.0,
			},
			mockResponse: { status: 'SUCCESS' },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0][0].json.status, 'SUCCESS');
		assert.strictEqual(capturedCalls[0].method, 'setOrderReturnProductFields');
		assert.strictEqual(capturedCalls[0].parameters.return_id, 501);
		assert.strictEqual(capturedCalls[0].parameters.order_return_product_id, 777);
		assert.strictEqual(capturedCalls[0].parameters.quantity, 3);
	});

	// 8. getOrderReturnStatusList
	it('should execute getOrderReturnStatusList with optional group filter', async () => {
		const mockStatuses = [
			{ id: 1, name: 'New Return', group_id: 10 },
			{ id: 2, name: 'Processed', group_id: 20 },
		];

		const { context, capturedCalls } = createMockContext({
			resource: 'orderReturns',
			operation: 'getOrderReturnStatusList',
			params: {
				filterGroupId: 10,
			},
			mockResponse: { status: 'SUCCESS', statuses: mockStatuses },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.name, 'New Return');
		assert.strictEqual(capturedCalls[0].method, 'getOrderReturnStatusList');
	});

	// 9. getOrderReturnStatusGroups
	it('should execute getOrderReturnStatusGroups', async () => {
		const mockGroups = [{ group_id: 10, name: 'Active', is_main_group: 1 }];

		const { context, capturedCalls } = createMockContext({
			resource: 'orderReturns',
			operation: 'getOrderReturnStatusGroups',
			mockResponse: { status: 'SUCCESS', status_groups: mockGroups },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.name, 'Active');
		assert.strictEqual(capturedCalls[0].method, 'getOrderReturnStatusGroups');
	});

	// 10. setOrderReturnStatus
	it('should execute setOrderReturnStatus in UI fields mode', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orderReturns',
			operation: 'setOrderReturnStatus',
			params: {
				parameterMode: 'fields',
				return_id: 501,
				status_id: 2,
			},
			mockResponse: { status: 'SUCCESS' },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0][0].json.status, 'SUCCESS');
		assert.strictEqual(capturedCalls[0].method, 'setOrderReturnStatus');
		assert.strictEqual(capturedCalls[0].parameters.return_id, 501);
		assert.strictEqual(capturedCalls[0].parameters.status_id, 2);
	});

	// 11. setOrderReturnStatuses
	it('should execute setOrderReturnStatuses with comma-separated IDs', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orderReturns',
			operation: 'setOrderReturnStatuses',
			params: {
				parameterMode: 'fields',
				return_ids: '501, 502, 503',
				status_id: 3,
			},
			mockResponse: { status: 'SUCCESS' },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0][0].json.status, 'SUCCESS');
		assert.strictEqual(capturedCalls[0].method, 'setOrderReturnStatuses');
		assert.deepStrictEqual(capturedCalls[0].parameters.return_ids, [501, 502, 503]);
		assert.strictEqual(capturedCalls[0].parameters.status_id, 3);
	});

	// 12. addOrderReturnStatus
	it('should execute addOrderReturnStatus', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orderReturns',
			operation: 'addOrderReturnStatus',
			params: {
				parameterMode: 'fields',
				name: 'Awaiting Inspection',
				color: '#FFA500',
				group_id: 10,
				name_for_customer: 'In Verification',
			},
			mockResponse: { status: 'SUCCESS', status_id: 15 },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0][0].json.status_id, 15);
		assert.strictEqual(capturedCalls[0].method, 'addOrderReturnStatus');
		assert.strictEqual(capturedCalls[0].parameters.name, 'Awaiting Inspection');
	});

	// 13. addOrderReturnStatusGroup
	it('should execute addOrderReturnStatusGroup', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orderReturns',
			operation: 'addOrderReturnStatusGroup',
			params: {
				parameterMode: 'fields',
				name: 'Warehouse',
			},
			mockResponse: { status: 'SUCCESS', group_id: 4 },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0][0].json.group_id, 4);
		assert.strictEqual(capturedCalls[0].method, 'addOrderReturnStatusGroup');
		assert.strictEqual(capturedCalls[0].parameters.name, 'Warehouse');
	});

	// 14. deleteOrderReturnStatus
	it('should execute deleteOrderReturnStatus and validate different target status', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orderReturns',
			operation: 'deleteOrderReturnStatus',
			params: {
				status_id: 15,
				target_status_id: 1,
			},
			mockResponse: { status: 'SUCCESS' },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0][0].json.status, 'SUCCESS');
		assert.strictEqual(capturedCalls[0].method, 'deleteOrderReturnStatus');
		assert.strictEqual(capturedCalls[0].parameters.status_id, 15);
		assert.strictEqual(capturedCalls[0].parameters.target_status_id, 1);
	});

	it('should throw an error if deleteOrderReturnStatus has same status_id and target_status_id', async () => {
		const { context } = createMockContext({
			resource: 'orderReturns',
			operation: 'deleteOrderReturnStatus',
			params: {
				status_id: 15,
				target_status_id: 15,
			},
		});

		await assert.rejects(async () => {
			await node.execute.call(context);
		}, /Target status ID must be different/);
	});

	// 15. deleteOrderReturnStatusGroup
	it('should execute deleteOrderReturnStatusGroup', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orderReturns',
			operation: 'deleteOrderReturnStatusGroup',
			params: {
				group_id: 4,
			},
			mockResponse: { status: 'SUCCESS' },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0][0].json.status, 'SUCCESS');
		assert.strictEqual(capturedCalls[0].method, 'deleteOrderReturnStatusGroup');
		assert.strictEqual(capturedCalls[0].parameters.group_id, 4);
	});

	// 16. getOrderReturnProductStatuses
	it('should execute getOrderReturnProductStatuses', async () => {
		const mockStatuses = [
			{ status_id: 1, name: 'Undamaged' },
			{ status_id: 2, name: 'Damaged' },
		];

		const { context, capturedCalls } = createMockContext({
			resource: 'orderReturns',
			operation: 'getOrderReturnProductStatuses',
			mockResponse: { status: 'SUCCESS', order_return_product_statuses: mockStatuses },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 2);
		assert.strictEqual(result[0][0].json.name, 'Undamaged');
		assert.strictEqual(capturedCalls[0].method, 'getOrderReturnProductStatuses');
	});

	// 17. getOrderReturnReasonsList
	it('should execute getOrderReturnReasonsList', async () => {
		const mockReasons = [
			{ return_reason_id: 10, name: 'Wrong size' },
			{ return_reason_id: 11, name: 'Defective item' },
		];

		const { context, capturedCalls } = createMockContext({
			resource: 'orderReturns',
			operation: 'getOrderReturnReasonsList',
			mockResponse: { status: 'SUCCESS', return_reasons: mockReasons },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 2);
		assert.strictEqual(result[0][0].json.name, 'Wrong size');
		assert.strictEqual(capturedCalls[0].method, 'getOrderReturnReasonsList');
	});

	// 18. getOrderReturnPaymentsHistory
	it('should execute getOrderReturnPaymentsHistory', async () => {
		const mockPayments = [
			{
				paid_before: 0,
				paid_after: 50.0,
				total_price: 50.0,
				currency: 'PLN',
				external_payment_id: 'PAY-1',
				date: 1700000000,
			},
		];

		const { context, capturedCalls } = createMockContext({
			resource: 'orderReturns',
			operation: 'getOrderReturnPaymentsHistory',
			params: {
				return_id: 501,
				show_full_history: true,
			},
			mockResponse: { status: 'SUCCESS', payments: mockPayments },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.external_payment_id, 'PAY-1');
		assert.strictEqual(capturedCalls[0].method, 'getOrderReturnPaymentsHistory');
		assert.strictEqual(capturedCalls[0].parameters.return_id, 501);
		assert.strictEqual(capturedCalls[0].parameters.show_full_history, true);
	});

	// 19. setOrderReturnRefund
	it('should execute setOrderReturnRefund in UI fields mode', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orderReturns',
			operation: 'setOrderReturnRefund',
			params: {
				parameterMode: 'fields',
				return_id: 501,
				order_refund_done: 99.99,
				refund_date: 1700000000,
				refund_comment: 'Full refund issued',
				external_refund_id: 'REFUND-999',
			},
			mockResponse: { status: 'SUCCESS' },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0][0].json.status, 'SUCCESS');
		assert.strictEqual(capturedCalls[0].method, 'setOrderReturnRefund');
		assert.strictEqual(capturedCalls[0].parameters.return_id, 501);
		assert.strictEqual(capturedCalls[0].parameters.order_refund_done, 99.99);
		assert.strictEqual(capturedCalls[0].parameters.refund_date, 1700000000);
		assert.strictEqual(capturedCalls[0].parameters.refund_comment, 'Full refund issued');
		assert.strictEqual(capturedCalls[0].parameters.external_refund_id, 'REFUND-999');
	});

	// 20. getOrderReturnJournalList
	it('should execute getOrderReturnJournalList in UI fields mode', async () => {
		const mockLogs = [
			{ id: 1, return_id: 501, log_type: 1, object_id: 0, date: 1700000000 },
			{ id: 2, return_id: 501, log_type: 5, object_id: 0, date: 1700000010 },
		];

		const { context, capturedCalls } = createMockContext({
			resource: 'orderReturns',
			operation: 'getOrderReturnJournalList',
			params: {
				parameterMode: 'fields',
				last_log_id: 0,
				return_id: 501,
				logs_types: '1, 5',
			},
			mockResponse: { status: 'SUCCESS', logs: mockLogs },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 2);
		assert.strictEqual(result[0][0].json.log_type, 1);
		assert.strictEqual(capturedCalls[0].method, 'getOrderReturnJournalList');
		assert.deepStrictEqual(capturedCalls[0].parameters.logs_types, [1, 5]);
	});

	// 21. runOrderReturnMacroTrigger
	it('should execute runOrderReturnMacroTrigger', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orderReturns',
			operation: 'runOrderReturnMacroTrigger',
			params: {
				return_id: 501,
				trigger_id: 88,
			},
			mockResponse: { status: 'SUCCESS' },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0][0].json.status, 'SUCCESS');
		assert.strictEqual(capturedCalls[0].method, 'runOrderReturnMacroTrigger');
		assert.strictEqual(capturedCalls[0].parameters.return_id, 501);
		assert.strictEqual(capturedCalls[0].parameters.trigger_id, 88);
	});

	// Dynamic loadOptions tests
	it('should populate dynamic loadOptions methods for Order Returns', async () => {
		function createLoadOptionsContext(mockResponse: any) {
			return {
				getNode: () => ({ name: 'baseLinkerMock' }),
				getCredentials: async () => ({ token: 'mock-token' }),
				getCurrentNodeParameter: (_paramName: string) => '',
				helpers: {
					httpRequest: async () => mockResponse,
				},
			} as any;
		}

		// getOrderReturnStatuses
		const statusesCtx = createLoadOptionsContext({
			status: 'SUCCESS',
			statuses: [{ id: 1, name: 'Return Received', group_id: 2, name_for_customer: 'Received' }],
		});
		const statuses = await node.methods.loadOptions.getOrderReturnStatuses.call(statusesCtx);
		assert.strictEqual(statuses.length, 1);
		assert.strictEqual(statuses[0].value, 1);

		// getOrderReturnStatusGroups
		const groupsCtx = createLoadOptionsContext({
			status: 'SUCCESS',
			status_groups: [{ group_id: 2, name: 'Processing' }],
		});
		const groups = await node.methods.loadOptions.getOrderReturnStatusGroups.call(groupsCtx);
		assert.strictEqual(groups.length, 1);
		assert.strictEqual(groups[0].value, 2);

		// getOrderReturnProductStatuses
		const itemStatusesCtx = createLoadOptionsContext({
			status: 'SUCCESS',
			order_return_product_statuses: [{ status_id: 1, name: 'New' }],
		});
		const itemStatuses = await node.methods.loadOptions.getOrderReturnProductStatuses.call(itemStatusesCtx);
		assert.strictEqual(itemStatuses.length, 1);
		assert.strictEqual(itemStatuses[0].value, 1);

		// getOrderReturnReasonsList
		const reasonsCtx = createLoadOptionsContext({
			status: 'SUCCESS',
			return_reasons: [{ return_reason_id: 5, name: 'Damaged packaging' }],
		});
		const reasons = await node.methods.loadOptions.getOrderReturnReasonsList.call(reasonsCtx);
		assert.strictEqual(reasons.length, 1);
		assert.strictEqual(reasons[0].value, 5);

		// getOrderReturnExtraFieldsList
		const extraFieldsCtx = createLoadOptionsContext({
			status: 'SUCCESS',
			extra_fields: [{ extra_field_id: 10, name: 'Damage Description', editor_type: 'text' }],
		});
		const extraFields = await node.methods.loadOptions.getOrderReturnExtraFieldsList.call(extraFieldsCtx);
		assert.strictEqual(extraFields.length, 1);
		assert.strictEqual(extraFields[0].value, 10);
	});
});
