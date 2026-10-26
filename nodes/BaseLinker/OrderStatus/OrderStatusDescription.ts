import { INodeProperties } from 'n8n-workflow';

export const orderStatusOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['orderStatus'],
			},
		},
		options: [
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
		],
		default: 'getOrderStatusList',
	},
];

export const orderStatusFields: INodeProperties[] = [
	// ----------------------------------
	//   Fields for getOrderStatusList
	// ----------------------------------
	{
		displayName: 'Filter by Group ID',
		name: 'filterGroupId',
		type: 'number',
		default: '',
		placeholder: 'e.g. 1',
		displayOptions: {
			show: {
				resource: ['orderStatus', 'orders'],
				operation: ['getOrderStatusList'],
			},
		},
		description: 'Optionally filter the returned statuses by status group ID. Leave blank to return all statuses.',
	},

	// ----------------------------------
	//   Fields for setOrderStatus
	// ----------------------------------
	{
		displayName: 'Mode',
		name: 'setOrderStatusMode',
		type: 'options',
		options: [
			{
				name: 'Using Fields',
				value: 'fields',
				description: 'Configure status change using individual form fields',
			},
			{
				name: 'JSON Object / Raw Payload',
				value: 'json',
				description: 'Provide all setOrderStatus parameters as a JSON object',
			},
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['orderStatus', 'orders'],
				operation: ['setOrderStatus'],
			},
		},
		description: 'Whether to use visual form fields or a raw JSON payload',
	},
	{
		displayName: 'Parameters (JSON)',
		name: 'setOrderStatusJson',
		type: 'json',
		default: '{\n  "order_id": 12345,\n  "status_id": 2\n}',
		displayOptions: {
			show: {
				resource: ['orderStatus', 'orders'],
				operation: ['setOrderStatus'],
				setOrderStatusMode: ['json'],
			},
		},
		description: 'JSON object containing method parameters matching https://api.baselinker.com/index.php?method=setOrderStatus',
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
				resource: ['orderStatus', 'orders'],
				operation: ['setOrderStatus'],
				setOrderStatusMode: ['fields'],
			},
		},
		description: 'Order ID number in BaseLinker',
	},
	{
		displayName: 'New Status',
		name: 'status_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getOrderStatusList',
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['orderStatus', 'orders'],
				operation: ['setOrderStatus'],
				setOrderStatusMode: ['fields'],
			},
		},
		description: 'Status to assign to the order',
	},

	// ----------------------------------
	//   Fields for setOrderStatuses
	// ----------------------------------
	{
		displayName: 'Mode',
		name: 'setOrderStatusesMode',
		type: 'options',
		options: [
			{
				name: 'Using Fields',
				value: 'fields',
				description: 'Configure batch status change using individual form fields',
			},
			{
				name: 'JSON Object / Raw Payload',
				value: 'json',
				description: 'Provide all setOrderStatuses parameters as a JSON object',
			},
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['orderStatus', 'orders'],
				operation: ['setOrderStatuses'],
			},
		},
		description: 'Whether to use visual form fields or a raw JSON payload',
	},
	{
		displayName: 'Parameters (JSON)',
		name: 'setOrderStatusesJson',
		type: 'json',
		default: '{\n  "order_ids": [12345, 67890],\n  "status_id": 2\n}',
		displayOptions: {
			show: {
				resource: ['orderStatus', 'orders'],
				operation: ['setOrderStatuses'],
				setOrderStatusesMode: ['json'],
			},
		},
		description: 'JSON object containing method parameters matching https://api.baselinker.com/index.php?method=setOrderStatuses',
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
				resource: ['orderStatus', 'orders'],
				operation: ['setOrderStatuses'],
				setOrderStatusesMode: ['fields'],
			},
		},
		description: 'Comma-separated order IDs or JSON array of order IDs to update',
	},
	{
		displayName: 'New Status',
		name: 'status_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getOrderStatusList',
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['orderStatus', 'orders'],
				operation: ['setOrderStatuses'],
				setOrderStatusesMode: ['fields'],
			},
		},
		description: 'Status to assign to all specified orders',
	},

	// ----------------------------------
	//   Fields for addOrderStatus
	// ----------------------------------
	{
		displayName: 'Mode',
		name: 'addOrderStatusMode',
		type: 'options',
		options: [
			{
				name: 'Using Fields',
				value: 'fields',
				description: 'Configure status using individual form fields',
			},
			{
				name: 'JSON Object / Raw Payload',
				value: 'json',
				description: 'Provide all addOrderStatus parameters as a JSON object',
			},
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['orderStatus', 'orders'],
				operation: ['addOrderStatus'],
			},
		},
		description: 'Whether to use visual form fields or a raw JSON payload',
	},
	{
		displayName: 'Parameters (JSON)',
		name: 'addOrderStatusJson',
		type: 'json',
		default: '{\n  "name": "Ready to ship",\n  "color": "#008000"\n}',
		displayOptions: {
			show: {
				resource: ['orderStatus', 'orders'],
				operation: ['addOrderStatus'],
				addOrderStatusMode: ['json'],
			},
		},
		description: 'JSON object containing method parameters matching https://api.baselinker.com/index.php?method=addOrderStatus',
	},
	{
		displayName: 'Status Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'e.g. Ready to ship',
		displayOptions: {
			show: {
				resource: ['orderStatus', 'orders'],
				operation: ['addOrderStatus'],
				addOrderStatusMode: ['fields'],
			},
		},
		description: 'Basic status name displayed to seller in panel (max 30 characters)',
	},
	{
		displayName: 'Existing Status ID (for Update)',
		name: 'status_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getOrderStatusList',
		},
		default: '',
		displayOptions: {
			show: {
				resource: ['orderStatus', 'orders'],
				operation: ['addOrderStatus'],
				addOrderStatusMode: ['fields'],
			},
		},
		description: 'Optional. Select an existing status to update, or leave blank to create a new status.',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Status Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['orderStatus', 'orders'],
				operation: ['addOrderStatus'],
				addOrderStatusMode: ['fields'],
			},
		},
		options: [
			{
				displayName: 'Color (Hex)',
				name: 'color',
				type: 'string',
				default: '#008000',
				placeholder: 'e.g. #008000',
				description: 'Status color in hex format (e.g. "#FF0000")',
			},
			{
				displayName: 'Comments',
				name: 'comments',
				type: 'string',
				default: '',
				description: 'Internal comment visible only on the status settings page (max 255 characters)',
			},
			{
				displayName: 'Name for Customer',
				name: 'name_for_customer',
				type: 'string',
				default: '',
				description: 'Full status name displayed to the customer on order page (max 250 characters)',
			},
			{
				displayName: 'Short Name',
				name: 'short_name',
				type: 'string',
				default: '',
				description: 'Shortened status name displayed in compact tables (max 17 characters)',
			},
			{
				displayName: 'Status Group',
				name: 'group_id',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getOrderStatusGroups',
				},
				default: '',
				description: 'Status group to assign this status to (default group if omitted)',
			},
			{
				displayName: 'Status Type (Analytics)',
				name: 'type',
				type: 'options',
				options: [
					{ name: '0 - Other', value: 0 },
					{ name: '1 - Unpaid', value: 1 },
					{ name: '2 - In Progress', value: 2 },
					{ name: '3 - Sent', value: 3 },
					{ name: '4 - Delivered', value: 4 },
					{ name: '5 - Cancelled', value: 5 },
					{ name: '6 - Return', value: 6 },
				],
				default: 0,
				description: 'Status type for analytics and reporting',
			},
		],
	},

	// ----------------------------------
	//   Fields for addOrderStatusGroup
	// ----------------------------------
	{
		displayName: 'Mode',
		name: 'addOrderStatusGroupMode',
		type: 'options',
		options: [
			{
				name: 'Using Fields',
				value: 'fields',
				description: 'Configure status group using individual form fields',
			},
			{
				name: 'JSON Object / Raw Payload',
				value: 'json',
				description: 'Provide all addOrderStatusGroup parameters as a JSON object',
			},
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['orderStatus', 'orders'],
				operation: ['addOrderStatusGroup'],
			},
		},
		description: 'Whether to use visual form fields or a raw JSON payload',
	},
	{
		displayName: 'Parameters (JSON)',
		name: 'addOrderStatusGroupJson',
		type: 'json',
		default: '{\n  "name": "My Group"\n}',
		displayOptions: {
			show: {
				resource: ['orderStatus', 'orders'],
				operation: ['addOrderStatusGroup'],
				addOrderStatusGroupMode: ['json'],
			},
		},
		description: 'JSON object containing method parameters matching https://api.baselinker.com/index.php?method=addOrderStatusGroup',
	},
	{
		displayName: 'Group Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'e.g. My Group',
		displayOptions: {
			show: {
				resource: ['orderStatus', 'orders'],
				operation: ['addOrderStatusGroup'],
				addOrderStatusGroupMode: ['fields'],
			},
		},
		description: 'Status group name (max 15 characters)',
	},
	{
		displayName: 'Existing Group ID (for Update)',
		name: 'group_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getOrderStatusGroups',
		},
		default: '',
		displayOptions: {
			show: {
				resource: ['orderStatus', 'orders'],
				operation: ['addOrderStatusGroup'],
				addOrderStatusGroupMode: ['fields'],
			},
		},
		description: 'Optional. Select an existing status group to update, or leave blank to create a new group.',
	},

	// ----------------------------------
	//   Fields for deleteOrderStatus
	// ----------------------------------
	{
		displayName: 'Mode',
		name: 'deleteOrderStatusMode',
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
				description: 'Provide all deleteOrderStatus parameters as a JSON object',
			},
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['orderStatus', 'orders'],
				operation: ['deleteOrderStatus'],
			},
		},
		description: 'Whether to use visual form fields or a raw JSON payload',
	},
	{
		displayName: 'Parameters (JSON)',
		name: 'deleteOrderStatusJson',
		type: 'json',
		default: '{\n  "status_id": 12345,\n  "target_status_id": 12340\n}',
		displayOptions: {
			show: {
				resource: ['orderStatus', 'orders'],
				operation: ['deleteOrderStatus'],
				deleteOrderStatusMode: ['json'],
			},
		},
		description: 'JSON object containing method parameters matching https://api.baselinker.com/index.php?method=deleteOrderStatus',
	},
	{
		displayName: 'Status to Delete',
		name: 'status_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getOrderStatusList',
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['orderStatus', 'orders'],
				operation: ['deleteOrderStatus'],
				deleteOrderStatusMode: ['fields'],
			},
		},
		description: 'ID of the status to delete (the default primary status cannot be deleted)',
	},
	{
		displayName: 'Target Status to Migrate Orders',
		name: 'target_status_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getOrderStatusList',
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['orderStatus', 'orders'],
				operation: ['deleteOrderStatus'],
				deleteOrderStatusMode: ['fields'],
			},
		},
		description: 'ID of the status to which existing orders will be migrated (must be different from deleted status)',
	},

	// ----------------------------------
	//   Fields for deleteOrderStatusGroup
	// ----------------------------------
	{
		displayName: 'Mode',
		name: 'deleteOrderStatusGroupMode',
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
				description: 'Provide all deleteOrderStatusGroup parameters as a JSON object',
			},
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['orderStatus', 'orders'],
				operation: ['deleteOrderStatusGroup'],
			},
		},
		description: 'Whether to use visual form fields or a raw JSON payload',
	},
	{
		displayName: 'Parameters (JSON)',
		name: 'deleteOrderStatusGroupJson',
		type: 'json',
		default: '{\n  "group_id": 5\n}',
		displayOptions: {
			show: {
				resource: ['orderStatus', 'orders'],
				operation: ['deleteOrderStatusGroup'],
				deleteOrderStatusGroupMode: ['json'],
			},
		},
		description: 'JSON object containing method parameters matching https://api.baselinker.com/index.php?method=deleteOrderStatusGroup',
	},
	{
		displayName: 'Status Group to Delete',
		name: 'group_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getOrderStatusGroups',
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['orderStatus', 'orders'],
				operation: ['deleteOrderStatusGroup'],
				deleteOrderStatusGroupMode: ['fields'],
			},
		},
		description: 'Status group to delete. All statuses in this group are moved to the main default group.',
	},
];
