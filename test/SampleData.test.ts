import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
	getSampleData,
	SAMPLE_BASELINKER_ORDER,
	SAMPLE_BASELINKER_PRODUCT,
	SAMPLE_BASELINKER_PACKAGE,
	SAMPLE_BASELINKER_INVOICE,
	SAMPLE_BASELINKER_CRM_CLIENT,
	SAMPLE_BASELINKER_ORDER_RETURN,
} from '../nodes/BaseLinker/Samples/SampleData';

describe('SampleData Fixtures & Dispatcher', () => {
	it('should return realistic sample order for orders.getOrders', () => {
		const sample = getSampleData('orders', 'getOrders');
		assert.ok(Array.isArray(sample), 'Should return an array');
		assert.strictEqual(sample.length, 1);

		const order = sample[0] as typeof SAMPLE_BASELINKER_ORDER;
		assert.strictEqual(order.order_id, 8765432);
		assert.strictEqual(order.delivery_fullname, 'Jan Kowalski');
		assert.strictEqual(order.email, 'jan.kowalski@example.com');
		assert.strictEqual(order.currency, 'PLN');
		assert.ok(Array.isArray(order.products));
		assert.strictEqual(order.products.length, 1);
		assert.strictEqual(order.products[0].sku, 'MOUSE-ERG-BLK');
		assert.strictEqual(order.custom_extra_fields?.['101'], 'Express Shipping');
	});

	it('should return sample data for order payments, packages, and mutations', () => {
		const payments = getSampleData('orders', 'getOrderPaymentsHistory');
		assert.ok(Array.isArray(payments));

		const sources = getSampleData('orders', 'getOrderSources') as Record<string, any>;
		assert.ok(sources.allegro);
		assert.ok(sources.shop);

		const addOrderRes = getSampleData('orders', 'addOrder') as Record<string, any>;
		assert.strictEqual(addOrderRes.status, 'SUCCESS');
		assert.ok(addOrderRes.order_id);
	});

	it('should return sample data for orderStatus resource', () => {
		const statuses = getSampleData('orderStatus', 'getOrderStatusList');
		assert.ok(Array.isArray(statuses));
		assert.strictEqual(statuses.length, 2);
		assert.strictEqual(statuses[0].id, 8010);

		const groups = getSampleData('orderStatus', 'getOrderStatusGroups');
		assert.ok(Array.isArray(groups));
		assert.strictEqual(groups[0].group_id, 1);
	});

	it('should return sample data for courierShipments resource', () => {
		const packages = getSampleData('courierShipments', 'getOrderPackages');
		assert.ok(Array.isArray(packages));
		assert.strictEqual(packages[0].package_id, 554433);
		assert.strictEqual(packages[0].courier_code, 'inpost');

		const couriers = getSampleData('courierShipments', 'getCouriersList');
		assert.ok(Array.isArray(couriers));
		assert.ok(couriers.some((c: any) => c.code === 'inpost'));

		const label = getSampleData('courierShipments', 'getLabel') as Record<string, any>;
		assert.strictEqual(label.extension, 'pdf');
		assert.ok(label.document);
	});

	it('should return sample data for invoices resource', () => {
		const invoices = getSampleData('invoices', 'getInvoices');
		assert.ok(Array.isArray(invoices));
		assert.strictEqual(invoices[0].invoice_id, 4501);
		assert.strictEqual(invoices[0].number, 'FV/2026/01/105');

		const series = getSampleData('invoices', 'getSeries');
		assert.ok(Array.isArray(series));
	});

	it('should return sample data for productCatalog resource', () => {
		const products = getSampleData('productCatalog', 'getInventoryProductsList');
		assert.ok(Array.isArray(products));
		assert.strictEqual(products[0].id, 100);
		assert.strictEqual(products[0].sku, 'PROD-SW-2026');

		const productData = getSampleData('productCatalog', 'getInventoryProductsData');
		assert.ok(Array.isArray(productData));
		assert.strictEqual(productData[0].name, 'Smartwatch Pro 2026');

		const stocks = getSampleData('productCatalog', 'getInventoryProductsStock');
		assert.ok(Array.isArray(stocks));

		const prices = getSampleData('productCatalog', 'getInventoryProductsPrices');
		assert.ok(Array.isArray(prices));
	});

	it('should return sample data for crm resource', () => {
		const clients = getSampleData('crm', 'getCrmClients');
		assert.ok(Array.isArray(clients));
		assert.strictEqual(clients[0].crm_client_id, 701);
		assert.strictEqual(clients[0].email, 'jan.kowalski@example.com');

		const clientData = getSampleData('crm', 'getCrmClientData') as typeof SAMPLE_BASELINKER_CRM_CLIENT;
		assert.strictEqual(clientData.crm_client_id, 701);
		assert.strictEqual(clientData.star, 5);
	});

	it('should return sample data for orderReturns resource', () => {
		const returns = getSampleData('orderReturns', 'getOrderReturns');
		assert.ok(Array.isArray(returns));
		assert.strictEqual(returns[0].return_id, 201);
		assert.strictEqual(returns[0].return_reason, 'Niewlasciwy rozmiar');
	});

	it('should return sample data for externalStorages and baseConnect', () => {
		const storages = getSampleData('externalStorages', 'getExternalStoragesList');
		assert.ok(Array.isArray(storages));

		const connect = getSampleData('baseConnect', 'getConnectIntegrations');
		assert.ok(Array.isArray(connect));
	});

	it('should fallback gracefully for unknown resource/operation', () => {
		const fallback = getSampleData('unknownResource', 'unknownOp') as Record<string, any>;
		assert.strictEqual(fallback.status, 'SUCCESS');
		assert.strictEqual(fallback.sample, true);
		assert.strictEqual(fallback.resource, 'unknownResource');
		assert.strictEqual(fallback.operation, 'unknownOp');
	});
});
