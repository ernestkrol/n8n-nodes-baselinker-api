import { INodeProperties } from 'n8n-workflow';

export const orderReturnsOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['orderReturns'],
			},
		},
		options: [
			{
				name: 'Add / Update Return Status',
				value: 'addOrderReturnStatus',
				description: 'Create a new order return status or update an existing one (method: addOrderReturnStatus)',
				action: 'Add or update return status',
			},
			{
				name: 'Add / Update Return Status Group',
				value: 'addOrderReturnStatusGroup',
				description: 'Create a new order return status group or update an existing one (method: addOrderReturnStatusGroup)',
				action: 'Add or update return status group',
			},
			{
				name: 'Add Order Return',
				value: 'addOrderReturn',
				description: 'Add a new order return to BaseLinker (method: addOrderReturn)',
				action: 'Add order return',
			},
			{
				name: 'Add Return Product',
				value: 'addOrderReturnProduct',
				description: 'Add a product item to an existing order return (method: addOrderReturnProduct)',
				action: 'Add return product',
			},
			{
				name: 'Delete Order Return Status',
				value: 'deleteOrderReturnStatus',
				description: 'Delete an order return status and migrate returns to a target status (method: deleteOrderReturnStatus)',
				action: 'Delete return status',
			},
			{
				name: 'Delete Order Return Status Group',
				value: 'deleteOrderReturnStatusGroup',
				description: 'Delete an order return status group and move statuses to default group (method: deleteOrderReturnStatusGroup)',
				action: 'Delete return status group',
			},
			{
				name: 'Delete Return Product',
				value: 'deleteOrderReturnProduct',
				description: 'Remove a specific product item from an order return (method: deleteOrderReturnProduct)',
				action: 'Delete return product',
			},
			{
				name: 'Get Order Returns',
				value: 'getOrderReturns',
				description: 'Retrieve order returns from BaseLinker with optional filtering and pagination (method: getOrderReturns)',
				action: 'Get order returns',
			},
			{
				name: 'Get Return Extra Fields',
				value: 'getOrderReturnExtraFields',
				description: 'Retrieve custom extra fields defined for order returns (method: getOrderReturnExtraFields)',
				action: 'Get return extra fields',
			},
			{
				name: 'Get Return Item Statuses',
				value: 'getOrderReturnProductStatuses',
				description: 'Retrieve list of order return item statuses (method: getOrderReturnProductStatuses)',
				action: 'Get return item statuses',
			},
			{
				name: 'Get Return Journal List',
				value: 'getOrderReturnJournalList',
				description: 'Download list of return events from the last 3 days (method: getOrderReturnJournalList)',
				action: 'Get return journal list',
			},
			{
				name: 'Get Return Payments History',
				value: 'getOrderReturnPaymentsHistory',
				description: 'Retrieve payment / refund transactions history for an order return (method: getOrderReturnPaymentsHistory)',
				action: 'Get return payments history',
			},
			{
				name: 'Get Return Reasons',
				value: 'getOrderReturnReasonsList',
				description: 'Retrieve list of order return reasons (method: getOrderReturnReasonsList)',
				action: 'Get return reasons',
			},
			{
				name: 'Get Return Status Groups',
				value: 'getOrderReturnStatusGroups',
				description: 'Retrieve list of order return status groups (method: getOrderReturnStatusGroups)',
				action: 'Get return status groups',
			},
			{
				name: 'Get Return Statuses',
				value: 'getOrderReturnStatusList',
				description: 'Retrieve list of order return statuses (method: getOrderReturnStatusList)',
				action: 'Get return statuses',
			},
			{
				name: 'Run Return Macro Trigger',
				value: 'runOrderReturnMacroTrigger',
				description: 'Execute personal automatic action trigger for an order return (method: runOrderReturnMacroTrigger)',
				action: 'Run return macro trigger',
			},
			{
				name: 'Set Order Return Fields',
				value: 'setOrderReturnFields',
				description: 'Edit selected fields of a specific order return (method: setOrderReturnFields)',
				action: 'Set order return fields',
			},
			{
				name: 'Set Order Return Refund',
				value: 'setOrderReturnRefund',
				description: 'Mark an order return as refunded (method: setOrderReturnRefund)',
				action: 'Set return refund',
			},
			{
				name: 'Set Return Product Fields',
				value: 'setOrderReturnProductFields',
				description: 'Edit data of a specific item in an order return (method: setOrderReturnProductFields)',
				action: 'Set return product fields',
			},
			{
				name: 'Set Return Status',
				value: 'setOrderReturnStatus',
				description: 'Change status of an order return (method: setOrderReturnStatus)',
				action: 'Set return status',
			},
			{
				name: 'Set Return Statuses (Batch)',
				value: 'setOrderReturnStatuses',
				description: 'Batch change status for multiple order returns (method: setOrderReturnStatuses)',
				action: 'Set return statuses batch',
			},
		],
		default: 'getOrderReturns',
	},
];

export const orderReturnsFields: INodeProperties[] = [
	// =========================================================================
	//   1. getOrderReturns
	// =========================================================================
	{
		displayName: 'Input Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{
				name: 'Form Fields (UI)',
				value: 'fields',
				description: 'Configure filters using UI controls',
			},
			{
				name: 'Raw Parameters (JSON)',
				value: 'json',
				description: 'Pass raw JSON parameters according to official BaseLinker documentation',
			},
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['getOrderReturns'],
			},
		},
		description: 'Choose whether to configure request using UI fields or raw JSON',
	},
	{
		displayName: 'Parameters (JSON)',
		name: 'parametersJson',
		type: 'json',
		default: '{\n  "date_from": 0\n}',
		required: true,
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['getOrderReturns'],
				parameterMode: ['json'],
			},
		},
		description: 'JSON object with getOrderReturns parameters',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['getOrderReturns'],
				parameterMode: ['fields'],
			},
		},
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 100,
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['getOrderReturns'],
				parameterMode: ['fields'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return (max 100 per request in single-batch mode)',
	},
	{
		displayName: 'Pagination Cursor',
		name: 'paginationField',
		type: 'options',
		options: [
			{
				name: 'Return ID (id_from)',
				value: 'id_from',
				description: 'Advance cursor using return_id + 1 (recommended, immune to timestamp collisions)',
			},
			{
				name: 'Creation Date (date_from)',
				value: 'date_from',
				description: 'Advance cursor using date_add + 1',
			},
		],
		default: 'id_from',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['getOrderReturns'],
				parameterMode: ['fields'],
				returnAll: [true],
			},
		},
		description: 'Field used to advance cursor across multiple pages',
	},
	{
		displayName: 'Delay Between Requests (ms)',
		name: 'delayMs',
		type: 'number',
		default: 650,
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['getOrderReturns'],
				parameterMode: ['fields'],
				returnAll: [true],
			},
		},
		description: 'Delay in milliseconds between pagination calls to comply with BaseLinker rate limits (100 req/min)',
	},
	{
		displayName: 'Return ID',
		name: 'return_id',
		type: 'number',
		default: '',
		placeholder: 'e.g. 12345',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['getOrderReturns'],
				parameterMode: ['fields'],
			},
		},
		description: 'Fetch a single specific order return by its ID',
	},
	{
		displayName: 'Order ID',
		name: 'order_id',
		type: 'number',
		default: '',
		placeholder: 'e.g. 98765',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['getOrderReturns'],
				parameterMode: ['fields'],
			},
		},
		description: 'Identifier of an order the return was created from',
	},
	{
		displayName: 'ID From',
		name: 'id_from',
		type: 'number',
		default: '',
		placeholder: 'e.g. 1000',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['getOrderReturns'],
				parameterMode: ['fields'],
			},
		},
		description: 'The order return ID from which subsequent returns are collected',
	},
	{
		displayName: 'Date From',
		name: 'date_from',
		type: 'string',
		default: '',
		placeholder: 'e.g. 1700000000 or 2026-01-01',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['getOrderReturns'],
				parameterMode: ['fields'],
			},
		},
		description: 'The return creation date from which order returns are collected (Unix seconds, milliseconds, or ISO string)',
	},
	{
		displayName: 'Status',
		name: 'status_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getOrderReturnStatuses',
		},
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['getOrderReturns'],
				parameterMode: ['fields'],
			},
		},
		description: 'Filter returns by status. Leave blank to retrieve from all statuses.',
	},
	{
		displayName: 'Filter Return Source',
		name: 'filter_order_return_source',
		type: 'string',
		default: '',
		placeholder: 'e.g. allegro, amazon, shop',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['getOrderReturns'],
				parameterMode: ['fields'],
			},
		},
		description: 'Filter returns by return source',
	},
	{
		displayName: 'Filter Return Source ID',
		name: 'filter_order_return_source_id',
		type: 'number',
		default: '',
		placeholder: 'e.g. 101',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['getOrderReturns'],
				parameterMode: ['fields'],
			},
		},
		description: 'Filter returns by source ID. Requires filter_order_return_source to be set.',
	},
	{
		displayName: 'Include Custom Extra Fields',
		name: 'include_custom_extra_fields',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['getOrderReturns'],
				parameterMode: ['fields'],
			},
		},
		description: 'Whether to download custom additional fields defined for order returns',
	},
	{
		displayName: 'Include Connect Data',
		name: 'include_connect_data',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['getOrderReturns'],
				parameterMode: ['fields'],
			},
		},
		description: 'Whether to include Base Connect and contractor data',
	},

	// =========================================================================
	//   2. addOrderReturn
	// =========================================================================
	{
		displayName: 'Input Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{
				name: 'Form Fields (UI)',
				value: 'fields',
				description: 'Configure return using UI fields',
			},
			{
				name: 'Raw Parameters (JSON)',
				value: 'json',
				description: 'Pass raw JSON parameters according to official BaseLinker documentation',
			},
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturn'],
			},
		},
		description: 'Choose whether to configure request using UI fields or raw JSON',
	},
	{
		displayName: 'Parameters (JSON)',
		name: 'parametersJson',
		type: 'json',
		default: '{\n  "status_id": 1,\n  "currency": "PLN"\n}',
		required: true,
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturn'],
				parameterMode: ['json'],
			},
		},
		description: 'JSON object with addOrderReturn parameters',
	},
	{
		displayName: 'Status',
		name: 'status_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getOrderReturnStatuses',
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturn'],
				parameterMode: ['fields'],
			},
		},
		description: 'Order return status',
	},
	{
		displayName: 'Currency',
		name: 'currency',
		type: 'string',
		default: 'PLN',
		required: true,
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturn'],
				parameterMode: ['fields'],
			},
		},
		description: '3-letter currency symbol (e.g. EUR, PLN)',
	},
	{
		displayName: 'Order ID',
		name: 'order_id',
		type: 'number',
		default: '',
		placeholder: 'e.g. 12345',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturn'],
				parameterMode: ['fields'],
			},
		},
		description: 'Order ID in Base panel that this return originates from',
	},
	{
		displayName: 'Custom Source ID',
		name: 'custom_source_id',
		type: 'number',
		default: '',
		placeholder: 'e.g. 1',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturn'],
				parameterMode: ['fields'],
			},
		},
		description: 'Identifier of custom order source defined in Base panel',
	},
	{
		displayName: 'Reference Number',
		name: 'reference_number',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturn'],
				parameterMode: ['fields'],
			},
		},
		description: 'Reference number from external source',
	},
	{
		displayName: 'Date Add',
		name: 'date_add',
		type: 'string',
		default: '',
		placeholder: 'e.g. 1700000000 or 2026-01-01',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturn'],
				parameterMode: ['fields'],
			},
		},
		description: 'Creation date in Unix timestamp format or ISO date string (leave empty for current time)',
	},
	{
		displayName: 'Refunded',
		name: 'refunded',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturn'],
				parameterMode: ['fields'],
			},
		},
		description: 'Whether the return is already marked as refunded',
	},
	{
		displayName: 'Admin Comments',
		name: 'admin_comments',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturn'],
				parameterMode: ['fields'],
			},
		},
		description: 'Seller comments',
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		default: '',
		placeholder: 'customer@example.com',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturn'],
				parameterMode: ['fields'],
			},
		},
		description: 'Buyer email address',
	},
	{
		displayName: 'Phone',
		name: 'phone',
		type: 'string',
		default: '',
		placeholder: '+48123456789',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturn'],
				parameterMode: ['fields'],
			},
		},
		description: 'Buyer phone number',
	},
	{
		displayName: 'User Login',
		name: 'user_login',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturn'],
				parameterMode: ['fields'],
			},
		},
		description: 'Marketplace buyer login',
	},
	{
		displayName: 'Delivery Price',
		name: 'delivery_price',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturn'],
				parameterMode: ['fields'],
			},
		},
		description: 'Gross delivery price of the return',
	},
	{
		displayName: 'Delivery Full Name',
		name: 'delivery_fullname',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturn'],
				parameterMode: ['fields'],
			},
		},
		description: 'Delivery name and surname',
	},
	{
		displayName: 'Delivery Company',
		name: 'delivery_company',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturn'],
				parameterMode: ['fields'],
			},
		},
		description: 'Delivery company',
	},
	{
		displayName: 'Delivery Address',
		name: 'delivery_address',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturn'],
				parameterMode: ['fields'],
			},
		},
		description: 'Delivery street and house number',
	},
	{
		displayName: 'Delivery Postcode',
		name: 'delivery_postcode',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturn'],
				parameterMode: ['fields'],
			},
		},
		description: 'Delivery postcode',
	},
	{
		displayName: 'Delivery City',
		name: 'delivery_city',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturn'],
				parameterMode: ['fields'],
			},
		},
		description: 'Delivery city',
	},
	{
		displayName: 'Delivery State',
		name: 'delivery_state',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturn'],
				parameterMode: ['fields'],
			},
		},
		description: 'Delivery state or province',
	},
	{
		displayName: 'Delivery Country Code',
		name: 'delivery_country_code',
		type: 'string',
		default: 'PL',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturn'],
				parameterMode: ['fields'],
			},
		},
		description: 'Two-letter country code (e.g. PL, DE, GB)',
	},
	{
		displayName: 'Extra Field 1',
		name: 'extra_field_1',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturn'],
				parameterMode: ['fields'],
			},
		},
		description: 'Value of additional field 1',
	},
	{
		displayName: 'Extra Field 2',
		name: 'extra_field_2',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturn'],
				parameterMode: ['fields'],
			},
		},
		description: 'Value of additional field 2',
	},
	{
		displayName: 'Refund Account Number',
		name: 'refund_account_number',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturn'],
				parameterMode: ['fields'],
			},
		},
		description: 'Bank account number to issue a refund',
	},
	{
		displayName: 'Refund IBAN',
		name: 'refund_iban',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturn'],
				parameterMode: ['fields'],
			},
		},
		description: 'IBAN of the refund bank account',
	},
	{
		displayName: 'Refund SWIFT',
		name: 'refund_swift',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturn'],
				parameterMode: ['fields'],
			},
		},
		description: 'SWIFT of the refund bank account',
	},
	{
		displayName: 'Custom Extra Fields (UI)',
		name: 'customExtraFieldsUi',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		placeholder: 'Add Custom Extra Field',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturn'],
				parameterMode: ['fields'],
			},
		},
		description: 'Configure custom extra fields by selecting them dynamically or providing custom IDs',
		options: [
			{
				name: 'fields',
				displayName: 'Field',
				values: [
					{
						displayName: 'Field Name or ID',
						name: 'field_id',
						type: 'options',
						typeOptions: {
							loadOptionsMethod: 'getOrderReturnExtraFieldsList',
						},
						default: '',
						description: 'Select the custom extra field from your BaseLinker account, or use an expression/custom ID',
					},
					{
						displayName: 'Field Value',
						name: 'value',
						type: 'string',
						default: '',
						description: 'Value to assign to this custom extra field',
					},
				],
			},
		],
	},
	{
		displayName: 'Custom Extra Fields (JSON)',
		name: 'customExtraFieldsJson',
		type: 'json',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturn'],
				parameterMode: ['fields'],
			},
		},
		description: 'Provide custom extra fields as raw JSON object (e.g. {"123": "Value"})',
	},
	{
		displayName: 'Return Products (UI)',
		name: 'productsUi',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		placeholder: 'Add Product Item',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturn'],
				parameterMode: ['fields'],
			},
		},
		description: 'Product line items to attach to this order return',
		options: [
			{
				name: 'items',
				displayName: 'Item',
				values: [
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						required: true,
						description: 'Product name',
					},
					{
						displayName: 'Quantity',
						name: 'quantity',
						type: 'number',
						default: 1,
						required: true,
						description: 'Quantity of pieces',
					},
					{
						displayName: 'Gross Price',
						name: 'price_brutto',
						type: 'number',
						default: 0,
						required: true,
						description: 'Single item gross price',
					},
					{
						displayName: 'Tax Rate (%)',
						name: 'tax_rate',
						type: 'number',
						default: 23,
						description: 'VAT tax rate in percent (e.g. 23)',
					},
					{
						displayName: 'Order Product ID',
						name: 'order_product_id',
						type: 'number',
						default: '',
						description: 'ID of original connected order item from Base order manager',
					},
					{
						displayName: 'Storage Type',
						name: 'storage',
						type: 'options',
						options: [
							{ name: 'Internal Inventory (db)', value: 'db' },
							{ name: 'Online Shop (shop)', value: 'shop' },
							{ name: 'Wholesaler (warehouse)', value: 'warehouse' },
						],
						default: 'db',
						description: 'Type of warehouse storage',
					},
					{
						displayName: 'Storage ID',
						name: 'storage_id',
						type: 'string',
						default: '0',
						description: 'Storage identifier (0 for Base internal inventory)',
					},
					{
						displayName: 'Product ID',
						name: 'product_id',
						type: 'string',
						default: '',
						description: 'Product identifier in Base or store warehouse',
					},
					{
						displayName: 'Variant ID',
						name: 'variant_id',
						type: 'string',
						default: '',
						description: 'Product variant ID',
					},
					{
						displayName: 'SKU',
						name: 'sku',
						type: 'string',
						default: '',
						description: 'Product SKU',
					},
					{
						displayName: 'EAN',
						name: 'ean',
						type: 'string',
						default: '',
						description: 'Product EAN number',
					},
					{
						displayName: 'Location',
						name: 'location',
						type: 'string',
						default: '',
						description: 'Product warehouse location',
					},
					{
						displayName: 'Internal Warehouse ID',
						name: 'warehouse_id',
						type: 'number',
						default: 0,
						description: 'Internal warehouse ID from inventory',
					},
					{
						displayName: 'Attributes',
						name: 'attributes',
						type: 'string',
						default: '',
						description: 'Product attributes or variant name (e.g. "Color: blue")',
					},
					{
						displayName: 'Weight',
						name: 'weight',
						type: 'number',
						default: 0,
						description: 'Single item weight in kg',
					},
					{
						displayName: 'Item Status ID',
						name: 'status_id',
						type: 'options',
						typeOptions: {
							loadOptionsMethod: 'getOrderReturnProductStatuses',
						},
						default: '',
						description: 'Identifier of return item status',
					},
					{
						displayName: 'Return Reason ID',
						name: 'return_reason_id',
						type: 'options',
						typeOptions: {
							loadOptionsMethod: 'getOrderReturnReasonsList',
						},
						default: '',
						description: 'Identifier of return reason',
					},
				],
			},
		],
	},
	{
		displayName: 'Return Products (JSON)',
		name: 'productsJson',
		type: 'json',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturn'],
				parameterMode: ['fields'],
			},
		},
		description: 'Provide product line items as a raw JSON array',
	},

	// =========================================================================
	//   3. setOrderReturnFields
	// =========================================================================
	{
		displayName: 'Input Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{
				name: 'Form Fields (UI)',
				value: 'fields',
				description: 'Configure update using UI fields',
			},
			{
				name: 'Raw Parameters (JSON)',
				value: 'json',
				description: 'Pass raw JSON parameters according to official BaseLinker documentation',
			},
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnFields'],
			},
		},
		description: 'Choose whether to configure request using UI fields or raw JSON',
	},
	{
		displayName: 'Parameters (JSON)',
		name: 'parametersJson',
		type: 'json',
		default: '{\n  "return_id": 12345,\n  "admin_comments": "Updated comment"\n}',
		required: true,
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnFields'],
				parameterMode: ['json'],
			},
		},
		description: 'JSON object with setOrderReturnFields parameters',
	},
	{
		displayName: 'Return ID',
		name: 'return_id',
		type: 'number',
		default: '',
		required: true,
		placeholder: 'e.g. 12345',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnFields'],
				parameterMode: ['fields'],
			},
		},
		description: 'Order return identifier to modify',
	},
	{
		displayName: 'Admin Comments',
		name: 'admin_comments',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnFields'],
				parameterMode: ['fields'],
			},
		},
		description: 'Seller comments',
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		default: '',
		placeholder: 'customer@example.com',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnFields'],
				parameterMode: ['fields'],
			},
		},
		description: 'Buyer email address',
	},
	{
		displayName: 'Phone',
		name: 'phone',
		type: 'string',
		default: '',
		placeholder: '+48123456789',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnFields'],
				parameterMode: ['fields'],
			},
		},
		description: 'Buyer phone number',
	},
	{
		displayName: 'User Login',
		name: 'user_login',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnFields'],
				parameterMode: ['fields'],
			},
		},
		description: 'Marketplace buyer login',
	},
	{
		displayName: 'Delivery Price',
		name: 'delivery_price',
		type: 'number',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnFields'],
				parameterMode: ['fields'],
			},
		},
		description: 'Gross delivery price',
	},
	{
		displayName: 'Delivery Full Name',
		name: 'delivery_fullname',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnFields'],
				parameterMode: ['fields'],
			},
		},
		description: 'Delivery name and surname',
	},
	{
		displayName: 'Delivery Company',
		name: 'delivery_company',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnFields'],
				parameterMode: ['fields'],
			},
		},
		description: 'Delivery company',
	},
	{
		displayName: 'Delivery Address',
		name: 'delivery_address',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnFields'],
				parameterMode: ['fields'],
			},
		},
		description: 'Delivery street and number',
	},
	{
		displayName: 'Delivery Postcode',
		name: 'delivery_postcode',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnFields'],
				parameterMode: ['fields'],
			},
		},
		description: 'Delivery postcode',
	},
	{
		displayName: 'Delivery City',
		name: 'delivery_city',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnFields'],
				parameterMode: ['fields'],
			},
		},
		description: 'Delivery city',
	},
	{
		displayName: 'Delivery State',
		name: 'delivery_state',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnFields'],
				parameterMode: ['fields'],
			},
		},
		description: 'Delivery state or province',
	},
	{
		displayName: 'Delivery Country Code',
		name: 'delivery_country_code',
		type: 'string',
		default: '',
		placeholder: 'e.g. PL',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnFields'],
				parameterMode: ['fields'],
			},
		},
		description: 'Two-letter country code (e.g. PL, DE, GB)',
	},
	{
		displayName: 'Extra Field 1',
		name: 'extra_field_1',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnFields'],
				parameterMode: ['fields'],
			},
		},
		description: 'Value of additional field 1',
	},
	{
		displayName: 'Extra Field 2',
		name: 'extra_field_2',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnFields'],
				parameterMode: ['fields'],
			},
		},
		description: 'Value of additional field 2',
	},
	{
		displayName: 'Custom Extra Fields (UI)',
		name: 'customExtraFieldsUi',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		placeholder: 'Add Custom Extra Field',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnFields'],
				parameterMode: ['fields'],
			},
		},
		description: 'Configure custom extra fields by selecting them dynamically or providing custom IDs',
		options: [
			{
				name: 'fields',
				displayName: 'Field',
				values: [
					{
						displayName: 'Field Name or ID',
						name: 'field_id',
						type: 'options',
						typeOptions: {
							loadOptionsMethod: 'getOrderReturnExtraFieldsList',
						},
						default: '',
						description: 'Select the custom extra field from your BaseLinker account, or use an expression/custom ID',
					},
					{
						displayName: 'Field Value',
						name: 'value',
						type: 'string',
						default: '',
						description: 'Value to assign to this custom extra field. To clear this field, leave empty.',
					},
				],
			},
		],
	},
	{
		displayName: 'Custom Extra Fields (JSON)',
		name: 'customExtraFieldsJson',
		type: 'json',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnFields'],
				parameterMode: ['fields'],
			},
		},
		description: 'Provide custom extra fields as raw JSON object (e.g. {"123": "Updated"})',
	},

	// =========================================================================
	//   4. addOrderReturnProduct
	// =========================================================================
	{
		displayName: 'Input Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{
				name: 'Form Fields (UI)',
				value: 'fields',
				description: 'Configure product item using UI fields',
			},
			{
				name: 'Raw Parameters (JSON)',
				value: 'json',
				description: 'Pass raw JSON parameters according to official BaseLinker documentation',
			},
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturnProduct'],
			},
		},
		description: 'Choose whether to configure request using UI fields or raw JSON',
	},
	{
		displayName: 'Parameters (JSON)',
		name: 'parametersJson',
		type: 'json',
		default: '{\n  "return_id": 12345,\n  "name": "Product Name",\n  "price_brutto": 29.99,\n  "quantity": 1\n}',
		required: true,
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturnProduct'],
				parameterMode: ['json'],
			},
		},
		description: 'JSON object with addOrderReturnProduct parameters',
	},
	{
		displayName: 'Return ID',
		name: 'return_id',
		type: 'number',
		default: '',
		required: true,
		placeholder: 'e.g. 12345',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturnProduct'],
				parameterMode: ['fields'],
			},
		},
		description: 'Order return identifier to add the item to',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturnProduct'],
				parameterMode: ['fields'],
			},
		},
		description: 'Product name',
	},
	{
		displayName: 'Quantity',
		name: 'quantity',
		type: 'number',
		default: 1,
		required: true,
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturnProduct'],
				parameterMode: ['fields'],
			},
		},
		description: 'Quantity of pieces',
	},
	{
		displayName: 'Gross Price',
		name: 'price_brutto',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturnProduct'],
				parameterMode: ['fields'],
			},
		},
		description: 'Single item gross price',
	},
	{
		displayName: 'Tax Rate (%)',
		name: 'tax_rate',
		type: 'number',
		default: 23,
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturnProduct'],
				parameterMode: ['fields'],
			},
		},
		description: 'VAT tax rate in percent (e.g. 23)',
	},
	{
		displayName: 'Order Product ID',
		name: 'order_product_id',
		type: 'number',
		default: '',
		placeholder: 'e.g. 987654',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturnProduct'],
				parameterMode: ['fields'],
			},
		},
		description: 'ID of original connected order item from Base order manager',
	},
	{
		displayName: 'Storage Type',
		name: 'storage',
		type: 'options',
		options: [
			{ name: 'Internal Inventory (db)', value: 'db' },
			{ name: 'Online Shop (shop)', value: 'shop' },
			{ name: 'Wholesaler (warehouse)', value: 'warehouse' },
		],
		default: 'db',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturnProduct'],
				parameterMode: ['fields'],
			},
		},
		description: 'Type of warehouse storage',
	},
	{
		displayName: 'Storage ID',
		name: 'storage_id',
		type: 'string',
		default: '0',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturnProduct'],
				parameterMode: ['fields'],
			},
		},
		description: 'Storage identifier (0 for Base internal inventory)',
	},
	{
		displayName: 'Product ID',
		name: 'product_id',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturnProduct'],
				parameterMode: ['fields'],
			},
		},
		description: 'Product identifier in Base or store warehouse',
	},
	{
		displayName: 'Variant ID',
		name: 'variant_id',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturnProduct'],
				parameterMode: ['fields'],
			},
		},
		description: 'Product variant ID',
	},
	{
		displayName: 'SKU',
		name: 'sku',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturnProduct'],
				parameterMode: ['fields'],
			},
		},
		description: 'Product SKU',
	},
	{
		displayName: 'EAN',
		name: 'ean',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturnProduct'],
				parameterMode: ['fields'],
			},
		},
		description: 'Product EAN number',
	},
	{
		displayName: 'Location',
		name: 'location',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturnProduct'],
				parameterMode: ['fields'],
			},
		},
		description: 'Product warehouse location',
	},
	{
		displayName: 'Internal Warehouse ID',
		name: 'warehouse_id',
		type: 'number',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturnProduct'],
				parameterMode: ['fields'],
			},
		},
		description: 'Product source warehouse identifier for Base inventory',
	},
	{
		displayName: 'Attributes',
		name: 'attributes',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturnProduct'],
				parameterMode: ['fields'],
			},
		},
		description: 'Product attributes or variant name (e.g. "Color: blue")',
	},
	{
		displayName: 'Weight',
		name: 'weight',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturnProduct'],
				parameterMode: ['fields'],
			},
		},
		description: 'Single item weight',
	},
	{
		displayName: 'Item Status',
		name: 'status_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getOrderReturnProductStatuses',
		},
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturnProduct'],
				parameterMode: ['fields'],
			},
		},
		description: 'Identifier of return item status',
	},
	{
		displayName: 'Return Reason',
		name: 'return_reason_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getOrderReturnReasonsList',
		},
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturnProduct'],
				parameterMode: ['fields'],
			},
		},
		description: 'Identifier of return reason',
	},

	// =========================================================================
	//   5. deleteOrderReturnProduct
	// =========================================================================
	{
		displayName: 'Return ID',
		name: 'return_id',
		type: 'number',
		default: '',
		required: true,
		placeholder: 'e.g. 12345',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['deleteOrderReturnProduct'],
			},
		},
		description: 'Order return ID',
	},
	{
		displayName: 'Order Return Product ID',
		name: 'order_return_product_id',
		type: 'number',
		default: '',
		required: true,
		placeholder: 'e.g. 67890',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['deleteOrderReturnProduct'],
			},
		},
		description: 'Order return item ID to delete',
	},

	// =========================================================================
	//   6. setOrderReturnProductFields
	// =========================================================================
	{
		displayName: 'Input Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{
				name: 'Form Fields (UI)',
				value: 'fields',
				description: 'Configure item update using UI fields',
			},
			{
				name: 'Raw Parameters (JSON)',
				value: 'json',
				description: 'Pass raw JSON parameters according to official BaseLinker documentation',
			},
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnProductFields'],
			},
		},
		description: 'Choose whether to configure request using UI fields or raw JSON',
	},
	{
		displayName: 'Parameters (JSON)',
		name: 'parametersJson',
		type: 'json',
		default: '{\n  "return_id": 12345,\n  "order_return_product_id": 67890,\n  "quantity": 2\n}',
		required: true,
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnProductFields'],
				parameterMode: ['json'],
			},
		},
		description: 'JSON object with setOrderReturnProductFields parameters',
	},
	{
		displayName: 'Return ID',
		name: 'return_id',
		type: 'number',
		default: '',
		required: true,
		placeholder: 'e.g. 12345',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnProductFields'],
				parameterMode: ['fields'],
			},
		},
		description: 'Order return identifier',
	},
	{
		displayName: 'Order Return Product ID',
		name: 'order_return_product_id',
		type: 'number',
		default: '',
		required: true,
		placeholder: 'e.g. 67890',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnProductFields'],
				parameterMode: ['fields'],
			},
		},
		description: 'Order return item ID to edit',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnProductFields'],
				parameterMode: ['fields'],
			},
		},
		description: 'Product name',
	},
	{
		displayName: 'Quantity',
		name: 'quantity',
		type: 'number',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnProductFields'],
				parameterMode: ['fields'],
			},
		},
		description: 'Quantity of pieces',
	},
	{
		displayName: 'Gross Price',
		name: 'price_brutto',
		type: 'number',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnProductFields'],
				parameterMode: ['fields'],
			},
		},
		description: 'Single item gross price',
	},
	{
		displayName: 'Tax Rate (%)',
		name: 'tax_rate',
		type: 'number',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnProductFields'],
				parameterMode: ['fields'],
			},
		},
		description: 'VAT tax rate in percent',
	},
	{
		displayName: 'Storage Type',
		name: 'storage',
		type: 'options',
		options: [
			{ name: 'Internal Inventory (db)', value: 'db' },
			{ name: 'Online Shop (shop)', value: 'shop' },
			{ name: 'Wholesaler (warehouse)', value: 'warehouse' },
		],
		default: 'db',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnProductFields'],
				parameterMode: ['fields'],
			},
		},
		description: 'Type of warehouse storage',
	},
	{
		displayName: 'Storage ID',
		name: 'storage_id',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnProductFields'],
				parameterMode: ['fields'],
			},
		},
		description: 'Storage identifier (0 for Base internal inventory)',
	},
	{
		displayName: 'Product ID',
		name: 'product_id',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnProductFields'],
				parameterMode: ['fields'],
			},
		},
		description: 'Product identifier in Base or store warehouse',
	},
	{
		displayName: 'Variant ID',
		name: 'variant_id',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnProductFields'],
				parameterMode: ['fields'],
			},
		},
		description: 'Product variant ID',
	},
	{
		displayName: 'SKU',
		name: 'sku',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnProductFields'],
				parameterMode: ['fields'],
			},
		},
		description: 'Product SKU',
	},
	{
		displayName: 'EAN',
		name: 'ean',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnProductFields'],
				parameterMode: ['fields'],
			},
		},
		description: 'Product EAN number',
	},
	{
		displayName: 'Location',
		name: 'location',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnProductFields'],
				parameterMode: ['fields'],
			},
		},
		description: 'Product warehouse location',
	},
	{
		displayName: 'Internal Warehouse ID',
		name: 'warehouse_id',
		type: 'number',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnProductFields'],
				parameterMode: ['fields'],
			},
		},
		description: 'Product source warehouse identifier for Base inventory',
	},
	{
		displayName: 'Attributes',
		name: 'attributes',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnProductFields'],
				parameterMode: ['fields'],
			},
		},
		description: 'Product attributes or variant name',
	},
	{
		displayName: 'Weight',
		name: 'weight',
		type: 'number',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnProductFields'],
				parameterMode: ['fields'],
			},
		},
		description: 'Single item weight',
	},
	{
		displayName: 'Item Status',
		name: 'status_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getOrderReturnProductStatuses',
		},
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnProductFields'],
				parameterMode: ['fields'],
			},
		},
		description: 'Identifier of return item status',
	},
	{
		displayName: 'Return Reason',
		name: 'return_reason_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getOrderReturnReasonsList',
		},
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnProductFields'],
				parameterMode: ['fields'],
			},
		},
		description: 'Identifier of return reason',
	},

	// =========================================================================
	//   7. getOrderReturnStatusList
	// =========================================================================
	{
		displayName: 'Filter by Group ID',
		name: 'filterGroupId',
		type: 'number',
		default: '',
		placeholder: 'e.g. 1',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['getOrderReturnStatusList'],
			},
		},
		description: 'Optionally filter returned statuses by status group ID. Leave empty for all.',
	},

	// =========================================================================
	//   8. setOrderReturnStatus
	// =========================================================================
	{
		displayName: 'Input Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{
				name: 'Form Fields (UI)',
				value: 'fields',
				description: 'Configure using form fields',
			},
			{
				name: 'Raw Parameters (JSON)',
				value: 'json',
				description: 'Pass raw JSON parameters',
			},
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnStatus'],
			},
		},
		description: 'Choose whether to configure request using UI fields or raw JSON',
	},
	{
		displayName: 'Parameters (JSON)',
		name: 'parametersJson',
		type: 'json',
		default: '{\n  "return_id": 12345,\n  "status_id": 1\n}',
		required: true,
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnStatus'],
				parameterMode: ['json'],
			},
		},
		description: 'JSON object with return_id and status_id',
	},
	{
		displayName: 'Return ID',
		name: 'return_id',
		type: 'number',
		default: '',
		required: true,
		placeholder: 'e.g. 12345',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnStatus'],
				parameterMode: ['fields'],
			},
		},
		description: 'Order return ID number',
	},
	{
		displayName: 'Status',
		name: 'status_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getOrderReturnStatuses',
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnStatus'],
				parameterMode: ['fields'],
			},
		},
		description: 'Target order return status ID',
	},

	// =========================================================================
	//   9. setOrderReturnStatuses
	// =========================================================================
	{
		displayName: 'Input Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{
				name: 'Form Fields (UI)',
				value: 'fields',
				description: 'Configure using form fields',
			},
			{
				name: 'Raw Parameters (JSON)',
				value: 'json',
				description: 'Pass raw JSON parameters',
			},
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnStatuses'],
			},
		},
		description: 'Choose whether to configure request using UI fields or raw JSON',
	},
	{
		displayName: 'Parameters (JSON)',
		name: 'parametersJson',
		type: 'json',
		default: '{\n  "return_ids": [12345, 12346],\n  "status_id": 1\n}',
		required: true,
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnStatuses'],
				parameterMode: ['json'],
			},
		},
		description: 'JSON object with return_ids array and status_id',
	},
	{
		displayName: 'Return IDs',
		name: 'return_ids',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'e.g. 12345, 12346 or [12345, 12346]',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnStatuses'],
				parameterMode: ['fields'],
			},
		},
		description: 'Comma-separated string or JSON array of return IDs',
	},
	{
		displayName: 'Status',
		name: 'status_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getOrderReturnStatuses',
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnStatuses'],
				parameterMode: ['fields'],
			},
		},
		description: 'Target order return status ID',
	},

	// =========================================================================
	//   10. addOrderReturnStatus
	// =========================================================================
	{
		displayName: 'Input Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{
				name: 'Form Fields (UI)',
				value: 'fields',
				description: 'Configure using UI fields',
			},
			{
				name: 'Raw Parameters (JSON)',
				value: 'json',
				description: 'Pass raw JSON parameters',
			},
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturnStatus'],
			},
		},
		description: 'Choose whether to configure request using UI fields or raw JSON',
	},
	{
		displayName: 'Parameters (JSON)',
		name: 'parametersJson',
		type: 'json',
		default: '{\n  "name": "Returned",\n  "color": "#1C8752"\n}',
		required: true,
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturnStatus'],
				parameterMode: ['json'],
			},
		},
		description: 'JSON object with addOrderReturnStatus parameters',
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'e.g. Return in verification',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturnStatus'],
				parameterMode: ['fields'],
			},
		},
		description: 'Status name (basic) displayed in the panel',
	},
	{
		displayName: 'Status ID (for Update)',
		name: 'status_id',
		type: 'number',
		default: '',
		placeholder: 'Leave blank to create new',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturnStatus'],
				parameterMode: ['fields'],
			},
		},
		description: 'Provide to update an existing status. Leave empty when creating a new status.',
	},
	{
		displayName: 'Color',
		name: 'color',
		type: 'color',
		default: '#1C8752',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturnStatus'],
				parameterMode: ['fields'],
			},
		},
		description: 'Status color in hex format (e.g. #FF0000)',
	},
	{
		displayName: 'Status Group',
		name: 'group_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getOrderReturnStatusGroups',
		},
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturnStatus'],
				parameterMode: ['fields'],
			},
		},
		description: 'Status group. If omitted on create, placed in the main (default) group.',
	},
	{
		displayName: 'Name for Customer',
		name: 'name_for_customer',
		type: 'string',
		default: '',
		placeholder: 'e.g. Return accepted',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturnStatus'],
				parameterMode: ['fields'],
			},
		},
		description: 'Status name displayed to the customer on return tracking page (accepts plain string or JSON dictionary)',
	},

	// =========================================================================
	//   11. addOrderReturnStatusGroup
	// =========================================================================
	{
		displayName: 'Input Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{
				name: 'Form Fields (UI)',
				value: 'fields',
				description: 'Configure using UI fields',
			},
			{
				name: 'Raw Parameters (JSON)',
				value: 'json',
				description: 'Pass raw JSON parameters',
			},
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturnStatusGroup'],
			},
		},
		description: 'Choose whether to configure request using UI fields or raw JSON',
	},
	{
		displayName: 'Parameters (JSON)',
		name: 'parametersJson',
		type: 'json',
		default: '{\n  "name": "Archive Returns"\n}',
		required: true,
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturnStatusGroup'],
				parameterMode: ['json'],
			},
		},
		description: 'JSON object with group name and optional group_id',
	},
	{
		displayName: 'Group Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'e.g. Completed',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturnStatusGroup'],
				parameterMode: ['fields'],
			},
		},
		description: 'Name of the status group (up to 15 characters)',
	},
	{
		displayName: 'Group ID (for Update)',
		name: 'group_id',
		type: 'number',
		default: '',
		placeholder: 'Leave blank to create new',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['addOrderReturnStatusGroup'],
				parameterMode: ['fields'],
			},
		},
		description: 'Provide to update an existing status group. Leave empty when creating a new group.',
	},

	// =========================================================================
	//   12. deleteOrderReturnStatus
	// =========================================================================
	{
		displayName: 'Status to Delete',
		name: 'status_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getOrderReturnStatuses',
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['deleteOrderReturnStatus'],
			},
		},
		description: 'Select the order return status to delete',
	},
	{
		displayName: 'Target Status for Migration',
		name: 'target_status_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getOrderReturnStatuses',
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['deleteOrderReturnStatus'],
			},
		},
		description: 'All items currently in the deleted status will be migrated to this status. Must be different from the status being deleted.',
	},

	// =========================================================================
	//   13. deleteOrderReturnStatusGroup
	// =========================================================================
	{
		displayName: 'Status Group to Delete',
		name: 'group_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getOrderReturnStatusGroups',
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['deleteOrderReturnStatusGroup'],
			},
		},
		description: 'Select the status group to delete. All statuses in this group will be moved to the default main group.',
	},

	// =========================================================================
	//   14. getOrderReturnPaymentsHistory
	// =========================================================================
	{
		displayName: 'Return ID',
		name: 'return_id',
		type: 'number',
		default: '',
		required: true,
		placeholder: 'e.g. 12345',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['getOrderReturnPaymentsHistory'],
			},
		},
		description: 'Order return identifier',
	},
	{
		displayName: 'Show Full History',
		name: 'show_full_history',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['getOrderReturnPaymentsHistory'],
			},
		},
		description: 'Whether to download full payment history (including value changes and manual edits). False by default.',
	},

	// =========================================================================
	//   15. setOrderReturnRefund
	// =========================================================================
	{
		displayName: 'Input Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{
				name: 'Form Fields (UI)',
				value: 'fields',
				description: 'Configure refund using UI fields',
			},
			{
				name: 'Raw Parameters (JSON)',
				value: 'json',
				description: 'Pass raw JSON parameters',
			},
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnRefund'],
			},
		},
		description: 'Choose whether to configure request using UI fields or raw JSON',
	},
	{
		displayName: 'Parameters (JSON)',
		name: 'parametersJson',
		type: 'json',
		default: '{\n  "return_id": 12345,\n  "order_refund_done": 49.99\n}',
		required: true,
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnRefund'],
				parameterMode: ['json'],
			},
		},
		description: 'JSON object with setOrderReturnRefund parameters',
	},
	{
		displayName: 'Return ID',
		name: 'return_id',
		type: 'number',
		default: '',
		required: true,
		placeholder: 'e.g. 12345',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnRefund'],
				parameterMode: ['fields'],
			},
		},
		description: 'Order return ID',
	},
	{
		displayName: 'Refund Amount Done',
		name: 'order_refund_done',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnRefund'],
				parameterMode: ['fields'],
			},
		},
		description: 'The amount of the refund. Sets the total refund recorded for this return.',
	},
	{
		displayName: 'Refund Date',
		name: 'refund_date',
		type: 'string',
		default: '',
		placeholder: 'e.g. 1700000000 or 2026-01-01',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnRefund'],
				parameterMode: ['fields'],
			},
		},
		description: 'Refund date in Unix timestamp format or ISO date string (leave empty for current time)',
	},
	{
		displayName: 'Refund Comment',
		name: 'refund_comment',
		type: 'string',
		default: '',
		placeholder: 'e.g. Refunded via PayU',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnRefund'],
				parameterMode: ['fields'],
			},
		},
		description: 'Refund commentary',
	},
	{
		displayName: 'External Refund ID',
		name: 'external_refund_id',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['setOrderReturnRefund'],
				parameterMode: ['fields'],
			},
		},
		description: 'External refund identifier (e.g. payment gateway refund ID)',
	},

	// =========================================================================
	//   16. getOrderReturnJournalList
	// =========================================================================
	{
		displayName: 'Input Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{
				name: 'Form Fields (UI)',
				value: 'fields',
				description: 'Configure using UI fields',
			},
			{
				name: 'Raw Parameters (JSON)',
				value: 'json',
				description: 'Pass raw JSON parameters',
			},
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['getOrderReturnJournalList'],
			},
		},
		description: 'Choose whether to configure request using UI fields or raw JSON',
	},
	{
		displayName: 'Parameters (JSON)',
		name: 'parametersJson',
		type: 'json',
		default: '{\n  "last_log_id": 0\n}',
		required: true,
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['getOrderReturnJournalList'],
				parameterMode: ['json'],
			},
		},
		description: 'JSON object with getOrderReturnJournalList parameters',
	},
	{
		displayName: 'Last Log ID',
		name: 'last_log_id',
		type: 'number',
		default: 0,
		placeholder: 'e.g. 1000',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['getOrderReturnJournalList'],
				parameterMode: ['fields'],
			},
		},
		description: 'Log ID number from which the logs are retrieved',
	},
	{
		displayName: 'Return ID',
		name: 'return_id',
		type: 'number',
		default: '',
		placeholder: 'e.g. 12345',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['getOrderReturnJournalList'],
				parameterMode: ['fields'],
			},
		},
		description: 'Filter events by specific order return ID',
	},
	{
		displayName: 'Event Log Types',
		name: 'logs_types',
		type: 'string',
		default: '',
		placeholder: 'e.g. 1, 2, 5 or [1, 2, 5]',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['getOrderReturnJournalList'],
				parameterMode: ['fields'],
			},
		},
		description: 'Comma-separated string or JSON array of event types (1: Created, 2: Accepted, 3: Completed, 4: Canceled, 5: Refunded, 6: Delivery edit, 7: Add product, 8: Edit product, 9: Remove product, 10: Data edit, 11: Status change, 12: Item status change)',
	},

	// =========================================================================
	//   17. runOrderReturnMacroTrigger
	// =========================================================================
	{
		displayName: 'Return ID',
		name: 'return_id',
		type: 'number',
		default: '',
		required: true,
		placeholder: 'e.g. 12345',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['runOrderReturnMacroTrigger'],
			},
		},
		description: 'Order return identifier from BaseLinker order manager',
	},
	{
		displayName: 'Trigger ID',
		name: 'trigger_id',
		type: 'number',
		default: '',
		required: true,
		placeholder: 'e.g. 101',
		displayOptions: {
			show: {
				resource: ['orderReturns'],
				operation: ['runOrderReturnMacroTrigger'],
			},
		},
		description: 'Identifier of personal automatic action macro trigger for order returns',
	},
];
