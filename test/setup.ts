// Test environment setup for BaseLinker n8n community node
// Ensures backward compatibility for n8n-workflow schema validators across Zod versions
import { _ZodString } from 'zod';

const ZodStringClass = _ZodString as any;

if (ZodStringClass?.prototype && !ZodStringClass.prototype.ip) {
	ZodStringClass.prototype.ip = function (this: any, options?: { version?: 'v4' | 'v6' }) {
		if (typeof this.ipv4 === 'function' && typeof this.ipv6 === 'function') {
			return options?.version === 'v6' ? this.ipv6() : this.ipv4();
		}
		return this;
	};
}



