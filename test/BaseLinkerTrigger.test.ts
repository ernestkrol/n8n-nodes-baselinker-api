import { describe, it } from 'node:test';
import assert from 'node:assert';
import { BaseLinkerTrigger, ALL_BASELINKER_LOG_TYPES } from '../nodes/BaseLinker/BaseLinkerTrigger.node';

interface IMockPollOptions {
	event?: string;
	statusId?: string | number;
	customLogsTypes?: number[];
	orderId?: any;
	options?: Record<string, any>;
	mode?: 'manual' | 'trigger' | 'poll';
	staticData?: Record<string, any>;
	mockResponses?: Record<string, any>;
}

function createMockPollContext(config: IMockPollOptions = {}) {
	const capturedCalls: Array<{ method: string; parameters: any }> = [];
	const staticData = config.staticData || {};
	const mode = config.mode || 'trigger';

	const context = {
		getMode: () => mode,
		getNode: () => ({ name: 'baseLinkerTriggerMock' }),
		getCredentials: async () => ({ token: 'mock-token' }),
		getWorkflowStaticData: (_type: string) => staticData,
		getNodeParameter: (paramName: string, defaultValue?: any) => {
			if (paramName === 'event') return config.event || 'orderCreated';
			if (paramName === 'statusId') return config.statusId !== undefined ? config.statusId : '';
			if (paramName === 'customLogsTypes') return config.customLogsTypes || [];
			if (paramName === 'orderId') return config.orderId;
			if (paramName === 'options') return config.options || {};
			return defaultValue;
		},
		helpers: {
			httpRequest: async (reqOptions: any) => {
				const bodyStr = reqOptions.body.toString();
				const params = new URLSearchParams(bodyStr);
				const method = params.get('method') || '';
				const parameters = JSON.parse(params.get('parameters') || '{}');

				capturedCalls.push({ method, parameters });

				if (config.mockResponses && config.mockResponses[method]) {
					return config.mockResponses[method];
				}

				return { status: 'SUCCESS' };
			},
		},
	};

	return { context: context as any, capturedCalls, staticData };
}

describe('BaseLinkerTrigger node', () => {
	const trigger = new BaseLinkerTrigger();

	it('should handle cold start in production mode (initialRun: latest) and initialize cursor without emitting', async () => {
		const mockLogs = [
			{ id: 101, order_id: 1001, log_type: 1, object_id: 0, date: 1700000000 },
			{ id: 105, order_id: 1002, log_type: 1, object_id: 0, date: 1700000050 },
		];

		const { context, capturedCalls, staticData } = createMockPollContext({
			event: 'orderCreated',
			options: { initialRun: 'latest' },
			staticData: {}, // cold start: no lastLogId
			mockResponses: {
				getJournalList: { status: 'SUCCESS', logs: mockLogs },
			},
		});

		const result = await trigger.poll.call(context);

		assert.strictEqual(result, null);
		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].method, 'getJournalList');
		assert.deepStrictEqual(capturedCalls[0].parameters.logs_types, [1]);
		// last_log_id must NOT be sent as 0 to avoid "last_log_id should be greater than zero" error
		assert.strictEqual(capturedCalls[0].parameters.last_log_id, undefined);
		assert.strictEqual(staticData.lastLogId, 105);
	});

	it('should poll new events and advance cursor in subsequent execution', async () => {
		const mockLogs = [
			{ id: 105, order_id: 1002, log_type: 1, object_id: 0, date: 1700000050 }, // BaseLinker returns last log inclusively
			{ id: 106, order_id: 1003, log_type: 1, object_id: 0, date: 1700000100 }, // New event
			{ id: 110, order_id: 1004, log_type: 1, object_id: 0, date: 1700000200 }, // New event
		];

		const { context, capturedCalls, staticData } = createMockPollContext({
			event: 'orderCreated',
			staticData: { lastLogId: 105 },
			mockResponses: {
				getJournalList: { status: 'SUCCESS', logs: mockLogs },
			},
		});

		const result = await trigger.poll.call(context);

		assert.ok(result);
		// Must filter out log 105 and only return truly new events (106 and 110)
		assert.strictEqual(result![0].length, 2);
		assert.strictEqual(result![0][0].json.id, 106);
		assert.strictEqual(result![0][1].json.id, 110);
		assert.strictEqual(capturedCalls[0].parameters.last_log_id, 105);
		assert.strictEqual(staticData.lastLogId, 110);
	});

	it('should discard duplicate logs returned inclusively by BaseLinker when no new events exist', async () => {
		const mockLogs = [
			{ id: 105, order_id: 1002, log_type: 1, object_id: 0, date: 1700000050 }, // Only the already-processed event returned
		];

		const { context, staticData } = createMockPollContext({
			event: 'orderCreated',
			staticData: { lastLogId: 105 },
			mockResponses: {
				getJournalList: { status: 'SUCCESS', logs: mockLogs },
			},
		});

		const result = await trigger.poll.call(context);

		// Must return null and NOT re-emit event 105
		assert.strictEqual(result, null);
		assert.strictEqual(staticData.lastLogId, 105);
	});

	it('should send all 22 log_types and omit last_log_id when event is all and no previous cursor exists', async () => {
		const mockLogs = [
			{ id: 201, order_id: 5001, log_type: 1, object_id: 0, date: 1700000000 },
		];

		const { context, capturedCalls } = createMockPollContext({
			event: 'all',
			orderId: '', // invalid / empty orderId
			mode: 'manual',
			staticData: {},
			mockResponses: {
				getJournalList: { status: 'SUCCESS', logs: mockLogs },
			},
		});

		const result = await trigger.poll.call(context);

		assert.ok(result);
		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].method, 'getJournalList');
		// Must supply all 22 log types and omit last_log_id so BaseLinker never throws "last_log_id should be greater than zero"
		assert.deepStrictEqual(capturedCalls[0].parameters.logs_types, ALL_BASELINKER_LOG_TYPES);
		assert.strictEqual(capturedCalls[0].parameters.last_log_id, undefined);
		assert.strictEqual(capturedCalls[0].parameters.order_id, undefined);
	});

	it('should handle cold start with initialRun: allRecent and emit all historical events', async () => {
		const mockLogs = [
			{ id: 50, order_id: 900, log_type: 3, object_id: 0, date: 1699990000 },
			{ id: 55, order_id: 901, log_type: 3, object_id: 0, date: 1699990100 },
		];

		const { context, capturedCalls, staticData } = createMockPollContext({
			event: 'orderPaid',
			options: { initialRun: 'allRecent' },
			staticData: {},
			mockResponses: {
				getJournalList: { status: 'SUCCESS', logs: mockLogs },
			},
		});

		const result = await trigger.poll.call(context);

		assert.ok(result);
		assert.strictEqual(result![0].length, 2);
		// last_log_id must be undefined on cold start with allRecent
		assert.strictEqual(capturedCalls[0].parameters.last_log_id, undefined);
		assert.deepStrictEqual(capturedCalls[0].parameters.logs_types, [3]);
		assert.strictEqual(staticData.lastLogId, 55);
	});

	it('should support startLogId option to initialize custom cursor', async () => {
		const mockLogs = [
			{ id: 99000, order_id: 899, log_type: 1, object_id: 0, date: 1699999900 },
			{ id: 99001, order_id: 900, log_type: 1, object_id: 0, date: 1700000000 },
		];

		const { context, capturedCalls, staticData } = createMockPollContext({
			event: 'orderCreated',
			options: { startLogId: 99000 },
			staticData: {}, // uninitialized
			mockResponses: {
				getJournalList: { status: 'SUCCESS', logs: mockLogs },
			},
		});

		const result = await trigger.poll.call(context);

		assert.ok(result);
		// Must pass startLogId in request and filter out log 99000
		assert.strictEqual(capturedCalls[0].parameters.last_log_id, 99000);
		assert.strictEqual(result![0].length, 1);
		assert.strictEqual(result![0][0].json.id, 99001);
		assert.strictEqual(staticData.lastLogId, 99001);
	});

	it('should filter events by specific statusId when event is orderStatusChanged', async () => {
		const mockLogs = [
			{ id: 201, order_id: 501, log_type: 18, object_id: 10, date: 1700000000 },
			{ id: 202, order_id: 502, log_type: 18, object_id: 20, date: 1700000010 }, // Target status
			{ id: 203, order_id: 503, log_type: 18, object_id: 10, date: 1700000020 },
			{ id: 204, order_id: 504, log_type: 18, object_id: 20, date: 1700000030 }, // Target status
		];

		const { context, capturedCalls, staticData } = createMockPollContext({
			event: 'orderStatusChanged',
			statusId: 20,
			staticData: { lastLogId: 200 },
			mockResponses: {
				getJournalList: { status: 'SUCCESS', logs: mockLogs },
			},
		});

		const result = await trigger.poll.call(context);

		assert.ok(result);
		assert.strictEqual(result![0].length, 2);
		assert.strictEqual(result![0][0].json.order_id, 502);
		assert.strictEqual(result![0][1].json.order_id, 504);
		assert.strictEqual(capturedCalls[0].parameters.logs_types[0], 18);
		assert.strictEqual(staticData.lastLogId, 204);
	});

	it('should support custom event types and specific orderId filter', async () => {
		const mockLogs = [
			{ id: 300, order_id: 777, log_type: 9, object_id: 87, date: 1699999990 },
			{ id: 301, order_id: 777, log_type: 9, object_id: 88, date: 1700000000 },
		];

		const { context, capturedCalls } = createMockPollContext({
			event: 'custom',
			customLogsTypes: [9, 22],
			orderId: 777,
			staticData: { lastLogId: 300 },
			mockResponses: {
				getJournalList: { status: 'SUCCESS', logs: mockLogs },
			},
		});

		const result = await trigger.poll.call(context);

		assert.ok(result);
		assert.strictEqual(result![0].length, 1);
		assert.strictEqual(result![0][0].json.id, 301);
		assert.deepStrictEqual(capturedCalls[0].parameters.logs_types, [9, 22]);
		assert.strictEqual(capturedCalls[0].parameters.order_id, 777);
	});

	it('should fetch full order details when resolveOrderDetails is true', async () => {
		const mockLogs = [
			{ id: 401, order_id: 8881, log_type: 1, object_id: 0, date: 1700000000 },
		];

		const mockOrderData = {
			order_id: 8881,
			email: 'buyer@example.com',
			delivery_fullname: 'Jan Kowalski',
			order_status_id: 1051,
		};

		const { context, capturedCalls } = createMockPollContext({
			event: 'orderCreated',
			options: { resolveOrderDetails: true },
			staticData: { lastLogId: 400 },
			mockResponses: {
				getJournalList: { status: 'SUCCESS', logs: mockLogs },
				getOrders: { status: 'SUCCESS', orders: [mockOrderData] },
			},
		});

		const result = await trigger.poll.call(context);

		assert.ok(result);
		assert.strictEqual(result![0].length, 1);
		assert.strictEqual(result![0][0].json.id, 401);
		assert.deepStrictEqual((result![0][0].json as any).order, mockOrderData);

		const getOrdersCall = capturedCalls.find((c) => c.method === 'getOrders');
		assert.ok(getOrdersCall);
		assert.strictEqual(getOrdersCall.parameters.order_id, 8881);
	});

	it('should return null when getJournalList returns empty logs', async () => {
		const { context } = createMockPollContext({
			event: 'all',
			staticData: { lastLogId: 500 },
			mockResponses: {
				getJournalList: { status: 'SUCCESS', logs: [] },
			},
		});

		const result = await trigger.poll.call(context);
		assert.strictEqual(result, null);
	});

	it('should load order status options via loadOptions.getOrderStatuses', async () => {
		const mockStatuses = [
			{ id: 101, name: 'Nowe', group_id: 1, name_for_customer: 'Nowe zamówienie' },
			{ id: 102, name: 'Wysłane', group_id: 2, name_for_customer: 'Przesyłka wysłana' },
		];

		const mockLoadContext = {
			getNode: () => ({ name: 'baseLinkerTriggerMock' }),
			getCredentials: async () => ({ token: 'mock-token' }),
			helpers: {
				httpRequest: async () => ({ status: 'SUCCESS', statuses: mockStatuses }),
			},
		};

		const options = await trigger.methods.loadOptions.getOrderStatuses.call(mockLoadContext as any);

		assert.strictEqual(options.length, 2);
		assert.strictEqual(options[0].name, 'Nowe (ID: 101)');
		assert.strictEqual(options[0].value, 101);
		assert.strictEqual(options[1].name, 'Wysłane (ID: 102)');
		assert.strictEqual(options[1].value, 102);
	});
});
