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

describe('setOrderFields operation with custom extra fields', () => {
	const node = new BaseLinker();

	it('should execute setOrderFields in fields mode with standard and custom fields', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'orders',
			operation: 'setOrderFields',
			params: {
				setOrderFieldsMode: 'fields',
				order_id: 3754894,
				updateFields: {
					admin_comments: 'Priority VIP client',
					delivery_fullname: 'Jan Kowalski',
					delivery_city: 'Krakow',
					currency: 'PLN',
					want_invoice: true,
				},
				customExtraFieldsUi: {
					fields: [
						{ field_id: 1, value: 'Express packaging' },
						{ field_id: 135, value: 'B2B' },
						{ field_id: 2, value: '' }, // removing field
						{
							field_id: 196,
							value: JSON.stringify({
								title: 'warranty.pdf',
								file: 'data:4AAQSkZJRgABAQAAAQABAAD...',
							}),
						},
					],
				},
				customExtraFieldsJson: {
					500: 'Direct Json Value',
				},
			},
			mockResponse: { status: 'SUCCESS' },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].method, 'setOrderFields');
		assert.strictEqual(capturedCalls[0].parameters.order_id, 3754894);
		assert.strictEqual(capturedCalls[0].parameters.admin_comments, 'Priority VIP client');
		assert.strictEqual(capturedCalls[0].parameters.delivery_city, 'Krakow');

		// Verify custom extra fields
		const customFields = capturedCalls[0].parameters.custom_extra_fields;
		assert.ok(customFields);
		assert.strictEqual(customFields['1'], 'Express packaging');
		assert.strictEqual(customFields['135'], 'B2B');
		assert.strictEqual(customFields['2'], ''); // cleared with empty string
		assert.strictEqual(customFields['500'], 'Direct Json Value'); // merged from json
		assert.deepStrictEqual(customFields['196'], {
			title: 'warranty.pdf',
			file: 'data:4AAQSkZJRgABAQAAAQABAAD...',
		});

		// Verify node return data
		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.success, true);
		assert.strictEqual(result[0][0].json.order_id, 3754894);
		assert.strictEqual(result[0][0].json.status, 'SUCCESS');
	});

	it('should execute setOrderFields in json mode', async () => {
		const rawPayload = {
			order_id: 889900,
			currency: 'EUR',
			custom_extra_fields: {
				10: 'Custom Value A',
				20: '',
			},
		};

		const { context, capturedCalls } = createMockContext({
			resource: 'orders',
			operation: 'setOrderFields',
			params: {
				setOrderFieldsMode: 'json',
				setOrderFieldsJson: JSON.stringify(rawPayload),
			},
			mockResponse: { status: 'SUCCESS' },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].method, 'setOrderFields');
		assert.strictEqual(capturedCalls[0].parameters.order_id, 889900);
		assert.strictEqual(capturedCalls[0].parameters.currency, 'EUR');
		assert.strictEqual(capturedCalls[0].parameters.custom_extra_fields['10'], 'Custom Value A');
		assert.strictEqual(capturedCalls[0].parameters.custom_extra_fields['20'], '');

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.success, true);
		assert.strictEqual(result[0][0].json.order_id, 889900);
	});

	it('should throw an error in json mode if order_id is missing', async () => {
		const { context } = createMockContext({
			resource: 'orders',
			operation: 'setOrderFields',
			params: {
				setOrderFieldsMode: 'json',
				setOrderFieldsJson: JSON.stringify({ currency: 'EUR' }),
			},
			mockResponse: { status: 'SUCCESS' },
		});

		await assert.rejects(async () => {
			await node.execute.call(context);
		}, /order_id/);
	});

	it('should populate getOrderExtraFieldsList options via dynamic loadOptions', async () => {
		const capturedCalls: Array<{ method: string; parameters: any }> = [];

		const mockLoadOptionsContext = {
			getNode: () => ({ name: 'baseLinkerMock' }),
			getCredentials: async () => ({ token: 'mock-token' }),
			helpers: {
				httpRequest: async (reqOptions: any) => {
					const bodyStr = reqOptions.body.toString();
					const params = new URLSearchParams(bodyStr);
					const method = params.get('method') || '';
					const parameters = JSON.parse(params.get('parameters') || '{}');
					capturedCalls.push({ method, parameters });
					return {
						status: 'SUCCESS',
						extra_fields: [
							{ extra_field_id: 1, name: 'B2B Note', editor_type: 'text' },
							{ extra_field_id: 135, name: 'Client Type', editor_type: 'radio', options: ['B2B', 'B2C'] },
							{ extra_field_id: 196, name: 'Warranty File', editor_type: 'file' },
						],
					};
				},
			},
		};

		const options = await node.methods.loadOptions.getOrderExtraFieldsList.call(mockLoadOptionsContext as any);

		assert.strictEqual(capturedCalls.length, 1);
		assert.strictEqual(capturedCalls[0].method, 'getOrderExtraFields');
		assert.strictEqual(options.length, 3);
		assert.strictEqual(options[0].name, 'B2B Note (ID: 1) [text]');
		assert.strictEqual(options[0].value, 1);
		assert.strictEqual(options[1].name, 'Client Type (ID: 135) [radio]');
		assert.strictEqual(options[1].value, 135);
		assert.ok(options[1].description?.includes('Options: B2B, B2C'));
		assert.strictEqual(options[2].name, 'Warranty File (ID: 196) [file]');
	});
});
