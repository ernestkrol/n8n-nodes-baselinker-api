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

describe('Clients (CRM) operations', () => {
	const node = new BaseLinker();

	it('should execute getCrmClients in UI fields mode', async () => {
		const mockClients = [
			{
				crm_client_id: 42,
				status_id: 1,
				email: 'client@example.com',
				invoice_company: 'Acme Corp',
			},
		];

		const { context, capturedCalls } = createMockContext({
			resource: 'crm',
			operation: 'getCrmClients',
			params: {
				parameterMode: 'fields',
				returnAll: false,
				page: 1,
				filters: {
					filter_email: 'client@example.com',
					filter_status_id: 1,
				},
			},
			mockResponse: { status: 'SUCCESS', clients: mockClients },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.crm_client_id, 42);
		assert.strictEqual(result[0][0].json.email, 'client@example.com');
		assert.strictEqual(capturedCalls[0].method, 'getCrmClients');
		assert.strictEqual(capturedCalls[0].parameters.page, 1);
		assert.strictEqual(capturedCalls[0].parameters.filter_email, 'client@example.com');
		assert.strictEqual(capturedCalls[0].parameters.filter_status_id, 1);
	});

	it('should execute getCrmClients in JSON mode', async () => {
		const mockClients = [{ crm_client_id: 99, email: 'raw@example.com' }];

		const { context, capturedCalls } = createMockContext({
			resource: 'crm',
			operation: 'getCrmClients',
			params: {
				parameterMode: 'json',
				parametersJson: JSON.stringify({ page: 2, filter_invoice_company: 'Test Company' }),
			},
			mockResponse: { status: 'SUCCESS', clients: mockClients },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.crm_client_id, 99);
		assert.strictEqual(capturedCalls[0].parameters.page, 2);
		assert.strictEqual(capturedCalls[0].parameters.filter_invoice_company, 'Test Company');
	});

	it('should throw error when invalid JSON is provided for getCrmClients in JSON mode', async () => {
		const { context } = createMockContext({
			resource: 'crm',
			operation: 'getCrmClients',
			params: {
				parameterMode: 'json',
				parametersJson: '{ invalid json',
			},
			mockResponse: { status: 'SUCCESS' },
		});

		await assert.rejects(async () => {
			await node.execute.call(context);
		}, /Invalid JSON provided for getCrmClients/);
	});

	it('should paginate getCrmClients when returnAll is true', async () => {
		const page1Clients = Array.from({ length: 100 }, (_, i) => ({
			crm_client_id: i + 1,
			email: `user${i + 1}@example.com`,
		}));
		const page2Clients = Array.from({ length: 25 }, (_, i) => ({
			crm_client_id: 100 + i + 1,
			email: `user${100 + i + 1}@example.com`,
		}));

		const { context, capturedCalls } = createMockContext({
			resource: 'crm',
			operation: 'getCrmClients',
			params: {
				parameterMode: 'fields',
				returnAll: true,
				limit: 150,
				delayMs: 0,
				filters: {},
			},
			mockResponses: [
				{ status: 'SUCCESS', clients: page1Clients },
				{ status: 'SUCCESS', clients: page2Clients },
			],
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 125);
		assert.strictEqual(capturedCalls.length, 2);
		assert.strictEqual(capturedCalls[0].parameters.page, 1);
		assert.strictEqual(capturedCalls[1].parameters.page, 2);
	});

	it('should execute getCrmClientData with custom fields', async () => {
		const mockClientData = {
			crm_client_id: 42,
			status_id: 1,
			notes: 'Important customer notes',
			custom_extra_fields: {
				12: 'VIP Customer',
				15: { title: 'agreement.pdf', url: 'https://cdn.baselinker.com/file.pdf' },
			},
		};

		const { context, capturedCalls } = createMockContext({
			resource: 'crm',
			operation: 'getCrmClientData',
			params: {
				crm_client_id: 42,
				include_custom_extra_fields: true,
			},
			mockResponse: { status: 'SUCCESS', ...mockClientData },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.crm_client_id, 42);
		assert.strictEqual(result[0][0].json.notes, 'Important customer notes');
		assert.deepStrictEqual(result[0][0].json.custom_extra_fields, mockClientData.custom_extra_fields);
		assert.strictEqual(capturedCalls[0].method, 'getCrmClientData');
		assert.deepStrictEqual(capturedCalls[0].parameters, {
			crm_client_id: 42,
			include_custom_extra_fields: true,
		});
	});

	it('should execute getCrmClientStatusGroups', async () => {
		const mockGroups = [
			{ group_id: 1, name: 'Standard Group', is_main_group: 1 },
			{ group_id: 2, name: 'Wholesale Group', is_main_group: 0 },
		];

		const { context, capturedCalls } = createMockContext({
			resource: 'crm',
			operation: 'getCrmClientStatusGroups',
			mockResponse: { status: 'SUCCESS', status_groups: mockGroups },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 2);
		assert.strictEqual(result[0][0].json.name, 'Standard Group');
		assert.strictEqual(result[0][1].json.name, 'Wholesale Group');
		assert.strictEqual(capturedCalls[0].method, 'getCrmClientStatusGroups');
	});

	it('should execute getCrmClientStatuses and filter by status group', async () => {
		const mockStatuses = [
			{ id: 1, name: 'Standard', color: '#1C8752', group_id: 1, is_primary: 1 },
			{ id: 2, name: 'VIP', color: '#F5A623', group_id: 2, is_primary: 0 },
		];

		const { context, capturedCalls } = createMockContext({
			resource: 'crm',
			operation: 'getCrmClientStatuses',
			params: {
				filterGroupId: 2,
			},
			mockResponse: { status: 'SUCCESS', statuses: mockStatuses },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.name, 'VIP');
		assert.strictEqual(result[0][0].json.group_id, 2);
		assert.strictEqual(capturedCalls[0].method, 'getCrmClientStatuses');
	});

	it('should load dynamic options for CRM statuses and status groups', async () => {
		const mockStatuses = [
			{ id: 10, name: 'Lead', color: '#B6BCC5', group_id: 1, is_primary: 1 },
		];
		const mockGroups = [{ group_id: 1, name: 'Sales Pipeline', is_main_group: 1 }];

		const mockLoadOptionsContext = (methodResp: any) => ({
			helpers: {
				httpRequest: async () => methodResp,
			},
			getNode: () => ({ name: 'test' }),
			getCredentials: async () => ({ token: 'mock' }),
		});

		const statusesOptions = await node.methods.loadOptions.getCrmClientStatuses.call(
			mockLoadOptionsContext({ status: 'SUCCESS', statuses: mockStatuses }) as any,
		);
		assert.strictEqual(statusesOptions.length, 1);
		assert.strictEqual(statusesOptions[0].value, 10);
		assert.ok((statusesOptions[0].name as string).includes('Lead'));

		const groupsOptions = await node.methods.loadOptions.getCrmClientStatusGroups.call(
			mockLoadOptionsContext({ status: 'SUCCESS', status_groups: mockGroups }) as any,
		);
		assert.strictEqual(groupsOptions.length, 1);
		assert.strictEqual(groupsOptions[0].value, 1);
		assert.strictEqual(groupsOptions[0].name, 'Sales Pipeline (ID: 1)');

		const extraFieldsOptions = await node.methods.loadOptions.getCrmClientExtraFields.call(
			mockLoadOptionsContext({
				status: 'SUCCESS',
				extra_fields: [{ extra_field_id: 7, name: 'Industry', editor_type: 'select' }],
			}) as any,
		);
		assert.strictEqual(extraFieldsOptions.length, 1);
		assert.strictEqual(extraFieldsOptions[0].value, 7);
		assert.strictEqual(extraFieldsOptions[0].name, 'Industry (ID: 7)');
		assert.strictEqual(extraFieldsOptions[0].description, 'Type: select');
	});

	// ----------------------------------
	//   addCrmClient
	// ----------------------------------
	it('should execute addCrmClient in fields mode (create new client)', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'crm',
			operation: 'addCrmClient',
			params: {
				addCrmClientMode: 'fields',
				email: 'john.doe@example.com',
				phone: '+48123456789',
				status_id: 2,
				star: 4,
				additionalFields: {
					invoice_company: 'Acme Corp',
					invoice_fullname: 'John Doe',
					invoice_city: 'Warsaw',
					delivery_city: 'Krakow',
					notes: 'High priority customer',
				},
				customExtraFieldsUi: {
					fields: [{ field_id: 15, value: 'VIP Tier 1' }],
				},
			},
			mockResponse: { status: 'SUCCESS', crm_client_id: 101 },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].method, 'addCrmClient');
		assert.strictEqual(capturedCalls[0].parameters.email, 'john.doe@example.com');
		assert.strictEqual(capturedCalls[0].parameters.phone, '+48123456789');
		assert.strictEqual(capturedCalls[0].parameters.status_id, 2);
		assert.strictEqual(capturedCalls[0].parameters.star, 4);
		assert.strictEqual(capturedCalls[0].parameters.invoice_company, 'Acme Corp');
		assert.deepStrictEqual(capturedCalls[0].parameters.custom_extra_fields, { '15': 'VIP Tier 1' });

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.success, true);
		assert.strictEqual(result[0][0].json.crm_client_id, 101);
	});

	it('should execute addCrmClient in fields mode (update client with customExtraFieldsJson)', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'crm',
			operation: 'addCrmClient',
			params: {
				addCrmClientMode: 'fields',
				crm_client_id: 101,
				email: 'updated@example.com',
				customExtraFieldsJson: JSON.stringify({ '20': 'Updated Note' }),
			},
			mockResponse: { status: 'SUCCESS', crm_client_id: 101 },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].parameters.crm_client_id, 101);
		assert.strictEqual(capturedCalls[0].parameters.email, 'updated@example.com');
		assert.deepStrictEqual(capturedCalls[0].parameters.custom_extra_fields, { '20': 'Updated Note' });
		assert.strictEqual(result[0][0].json.crm_client_id, 101);
	});

	it('should execute addCrmClient in JSON mode', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'crm',
			operation: 'addCrmClient',
			params: {
				addCrmClientMode: 'json',
				addCrmClientJson: JSON.stringify({ email: 'json@client.com', status_id: 3, star: 5 }),
			},
			mockResponse: { status: 'SUCCESS', crm_client_id: 102 },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].method, 'addCrmClient');
		assert.strictEqual(capturedCalls[0].parameters.email, 'json@client.com');
		assert.strictEqual(capturedCalls[0].parameters.status_id, 3);
		assert.strictEqual(result[0][0].json.crm_client_id, 102);
	});

	// ----------------------------------
	//   deleteCrmClient
	// ----------------------------------
	it('should execute deleteCrmClient', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'crm',
			operation: 'deleteCrmClient',
			params: {
				delete_crm_client_id: 101,
			},
			mockResponse: { status: 'SUCCESS' },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].method, 'deleteCrmClient');
		assert.deepStrictEqual(capturedCalls[0].parameters, { crm_client_id: 101 });
		assert.strictEqual(result[0][0].json.success, true);
		assert.strictEqual(result[0][0].json.crm_client_id, 101);
	});

	it('should throw error in deleteCrmClient when client ID is missing', async () => {
		const { context } = createMockContext({
			resource: 'crm',
			operation: 'deleteCrmClient',
			params: {
				delete_crm_client_id: 0,
			},
			mockResponse: { status: 'SUCCESS' },
		});

		await assert.rejects(async () => {
			await node.execute.call(context);
		}, /Parameter "CRM Client ID" is required for deleteCrmClient/);
	});

	// ----------------------------------
	//   getCrmClientExtraFields
	// ----------------------------------
	it('should execute getCrmClientExtraFields in node execute', async () => {
		const mockExtraFields = [
			{ extra_field_id: 1, name: 'Tax Office', editor_type: 'text' },
			{ extra_field_id: 2, name: 'Industry Type', editor_type: 'select' },
		];

		const { context, capturedCalls } = createMockContext({
			resource: 'crm',
			operation: 'getCrmClientExtraFields',
			mockResponse: { status: 'SUCCESS', extra_fields: mockExtraFields },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].method, 'getCrmClientExtraFields');
		assert.strictEqual(result[0].length, 2);
		assert.strictEqual(result[0][0].json.extra_field_id, 1);
		assert.strictEqual(result[0][0].json.name, 'Tax Office');
	});

	// ----------------------------------
	//   addCrmClientStatus
	// ----------------------------------
	it('should execute addCrmClientStatus in fields mode (create and update)', async () => {
		// Create
		const { context: context1, capturedCalls: calls1 } = createMockContext({
			resource: 'crm',
			operation: 'addCrmClientStatus',
			params: {
				addCrmClientStatusMode: 'fields',
				status_name: 'Key Account',
				status_color: '#00FF00',
				status_group_id: 2,
			},
			mockResponse: { status: 'SUCCESS', status_id: 25 },
		});

		const result1 = await node.execute.call(context1);
		assert.strictEqual(calls1.length, 1);
		assert.strictEqual(calls1[0].method, 'addCrmClientStatus');
		assert.deepStrictEqual(calls1[0].parameters, {
			name: 'Key Account',
			color: '#00FF00',
			group_id: 2,
		});
		assert.strictEqual(result1[0][0].json.success, true);
		assert.strictEqual(result1[0][0].json.status_id, 25);

		// Update
		const { context: context2, capturedCalls: calls2 } = createMockContext({
			resource: 'crm',
			operation: 'addCrmClientStatus',
			params: {
				addCrmClientStatusMode: 'fields',
				status_name: 'Key Account Updated',
				status_color: '#00AA00',
				update_status_id: 25,
			},
			mockResponse: { status: 'SUCCESS', status_id: 25 },
		});

		const result2 = await node.execute.call(context2);
		assert.strictEqual(calls2.length, 1);
		assert.strictEqual(calls2[0].parameters.status_id, 25);
		assert.strictEqual(result2[0][0].json.status_id, 25);
	});

	it('should execute addCrmClientStatus in JSON mode and throw on missing name', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'crm',
			operation: 'addCrmClientStatus',
			params: {
				addCrmClientStatusMode: 'json',
				addCrmClientStatusJson: JSON.stringify({ name: 'VIP Lead', color: '#123456' }),
			},
			mockResponse: { status: 'SUCCESS', status_id: 30 },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].parameters.name, 'VIP Lead');
		assert.strictEqual(result[0][0].json.status_id, 30);

		// Missing name error
		const { context: errContext } = createMockContext({
			resource: 'crm',
			operation: 'addCrmClientStatus',
			params: {
				addCrmClientStatusMode: 'json',
				addCrmClientStatusJson: JSON.stringify({ color: '#123456' }),
			},
			mockResponse: { status: 'SUCCESS' },
		});

		await assert.rejects(async () => {
			await node.execute.call(errContext);
		}, /Parameter "name" is required in addCrmClientStatus JSON payload/);
	});

	// ----------------------------------
	//   addCrmClientStatusGroup
	// ----------------------------------
	it('should execute addCrmClientStatusGroup in fields mode (create and update)', async () => {
		// Create
		const { context: context1, capturedCalls: calls1 } = createMockContext({
			resource: 'crm',
			operation: 'addCrmClientStatusGroup',
			params: {
				addCrmClientStatusGroupMode: 'fields',
				group_name: 'Enterprise Clients',
			},
			mockResponse: { status: 'SUCCESS', group_id: 5 },
		});

		const result1 = await node.execute.call(context1);
		assert.strictEqual(calls1.length, 1);
		assert.strictEqual(calls1[0].method, 'addCrmClientStatusGroup');
		assert.deepStrictEqual(calls1[0].parameters, { name: 'Enterprise Clients' });
		assert.strictEqual(result1[0][0].json.success, true);
		assert.strictEqual(result1[0][0].json.group_id, 5);

		// Update
		const { context: context2, capturedCalls: calls2 } = createMockContext({
			resource: 'crm',
			operation: 'addCrmClientStatusGroup',
			params: {
				addCrmClientStatusGroupMode: 'fields',
				group_name: 'Enterprise Clients Tier 1',
				update_group_id: 5,
			},
			mockResponse: { status: 'SUCCESS', group_id: 5 },
		});

		const result2 = await node.execute.call(context2);
		assert.strictEqual(calls2.length, 1);
		assert.deepStrictEqual(calls2[0].parameters, { name: 'Enterprise Clients Tier 1', group_id: 5 });
		assert.strictEqual(result2[0][0].json.group_id, 5);
	});

	it('should execute addCrmClientStatusGroup in JSON mode and throw on missing name', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'crm',
			operation: 'addCrmClientStatusGroup',
			params: {
				addCrmClientStatusGroupMode: 'json',
				addCrmClientStatusGroupJson: JSON.stringify({ name: 'SME Clients' }),
			},
			mockResponse: { status: 'SUCCESS', group_id: 6 },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].parameters.name, 'SME Clients');
		assert.strictEqual(result[0][0].json.group_id, 6);

		// Missing name error
		const { context: errContext } = createMockContext({
			resource: 'crm',
			operation: 'addCrmClientStatusGroup',
			params: {
				addCrmClientStatusGroupMode: 'json',
				addCrmClientStatusGroupJson: JSON.stringify({}),
			},
			mockResponse: { status: 'SUCCESS' },
		});

		await assert.rejects(async () => {
			await node.execute.call(errContext);
		}, /Parameter "name" is required in addCrmClientStatusGroup JSON payload/);
	});

	// ----------------------------------
	//   deleteCrmClientStatus
	// ----------------------------------
	it('should execute deleteCrmClientStatus in fields mode', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'crm',
			operation: 'deleteCrmClientStatus',
			params: {
				deleteCrmClientStatusMode: 'fields',
				delete_status_id: 25,
				target_status_id: 1,
			},
			mockResponse: { status: 'SUCCESS' },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].method, 'deleteCrmClientStatus');
		assert.deepStrictEqual(capturedCalls[0].parameters, {
			status_id: 25,
			target_status_id: 1,
		});
		assert.strictEqual(result[0][0].json.success, true);
		assert.strictEqual(result[0][0].json.status_id, 25);
		assert.strictEqual(result[0][0].json.target_status_id, 1);
	});

	it('should throw error when target_status_id equals status_id in deleteCrmClientStatus', async () => {
		const { context } = createMockContext({
			resource: 'crm',
			operation: 'deleteCrmClientStatus',
			params: {
				deleteCrmClientStatusMode: 'fields',
				delete_status_id: 1,
				target_status_id: 1,
			},
			mockResponse: { status: 'SUCCESS' },
		});

		await assert.rejects(async () => {
			await node.execute.call(context);
		}, /Parameter "target_status_id" must be different from "status_id"/);
	});

	// ----------------------------------
	//   deleteCrmClientStatusGroup
	// ----------------------------------
	it('should execute deleteCrmClientStatusGroup in fields mode', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'crm',
			operation: 'deleteCrmClientStatusGroup',
			params: {
				deleteCrmClientStatusGroupMode: 'fields',
				delete_group_id: 5,
			},
			mockResponse: { status: 'SUCCESS' },
		});

		const result = await node.execute.call(context);
		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].method, 'deleteCrmClientStatusGroup');
		assert.deepStrictEqual(capturedCalls[0].parameters, { group_id: 5 });
		assert.strictEqual(result[0][0].json.success, true);
		assert.strictEqual(result[0][0].json.group_id, 5);
	});
});
