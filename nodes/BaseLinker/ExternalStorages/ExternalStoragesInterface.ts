import { IDataObject } from 'n8n-workflow';

export interface IBaseLinkerExternalStorage extends IDataObject {
	storage_id: string;
	name: string;
	methods: string[];
	read: boolean;
	write: boolean;
}

export interface IBaseLinkerExternalCategory extends IDataObject {
	category_id: number;
	name: string;
	parent_id: number;
}

export interface IBaseLinkerExternalProductListItem extends IDataObject {
	product_id: string;
	sku: string;
	ean: string;
	asin: string;
	name: string;
	quantity: number;
	price_brutto: number;
}

export interface IBaseLinkerExternalProductVariant extends IDataObject {
	variant_id: number | string;
	name?: string;
	price?: number;
	quantity?: number;
	sku?: string;
	ean?: string;
	asin?: string;
}

export interface IBaseLinkerExternalProductData extends IDataObject {
	product_id: string;
	sku?: string;
	ean?: string;
	asin?: string;
	name: string;
	quantity: number;
	price_netto?: number;
	price_brutto?: number;
	price_wholesale_netto?: number;
	tax_rate?: number;
	weight?: number;
	description?: string;
	description_extra1?: string;
	description_extra2?: string;
	man_name?: string;
	man_image?: string;
	category_id?: number;
	images?: string[];
	features?: Record<string, string> | Array<[string, string]>;
	variants?: IBaseLinkerExternalProductVariant[];
	[key: string]: any;
}

export interface IBaseLinkerExternalProductQuantityVariant extends IDataObject {
	variant_id: string;
	quantity: number;
}

export interface IBaseLinkerExternalProductQuantityItem extends IDataObject {
	product_id: string;
	quantity: number;
	variants?: IBaseLinkerExternalProductQuantityVariant[];
}

export interface IBaseLinkerExternalProductPriceVariant extends IDataObject {
	variant_id: string;
	price: number;
}

export interface IBaseLinkerExternalProductPriceItem extends IDataObject {
	product_id: string;
	price: number;
	variants?: IBaseLinkerExternalProductPriceVariant[];
}

export interface IBaseLinkerUpdateExternalStorageProductsQuantityResponse extends IDataObject {
	counter: number;
	warnings?: Record<string, string> | string;
}
