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
			prepareBinaryData: async (buffer: Buffer, fileName?: string, mimeType?: string) => {
				return {
					data: buffer.toString('base64'),
					fileName,
					fileSize: `${buffer.length} bytes`,
					mimeType: mimeType || 'application/pdf',
				};
			},
		},
	};

	return { context: context as any, capturedCalls };
}

describe('Invoices operations', () => {
	const node = new BaseLinker();

	it('should execute getInvoices in UI fields mode', async () => {
		const mockInvoices = [
			{
				invoice_id: 663197,
				order_id: 5695322,
				type: 'normal',
				number: '1/3/2016/shop',
				total_price_brutto: 253,
			},
		];

		const { context, capturedCalls } = createMockContext({
			resource: 'invoices',
			operation: 'getInvoices',
			params: {
				parameterMode: 'fields',
				returnAll: false,
				filters: {
					order_id: 5695322,
					series_id: 15,
					get_government_data: true,
				},
			},
			mockResponse: { status: 'SUCCESS', invoices: mockInvoices },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.invoice_id, 663197);
		assert.strictEqual(result[0][0].json.number, '1/3/2016/shop');
		assert.strictEqual(capturedCalls[0].method, 'getInvoices');
		assert.strictEqual(capturedCalls[0].parameters.order_id, 5695322);
		assert.strictEqual(capturedCalls[0].parameters.series_id, 15);
		assert.strictEqual(capturedCalls[0].parameters.get_government_data, true);
	});

	it('should execute getInvoices in JSON mode', async () => {
		const mockInvoices = [{ invoice_id: 999, number: 'INV/2026/01' }];

		const { context, capturedCalls } = createMockContext({
			resource: 'invoices',
			operation: 'getInvoices',
			params: {
				parameterMode: 'json',
				parametersJson: JSON.stringify({ date_from: 1600000000, series_id: 20 }),
			},
			mockResponse: { status: 'SUCCESS', invoices: mockInvoices },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.invoice_id, 999);
		assert.strictEqual(capturedCalls[0].parameters.date_from, 1600000000);
		assert.strictEqual(capturedCalls[0].parameters.series_id, 20);
	});

	it('should throw error when invalid JSON is provided for getInvoices', async () => {
		const { context } = createMockContext({
			resource: 'invoices',
			operation: 'getInvoices',
			params: {
				parameterMode: 'json',
				parametersJson: 'not a valid json',
			},
			mockResponse: { status: 'SUCCESS' },
		});

		await assert.rejects(async () => {
			await node.execute.call(context);
		}, /Invalid JSON provided for getInvoices/);
	});

	it('should paginate getInvoices using id_from cursor when returnAll is true', async () => {
		const page1 = Array.from({ length: 100 }, (_, i) => ({
			invoice_id: 1000 + i,
			number: `INV/${1000 + i}`,
		}));
		const page2 = Array.from({ length: 15 }, (_, i) => ({
			invoice_id: 1100 + i,
			number: `INV/${1100 + i}`,
		}));

		const { context, capturedCalls } = createMockContext({
			resource: 'invoices',
			operation: 'getInvoices',
			params: {
				parameterMode: 'fields',
				returnAll: true,
				limit: 150,
				paginationField: 'id_from',
				delayMs: 0,
				filters: {},
			},
			mockResponses: [
				{ status: 'SUCCESS', invoices: page1 },
				{ status: 'SUCCESS', invoices: page2 },
			],
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 115);
		assert.strictEqual(capturedCalls.length, 2);
		assert.strictEqual(capturedCalls[1].parameters.id_from, 1100);
	});

	it('should execute getInvoiceFile and output JSON', async () => {
		const mockBase64 = Buffer.from('pdf invoice content').toString('base64');

		const { context, capturedCalls } = createMockContext({
			resource: 'invoices',
			operation: 'getInvoiceFile',
			params: {
				invoice_id: 153845,
				get_external: true,
				downloadBinary: false,
			},
			mockResponse: {
				status: 'SUCCESS',
				invoice_number: 'FV 101/03/2026',
				invoice: `data:${mockBase64}`,
			},
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.invoice_id, 153845);
		assert.strictEqual(result[0][0].json.invoice_number, 'FV 101/03/2026');
		assert.strictEqual(result[0][0].binary, undefined);
		assert.strictEqual(capturedCalls[0].method, 'getInvoiceFile');
		assert.deepStrictEqual(capturedCalls[0].parameters, {
			invoice_id: 153845,
			get_external: true,
		});
	});

	it('should execute getInvoiceFile and decode binary data attachment', async () => {
		const rawContent = 'raw pdf stream';
		const mockBase64 = Buffer.from(rawContent).toString('base64');

		const { context } = createMockContext({
			resource: 'invoices',
			operation: 'getInvoiceFile',
			params: {
				invoice_id: 153845,
				get_external: false,
				downloadBinary: true,
				binaryPropertyName: 'invoicePdf',
				fileName: 'vat_invoice.pdf',
			},
			mockResponse: {
				status: 'SUCCESS',
				invoice_number: 'FV 101/03/2026',
				invoice: `data:${mockBase64}`,
			},
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 1);
		assert.ok(result[0][0].binary?.invoicePdf);
		assert.strictEqual(result[0][0].binary?.invoicePdf.fileName, 'vat_invoice.pdf');
		assert.strictEqual(result[0][0].binary?.invoicePdf.data, mockBase64);
		assert.strictEqual(result[0][0].binary?.invoicePdf.mimeType, 'application/pdf');
	});

	it('should execute getSeries and support type filtering', async () => {
		const mockSeries = [
			{ id: '15', type: 'INVOICE', name: 'Standard', format: '%N/%Y' },
			{ id: '20', type: 'CORRECTION', name: 'Correction PL', format: '%N/K/%Y' },
			{ id: '25', type: 'RECEIPT', name: 'Fiscal Receipt', format: '%N/%M/%Y' },
		];

		const { context, capturedCalls } = createMockContext({
			resource: 'invoices',
			operation: 'getSeries',
			params: { seriesTypeFilter: 'CORRECTION' },
			mockResponse: { status: 'SUCCESS', series: mockSeries },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.name, 'Correction PL');
		assert.strictEqual(result[0][0].json.type, 'CORRECTION');
		assert.strictEqual(capturedCalls[0].method, 'getSeries');
	});

	it('should load dynamic dropdown options for getInvoiceSeries', async () => {
		const mockSeries = [
			{ id: '15', type: 'INVOICE', name: 'Standard Series', format: '%N/%Y' },
		];

		const mockLoadOptionsContext = {
			helpers: {
				httpRequest: async () => ({ status: 'SUCCESS', series: mockSeries }),
			},
			getNode: () => ({ name: 'test' }),
			getCredentials: async () => ({ token: 'mock' }),
		};

		const options = await node.methods.loadOptions.getInvoiceSeries.call(
			mockLoadOptionsContext as any,
		);
		assert.strictEqual(options.length, 1);
		assert.strictEqual(options[0].value, 15);
		assert.ok((options[0].name as string).includes('Standard Series'));
	});
});
