import { describe, it } from 'node:test';
import assert from 'node:assert';
import { BaseLinker } from '../nodes/BaseLinker/BaseLinker.node';

function createMockContext(options: {
	resource: string;
	operation: string;
	params?: Record<string, any>;
	mockResponse?: any;
	mockResponses?: any[];
	binaryData?: Record<string, any>;
}) {
	const capturedCalls: Array<{ method: string; parameters: any }> = [];
	let responseIndex = 0;

	const context = {
		getNode: () => ({ name: 'baseLinkerMock' }),
		getCredentials: async () => ({ token: 'mock-token' }),
		getInputData: () => [{
			json: {},
			binary: options.binaryData,
		}],
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

describe('Invoices and Receipts Extended Operations', () => {
	const node = new BaseLinker();

	describe('addInvoice', () => {
		it('should execute addInvoice in fields mode with series and vat_rate', async () => {
			const { context, capturedCalls } = createMockContext({
				resource: 'invoices',
				operation: 'addInvoice',
				params: {
					addInvoiceMode: 'fields',
					addInvoiceOrderId: 12345,
					addInvoiceSeriesId: 10,
					addInvoiceVatRate: 'DEFAULT',
				},
				mockResponse: { status: 'SUCCESS', invoice_id: 888123 },
			});

			const result = await node.execute.call(context);
			assert.strictEqual(capturedCalls.length, 1);
			assert.strictEqual(capturedCalls[0].method, 'addInvoice');
			assert.deepStrictEqual(capturedCalls[0].parameters, {
				order_id: 12345,
				series_id: 10,
				vat_rate: 'DEFAULT',
			});
			assert.strictEqual(result[0][0].json.success, true);
			assert.strictEqual(result[0][0].json.invoice_id, 888123);
		});

		it('should execute addInvoice with custom vat rate in fields mode', async () => {
			const { context, capturedCalls } = createMockContext({
				resource: 'invoices',
				operation: 'addInvoice',
				params: {
					addInvoiceMode: 'fields',
					addInvoiceOrderId: 12345,
					addInvoiceVatRate: 'custom',
					addInvoiceVatRateCustom: 8,
				},
				mockResponse: { status: 'SUCCESS', invoice_id: 888124 },
			});

			await node.execute.call(context);
			assert.strictEqual(capturedCalls[0].parameters.vat_rate, 8);
		});

		it('should execute addInvoice in json mode', async () => {
			const { context, capturedCalls } = createMockContext({
				resource: 'invoices',
				operation: 'addInvoice',
				params: {
					addInvoiceMode: 'json',
					addInvoiceJson: JSON.stringify({ order_id: 99912, series_id: 2 }),
				},
				mockResponse: { status: 'SUCCESS', invoice_id: 888125 },
			});

			const result = await node.execute.call(context);
			assert.strictEqual(capturedCalls[0].method, 'addInvoice');
			assert.deepStrictEqual(capturedCalls[0].parameters, { order_id: 99912, series_id: 2 });
			assert.strictEqual(result[0][0].json.invoice_id, 888125);
		});

		it('should throw error when order_id is missing in addInvoice json mode', async () => {
			const { context } = createMockContext({
				resource: 'invoices',
				operation: 'addInvoice',
				params: {
					addInvoiceMode: 'json',
					addInvoiceJson: JSON.stringify({ series_id: 2 }),
				},
			});

			await assert.rejects(async () => {
				await node.execute.call(context);
			}, /Parameter "order_id" is required for addInvoice/);
		});
	});

	describe('addInvoiceCorrection', () => {
		it('should execute addInvoiceCorrection with original_invoice_id and additional fields', async () => {
			const { context, capturedCalls } = createMockContext({
				resource: 'invoices',
				operation: 'addInvoiceCorrection',
				params: {
					addCorrectionMode: 'fields',
					correctionIdentifierType: 'original_invoice_id',
					correctionOriginalInvoiceId: 54321,
					correctionSeriesId: 5,
					correctionAdditionalFields: {
						correcting_reason: 1,
						correcting_items: true,
						invoice_fullname: 'John Doe',
						date_sell: '2024-05-01',
						itemsJson: JSON.stringify([{ item_name: 'Item A', item_quantity: 1, item_price_brutto: 50 }]),
					},
				},
				mockResponse: { status: 'SUCCESS', invoice_id: 777123 },
			});

			const result = await node.execute.call(context);
			assert.strictEqual(capturedCalls[0].method, 'addInvoiceCorrection');
			assert.strictEqual(capturedCalls[0].parameters.original_invoice_id, 54321);
			assert.strictEqual(capturedCalls[0].parameters.series_id, 5);
			assert.strictEqual(capturedCalls[0].parameters.correcting_reason, 1);
			assert.strictEqual(capturedCalls[0].parameters.correcting_items, true);
			assert.strictEqual(capturedCalls[0].parameters.invoice_fullname, 'John Doe');
			assert.ok(typeof capturedCalls[0].parameters.date_sell === 'number');
			assert.deepStrictEqual(capturedCalls[0].parameters.items, [
				{ item_name: 'Item A', item_quantity: 1, item_price_brutto: 50 },
			]);
			assert.strictEqual(result[0][0].json.invoice_id, 777123);
		});

		it('should execute addInvoiceCorrection with return_order_id in fields mode', async () => {
			const { context, capturedCalls } = createMockContext({
				resource: 'invoices',
				operation: 'addInvoiceCorrection',
				params: {
					addCorrectionMode: 'fields',
					correctionIdentifierType: 'return_order_id',
					correctionReturnOrderId: 9876,
				},
				mockResponse: { status: 'SUCCESS', invoice_id: 777124 },
			});

			await node.execute.call(context);
			assert.strictEqual(capturedCalls[0].parameters.return_order_id, 9876);
			assert.strictEqual(capturedCalls[0].parameters.original_invoice_id, undefined);
		});

		it('should execute addInvoiceCorrection in json mode', async () => {
			const { context, capturedCalls } = createMockContext({
				resource: 'invoices',
				operation: 'addInvoiceCorrection',
				params: {
					addCorrectionMode: 'json',
					addCorrectionJson: JSON.stringify({ original_invoice_id: 111, correcting_reason: 2 }),
				},
				mockResponse: { status: 'SUCCESS', invoice_id: 777125 },
			});

			await node.execute.call(context);
			assert.strictEqual(capturedCalls[0].parameters.original_invoice_id, 111);
			assert.strictEqual(capturedCalls[0].parameters.correcting_reason, 2);
		});

		it('should throw error when neither original_invoice_id nor return_order_id is in json', async () => {
			const { context } = createMockContext({
				resource: 'invoices',
				operation: 'addInvoiceCorrection',
				params: {
					addCorrectionMode: 'json',
					addCorrectionJson: JSON.stringify({ correcting_reason: 1 }),
				},
			});

			await assert.rejects(async () => {
				await node.execute.call(context);
			}, /Either "original_invoice_id" or "return_order_id" must be provided/);
		});
	});

	describe('addOrderInvoiceFile', () => {
		it('should execute addOrderInvoiceFile with Base64 string', async () => {
			const { context, capturedCalls } = createMockContext({
				resource: 'invoices',
				operation: 'addOrderInvoiceFile',
				params: {
					invoiceFileInvoiceId: 153845,
					invoiceFileInputSource: 'base64',
					invoiceFileBase64: 'JVBERi0xLjQK...',
					invoiceFileExternalNumber: 'FV/2024/001',
				},
				mockResponse: { status: 'SUCCESS' },
			});

			const result = await node.execute.call(context);
			assert.strictEqual(capturedCalls[0].method, 'addOrderInvoiceFile');
			assert.strictEqual(capturedCalls[0].parameters.invoice_id, 153845);
			assert.strictEqual(capturedCalls[0].parameters.file, 'data:JVBERi0xLjQK...');
			assert.strictEqual(capturedCalls[0].parameters.external_invoice_number, 'FV/2024/001');
			assert.strictEqual(result[0][0].json.success, true);
		});

		it('should execute addOrderInvoiceFile with binary data attachment', async () => {
			const samplePdf = Buffer.from('%PDF-1.4 sample content');
			const { context, capturedCalls } = createMockContext({
				resource: 'invoices',
				operation: 'addOrderInvoiceFile',
				params: {
					invoiceFileInvoiceId: 153845,
					invoiceFileInputSource: 'binary',
					invoiceFileBinaryPropertyName: 'data',
				},
				binaryData: {
					data: {
						data: samplePdf.toString('base64'),
						mimeType: 'application/pdf',
						fileName: 'invoice.pdf',
					},
				},
				mockResponse: { status: 'SUCCESS' },
			});

			await node.execute.call(context);
			assert.strictEqual(capturedCalls[0].method, 'addOrderInvoiceFile');
			assert.strictEqual(capturedCalls[0].parameters.invoice_id, 153845);
			assert.strictEqual(capturedCalls[0].parameters.file, `data:${samplePdf.toString('base64')}`);
		});
	});

	describe('addReceipt', () => {
		it('should execute addReceipt in fields mode', async () => {
			const { context, capturedCalls } = createMockContext({
				resource: 'invoices',
				operation: 'addReceipt',
				params: {
					addReceiptMode: 'fields',
					addReceiptOrderId: 4893426,
					addReceiptSeriesId: 1,
				},
				mockResponse: { status: 'SUCCESS', receipt_id: 19824373 },
			});

			const result = await node.execute.call(context);
			assert.strictEqual(capturedCalls[0].method, 'addReceipt');
			assert.deepStrictEqual(capturedCalls[0].parameters, { order_id: 4893426, series_id: 1 });
			assert.strictEqual(result[0][0].json.receipt_id, 19824373);
		});

		it('should execute addReceipt in json mode', async () => {
			const { context, capturedCalls } = createMockContext({
				resource: 'invoices',
				operation: 'addReceipt',
				params: {
					addReceiptMode: 'json',
					addReceiptJson: JSON.stringify({ order_id: 4893426 }),
				},
				mockResponse: { status: 'SUCCESS', receipt_id: 19824374 },
			});

			await node.execute.call(context);
			assert.strictEqual(capturedCalls[0].method, 'addReceipt');
			assert.deepStrictEqual(capturedCalls[0].parameters, { order_id: 4893426 });
		});
	});

	describe('getReceipt', () => {
		it('should execute getReceipt by receipt_id', async () => {
			const { context, capturedCalls } = createMockContext({
				resource: 'invoices',
				operation: 'getReceipt',
				params: {
					getReceiptLookupBy: 'receipt_id',
					getReceiptReceiptId: 3857659,
				},
				mockResponse: {
					status: 'SUCCESS',
					receipt_id: 3857659,
					receipt_full_nr: '2/7/2020/P',
					total_price_brutto: 141,
				},
			});

			const result = await node.execute.call(context);
			assert.strictEqual(capturedCalls[0].method, 'getReceipt');
			assert.deepStrictEqual(capturedCalls[0].parameters, { receipt_id: 3857659 });
			assert.strictEqual(result[0][0].json.receipt_full_nr, '2/7/2020/P');
		});

		it('should execute getReceipt by order_id', async () => {
			const { context, capturedCalls } = createMockContext({
				resource: 'invoices',
				operation: 'getReceipt',
				params: {
					getReceiptLookupBy: 'order_id',
					getReceiptOrderId: 143476260,
				},
				mockResponse: {
					status: 'SUCCESS',
					receipt_id: 3857659,
					order_id: 143476260,
				},
			});

			const result = await node.execute.call(context);
			assert.strictEqual(capturedCalls[0].method, 'getReceipt');
			assert.deepStrictEqual(capturedCalls[0].parameters, { order_id: 143476260 });
			assert.strictEqual(result[0][0].json.order_id, 143476260);
		});
	});

	describe('getReceipts', () => {
		it('should execute getReceipts in fields mode with filters', async () => {
			const { context, capturedCalls } = createMockContext({
				resource: 'invoices',
				operation: 'getReceipts',
				params: {
					getReceiptsMode: 'fields',
					getReceiptsReturnAll: false,
					getReceiptsFilters: {
						series_id: 2,
						id_from: 100,
						date_from: '2024-01-01',
					},
				},
				mockResponse: {
					status: 'SUCCESS',
					receipts: [
						{ receipt_id: 101, receipt_full_nr: '1/2024' },
						{ receipt_id: 102, receipt_full_nr: '2/2024' },
					],
				},
			});

			const result = await node.execute.call(context);
			assert.strictEqual(capturedCalls[0].method, 'getReceipts');
			assert.strictEqual(capturedCalls[0].parameters.series_id, 2);
			assert.strictEqual(capturedCalls[0].parameters.id_from, 100);
			assert.ok(typeof capturedCalls[0].parameters.date_from === 'number');
			assert.strictEqual(result[0].length, 2);
			assert.strictEqual(result[0][0].json.receipt_id, 101);
		});

		it('should paginate getReceipts with returnAll: true', async () => {
			const page1 = Array.from({ length: 100 }, (_, idx) => ({
				receipt_id: 1000 + idx,
				receipt_full_nr: `R_${1000 + idx}`,
			}));
			const page2 = [
				{ receipt_id: 1100, receipt_full_nr: 'R_1100' },
			];

			const { context, capturedCalls } = createMockContext({
				resource: 'invoices',
				operation: 'getReceipts',
				params: {
					getReceiptsMode: 'fields',
					getReceiptsReturnAll: true,
					getReceiptsDelayMs: 0,
					getReceiptsFilters: {},
				},
				mockResponses: [
					{ status: 'SUCCESS', receipts: page1 },
					{ status: 'SUCCESS', receipts: page2 },
				],
			});

			const result = await node.execute.call(context);
			assert.strictEqual(capturedCalls.length, 2);
			assert.strictEqual(capturedCalls[1].parameters.id_from, 1100);
			assert.strictEqual(result[0].length, 101);
		});

		it('should execute getReceipts in json mode', async () => {
			const { context, capturedCalls } = createMockContext({
				resource: 'invoices',
				operation: 'getReceipts',
				params: {
					getReceiptsMode: 'json',
					getReceiptsJson: JSON.stringify({ series_id: 1, id_from: 50 }),
				},
				mockResponse: {
					status: 'SUCCESS',
					receipts: [{ receipt_id: 51 }],
				},
			});

			const result = await node.execute.call(context);
			assert.strictEqual(capturedCalls[0].parameters.series_id, 1);
			assert.strictEqual(capturedCalls[0].parameters.id_from, 50);
			assert.strictEqual(result[0][0].json.receipt_id, 51);
		});
	});

	describe('getNewReceipts', () => {
		it('should execute getNewReceipts and return pending receipts', async () => {
			const { context, capturedCalls } = createMockContext({
				resource: 'invoices',
				operation: 'getNewReceipts',
				params: {
					getNewReceiptsSeriesId: 3,
					getNewReceiptsIdFrom: 10,
					getNewReceiptsDeviceId: 'POS_PRINTER_1',
				},
				mockResponse: {
					status: 'SUCCESS',
					orders: [
						{ receipt_id: 11, receipt_full_nr: '11/P', order_id: 5001 },
						{ receipt_id: 12, receipt_full_nr: '12/P', order_id: 5002 },
					],
				},
			});

			const result = await node.execute.call(context);
			assert.strictEqual(capturedCalls[0].method, 'getNewReceipts');
			assert.deepStrictEqual(capturedCalls[0].parameters, {
				series_id: 3,
				id_from: 10,
				device_id: 'POS_PRINTER_1',
			});
			assert.strictEqual(result[0].length, 2);
			assert.strictEqual(result[0][0].json.receipt_id, 11);
		});
	});

	describe('setOrderReceipt', () => {
		it('should execute setOrderReceipt in fields mode with date normalization', async () => {
			const { context, capturedCalls } = createMockContext({
				resource: 'invoices',
				operation: 'setOrderReceipt',
				params: {
					setOrderReceiptMode: 'fields',
					setReceiptId: 153845,
					setReceiptNr: 'FP 23212',
					setReceiptDate: '2024-06-01',
					setReceiptPrinterError: false,
					setReceiptPrinterName: 'Fiscal123',
				},
				mockResponse: { status: 'SUCCESS' },
			});

			const result = await node.execute.call(context);
			assert.strictEqual(capturedCalls[0].method, 'setOrderReceipt');
			assert.strictEqual(capturedCalls[0].parameters.receipt_id, 153845);
			assert.strictEqual(capturedCalls[0].parameters.receipt_nr, 'FP 23212');
			assert.ok(typeof capturedCalls[0].parameters.date === 'number');
			assert.strictEqual(capturedCalls[0].parameters.printer_name, 'Fiscal123');
			assert.strictEqual(result[0][0].json.success, true);
		});

		it('should execute setOrderReceipt in json mode', async () => {
			const { context, capturedCalls } = createMockContext({
				resource: 'invoices',
				operation: 'setOrderReceipt',
				params: {
					setOrderReceiptMode: 'json',
					setOrderReceiptJson: JSON.stringify({ receipt_id: 153845, printer_error: true }),
				},
				mockResponse: { status: 'SUCCESS' },
			});

			await node.execute.call(context);
			assert.strictEqual(capturedCalls[0].parameters.receipt_id, 153845);
			assert.strictEqual(capturedCalls[0].parameters.printer_error, true);
		});
	});

	describe('addOrderReceiptFile', () => {
		it('should execute addOrderReceiptFile with raw/Base64 string', async () => {
			const { context, capturedCalls } = createMockContext({
				resource: 'invoices',
				operation: 'addOrderReceiptFile',
				params: {
					receiptFileReceiptId: 153845,
					receiptFileInputSource: 'raw',
					receiptFileString: 'data:4AAQSkZJRgABA...',
					receiptFileExternalNumber: 'RC40/08/2023',
				},
				mockResponse: { status: 'SUCCESS' },
			});

			const result = await node.execute.call(context);
			assert.strictEqual(capturedCalls[0].method, 'addOrderReceiptFile');
			assert.strictEqual(capturedCalls[0].parameters.receipt_id, 153845);
			assert.strictEqual(capturedCalls[0].parameters.file, 'data:4AAQSkZJRgABA...');
			assert.strictEqual(capturedCalls[0].parameters.external_receipt_number, 'RC40/08/2023');
			assert.strictEqual(result[0][0].json.success, true);
		});

		it('should execute addOrderReceiptFile with binary attachment', async () => {
			const samplePdf = Buffer.from('%PDF-1.4 receipt sample');
			const { context, capturedCalls } = createMockContext({
				resource: 'invoices',
				operation: 'addOrderReceiptFile',
				params: {
					receiptFileReceiptId: 153845,
					receiptFileInputSource: 'binary',
					receiptFileBinaryPropertyName: 'data',
				},
				binaryData: {
					data: {
						data: samplePdf.toString('base64'),
						mimeType: 'application/pdf',
						fileName: 'receipt.pdf',
					},
				},
				mockResponse: { status: 'SUCCESS' },
			});

			await node.execute.call(context);
			assert.strictEqual(capturedCalls[0].method, 'addOrderReceiptFile');
			assert.strictEqual(capturedCalls[0].parameters.receipt_id, 153845);
			assert.strictEqual(capturedCalls[0].parameters.file, `data:${samplePdf.toString('base64')}`);
		});
	});
});
