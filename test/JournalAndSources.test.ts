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

describe('Journal and Sources operations', () => {
	const node = new BaseLinker();

	it('should execute getJournalList with filters', async () => {
		const mockLogs = [
			{ log_id: 101, order_id: 500, log_type: 1, object_id: 0, date: 1600000000 },
			{ log_id: 102, order_id: 500, log_type: 7, object_id: 12, date: 1600000010 },
		];

		const { context, capturedCalls } = createMockContext({
			resource: 'orders',
			operation: 'getJournalList',
			params: {
				last_log_id: 100,
				logs_types: [1, 7],
				journal_order_id: 500,
			},
			mockResponse: { status: 'SUCCESS', logs: mockLogs },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 2);
		assert.strictEqual(result[0][0].json.log_id, 101);
		assert.strictEqual(capturedCalls[0].method, 'getJournalList');
		assert.strictEqual(capturedCalls[0].parameters.last_log_id, 100);
		assert.deepStrictEqual(capturedCalls[0].parameters.logs_types, [1, 7]);
		assert.strictEqual(capturedCalls[0].parameters.order_id, 500);
	});

	it('should execute getOrderExtraFields', async () => {
		const mockExtraFields = [
			{ extra_field_id: 1, name: 'B2B Note', editor_type: 'text' },
			{ extra_field_id: 2, name: 'Delivery Slot', editor_type: 'radio', options: ['Morning', 'Afternoon'] },
		];

		const { context, capturedCalls } = createMockContext({
			resource: 'orders',
			operation: 'getOrderExtraFields',
			mockResponse: { status: 'SUCCESS', extra_fields: mockExtraFields },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 2);
		assert.strictEqual(result[0][0].json.extra_field_id, 1);
		assert.strictEqual(result[0][1].json.name, 'Delivery Slot');
		assert.strictEqual(capturedCalls[0].method, 'getOrderExtraFields');
	});

	it('should execute getOrderSources in flattened mode', async () => {
		const mockSources = {
			personal: { '0': 'In person', '10': 'Shop pos' },
			ebay: { '1522': 'eBay Store' },
			order_return: ['Order Return Item'],
		};

		const { context, capturedCalls } = createMockContext({
			resource: 'orders',
			operation: 'getOrderSources',
			params: { sourcesOutputFormat: 'flattened' },
			mockResponse: { status: 'SUCCESS', sources: mockSources },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 4);
		assert.strictEqual(result[0][0].json.source_type, 'personal');
		assert.strictEqual(result[0][0].json.source_name, 'In person');
		assert.strictEqual(result[0][2].json.source_type, 'ebay');
		assert.strictEqual(result[0][2].json.source_name, 'eBay Store');
		assert.strictEqual(result[0][3].json.source_type, 'order_return');
		assert.strictEqual(capturedCalls[0].method, 'getOrderSources');
	});

	it('should execute getOrderSources in raw mode', async () => {
		const mockSources = {
			shop: { '1': 'My Shop' },
		};

		const { context } = createMockContext({
			resource: 'orders',
			operation: 'getOrderSources',
			params: { sourcesOutputFormat: 'raw' },
			mockResponse: { status: 'SUCCESS', sources: mockSources },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 1);
		assert.deepStrictEqual(result[0][0].json.shop, { '1': 'My Shop' });
	});

	it('should execute getOrderPaymentsHistory with order_id and default show_full_history (true)', async () => {
		const mockPayments = [
			{
				paid_before: '0.00',
				paid_after: '55.00',
				total_price: '82.97',
				date: 1515001701,
				currency: 'GBP',
				external_payment_id: '189a1236-0aa9-21ee-15ab-8b0992243303',
				comment: '',
			},
		];

		const { context, capturedCalls } = createMockContext({
			resource: 'orders',
			operation: 'getOrderPaymentsHistory',
			params: { order_id: 3754894 },
			mockResponse: { status: 'SUCCESS', payments: mockPayments },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.order_id, 3754894);
		assert.strictEqual(result[0][0].json.currency, 'GBP');
		assert.strictEqual(result[0][0].json.external_payment_id, '189a1236-0aa9-21ee-15ab-8b0992243303');
		assert.strictEqual(capturedCalls[0].method, 'getOrderPaymentsHistory');
		assert.deepStrictEqual(capturedCalls[0].parameters, {
			order_id: 3754894,
			show_full_history: true,
		});
	});

	it('should execute getOrderPaymentsHistory with show_full_history: false', async () => {
		const mockPayments = [
			{
				paid_before: '0.00',
				paid_after: '55.00',
				total_price: '82.97',
				date: 1515001701,
				currency: 'GBP',
				external_payment_id: '189a1236-0aa9-21ee-15ab-8b0992243303',
				comment: '',
			},
		];

		const { context, capturedCalls } = createMockContext({
			resource: 'orders',
			operation: 'getOrderPaymentsHistory',
			params: { order_id: 3754894, show_full_history: false },
			mockResponse: { status: 'SUCCESS', payments: mockPayments },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(capturedCalls[0].parameters.show_full_history, false);
	});

	it('should execute getOrderPaymentsHistory with show_full_history: true', async () => {
		const mockPayments = [
			{
				paid_before: '0.00',
				paid_after: '100.00',
				total_price: '100.00',
				date: 1515001701,
				currency: 'PLN',
				external_payment_id: '',
				comment: 'Manual payment',
			},
		];

		const { context, capturedCalls } = createMockContext({
			resource: 'orders',
			operation: 'getOrderPaymentsHistory',
			params: { order_id: 3754894, show_full_history: true },
			mockResponse: { status: 'SUCCESS', payments: mockPayments },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.comment, 'Manual payment');
		assert.strictEqual(capturedCalls[0].parameters.show_full_history, true);
	});
});

