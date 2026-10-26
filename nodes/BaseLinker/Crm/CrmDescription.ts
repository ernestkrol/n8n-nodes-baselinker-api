import { INodeProperties } from 'n8n-workflow';

export const crmOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['crm'],
			},
		},
		options: [
			{
				name: 'Add / Update Client Status',
				value: 'addCrmClientStatus',
				description: 'Create a new CRM client status or update an existing one (method: addCrmClientStatus)',
				action: 'Add or update client status',
			},
			{
				name: 'Add / Update Client Status Group',
				value: 'addCrmClientStatusGroup',
				description: 'Create a new CRM client status group or update an existing one (method: addCrmClientStatusGroup)',
				action: 'Add or update client status group',
			},
			{
				name: 'Add / Update CRM Client',
				value: 'addCrmClient',
				description: 'Create a new CRM client or update an existing one (method: addCrmClient)',
				action: 'Add or update CRM client',
			},
			{
				name: 'Delete Client Status',
				value: 'deleteCrmClientStatus',
				description: 'Delete a CRM client status and migrate existing clients to a target status (method: deleteCrmClientStatus)',
				action: 'Delete client status',
			},
			{
				name: 'Delete Client Status Group',
				value: 'deleteCrmClientStatusGroup',
				description: 'Delete a CRM client status group and move its statuses to the default group (method: deleteCrmClientStatusGroup)',
				action: 'Delete client status group',
			},
			{
				name: 'Delete CRM Client',
				value: 'deleteCrmClient',
				description: 'Delete a CRM client (method: deleteCrmClient)',
				action: 'Delete CRM client',
			},
			{
				name: 'Get Client Status Groups',
				value: 'getCrmClientStatusGroups',
				description: 'Retrieve list of CRM client status groups (method: getCrmClientStatusGroups)',
				action: 'Get client status groups',
			},
			{
				name: 'Get Client Statuses',
				value: 'getCrmClientStatuses',
				description: 'Retrieve CRM client statuses created in order manager (method: getCrmClientStatuses)',
				action: 'Get client statuses',
			},
			{
				name: 'Get CRM Client Data',
				value: 'getCrmClientData',
				description: 'Retrieve detailed data of a specific CRM client, including notes and custom fields (method: getCrmClientData)',
				action: 'Get CRM client data',
			},
			{
				name: 'Get CRM Client Extra Fields',
				value: 'getCrmClientExtraFields',
				description: 'Retrieve custom extra fields defined for CRM clients (method: getCrmClientExtraFields)',
				action: 'Get CRM client extra fields',
			},
			{
				name: 'Get CRM Clients',
				value: 'getCrmClients',
				description: 'Retrieve a list of CRM clients with optional filtering and pagination (method: getCrmClients)',
				action: 'Get CRM clients',
			},
		],
		default: 'getCrmClients',
	},
];

export const crmFields: INodeProperties[] = [
	// ----------------------------------
	//   Fields for getCrmClients
	// ----------------------------------
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
				name: 'Raw JSON Payload',
				value: 'json',
				description: 'Provide parameters directly as a raw JSON string or expression',
			},
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['crm'],
				operation: ['getCrmClients'],
			},
		},
		description: 'Choose whether to configure parameters via structured UI inputs or raw JSON',
	},
	{
		displayName: 'Raw Parameters (JSON)',
		name: 'parametersJson',
		type: 'string',
		typeOptions: {
			rows: 5,
		},
		default: '{\n  "page": 1\n}',
		placeholder: '{\n  "page": 1,\n  "filter_email": "example@domain.com"\n}',
		required: true,
		displayOptions: {
			show: {
				resource: ['crm'],
				operation: ['getCrmClients'],
				parameterMode: ['json'],
			},
		},
		description: 'Raw parameters object sent to getCrmClients method',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['crm'],
				operation: ['getCrmClients'],
				parameterMode: ['fields'],
			},
		},
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: {
				resource: ['crm'],
				operation: ['getCrmClients'],
				parameterMode: ['fields'],
				returnAll: [false],
			},
		},
		description: 'Results page number (100 results per page, numbered from 1)',
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
				resource: ['crm'],
				operation: ['getCrmClients'],
				parameterMode: ['fields'],
				returnAll: [true],
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Delay Between Requests (ms)',
		name: 'delayMs',
		type: 'number',
		typeOptions: {
			minValue: 0,
		},
		default: 650,
		displayOptions: {
			show: {
				resource: ['crm'],
				operation: ['getCrmClients'],
				parameterMode: ['fields'],
				returnAll: [true],
			},
		},
		description: 'Delay in milliseconds between pagination requests to stay within BaseLinker 100 req/min limit',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['crm'],
				operation: ['getCrmClients'],
				parameterMode: ['fields'],
			},
		},
		options: [
			{
				displayName: 'Client ID',
				name: 'filter_crm_client_id',
				type: 'number',
				default: '',
				description: 'Filter by exact CRM client ID',
			},
			{
				displayName: 'Email',
				name: 'filter_email',
				type: 'string',
				default: '',
				description: 'Filter by email address (partial match)',
			},
			{
				displayName: 'Phone',
				name: 'filter_phone',
				type: 'string',
				default: '',
				description: 'Filter by phone number (partial match)',
			},
			{
				displayName: 'Login',
				name: 'filter_login',
				type: 'string',
				default: '',
				description: 'Filter by client login (partial match)',
			},
			{
				displayName: 'Invoice Company',
				name: 'filter_invoice_company',
				type: 'string',
				default: '',
				description: 'Filter by invoice company name (partial match)',
			},
			{
				displayName: 'Invoice Tax ID',
				name: 'filter_invoice_tax_id',
				type: 'string',
				default: '',
				description: 'Filter by invoice tax ID / NIP (partial match)',
			},
			{
				displayName: 'Invoice Full Name',
				name: 'filter_invoice_fullname',
				type: 'string',
				default: '',
				description: 'Filter by invoice full name (partial match)',
			},
			{
				displayName: 'Status',
				name: 'filter_status_id',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getCrmClientStatuses',
				},
				default: '',
				description: 'Filter by exact client status. Choose from the list, or specify an ID using an <expression>.',
			},
		],
	},

	// ----------------------------------
	//   Fields for getCrmClientData
	// ----------------------------------
	{
		displayName: 'CRM Client ID',
		name: 'crm_client_id',
		type: 'number',
		default: '',
		placeholder: 'e.g. 42',
		required: true,
		displayOptions: {
			show: {
				resource: ['crm'],
				operation: ['getCrmClientData'],
			},
		},
		description: 'ID of the CRM client to retrieve detailed data for',
	},
	{
		displayName: 'Include Custom Extra Fields',
		name: 'include_custom_extra_fields',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['crm'],
				operation: ['getCrmClientData'],
			},
		},
		description: 'Whether to download values of custom additional fields defined for CRM clients',
	},

	// ----------------------------------
	//   Fields for getCrmClientStatuses
	// ----------------------------------
	{
		displayName: 'Filter by Status Group',
		name: 'filterGroupId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getCrmClientStatusGroups',
		},
		default: '',
		displayOptions: {
			show: {
				resource: ['crm'],
				operation: ['getCrmClientStatuses'],
			},
		},
		description: 'Optionally return only statuses belonging to a specific CRM status group. Choose from the list, or specify an ID using an <expression>.',
	},

	// ----------------------------------
	//   Fields for addCrmClient
	// ----------------------------------
	{
		displayName: 'Input Mode',
		name: 'addCrmClientMode',
		type: 'options',
		options: [
			{
				name: 'Form Fields (UI)',
				value: 'fields',
				description: 'Configure client fields using visual UI inputs',
			},
			{
				name: 'JSON Object / Raw Payload',
				value: 'json',
				description: 'Provide all parameters as a JSON object matching BaseLinker API',
			},
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['crm'],
				operation: ['addCrmClient'],
			},
		},
		description: 'Whether to use visual form fields or a raw JSON payload',
	},
	{
		displayName: 'Parameters (JSON)',
		name: 'addCrmClientJson',
		type: 'json',
		default: '{\n  "status_id": 1,\n  "email": "client@example.com",\n  "phone": "+48123456789"\n}',
		displayOptions: {
			show: {
				resource: ['crm'],
				operation: ['addCrmClient'],
				addCrmClientMode: ['json'],
			},
		},
		description: 'JSON object containing method parameters matching https://api.baselinker.com/index.php?method=addCrmClient',
	},
	{
		displayName: 'Client ID (For Update)',
		name: 'crm_client_id',
		type: 'number',
		default: '',
		placeholder: 'e.g. 42 (leave empty to create new)',
		displayOptions: {
			show: {
				resource: ['crm'],
				operation: ['addCrmClient'],
				addCrmClientMode: ['fields'],
			},
		},
		description: 'Client identifier. If provided and greater than 0, updates the existing client with supplied fields. If omitted or 0, a new client is created.',
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		default: '',
		placeholder: 'client@example.com',
		displayOptions: {
			show: {
				resource: ['crm'],
				operation: ['addCrmClient'],
				addCrmClientMode: ['fields'],
			},
		},
		description: 'Client email address',
	},
	{
		displayName: 'Phone',
		name: 'phone',
		type: 'string',
		default: '',
		placeholder: '+48123456789',
		displayOptions: {
			show: {
				resource: ['crm'],
				operation: ['addCrmClient'],
				addCrmClientMode: ['fields'],
			},
		},
		description: 'Client phone number',
	},
	{
		displayName: 'Status',
		name: 'status_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getCrmClientStatuses',
		},
		default: '',
		displayOptions: {
			show: {
				resource: ['crm'],
				operation: ['addCrmClient'],
				addCrmClientMode: ['fields'],
			},
		},
		description: 'Client status. Choose from the list, or specify an ID using an <expression>.',
	},
	{
		displayName: 'Star Rating',
		name: 'star',
		type: 'number',
		typeOptions: {
			minValue: 0,
			maxValue: 5,
		},
		default: 0,
		displayOptions: {
			show: {
				resource: ['crm'],
				operation: ['addCrmClient'],
				addCrmClientMode: ['fields'],
			},
		},
		description: 'Client star rating from 0 to 5',
	},
	{
		displayName: 'Custom Extra Fields (UI)',
		name: 'customExtraFieldsUi',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		placeholder: 'Add Extra Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['crm'],
				operation: ['addCrmClient'],
				addCrmClientMode: ['fields'],
			},
		},
		description: 'Custom extra fields for the CRM client',
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
							loadOptionsMethod: 'getCrmClientExtraFields',
						},
						default: '',
						description: 'Select custom extra field from BaseLinker. Choose from the list, or specify an ID using an <expression>.',
					},
					{
						displayName: 'Value',
						name: 'value',
						type: 'string',
						default: '',
						description: 'Value to assign to this custom field',
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
				resource: ['crm'],
				operation: ['addCrmClient'],
				addCrmClientMode: ['fields'],
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
				resource: ['crm'],
				operation: ['addCrmClient'],
				addCrmClientMode: ['fields'],
			},
		},
		options: [
			{
				displayName: 'Delivery Address',
				name: 'delivery_address',
				type: 'string',
				default: '',
				description: 'Delivery street and number',
			},
			{
				displayName: 'Delivery City',
				name: 'delivery_city',
				type: 'string',
				default: '',
				description: 'Delivery city',
			},
			{
				displayName: 'Delivery Company',
				name: 'delivery_company',
				type: 'string',
				default: '',
				description: 'Delivery company name',
			},
			{
				displayName: 'Delivery Country Code',
				name: 'delivery_country_code',
				type: 'string',
				default: '',
				placeholder: 'e.g. PL',
				description: 'Delivery 2-letter country code',
			},
			{
				displayName: 'Delivery Full Name',
				name: 'delivery_fullname',
				type: 'string',
				default: '',
				description: 'Delivery recipient full name',
			},
			{
				displayName: 'Delivery Postcode',
				name: 'delivery_postcode',
				type: 'string',
				default: '',
				description: 'Delivery postal code',
			},
			{
				displayName: 'Delivery State',
				name: 'delivery_state',
				type: 'string',
				default: '',
				description: 'Delivery state or province',
			},
			{
				displayName: 'Invoice Address',
				name: 'invoice_address',
				type: 'string',
				default: '',
				description: 'Invoice street and number',
			},
			{
				displayName: 'Invoice City',
				name: 'invoice_city',
				type: 'string',
				default: '',
				description: 'Invoice city',
			},
			{
				displayName: 'Invoice Company',
				name: 'invoice_company',
				type: 'string',
				default: '',
				description: 'Invoice company name',
			},
			{
				displayName: 'Invoice Country Code',
				name: 'invoice_country_code',
				type: 'string',
				default: '',
				placeholder: 'e.g. PL',
				description: 'Invoice 2-letter country code',
			},
			{
				displayName: 'Invoice Full Name',
				name: 'invoice_fullname',
				type: 'string',
				default: '',
				description: 'Invoice customer full name',
			},
			{
				displayName: 'Invoice Postcode',
				name: 'invoice_postcode',
				type: 'string',
				default: '',
				description: 'Invoice postal code',
			},
			{
				displayName: 'Invoice State',
				name: 'invoice_state',
				type: 'string',
				default: '',
				description: 'Invoice state or province',
			},
			{
				displayName: 'Invoice Tax ID',
				name: 'invoice_tax_id',
				type: 'string',
				default: '',
				description: 'Invoice Tax ID / NIP / VAT number',
			},
			{
				displayName: 'Login',
				name: 'login',
				type: 'string',
				default: '',
				description: 'Client login or username',
			},
			{
				displayName: 'Notes',
				name: 'notes',
				type: 'string',
				typeOptions: {
					rows: 3,
				},
				default: '',
				description: 'Internal seller notes regarding this client',
			},
		],
	},

	// ----------------------------------
	//   Fields for deleteCrmClient
	// ----------------------------------
	{
		displayName: 'CRM Client ID',
		name: 'delete_crm_client_id',
		type: 'number',
		default: '',
		placeholder: 'e.g. 42',
		required: true,
		displayOptions: {
			show: {
				resource: ['crm'],
				operation: ['deleteCrmClient'],
			},
		},
		description: 'ID of the CRM client to permanently delete from BaseLinker',
	},

	// ----------------------------------
	//   Fields for addCrmClientStatus
	// ----------------------------------
	{
		displayName: 'Input Mode',
		name: 'addCrmClientStatusMode',
		type: 'options',
		options: [
			{
				name: 'Form Fields (UI)',
				value: 'fields',
				description: 'Configure status fields using visual UI inputs',
			},
			{
				name: 'JSON Object / Raw Payload',
				value: 'json',
				description: 'Provide parameters directly as a JSON object',
			},
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['crm'],
				operation: ['addCrmClientStatus'],
			},
		},
		description: 'Whether to use visual form fields or raw JSON',
	},
	{
		displayName: 'Parameters (JSON)',
		name: 'addCrmClientStatusJson',
		type: 'json',
		default: '{\n  "name": "VIP Client",\n  "color": "#FF0000"\n}',
		displayOptions: {
			show: {
				resource: ['crm'],
				operation: ['addCrmClientStatus'],
				addCrmClientStatusMode: ['json'],
			},
		},
		description: 'JSON object containing method parameters matching https://api.baselinker.com/index.php?method=addCrmClientStatus',
	},
	{
		displayName: 'Status Name',
		name: 'status_name',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'e.g. VIP Client',
		displayOptions: {
			show: {
				resource: ['crm'],
				operation: ['addCrmClientStatus'],
				addCrmClientStatusMode: ['fields'],
			},
		},
		description: 'Name of the status displayed in BaseLinker',
	},
	{
		displayName: 'Status Color',
		name: 'status_color',
		type: 'color',
		default: '#336699',
		displayOptions: {
			show: {
				resource: ['crm'],
				operation: ['addCrmClientStatus'],
				addCrmClientStatusMode: ['fields'],
			},
		},
		description: 'Status label color (hex format, e.g. #FF0000)',
	},
	{
		displayName: 'Status Group',
		name: 'status_group_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getCrmClientStatusGroups',
		},
		default: '',
		displayOptions: {
			show: {
				resource: ['crm'],
				operation: ['addCrmClientStatus'],
				addCrmClientStatusMode: ['fields'],
			},
		},
		description: 'Status group this status belongs to. Choose from the list, or specify an ID using an <expression>.',
	},
	{
		displayName: 'Status ID (For Update)',
		name: 'update_status_id',
		type: 'number',
		default: '',
		placeholder: 'e.g. 12 (leave empty to create new)',
		displayOptions: {
			show: {
				resource: ['crm'],
				operation: ['addCrmClientStatus'],
				addCrmClientStatusMode: ['fields'],
			},
		},
		description: 'Provide status ID to update an existing status. Leave empty to create a new status.',
	},

	// ----------------------------------
	//   Fields for addCrmClientStatusGroup
	// ----------------------------------
	{
		displayName: 'Input Mode',
		name: 'addCrmClientStatusGroupMode',
		type: 'options',
		options: [
			{
				name: 'Form Fields (UI)',
				value: 'fields',
				description: 'Configure group fields using visual UI inputs',
			},
			{
				name: 'JSON Object / Raw Payload',
				value: 'json',
				description: 'Provide parameters directly as a JSON object',
			},
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['crm'],
				operation: ['addCrmClientStatusGroup'],
			},
		},
		description: 'Whether to use visual form fields or raw JSON',
	},
	{
		displayName: 'Parameters (JSON)',
		name: 'addCrmClientStatusGroupJson',
		type: 'json',
		default: '{\n  "name": "B2B Clients"\n}',
		displayOptions: {
			show: {
				resource: ['crm'],
				operation: ['addCrmClientStatusGroup'],
				addCrmClientStatusGroupMode: ['json'],
			},
		},
		description: 'JSON object containing method parameters matching https://api.baselinker.com/index.php?method=addCrmClientStatusGroup',
	},
	{
		displayName: 'Group Name',
		name: 'group_name',
		type: 'string',
		default: '',
		required: true,
		placeholder: 'e.g. B2B Clients',
		displayOptions: {
			show: {
				resource: ['crm'],
				operation: ['addCrmClientStatusGroup'],
				addCrmClientStatusGroupMode: ['fields'],
			},
		},
		description: 'Name of the status group',
	},
	{
		displayName: 'Group ID (For Update)',
		name: 'update_group_id',
		type: 'number',
		default: '',
		placeholder: 'e.g. 3 (leave empty to create new)',
		displayOptions: {
			show: {
				resource: ['crm'],
				operation: ['addCrmClientStatusGroup'],
				addCrmClientStatusGroupMode: ['fields'],
			},
		},
		description: 'Provide group ID to update an existing status group. Leave empty to create a new group.',
	},

	// ----------------------------------
	//   Fields for deleteCrmClientStatus
	// ----------------------------------
	{
		displayName: 'Input Mode',
		name: 'deleteCrmClientStatusMode',
		type: 'options',
		options: [
			{
				name: 'Form Fields (UI)',
				value: 'fields',
				description: 'Configure using visual UI inputs',
			},
			{
				name: 'JSON Object / Raw Payload',
				value: 'json',
				description: 'Provide parameters directly as a JSON object',
			},
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['crm'],
				operation: ['deleteCrmClientStatus'],
			},
		},
		description: 'Whether to use visual form fields or raw JSON',
	},
	{
		displayName: 'Parameters (JSON)',
		name: 'deleteCrmClientStatusJson',
		type: 'json',
		default: '{\n  "status_id": 10,\n  "target_status_id": 1\n}',
		displayOptions: {
			show: {
				resource: ['crm'],
				operation: ['deleteCrmClientStatus'],
				deleteCrmClientStatusMode: ['json'],
			},
		},
		description: 'JSON object containing parameters matching https://api.baselinker.com/index.php?method=deleteCrmClientStatus',
	},
	{
		displayName: 'Status to Delete',
		name: 'delete_status_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getCrmClientStatuses',
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['crm'],
				operation: ['deleteCrmClientStatus'],
				deleteCrmClientStatusMode: ['fields'],
			},
		},
		description: 'Status to be deleted. Choose from the list, or specify an ID using an <expression>.',
	},
	{
		displayName: 'Target Status for Clients',
		name: 'target_status_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getCrmClientStatuses',
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['crm'],
				operation: ['deleteCrmClientStatus'],
				deleteCrmClientStatusMode: ['fields'],
			},
		},
		description: 'Target status where clients currently assigned to the deleted status will be migrated. Choose from the list, or specify an ID using an <expression>.',
	},

	// ----------------------------------
	//   Fields for deleteCrmClientStatusGroup
	// ----------------------------------
	{
		displayName: 'Input Mode',
		name: 'deleteCrmClientStatusGroupMode',
		type: 'options',
		options: [
			{
				name: 'Form Fields (UI)',
				value: 'fields',
				description: 'Configure using visual UI inputs',
			},
			{
				name: 'JSON Object / Raw Payload',
				value: 'json',
				description: 'Provide parameters directly as a JSON object',
			},
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['crm'],
				operation: ['deleteCrmClientStatusGroup'],
			},
		},
		description: 'Whether to use visual form fields or raw JSON',
	},
	{
		displayName: 'Parameters (JSON)',
		name: 'deleteCrmClientStatusGroupJson',
		type: 'json',
		default: '{\n  "group_id": 5\n}',
		displayOptions: {
			show: {
				resource: ['crm'],
				operation: ['deleteCrmClientStatusGroup'],
				deleteCrmClientStatusGroupMode: ['json'],
			},
		},
		description: 'JSON object containing parameters matching https://api.baselinker.com/index.php?method=deleteCrmClientStatusGroup',
	},
	{
		displayName: 'Status Group to Delete',
		name: 'delete_group_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getCrmClientStatusGroups',
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['crm'],
				operation: ['deleteCrmClientStatusGroup'],
				deleteCrmClientStatusGroupMode: ['fields'],
			},
		},
		description: 'Status group to delete. Member statuses will be automatically moved to the default group. Choose from the list, or specify an ID using an <expression>.',
	},
];
