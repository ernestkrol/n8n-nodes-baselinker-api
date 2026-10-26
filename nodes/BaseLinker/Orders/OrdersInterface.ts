import { IDataObject } from 'n8n-workflow';

export interface IGetOrdersFilterParameters {
	order_id?: number;
	date_confirmed_from?: number;
	date_from?: number;
	id_from?: number;
	get_unconfirmed_orders?: boolean;
	status_id?: number;
	status_group_id?: number;
	filter_email?: string;
	filter_order_source?: string;
	filter_order_source_id?: number;
	filter_shop_order_id?: number;
	filter_external_order_id?: string;
	include_custom_extra_fields?: boolean;
	include_commissions?: boolean;
	include_connect_data?: boolean;
	include_discounts_data?: boolean;
	[key: string]: any;
}

export interface IBaseLinkerApiResponse<T = any> {
	status: 'SUCCESS' | 'ERROR';
	error_code?: string;
	error_message?: string;
	orders?: T[];
	[key: string]: any;
}

export interface IBaseLinkerOrderProduct {
	storage: string;
	storage_id: number;
	order_product_id: number;
	product_id: string;
	variant_id: string;
	name: string;
	attributes: string;
	sku: string;
	ean: string;
	location: string;
	warehouse_id: number;
	warehouse_type: string;
	warehouse_source_id: number;
	auction_id: string;
	price_brutto: number;
	tax_rate: number;
	quantity: number;
	weight: number;
	bundle_id: number;
	transaction_id: string;
	transaction2_id: string;
}

export interface IBaseLinkerOrder extends IDataObject {
	order_id: number;
	shop_order_id: number;
	external_order_id: string;
	order_source: string;
	order_source_id: number;
	order_source_info: string;
	order_status_id: number;
	date_add: number;
	date_confirmed: number;
	date_in_status: number;
	confirmed: boolean;
	user_login: string;
	currency: string;
	payment_method: string;
	payment_method_cod: string;
	payment_done: number;
	user_comments: string;
	admin_comments: string;
	email: string;
	phone: string;
	delivery_method_id: number;
	delivery_method: string;
	delivery_price: number;
	delivery_package_module: string;
	delivery_package_nr: string;
	delivery_fullname: string;
	delivery_company: string;
	delivery_address: string;
	delivery_postcode: string;
	delivery_city: string;
	delivery_state: string;
	delivery_country: string;
	delivery_country_code: string;
	delivery_point_id: string;
	delivery_point_name: string;
	delivery_point_address: string;
	delivery_point_postcode: string;
	delivery_point_city: string;
	invoice_fullname: string;
	invoice_company: string;
	invoice_nip: string;
	invoice_address: string;
	invoice_postcode: string;
	invoice_city: string;
	invoice_state: string;
	invoice_country: string;
	invoice_country_code: string;
	want_invoice: string;
	extra_field_1: string;
	extra_field_2: string;
	order_page: string;
	pick_state: number;
	pack_state: number;
	star: number;
	crm_client_id: number;
	custom_extra_fields?: Record<string, any>;
	commissions?: any[];
	connect_data?: Record<string, any>;
	products?: IBaseLinkerOrderProduct[];
	discounts?: any[];
}

export interface IBaseLinkerJournalLog extends IDataObject {
	log_id: number;
	order_id: number;
	log_type: number;
	object_id: number;
	date: number;
}

export interface IBaseLinkerOrderExtraField extends IDataObject {
	extra_field_id: number;
	name: string;
	editor_type: string;
	options?: string[];
}

export interface IBaseLinkerFlattenedOrderSource extends IDataObject {
	source_type: string;
	source_id: string | number;
	source_name: string;
}

export interface IBaseLinkerOrderPayment extends IDataObject {
	paid_before: number | string;
	paid_after: number | string;
	total_price: number | string;
	currency: string;
	external_payment_id: string;
	date: number;
	comment: string;
}

export interface ISetOrderFieldsParameters extends IDataObject {
	order_id: number;
	admin_comments?: string;
	user_comments?: string;
	currency?: string;
	payment_method?: string;
	payment_method_cod?: boolean;
	email?: string;
	phone?: string;
	user_login?: string;
	delivery_method?: string;
	delivery_price?: number;
	delivery_fullname?: string;
	delivery_company?: string;
	delivery_address?: string;
	delivery_postcode?: string;
	delivery_city?: string;
	delivery_state?: string;
	delivery_country_code?: string;
	delivery_point_id?: string;
	delivery_point_name?: string;
	delivery_point_address?: string;
	delivery_point_postcode?: string;
	delivery_point_city?: string;
	invoice_fullname?: string;
	invoice_company?: string;
	invoice_nip?: string;
	invoice_address?: string;
	invoice_postcode?: string;
	invoice_city?: string;
	invoice_state?: string;
	invoice_country_code?: string;
	want_invoice?: boolean | number;
	extra_field_1?: string;
	extra_field_2?: string;
	custom_extra_fields?: Record<string, any>;
	pick_state?: number;
	pack_state?: number;
	star?: number;
	[key: string]: any;
}

export interface IAddOrderProductItem {
	storage?: string;
	storage_id?: number | string;
	product_id?: string;
	variant_id?: number | string;
	name: string;
	sku?: string;
	ean?: string;
	location?: string;
	warehouse_id?: number;
	attributes?: string;
	price_brutto: number;
	tax_rate?: number;
	quantity: number;
	weight?: number;
}

export interface IAddOrderParameters extends IDataObject {
	order_status_id: number;
	custom_source_id?: number;
	date_add?: number;
	currency?: string;
	payment_method?: string;
	payment_method_cod?: boolean;
	paid?: boolean;
	user_comments?: string;
	admin_comments?: string;
	email?: string;
	phone?: string;
	user_login?: string;
	delivery_method?: string;
	delivery_price?: number;
	delivery_fullname?: string;
	delivery_company?: string;
	delivery_address?: string;
	delivery_postcode?: string;
	delivery_city?: string;
	delivery_state?: string;
	delivery_country_code?: string;
	delivery_point_id?: string;
	delivery_point_name?: string;
	delivery_point_address?: string;
	delivery_point_postcode?: string;
	delivery_point_city?: string;
	invoice_fullname?: string;
	invoice_company?: string;
	invoice_nip?: string;
	invoice_address?: string;
	invoice_postcode?: string;
	invoice_city?: string;
	invoice_state?: string;
	invoice_country_code?: string;
	want_invoice?: boolean | number;
	extra_field_1?: string;
	extra_field_2?: string;
	custom_extra_fields?: Record<string, any>;
	products?: IAddOrderProductItem[];
	[key: string]: any;
}

export interface IAddOrderBySplitItem {
	order_product_id: number;
	quantity: number;
}

export interface IAddOrderBySplitParameters extends IDataObject {
	order_id: number;
	items_to_split: IAddOrderBySplitItem[];
	delivery_cost_to_split?: number;
}

export interface ISetOrdersMergeParameters extends IDataObject {
	main_order_id: number;
	order_ids_to_merge: number[];
	merge_mode: 'technical_merge' | 'into_main_order';
	sum_delivery_costs?: boolean;
}

export interface ISetOrderPaymentParameters extends IDataObject {
	order_id: number;
	payment_done: number;
	payment_date?: number;
	payment_comment?: string;
	external_payment_id?: string;
}

export interface IAddOrderProductParameters extends IDataObject {
	order_id: number;
	storage?: string;
	storage_id?: string | number;
	product_id?: string;
	variant_id?: string | number;
	auction_id?: string;
	name: string;
	sku?: string;
	ean?: string;
	location?: string;
	warehouse_id?: number;
	attributes?: string;
	price_brutto: number;
	tax_rate?: number;
	quantity: number;
	weight?: number;
}

export interface ISetOrderProductFieldsParameters extends IDataObject {
	order_id: number;
	order_product_id: number;
	storage?: string;
	storage_id?: string | number;
	product_id?: string;
	variant_id?: string | number;
	auction_id?: string;
	name?: string;
	sku?: string;
	ean?: string;
	location?: string;
	warehouse_id?: number;
	attributes?: string;
	price_brutto?: number;
	tax_rate?: number;
	quantity?: number;
	weight?: number;
}

export interface IBaseLinkerOrderLookupItem extends IDataObject {
	order_id: number;
	order_status_id: number;
	date_in_status: number;
	date_add: number;
	delivery_fullname?: string;
	delivery_company?: string;
}

export interface IBaseLinkerPickList extends IDataObject {
	pick_list_id: number;
	barcode: string;
	date_added: number;
	orders_count: number;
	order_ids: number[];
	creator_profile_id: number;
	is_printed: boolean;
}

export interface IBaseLinkerPickPackCart extends IDataObject {
	cart_id: number;
	name: string;
	color: string;
}

export interface IBaseLinkerPickPackHistoryEntry extends IDataObject {
	action_type: number;
	profile_id: string;
	station_id: number;
	cart_id: number;
	entry_date: number;
}

export interface IBaseLinkerPrintoutTemplate extends IDataObject {
	printout_id: number;
	name: string;
	file_format: string;
	language: string;
}




