import { IDataObject } from 'n8n-workflow';

export interface IBaseLinkerInvoiceItem extends IDataObject {
	name: string;
	sku: string;
	ean: string;
	price_brutto: number;
	price_netto: number;
	tax_rate: number;
	quantity: number;
	is_shipment: number;
	order_product_id: number;
}

export interface IBaseLinkerInvoice extends IDataObject {
	invoice_id: number;
	order_id: number;
	series_id: number;
	type: 'normal' | 'correcting' | string;
	number: string;
	sub_id: number;
	month: number;
	year: number;
	postfix: string;
	date_add: number;
	date_sell: number;
	date_pay_to: number;
	currency: string;
	total_price_brutto: number;
	total_price_netto: number;
	payment: string;
	additional_info: string;
	invoice_fullname: string;
	invoice_company: string;
	invoice_nip: string;
	invoice_address: string;
	invoice_postcode: string;
	invoice_city: string;
	invoice_country: string;
	invoice_country_code: string;
	seller: string;
	issuer: string;
	correcting_to_invoice_id?: number;
	correcting_reason?: string;
	correcting_items?: boolean;
	correcting_data?: boolean;
	external_invoice_number?: string;
	exchange_currency?: string;
	exchange_rate?: number;
	exchange_date?: string;
	exchange_info?: string;
	external_id?: number;
	gov_id?: string;
	gov_date?: number;
	gov_status?: number;
	items?: IBaseLinkerInvoiceItem[];
}

export interface IBaseLinkerInvoiceSeries extends IDataObject {
	id: number | string;
	type: 'INVOICE' | 'CORRECTION' | 'RECEIPT' | string;
	name: string;
	format: string;
}

export interface IBaseLinkerInvoiceFileResponse extends IDataObject {
	status?: string;
	invoice: string;
	invoice_number: string;
	invoice_id?: number;
}

export interface IBaseLinkerReceiptProduct extends IDataObject {
	name: string;
	sku?: string;
	ean?: string;
	price_brutto: number;
	tax_rate: number;
	quantity: number;
}

export interface IBaseLinkerReceipt extends IDataObject {
	receipt_id: number;
	series_id: number;
	receipt_full_nr: string;
	order_id: number;
	date_add: number;
	payment_method?: string;
	nip?: string;
	currency?: string;
	total_price_brutto?: number;
	external_receipt_number?: string;
	exchange_currency?: string;
	exchange_rate?: number | string;
	exchange_date?: string;
	exchange_info?: string;
	products?: IBaseLinkerReceiptProduct[];
	items?: IBaseLinkerReceiptProduct[];
}

