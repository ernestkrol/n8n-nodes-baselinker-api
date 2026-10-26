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
			prepareBinaryData: async (buffer: Buffer, fileName?: string) => {
				return {
					data: buffer.toString('base64'),
					fileName,
					fileSize: `${buffer.length} bytes`,
					mimeType: 'application/pdf',
				};
			},
		},
	};

	return { context: context as any, capturedCalls };
}

describe('CourierShipments operations', () => {
	const node = new BaseLinker();

	it('should execute getOrderPackages under courierShipments resource', async () => {
		const mockPackages = [
			{
				package_id: 7323858,
				courier_package_nr: '0000081265020U',
				courier_inner_number: '33893480912',
				courier_code: 'dpd',
				tracking_status: 4,
				is_return: false,
			},
		];

		const { context, capturedCalls } = createMockContext({
			resource: 'courierShipments',
			operation: 'getOrderPackages',
			params: { order_id: 6910995 },
			mockResponse: { status: 'SUCCESS', packages: mockPackages },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.package_id, 7323858);
		assert.strictEqual(capturedCalls[0].method, 'getOrderPackages');
		assert.strictEqual(capturedCalls[0].parameters.order_id, 6910995);
	});

	it('should execute getOrderPackages under orders resource', async () => {
		const mockPackages = [
			{ package_id: 12345, courier_package_nr: 'INPOST123', courier_code: 'inpost' },
		];

		const { context, capturedCalls } = createMockContext({
			resource: 'orders',
			operation: 'getOrderPackages',
			params: { order_packages_order_id: 8888 },
			mockResponse: { status: 'SUCCESS', packages: mockPackages },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.courier_code, 'inpost');
		assert.strictEqual(capturedCalls[0].parameters.order_id, 8888);
	});

	it('should execute getPackageDetails', async () => {
		const mockDetails = [
			{
				weight: 5.5,
				weight_unit: 'kg',
				length: 20,
				width: 30,
				height: 10,
				type: 'package',
			},
		];

		const { context, capturedCalls } = createMockContext({
			resource: 'courierShipments',
			operation: 'getPackageDetails',
			params: { package_id: 7323859 },
			mockResponse: {
				status: 'SUCCESS',
				package_details: mockDetails,
				additional_fields: { shipment_notice: 'SKU-1' },
			},
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.package_id, 7323859);
		assert.strictEqual(result[0][0].json.weight, 5.5);
		assert.deepStrictEqual(result[0][0].json.additional_fields, { shipment_notice: 'SKU-1' });
		assert.strictEqual(capturedCalls[0].method, 'getPackageDetails');
	});

	it('should execute getCourierPackagesStatusHistory in perPackage format', async () => {
		const mockHistory = {
			'7323859': [
				{ tracking_status_date: 1513764000, courier_status_code: '030103', tracking_status: 1 },
				{ tracking_status_date: 1513782900, courier_status_code: '040101', tracking_status: 2 },
			],
		};

		const { context, capturedCalls } = createMockContext({
			resource: 'courierShipments',
			operation: 'getCourierPackagesStatusHistory',
			params: {
				package_ids: '7323859',
				statusHistoryOutputFormat: 'perPackage',
			},
			mockResponse: { status: 'SUCCESS', packages_history: mockHistory },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.package_id, 7323859);
		assert.strictEqual((result[0][0].json.history as any[]).length, 2);
		assert.deepStrictEqual(capturedCalls[0].parameters.package_ids, [7323859]);
	});

	it('should execute getCourierPackagesStatusHistory in flatEvents format', async () => {
		const mockHistory = {
			'7323859': [
				{ tracking_status_date: 1513764000, courier_status_code: '030103', tracking_status: 1 },
				{ tracking_status_date: 1513782900, courier_status_code: '040101', tracking_status: 2 },
			],
		};

		const { context } = createMockContext({
			resource: 'courierShipments',
			operation: 'getCourierPackagesStatusHistory',
			params: {
				package_ids: '7323859',
				statusHistoryOutputFormat: 'flatEvents',
			},
			mockResponse: { status: 'SUCCESS', packages_history: mockHistory },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 2);
		assert.strictEqual(result[0][0].json.package_id, 7323859);
		assert.strictEqual(result[0][0].json.tracking_status, 1);
		assert.strictEqual(result[0][1].json.tracking_status, 2);
	});

	it('should execute getLabel with package_id', async () => {
		const mockBase64 = Buffer.from('mock pdf label content').toString('base64');
		const { context, capturedCalls } = createMockContext({
			resource: 'courierShipments',
			operation: 'getLabel',
			params: {
				courier_code: 'dhl',
				package_id: 7323859,
				downloadBinary: false,
			},
			mockResponse: {
				status: 'SUCCESS',
				extension: 'pdf',
				label: mockBase64,
			},
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.courier_code, 'dhl');
		assert.strictEqual(result[0][0].json.package_id, 7323859);
		assert.strictEqual(result[0][0].json.extension, 'pdf');
		assert.strictEqual(result[0][0].json.label, mockBase64);
		assert.strictEqual(result[0][0].binary, undefined);
		assert.strictEqual(capturedCalls[0].method, 'getLabel');
		assert.deepStrictEqual(capturedCalls[0].parameters, {
			courier_code: 'dhl',
			package_id: 7323859,
		});
	});

	it('should execute getLabel with package_number and download binary data', async () => {
		const labelContent = 'fake zpl label';
		const mockBase64 = Buffer.from(labelContent).toString('base64');
		const { context, capturedCalls } = createMockContext({
			resource: 'courierShipments',
			operation: 'getLabel',
			params: {
				courier_code: 'dpd',
				package_number: 'DPD001928312',
				downloadBinary: true,
				binaryPropertyName: 'labelFile',
				fileName: 'custom_label.zpl',
			},
			mockResponse: {
				status: 'SUCCESS',
				extension: 'zpl',
				label: mockBase64,
			},
		});

		const result = await node.execute.call(context);

		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.courier_code, 'dpd');
		assert.strictEqual(result[0][0].json.package_number, 'DPD001928312');
		assert.strictEqual(result[0][0].json.extension, 'zpl');
		assert.ok(result[0][0].binary?.labelFile);
		assert.strictEqual(result[0][0].binary?.labelFile.fileName, 'custom_label.zpl');
		assert.strictEqual(result[0][0].binary?.labelFile.data, mockBase64);
		assert.deepStrictEqual(capturedCalls[0].parameters, {
			courier_code: 'dpd',
			package_number: 'DPD001928312',
		});
	});

	it('should throw error if neither package_id nor package_number is provided for getLabel', async () => {
		const { context } = createMockContext({
			resource: 'courierShipments',
			operation: 'getLabel',
			params: {
				courier_code: 'inpost',
			},
			mockResponse: { status: 'SUCCESS' },
		});

		await assert.rejects(
			async () => {
				await node.execute.call(context);
			},
			/Either Package ID or Package Number must be provided/,
		);
	});

	it('should execute createPackage in fields mode', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'courierShipments',
			operation: 'createPackage',
			params: {
				order_id: 6910995,
				courier_code: 'dhl',
				account_id: 33,
				createPackageMode: 'fields',
				fieldsUi: {
					fieldValues: [
						{ id: 'service', value: 'dhl' },
						{ id: 'cod', value: '101' },
					],
				},
				packagesUi: {
					packageValues: [
						{ weight: 4, length: 11, width: 13, height: 12, size_custom: true },
					],
				},
			},
			mockResponse: {
				status: 'SUCCESS',
				package_id: 77014696,
				package_number: '622222044730624327700198',
				courier_inner_number: '12387890',
				packages: [
					{
						package_id: 77014696,
						package_number: '622222044730624327700198',
						courier_inner_number: '12387890',
					},
				],
			},
		});

		const result = await node.execute.call(context);

		assert.strictEqual(capturedCalls[0].method, 'createPackage');
		assert.strictEqual(capturedCalls[0].parameters.order_id, 6910995);
		assert.strictEqual(capturedCalls[0].parameters.courier_code, 'dhl');
		assert.strictEqual(capturedCalls[0].parameters.account_id, 33);
		assert.deepStrictEqual(capturedCalls[0].parameters.fields, [
			{ id: 'service', value: 'dhl' },
			{ id: 'cod', value: '101' },
		]);
		assert.deepStrictEqual(capturedCalls[0].parameters.packages, [
			{ weight: 4, length: 11, width: 13, height: 12, size_custom: 1 },
		]);
		assert.strictEqual(result[0][0].json.package_id, 77014696);
		assert.strictEqual(result[0][0].json.package_number, '622222044730624327700198');
	});

	it('should execute createPackage in json mode', async () => {
		const jsonPayload = {
			order_id: 6910995,
			courier_code: 'dpd',
			fields: [{ id: 'service', value: 'classic' }],
			packages: [{ weight: 2 }],
		};

		const { context, capturedCalls } = createMockContext({
			resource: 'courierShipments',
			operation: 'createPackage',
			params: {
				createPackageMode: 'json',
				createPackageJson: JSON.stringify(jsonPayload),
			},
			mockResponse: {
				status: 'SUCCESS',
				package_id: 88001122,
				package_number: 'DPD88001122',
			},
		});

		const result = await node.execute.call(context);

		assert.strictEqual(capturedCalls[0].method, 'createPackage');
		assert.strictEqual(capturedCalls[0].parameters.order_id, 6910995);
		assert.strictEqual(capturedCalls[0].parameters.courier_code, 'dpd');
		assert.strictEqual(result[0][0].json.package_id, 88001122);
	});

	it('should execute createPackageManual with pickup_date and return_shipment', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'courierShipments',
			operation: 'createPackageManual',
			params: {
				order_id: 6910995,
				courier_code: 'dhl',
				manual_package_number: '622222044730624327700197',
				pickup_date: 1487006161,
				return_shipment: true,
			},
			mockResponse: {
				status: 'SUCCESS',
				package_id: 77014697,
				package_number: '622222044730624327700197',
			},
		});

		const result = await node.execute.call(context);

		assert.strictEqual(capturedCalls[0].method, 'createPackageManual');
		assert.strictEqual(capturedCalls[0].parameters.order_id, 6910995);
		assert.strictEqual(capturedCalls[0].parameters.courier_code, 'dhl');
		assert.strictEqual(capturedCalls[0].parameters.package_number, '622222044730624327700197');
		assert.strictEqual(capturedCalls[0].parameters.pickup_date, 1487006161);
		assert.strictEqual(capturedCalls[0].parameters.return_shipment, true);
		assert.strictEqual(result[0][0].json.package_id, 77014697);
	});

	it('should execute deleteCourierPackage with package_id and force_delete', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'courierShipments',
			operation: 'deleteCourierPackage',
			params: {
				courier_code: 'dhl',
				package_id: 77014696,
				force_delete: true,
			},
			mockResponse: { status: 'SUCCESS' },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(capturedCalls[0].method, 'deleteCourierPackage');
		assert.strictEqual(capturedCalls[0].parameters.courier_code, 'dhl');
		assert.strictEqual(capturedCalls[0].parameters.package_id, 77014696);
		assert.strictEqual(capturedCalls[0].parameters.force_delete, true);
		assert.strictEqual(result[0][0].json.success, true);
	});

	it('should execute deleteCourierPackage with package_number', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'courierShipments',
			operation: 'deleteCourierPackage',
			params: {
				courier_code: 'dpd',
				package_number: 'DPD123456',
			},
			mockResponse: { status: 'SUCCESS' },
		});

		const result = await node.execute.call(context);

		assert.strictEqual(capturedCalls[0].method, 'deleteCourierPackage');
		assert.strictEqual(capturedCalls[0].parameters.courier_code, 'dpd');
		assert.strictEqual(capturedCalls[0].parameters.package_number, 'DPD123456');
		assert.strictEqual(result[0][0].json.success, true);
	});

	it('should throw error in deleteCourierPackage when neither package_id nor package_number is given', async () => {
		const { context } = createMockContext({
			resource: 'courierShipments',
			operation: 'deleteCourierPackage',
			params: {
				courier_code: 'dpd',
			},
			mockResponse: { status: 'SUCCESS' },
		});

		await assert.rejects(
			async () => {
				await node.execute.call(context);
			},
			/Either Package ID or Package Number must be provided/,
		);
	});

	it('should execute getPricePackage in fields mode with multiple returned quotes', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'courierShipments',
			operation: 'getPricePackage',
			params: {
				order_id: 6910995,
				courier_code: 'dhl',
				account_id: 33,
				getPricePackageMode: 'fields',
				fieldsUi: {
					fieldValues: [{ id: 'service', value: 'standard' }],
				},
				packagesUi: {
					packageValues: [{ weight: 4, length: 11, width: 13, height: 12 }],
				},
			},
			mockResponse: {
				status: 'SUCCESS',
				prices: [
					{
						name: 'EXPRESS DOMESTIC',
						price: 131,
						currency: 'PLN',
						info: 'Surcharges included',
						selected: true,
					},
					{
						name: 'STANDARD DOMESTIC',
						price: 85,
						currency: 'PLN',
						selected: false,
					},
				],
				header: 'Estimated prices',
				notices: ['Notice 1'],
			},
		});

		const result = await node.execute.call(context);

		assert.strictEqual(capturedCalls[0].method, 'getPricePackage');
		assert.strictEqual(result[0].length, 2);
		assert.strictEqual(result[0][0].json.name, 'EXPRESS DOMESTIC');
		assert.strictEqual(result[0][0].json.price, 131);
		assert.strictEqual(result[0][0].json.header, 'Estimated prices');
		assert.strictEqual(result[0][1].json.name, 'STANDARD DOMESTIC');
		assert.strictEqual(result[0][1].json.price, 85);
	});

	it('should execute getPricePackage in json mode with empty quotes', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'courierShipments',
			operation: 'getPricePackage',
			params: {
				getPricePackageMode: 'json',
				getPricePackageJson: JSON.stringify({
					order_id: 1234,
					courier_code: 'dpd',
					fields: [],
					packages: [{ weight: 1 }],
				}),
			},
			mockResponse: {
				status: 'SUCCESS',
				prices: [],
				header: 'No services available',
			},
		});

		const result = await node.execute.call(context);

		assert.strictEqual(capturedCalls[0].method, 'getPricePackage');
		assert.strictEqual(result[0].length, 1);
		assert.deepStrictEqual(result[0][0].json.prices, []);
		assert.strictEqual(result[0][0].json.header, 'No services available');
	});

	it('should execute getCourierAccounts and unpack accounts list', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'courierShipments',
			operation: 'getCourierAccounts',
			params: {
				courier_code: 'dpd',
			},
			mockResponse: {
				status: 'SUCCESS',
				accounts: [
					{ id: 60, name: 'London Branch' },
					{ id: 251, name: 'Manchester Branch' },
				],
			},
		});

		const result = await node.execute.call(context);

		assert.strictEqual(capturedCalls[0].method, 'getCourierAccounts');
		assert.strictEqual(capturedCalls[0].parameters.courier_code, 'dpd');
		assert.strictEqual(result[0].length, 2);
		assert.strictEqual(result[0][0].json.id, 60);
		assert.strictEqual(result[0][0].json.name, 'London Branch');
		assert.strictEqual(result[0][1].json.id, 251);
	});

	it('should execute getCourierFields', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'courierShipments',
			operation: 'getCourierFields',
			params: {
				courier_code: 'dhl',
			},
			mockResponse: {
				status: 'SUCCESS',
				multi_packages: false,
				fields: [{ id: 'courier', name: 'Courier', type: 'select' }],
				package_fields: [{ id: 'weight', name: 'Weight', type: 'float' }],
			},
		});

		const result = await node.execute.call(context);

		assert.strictEqual(capturedCalls[0].method, 'getCourierFields');
		assert.strictEqual(result[0].length, 1);
		assert.strictEqual(result[0][0].json.courier_code, 'dhl');
		assert.strictEqual(result[0][0].json.multi_packages, false);
		assert.strictEqual((result[0][0].json.fields as any[]).length, 1);
		assert.strictEqual((result[0][0].json.package_fields as any[]).length, 1);
	});

	it('should execute getCourierServices in fields mode and unpack services', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'courierShipments',
			operation: 'getCourierServices',
			params: {
				order_id: 6911000,
				courier_code: 'brokersystem',
				account_id: 294,
				getCourierServicesMode: 'fields',
				fieldsUi: {
					fieldValues: [{ id: 'package_type', value: 'package' }],
				},
				packagesUi: {
					packageValues: [{ weight: 4 }],
				},
			},
			mockResponse: {
				status: 'SUCCESS',
				services: {
					'12345-2-dpd': 'DPD Classic (15.50 PLN)',
					'12345-18-ups': 'UPS Standard (18.90 PLN)',
				},
			},
		});

		const result = await node.execute.call(context);

		assert.strictEqual(capturedCalls[0].method, 'getCourierServices');
		assert.strictEqual(capturedCalls[0].parameters.order_id, 6911000);
		assert.strictEqual(result[0].length, 2);
		assert.strictEqual(result[0][0].json.service_id, '12345-2-dpd');
		assert.strictEqual(result[0][0].json.service_name, 'DPD Classic (15.50 PLN)');
		assert.strictEqual(result[0][1].json.service_id, '12345-18-ups');
	});

	it('should execute getCouriersList and return all available couriers', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'courierShipments',
			operation: 'getCouriersList',
			params: {},
			mockResponse: {
				status: 'SUCCESS',
				couriers: [
					{ code: 'dhl', name: 'DHL PL' },
					{ code: 'dpd', name: 'DPD PL' },
					{ code: 'inpostkurier', name: 'InPost Kurier' },
				],
			},
		});

		const result = await node.execute.call(context);

		assert.strictEqual(capturedCalls[0].method, 'getCouriersList');
		assert.strictEqual(result[0].length, 3);
		assert.strictEqual(result[0][0].json.code, 'dhl');
		assert.strictEqual(result[0][1].json.code, 'dpd');
		assert.strictEqual(result[0][2].json.code, 'inpostkurier');
	});

	it('should execute getCourierDocument with downloadBinary: true', async () => {
		const docContent = 'fake customs doc';
		const mockBase64 = Buffer.from(docContent).toString('base64');
		const { context, capturedCalls } = createMockContext({
			resource: 'courierShipments',
			operation: 'getCourierDocument',
			params: {
				courier_code: 'colissimo',
				document_type: 'customs_document',
				account_id: 16,
				document_package_ids: '123, 124',
				downloadBinary: true,
				binaryPropertyName: 'docAttachment',
				fileName: 'customs.pdf',
			},
			mockResponse: {
				status: 'SUCCESS',
				extension: 'pdf',
				document: mockBase64,
			},
		});

		const result = await node.execute.call(context);

		assert.strictEqual(capturedCalls[0].method, 'getCourierDocument');
		assert.strictEqual(capturedCalls[0].parameters.courier_code, 'colissimo');
		assert.strictEqual(capturedCalls[0].parameters.document_type, 'customs_document');
		assert.deepStrictEqual(capturedCalls[0].parameters.package_ids, [123, 124]);
		assert.strictEqual(result[0][0].json.extension, 'pdf');
		assert.ok(result[0][0].binary?.docAttachment);
		assert.strictEqual(result[0][0].binary?.docAttachment.fileName, 'customs.pdf');
		assert.strictEqual(result[0][0].binary?.docAttachment.data, mockBase64);
	});

	it('should execute getProtocol with downloadBinary: true', async () => {
		const protocolContent = 'fake raben protocol';
		const mockBase64 = Buffer.from(protocolContent).toString('base64');
		const { context, capturedCalls } = createMockContext({
			resource: 'courierShipments',
			operation: 'getProtocol',
			params: {
				courier_code: 'raben',
				document_package_ids: '7323859, 8421839',
				downloadBinary: true,
			},
			mockResponse: {
				status: 'SUCCESS',
				extension: 'pdf',
				protocol: mockBase64,
			},
		});

		const result = await node.execute.call(context);

		assert.strictEqual(capturedCalls[0].method, 'getProtocol');
		assert.strictEqual(capturedCalls[0].parameters.courier_code, 'raben');
		assert.deepStrictEqual(capturedCalls[0].parameters.package_ids, [7323859, 8421839]);
		assert.strictEqual(result[0][0].json.extension, 'pdf');
		assert.ok(result[0][0].binary?.data);
		assert.strictEqual(result[0][0].binary?.data.fileName, 'protocol_raben.pdf');
		assert.strictEqual(result[0][0].binary?.data.data, mockBase64);
	});

	it('should execute getRequestParcelPickupFields', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'courierShipments',
			operation: 'getRequestParcelPickupFields',
			params: {
				courier_code: 'dpd',
			},
			mockResponse: {
				status: 'SUCCESS',
				fields: [{ id: 'pickup_date', name: 'Pickup date', type: 'date' }],
			},
		});

		const result = await node.execute.call(context);

		assert.strictEqual(capturedCalls[0].method, 'getRequestParcelPickupFields');
		assert.strictEqual(capturedCalls[0].parameters.courier_code, 'dpd');
		assert.strictEqual(result[0][0].json.courier_code, 'dpd');
		assert.strictEqual((result[0][0].json.fields as any[]).length, 1);
	});

	it('should execute runRequestParcelPickup in fields mode', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'courierShipments',
			operation: 'runRequestParcelPickup',
			params: {
				courier_code: 'dpd',
				account_id: 1645,
				document_package_numbers: '0000000815947Q, 0000000633844Q',
				runPickupMode: 'fields',
				pickupFieldsUi: {
					pickupFieldValues: [{ id: 'pickup_date', value: '1642672310' }],
				},
			},
			mockResponse: {
				status: 'SUCCESS',
				pickup_number: '20220119563',
			},
		});

		const result = await node.execute.call(context);

		assert.strictEqual(capturedCalls[0].method, 'runRequestParcelPickup');
		assert.strictEqual(capturedCalls[0].parameters.courier_code, 'dpd');
		assert.strictEqual(capturedCalls[0].parameters.account_id, 1645);
		assert.deepStrictEqual(capturedCalls[0].parameters.package_numbers, [
			'0000000815947Q',
			'0000000633844Q',
		]);
		assert.deepStrictEqual(capturedCalls[0].parameters.fields, [
			{ id: 'pickup_date', value: '1642672310' },
		]);
		assert.strictEqual(result[0][0].json.pickup_number, '20220119563');
	});

	it('should execute runRequestParcelPickup in json mode', async () => {
		const { context, capturedCalls } = createMockContext({
			resource: 'courierShipments',
			operation: 'runRequestParcelPickup',
			params: {
				runPickupMode: 'json',
				runPickupJson: JSON.stringify({
					courier_code: 'fedex',
					package_ids: [9988],
					fields: [{ id: 'pickup_date', value: 1700000000 }],
				}),
			},
			mockResponse: {
				status: 'SUCCESS',
				pickup_number: 'FX-PICKUP-123',
			},
		});

		const result = await node.execute.call(context);

		assert.strictEqual(capturedCalls[0].method, 'runRequestParcelPickup');
		assert.strictEqual(capturedCalls[0].parameters.courier_code, 'fedex');
		assert.strictEqual(result[0][0].json.pickup_number, 'FX-PICKUP-123');
	});

	it('should load courier options dynamically via loadOptions', async () => {
		const loadContext = {
			getCurrentNodeParameter: (name: string) => {
				if (name === 'courier_code') return 'dpd';
				return undefined;
			},
			getNode: () => ({ name: 'baseLinkerMock' }),
			getCredentials: async () => ({ token: 'mock-token' }),
			helpers: {
				httpRequest: async (reqOptions: any) => {
					const bodyStr = reqOptions.body.toString();
					const params = new URLSearchParams(bodyStr);
					const method = params.get('method') || '';
					if (method === 'getCouriersList') {
						return {
							status: 'SUCCESS',
							couriers: [
								{ code: 'dhl', name: 'DHL PL' },
								{ code: 'dpd', name: 'DPD PL' },
							],
						};
					}
					if (method === 'getCourierAccounts') {
						return {
							status: 'SUCCESS',
							accounts: [
								{ id: 10, name: 'Main Account' },
								{ id: 20, name: 'Secondary' },
							],
						};
					}
					return { status: 'SUCCESS' };
				},
			},
		} as any;

		const couriers = await node.methods!.loadOptions!.getCouriersList.call(loadContext);
		assert.strictEqual(couriers.length, 2);
		assert.strictEqual(couriers[0].value, 'dhl');
		assert.strictEqual(couriers[1].value, 'dpd');

		const accounts = await node.methods!.loadOptions!.getCourierAccounts.call(loadContext);
		assert.strictEqual(accounts.length, 2);
		assert.strictEqual(accounts[0].value, 10);
		assert.strictEqual(accounts[1].value, 20);
	});
});

