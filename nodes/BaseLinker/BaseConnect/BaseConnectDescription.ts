import { INodeProperties } from 'n8n-workflow';

export const baseConnectOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['baseConnect'],
			},
		},
		options: [
			{
				name: 'Add Contractor Credit Settlement',
				value: 'addConnectContractorCreditSettlement',
				description: 'Add a manual credit settlement (repayment) for a chosen contractor (method: addConnectContractorCreditSettlement)',
				action: 'Add contractor credit settlement',
			},
			{
				name: 'Get Contractor Credit History',
				value: 'getConnectContractorCreditHistory',
				description: 'Retrieve trade credit history for a chosen contractor (method: getConnectContractorCreditHistory)',
				action: 'Get contractor credit history',
			},
			{
				name: 'Get Integration Contractors',
				value: 'getConnectIntegrationContractors',
				description: 'Retrieve a list of contractors connected to the selected Base Connect integration (method: getConnectIntegrationContractors)',
				action: 'Get integration contractors',
			},
			{
				name: 'Get Integrations',
				value: 'getConnectIntegrations',
				description: 'Retrieve a list of all Base Connect integrations on this account (method: getConnectIntegrations)',
				action: 'Get Base Connect integrations',
			},
			{
				name: 'Set Contractor Credit Limit',
				value: 'setConnectContractorCreditLimit',
				description: 'Set new trade credit limit for chosen contractor (method: setConnectContractorCreditLimit)',
				action: 'Set contractor credit limit',
			},
		],
		default: 'getConnectIntegrations',
	},
];

export const baseConnectFields: INodeProperties[] = [
	// ----------------------------------
	//   Parameter Input Mode (fields vs json)
	// ----------------------------------
	{
		displayName: 'Parameters Input Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{
				name: 'Form Fields',
				value: 'fields',
				description: 'Configure parameters using standard form fields',
			},
			{
				name: 'Raw Parameters (JSON)',
				value: 'json',
				description: 'Provide raw parameters as JSON object or expression',
			},
		],
		default: 'fields',
		description: 'Choose how to configure parameters for this operation',
		displayOptions: {
			show: {
				resource: ['baseConnect'],
				operation: [
					'getConnectIntegrations',
					'getConnectIntegrationContractors',
					'getConnectContractorCreditHistory',
					'addConnectContractorCreditSettlement',
					'setConnectContractorCreditLimit',
				],
			},
		},
	},

	// ----------------------------------
	//   JSON Mode: getConnectIntegrations
	// ----------------------------------
	{
		displayName: 'Parameters (JSON)',
		name: 'parametersJson',
		type: 'json',
		default: '{}',
		description: 'Raw JSON parameters for getConnectIntegrations. BaseLinker method expects empty object {}.',
		displayOptions: {
			show: {
				resource: ['baseConnect'],
				operation: ['getConnectIntegrations'],
				parameterMode: ['json'],
			},
		},
	},

	// ----------------------------------
	//   Fields Mode: getConnectIntegrations
	// ----------------------------------
	{
		displayName: 'Output Format',
		name: 'integrationsOutputFormat',
		type: 'options',
		options: [
			{
				name: 'Unpack Integrations (One Item per Integration)',
				value: 'unpacked',
				description: 'Returns each own and connected integration as a separate item with integration_type tagged',
			},
			{
				name: 'Raw Integrations Object',
				value: 'raw',
				description: 'Returns the raw object with own_integrations and connected_integrations lists',
			},
		],
		default: 'unpacked',
		description: 'How to output the retrieved Base Connect integrations',
		displayOptions: {
			show: {
				resource: ['baseConnect'],
				operation: ['getConnectIntegrations'],
				parameterMode: ['fields'],
			},
		},
	},

	// ----------------------------------
	//   JSON Mode: getConnectIntegrationContractors
	// ----------------------------------
	{
		displayName: 'Parameters (JSON)',
		name: 'parametersJson',
		type: 'json',
		default: '{\n  "connect_integration_id": 1\n}',
		description: 'Raw JSON parameters for getConnectIntegrationContractors method',
		displayOptions: {
			show: {
				resource: ['baseConnect'],
				operation: ['getConnectIntegrationContractors'],
				parameterMode: ['json'],
			},
		},
	},

	// ----------------------------------
	//   Fields Mode: getConnectIntegrationContractors
	// ----------------------------------
	{
		displayName: 'Connect Integration Name or ID',
		name: 'connect_integration_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getConnectIntegrations',
		},
		default: '',
		required: true,
		description: 'Select a Base Connect integration or enter an ID using an expression. Method: getConnectIntegrationContractors.',
		displayOptions: {
			show: {
				resource: ['baseConnect'],
				operation: ['getConnectIntegrationContractors'],
				parameterMode: ['fields'],
			},
		},
	},

	// ----------------------------------
	//   JSON Mode: getConnectContractorCreditHistory
	// ----------------------------------
	{
		displayName: 'Parameters (JSON)',
		name: 'parametersJson',
		type: 'json',
		default: '{\n  "connect_contractor_id": 2\n}',
		description: 'Raw JSON parameters for getConnectContractorCreditHistory method',
		displayOptions: {
			show: {
				resource: ['baseConnect'],
				operation: ['getConnectContractorCreditHistory'],
				parameterMode: ['json'],
			},
		},
	},

	// ----------------------------------
	//   Fields Mode: getConnectContractorCreditHistory
	// ----------------------------------
	{
		displayName: 'Connect Contractor ID',
		name: 'connect_contractor_id',
		type: 'number',
		default: 0,
		required: true,
		description: 'Contractor ID. The list of contractor identifiers can be retrieved using the getConnectIntegrationContractors method.',
		displayOptions: {
			show: {
				resource: ['baseConnect'],
				operation: ['getConnectContractorCreditHistory'],
				parameterMode: ['fields'],
			},
		},
	},

	// ----------------------------------
	//   JSON Mode: addConnectContractorCreditSettlement
	// ----------------------------------
	{
		displayName: 'Parameters (JSON)',
		name: 'parametersJson',
		type: 'json',
		default: '{\n  "connect_contractor_id": 2,\n  "amount": 500,\n  "message": "Bank transfer received - REF: BT2024/001",\n  "order_id": 12345\n}',
		description: 'Raw JSON parameters for addConnectContractorCreditSettlement method',
		displayOptions: {
			show: {
				resource: ['baseConnect'],
				operation: ['addConnectContractorCreditSettlement'],
				parameterMode: ['json'],
			},
		},
	},

	// ----------------------------------
	//   Fields Mode: addConnectContractorCreditSettlement
	// ----------------------------------
	{
		displayName: 'Connect Contractor ID',
		name: 'connect_contractor_id',
		type: 'number',
		default: 0,
		required: true,
		description: 'Contractor ID. The list of contractor identifiers can be retrieved using the getConnectIntegrationContractors method.',
		displayOptions: {
			show: {
				resource: ['baseConnect'],
				operation: ['addConnectContractorCreditSettlement'],
				parameterMode: ['fields'],
			},
		},
	},
	{
		displayName: 'Amount',
		name: 'amount',
		type: 'number',
		typeOptions: {
			numberPrecision: 2,
		},
		default: 0,
		required: true,
		description: 'Settlement amount. Must be a positive value and cannot exceed the contractor\'s currently blocked credit amount (credit_to_pay).',
		displayOptions: {
			show: {
				resource: ['baseConnect'],
				operation: ['addConnectContractorCreditSettlement'],
				parameterMode: ['fields'],
			},
		},
	},
	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		default: '',
		description: 'Settlement note/comment describing the repayment, e.g., payment reference, bank transfer ID. Maximum 255 characters.',
		displayOptions: {
			show: {
				resource: ['baseConnect'],
				operation: ['addConnectContractorCreditSettlement'],
				parameterMode: ['fields'],
			},
		},
	},
	{
		displayName: 'Order ID',
		name: 'order_id',
		type: 'number',
		default: 0,
		description: 'Related order ID if the settlement is connected to a specific order. Use 0 or omit if not related to any specific order.',
		displayOptions: {
			show: {
				resource: ['baseConnect'],
				operation: ['addConnectContractorCreditSettlement'],
				parameterMode: ['fields'],
			},
		},
	},

	// ----------------------------------
	//   JSON Mode: setConnectContractorCreditLimit
	// ----------------------------------
	{
		displayName: 'Parameters (JSON)',
		name: 'parametersJson',
		type: 'json',
		default: '{\n  "connect_contractor_id": 2,\n  "new_limit": 10000,\n  "message": "Sample history message"\n}',
		description: 'Raw JSON parameters for setConnectContractorCreditLimit method',
		displayOptions: {
			show: {
				resource: ['baseConnect'],
				operation: ['setConnectContractorCreditLimit'],
				parameterMode: ['json'],
			},
		},
	},

	// ----------------------------------
	//   Fields Mode: setConnectContractorCreditLimit
	// ----------------------------------
	{
		displayName: 'Connect Contractor ID',
		name: 'connect_contractor_id',
		type: 'number',
		default: 0,
		required: true,
		description: 'Contractor ID. The list of contractor identifiers can be retrieved using the getConnectIntegrationContractors method.',
		displayOptions: {
			show: {
				resource: ['baseConnect'],
				operation: ['setConnectContractorCreditLimit'],
				parameterMode: ['fields'],
			},
		},
	},
	{
		displayName: 'New Limit',
		name: 'new_limit',
		type: 'number',
		typeOptions: {
			numberPrecision: 2,
		},
		default: 0,
		required: true,
		description: 'New trade credit limit value',
		displayOptions: {
			show: {
				resource: ['baseConnect'],
				operation: ['setConnectContractorCreditLimit'],
				parameterMode: ['fields'],
			},
		},
	},
	{
		displayName: 'Message',
		name: 'message',
		type: 'string',
		default: '',
		description: 'Message shown in trade credit history',
		displayOptions: {
			show: {
				resource: ['baseConnect'],
				operation: ['setConnectContractorCreditLimit'],
				parameterMode: ['fields'],
			},
		},
	},
];
