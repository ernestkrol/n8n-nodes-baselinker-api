import { _ZodString } from 'zod';

// Polyfill z.string().ip() for n8n-workflow compatibility under Zod 4
if (_ZodString && !(_ZodString.prototype as any).ip) {
	(_ZodString.prototype as any).ip = function (this: any, options?: { version?: 'v4' | 'v6' }) {
		if (options?.version === 'v6') {
			return this.ipv6();
		}
		return this.ipv4();
	};
}
