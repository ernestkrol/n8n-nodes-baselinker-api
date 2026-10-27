import { IDataObject } from 'n8n-workflow';
import { IBaseLinkerOrder } from '../Orders/OrdersInterface';

export const SAMPLE_BASELINKER_ORDER: IBaseLinkerOrder = {
	order_id: 8765432,
	shop_order_id: 1042,
	external_order_id: 'ORD-2026-99182',
	order_source: 'allegro',
	order_source_id: 101,
	order_source_info: 'Allegro PL',
	order_status_id: 8010,
	date_add: 1700000000,
	date_confirmed: 1700000000,
	date_in_status: 1700000000,
	confirmed: true,
	user_login: 'jan_kowalski',
	phone: '+48123456789',
	email: 'jan.kowalski@example.com',
	user_comments: 'Prosze o fakture VAT',
	admin_comments: '',
	currency: 'PLN',
	payment_method: 'Przelewy24',
	payment_method_cod: '0',
	payment_done: 149.99,
	delivery_method_id: 1,
	delivery_method: 'Paczkomaty InPost',
	delivery_price: 12.99,
	delivery_package_module: 'inpost',
	delivery_package_nr: '00001234567890123456',
	delivery_fullname: 'Jan Kowalski',
	delivery_company: 'ACME Sp. z o.o.',
	delivery_address: 'ul. Kwiatowa 12/4',
	delivery_postcode: '00-001',
	delivery_city: 'Warszawa',
	delivery_state: 'Mazowieckie',
	delivery_country: 'Polska',
	delivery_country_code: 'PL',
	delivery_point_id: 'WAW01M',
	delivery_point_name: 'Paczkomat WAW01M',
	delivery_point_address: 'ul. Marszalkowska 10',
	delivery_point_postcode: '00-001',
	delivery_point_city: 'Warszawa',
	invoice_fullname: 'ACME Sp. z o.o.',
	invoice_company: 'ACME Sp. z o.o.',
	invoice_nip: '1234567890',
	invoice_address: 'ul. Kwiatowa 12/4',
	invoice_postcode: '00-001',
	invoice_city: 'Warszawa',
	invoice_state: 'Mazowieckie',
	invoice_country: 'Polska',
	invoice_country_code: 'PL',
	want_invoice: '1',
	extra_field_1: 'Wskazowki dla kuriera',
	extra_field_2: '',
	order_page: 'https://orders.baselinker.com/order/8765432',
	pick_state: 0,
	pack_state: 0,
	star: 0,
	crm_client_id: 701,
	custom_extra_fields: {
		'101': 'Express Shipping',
		'102': 'B2B Customer',
	},
	products: [
		{
			storage: 'db',
			storage_id: 0,
			order_product_id: 991,
			product_id: 'P-100',
			variant_id: 'V-100-1',
			name: 'Bezprzewodowa Mysz Ergonomiczna',
			attributes: 'Kolor: Czarny',
			sku: 'MOUSE-ERG-BLK',
			ean: '5901234567890',
			location: 'A-01-04',
			warehouse_id: 1,
			warehouse_type: 'bl',
			warehouse_source_id: 1,
			auction_id: '123456789',
			price_brutto: 137.0,
			tax_rate: 23,
			quantity: 1,
			weight: 0.25,
			bundle_id: 0,
			transaction_id: 'TR-100',
			transaction2_id: '',
		},
	],
};

export const SAMPLE_BASELINKER_PRODUCT: IDataObject = {
	id: 100,
	name: 'Smartwatch Pro 2026',
	sku: 'PROD-SW-2026',
	ean: '5901234567890',
	asin: 'B08XYZ1234',
	quantity: 45,
	price_brutto: 299.0,
	weight: 0.35,
	dimensions: {
		length: 15,
		width: 10,
		height: 5,
	},
	prices: {
		'1': 299.0,
		'2': 269.0,
	},
	stock: {
		'1': 45,
	},
	reservations: {
		'1': 2,
	},
	text_fields: {
		name: 'Smartwatch Pro 2026',
		description: 'Nowoczesny smartwatch z bateria na 14 dni.',
		features: 'Pulsoksymetr, GPS, Wodoszczelnosc 5ATM',
	},
	images: ['https://example.com/images/smartwatch-main.jpg'],
	links: {
		allegro: '12345678901',
	},
	variants: {
		'100-1': {
			name: 'Smartwatch Pro 2026 - Pasek Czarny',
			sku: 'PROD-SW-2026-BLK',
			ean: '5901234567891',
			price_brutto: 299.0,
			stock: { '1': 30 },
		},
		'100-2': {
			name: 'Smartwatch Pro 2026 - Pasek Srebrny',
			sku: 'PROD-SW-2026-SLV',
			ean: '5901234567892',
			price_brutto: 319.0,
			stock: { '1': 15 },
		},
	},
};

export const SAMPLE_BASELINKER_PACKAGE: IDataObject = {
	package_id: 554433,
	package_number: '00001234567890123456',
	courier_code: 'inpost',
	courier_inner_number: 'INP-992211',
	tracking_status: 'IN_TRANSIT',
	tracking_url: 'https://inpost.pl/sledzenie-przesylek?number=00001234567890123456',
	date: 1700000000,
	weight: 1.5,
	length: 30,
	width: 20,
	height: 15,
	packages: [
		{
			package_id: 554433,
			package_number: '00001234567890123456',
			weight: 1.5,
		},
	],
};

export const SAMPLE_BASELINKER_INVOICE: IDataObject = {
	invoice_id: 4501,
	order_id: 8765432,
	number: 'FV/2026/01/105',
	type: 'INVOICE',
	date_add: 1700000000,
	date_sell: 1700000000,
	subtotal: 121.94,
	total: 149.99,
	currency: 'PLN',
	payment_method: 'Przelewy24',
	invoice_fullname: 'ACME Sp. z o.o.',
	invoice_company: 'ACME Sp. z o.o.',
	invoice_nip: '1234567890',
	invoice_address: 'ul. Kwiatowa 12/4',
	invoice_postcode: '00-001',
	invoice_city: 'Warszawa',
	invoice_country_code: 'PL',
	items: [
		{
			name: 'Bezprzewodowa Mysz Ergonomiczna',
			sku: 'MOUSE-ERG-BLK',
			quantity: 1,
			price_brutto: 137.0,
			tax_rate: 23,
		},
		{
			name: 'Przesylka Paczkomaty InPost',
			quantity: 1,
			price_brutto: 12.99,
			tax_rate: 23,
		},
	],
};

export const SAMPLE_BASELINKER_CRM_CLIENT: IDataObject = {
	crm_client_id: 701,
	email: 'jan.kowalski@example.com',
	phone: '+48123456789',
	fullname: 'Jan Kowalski',
	company: 'ACME Sp. z o.o.',
	tax_id: '1234567890',
	status_id: 1,
	star: 5,
	notes: 'Klient kluczowy (VIP), szybka realizacja.',
	total_orders: 12,
	total_spent: 3450.8,
	date_add: 1690000000,
	custom_extra_fields: {
		'301': 'VIP Partner',
		'302': 'Rabat 10%',
	},
};

export const SAMPLE_BASELINKER_ORDER_RETURN: IDataObject = {
	return_id: 201,
	order_id: 8765432,
	status_id: 1,
	date_add: 1700000000,
	delivery_fullname: 'Jan Kowalski',
	email: 'jan.kowalski@example.com',
	phone: '+48123456789',
	currency: 'PLN',
	return_reason: 'Niewlasciwy rozmiar',
	refund_status: false,
	products: [
		{
			return_product_id: 51,
			name: 'Bezprzewodowa Mysz Ergonomiczna',
			sku: 'MOUSE-ERG-BLK',
			quantity: 1,
			price_brutto: 137.0,
			reason_id: 2,
			status_id: 1,
		},
	],
};

/**
 * Returns realistic mock data matching the official BaseLinker schema
 * for any requested resource and operation.
 */
export function getSampleData(resource: string, operation: string): IDataObject | IDataObject[] {
	switch (resource) {
		case 'orders': {
			if (operation === 'getOrders') {
				return [SAMPLE_BASELINKER_ORDER as unknown as IDataObject];
			}
			if (operation === 'getOrderPaymentsHistory') {
				return [
					{
						paid_before: 0,
						paid_after: 149.99,
						total_price: 149.99,
						currency: 'PLN',
						external_payment_id: 'P24-998877',
						date: 1700000000,
						comment: 'Przelew online (Przelewy24)',
					},
				];
			}
			if (operation === 'getOrderSources') {
				return {
					allegro: { '101': 'Allegro - Sklep Glowny' },
					shop: { '1': 'Sklep WooCommerce (www.example.com)' },
					personal: { '0': 'Zamowienie reczne / telefon' },
				};
			}
			if (operation === 'getOrderExtraFields') {
				return [
					{ extra_field_id: 101, name: 'Typ wysylki', kind: 'text' },
					{ extra_field_id: 102, name: 'Segment B2B', kind: 'select' },
				];
			}
			if (operation === 'getOrderPackages') {
				return [SAMPLE_BASELINKER_PACKAGE];
			}
			if (operation === 'getOrderTransactionData') {
				return {
					transaction_id: 'TR-2026-9911',
					payment_status: 'COMPLETED',
					amazon_order_id: '',
					taxes: [{ country: 'PL', rate: 23, amount: 28.05 }],
				};
			}
			if (operation === 'getOrderPrintoutTemplates') {
				return [
					{ template_id: 1, name: 'Standardowy List Przewozowy' },
					{ template_id: 2, name: 'Formularz Zwrotu Towaru' },
				];
			}
			if (operation === 'getOrderPickLists') {
				return [
					{ pick_list_id: 12, date_add: 1700000000, total_orders: 5, orders: [8765432, 8765433] },
				];
			}
			if (operation === 'getOrderPickPackHistory') {
				return [
					{ order_id: 8765432, action_type: 1, user_id: 5, date: 1700000000 },
					{ order_id: 8765432, action_type: 2, user_id: 5, date: 1700000100 },
				];
			}
			if (operation === 'getPickPackCarts') {
				return [
					{ cart_id: 1, name: 'Wozek Czerwony A1', color: '#FF0000' },
					{ cart_id: 2, name: 'Wozek Niebieski B2', color: '#0088FF' },
				];
			}
			if (operation === 'addOrder' || operation === 'addOrderBySplit' || operation === 'addOrderDuplicate') {
				return { status: 'SUCCESS', order_id: 8765433 };
			}
			if (operation === 'addOrderProduct') {
				return { status: 'SUCCESS', order_product_id: 992 };
			}
			if (operation === 'deleteOrders') {
				return { status: 'SUCCESS', deleted_order_ids: [8765432] };
			}
			return { status: 'SUCCESS', resource, operation };
		}

		case 'orderStatus': {
			if (operation === 'getOrderStatusList') {
				return [
					{
						id: 8010,
						name: 'Nowe zamowienia',
						color: '#0088FF',
						group_id: 1,
						is_primary: 1,
						name_for_customer: 'Przyjete do realizacji',
					},
					{
						id: 8011,
						name: 'Wyslane',
						color: '#00CC00',
						group_id: 1,
						is_primary: 0,
						name_for_customer: 'Przesylka wyslana',
					},
				];
			}
			if (operation === 'getOrderStatusGroups') {
				return [
					{ group_id: 1, name: 'Standardowy Proces Zamowien', is_main_group: 1 },
					{ group_id: 2, name: 'Zamowienia Zagraniczne', is_main_group: 0 },
				];
			}
			if (operation === 'addOrderStatus') {
				return { status: 'SUCCESS', status_id: 8012 };
			}
			if (operation === 'addOrderStatusGroup') {
				return { status: 'SUCCESS', group_id: 3 };
			}
			return { status: 'SUCCESS', resource, operation };
		}

		case 'courierShipments': {
			if (operation === 'getOrderPackages') {
				return [SAMPLE_BASELINKER_PACKAGE];
			}
			if (operation === 'getPackageDetails') {
				return SAMPLE_BASELINKER_PACKAGE;
			}
			if (operation === 'getCourierPackagesStatusHistory') {
				return [
					{
						package_id: 554433,
						package_number: '00001234567890123456',
						status_history: [
							{ status_code: 'GENERATED', status_description: 'Przesylka zarejestrowana', date: 1700000000 },
							{ status_code: 'IN_TRANSIT', status_description: 'Przesylka w drodze do sortowni', date: 1700005000 },
						],
					},
				];
			}
			if (operation === 'getCouriersList') {
				return [
					{ code: 'inpost', name: 'Paczkomaty InPost' },
					{ code: 'dpd', name: 'DPD Polska' },
					{ code: 'dhl', name: 'DHL Express' },
				];
			}
			if (operation === 'getCourierAccounts') {
				return [
					{ id: 101, name: 'Glowne konto InPost' },
					{ id: 102, name: 'DPD Umowa Firmowa' },
				];
			}
			if (operation === 'getCourierFields') {
				return {
					fields: [
						{ id: 'service', name: 'Typ uslugi', type: 'select', options: ['standard', 'express'] },
					],
					package_fields: [
						{ id: 'size', name: 'Gabaryt', type: 'select', options: ['A', 'B', 'C'] },
					],
				};
			}
			if (operation === 'getCourierServices') {
				return [
					{ service_id: 'paczkomat_standard', service_name: 'Paczkomat Standard' },
					{ service_id: 'kurier_standard', service_name: 'Kurier Standard' },
				];
			}
			if (operation === 'getPricePackage') {
				return [
					{ name: 'Paczkomat Gabaryt A', price: 12.99, currency: 'PLN' },
					{ name: 'Kurier Standard 24h', price: 16.5, currency: 'PLN' },
				];
			}
			if (operation === 'getLabel' || operation === 'getCourierDocument' || operation === 'getProtocol') {
				return {
					document: 'JVBERi0xLjQKJcTl8uXrp/Og0MTGCjQgMCBvYmoKPDw...',
					extension: 'pdf',
					package_id: 554433,
				};
			}
			if (operation === 'createPackage' || operation === 'createPackageManual') {
				return {
					status: 'SUCCESS',
					package_id: 554433,
					package_number: '00001234567890123456',
				};
			}
			return { status: 'SUCCESS', resource, operation };
		}

		case 'invoices': {
			if (operation === 'getInvoices') {
				return [SAMPLE_BASELINKER_INVOICE];
			}
			if (operation === 'getInvoiceFile') {
				return {
					invoice_id: 4501,
					number: 'FV/2026/01/105',
					file: 'JVBERi0xLjQKJcTl8uXrp/Og0MTGCjQgMCBvYmoKPDw...',
				};
			}
			if (operation === 'getSeries') {
				return [
					{ series_id: 1, name: 'Faktury VAT 2026', format: 'FV/{YYYY}/{MM}/{INDEX}', type: 'INVOICE' },
					{ series_id: 2, name: 'Paragony Fiskalne 2026', format: 'PAR/{YYYY}/{INDEX}', type: 'RECEIPT' },
				];
			}
			if (operation === 'getReceipt' || operation === 'getReceipts' || operation === 'getNewReceipts') {
				return [
					{
						receipt_id: 301,
						order_id: 8765432,
						series_id: 2,
						number: 'PAR/2026/001',
						total: 149.99,
						currency: 'PLN',
						is_printed: true,
						date: 1700000000,
					},
				];
			}
			if (operation === 'addInvoice' || operation === 'addInvoiceCorrection') {
				return { status: 'SUCCESS', invoice_id: 4501 };
			}
			if (operation === 'addReceipt') {
				return { status: 'SUCCESS', receipt_id: 301 };
			}
			return { status: 'SUCCESS', resource, operation };
		}

		case 'productCatalog': {
			if (operation === 'getInventories') {
				return [
					{
						inventory_id: 10,
						name: 'Katalog Glowny E-Commerce',
						description: 'Glowny magazyn produktowy sklepu',
						is_default: 1,
						default_language: 'pl',
						default_currency: 'PLN',
					},
				];
			}
			if (operation === 'getInventoryWarehouses') {
				return [
					{ warehouse_id: 1, name: 'Magazyn Centralny Warszawa', is_default: 1, country: 'PL' },
					{ warehouse_id: 2, name: 'Magazyn Zewnetrzny Poznan', is_default: 0, country: 'PL' },
				];
			}
			if (operation === 'getInventoryProductsList') {
				return [
					{
						id: 100,
						ean: '5901234567890',
						sku: 'PROD-SW-2026',
						name: 'Smartwatch Pro 2026',
						quantity: 45,
						price_brutto: 299.0,
					},
				];
			}
			if (operation === 'getInventoryProductsData') {
				return [SAMPLE_BASELINKER_PRODUCT];
			}
			if (operation === 'getInventoryProductsStock') {
				return [
					{
						id: 100,
						stock: { '1': 45, '2': 0 },
						reservations: { '1': 2, '2': 0 },
					},
				];
			}
			if (operation === 'getInventoryProductsPrices') {
				return [
					{
						id: 100,
						prices: { '1': 299.0, '2': 269.0 },
					},
				];
			}
			if (operation === 'getInventoryProductLogs') {
				return [
					{
						product_id: 100,
						date: 1700000000,
						log_type: 1,
						description: 'Stan magazynowy zmieniony z 50 na 45',
					},
				];
			}
			if (operation === 'getInventoryCategories') {
				return [
					{ category_id: 5, name: 'Elektronika', parent_id: 0 },
					{ category_id: 12, name: 'Smartwatche', parent_id: 5 },
				];
			}
			if (operation === 'getInventoryManufacturers') {
				return [
					{ manufacturer_id: 3, name: 'TechBrand Global' },
				];
			}
			if (operation === 'getInventoryPriceGroups') {
				return [
					{ price_group_id: 1, name: 'Ceny Detaliczne PLN', currency: 'PLN', is_default: 1 },
					{ price_group_id: 2, name: 'Ceny Hurtowe B2B', currency: 'PLN', is_default: 0 },
				];
			}
			if (operation === 'getInventoryTags') {
				return [
					{ tag_id: 2, name: 'Bestseller' },
					{ tag_id: 4, name: 'Nowosc' },
				];
			}
			if (operation === 'getInventoryExtraFields') {
				return [
					{ extra_field_id: 201, name: 'Gwarancja producenta', kind: 'text' },
				];
			}
			if (operation === 'addInventoryProduct') {
				return { status: 'SUCCESS', product_id: 101 };
			}
			return { status: 'SUCCESS', resource, operation };
		}

		case 'crm': {
			if (operation === 'getCrmClients') {
				return [SAMPLE_BASELINKER_CRM_CLIENT];
			}
			if (operation === 'getCrmClientData') {
				return SAMPLE_BASELINKER_CRM_CLIENT;
			}
			if (operation === 'getCrmClientStatuses') {
				return [
					{ id: 1, name: 'VIP', color: '#FFD700', group_id: 1 },
					{ id: 2, name: 'Nowy Klient', color: '#00AAFF', group_id: 1 },
				];
			}
			if (operation === 'getCrmClientStatusGroups') {
				return [
					{ group_id: 1, name: 'Statusy Relacji z Klientem', is_main_group: 1 },
				];
			}
			if (operation === 'getCrmClientExtraFields') {
				return [
					{ extra_field_id: 301, name: 'Segment handlowy' },
				];
			}
			if (operation === 'addCrmClient') {
				return { status: 'SUCCESS', crm_client_id: 701 };
			}
			return { status: 'SUCCESS', resource, operation };
		}

		case 'orderReturns': {
			if (operation === 'getOrderReturns') {
				return [SAMPLE_BASELINKER_ORDER_RETURN];
			}
			if (operation === 'getOrderReturnStatusList') {
				return [
					{ id: 1, name: 'Zwrot zgloszony', color: '#FFA500', group_id: 1, is_primary: 1 },
					{ id: 2, name: 'Zwrot zaakceptowany', color: '#00CC00', group_id: 1, is_primary: 0 },
				];
			}
			if (operation === 'getOrderReturnStatusGroups') {
				return [
					{ group_id: 1, name: 'Procedury Reklamacyjne', is_main_group: 1 },
				];
			}
			if (operation === 'getOrderReturnReasonsList') {
				return [
					{ id: 1, name: 'Wada fabryczna' },
					{ id: 2, name: 'Niewlasciwy rozmiar lub kolor' },
				];
			}
			if (operation === 'getOrderReturnPaymentsHistory') {
				return [
					{ return_id: 201, amount: 137.0, currency: 'PLN', date: 1700000000 },
				];
			}
			if (operation === 'addOrderReturn') {
				return { status: 'SUCCESS', return_id: 202 };
			}
			if (operation === 'addOrderReturnProduct') {
				return { status: 'SUCCESS', return_product_id: 52 };
			}
			return { status: 'SUCCESS', resource, operation };
		}

		case 'externalStorages': {
			if (operation === 'getExternalStoragesList') {
				return [
					{ storage_id: 'shop_1', name: 'Sklep Partnerski WooCommerce' },
				];
			}
			if (operation === 'getExternalStorageProductsList') {
				return [
					{ id: '100', name: 'Produkt Zewnetrzny', quantity: 20, price: 59.99 },
				];
			}
			return { status: 'SUCCESS', resource, operation };
		}

		case 'baseConnect': {
			if (operation === 'getConnectIntegrations') {
				return [
					{ integration_id: 1, name: 'Fakturownia Integration' },
				];
			}
			if (operation === 'getConnectContractors') {
				return [
					{ contractor_id: 55, name: 'Partner Handlowy Sp. z o.o.' },
				];
			}
			if (operation === 'getConnectCreditEntries') {
				return [
					{ entry_id: 9, amount: 5000.0, currency: 'PLN', date: 1700000000 },
				];
			}
			return { status: 'SUCCESS', resource, operation };
		}

		default:
			return { status: 'SUCCESS', sample: true, resource, operation };
	}
}
