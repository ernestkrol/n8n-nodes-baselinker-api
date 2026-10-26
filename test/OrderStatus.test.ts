import { describe, it } from 'node:test';
import assert from 'node:assert';
import { BaseLinker } from '../nodes/BaseLinker/BaseLinker.node';

function createMockExecuteContext(options: {
	resource: string;
	operation: string;
	filterGroupId?: number;
	params?: Record<string, any>;
	mockResponse: any;
}) {
	const capturedCalls: Array<{ method: string; parameters: any }> = [];

	const context = {
		getNode: () => ({ name: 'baseLinkerMock' }),
		getCredentials: async () => ({ token: 'mock-token', apiUrl: 'https://api.baselinker.com/connector.php' }),
		getInputData: () => [{ json: {} }],
		continueOnFail: () => false,
		getNodeParameter: (paramName: string, _index?: number, defaultValue?: any) => {
			if (paramName === 'resource') return options.resource;
			if (paramName === 'operation') return options.operation;
			if (paramName === 'filterGroupId') return options.filterGroupId;
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

describe('OrderStatus operations', () => {
	const node = new BaseLinker();

	// 1. getOrderStatusList
	it('should execute getOrderStatusList and return all statuses', async () => {
		const mockStatuses = [
			{
				id: 1051,
				name: 'New orders',
				color: '#0000FF',
				group_id: 1,
				is_primary: 1,
				name_for_customer: 'Order accepted',
			},
			{
				id: 1052,
				name: 'Dispatched',
				color: '#808080',
				group_id: 2,
				is_primary: 0,
				name_for_customer: 'The parcel has been shipped',
			},
		];

		const { context, capturedCalls } = createMockExecuteContext({
			resource: 'orderStatus',
			operation: 'getOrderStatusList',
			mockResponse: { status: 'SUCCESS', statuses: mockStatuses },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result.length, 1);
		assert.strictEqual(result[0].length, 2);
		assert.strictEqual(result[0][0].json.id, 1051);
		assert.strictEqual(result[0][1].json.name, 'Dispatched');
		assert.strictEqual(capturedCalls[0].method, 'getOrderStatusList');
	});

	it('should execute getOrderStatusList with filterGroupId', async () => {
		const mockStatuses = [
			{ id: 1051, name: 'New orders', color: '#0000FF', group_id: 1, is_primary: 1, name_for_customer: 'Accepted' },
			{ id: 1052, name: 'Processing', color: '#FFFF00', group_id: 1, is_primary: 0, name_for_customer: 'Processing' },
			{ id: 1053, name: 'Dispatched', color: '#808080', group_id: 2, is_primary: 0, name_for_customer: 'Shipped' },
		];

		const { context } = createMockExecuteContext({
			resource: 'orderStatus',
			operation: 'getOrderStatusList',
			filterGroupId: 1,
			mockResponse: { status: 'SUCCESS', statuses: mockStatuses },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 2);
		assert.strictEqual(result[0][0].json.id, 1051);
		assert.strictEqual(result[0][1].json.id, 1052);
	});

	// 2. getOrderStatusGroups
	it('should execute getOrderStatusGroups and return all groups', async () => {
		const mockGroups = [
			{ group_id: 1, name: 'Active', is_main_group: 1 },
			{ group_id: 2, name: 'Completed', is_main_group: 0 },
		];

		const { context, capturedCalls } = createMockExecuteContext({
			resource: 'orderStatus',
			operation: 'getOrderStatusGroups',
			mockResponse: { status: 'SUCCESS', status_groups: mockGroups },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result.length, 1);
		assert.strictEqual(result[0].length, 2);
		assert.strictEqual(result[0][0].json.name, 'Active');
		assert.strictEqual(result[0][1].json.group_id, 2);
		assert.strictEqual(capturedCalls[0].method, 'getOrderStatusGroups');
	});

	// 3. setOrderStatus
	it('should execute setOrderStatus in fields mode', async () => {
		const { context, capturedCalls } = createMockExecuteContext({
			resource: 'orderStatus',
			operation: 'setOrderStatus',
			params: {
				setOrderStatusMode: 'fields',
				order_id: 3754894,
				status_id: 1052,
			},
			mockResponse: { status: 'SUCCESS' },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(capturedCalls[0].method, 'setOrderStatus');
		assert.strictEqual(capturedCalls[0].parameters.order_id, 3754894);
		assert.strictEqual(capturedCalls[0].parameters.status_id, 1052);
		assert.strictEqual(result[0][0].json.success, true);
		assert.strictEqual(result[0][0].json.order_id, 3754894);
		assert.strictEqual(result[0][0].json.status_id, 1052);
	});

	it('should execute setOrderStatus in json mode', async () => {
		const { context, capturedCalls } = createMockExecuteContext({
			resource: 'orders',
			operation: 'setOrderStatus',
			params: {
				setOrderStatusMode: 'json',
				setOrderStatusJson: JSON.stringify({ order_id: 12345, status_id: 8060 }),
			},
			mockResponse: { status: 'SUCCESS' },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(capturedCalls[0].method, 'setOrderStatus');
		assert.strictEqual(capturedCalls[0].parameters.order_id, 12345);
		assert.strictEqual(capturedCalls[0].parameters.status_id, 8060);
		assert.strictEqual(result[0][0].json.success, true);
	});

	// 4. setOrderStatuses
	it('should execute setOrderStatuses in fields mode with comma-separated IDs', async () => {
		const { context, capturedCalls } = createMockExecuteContext({
			resource: 'orderStatus',
			operation: 'setOrderStatuses',
			params: {
				setOrderStatusesMode: 'fields',
				order_ids: '12345, 67890, 99999',
				status_id: 1052,
			},
			mockResponse: { status: 'SUCCESS' },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(capturedCalls[0].method, 'setOrderStatuses');
		assert.deepStrictEqual(capturedCalls[0].parameters.order_ids, [12345, 67890, 99999]);
		assert.strictEqual(capturedCalls[0].parameters.status_id, 1052);
		assert.strictEqual(result[0][0].json.success, true);
		assert.deepStrictEqual(result[0][0].json.order_ids, [12345, 67890, 99999]);
	});

	it('should execute setOrderStatuses in fields mode with bracketed JSON array', async () => {
		const { context, capturedCalls } = createMockExecuteContext({
			resource: 'orders',
			operation: 'setOrderStatuses',
			params: {
				setOrderStatusesMode: 'fields',
				order_ids: '[100, 200]',
				status_id: 1051,
			},
			mockResponse: { status: 'SUCCESS' },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(capturedCalls[0].method, 'setOrderStatuses');
		assert.deepStrictEqual(capturedCalls[0].parameters.order_ids, [100, 200]);
		assert.strictEqual(capturedCalls[0].parameters.status_id, 1051);
		assert.strictEqual(result[0][0].json.success, true);
	});

	it('should execute setOrderStatuses in json mode', async () => {
		const { context, capturedCalls } = createMockExecuteContext({
			resource: 'orderStatus',
			operation: 'setOrderStatuses',
			params: {
				setOrderStatusesMode: 'json',
				setOrderStatusesJson: JSON.stringify({ order_ids: [111, 222], status_id: 333 }),
			},
			mockResponse: { status: 'SUCCESS' },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(capturedCalls[0].method, 'setOrderStatuses');
		assert.deepStrictEqual(capturedCalls[0].parameters.order_ids, [111, 222]);
		assert.strictEqual(capturedCalls[0].parameters.status_id, 333);
		assert.strictEqual(result[0][0].json.success, true);
	});

	// 5. addOrderStatus
	it('should execute addOrderStatus (create) in fields mode with additional fields', async () => {
		const { context, capturedCalls } = createMockExecuteContext({
			resource: 'orderStatus',
			operation: 'addOrderStatus',
			params: {
				addOrderStatusMode: 'fields',
				name: 'Packed and Ready',
				additionalFields: {
					color: '#00FF00',
					short_name: 'Ready',
					name_for_customer: 'Order packed',
					group_id: 2,
					type: 2,
					comments: 'Automated warehouse status',
				},
			},
			mockResponse: { status: 'SUCCESS', status_id: 1060 },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(capturedCalls[0].method, 'addOrderStatus');
		assert.strictEqual(capturedCalls[0].parameters.name, 'Packed and Ready');
		assert.strictEqual(capturedCalls[0].parameters.color, '#00FF00');
		assert.strictEqual(capturedCalls[0].parameters.group_id, 2);
		assert.strictEqual(capturedCalls[0].parameters.type, 2);
		assert.strictEqual(result[0][0].json.success, true);
		assert.strictEqual(result[0][0].json.status_id, 1060);
	});

	it('should execute addOrderStatus (update) with status_id in fields mode', async () => {
		const { context, capturedCalls } = createMockExecuteContext({
			resource: 'orders',
			operation: 'addOrderStatus',
			params: {
				addOrderStatusMode: 'fields',
				name: 'Updated Status',
				status_id: 1051,
				additionalFields: {
					color: '#123456',
				},
			},
			mockResponse: { status: 'SUCCESS', status_id: 1051 },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(capturedCalls[0].method, 'addOrderStatus');
		assert.strictEqual(capturedCalls[0].parameters.status_id, 1051);
		assert.strictEqual(capturedCalls[0].parameters.name, 'Updated Status');
		assert.strictEqual(result[0][0].json.success, true);
	});

	it('should execute addOrderStatus in json mode', async () => {
		const { context, capturedCalls } = createMockExecuteContext({
			resource: 'orderStatus',
			operation: 'addOrderStatus',
			params: {
				addOrderStatusMode: 'json',
				addOrderStatusJson: JSON.stringify({ name: 'Expedited', color: '#FF0000' }),
			},
			mockResponse: { status: 'SUCCESS', status_id: 1070 },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(capturedCalls[0].method, 'addOrderStatus');
		assert.strictEqual(capturedCalls[0].parameters.name, 'Expedited');
		assert.strictEqual(result[0][0].json.status_id, 1070);
	});

	// 6. addOrderStatusGroup
	it('should execute addOrderStatusGroup (create) in fields mode', async () => {
		const { context, capturedCalls } = createMockExecuteContext({
			resource: 'orderStatus',
			operation: 'addOrderStatusGroup',
			params: {
				addOrderStatusGroupMode: 'fields',
				name: 'Marketplaces',
			},
			mockResponse: { status: 'SUCCESS', group_id: 12 },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(capturedCalls[0].method, 'addOrderStatusGroup');
		assert.strictEqual(capturedCalls[0].parameters.name, 'Marketplaces');
		assert.strictEqual(result[0][0].json.success, true);
		assert.strictEqual(result[0][0].json.group_id, 12);
	});

	it('should execute addOrderStatusGroup (update) in fields mode with group_id', async () => {
		const { context, capturedCalls } = createMockExecuteContext({
			resource: 'orders',
			operation: 'addOrderStatusGroup',
			params: {
				addOrderStatusGroupMode: 'fields',
				name: 'Wholesale B2B',
				group_id: 5,
			},
			mockResponse: { status: 'SUCCESS', group_id: 5 },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(capturedCalls[0].method, 'addOrderStatusGroup');
		assert.strictEqual(capturedCalls[0].parameters.name, 'Wholesale B2B');
		assert.strictEqual(capturedCalls[0].parameters.group_id, 5);
		assert.strictEqual(result[0][0].json.group_id, 5);
	});

	it('should execute addOrderStatusGroup in json mode', async () => {
		const { context, capturedCalls } = createMockExecuteContext({
			resource: 'orderStatus',
			operation: 'addOrderStatusGroup',
			params: {
				addOrderStatusGroupMode: 'json',
				addOrderStatusGroupJson: JSON.stringify({ name: 'Dropshipping', group_id: 7 }),
			},
			mockResponse: { status: 'SUCCESS', group_id: 7 },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(capturedCalls[0].method, 'addOrderStatusGroup');
		assert.strictEqual(capturedCalls[0].parameters.name, 'Dropshipping');
		assert.strictEqual(capturedCalls[0].parameters.group_id, 7);
		assert.strictEqual(result[0][0].json.group_id, 7);
	});

	// 7. deleteOrderStatus
	it('should execute deleteOrderStatus in fields mode', async () => {
		const { context, capturedCalls } = createMockExecuteContext({
			resource: 'orderStatus',
			operation: 'deleteOrderStatus',
			params: {
				deleteOrderStatusMode: 'fields',
				status_id: 1055,
				target_status_id: 1051,
			},
			mockResponse: { status: 'SUCCESS' },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(capturedCalls[0].method, 'deleteOrderStatus');
		assert.strictEqual(capturedCalls[0].parameters.status_id, 1055);
		assert.strictEqual(capturedCalls[0].parameters.target_status_id, 1051);
		assert.strictEqual(result[0][0].json.success, true);
		assert.strictEqual(result[0][0].json.status_id, 1055);
		assert.strictEqual(result[0][0].json.target_status_id, 1051);
	});

	it('should throw error when target_status_id equals status_id in deleteOrderStatus', async () => {
		const { context } = createMockExecuteContext({
			resource: 'orderStatus',
			operation: 'deleteOrderStatus',
			params: {
				deleteOrderStatusMode: 'fields',
				status_id: 1055,
				target_status_id: 1055,
			},
			mockResponse: { status: 'SUCCESS' },
		});

		await assert.rejects(async () => {
			await node.execute.call(context);
		}, /Parameter "target_status_id" must be different from "status_id"/);
	});

	it('should execute deleteOrderStatus in json mode', async () => {
		const { context, capturedCalls } = createMockExecuteContext({
			resource: 'orders',
			operation: 'deleteOrderStatus',
			params: {
				deleteOrderStatusMode: 'json',
				deleteOrderStatusJson: JSON.stringify({ status_id: 1080, target_status_id: 1051 }),
			},
			mockResponse: { status: 'SUCCESS' },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(capturedCalls[0].method, 'deleteOrderStatus');
		assert.strictEqual(capturedCalls[0].parameters.status_id, 1080);
		assert.strictEqual(capturedCalls[0].parameters.target_status_id, 1051);
		assert.strictEqual(result[0][0].json.success, true);
	});

	// 8. deleteOrderStatusGroup
	it('should execute deleteOrderStatusGroup in fields mode', async () => {
		const { context, capturedCalls } = createMockExecuteContext({
			resource: 'orderStatus',
			operation: 'deleteOrderStatusGroup',
			params: {
				deleteOrderStatusGroupMode: 'fields',
				group_id: 15,
			},
			mockResponse: { status: 'SUCCESS' },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(capturedCalls[0].method, 'deleteOrderStatusGroup');
		assert.strictEqual(capturedCalls[0].parameters.group_id, 15);
		assert.strictEqual(result[0][0].json.success, true);
		assert.strictEqual(result[0][0].json.group_id, 15);
	});

	it('should execute deleteOrderStatusGroup in json mode', async () => {
		const { context, capturedCalls } = createMockExecuteContext({
			resource: 'orders',
			operation: 'deleteOrderStatusGroup',
			params: {
				deleteOrderStatusGroupMode: 'json',
				deleteOrderStatusGroupJson: JSON.stringify({ group_id: 20 }),
			},
			mockResponse: { status: 'SUCCESS' },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(capturedCalls[0].method, 'deleteOrderStatusGroup');
		assert.strictEqual(capturedCalls[0].parameters.group_id, 20);
		assert.strictEqual(result[0][0].json.success, true);
	});

	// 9. Load Options
	it('should load dynamic options via loadOptions', async () => {
		const loadContext = {
			getNode: () => ({ name: 'baseLinkerMock' }),
			getCredentials: async () => ({ token: 'mock-token' }),
			helpers: {
				httpRequest: async (reqOptions: any) => {
					const bodyStr = reqOptions.body.toString();
					if (bodyStr.includes('getOrderStatusList')) {
						return {
							status: 'SUCCESS',
							statuses: [
								{ id: 100, name: 'Pending', color: '#fff', group_id: 1, name_for_customer: 'Pending' },
							],
						};
					}
					return {
						status: 'SUCCESS',
						status_groups: [
							{ group_id: 10, name: 'Main Group', is_main_group: 1 },
						],
					};
				},
			},
		} as any;

		const statusOptions = await node.methods!.loadOptions!.getOrderStatuses.call(loadContext);
		assert.strictEqual(statusOptions.length, 1);
		assert.strictEqual(statusOptions[0].value, 100);

		const statusListOptions = await node.methods!.loadOptions!.getOrderStatusList.call(loadContext);
		assert.strictEqual(statusListOptions.length, 1);
		assert.strictEqual(statusListOptions[0].value, 100);

		const groupOptions = await node.methods!.loadOptions!.getOrderStatusGroups.call(loadContext);
		assert.strictEqual(groupOptions.length, 1);
		assert.strictEqual(groupOptions[0].value, 10);
	});
});
