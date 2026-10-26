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

describe('Base Connect operations', () => {
	const node = new BaseLinker();

	// 1. getConnectIntegrations
	it('should execute getConnectIntegrations in unpacked mode', async () => {
		const mockResponse = {
			status: 'SUCCESS',
			integrations: {
				own_integrations: [
					{
						connect_integration_id: 1,
						name: 'Own Integration 1',
						settings: [],
					},
				],
				connected_integrations: [
					{
						connect_integration_id: 2,
						name: 'Connected Integration 2',
						settings: [],
					},
					{
						connect_integration_id: 4,
						name: 'Connected Integration 4',
						settings: [],
					},
				],
			},
		};

		const { context, capturedCalls } = createMockContext({
			resource: 'baseConnect',
			operation: 'getConnectIntegrations',
			params: {
				parameterMode: 'fields',
				integrationsOutputFormat: 'unpacked',
			},
			mockResponse,
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 3);
		assert.strictEqual(result[0][0].json.connect_integration_id, 1);
		assert.strictEqual(result[0][0].json.name, 'Own Integration 1');
		assert.strictEqual(result[0][0].json.integration_type, 'own');

		assert.strictEqual(result[0][1].json.connect_integration_id, 2);
		assert.strictEqual(result[0][1].json.name, 'Connected Integration 2');
		assert.strictEqual(result[0][1].json.integration_type, 'connected');

		assert.strictEqual(result[0][2].json.connect_integration_id, 4);
		assert.strictEqual(result[0][2].json.name, 'Connected Integration 4');
		assert.strictEqual(result[0][2].json.integration_type, 'connected');

		assert.strictEqual(capturedCalls[0].method, 'getConnectIntegrations');
		assert.deepStrictEqual(capturedCalls[0].parameters, {});
	});

	it('should execute getConnectIntegrations in raw mode', async () => {
		const mockResponse = {
			status: 'SUCCESS',
			integrations: {
				own_integrations: [{ connect_integration_id: 1, name: 'Own' }],
				connected_integrations: [{ connect_integration_id: 2, name: 'Connected' }],
			},
		};

		const { context } = createMockContext({
			resource: 'baseConnect',
			operation: 'getConnectIntegrations',
			params: {
				parameterMode: 'fields',
				integrationsOutputFormat: 'raw',
			},
			mockResponse,
		});

		const result = await node.execute.call(context);
		assert.strictEqual(result[0].length, 1);
		assert.deepStrictEqual(result[0][0].json, mockResponse.integrations);
	});

	it('should handle empty getConnectIntegrations response', async () => {
		const { context } = createMockContext({
			resource: 'baseConnect',
			operation: 'getConnectIntegrations',
			params: {
				parameterMode: 'fields',
				integrationsOutputFormat: 'unpacked',
			},
			mockResponse: {
				status: 'SUCCESS',
				integrations: {
					own_integrations: [],
					connected_integrations: [],
				},
			},
		});

		const result = await node.execute.call(context);
		assert.strictEqual(result[0].length, 1);
		assert.deepStrictEqual(result[0][0].json, { success: true, integrations: [] });
	});

	it('should execute getConnectIntegrations in json mode', async () => {
		const mockResponse = {
			status: 'SUCCESS',
			integrations: {
				own_integrations: [],
				connected_integrations: [],
			},
		};

		const { context, capturedCalls } = createMockContext({
			resource: 'baseConnect',
			operation: 'getConnectIntegrations',
			params: {
				parameterMode: 'json',
				parametersJson: '{}',
			},
			mockResponse,
		});

		const result = await node.execute.call(context);
		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(capturedCalls[0].method, 'getConnectIntegrations');
		assert.deepStrictEqual(capturedCalls[0].parameters, {});
	});

	it('should throw error on invalid JSON in getConnectIntegrations', async () => {
		const { context } = createMockContext({
			resource: 'baseConnect',
			operation: 'getConnectIntegrations',
			params: {
				parameterMode: 'json',
				parametersJson: '{ invalid json',
			},
		});

		await assert.rejects(
			async () => {
				await node.execute.call(context);
			},
			/Invalid JSON provided for getConnectIntegrations/,
		);
	});

	// 2. getConnectIntegrationContractors
	it('should execute getConnectIntegrationContractors and unpack contractors dictionary', async () => {
		const mockResponse = {
			status: 'SUCCESS',
			contractors: {
				'1': {
					connect_contractor_id: 1,
					name: 'Contractor Alpha',
					credit_data: { credit_to_pay: 500, credit_limit: 2000 },
					settings: [],
				},
				'12': {
					connect_contractor_id: 34,
					name: 'Contractor Beta',
					credit_data: { credit_to_pay: 0, credit_limit: 5000 },
					settings: [],
				},
			},
		};

		const { context, capturedCalls } = createMockContext({
			resource: 'baseConnect',
			operation: 'getConnectIntegrationContractors',
			params: {
				parameterMode: 'fields',
				connect_integration_id: 10,
			},
			mockResponse,
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 2);
		assert.strictEqual(result[0][0].json.connect_integration_id, 10);
		assert.strictEqual(result[0][0].json.connect_contractor_id, 1);
		assert.strictEqual(result[0][0].json.name, 'Contractor Alpha');

		assert.strictEqual(result[0][1].json.connect_integration_id, 10);
		assert.strictEqual(result[0][1].json.connect_contractor_id, 34);
		assert.strictEqual(result[0][1].json.name, 'Contractor Beta');

		assert.strictEqual(capturedCalls[0].method, 'getConnectIntegrationContractors');
		assert.deepStrictEqual(capturedCalls[0].parameters, { connect_integration_id: 10 });
	});

	it('should handle empty contractors list in getConnectIntegrationContractors', async () => {
		const { context } = createMockContext({
			resource: 'baseConnect',
			operation: 'getConnectIntegrationContractors',
			params: {
				parameterMode: 'fields',
				connect_integration_id: 10,
			},
			mockResponse: { status: 'SUCCESS', contractors: {} },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(result[0].length, 1);
		assert.deepStrictEqual(result[0][0].json, {
			success: true,
			connect_integration_id: 10,
			contractors: [],
		});
	});

	it('should execute getConnectIntegrationContractors in json mode', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'baseConnect',
			operation: 'getConnectIntegrationContractors',
			params: {
				parameterMode: 'json',
				parametersJson: JSON.stringify({ connect_integration_id: 5 }),
			},
			mockResponse: { status: 'SUCCESS', contractors: [] },
		});

		await node.execute.call(context);
		assert.strictEqual(capturedCalls[0].method, 'getConnectIntegrationContractors');
		assert.deepStrictEqual(capturedCalls[0].parameters, { connect_integration_id: 5 });
	});

	it('should throw error on invalid JSON in getConnectIntegrationContractors', async () => {
		const { context } = createMockContext({
			resource: 'baseConnect',
			operation: 'getConnectIntegrationContractors',
			params: {
				parameterMode: 'json',
				parametersJson: '{ invalid',
			},
		});

		await assert.rejects(
			async () => {
				await node.execute.call(context);
			},
			/Invalid JSON provided for getConnectIntegrationContractors/,
		);
	});

	// 3. getConnectContractorCreditHistory
	it('should execute getConnectContractorCreditHistory and unpack credit entries', async () => {
		const mockCreditData = [
			{
				credit_entry_id: 1,
				date_add: 1716296890,
				description: 'First trade credit charge',
				currency: 'PLN',
				type: 'payment',
				amount: 100.0,
				is_accepted: 1,
			},
			{
				credit_entry_id: 2,
				date_add: 1716296767,
				description: 'Trade credit payment',
				currency: 'PLN',
				type: 'charge',
				amount: 9.99,
				is_accepted: 0,
			},
		];

		const { context, capturedCalls } = createMockContext({
			resource: 'baseConnect',
			operation: 'getConnectContractorCreditHistory',
			params: {
				parameterMode: 'fields',
				connect_contractor_id: 2,
			},
			mockResponse: { status: 'SUCCESS', credit_data: mockCreditData },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 2);
		assert.strictEqual(result[0][0].json.connect_contractor_id, 2);
		assert.strictEqual(result[0][0].json.credit_entry_id, 1);
		assert.strictEqual(result[0][0].json.type, 'payment');
		assert.strictEqual(result[0][1].json.connect_contractor_id, 2);
		assert.strictEqual(result[0][1].json.credit_entry_id, 2);
		assert.strictEqual(result[0][1].json.type, 'charge');

		assert.strictEqual(capturedCalls[0].method, 'getConnectContractorCreditHistory');
		assert.deepStrictEqual(capturedCalls[0].parameters, { connect_contractor_id: 2 });
	});

	it('should handle empty credit history in getConnectContractorCreditHistory', async () => {
		const { context } = createMockContext({
			resource: 'baseConnect',
			operation: 'getConnectContractorCreditHistory',
			params: {
				parameterMode: 'fields',
				connect_contractor_id: 5,
			},
			mockResponse: { status: 'SUCCESS', credit_data: [] },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(result[0].length, 1);
		assert.deepStrictEqual(result[0][0].json, {
			success: true,
			connect_contractor_id: 5,
			credit_data: [],
		});
	});

	it('should execute getConnectContractorCreditHistory in json mode', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'baseConnect',
			operation: 'getConnectContractorCreditHistory',
			params: {
				parameterMode: 'json',
				parametersJson: JSON.stringify({ connect_contractor_id: 42 }),
			},
			mockResponse: { status: 'SUCCESS', credit_data: [] },
		});

		await node.execute.call(context);
		assert.strictEqual(capturedCalls[0].method, 'getConnectContractorCreditHistory');
		assert.deepStrictEqual(capturedCalls[0].parameters, { connect_contractor_id: 42 });
	});

	// 4. addConnectContractorCreditSettlement
	it('should execute addConnectContractorCreditSettlement in fields mode', async () => {
		const mockResponse = {
			status: 'SUCCESS',
			credit_entry_id: 156,
			new_blocked_credit: 1500,
			new_available_credit: 3500,
		};

		const { context, capturedCalls } = createMockContext({
			resource: 'baseConnect',
			operation: 'addConnectContractorCreditSettlement',
			params: {
				parameterMode: 'fields',
				connect_contractor_id: 2,
				amount: 500,
				message: 'Bank transfer received - REF: BT2024/001',
				order_id: 12345,
			},
			mockResponse,
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.success, true);
		assert.strictEqual(result[0][0].json.connect_contractor_id, 2);
		assert.strictEqual(result[0][0].json.credit_entry_id, 156);
		assert.strictEqual(result[0][0].json.new_blocked_credit, 1500);
		assert.strictEqual(result[0][0].json.new_available_credit, 3500);

		assert.strictEqual(capturedCalls[0].method, 'addConnectContractorCreditSettlement');
		assert.deepStrictEqual(capturedCalls[0].parameters, {
			connect_contractor_id: 2,
			amount: 500,
			message: 'Bank transfer received - REF: BT2024/001',
			order_id: 12345,
		});
	});

	it('should execute addConnectContractorCreditSettlement in json mode', async () => {
		const mockResponse = {
			status: 'SUCCESS',
			credit_entry_id: 157,
			new_blocked_credit: 1000,
			new_available_credit: 4000,
		};

		const jsonParams = {
			connect_contractor_id: 3,
			amount: 250.5,
			message: 'Direct payment',
		};

		const { context, capturedCalls } = createMockContext({
			resource: 'baseConnect',
			operation: 'addConnectContractorCreditSettlement',
			params: {
				parameterMode: 'json',
				parametersJson: JSON.stringify(jsonParams),
			},
			mockResponse,
		});

		const result = await node.execute.call(context);
		assert.strictEqual(result[0][0].json.success, true);
		assert.strictEqual(capturedCalls[0].method, 'addConnectContractorCreditSettlement');
		assert.deepStrictEqual(capturedCalls[0].parameters, jsonParams);
	});

	// 5. setConnectContractorCreditLimit
	it('should execute setConnectContractorCreditLimit in fields mode', async () => {
		const mockResponse = {
			status: 'SUCCESS',
			new_limit_set: '10000.00 PLN',
		};

		const { context, capturedCalls } = createMockContext({
			resource: 'baseConnect',
			operation: 'setConnectContractorCreditLimit',
			params: {
				parameterMode: 'fields',
				connect_contractor_id: 2,
				new_limit: 10000,
				message: 'Sample history message',
			},
			mockResponse,
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.success, true);
		assert.strictEqual(result[0][0].json.connect_contractor_id, 2);
		assert.strictEqual(result[0][0].json.new_limit_set, '10000.00 PLN');

		assert.strictEqual(capturedCalls[0].method, 'setConnectContractorCreditLimit');
		assert.deepStrictEqual(capturedCalls[0].parameters, {
			connect_contractor_id: 2,
			new_limit: 10000,
			message: 'Sample history message',
		});
	});

	it('should execute setConnectContractorCreditLimit in json mode', async () => {
		const mockResponse = {
			status: 'SUCCESS',
			new_limit_set: '25000.00 EUR',
		};

		const jsonParams = {
			connect_contractor_id: 7,
			new_limit: 25000,
			message: 'Upgraded limit',
		};

		const { context, capturedCalls } = createMockContext({
			resource: 'baseConnect',
			operation: 'setConnectContractorCreditLimit',
			params: {
				parameterMode: 'json',
				parametersJson: JSON.stringify(jsonParams),
			},
			mockResponse,
		});

		const result = await node.execute.call(context);
		assert.strictEqual(result[0][0].json.success, true);
		assert.strictEqual(capturedCalls[0].method, 'setConnectContractorCreditLimit');
		assert.deepStrictEqual(capturedCalls[0].parameters, jsonParams);
	});

	// Dynamic loadOptions
	it('should load dynamic dropdown options for getConnectIntegrations', async () => {
		const mockResponse = {
			status: 'SUCCESS',
			integrations: {
				own_integrations: [
					{
						connect_integration_id: 1,
						name: 'B2B Wholesale Portal',
					},
				],
				connected_integrations: [
					{
						connect_integration_id: 22,
						name: 'Supplier Central',
					},
				],
			},
		};

		const fakeContext = {
			getCredentials: async () => ({ token: 'mock-token' }),
			helpers: {
				httpRequest: async () => mockResponse,
			},
		};

		const options = await node.methods.loadOptions.getConnectIntegrations.call(fakeContext as any);
		assert.strictEqual(options.length, 2);
		assert.strictEqual(options[0].value, 1);
		assert.strictEqual(options[0].name, 'B2B Wholesale Portal (Own, ID: 1)');
		assert.strictEqual(options[1].value, 22);
		assert.strictEqual(options[1].name, 'Supplier Central (Connected, ID: 22)');
	});
});
