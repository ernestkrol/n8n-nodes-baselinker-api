import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class BaseLinkerApi implements ICredentialType {
	name = 'baseLinkerApi';
	displayName = 'BaseLinker API';
	documentationUrl = 'https://api.baselinker.com/';

	properties: INodeProperties[] = [
		{
			displayName: 'API Token',
			name: 'token',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'BaseLinker API Token. You can generate or copy your token in BaseLinker panel: Account & other -> My account -> API.',
		},
		{
			displayName: 'API URL',
			name: 'apiUrl',
			type: 'string',
			default: 'https://api.baselinker.com/connector.php',
			description: 'BaseLinker API endpoint URL. Default is https://api.baselinker.com/connector.php.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-BLToken': '={{$credentials.token}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.apiUrl}}',
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'X-BLToken': '={{$credentials.token}}',
			},
			body: {
				method: 'getOrderStatusList',
				parameters: '{}',
			},
		},
	};
}
