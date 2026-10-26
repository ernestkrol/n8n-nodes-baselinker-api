import { IDataObject } from 'n8n-workflow';

export interface IGetOrderReturnsFilterParameters {
	order_id?: number;
	return_id?: number;
	date_from?: number;
	id_from?: number;
	status_id?: number;
	filter_order_return_source?: string;
	filter_order_return_source_id?: number;
	include_custom_extra_fields?: boolean;
	include_connect_data?: boolean;
	[key: string]: any;
}

export interface IBaseLinkerOrderReturnProduct {
	storage?: string;
	storage_id?: string | number;
	order_return_product_id?: number;
	order_product_id?: number;
	product_id?: string;
	variant_id?: string | number;
	name?: string;
	sku?: string;
	ean?: string;
	location?: string;
	warehouse_id?: number;
	auction_id?: string;
	attributes?: string;
	price_brutto?: number;
	tax_rate?: number;
	quantity?: number;
	weight?: number;
	bundle_id?: number;
	status_id?: number;
	return_reason_id?: number;
	return_reason_comment?: string;
	[key: string]: any;
}

export interface IBaseLinkerOrderReturn extends IDataObject {
	return_id: number;
	order_id?: number;
	shop_order_id?: number;
	external_order_id?: string;
	reference_number?: string;
	order_return_source?: string;
	order_return_source_id?: number;
	status_id: number;
	date_add: number;
	date_in_status?: number;
	user_login?: string;
	currency?: string;
	refunded?: boolean | string | number;
	email?: string;
	phone?: string;
	delivery_price?: number;
	delivery_fullname?: string;
	delivery_company?: string;
	delivery_address?: string;
	delivery_postcode?: string;
	delivery_city?: string;
	delivery_state?: string;
	delivery_country?: string;
	delivery_country_code?: string;
	extra_field_1?: string;
	extra_field_2?: string;
	custom_extra_fields?: Record<string, any>;
	admin_comments?: string;
	delivery_package_module?: string;
	delivery_package_nr?: string;
	connect_data?: IDataObject;
	products?: IBaseLinkerOrderReturnProduct[];
	order_return_account_number?: string;
	order_return_iban?: string;
	order_return_swift?: string;
	fulfillment_status?: number;
}

export interface IBaseLinkerOrderReturnExtraField {
	extra_field_id: number;
	name: string;
	editor_type: string;
	options?: string[];
}

export interface IBaseLinkerOrderReturnStatus {
	id: number;
	name: string;
	color: string;
	group_id: number;
	is_primary: number;
	name_for_customer?: string;
}

export interface IBaseLinkerOrderReturnStatusGroup {
	group_id: number;
	name: string;
	is_main_group: number;
}

export interface IBaseLinkerOrderReturnProductStatus {
	status_id: number;
	name: string;
}

export interface IBaseLinkerOrderReturnReason {
	return_reason_id: number;
	name: string;
}

export interface IBaseLinkerOrderReturnPayment {
	paid_before: number;
	paid_after: number;
	total_price: number;
	currency: string;
	external_payment_id?: string;
	date: number;
}

export interface IBaseLinkerOrderReturnJournalLog {
	id: number;
	return_id: number;
	log_type: number;
	object_id: number;
	date: number;
}
