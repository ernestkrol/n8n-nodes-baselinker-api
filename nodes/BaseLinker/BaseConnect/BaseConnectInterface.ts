import { IDataObject } from 'n8n-workflow';

export interface IBaseLinkerConnectIntegration extends IDataObject {
	connect_integration_id: number;
	name: string;
	settings?: any[];
	integration_type?: 'own' | 'connected';
}

export interface IBaseLinkerConnectIntegrationsResponse extends IDataObject {
	status: string;
	integrations: {
		own_integrations?: IBaseLinkerConnectIntegration[];
		connected_integrations?: IBaseLinkerConnectIntegration[];
	};
}

export interface IBaseLinkerConnectContractorCreditData extends IDataObject {
	credit_to_pay?: number | string;
	credit_limit?: number | string;
	credit_available?: number | string;
	currency?: string;
	[key: string]: any;
}

export interface IBaseLinkerConnectContractor extends IDataObject {
	connect_contractor_id: number;
	name: string;
	credit_data?: IBaseLinkerConnectContractorCreditData | any[];
	settings?: any[];
	[key: string]: any;
}

export interface IBaseLinkerConnectIntegrationContractorsResponse extends IDataObject {
	status: string;
	contractors: Record<string, IBaseLinkerConnectContractor> | IBaseLinkerConnectContractor[];
}

export interface IBaseLinkerConnectCreditEntry extends IDataObject {
	credit_entry_id: number;
	date_add: number | string;
	description: string;
	currency: string;
	type: 'charge' | 'payment' | string;
	amount: number | string;
	is_accepted: number | string;
}

export interface IBaseLinkerConnectContractorCreditHistoryResponse extends IDataObject {
	status: string;
	credit_data: IBaseLinkerConnectCreditEntry[];
}

export interface IBaseLinkerAddConnectContractorCreditSettlementResponse extends IDataObject {
	status: string;
	credit_entry_id: number;
	new_blocked_credit: number;
	new_available_credit: number;
}

export interface IBaseLinkerSetConnectContractorCreditLimitResponse extends IDataObject {
	status: string;
	new_limit_set: string;
}
