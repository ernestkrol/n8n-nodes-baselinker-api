import { describe, it } from 'node:test';
import assert from 'node:assert';
import { BaseLinkerApi } from '../credentials/BaseLinkerApi.credentials';
import { baselinkerApiRequest } from '../nodes/BaseLinker/GenericFunctions';

describe('BaseLinkerApi credentials & configurable API endpoint', () => {
	it('should declare BaseLinkerApi with required token and apiUrl properties', () => {
		const credentials = new BaseLinkerApi();

		assert.strictEqual(credentials.name, 'baseLinkerApi');
		assert.strictEqual(credentials.displayName, 'BaseLinker API');

		const tokenProp = credentials.properties.find((p) => p.name === 'token');
		assert.ok(tokenProp, 'token property must exist');
		assert.strictEqual(tokenProp.required, true);

		const apiUrlProp = credentials.properties.find((p) => p.name === 'apiUrl');
		assert.ok(apiUrlProp, 'apiUrl property must exist');
		assert.strictEqual(apiUrlProp.type, 'string');
		assert.strictEqual(apiUrlProp.default, 'https://api.baselinker.com/connector.php');
		assert.strictEqual(apiUrlProp.placeholder, 'https://api.baselinker.com/connector.php');
		assert.strictEqual(apiUrlProp.required, true);
	});

	it('should configure credential test request with fallback baseURL', () => {
		const credentials = new BaseLinkerApi();
		assert.ok(credentials.test);
		assert.strictEqual(
			credentials.test.request.baseURL,
			'={{$credentials.apiUrl || "https://api.baselinker.com/connector.php"}}',
		);
		assert.strictEqual(credentials.test.request.method, 'POST');
	});

	it('should dispatch request to custom apiUrl when specified in credentials', async () => {
		let capturedUrl = '';
		const mockContext = {
			getNode: () => ({ name: 'baseLinkerMock' }),
			getCredentials: async () => ({
				token: 'test-token',
				apiUrl: 'https://proxy.example.com/connector.php',
			}),
			helpers: {
				httpRequest: async (options: any) => {
					capturedUrl = options.url;
					return { status: 'SUCCESS' };
				},
			},
		};

		const response = await baselinkerApiRequest.call(mockContext as any, 'getOrderStatusList', {});
		assert.strictEqual(response.status, 'SUCCESS');
		assert.strictEqual(capturedUrl, 'https://proxy.example.com/connector.php');
	});

	it('should trim whitespace from custom apiUrl', async () => {
		let capturedUrl = '';
		const mockContext = {
			getNode: () => ({ name: 'baseLinkerMock' }),
			getCredentials: async () => ({
				token: 'test-token',
				apiUrl: '   https://proxy.example.com/connector.php   ',
			}),
			helpers: {
				httpRequest: async (options: any) => {
					capturedUrl = options.url;
					return { status: 'SUCCESS' };
				},
			},
		};

		await baselinkerApiRequest.call(mockContext as any, 'getOrderStatusList', {});
		assert.strictEqual(capturedUrl, 'https://proxy.example.com/connector.php');
	});

	it('should fall back to official endpoint when apiUrl is not provided in credentials', async () => {
		let capturedUrl = '';
		const mockContext = {
			getNode: () => ({ name: 'baseLinkerMock' }),
			getCredentials: async () => ({
				token: 'test-token',
			}),
			helpers: {
				httpRequest: async (options: any) => {
					capturedUrl = options.url;
					return { status: 'SUCCESS' };
				},
			},
		};

		await baselinkerApiRequest.call(mockContext as any, 'getOrderStatusList', {});
		assert.strictEqual(capturedUrl, 'https://api.baselinker.com/connector.php');
	});
});
