import { INodeProperties } from 'n8n-workflow';

export const courierShipmentsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['courierShipments'],
			},
		},
		options: [
			{
				name: 'Create Package',
				value: 'createPackage',
				description: 'Create a shipment via courier API (method: createPackage)',
				action: 'Create package',
			},
			{
				name: 'Create Package (Manual)',
				value: 'createPackageManual',
				description: 'Enter external shipping number into order without dispatching through courier API (method: createPackageManual)',
				action: 'Create package manual',
			},
			{
				name: 'Delete Package',
				value: 'deleteCourierPackage',
				description: 'Cancel / delete a courier shipment (method: deleteCourierPackage)',
				action: 'Delete package',
			},
			{
				name: 'Get Courier Accounts',
				value: 'getCourierAccounts',
				description: 'Retrieve list of accounts connected with a courier (method: getCourierAccounts)',
				action: 'Get courier accounts',
			},
			{
				name: 'Get Courier Document',
				value: 'getCourierDocument',
				description: 'Download parcel documents like manifest, protocol, customs document (method: getCourierDocument)',
				action: 'Get courier document',
			},
			{
				name: 'Get Courier Fields',
				value: 'getCourierFields',
				description: 'Retrieve form fields required for creating shipments for a courier (method: getCourierFields)',
				action: 'Get courier fields',
			},
			{
				name: 'Get Courier Services',
				value: 'getCourierServices',
				description: 'Retrieve dynamic courier services depending on shipment settings (method: getCourierServices)',
				action: 'Get courier services',
			},
			{
				name: 'Get Couriers List',
				value: 'getCouriersList',
				description: 'Retrieve list of all available courier integrations (method: getCouriersList)',
				action: 'Get couriers list',
			},
			{
				name: 'Get Label',
				value: 'getLabel',
				description: 'Download a shipping label for a selected shipment (method: getLabel)',
				action: 'Get label',
			},
			{
				name: 'Get Order Packages',
				value: 'getOrderPackages',
				description: 'Download shipments previously created for an order (method: getOrderPackages)',
				action: 'Get order packages',
			},
			{
				name: 'Get Package Details',
				value: 'getPackageDetails',
				description: 'Get detailed information about a package, dimensions, and subpackages (method: getPackageDetails)',
				action: 'Get package details',
			},
			{
				name: 'Get Packages Status History',
				value: 'getCourierPackagesStatusHistory',
				description: 'Retrieve status history of given shipments (method: getCourierPackagesStatusHistory)',
				action: 'Get packages status history',
			},
			{
				name: 'Get Price Package',
				value: 'getPricePackage',
				description: 'Retrieve available shipment quotations / prices from courier (method: getPricePackage)',
				action: 'Get price package',
			},
			{
				name: 'Get Protocol',
				value: 'getProtocol',
				description: 'Download dispatch protocol for shipments (method: getProtocol)',
				action: 'Get protocol',
			},
			{
				name: 'Get Request Parcel Pickup Fields',
				value: 'getRequestParcelPickupFields',
				description: 'Retrieve form fields required to request courier pickup (method: getRequestParcelPickupFields)',
				action: 'Get request parcel pickup fields',
			},
			{
				name: 'Run Request Parcel Pickup',
				value: 'runRequestParcelPickup',
				description: 'Order courier parcel pickup for created shipments (method: runRequestParcelPickup)',
				action: 'Run request parcel pickup',
			},
		],
		default: 'getOrderPackages',
	},
];

export const courierShipmentsFields: INodeProperties[] = [
	// ----------------------------------
	//   Shared Order ID
	// ----------------------------------
	{
		displayName: 'Order ID',
		name: 'order_id',
		type: 'number',
		default: '',
		placeholder: 'e.g. 6910995',
		required: true,
		displayOptions: {
			show: {
				resource: ['courierShipments', 'orders'],
				operation: [
					'getOrderPackages',
					'createPackage',
					'createPackageManual',
					'getPricePackage',
					'getCourierServices',
				],
			},
		},
		description: 'Order identifier from BaseLinker',
	},

	// ----------------------------------
	//   Shared Courier Code
	// ----------------------------------
	{
		displayName: 'Courier Code',
		name: 'courier_code',
		type: 'string',
		default: '',
		placeholder: 'e.g. dhl, dpd, inpost, poczta_polska',
		required: true,
		displayOptions: {
			show: {
				resource: ['courierShipments'],
				operation: [
					'createPackage',
					'createPackageManual',
					'deleteCourierPackage',
					'getCourierAccounts',
					'getCourierDocument',
					'getCourierFields',
					'getCourierServices',
					'getLabel',
					'getPricePackage',
					'getProtocol',
					'getRequestParcelPickupFields',
					'runRequestParcelPickup',
				],
			},
		},
		description: 'Courier code identifier (e.g. dhl, dpd, inpost, poczta_polska, fedex)',
	},

	// ----------------------------------
	//   Shared Account ID
	// ----------------------------------
	{
		displayName: 'Account ID',
		name: 'account_id',
		type: 'number',
		default: '',
		placeholder: 'e.g. 33',
		displayOptions: {
			show: {
				resource: ['courierShipments'],
				operation: [
					'createPackage',
					'getPricePackage',
					'getCourierServices',
					'getCourierDocument',
					'getProtocol',
					'runRequestParcelPickup',
				],
			},
		},
		description: 'Optional courier API account ID from getCourierAccounts. If omitted, the first account will be used.',
	},

	// ----------------------------------
	//   Fields for getPackageDetails
	// ----------------------------------
	{
		displayName: 'Package ID',
		name: 'package_id',
		type: 'number',
		default: '',
		placeholder: 'e.g. 7323859',
		required: true,
		displayOptions: {
			show: {
				resource: ['courierShipments'],
				operation: ['getPackageDetails'],
			},
		},
		description: 'Shipment ID from BaseLinker',
	},

	// ----------------------------------
	//   Fields for getCourierPackagesStatusHistory
	// ----------------------------------
	{
		displayName: 'Package IDs',
		name: 'package_ids',
		type: 'string',
		default: '',
		placeholder: 'e.g. 7323859 or 7323859, 7323860',
		required: true,
		displayOptions: {
			show: {
				resource: ['courierShipments'],
				operation: ['getCourierPackagesStatusHistory'],
			},
		},
		description: 'Comma-separated list of parcel IDs or a JSON array of IDs (max 100 packages per request)',
	},
	{
		displayName: 'Output Format',
		name: 'statusHistoryOutputFormat',
		type: 'options',
		options: [
			{
				name: 'Per Package (Grouped History)',
				value: 'perPackage',
				description: 'Return one item per package containing the full history array',
			},
			{
				name: 'Individual Events (Flat List)',
				value: 'flatEvents',
				description: 'Unpack each tracking event into an individual item',
			},
		],
		default: 'perPackage',
		displayOptions: {
			show: {
				resource: ['courierShipments'],
				operation: ['getCourierPackagesStatusHistory'],
			},
		},
		description: 'Choose whether to output one item per package or flatten tracking events into separate items',
	},

	// ----------------------------------
	//   Fields for getLabel
	// ----------------------------------
	{
		displayName: 'Package ID',
		name: 'package_id',
		type: 'number',
		default: '',
		placeholder: 'e.g. 7323859',
		displayOptions: {
			show: {
				resource: ['courierShipments'],
				operation: ['getLabel', 'deleteCourierPackage'],
			},
		},
		description: 'Shipment ID in BaseLinker (optional if Package Number is provided)',
	},
	{
		displayName: 'Package Number',
		name: 'package_number',
		type: 'string',
		default: '',
		placeholder: 'e.g. 00000123456789',
		displayOptions: {
			show: {
				resource: ['courierShipments'],
				operation: ['getLabel', 'deleteCourierPackage'],
			},
		},
		description: 'Courier shipping / consignment number (optional if Package ID is provided)',
	},
	{
		displayName: 'Download as Binary Data',
		name: 'downloadBinary',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['courierShipments'],
				operation: ['getLabel', 'getCourierDocument', 'getProtocol'],
			},
		},
		description: 'Whether to decode the base64 document and attach it as binary data on the item',
	},
	{
		displayName: 'Binary Property Name',
		name: 'binaryPropertyName',
		type: 'string',
		default: 'data',
		displayOptions: {
			show: {
				resource: ['courierShipments'],
				operation: ['getLabel', 'getCourierDocument', 'getProtocol'],
				downloadBinary: [true],
			},
		},
		description: 'Name of the binary property where the file should be written',
	},
	{
		displayName: 'File Name',
		name: 'fileName',
		type: 'string',
		default: '',
		placeholder: 'e.g. label.pdf',
		displayOptions: {
			show: {
				resource: ['courierShipments'],
				operation: ['getLabel', 'getCourierDocument', 'getProtocol'],
				downloadBinary: [true],
			},
		},
		description: 'Optional custom file name for the downloaded file. If omitted, a default name will be generated.',
	},

	// ----------------------------------
	//   Fields for createPackage
	// ----------------------------------
	{
		displayName: 'Parameter Input Mode',
		name: 'createPackageMode',
		type: 'options',
		options: [
			{
				name: 'Form Fields',
				value: 'fields',
				description: 'Fill in package parameters using visual form fields and collections',
			},
			{
				name: 'JSON Payload',
				value: 'json',
				description: 'Provide full createPackage parameters as a raw JSON object',
			},
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['courierShipments'],
				operation: ['createPackage'],
			},
		},
		description: 'Choose between structured form fields or raw JSON parameters payload',
	},
	{
		displayName: 'Parameters (JSON)',
		name: 'createPackageJson',
		type: 'json',
		default: '{\n  "order_id": 6910995,\n  "courier_code": "dhl",\n  "account_id": 33,\n  "fields": [\n    {\n      "id": "service",\n      "value": "dhl"\n    }\n  ],\n  "packages": [\n    {\n      "weight": 1,\n      "length": 20,\n      "width": 15,\n      "height": 10\n    }\n  ]\n}',
		required: true,
		displayOptions: {
			show: {
				resource: ['courierShipments'],
				operation: ['createPackage'],
				createPackageMode: ['json'],
			},
		},
		description: 'Raw JSON object containing parameters for createPackage matching BaseLinker documentation',
	},
	{
		displayName: 'Courier Form Fields',
		name: 'fieldsUi',
		placeholder: 'Add Courier Form Field',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		displayOptions: {
			show: {
				resource: ['courierShipments'],
				operation: ['createPackage', 'getPricePackage', 'getCourierServices'],
				createPackageMode: ['fields'],
			},
		},
		options: [
			{
				name: 'fieldValues',
				displayName: 'Field',
				values: [
					{
						displayName: 'Field ID',
						name: 'id',
						type: 'string',
						default: '',
						placeholder: 'e.g. service, cod, insurance, package_description',
						description: 'Field ID retrieved from getCourierFields',
					},
					{
						displayName: 'Field Value',
						name: 'value',
						type: 'string',
						default: '',
						placeholder: 'e.g. dhl, 101, 55',
						description: 'Value for the field. For dates provide unix timestamp seconds.',
					},
				],
			},
		],
		description: 'Courier specific parameters retrieved from getCourierFields',
	},
	{
		displayName: 'Additional Form Fields (JSON)',
		name: 'fieldsJson',
		type: 'string',
		default: '',
		placeholder: '[{"id": "service", "value": "dhl"}, {"id": "cod", "value": 100}]',
		displayOptions: {
			show: {
				resource: ['courierShipments'],
				operation: ['createPackage', 'getPricePackage', 'getCourierServices'],
				createPackageMode: ['fields'],
			},
		},
		description: 'Optional raw JSON array of field objects: [{"id": string, "value": any}]. Merged with Courier Form Fields.',
	},
	{
		displayName: 'Packages / Parcels',
		name: 'packagesUi',
		placeholder: 'Add Parcel',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		displayOptions: {
			show: {
				resource: ['courierShipments'],
				operation: ['createPackage', 'getPricePackage', 'getCourierServices'],
				createPackageMode: ['fields'],
			},
		},
		options: [
			{
				name: 'packageValues',
				displayName: 'Parcel',
				values: [
					{
						displayName: 'Weight (kg)',
						name: 'weight',
						type: 'number',
						default: 1,
						description: 'Parcel weight in kilograms (required by BaseLinker for at least the first parcel)',
					},
					{
						displayName: 'Length (cm)',
						name: 'length',
						type: 'number',
						default: 20,
						description: 'Parcel length in centimeters',
					},
					{
						displayName: 'Width (cm)',
						name: 'width',
						type: 'number',
						default: 15,
						description: 'Parcel width in centimeters',
					},
					{
						displayName: 'Height (cm)',
						name: 'height',
						type: 'number',
						default: 10,
						description: 'Parcel height in centimeters',
					},
					{
						displayName: 'Custom Size (Non-Standard)',
						name: 'size_custom',
						type: 'boolean',
						default: false,
						description: 'Whether the parcel has non-standard custom dimensions',
					},
				],
			},
		],
		description: 'List of parcel dimensions and weights to create',
	},
	{
		displayName: 'Packages / Parcels (JSON)',
		name: 'packagesJson',
		type: 'string',
		default: '',
		placeholder: '[{"weight": 1.5, "length": 25, "width": 20, "height": 10}]',
		displayOptions: {
			show: {
				resource: ['courierShipments'],
				operation: ['createPackage', 'getPricePackage', 'getCourierServices'],
				createPackageMode: ['fields'],
			},
		},
		description: 'Optional raw JSON array of parcel objects. If provided, overrides or complements the visual parcel collection.',
	},

	// ----------------------------------
	//   Fields for createPackageManual
	// ----------------------------------
	{
		displayName: 'Package Number',
		name: 'manual_package_number',
		type: 'string',
		default: '',
		placeholder: 'e.g. 622222044730624327700197',
		required: true,
		displayOptions: {
			show: {
				resource: ['courierShipments'],
				operation: ['createPackageManual'],
			},
		},
		description: 'Consignment / tracking number created outside BaseLinker',
	},
	{
		displayName: 'Pickup Date',
		name: 'pickup_date',
		type: 'string',
		default: '',
		placeholder: 'e.g. 1487006161 or 2026-10-23',
		displayOptions: {
			show: {
				resource: ['courierShipments'],
				operation: ['createPackageManual'],
			},
		},
		description: 'Date of dispatch (Unix timestamp in seconds or standard date string)',
	},
	{
		displayName: 'Return Shipment',
		name: 'return_shipment',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['courierShipments'],
				operation: ['createPackageManual'],
			},
		},
		description: 'Whether to mark this package as a return shipment',
	},

	// ----------------------------------
	//   Fields for deleteCourierPackage
	// ----------------------------------
	{
		displayName: 'Force Delete',
		name: 'force_delete',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['courierShipments'],
				operation: ['deleteCourierPackage'],
			},
		},
		description: 'Whether to force remove the shipment from BaseLinker database even if the courier API returns an error',
	},

	// ----------------------------------
	//   Fields for getPricePackage
	// ----------------------------------
	{
		displayName: 'Parameter Input Mode',
		name: 'getPricePackageMode',
		type: 'options',
		options: [
			{
				name: 'Form Fields',
				value: 'fields',
				description: 'Fill in package parameters using visual form fields and collections',
			},
			{
				name: 'JSON Payload',
				value: 'json',
				description: 'Provide full getPricePackage parameters as a raw JSON object',
			},
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['courierShipments'],
				operation: ['getPricePackage'],
			},
		},
		description: 'Choose between structured form fields or raw JSON parameters payload',
	},
	{
		displayName: 'Parameters (JSON)',
		name: 'getPricePackageJson',
		type: 'json',
		default: '{\n  "order_id": 6910995,\n  "courier_code": "dhl",\n  "account_id": 33,\n  "fields": [\n    {\n      "id": "service",\n      "value": "standard"\n    }\n  ],\n  "packages": [\n    {\n      "weight": 4,\n      "length": 11,\n      "width": 13,\n      "height": 12\n    }\n  ]\n}',
		required: true,
		displayOptions: {
			show: {
				resource: ['courierShipments'],
				operation: ['getPricePackage'],
				getPricePackageMode: ['json'],
			},
		},
		description: 'Raw JSON object containing parameters for getPricePackage matching BaseLinker documentation',
	},

	// ----------------------------------
	//   Fields for getCourierServices
	// ----------------------------------
	{
		displayName: 'Parameter Input Mode',
		name: 'getCourierServicesMode',
		type: 'options',
		options: [
			{
				name: 'Form Fields',
				value: 'fields',
				description: 'Fill in parameters using visual form fields and collections',
			},
			{
				name: 'JSON Payload',
				value: 'json',
				description: 'Provide full getCourierServices parameters as a raw JSON object',
			},
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['courierShipments'],
				operation: ['getCourierServices'],
			},
		},
		description: 'Choose between structured form fields or raw JSON parameters payload',
	},
	{
		displayName: 'Parameters (JSON)',
		name: 'getCourierServicesJson',
		type: 'json',
		default: '{\n  "courier_code": "brokersystem",\n  "order_id": 6911000,\n  "account_id": 294,\n  "fields": [\n    {\n      "id": "package_type",\n      "value": "package"\n    }\n  ],\n  "packages": [\n    {\n      "weight": 4,\n      "length": 11,\n      "width": 13,\n      "height": 12\n    }\n  ]\n}',
		required: true,
		displayOptions: {
			show: {
				resource: ['courierShipments'],
				operation: ['getCourierServices'],
				getCourierServicesMode: ['json'],
			},
		},
		description: 'Raw JSON object containing parameters for getCourierServices matching BaseLinker documentation',
	},

	// ----------------------------------
	//   Fields for getCourierDocument
	// ----------------------------------
	{
		displayName: 'Document Type',
		name: 'document_type',
		type: 'options',
		options: [
			{
				name: 'Manifest',
				value: 'manifest',
			},
			{
				name: 'Protocol',
				value: 'protocol',
			},
			{
				name: 'Label',
				value: 'label',
			},
			{
				name: 'Customs Document',
				value: 'customs_document',
			},
		],
		default: 'manifest',
		required: true,
		displayOptions: {
			show: {
				resource: ['courierShipments'],
				operation: ['getCourierDocument'],
			},
		},
		description: 'Type of parcel document to download',
	},
	{
		displayName: 'Package IDs',
		name: 'document_package_ids',
		type: 'string',
		default: '',
		placeholder: 'e.g. 123 or 123, 456',
		displayOptions: {
			show: {
				resource: ['courierShipments'],
				operation: ['getCourierDocument', 'getProtocol', 'runRequestParcelPickup'],
			},
		},
		description: 'Comma-separated parcel IDs or a JSON array of IDs',
	},
	{
		displayName: 'Package Numbers',
		name: 'document_package_numbers',
		type: 'string',
		default: '',
		placeholder: 'e.g. 0000000815947Q or 0000000815947Q, 0000000633844Q',
		displayOptions: {
			show: {
				resource: ['courierShipments'],
				operation: ['getCourierDocument', 'getProtocol', 'runRequestParcelPickup'],
			},
		},
		description: 'Comma-separated parcel consignment numbers or a JSON array of numbers',
	},

	// ----------------------------------
	//   Fields for runRequestParcelPickup
	// ----------------------------------
	{
		displayName: 'Parameter Input Mode',
		name: 'runPickupMode',
		type: 'options',
		options: [
			{
				name: 'Form Fields',
				value: 'fields',
				description: 'Fill in pickup parameters using visual form fields and collections',
			},
			{
				name: 'JSON Payload',
				value: 'json',
				description: 'Provide full runRequestParcelPickup parameters as a raw JSON object',
			},
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['courierShipments'],
				operation: ['runRequestParcelPickup'],
			},
		},
		description: 'Choose between structured form fields or raw JSON parameters payload',
	},
	{
		displayName: 'Parameters (JSON)',
		name: 'runPickupJson',
		type: 'json',
		default: '{\n  "courier_code": "dpd",\n  "package_numbers": [\n    "0000000815947Q",\n    "0000000633844Q"\n  ],\n  "account_id": 1645,\n  "fields": [\n    {\n      "id": "pickup_date",\n      "value": 1642672310\n    }\n  ]\n}',
		required: true,
		displayOptions: {
			show: {
				resource: ['courierShipments'],
				operation: ['runRequestParcelPickup'],
				runPickupMode: ['json'],
			},
		},
		description: 'Raw JSON object containing parameters for runRequestParcelPickup matching BaseLinker documentation',
	},
	{
		displayName: 'Pickup Form Fields',
		name: 'pickupFieldsUi',
		placeholder: 'Add Pickup Form Field',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		displayOptions: {
			show: {
				resource: ['courierShipments'],
				operation: ['runRequestParcelPickup'],
				runPickupMode: ['fields'],
			},
		},
		options: [
			{
				name: 'pickupFieldValues',
				displayName: 'Field',
				values: [
					{
						displayName: 'Field ID',
						name: 'id',
						type: 'string',
						default: '',
						placeholder: 'e.g. pickup_date, shipments_weight',
						description: 'Field ID retrieved from getRequestParcelPickupFields',
					},
					{
						displayName: 'Field Value',
						name: 'value',
						type: 'string',
						default: '',
						placeholder: 'e.g. 1642672310, 40',
						description: 'Value for the pickup field. For dates provide unix timestamp seconds.',
					},
				],
			},
		],
		description: 'Pickup specific parameters retrieved from getRequestParcelPickupFields',
	},
	{
		displayName: 'Additional Pickup Fields (JSON)',
		name: 'pickupFieldsJson',
		type: 'string',
		default: '',
		placeholder: '[{"id": "pickup_date", "value": 1642672310}]',
		displayOptions: {
			show: {
				resource: ['courierShipments'],
				operation: ['runRequestParcelPickup'],
				runPickupMode: ['fields'],
			},
		},
		description: 'Optional raw JSON array of pickup field objects: [{"id": string, "value": any}]. Merged with Pickup Form Fields.',
	},
];
