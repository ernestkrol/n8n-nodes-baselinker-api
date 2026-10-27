import { describe, it } from 'node:test';
import assert from 'node:assert';
import { BaseLinker } from '../nodes/BaseLinker/BaseLinker.node';

describe('BaseLinker AI Tool & Return Sample Data', () => {
	it('should declare usableAsTool: true in node description', () => {
		const node = new BaseLinker();
		assert.strictEqual(
			node.description.usableAsTool,
			true,
			'usableAsTool must be true to support n8n AI Agents',
		);
	});

	it('should declare returnSampleData property with boolean type and false default', () => {
		const node = new BaseLinker();
		const prop = node.description.properties.find((p) => p.name === 'returnSampleData');

		assert.ok(prop, 'returnSampleData property must be declared');
		assert.strictEqual(prop.type, 'boolean');
		assert.strictEqual(prop.default, false);
		assert.ok(
			prop.description?.includes('static mock data') || prop.description?.includes('BaseLinker API'),
			'description should explain sample/mock purpose',
		);
	});

	it('should short-circuit execute() and return sample orders without calling API when returnSampleData is true', async () => {
		const node = new BaseLinker();
		let apiCalled = false;

		const mockContext = {
			getInputData: () => [{ json: {} }],
			getNodeParameter: (name: string, _index: number, fallback?: any) => {
				if (name === 'resource') return 'orders';
				if (name === 'operation') return 'getOrders';
				if (name === 'returnSampleData') return true;
				return fallback;
			},
			getNode: () => ({ name: 'baseLinkerMock' }),
			helpers: {
				httpRequest: async () => {
					apiCalled = true;
					throw new Error('API should not be called when returnSampleData is true');
				},
			},
		};

		const result = await node.execute.call(mockContext as any);

		assert.strictEqual(apiCalled, false, 'External API must not be called in sample mode');
		assert.strictEqual(result.length, 1);
		assert.ok(result[0].length >= 1);

		const firstItem = result[0][0].json as Record<string, any>;
		assert.strictEqual(firstItem.order_id, 8765432);
		assert.strictEqual(firstItem.delivery_fullname, 'Jan Kowalski');
		assert.strictEqual(firstItem.email, 'jan.kowalski@example.com');
		assert.strictEqual(result[0][0].pairedItem?.item, 0);
	});

	it('should short-circuit execute() for productCatalog when returnSampleData is true', async () => {
		const node = new BaseLinker();
		let apiCalled = false;

		const mockContext = {
			getInputData: () => [{ json: {} }],
			getNodeParameter: (name: string, _index: number, fallback?: any) => {
				if (name === 'resource') return 'productCatalog';
				if (name === 'operation') return 'getInventoryProductsList';
				if (name === 'returnSampleData') return true;
				return fallback;
			},
			getNode: () => ({ name: 'baseLinkerMock' }),
			helpers: {
				httpRequest: async () => {
					apiCalled = true;
					throw new Error('API should not be called');
				},
			},
		};

		const result = await node.execute.call(mockContext as any);

		assert.strictEqual(apiCalled, false);
		assert.strictEqual(result.length, 1);
		const firstItem = result[0][0].json as Record<string, any>;
		assert.strictEqual(firstItem.id, 100);
		assert.strictEqual(firstItem.sku, 'PROD-SW-2026');
	});
});
