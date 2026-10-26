import { IDataObject } from 'n8n-workflow';

export interface IBaseLinkerStatusGroup extends IDataObject {
	group_id: number;
	name: string;
	is_main_group: number;
}

export interface IBaseLinkerStatus extends IDataObject {
	id: number;
	name: string;
	color: string;
	group_id: number;
	is_primary: number;
	name_for_customer: string;
}

export interface IGetOrderStatusGroupsResponse {
	status: 'SUCCESS' | 'ERROR';
	error_code?: string;
	error_message?: string;
	status_groups?: IBaseLinkerStatusGroup[];
}

export interface IGetOrderStatusListResponse {
	status: 'SUCCESS' | 'ERROR';
	error_code?: string;
	error_message?: string;
	statuses?: IBaseLinkerStatus[];
}

export interface ISetOrderStatusParameters extends IDataObject {
	order_id: number;
	status_id: number;
}

export interface ISetOrderStatusesParameters extends IDataObject {
	order_ids: number[];
	status_id: number;
}

export interface IAddOrderStatusParameters extends IDataObject {
	status_id?: number;
	name: string;
	short_name?: string;
	name_for_customer?: string;
	color?: string;
	type?: number;
	group_id?: number;
	comments?: string;
}

export interface IAddOrderStatusGroupParameters extends IDataObject {
	group_id?: number;
	name: string;
}

export interface IDeleteOrderStatusParameters extends IDataObject {
	status_id: number;
	target_status_id: number;
}

export interface IDeleteOrderStatusGroupParameters extends IDataObject {
	group_id: number;
}

