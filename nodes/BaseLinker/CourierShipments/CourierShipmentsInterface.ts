import { IDataObject } from 'n8n-workflow';

export interface IBaseLinkerPackage extends IDataObject {
	package_id: number;
	courier_package_nr: string;
	courier_inner_number: string;
	courier_code: string;
	courier_other_name: string;
	account_id: number;
	tracking_status_date: number;
	tracking_delivery_days: number;
	tracking_status: number;
	package_type?: number;
	tracking_url?: string;
	is_return: boolean;
}

export interface IBaseLinkerSubpackage extends IDataObject {
	weight: number;
	weight_unit: string;
	length: number;
	width: number;
	height: number;
	size_unit: string;
	size_template: string;
	is_custom: boolean;
	cod_value: number;
	cod_currency: string;
	insurance_value: number;
	insurance_currency: string;
	cost_value: number;
	cost_currency: string;
	type: string;
	pickup_date: number;
	service: string;
	additional_services?: string[];
	courier_packaging_type: string;
}

export interface IBaseLinkerPackageDetails extends IDataObject {
	package_id?: number;
	package_details: IBaseLinkerSubpackage[];
	additional_fields?: Record<string, any>;
}

export interface IBaseLinkerTrackingHistoryEntry extends IDataObject {
	tracking_status_date: number;
	courier_status_code: string;
	tracking_status: number;
}

export interface IBaseLinkerPackageStatusHistoryItem extends IDataObject {
	package_id: string;
	history: IBaseLinkerTrackingHistoryEntry[];
}

export interface IBaseLinkerLabelResponse extends IDataObject {
	status?: string;
	extension: string;
	label: string;
	courier_code?: string;
	package_id?: number;
	package_number?: string;
}

export interface IBaseLinkerCreatedPackageItem extends IDataObject {
	package_id: number;
	package_number: string;
	courier_inner_number?: string;
}

export interface IBaseLinkerCreatePackageResponse extends IDataObject {
	status?: string;
	package_id: number;
	package_number: string;
	courier_inner_number?: string;
	packages?: IBaseLinkerCreatedPackageItem[];
}

export interface IBaseLinkerCreatePackageManualResponse extends IDataObject {
	status?: string;
	package_id: number;
	package_number: string;
}

export interface IBaseLinkerCourierAccount extends IDataObject {
	id: number;
	name: string;
}

export interface IBaseLinkerCourier extends IDataObject {
	code: string;
	name: string;
}

export interface IBaseLinkerCourierField extends IDataObject {
	id: string;
	name: string;
	type: string;
	desc?: string;
	options?: Record<string, string>;
	show_field?: Record<string, string[]>;
	value?: any;
	function?: string;
}

export interface IBaseLinkerPackageField extends IDataObject {
	id: string;
	name: string;
	type: string;
}

export interface IBaseLinkerCourierFieldsResponse extends IDataObject {
	status?: string;
	multi_packages: boolean;
	fields: IBaseLinkerCourierField[];
	package_fields: IBaseLinkerPackageField[];
}

export interface IBaseLinkerPackagePrice extends IDataObject {
	name: string;
	price: number;
	currency: string;
	info?: string;
	selected?: boolean;
}

export interface IBaseLinkerGetPricePackageResponse extends IDataObject {
	status?: string;
	prices: IBaseLinkerPackagePrice[];
	header?: string;
	notices?: string[];
}

export interface IBaseLinkerCourierDocumentResponse extends IDataObject {
	status?: string;
	extension: string;
	document: string;
}

export interface IBaseLinkerProtocolResponse extends IDataObject {
	status?: string;
	extension: string;
	protocol: string;
}

export interface IBaseLinkerPickupField extends IDataObject {
	id: string;
	name: string;
	type: string;
	desc?: string;
	options?: Record<string, string>;
	value?: any;
}

export interface IBaseLinkerPickupFieldsResponse extends IDataObject {
	status?: string;
	fields: IBaseLinkerPickupField[];
}

export interface IBaseLinkerRunPickupResponse extends IDataObject {
	status?: string;
	pickup_number: string;
}
