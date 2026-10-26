import { describe, it } from 'node:test';
import assert from 'node:assert';
import { BaseLinker } from '../nodes/BaseLinker/BaseLinker.node';
import { baselinkerGetOrdersAll, baselinkerGetOrdersForStatusGroup } from '../nodes/BaseLinker/GenericFunctions';
import { IGetOrdersFilterParameters } from '../nodes/BaseLinker/Orders/OrdersInterface';

function createMockContext(responses: any[]) {
	let callIndex = 0;
	const capturedCalls: Array<{ method: string; parameters: any }> = [];

	const context = {
		getNode: () => ({ name: 'baseLinkerMock' }),
		getCredentials: async () => ({ token: 'mock-token', apiUrl: 'https://api.baselinker.com/connector.php' }),
		helpers: {
			httpRequest: async (options: any) => {
				const bodyStr = options.body.toString();
				const params = new URLSearchParams(bodyStr);
				const method = params.get('method') || '';
				const parameters = JSON.parse(params.get('parameters') || '{}');

				capturedCalls.push({ method, parameters });

				const res = responses[callIndex] || { status: 'SUCCESS', orders: [] };
				callIndex++;
				return res;
			},
		},
	};

	return { context: context as any, capturedCalls };
}

describe('baselinkerGetOrdersAll pagination', () => {
	it('should return single page when returnAll is false', async () => {
		const mockOrders = Array.from({ length: 100 }, (_, i) => ({
			order_id: 1000 + i,
			date_add: 1600000000 + i,
			date_confirmed: 1600000000 + i,
			confirmed: true,
		}));

		const { context, capturedCalls } = createMockContext([
			{ status: 'SUCCESS', orders: mockOrders },
		]);

		const result = await baselinkerGetOrdersAll.call(
			context,
			{ date_confirmed_from: 1600000000 },
			{
				returnAll: false,
				limit: 100,
				paginationField: 'date_confirmed_from',
				delayMs: 0,
			},
		);

		assert.strictEqual(result.length, 100);
		assert.strictEqual(capturedCalls.length, 1);
	});

	it('should paginate using date_confirmed_from cursor until less than 100 items', async () => {
		const batch1 = Array.from({ length: 100 }, (_, i) => ({
			order_id: 1000 + i,
			date_add: 1600000000 + i,
			date_confirmed: 1600000000 + i * 10,
			confirmed: true,
		}));
		const lastBatch1 = batch1[batch1.length - 1];

		const batch2 = Array.from({ length: 30 }, (_, i) => ({
			order_id: 2000 + i,
			date_add: 1600002000 + i,
			date_confirmed: 1600002000 + i * 10,
			confirmed: true,
		}));

		const { context, capturedCalls } = createMockContext([
			{ status: 'SUCCESS', orders: batch1 },
			{ status: 'SUCCESS', orders: batch2 },
		]);

		const result = await baselinkerGetOrdersAll.call(
			context,
			{ date_confirmed_from: 1600000000 },
			{
				returnAll: true,
				limit: 0,
				paginationField: 'date_confirmed_from',
				delayMs: 0,
			},
		);

		assert.strictEqual(result.length, 130);
		assert.strictEqual(capturedCalls.length, 2);
		// Check that the second call cursor was advanced by last order's date_confirmed + 1
		assert.strictEqual(capturedCalls[1].parameters.date_confirmed_from, lastBatch1.date_confirmed + 1);
	});

	it('should paginate using date_from cursor', async () => {
		const batch1 = Array.from({ length: 100 }, (_, i) => ({
			order_id: 1000 + i,
			date_add: 1600000000 + i * 5,
			date_confirmed: 0,
			confirmed: false,
		}));
		const lastBatch1 = batch1[batch1.length - 1];

		const batch2 = Array.from({ length: 15 }, (_, i) => ({
			order_id: 2000 + i,
			date_add: 1600001000 + i * 5,
			date_confirmed: 0,
			confirmed: false,
		}));

		const { context, capturedCalls } = createMockContext([
			{ status: 'SUCCESS', orders: batch1 },
			{ status: 'SUCCESS', orders: batch2 },
		]);

		const result = await baselinkerGetOrdersAll.call(
			context,
			{ date_from: 1600000000, get_unconfirmed_orders: true },
			{
				returnAll: true,
				limit: 0,
				paginationField: 'date_from',
				delayMs: 0,
			},
		);

		assert.strictEqual(result.length, 115);
		assert.strictEqual(capturedCalls.length, 2);
		assert.strictEqual(capturedCalls[1].parameters.date_from, lastBatch1.date_add + 1);
	});

	it('should paginate using id_from cursor', async () => {
		const batch1 = Array.from({ length: 100 }, (_, i) => ({
			order_id: 5000 + i,
			date_add: 1600000000 + i,
			date_confirmed: 0,
			confirmed: false,
		}));
		const lastBatch1 = batch1[batch1.length - 1];

		const batch2 = Array.from({ length: 50 }, (_, i) => ({
			order_id: 6000 + i,
			date_add: 1600001000 + i,
			date_confirmed: 0,
			confirmed: false,
		}));

		const { context, capturedCalls } = createMockContext([
			{ status: 'SUCCESS', orders: batch1 },
			{ status: 'SUCCESS', orders: batch2 },
		]);

		const result = await baselinkerGetOrdersAll.call(
			context,
			{ id_from: 5000 },
			{
				returnAll: true,
				limit: 0,
				paginationField: 'id_from',
				delayMs: 0,
			},
		);

		assert.strictEqual(result.length, 150);
		assert.strictEqual(capturedCalls.length, 2);
		assert.strictEqual(capturedCalls[1].parameters.id_from, lastBatch1.order_id + 1);
	});

	it('should fall back to id_from if date_confirmed is 0 when paginating with date_confirmed_from', async () => {
		const batch1 = Array.from({ length: 100 }, (_, i) => ({
			order_id: 8000 + i,
			date_add: 1600000000 + i,
			date_confirmed: 0, // unconfirmed order
			confirmed: false,
		}));
		const lastBatch1 = batch1[batch1.length - 1];

		const batch2 = Array.from({ length: 10 }, (_, i) => ({
			order_id: 9000 + i,
			date_add: 1600001000 + i,
			date_confirmed: 0,
			confirmed: false,
		}));

		const { context, capturedCalls } = createMockContext([
			{ status: 'SUCCESS', orders: batch1 },
			{ status: 'SUCCESS', orders: batch2 },
		]);

		const result = await baselinkerGetOrdersAll.call(
			context,
			{ date_confirmed_from: 0, get_unconfirmed_orders: true },
			{
				returnAll: true,
				limit: 0,
				paginationField: 'date_confirmed_from',
				delayMs: 0,
			},
		);

		assert.strictEqual(result.length, 110);
		assert.strictEqual(capturedCalls.length, 2);
		assert.strictEqual(capturedCalls[1].parameters.id_from, lastBatch1.order_id + 1);
		assert.strictEqual(capturedCalls[1].parameters.date_confirmed_from, undefined);
	});

	it('should stop when limit is reached', async () => {
		const batch1 = Array.from({ length: 100 }, (_, i) => ({
			order_id: 1000 + i,
			date_add: 1600000000 + i,
			date_confirmed: 1600000000 + i,
			confirmed: true,
		}));
		const batch2 = Array.from({ length: 100 }, (_, i) => ({
			order_id: 2000 + i,
			date_add: 1600001000 + i,
			date_confirmed: 1600001000 + i,
			confirmed: true,
		}));

		const { context, capturedCalls } = createMockContext([
			{ status: 'SUCCESS', orders: batch1 },
			{ status: 'SUCCESS', orders: batch2 },
		]);

		const result = await baselinkerGetOrdersAll.call(
			context,
			{ date_confirmed_from: 1600000000 },
			{
				returnAll: true,
				limit: 150,
				paginationField: 'date_confirmed_from',
				delayMs: 0,
			},
		);

		assert.strictEqual(result.length, 150);
		assert.strictEqual(capturedCalls.length, 2);
	});

	it('should fetch orders for all statuses in a given status group', async () => {
		const context = {
			getNode: () => ({ name: 'baseLinkerMock' }),
			getCredentials: async () => ({ token: 'mock-token' }),
			helpers: {
				httpRequest: async (options: any) => {
					const bodyStr = options.body.toString();
					const params = new URLSearchParams(bodyStr);
					const method = params.get('method') || '';
					const parameters = JSON.parse(params.get('parameters') || '{}');

					if (method === 'getOrderStatusList') {
						return {
							status: 'SUCCESS',
							statuses: [
								{ id: 101, name: 'Status 1', group_id: 5 },
								{ id: 102, name: 'Status 2', group_id: 5 },
								{ id: 999, name: 'Other Group', group_id: 8 },
							],
						};
					}

					if (method === 'getOrders') {
						if (parameters.status_id === 101) {
							return {
								status: 'SUCCESS',
								orders: [{ order_id: 1, order_status_id: 101 }],
							};
						}
						if (parameters.status_id === 102) {
							return {
								status: 'SUCCESS',
								orders: [{ order_id: 2, order_status_id: 102 }],
							};
						}
					}

					return { status: 'SUCCESS', orders: [] };
				},
			},
		} as any;

		const result = await baselinkerGetOrdersForStatusGroup.call(
			context,
			5,
			{},
			{
				returnAll: false,
				limit: 100,
				paginationField: 'date_confirmed_from',
				delayMs: 0,
			},
		);

		assert.strictEqual(result.length, 2);
		assert.strictEqual(result[0].order_id, 1);
		assert.strictEqual(result[1].order_id, 2);
	});

	it('should return empty array if status group has no statuses', async () => {
		const context = {
			getNode: () => ({ name: 'baseLinkerMock' }),
			getCredentials: async () => ({ token: 'mock-token' }),
			helpers: {
				httpRequest: async () => ({
					status: 'SUCCESS',
					statuses: [{ id: 101, name: 'Status 1', group_id: 1 }],
				}),
			},
		} as any;

		const result = await baselinkerGetOrdersForStatusGroup.call(
			context,
			999, // non-existent group
			{},
			{
				returnAll: false,
				limit: 100,
				paginationField: 'date_confirmed_from',
				delayMs: 0,
			},
		);

		assert.strictEqual(result.length, 0);
	});
});

describe('getOrders node execution parameters', () => {
	const node = new BaseLinker();

	function createNodeExecuteContext(params: Record<string, any>) {
		const capturedCalls: Array<{ method: string; parameters: any }> = [];

		const context = {
			getNode: () => ({ name: 'baseLinkerMock' }),
			getCredentials: async () => ({ token: 'mock-token', apiUrl: 'https://api.baselinker.com/connector.php' }),
			getInputData: () => [{ json: {} }],
			continueOnFail: () => false,
			getNodeParameter: (paramName: string, _index?: number, defaultValue?: any) => {
				if (paramName === 'resource') return 'orders';
				if (paramName === 'operation') return 'getOrders';
				if (params[paramName] !== undefined) {
					return params[paramName];
				}
				return defaultValue;
			},
			helpers: {
				httpRequest: async (reqOptions: any) => {
					const bodyStr = reqOptions.body.toString();
					const formParams = new URLSearchParams(bodyStr);
					const method = formParams.get('method') || '';
					const parameters = JSON.parse(formParams.get('parameters') || '{}');

					capturedCalls.push({ method, parameters });
					return { status: 'SUCCESS', orders: [{ order_id: 12345 }] };
				},
			},
		};

		return { context: context as any, capturedCalls };
	}

	it('should pass include_custom_extra_fields: true and get_unconfirmed_orders: true in UI fields mode', async () => {
		const { context, capturedCalls } = createNodeExecuteContext({
			parameterInputMode: 'fields',
			get_unconfirmed_orders: true,
			include_custom_extra_fields: true,
			returnAll: false,
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result.length, 1);
		assert.strictEqual(result[0][0].json.order_id, 12345);
		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].method, 'getOrders');
		assert.strictEqual(capturedCalls[0].parameters.get_unconfirmed_orders, true);
		assert.strictEqual(capturedCalls[0].parameters.include_custom_extra_fields, true);
	});

	it('should omit include_custom_extra_fields when false in UI fields mode', async () => {
		const { context, capturedCalls } = createNodeExecuteContext({
			parameterInputMode: 'fields',
			get_unconfirmed_orders: false,
			include_custom_extra_fields: false,
			returnAll: false,
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result.length, 1);
		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].method, 'getOrders');
		assert.strictEqual(capturedCalls[0].parameters.get_unconfirmed_orders, undefined);
		assert.strictEqual(capturedCalls[0].parameters.include_custom_extra_fields, undefined);
	});
});
