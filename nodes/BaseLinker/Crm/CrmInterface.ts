import { IDataObject } from 'n8n-workflow';

export interface IBaseLinkerCrmClient extends IDataObject {
	crm_client_id: number;
	status_id: number;
	star: number;
	login: string;
	phone: string;
	email: string;
	contractor_id: number;
	invoice_company: string;
	invoice_fullname: string;
	invoice_address: string;
	invoice_postcode: string;
	invoice_city: string;
	invoice_state: string;
	invoice_country_code: string;
	invoice_tax_id: string;
	delivery_company: string;
	delivery_fullname: string;
	delivery_address: string;
	delivery_postcode: string;
	delivery_city: string;
	delivery_state: string;
	delivery_country_code: string;
}

export interface IBaseLinkerCrmClientDetails extends IBaseLinkerCrmClient {
	notes?: string;
	custom_extra_fields?: Record<string, any>;
}

export interface IBaseLinkerCrmStatusGroup extends IDataObject {
	group_id: number;
	name: string;
	is_main_group: number;
}

export interface IBaseLinkerCrmStatus extends IDataObject {
	id: number;
	name: string;
	color: string;
	group_id: number;
	is_primary: number;
}

export interface IBaseLinkerCrmClientExtraField extends IDataObject {
	extra_field_id: number;
	name: string;
	type?: string;
	editor_type?: string;
	options?: string[] | Record<string, string>;
}
