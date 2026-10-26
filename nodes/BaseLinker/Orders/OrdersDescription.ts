import { INodeProperties } from 'n8n-workflow';

export const orderOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['orders'],
			},
		},
		options: [
			{
				name: 'Get Orders',
				value: 'getOrders',
				description: 'Retrieve orders from BaseLinker order manager (method: getOrders)',
				action: 'Get orders',
			},
			{
				name: 'Set Order Fields',
				value: 'setOrderFields',
				description: 'Edit selected fields (e.g. address data, notes, custom extra fields) of a specific order (method: setOrderFields)',
				action: 'Set order fields',
			},
			{
				name: 'Get Status List',
				value: 'getOrderStatusList',
				description: 'Retrieve order statuses created in BaseLinker order manager (method: getOrderStatusList)',
				action: 'Get order status list',
			},
			{
				name: 'Get Status Groups',
				value: 'getOrderStatusGroups',
				description: 'Retrieve order status groups used to organize statuses in sidebar (method: getOrderStatusGroups)',
				action: 'Get order status groups',
			},
			{
				name: 'Get Journal List',
				value: 'getJournalList',
				description: 'Download order events log from the last 3 days (method: getJournalList)',
				action: 'Get journal list',
			},
			{
				name: 'Get Order Extra Fields',
				value: 'getOrderExtraFields',
				description: 'Retrieve custom extra fields defined for orders (method: getOrderExtraFields)',
				action: 'Get order extra fields',
			},
			{
				name: 'Get Order Sources',
				value: 'getOrderSources',
				description: 'Retrieve order source types and account IDs (method: getOrderSources)',
				action: 'Get order sources',
			},
			{
				name: 'Get Order Packages',
				value: 'getOrderPackages',
				description: 'Download courier shipments created for an order (method: getOrderPackages)',
				action: 'Get order packages',
			},
			{
				name: 'Get Order Payments History',
				value: 'getOrderPaymentsHistory',
				description: 'Retrieve payment history for a selected order, including gateway transaction IDs (method: getOrderPaymentsHistory)',
				action: 'Get order payments history',
			},
			{
				name: 'Add Order',
				value: 'addOrder',
				description: 'Add a new order to the BaseLinker order manager (method: addOrder)',
				action: 'Add order',
			},
			{
				name: 'Add Order by Split',
				value: 'addOrderBySplit',
				description: 'Create a new order by splitting selected products from an existing order (method: addOrderBySplit)',
				action: 'Split order into new order',
			},
			{
				name: 'Add Order Duplicate',
				value: 'addOrderDuplicate',
				description: 'Create a new order by duplicating an existing order (method: addOrderDuplicate)',
				action: 'Duplicate order',
			},
			{
				name: 'Delete Orders',
				value: 'deleteOrders',
				description: 'Delete multiple orders from BaseLinker (method: deleteOrders)',
				action: 'Delete orders',
			},
			{
				name: 'Merge Orders',
				value: 'setOrdersMerge',
				description: 'Merge multiple orders into one based on selected merge mode (method: setOrdersMerge)',
				action: 'Merge orders',
			},
			{
				name: 'Add Order Product',
				value: 'addOrderProduct',
				description: 'Add a new product item to an order (method: addOrderProduct)',
				action: 'Add product to order',
			},
			{
				name: 'Delete Order Product',
				value: 'deleteOrderProduct',
				description: 'Remove a specific product item from an order (method: deleteOrderProduct)',
				action: 'Delete product from order',
			},
			{
				name: 'Set Order Product Fields',
				value: 'setOrderProductFields',
				description: 'Edit selected fields of a specific order product (method: setOrderProductFields)',
				action: 'Set order product fields',
			},
			{
				name: 'Set Order Payment',
				value: 'setOrderPayment',
				description: 'Add or update payment amount for an order (method: setOrderPayment)',
				action: 'Set order payment',
			},
			{
				name: 'Set Order Status',
				value: 'setOrderStatus',
				description: 'Change status of a single order (method: setOrderStatus)',
				action: 'Set order status',
			},
			{
				name: 'Set Order Statuses (Batch)',
				value: 'setOrderStatuses',
				description: 'Batch update status for multiple orders (method: setOrderStatuses)',
				action: 'Set multiple order statuses',
			},
			{
				name: 'Add / Update Order Status',
				value: 'addOrderStatus',
				description: 'Create a new order status or update an existing one (method: addOrderStatus)',
				action: 'Add or update order status',
			},
			{
				name: 'Add / Update Status Group',
				value: 'addOrderStatusGroup',
				description: 'Create a new status group or update an existing one (method: addOrderStatusGroup)',
				action: 'Add or update status group',
			},
			{
				name: 'Delete Order Status',
				value: 'deleteOrderStatus',
				description: 'Delete an order status and migrate existing orders to a target status (method: deleteOrderStatus)',
				action: 'Delete order status',
			},
			{
				name: 'Delete Status Group',
				value: 'deleteOrderStatusGroup',
				description: 'Delete a status group and move its statuses to the main group (method: deleteOrderStatusGroup)',
				action: 'Delete status group',
			},
			{
				name: 'Get Orders by Email',
				value: 'getOrdersByEmail',
				description: 'Search for orders related to a specific e-mail address (method: getOrdersByEmail)',
				action: 'Get orders by email',
			},
			{
				name: 'Get Orders by Phone',
				value: 'getOrdersByPhone',
				description: 'Search for orders related to a specific phone number (method: getOrdersByPhone)',
				action: 'Get orders by phone',
			},
			{
				name: 'Get Order Transaction Data',
				value: 'getOrderTransactionData',
				description: 'Retrieve transaction and tax details for a marketplace order (method: getOrderTransactionData)',
				action: 'Get order transaction data',
			},
			{
				name: 'Get Order Printout Templates',
				value: 'getOrderPrintoutTemplates',
				description: 'Retrieve configured printout templates available for orders (method: getOrderPrintoutTemplates)',
				action: 'Get order printout templates',
			},
			{
				name: 'Run Order Macro Trigger',
				value: 'runOrderMacroTrigger',
				description: 'Execute personal trigger for orders automatic actions (method: runOrderMacroTrigger)',
				action: 'Run order macro trigger',
			},
			{
				name: 'Add Order Pick List',
				value: 'addOrderPickList',
				description: 'Create a paper pick list for up to 100 orders (method: addOrderPickList)',
				action: 'Add order pick list',
			},
			{
				name: 'Get Order Pick Lists',
				value: 'getOrderPickLists',
				description: 'Retrieve paper pick lists with filtering and pagination (method: getOrderPickLists)',
				action: 'Get order pick lists',
			},
			{
				name: 'Get Order PickPack History',
				value: 'getOrderPickPackHistory',
				description: 'Retrieve pick and pack history logs for a selected order (method: getOrderPickPackHistory)',
				action: 'Get order pick pack history',
			},
			{
				name: 'Get PickPack Carts',
				value: 'getPickPackCarts',
				description: 'Retrieve all PickPack carts belonging to the authenticated account (method: getPickPackCarts)',
				action: 'Get pick pack carts',
			},
			{
				name: 'Add / Update PickPack Cart',
				value: 'addPickPackCart',
				description: 'Create a new PickPack cart or update an existing one (method: addPickPackCart)',
				action: 'Add or update pick pack cart',
			},
			{
				name: 'Delete PickPack Cart',
				value: 'deletePickPackCart',
				description: 'Delete a PickPack cart and unassign its orders (method: deletePickPackCart)',
				action: 'Delete pick pack cart',
			},
			{
				name: 'Get PickPack Cart Orders',
				value: 'getPickPackCartOrders',
				description: 'Retrieve order IDs currently assigned to a specific PickPack cart (method: getPickPackCartOrders)',
				action: 'Get orders in pick pack cart',
			},
			{
				name: 'Get PickPack Order Cart',
				value: 'getPickPackOrderCart',
				description: 'Check which PickPack cart an order is assigned to (method: getPickPackOrderCart)',
				action: 'Get cart for order',
			},
			{
				name: 'Add PickPack Orders to Cart',
				value: 'addPickPackOrdersToCart',
				description: 'Assign up to 20 orders to a specific PickPack cart (method: addPickPackOrdersToCart)',
				action: 'Assign orders to pick pack cart',
			},
			{
				name: 'Clear PickPack Cart Orders',
				value: 'deletePickPackCartOrders',
				description: 'Remove all orders from a specific PickPack cart (method: deletePickPackCartOrders)',
				action: 'Clear orders from pick pack cart',
			},
			{
				name: 'Remove Order from PickPack Cart',
				value: 'deletePickPackOrderFromCart',
				description: 'Remove a specific order from its assigned PickPack cart (method: deletePickPackOrderFromCart)',
				action: 'Remove order from pick pack cart',
			},
		],
		default: 'getOrders',
	},
];

export const orderFields: INodeProperties[] = [
	// ----------------------------------
	//         Parameter Input Mode
	// ----------------------------------
	{
		displayName: 'Parameters Mode',
		name: 'parameterInputMode',
		type: 'options',
		options: [
			{
				name: 'Using Fields',
				value: 'fields',
				description: 'Configure request parameters using individual UI fields',
			},
			{
				name: 'JSON Object / Raw Payload',
				value: 'json',
				description: 'Provide all getOrders parameters as a JSON object (supports expressions and dynamic templates)',
			},
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['getOrders'],
			},
		},
		description: 'Choose whether to set parameters individually or as a complete JSON payload',
	},

	// ----------------------------------
	//   JSON Payload Input
	// ----------------------------------
	{
		displayName: 'Parameters (JSON)',
		name: 'parametersJson',
		type: 'json',
		default: '{\n  "date_confirmed_from": 0,\n  "get_unconfirmed_orders": false\n}',
		required: true,
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['getOrders'],
				parameterInputMode: ['json'],
			},
		},
		description: 'JSON object containing method parameters matching https://api.baselinker.com/index.php?method=getOrders',
	},

	// ----------------------------------
	//   UI Fields: Primary Filters
	// ----------------------------------
	{
		displayName: 'Order ID',
		name: 'order_id',
		type: 'number',
		default: '',
		placeholder: 'e.g. 7834521',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['getOrders'],
				parameterInputMode: ['fields'],
			},
		},
		description: 'Order identifier. If specified, only this single order will be downloaded.',
	},
	{
		displayName: 'Confirmed From (Unix / Date)',
		name: 'date_confirmed_from',
		type: 'string',
		default: '',
		placeholder: 'e.g. 1607841256 or 2024-01-01',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['getOrders'],
				parameterInputMode: ['fields'],
			},
		},
		description: 'Date of order confirmation from which orders are to be collected. Accepts Unix timestamp in seconds or standard date string. Recommended for ongoing sync.',
	},
	{
		displayName: 'Date From (Unix / Date)',
		name: 'date_from',
		type: 'string',
		default: '',
		placeholder: 'e.g. 1607841161 or 2024-01-01',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['getOrders'],
				parameterInputMode: ['fields'],
			},
		},
		description: 'The order creation date from which orders are to be collected. Accepts Unix timestamp in seconds or standard date string.',
	},
	{
		displayName: 'ID From',
		name: 'id_from',
		type: 'number',
		default: '',
		placeholder: 'e.g. 1000',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['getOrders'],
				parameterInputMode: ['fields'],
			},
		},
		description: 'The order ID number from which subsequent orders are to be collected',
	},
	{
		displayName: 'Get Unconfirmed Orders',
		name: 'get_unconfirmed_orders',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['getOrders'],
				parameterInputMode: ['fields'],
			},
		},
		description: 'Whether to also download unconfirmed orders (e.g. buyer has not completed delivery form). Note: unconfirmed orders may lack confirmation date, so pagination by date_from or id_from is recommended.',
	},
	{
		displayName: 'Include Custom Extra Fields',
		name: 'include_custom_extra_fields',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['getOrders'],
				parameterInputMode: ['fields'],
			},
		},
		description: 'Whether to download values of custom additional fields defined in BaseLinker',
	},
	{
		displayName: 'Status Filter',
		name: 'statusFilter',
		type: 'options',
		options: [
			{
				name: 'All Statuses (No Filter)',
				value: 'all',
				description: 'Download orders from all statuses',
			},
			{
				name: 'Single Status',
				value: 'single',
				description: 'Filter by a specific status ID',
			},
			{
				name: 'Status Group',
				value: 'group',
				description: 'Download orders from all statuses in a selected status group',
			},
		],
		default: 'all',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['getOrders'],
				parameterInputMode: ['fields'],
			},
		},
		description: 'Choose whether to collect orders from all statuses, a specific status, or all statuses belonging to a status group',
	},
	{
		displayName: 'Status',
		name: 'status_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getOrderStatuses',
		},
		default: '',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['getOrders'],
				parameterInputMode: ['fields'],
				statusFilter: ['single'],
			},
		},
		description: 'The status from which orders are to be collected. Choose from the list or specify an ID using an expression.',
	},
	{
		displayName: 'Status Group',
		name: 'status_group_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getOrderStatusGroups',
		},
		default: '',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['getOrders'],
				parameterInputMode: ['fields'],
				statusFilter: ['group'],
			},
		},
		description: 'Select a status group. The node will automatically query all statuses belonging to this group and retrieve all their orders.',
	},

	// ----------------------------------
	//   UI Fields: Additional Filters
	// ----------------------------------
	{
		displayName: 'Additional Filters',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['getOrders'],
				parameterInputMode: ['fields'],
			},
		},
		options: [
			{
				displayName: 'Filter Email',
				name: 'filter_email',
				type: 'string',
				default: '',
				placeholder: 'buyer@example.com',
				description: 'Filter orders by customer email address',
			},
			{
				displayName: 'Filter Order Source',
				name: 'filter_order_source',
				type: 'string',
				default: '',
				placeholder: 'e.g. allegro, ebay, amazon, shop, personal',
				description: 'Filtering of order lists by order source type',
			},
			{
				displayName: 'Filter Order Source ID',
				name: 'filter_order_source_id',
				type: 'number',
				default: '',
				placeholder: 'e.g. 1455',
				description: 'Filtering of order lists by order source identifier (requires Filter Order Source to be set)',
			},
			{
				displayName: 'Filter Shop Order ID',
				name: 'filter_shop_order_id',
				type: 'number',
				default: '',
				placeholder: 'e.g. 1204',
				description: 'Shop Order identifier from external ecommerce store',
			},
			{
				displayName: 'Filter External Order ID',
				name: 'filter_external_order_id',
				type: 'string',
				default: '',
				placeholder: 'e.g. 310298456',
				description: 'Original order ID assigned by the marketplace or store (e.g. Allegro or Amazon order ID). Do not use together with Filter Shop Order ID.',
			},
			{
				displayName: 'Include Commissions',
				name: 'include_commissions',
				type: 'boolean',
				default: false,
				description: 'Whether to include marketplace commission breakdown for each order',
			},
			{
				displayName: 'Include Connect Data',
				name: 'include_connect_data',
				type: 'boolean',
				default: false,
				description: 'Whether to include Base Connect and contractor information',
			},
			{
				displayName: 'Include Discounts Data',
				name: 'include_discounts_data',
				type: 'boolean',
				default: false,
				description: 'Whether to include discount logs and coupon details for each order',
			},
		],
	},

	// ----------------------------------
	//         Pagination Controls
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['getOrders'],
			},
		},
		description: 'Whether to return all matching orders (iterating through pages) or just the first batch (up to 100)',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 100,
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['getOrders'],
				returnAll: [false],
			},
		},
		description: 'Max number of orders to return in this single batch (maximum 100 allowed by BaseLinker API)',
	},
	{
		displayName: 'Pagination Cursor Field',
		name: 'paginationField',
		type: 'options',
		options: [
			{
				name: 'Date Confirmed From (date_confirmed_from)',
				value: 'date_confirmed_from',
				description: 'Increment date_confirmed by 1 second. Official BaseLinker recommended method for confirmed orders.',
			},
			{
				name: 'Date From (date_from)',
				value: 'date_from',
				description: 'Increment date_add by 1 second. Useful when downloading both confirmed and unconfirmed orders.',
			},
			{
				name: 'ID From (id_from)',
				value: 'id_from',
				description: 'Increment order_id by 1. Useful for sequential order ID processing.',
			},
		],
		default: 'date_confirmed_from',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['getOrders'],
				returnAll: [true],
			},
		},
		description: 'Select which parameter to advance between pagination requests',
	},
	{
		displayName: 'Delay Between Requests (ms)',
		name: 'delayMs',
		type: 'number',
		typeOptions: {
			minValue: 0,
			maxValue: 10000,
		},
		default: 650,
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['getOrders'],
				returnAll: [true],
			},
		},
		description: 'Delay in milliseconds between requests. BaseLinker allows max 100 requests/minute (~600ms per request). Default of 650ms guarantees safe execution within rate limits.',
	},
	{
		displayName: 'Max Total Orders',
		name: 'maxTotalOrders',
		type: 'number',
		typeOptions: {
			minValue: 0,
		},
		default: 0,
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['getOrders'],
				returnAll: [true],
			},
		},
		description: 'Maximum total orders to retrieve across all pages. Set to 0 for unlimited (fetches until no more orders are returned).',
	},

	// ----------------------------------
	//   Fields for getJournalList
	// ----------------------------------
	{
		displayName: 'Last Log ID',
		name: 'last_log_id',
		type: 'number',
		default: '',
		placeholder: 'e.g. 654258',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['getJournalList'],
			},
		},
		description: 'Log ID number from which logs are to be retrieved',
	},
	{
		displayName: 'Log Types',
		name: 'logs_types',
		type: 'multiOptions',
		options: [
			{ name: '1 - Order Creation', value: 1 },
			{ name: '2 - DOF Download (Order Confirmation)', value: 2 },
			{ name: '3 - Payment of Order', value: 3 },
			{ name: '4 - Removal of Order / Invoice / Receipt', value: 4 },
			{ name: '5 - Merging Orders', value: 5 },
			{ name: '6 - Splitting Order', value: 6 },
			{ name: '7 - Issuing Invoice', value: 7 },
			{ name: '8 - Issuing Receipt', value: 8 },
			{ name: '9 - Package Creation', value: 9 },
			{ name: '10 - Deleting Package', value: 10 },
			{ name: '11 - Editing Delivery Data', value: 11 },
			{ name: '12 - Adding Product to Order', value: 12 },
			{ name: '13 - Editing Product in Order', value: 13 },
			{ name: '14 - Removing Product from Order', value: 14 },
			{ name: '15 - Adding Buyer to Blacklist', value: 15 },
			{ name: '16 - Editing Order Data', value: 16 },
			{ name: '17 - Copying Order', value: 17 },
			{ name: '18 - Order Status Change', value: 18 },
			{ name: '19 - Invoice Deletion', value: 19 },
			{ name: '20 - Receipt Deletion', value: 20 },
			{ name: '21 - Editing Invoice Data', value: 21 },
			{ name: '22 - Package Status Change', value: 22 },
		],
		default: [],
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['getJournalList'],
			},
		},
		description: 'Filter events by specific event types. Leave empty to retrieve all types.',
	},
	{
		displayName: 'Order ID',
		name: 'journal_order_id',
		type: 'number',
		default: '',
		placeholder: 'e.g. 6911942',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['getJournalList'],
			},
		},
		description: 'Filter logs for a specific Order ID',
	},

	// ----------------------------------
	//   Fields for getOrderSources
	// ----------------------------------
	{
		displayName: 'Output Format',
		name: 'sourcesOutputFormat',
		type: 'options',
		options: [
			{
				name: 'Flattened (Individual Source Items)',
				value: 'flattened',
				description: 'Return each source account as an individual item (source_type, source_id, source_name)',
			},
			{
				name: 'Raw (Grouped Object)',
				value: 'raw',
				description: 'Return the original BaseLinker sources object grouped by type',
			},
		],
		default: 'flattened',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['getOrderSources'],
			},
		},
		description: 'Format of the returned order sources',
	},

	// ----------------------------------
	//   Fields for getOrderPackages (under orders)
	// ----------------------------------
	{
		displayName: 'Order ID',
		name: 'order_packages_order_id',
		type: 'number',
		default: '',
		placeholder: 'e.g. 6910995',
		required: true,
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['getOrderPackages'],
			},
		},
		description: 'Order identifier from BaseLinker',
	},

	// ----------------------------------
	//   Fields for getOrderPaymentsHistory
	// ----------------------------------
	{
		displayName: 'Order ID',
		name: 'order_id',
		type: 'number',
		default: '',
		placeholder: 'e.g. 3754894',
		required: true,
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['getOrderPaymentsHistory'],
			},
		},
		description: 'Order identifier from BaseLinker order manager',
	},
	{
		displayName: 'Show Full History',
		name: 'show_full_history',
		type: 'boolean',
		default: true,
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['getOrderPaymentsHistory'],
			},
		},
		description: 'Whether to download full payment history (including manual edits and order value changes). Defaults to true. When switched off (false), returns only entries containing an external payment identifier.',
	},

	// ----------------------------------
	//   Fields for setOrderFields
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'setOrderFieldsMode',
		type: 'options',
		options: [
			{
				name: 'Using Fields (UI)',
				value: 'fields',
				description: 'Configure order fields and custom extra fields via UI controls',
			},
			{
				name: 'Raw JSON Payload',
				value: 'json',
				description: 'Provide parameters directly as a raw JSON string or expression',
			},
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['setOrderFields'],
			},
		},
		description: 'Choose whether to set parameters individually or as a complete JSON payload',
	},
	{
		displayName: 'Parameters (JSON)',
		name: 'setOrderFieldsJson',
		type: 'json',
		default: '{\n  "order_id": 0,\n  "custom_extra_fields": {}\n}',
		required: true,
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['setOrderFields'],
				setOrderFieldsMode: ['json'],
			},
		},
		description: 'JSON object containing method parameters matching https://api.baselinker.com/index.php?method=setOrderFields',
	},
	{
		displayName: 'Order ID',
		name: 'order_id',
		type: 'number',
		default: '',
		placeholder: 'e.g. 3754894',
		required: true,
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['setOrderFields'],
				setOrderFieldsMode: ['fields'],
			},
		},
		description: 'Order identifier from BaseLinker order manager. Field required.',
	},
	{
		displayName: 'Custom Extra Fields',
		name: 'customExtraFieldsUi',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		placeholder: 'Add Custom Extra Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['setOrderFields'],
				setOrderFieldsMode: ['fields'],
			},
		},
		description: 'Configure custom extra fields by selecting them dynamically from your BaseLinker account or providing custom field IDs',
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
							loadOptionsMethod: 'getOrderExtraFieldsList',
						},
						default: '',
						description: 'Select the custom extra field from your BaseLinker account, or use an expression/custom ID',
					},
					{
						displayName: 'Field Value',
						name: 'value',
						type: 'string',
						default: '',
						description: 'Value to assign to this custom extra field. To delete/clear this field in BaseLinker, leave empty or provide an empty string. For file upload, provide JSON: {"title": "file.pdf", "file": "data:4AAQ..."}.',
					},
				],
			},
		],
	},
	{
		displayName: 'Custom Extra Fields (JSON / Expression)',
		name: 'customExtraFieldsJson',
		type: 'json',
		default: '',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['setOrderFields'],
				setOrderFieldsMode: ['fields'],
			},
		},
		description: 'Provide custom extra fields as a JSON object (mapping extra field IDs to values) or expression (e.g. { "1": "value", "135": "" }). Values will be merged with any fields specified in Custom Extra Fields above.',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field to Update',
		default: {},
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['setOrderFields'],
				setOrderFieldsMode: ['fields'],
			},
		},
		description: 'Select and configure standard order fields to update',
		options: [
			{
				displayName: 'Admin Comments',
				name: 'admin_comments',
				type: 'string',
				default: '',
				description: 'Seller comments (max 200 characters)',
			},
			{
				displayName: 'Currency',
				name: 'currency',
				type: 'string',
				default: '',
				placeholder: 'e.g. EUR, PLN, USD',
				description: 'Order currency code (3 letters)',
			},
			{
				displayName: 'Delivery Address',
				name: 'delivery_address',
				type: 'string',
				default: '',
				description: 'Delivery address - street and number (max 156 characters)',
			},
			{
				displayName: 'Delivery City',
				name: 'delivery_city',
				type: 'string',
				default: '',
				description: 'Delivery address - city (max 100 characters)',
			},
			{
				displayName: 'Delivery Company',
				name: 'delivery_company',
				type: 'string',
				default: '',
				description: 'Delivery address - company name (max 156 characters)',
			},
			{
				displayName: 'Delivery Country Code',
				name: 'delivery_country_code',
				type: 'string',
				default: '',
				placeholder: 'e.g. PL, DE, US',
				description: 'Delivery address - 2-letter country code',
			},
			{
				displayName: 'Delivery Full Name',
				name: 'delivery_fullname',
				type: 'string',
				default: '',
				description: 'Delivery address - recipient full name (max 156 characters)',
			},
			{
				displayName: 'Delivery Method',
				name: 'delivery_method',
				type: 'string',
				default: '',
				description: 'Delivery method name (max 30 characters)',
			},
			{
				displayName: 'Delivery Point Address',
				name: 'delivery_point_address',
				type: 'string',
				default: '',
				description: 'Pick-up point delivery - address (max 100 characters)',
			},
			{
				displayName: 'Delivery Point City',
				name: 'delivery_point_city',
				type: 'string',
				default: '',
				description: 'Pick-up point delivery - city (max 100 characters)',
			},
			{
				displayName: 'Delivery Point ID',
				name: 'delivery_point_id',
				type: 'string',
				default: '',
				placeholder: 'e.g. KRA01M',
				description: 'Pick-up point delivery - identifier (max 40 characters)',
			},
			{
				displayName: 'Delivery Point Name',
				name: 'delivery_point_name',
				type: 'string',
				default: '',
				description: 'Pick-up point delivery - name (max 100 characters)',
			},
			{
				displayName: 'Delivery Point Postcode',
				name: 'delivery_point_postcode',
				type: 'string',
				default: '',
				description: 'Pick-up point delivery - postcode (max 100 characters)',
			},
			{
				displayName: 'Delivery Postcode',
				name: 'delivery_postcode',
				type: 'string',
				default: '',
				description: 'Delivery address - postcode (max 100 characters)',
			},
			{
				displayName: 'Delivery Price',
				name: 'delivery_price',
				type: 'number',
				default: 0,
				description: 'Gross delivery price',
			},
			{
				displayName: 'Delivery State',
				name: 'delivery_state',
				type: 'string',
				default: '',
				description: 'Delivery address - state / province (max 35 characters)',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				default: '',
				placeholder: 'e.g. buyer@example.com',
				description: 'Buyer email address (max 150 characters)',
			},
			{
				displayName: 'Extra Field 1',
				name: 'extra_field_1',
				type: 'string',
				default: '',
				description: 'Value of the legacy extra field 1 (max 50 characters)',
			},
			{
				displayName: 'Extra Field 2',
				name: 'extra_field_2',
				type: 'string',
				default: '',
				description: 'Value of the legacy extra field 2 (max 50 characters)',
			},
			{
				displayName: 'Invoice Address',
				name: 'invoice_address',
				type: 'string',
				default: '',
				description: 'Billing details - street and house number (max 500 characters)',
			},
			{
				displayName: 'Invoice City',
				name: 'invoice_city',
				type: 'string',
				default: '',
				description: 'Billing details - city (max 100 characters)',
			},
			{
				displayName: 'Invoice Company',
				name: 'invoice_company',
				type: 'string',
				default: '',
				description: 'Billing details - company name (max 500 characters)',
			},
			{
				displayName: 'Invoice Country Code',
				name: 'invoice_country_code',
				type: 'string',
				default: '',
				placeholder: 'e.g. PL, DE',
				description: 'Billing details - 2-letter country code',
			},
			{
				displayName: 'Invoice Full Name',
				name: 'invoice_fullname',
				type: 'string',
				default: '',
				description: 'Billing details - name and surname (max 500 characters)',
			},
			{
				displayName: 'Invoice NIP / Tax ID',
				name: 'invoice_nip',
				type: 'string',
				default: '',
				description: 'Billing details - VAT Reg. no. / tax number (max 100 characters)',
			},
			{
				displayName: 'Invoice Postcode',
				name: 'invoice_postcode',
				type: 'string',
				default: '',
				description: 'Billing details - postcode (max 20 characters)',
			},
			{
				displayName: 'Invoice State',
				name: 'invoice_state',
				type: 'string',
				default: '',
				description: 'Billing details - state / province (max 35 characters)',
			},
			{
				displayName: 'Pack State',
				name: 'pack_state',
				type: 'options',
				options: [
					{ name: 'Not All Packed (0)', value: 0 },
					{ name: 'All Products Packed (1)', value: 1 },
				],
				default: 0,
				description: 'Flag indicating the status of order packing',
			},
			{
				displayName: 'Payment Method',
				name: 'payment_method',
				type: 'string',
				default: '',
				description: 'Payment method name (max 30 characters)',
			},
			{
				displayName: 'Payment Method COD',
				name: 'payment_method_cod',
				type: 'boolean',
				default: false,
				description: 'Whether payment type is COD (cash on delivery)',
			},
			{
				displayName: 'Phone',
				name: 'phone',
				type: 'string',
				default: '',
				description: 'Buyer phone number (max 100 characters)',
			},
			{
				displayName: 'Pick State',
				name: 'pick_state',
				type: 'options',
				options: [
					{ name: 'Not All Collected (0)', value: 0 },
					{ name: 'All Products Collected (1)', value: 1 },
				],
				default: 0,
				description: 'Flag indicating the status of order products collection',
			},
			{
				displayName: 'Star',
				name: 'star',
				type: 'options',
				options: [
					{ name: '0 - No Star', value: 0 },
					{ name: '1 - Star 1', value: 1 },
					{ name: '2 - Star 2', value: 2 },
					{ name: '3 - Star 3', value: 3 },
					{ name: '4 - Star 4', value: 4 },
					{ name: '5 - Star 5', value: 5 },
				],
				default: 0,
				description: 'Order star rating / mark (values from 0 to 5)',
			},
			{
				displayName: 'User Comments',
				name: 'user_comments',
				type: 'string',
				default: '',
				description: 'Buyer comments (max 510 characters)',
			},
			{
				displayName: 'User Login',
				name: 'user_login',
				type: 'string',
				default: '',
				description: 'Buyer login / username (max 30 characters)',
			},
			{
				displayName: 'Want Invoice',
				name: 'want_invoice',
				type: 'boolean',
				default: false,
				description: 'Whether customer wants an invoice (true = 1, false = 0)',
			},
		],
	},

	// ----------------------------------
	//   Fields for addOrder
	// ----------------------------------
	{
		displayName: 'Mode',
		name: 'addOrderMode',
		type: 'options',
		options: [
			{
				name: 'Using Fields',
				value: 'fields',
				description: 'Configure order using individual form fields',
			},
			{
				name: 'JSON Object / Raw Payload',
				value: 'json',
				description: 'Provide all addOrder parameters as a JSON object matching BaseLinker API',
			},
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['addOrder'],
			},
		},
		description: 'Whether to use visual form fields or a raw JSON payload',
	},
	{
		displayName: 'Parameters (JSON)',
		name: 'addOrderJson',
		type: 'json',
		default: '{\n  "order_status_id": 1,\n  "currency": "PLN",\n  "products": []\n}',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['addOrder'],
				addOrderMode: ['json'],
			},
		},
		description: 'JSON object containing method parameters matching https://api.baselinker.com/index.php?method=addOrder',
	},
	{
		displayName: 'Order Status',
		name: 'order_status_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getOrderStatusList',
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['addOrder'],
				addOrderMode: ['fields'],
			},
		},
		description: 'Order status to assign to the newly created order',
	},
	{
		displayName: 'Currency',
		name: 'currency',
		type: 'string',
		default: 'PLN',
		required: true,
		placeholder: 'e.g. PLN, EUR, USD, GBP',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['addOrder'],
				addOrderMode: ['fields'],
			},
		},
		description: '3-letter currency symbol (e.g. EUR, PLN)',
	},
	{
		displayName: 'Products',
		name: 'productsUi',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		placeholder: 'Add Product Item',
		default: {},
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['addOrder'],
				addOrderMode: ['fields'],
			},
		},
		description: 'Order products list',
		options: [
			{
				name: 'items',
				displayName: 'Product Item',
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
						displayName: 'Price Brutto',
						name: 'price_brutto',
						type: 'number',
						default: 0,
						required: true,
						description: 'Single item gross price',
					},
					{
						displayName: 'Quantity',
						name: 'quantity',
						type: 'number',
						default: 1,
						required: true,
						description: 'Number of pieces',
					},
					{
						displayName: 'Tax Rate (%)',
						name: 'tax_rate',
						type: 'number',
						default: 23,
						description: 'VAT tax rate (0-100, -1 for exempt, -0.02 for NP, -0.03 for reverse charge)',
					},
					{
						displayName: 'Storage Type',
						name: 'storage',
						type: 'options',
						options: [
							{ name: 'Base Internal Inventory (db)', value: 'db' },
							{ name: 'Online Shop (shop)', value: 'shop' },
							{ name: 'Connected Wholesaler (warehouse)', value: 'warehouse' },
						],
						default: 'db',
						description: 'Type of warehouse from which the product comes',
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
						description: 'Internal warehouse ID from getInventoryWarehouses (internal_warehouse_id). 0 for default.',
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
				],
			},
		],
	},
	{
		displayName: 'Products (JSON / Expression)',
		name: 'productsJson',
		type: 'json',
		default: '',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['addOrder'],
				addOrderMode: ['fields'],
			},
		},
		description: 'Optional raw JSON array of products if not using visual product items builder. If provided, merged with Products above.',
	},
	{
		displayName: 'Custom Extra Fields',
		name: 'customExtraFieldsUi',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		placeholder: 'Add Custom Extra Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['addOrder'],
				addOrderMode: ['fields'],
			},
		},
		description: 'Configure custom extra fields by selecting them dynamically from your BaseLinker account or providing custom field IDs',
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
							loadOptionsMethod: 'getOrderExtraFieldsList',
						},
						default: '',
						description: 'Select custom extra field from your BaseLinker account, or use an expression/custom ID',
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
		displayName: 'Custom Extra Fields (JSON / Expression)',
		name: 'customExtraFieldsJson',
		type: 'json',
		default: '',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['addOrder'],
				addOrderMode: ['fields'],
			},
		},
		description: 'Provide custom extra fields as a JSON object (mapping extra field IDs to values) or expression',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['addOrder'],
				addOrderMode: ['fields'],
			},
		},
		options: [
			{
				displayName: 'Admin Comments',
				name: 'admin_comments',
				type: 'string',
				default: '',
				description: 'Seller internal comments (max 200 characters)',
			},
			{
				displayName: 'Custom Source ID',
				name: 'custom_source_id',
				type: 'number',
				default: 0,
				description: 'Identifier of custom order source defined in Base panel. If not provided, default source is assigned.',
			},
			{
				displayName: 'Date Add',
				name: 'date_add',
				type: 'string',
				default: '',
				description: 'Date of order creation (ISO string or unix timestamp). Defaults to current time if left empty.',
			},
			{
				displayName: 'Delivery Address',
				name: 'delivery_address',
				type: 'string',
				default: '',
				description: 'Delivery address - street and number (max 156 characters)',
			},
			{
				displayName: 'Delivery City',
				name: 'delivery_city',
				type: 'string',
				default: '',
				description: 'Delivery address - city (max 100 characters)',
			},
			{
				displayName: 'Delivery Company',
				name: 'delivery_company',
				type: 'string',
				default: '',
				description: 'Delivery address - company (max 156 characters)',
			},
			{
				displayName: 'Delivery Country Code',
				name: 'delivery_country_code',
				type: 'string',
				default: '',
				placeholder: 'e.g. PL, DE',
				description: 'Delivery address - 2-letter country code',
			},
			{
				displayName: 'Delivery Full Name',
				name: 'delivery_fullname',
				type: 'string',
				default: '',
				description: 'Delivery address - name and surname (max 156 characters)',
			},
			{
				displayName: 'Delivery Method',
				name: 'delivery_method',
				type: 'string',
				default: '',
				description: 'Delivery method name (max 30 characters)',
			},
			{
				displayName: 'Delivery Point Address',
				name: 'delivery_point_address',
				type: 'string',
				default: '',
				description: 'Pick-up point delivery - address (max 100 characters)',
			},
			{
				displayName: 'Delivery Point City',
				name: 'delivery_point_city',
				type: 'string',
				default: '',
				description: 'Pick-up point delivery - city (max 100 characters)',
			},
			{
				displayName: 'Delivery Point ID',
				name: 'delivery_point_id',
				type: 'string',
				default: '',
				placeholder: 'e.g. KRA01M',
				description: 'Pick-up point delivery - identifier (max 40 characters)',
			},
			{
				displayName: 'Delivery Point Name',
				name: 'delivery_point_name',
				type: 'string',
				default: '',
				description: 'Pick-up point delivery - name (max 100 characters)',
			},
			{
				displayName: 'Delivery Point Postcode',
				name: 'delivery_point_postcode',
				type: 'string',
				default: '',
				description: 'Pick-up point delivery - postcode (max 100 characters)',
			},
			{
				displayName: 'Delivery Postcode',
				name: 'delivery_postcode',
				type: 'string',
				default: '',
				description: 'Delivery address - postcode (max 100 characters)',
			},
			{
				displayName: 'Delivery Price',
				name: 'delivery_price',
				type: 'number',
				default: 0,
				description: 'Gross delivery price',
			},
			{
				displayName: 'Delivery State',
				name: 'delivery_state',
				type: 'string',
				default: '',
				description: 'Delivery address - state / province (max 35 characters)',
			},
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				default: '',
				placeholder: 'e.g. buyer@example.com',
				description: 'Buyer email address (max 150 characters)',
			},
			{
				displayName: 'Extra Field 1',
				name: 'extra_field_1',
				type: 'string',
				default: '',
				description: 'Value of additional field 1 (max 50 characters)',
			},
			{
				displayName: 'Extra Field 2',
				name: 'extra_field_2',
				type: 'string',
				default: '',
				description: 'Value of additional field 2 (max 50 characters)',
			},
			{
				displayName: 'Invoice Address',
				name: 'invoice_address',
				type: 'string',
				default: '',
				description: 'Billing details - street and house number (max 500 characters)',
			},
			{
				displayName: 'Invoice City',
				name: 'invoice_city',
				type: 'string',
				default: '',
				description: 'Billing details - city (max 100 characters)',
			},
			{
				displayName: 'Invoice Company',
				name: 'invoice_company',
				type: 'string',
				default: '',
				description: 'Billing details - company name (max 500 characters)',
			},
			{
				displayName: 'Invoice Country Code',
				name: 'invoice_country_code',
				type: 'string',
				default: '',
				placeholder: 'e.g. PL, DE',
				description: 'Billing details - 2-letter country code',
			},
			{
				displayName: 'Invoice Full Name',
				name: 'invoice_fullname',
				type: 'string',
				default: '',
				description: 'Billing details - name and surname (max 500 characters)',
			},
			{
				displayName: 'Invoice NIP / Tax ID',
				name: 'invoice_nip',
				type: 'string',
				default: '',
				description: 'Billing details - VAT Reg. no. / tax number (max 100 characters)',
			},
			{
				displayName: 'Invoice Postcode',
				name: 'invoice_postcode',
				type: 'string',
				default: '',
				description: 'Billing details - postcode (max 20 characters)',
			},
			{
				displayName: 'Invoice State',
				name: 'invoice_state',
				type: 'string',
				default: '',
				description: 'Billing details - state / province (max 35 characters)',
			},
			{
				displayName: 'Paid',
				name: 'paid',
				type: 'boolean',
				default: false,
				description: 'Whether the order is already paid. True automatically adds full payment to the order.',
			},
			{
				displayName: 'Payment Method',
				name: 'payment_method',
				type: 'string',
				default: '',
				description: 'Payment method name (max 30 characters)',
			},
			{
				displayName: 'Payment Method COD',
				name: 'payment_method_cod',
				type: 'boolean',
				default: false,
				description: 'Whether payment type is COD (cash on delivery)',
			},
			{
				displayName: 'Phone',
				name: 'phone',
				type: 'string',
				default: '',
				description: 'Buyer phone number (max 100 characters)',
			},
			{
				displayName: 'User Comments',
				name: 'user_comments',
				type: 'string',
				default: '',
				description: 'Buyer comments (max 510 characters)',
			},
			{
				displayName: 'User Login',
				name: 'user_login',
				type: 'string',
				default: '',
				description: 'Buyer login / username (max 30 characters)',
			},
			{
				displayName: 'Want Invoice',
				name: 'want_invoice',
				type: 'boolean',
				default: false,
				description: 'Whether customer wants an invoice (true = 1, false = 0)',
			},
		],
	},

	// ----------------------------------
	//   Fields for addOrderBySplit
	// ----------------------------------
	{
		displayName: 'Mode',
		name: 'addOrderBySplitMode',
		type: 'options',
		options: [
			{
				name: 'Using Fields',
				value: 'fields',
				description: 'Configure split order using individual form fields',
			},
			{
				name: 'JSON Object / Raw Payload',
				value: 'json',
				description: 'Provide all addOrderBySplit parameters as a JSON object',
			},
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['addOrderBySplit'],
			},
		},
		description: 'Whether to use visual form fields or a raw JSON payload',
	},
	{
		displayName: 'Parameters (JSON)',
		name: 'addOrderBySplitJson',
		type: 'json',
		default: '{\n  "order_id": 12345,\n  "items_to_split": [\n    {\n      "order_product_id": 101,\n      "quantity": 1\n    }\n  ]\n}',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['addOrderBySplit'],
				addOrderBySplitMode: ['json'],
			},
		},
		description: 'JSON object containing method parameters matching https://api.baselinker.com/index.php?method=addOrderBySplit',
	},
	{
		displayName: 'Original Order ID',
		name: 'order_id',
		type: 'number',
		default: '',
		required: true,
		placeholder: 'e.g. 1234567',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['addOrderBySplit'],
				addOrderBySplitMode: ['fields'],
			},
		},
		description: 'ID of the order to split',
	},
	{
		displayName: 'Items to Move to New Order',
		name: 'itemsToSplitUi',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		placeholder: 'Add Item to Split',
		default: {},
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['addOrderBySplit'],
				addOrderBySplitMode: ['fields'],
			},
		},
		description: 'Products to move from the original order to the new order',
		options: [
			{
				name: 'items',
				displayName: 'Item',
				values: [
					{
						displayName: 'Order Product ID',
						name: 'order_product_id',
						type: 'number',
						default: '',
						required: true,
						description: 'ID of the product in the original order',
					},
					{
						displayName: 'Quantity',
						name: 'quantity',
						type: 'number',
						default: 1,
						required: true,
						description: 'Quantity to move to the new order (must not exceed original quantity)',
					},
				],
			},
		],
	},
	{
		displayName: 'Items to Split (JSON / Expression)',
		name: 'itemsToSplitJson',
		type: 'json',
		default: '',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['addOrderBySplit'],
				addOrderBySplitMode: ['fields'],
			},
		},
		description: 'Optional raw JSON array of items to split (e.g. [{"order_product_id": 123, "quantity": 1}])',
	},
	{
		displayName: 'Delivery Cost to Split',
		name: 'delivery_cost_to_split',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['addOrderBySplit'],
				addOrderBySplitMode: ['fields'],
			},
		},
		description: 'Delivery cost to transfer to the new order (deducted from the original order)',
	},

	// ----------------------------------
	//   Fields for addOrderDuplicate
	// ----------------------------------
	{
		displayName: 'Mode',
		name: 'addOrderDuplicateMode',
		type: 'options',
		options: [
			{
				name: 'Using Fields',
				value: 'fields',
				description: 'Configure duplicate using individual form fields',
			},
			{
				name: 'JSON Object / Raw Payload',
				value: 'json',
				description: 'Provide all addOrderDuplicate parameters as a JSON object',
			},
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['addOrderDuplicate'],
			},
		},
		description: 'Whether to use visual form fields or a raw JSON payload',
	},
	{
		displayName: 'Parameters (JSON)',
		name: 'addOrderDuplicateJson',
		type: 'json',
		default: '{\n  "order_id": 12345\n}',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['addOrderDuplicate'],
				addOrderDuplicateMode: ['json'],
			},
		},
		description: 'JSON object containing method parameters matching https://api.baselinker.com/index.php?method=addOrderDuplicate',
	},
	{
		displayName: 'Order ID to Duplicate',
		name: 'order_id',
		type: 'number',
		default: '',
		required: true,
		placeholder: 'e.g. 12345',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['addOrderDuplicate'],
				addOrderDuplicateMode: ['fields'],
			},
		},
		description: 'ID of the order to duplicate',
	},

	// ----------------------------------
	//   Fields for deleteOrders
	// ----------------------------------
	{
		displayName: 'Mode',
		name: 'deleteOrdersMode',
		type: 'options',
		options: [
			{
				name: 'Using Fields',
				value: 'fields',
				description: 'Configure deletion using individual form fields',
			},
			{
				name: 'JSON Object / Raw Payload',
				value: 'json',
				description: 'Provide all deleteOrders parameters as a JSON object',
			},
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['deleteOrders'],
			},
		},
		description: 'Whether to use visual form fields or a raw JSON payload',
	},
	{
		displayName: 'Parameters (JSON)',
		name: 'deleteOrdersJson',
		type: 'json',
		default: '{\n  "order_ids": [12345, 67890]\n}',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['deleteOrders'],
				deleteOrdersMode: ['json'],
			},
		},
		description: 'JSON object containing method parameters matching https://api.baselinker.com/index.php?method=deleteOrders',
	},
	{
		displayName: 'Order IDs',
		name: 'order_ids',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'e.g. 12345, 67890',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['deleteOrders'],
				deleteOrdersMode: ['fields'],
			},
		},
		description: 'Comma-separated order IDs or JSON array of order IDs to delete (max 1000)',
	},

	// ----------------------------------
	//   Fields for setOrdersMerge
	// ----------------------------------
	{
		displayName: 'Mode',
		name: 'setOrdersMergeMode',
		type: 'options',
		options: [
			{
				name: 'Using Fields',
				value: 'fields',
				description: 'Configure merge using individual form fields',
			},
			{
				name: 'JSON Object / Raw Payload',
				value: 'json',
				description: 'Provide all setOrdersMerge parameters as a JSON object',
			},
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['setOrdersMerge'],
			},
		},
		description: 'Whether to use visual form fields or a raw JSON payload',
	},
	{
		displayName: 'Parameters (JSON)',
		name: 'setOrdersMergeJson',
		type: 'json',
		default: '{\n  "main_order_id": 12345,\n  "order_ids_to_merge": [67890],\n  "merge_mode": "technical_merge",\n  "sum_delivery_costs": true\n}',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['setOrdersMerge'],
				setOrdersMergeMode: ['json'],
			},
		},
		description: 'JSON object containing method parameters matching https://api.baselinker.com/index.php?method=setOrdersMerge',
	},
	{
		displayName: 'Main Order ID',
		name: 'main_order_id',
		type: 'number',
		default: '',
		required: true,
		placeholder: 'e.g. 1234567',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['setOrdersMerge'],
				setOrdersMergeMode: ['fields'],
			},
		},
		description: 'ID of the main order (its shipping and invoice data will be retained)',
	},
	{
		displayName: 'Order IDs to Merge',
		name: 'order_ids_to_merge',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'e.g. 2345678, 3456789',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['setOrdersMerge'],
				setOrdersMergeMode: ['fields'],
			},
		},
		description: 'List of other order IDs to merge into the main order (comma-separated or JSON array)',
	},
	{
		displayName: 'Merge Mode',
		name: 'merge_mode',
		type: 'options',
		options: [
			{
				name: 'Technical Merge',
				value: 'technical_merge',
				description: 'Creates a new technical order without modifying originals',
			},
			{
				name: 'Into Main Order',
				value: 'into_main_order',
				description: 'Moves items into the main order and deletes the other orders',
			},
		],
		default: 'technical_merge',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['setOrdersMerge'],
				setOrdersMergeMode: ['fields'],
			},
		},
		description: 'Method to merge selected orders',
	},
	{
		displayName: 'Sum Delivery Costs',
		name: 'sum_delivery_costs',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['setOrdersMerge'],
				setOrdersMergeMode: ['fields'],
			},
		},
		description: 'Whether to sum delivery costs from all merged orders (true) or keep only the main order delivery cost (false)',
	},

	// ----------------------------------
	//   Fields for addOrderProduct
	// ----------------------------------
	{
		displayName: 'Mode',
		name: 'addOrderProductMode',
		type: 'options',
		options: [
			{
				name: 'Using Fields',
				value: 'fields',
				description: 'Configure product item using individual form fields',
			},
			{
				name: 'JSON Object / Raw Payload',
				value: 'json',
				description: 'Provide all addOrderProduct parameters as a JSON object',
			},
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['addOrderProduct'],
			},
		},
		description: 'Whether to use visual form fields or a raw JSON payload',
	},
	{
		displayName: 'Parameters (JSON)',
		name: 'addOrderProductJson',
		type: 'json',
		default: '{\n  "order_id": 12345,\n  "name": "Product Name",\n  "price_brutto": 29.99,\n  "quantity": 1\n}',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['addOrderProduct'],
				addOrderProductMode: ['json'],
			},
		},
		description: 'JSON object containing method parameters matching https://api.baselinker.com/index.php?method=addOrderProduct',
	},
	{
		displayName: 'Order ID',
		name: 'order_id',
		type: 'number',
		default: '',
		required: true,
		placeholder: 'e.g. 3754894',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['addOrderProduct'],
				addOrderProductMode: ['fields'],
			},
		},
		description: 'Order ID from BaseLinker order manager',
	},
	{
		displayName: 'Product Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'e.g. Wireless Mouse',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['addOrderProduct'],
				addOrderProductMode: ['fields'],
			},
		},
		description: 'Product name',
	},
	{
		displayName: 'Price Brutto',
		name: 'price_brutto',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['addOrderProduct'],
				addOrderProductMode: ['fields'],
			},
		},
		description: 'Single item gross price',
	},
	{
		displayName: 'Quantity',
		name: 'quantity',
		type: 'number',
		default: 1,
		required: true,
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['addOrderProduct'],
				addOrderProductMode: ['fields'],
			},
		},
		description: 'Number of pieces',
	},
	{
		displayName: 'Additional Product Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Product Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['addOrderProduct'],
				addOrderProductMode: ['fields'],
			},
		},
		options: [
			{
				displayName: 'Attributes',
				name: 'attributes',
				type: 'string',
				default: '',
				description: 'Detailed product attributes / variant name (e.g. "Colour: blue")',
			},
			{
				displayName: 'Auction / Listing ID',
				name: 'auction_id',
				type: 'string',
				default: '',
				description: 'Listing ID number if the order originates from an auction / marketplace',
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
				description: 'Product location in warehouse (separate multiple locations with semicolon)',
			},
			{
				displayName: 'Product ID',
				name: 'product_id',
				type: 'string',
				default: '',
				description: 'Product identifier in Base or store inventory',
			},
			{
				displayName: 'SKU',
				name: 'sku',
				type: 'string',
				default: '',
				description: 'Product SKU number',
			},
			{
				displayName: 'Storage ID',
				name: 'storage_id',
				type: 'string',
				default: '0',
				description: 'Identifier of the storage (inventory/shop/warehouse) from which the product comes',
			},
			{
				displayName: 'Storage Type',
				name: 'storage',
				type: 'options',
				options: [
					{ name: 'Base Internal Inventory (db)', value: 'db' },
					{ name: 'Online Shop (shop)', value: 'shop' },
					{ name: 'Connected Wholesaler (warehouse)', value: 'warehouse' },
				],
				default: 'db',
				description: 'Type of product source storage',
			},
			{
				displayName: 'Tax Rate (%)',
				name: 'tax_rate',
				type: 'number',
				default: 23,
				description: 'VAT tax rate (0-100, -1 for exempt, -0.02 for NP, -0.03 for reverse charge)',
			},
			{
				displayName: 'Variant ID',
				name: 'variant_id',
				type: 'string',
				default: '',
				description: 'Product variant ID',
			},
			{
				displayName: 'Warehouse ID',
				name: 'warehouse_id',
				type: 'number',
				default: 0,
				description: 'Internal warehouse ID from getInventoryWarehouses (internal_warehouse_id). Applies to Base inventory products.',
			},
			{
				displayName: 'Weight',
				name: 'weight',
				type: 'number',
				default: 0,
				description: 'Single item weight in kg',
			},
		],
	},

	// ----------------------------------
	//   Fields for deleteOrderProduct
	// ----------------------------------
	{
		displayName: 'Mode',
		name: 'deleteOrderProductMode',
		type: 'options',
		options: [
			{
				name: 'Using Fields',
				value: 'fields',
				description: 'Configure product removal using individual form fields',
			},
			{
				name: 'JSON Object / Raw Payload',
				value: 'json',
				description: 'Provide all deleteOrderProduct parameters as a JSON object',
			},
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['deleteOrderProduct'],
			},
		},
		description: 'Whether to use visual form fields or a raw JSON payload',
	},
	{
		displayName: 'Parameters (JSON)',
		name: 'deleteOrderProductJson',
		type: 'json',
		default: '{\n  "order_id": 12345,\n  "order_product_id": 67890\n}',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['deleteOrderProduct'],
				deleteOrderProductMode: ['json'],
			},
		},
		description: 'JSON object containing method parameters matching https://api.baselinker.com/index.php?method=deleteOrderProduct',
	},
	{
		displayName: 'Order ID',
		name: 'order_id',
		type: 'number',
		default: '',
		required: true,
		placeholder: 'e.g. 3754894',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['deleteOrderProduct'],
				deleteOrderProductMode: ['fields'],
			},
		},
		description: 'Order ID from BaseLinker order manager',
	},
	{
		displayName: 'Order Product ID',
		name: 'order_product_id',
		type: 'number',
		default: '',
		required: true,
		placeholder: 'e.g. 59157160',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['deleteOrderProduct'],
				deleteOrderProductMode: ['fields'],
			},
		},
		description: 'Order item ID from BaseLinker order manager to delete',
	},

	// ----------------------------------
	//   Fields for setOrderProductFields
	// ----------------------------------
	{
		displayName: 'Mode',
		name: 'setOrderProductFieldsMode',
		type: 'options',
		options: [
			{
				name: 'Using Fields',
				value: 'fields',
				description: 'Configure update using individual form fields',
			},
			{
				name: 'JSON Object / Raw Payload',
				value: 'json',
				description: 'Provide all setOrderProductFields parameters as a JSON object',
			},
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['setOrderProductFields'],
			},
		},
		description: 'Whether to use visual form fields or a raw JSON payload',
	},
	{
		displayName: 'Parameters (JSON)',
		name: 'setOrderProductFieldsJson',
		type: 'json',
		default: '{\n  "order_id": 12345,\n  "order_product_id": 67890,\n  "quantity": 2\n}',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['setOrderProductFields'],
				setOrderProductFieldsMode: ['json'],
			},
		},
		description: 'JSON object containing method parameters matching https://api.baselinker.com/index.php?method=setOrderProductFields',
	},
	{
		displayName: 'Order ID',
		name: 'order_id',
		type: 'number',
		default: '',
		required: true,
		placeholder: 'e.g. 3754894',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['setOrderProductFields'],
				setOrderProductFieldsMode: ['fields'],
			},
		},
		description: 'Order identifier from BaseLinker order manager',
	},
	{
		displayName: 'Order Product ID',
		name: 'order_product_id',
		type: 'number',
		default: '',
		required: true,
		placeholder: 'e.g. 59157160',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['setOrderProductFields'],
				setOrderProductFieldsMode: ['fields'],
			},
		},
		description: 'Order item ID to edit from BaseLinker order manager',
	},
	{
		displayName: 'Update Product Fields',
		name: 'updateProductFields',
		type: 'collection',
		placeholder: 'Add Field to Edit',
		default: {},
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['setOrderProductFields'],
				setOrderProductFieldsMode: ['fields'],
			},
		},
		options: [
			{
				displayName: 'Attributes',
				name: 'attributes',
				type: 'string',
				default: '',
				description: 'Detailed product attributes, e.g. "Colour: blue"',
			},
			{
				displayName: 'Auction / Listing ID',
				name: 'auction_id',
				type: 'string',
				default: '',
				description: 'Listing ID number if the order originates from an auction / marketplace',
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
				description: 'Product location in warehouse',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Product name',
			},
			{
				displayName: 'Price Brutto',
				name: 'price_brutto',
				type: 'number',
				default: 0,
				description: 'Single item gross price',
			},
			{
				displayName: 'Product ID',
				name: 'product_id',
				type: 'string',
				default: '',
				description: 'Product identifier in Base or store warehouse',
			},
			{
				displayName: 'Quantity',
				name: 'quantity',
				type: 'number',
				default: 1,
				description: 'Number of pieces',
			},
			{
				displayName: 'SKU',
				name: 'sku',
				type: 'string',
				default: '',
				description: 'Product SKU number',
			},
			{
				displayName: 'Storage ID',
				name: 'storage_id',
				type: 'string',
				default: '0',
				description: 'Storage identifier',
			},
			{
				displayName: 'Storage Type',
				name: 'storage',
				type: 'options',
				options: [
					{ name: 'Base Internal Inventory (db)', value: 'db' },
					{ name: 'Online Shop (shop)', value: 'shop' },
					{ name: 'Connected Wholesaler (warehouse)', value: 'warehouse' },
				],
				default: 'db',
				description: 'Type of product source storage',
			},
			{
				displayName: 'Tax Rate (%)',
				name: 'tax_rate',
				type: 'number',
				default: 23,
				description: 'VAT tax rate (0-100, -1 for exempt, -0.02 for NP, -0.03 for reverse charge)',
			},
			{
				displayName: 'Variant ID',
				name: 'variant_id',
				type: 'string',
				default: '',
				description: 'Product variant ID',
			},
			{
				displayName: 'Warehouse ID',
				name: 'warehouse_id',
				type: 'number',
				default: 0,
				description: 'Internal warehouse ID from getInventoryWarehouses (internal_warehouse_id)',
			},
			{
				displayName: 'Weight',
				name: 'weight',
				type: 'number',
				default: 0,
				description: 'Single piece weight',
			},
		],
	},

	// ----------------------------------
	//   Fields for setOrderPayment
	// ----------------------------------
	{
		displayName: 'Mode',
		name: 'setOrderPaymentMode',
		type: 'options',
		options: [
			{
				name: 'Using Fields',
				value: 'fields',
				description: 'Configure payment using individual form fields',
			},
			{
				name: 'JSON Object / Raw Payload',
				value: 'json',
				description: 'Provide all setOrderPayment parameters as a JSON object',
			},
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['setOrderPayment'],
			},
		},
		description: 'Whether to use visual form fields or a raw JSON payload',
	},
	{
		displayName: 'Parameters (JSON)',
		name: 'setOrderPaymentJson',
		type: 'json',
		default: '{\n  "order_id": 12345,\n  "payment_done": 99.99,\n  "payment_comment": "Bank transfer"\n}',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['setOrderPayment'],
				setOrderPaymentMode: ['json'],
			},
		},
		description: 'JSON object containing method parameters matching https://api.baselinker.com/index.php?method=setOrderPayment',
	},
	{
		displayName: 'Order ID',
		name: 'order_id',
		type: 'number',
		default: '',
		required: true,
		placeholder: 'e.g. 3754894',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['setOrderPayment'],
				setOrderPaymentMode: ['fields'],
			},
		},
		description: 'Order ID number in BaseLinker',
	},
	{
		displayName: 'Payment Done',
		name: 'payment_done',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['setOrderPayment'],
				setOrderPaymentMode: ['fields'],
			},
		},
		description: 'The amount of the payment. This value updates the current payment in the order (not added to the previous value). If the amount matches the order total, the order is marked as paid.',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Payment Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['setOrderPayment'],
				setOrderPaymentMode: ['fields'],
			},
		},
		options: [
			{
				displayName: 'External Payment ID',
				name: 'external_payment_id',
				type: 'string',
				default: '',
				description: 'External payment transaction identifier (max 30 characters)',
			},
			{
				displayName: 'Payment Comment',
				name: 'payment_comment',
				type: 'string',
				default: '',
				description: 'Payments commentary (max 30 characters)',
			},
			{
				displayName: 'Payment Date',
				name: 'payment_date',
				type: 'string',
				default: '',
				description: 'Payment date (ISO string or unix timestamp in seconds). Defaults to current time if left empty.',
			},
		],
	},

	// ----------------------------------
	//   Fields for getOrdersByEmail
	// ----------------------------------
	{
		displayName: 'Email',
		name: 'orderByEmail',
		type: 'string',
		default: '',
		placeholder: 'client@example.com',
		required: true,
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['getOrdersByEmail'],
			},
		},
		description: 'The e-mail address to search for in orders',
	},

	// ----------------------------------
	//   Fields for getOrdersByPhone
	// ----------------------------------
	{
		displayName: 'Phone Number',
		name: 'orderByPhone',
		type: 'string',
		default: '',
		placeholder: '+48123456789',
		required: true,
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['getOrdersByPhone'],
			},
		},
		description: 'The phone number to search for in orders',
	},

	// ----------------------------------
	//   Fields for getOrderTransactionData
	// ----------------------------------
	{
		displayName: 'Order ID',
		name: 'transactionDataOrderId',
		type: 'number',
		default: '',
		placeholder: 'e.g. 143477867',
		required: true,
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['getOrderTransactionData'],
			},
		},
		description: 'Order identifier from BaseLinker order manager',
	},
	{
		displayName: 'Include Complex Taxes',
		name: 'includeComplexTaxes',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['getOrderTransactionData'],
			},
		},
		description: 'Whether to include detailed tax breakdown with order_lines structure',
	},
	{
		displayName: 'Include Amazon Data',
		name: 'includeAmazonData',
		type: 'boolean',
		default: true,
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['getOrderTransactionData'],
			},
		},
		description: 'Whether to include legacy Amazon fulfillment data for backward compatibility',
	},

	// ----------------------------------
	//   Fields for runOrderMacroTrigger
	// ----------------------------------
	{
		displayName: 'Order ID',
		name: 'macroTriggerOrderId',
		type: 'number',
		default: '',
		placeholder: 'e.g. 143476260',
		required: true,
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['runOrderMacroTrigger'],
			},
		},
		description: 'Order identifier from BaseLinker order manager',
	},
	{
		displayName: 'Trigger ID',
		name: 'macroTriggerId',
		type: 'number',
		default: '',
		placeholder: 'e.g. 12413',
		required: true,
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['runOrderMacroTrigger'],
			},
		},
		description: 'Identifier of personal trigger from orders automatic actions in BaseLinker',
	},

	// ----------------------------------
	//   Fields for addOrderPickList
	// ----------------------------------
	{
		displayName: 'Order IDs',
		name: 'pickListOrderIds',
		type: 'string',
		default: '',
		placeholder: '12345, 12346, 12347',
		required: true,
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['addOrderPickList'],
			},
		},
		description: 'Order identifiers to include in the paper pick list (comma-separated or JSON array, 1-100 orders)',
	},

	// ----------------------------------
	//   Fields for getOrderPickLists
	// ----------------------------------
	{
		displayName: 'Filter Mode',
		name: 'pickListsFilterMode',
		type: 'options',
		options: [
			{
				name: 'All Pick Lists',
				value: 'all',
				description: 'Retrieve pick lists starting from the beginning or with pagination',
			},
			{
				name: 'Single Pick List by ID',
				value: 'single',
				description: 'Retrieve a specific pick list by its ID',
			},
			{
				name: 'From ID (id_from)',
				value: 'id_from',
				description: 'Retrieve pick lists starting from a specific pick_list_id',
			},
		],
		default: 'all',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['getOrderPickLists'],
			},
		},
		description: 'Filter method for paper pick lists',
	},
	{
		displayName: 'Pick List ID',
		name: 'pickListsPickListId',
		type: 'number',
		default: '',
		placeholder: 'e.g. 817',
		required: true,
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['getOrderPickLists'],
				pickListsFilterMode: ['single'],
			},
		},
		description: 'Exact paper pick list identifier',
	},
	{
		displayName: 'ID From',
		name: 'pickListsIdFrom',
		type: 'number',
		default: '',
		placeholder: 'e.g. 817',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['getOrderPickLists'],
				pickListsFilterMode: ['id_from'],
			},
		},
		description: 'Pick list ID number from which subsequent pick lists are to be retrieved',
	},
	{
		displayName: 'Return All',
		name: 'pickListsReturnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['getOrderPickLists'],
				pickListsFilterMode: ['all', 'id_from'],
			},
		},
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'pickListsLimit',
		type: 'number',
		typeOptions: { minValue: 1 },
		default: 100,
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['getOrderPickLists'],
				pickListsFilterMode: ['all', 'id_from'],
				pickListsReturnAll: [true],
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Delay Between Requests (ms)',
		name: 'pickListsDelayMs',
		type: 'number',
		typeOptions: { minValue: 0 },
		default: 650,
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['getOrderPickLists'],
				pickListsFilterMode: ['all', 'id_from'],
				pickListsReturnAll: [true],
			},
		},
		description: 'Delay in milliseconds between pagination requests',
	},

	// ----------------------------------
	//   Fields for getOrderPickPackHistory
	// ----------------------------------
	{
		displayName: 'Order ID',
		name: 'pickPackHistoryOrderId',
		type: 'number',
		default: '',
		placeholder: 'e.g. 3754894',
		required: true,
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['getOrderPickPackHistory'],
			},
		},
		description: 'Order identifier from BaseLinker order manager',
	},
	{
		displayName: 'Action Type',
		name: 'pickPackHistoryActionType',
		type: 'options',
		options: [
			{ name: 'All Actions', value: 0 },
			{ name: '1 - Reservation for collecting', value: 1 },
			{ name: '2 - Picking started', value: 2 },
			{ name: '3 - Picking cancelled', value: 3 },
			{ name: '4 - Picking status: in progress', value: 4 },
			{ name: '5 - Picking status: finished', value: 5 },
			{ name: '6 - Picking status: error', value: 6 },
			{ name: '7 - Reservation for packing', value: 7 },
			{ name: '8 - Packing started', value: 8 },
			{ name: '9 - Packing cancelled', value: 9 },
			{ name: '10 - Packing status: in progress', value: 10 },
			{ name: '11 - Packing status: finished', value: 11 },
			{ name: '12 - Packing status: error', value: 12 },
			{ name: '13 - Photo initialized', value: 13 },
			{ name: '14 - Photo taken', value: 14 },
			{ name: '15 - Photo deleted', value: 15 },
			{ name: '16 - Photo save error', value: 16 },
			{ name: '17 - Image size too large', value: 17 },
			{ name: '18 - Package photo received via Base Connect', value: 18 },
			{ name: '19 - Cart cleared', value: 19 },
		],
		default: 0,
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['getOrderPickPackHistory'],
			},
		},
		description: 'Filter history by specific PickPack action type',
	},

	// ----------------------------------
	//   Fields for addPickPackCart
	// ----------------------------------
	{
		displayName: 'Cart Name',
		name: 'cartName',
		type: 'string',
		default: '',
		placeholder: 'e.g. A, B, C1',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['addPickPackCart'],
			},
		},
		description: 'Cart name (maximum 5 characters). Required for creation, optional for updates.',
	},
	{
		displayName: 'Cart Color',
		name: 'cartColor',
		type: 'string',
		default: '',
		placeholder: 'e.g. #CD5C5C',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['addPickPackCart'],
			},
		},
		description: 'Cart color in hex format (e.g. #FF0000). If omitted when creating, a random color is generated.',
	},
	{
		displayName: 'Cart ID (for Updates)',
		name: 'cartUpdateId',
		type: 'number',
		default: '',
		placeholder: 'e.g. 42',
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['addPickPackCart'],
			},
		},
		description: 'Cart identifier to update. Leave empty to create a new cart.',
	},

	// ----------------------------------
	//   Fields for deletePickPackCart
	// ----------------------------------
	{
		displayName: 'Cart ID',
		name: 'deleteCartId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getPickPackCarts',
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['deletePickPackCart'],
			},
		},
		description: 'Cart identifier to delete. Choose from the list, or specify an ID using an <expression>.',
	},

	// ----------------------------------
	//   Fields for getPickPackCartOrders
	// ----------------------------------
	{
		displayName: 'Cart ID',
		name: 'cartOrdersCartId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getPickPackCarts',
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['getPickPackCartOrders'],
			},
		},
		description: 'Cart identifier to retrieve assigned orders from. Choose from the list, or specify an ID using an <expression>.',
	},

	// ----------------------------------
	//   Fields for getPickPackOrderCart
	// ----------------------------------
	{
		displayName: 'Order ID',
		name: 'orderCartOrderId',
		type: 'number',
		default: '',
		placeholder: 'e.g. 12345',
		required: true,
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['getPickPackOrderCart'],
			},
		},
		description: 'Order identifier to check cart assignment for',
	},

	// ----------------------------------
	//   Fields for addPickPackOrdersToCart
	// ----------------------------------
	{
		displayName: 'Cart ID',
		name: 'assignOrdersCartId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getPickPackCarts',
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['addPickPackOrdersToCart'],
			},
		},
		description: 'Cart identifier where the orders should be assigned. Choose from the list, or specify an ID using an <expression>.',
	},
	{
		displayName: 'Order IDs',
		name: 'assignOrdersOrderIds',
		type: 'string',
		default: '',
		placeholder: '12345, 12346, 12347',
		required: true,
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['addPickPackOrdersToCart'],
			},
		},
		description: 'Array or comma-separated list of order IDs to assign (maximum 20 orders per call)',
	},

	// ----------------------------------
	//   Fields for deletePickPackCartOrders
	// ----------------------------------
	{
		displayName: 'Cart ID',
		name: 'clearCartId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getPickPackCarts',
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['deletePickPackCartOrders'],
			},
		},
		description: 'Cart identifier to clear of all orders. Choose from the list, or specify an ID using an <expression>.',
	},

	// ----------------------------------
	//   Fields for deletePickPackOrderFromCart
	// ----------------------------------
	{
		displayName: 'Order ID',
		name: 'removeOrderCartOrderId',
		type: 'number',
		default: '',
		placeholder: 'e.g. 12345',
		required: true,
		displayOptions: {
			show: {
				resource: ['orders'],
				operation: ['deletePickPackOrderFromCart'],
			},
		},
		description: 'Order identifier to remove from its assigned PickPack cart',
	},
];

