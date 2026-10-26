import { describe, it } from 'node:test';
import assert from 'node:assert';
import { normalizeTimestamp } from '../nodes/BaseLinker/GenericFunctions';

describe('normalizeTimestamp', () => {
	it('should return undefined for empty / undefined values', () => {
		assert.strictEqual(normalizeTimestamp(undefined), undefined);
		assert.strictEqual(normalizeTimestamp(''), undefined);
		assert.strictEqual(normalizeTimestamp(null), undefined);
	});

	it('should keep 10-digit unix timestamp in seconds', () => {
		assert.strictEqual(normalizeTimestamp(1607841161), 1607841161);
		assert.strictEqual(normalizeTimestamp('1607841161'), 1607841161);
	});

	it('should convert 13-digit millisecond timestamp to seconds', () => {
		assert.strictEqual(normalizeTimestamp(1607841161000), 1607841161);
		assert.strictEqual(normalizeTimestamp('1607841161000'), 1607841161);
	});

	it('should convert ISO date string to unix timestamp', () => {
		const iso = '2020-12-13T06:32:41.000Z';
		const expected = Math.floor(new Date(iso).getTime() / 1000);
		assert.strictEqual(normalizeTimestamp(iso), expected);
	});

	it('should convert simple date string (YYYY-MM-DD) to timestamp', () => {
		const dateStr = '2024-01-01';
		const expected = Math.floor(new Date(dateStr).getTime() / 1000);
		assert.strictEqual(normalizeTimestamp(dateStr), expected);
	});
});
