import { IDataObject } from 'n8n-workflow';

export interface IBaseLinkerInventory {
	inventory_id: number;
	name: string;
	description: string;
	languages: string[];
	default_language: string;
	price_groups: number[];
	default_price_group: number;
	warehouses: string[];
	default_warehouse: string;
	reservations: boolean;
	is_default: boolean;
	[key: string]: any;
}

export interface IBaseLinkerWarehouse {
	warehouse_type: string;
	warehouse_id: number;
	internal_warehouse_id: number;
	name: string;
	description: string;
	stock_edition: boolean;
	is_default: boolean;
	address: string;
	postcode: string;
	city: string;
	country: string;
	[key: string]: any;
}

export interface IBaseLinkerProductListItem {
	id: number;
	parent_id: number;
	ean: string;
	sku: string;
	name: string;
	prices: Record<string, number>;
	stock: Record<string, number>;
	[key: string]: any;
}

export interface IBaseLinkerProductDetail {
	id?: number;
	is_bundle: boolean;
	parent_id: number;
	sku: string;
	ean: string;
	ean_additional?: Array<{ ean: string; quantity: number }>;
	asin?: string;
	tags?: string[];
	tax_rate: number;
	weight: number;
	height: number;
	width: number;
	length: number;
	star?: number;
	category_id: number;
	manufacturer_id?: number;
	prices: Record<string, number>;
	stock: Record<string, number>;
	reservations?: Record<string, number>;
	thresholds?: Record<string, number>;
	incoming?: Record<string, number>;
	locations?: Record<string, string>;
	text_fields: Record<string, any>;
	average_cost?: number;
	average_landed_cost?: number;
	bundle_products?: Record<string, number>;
	images?: Record<string, string>;
	videos?: Record<string, string>;
	media_options?: Record<string, number>;
	links?: Record<string, { product_id: string | number; variant_id: string | number }>;
	variants?: Record<string, any>;
	stock_erp_units?: Record<string, any[]>;
	stock_wms_units?: Record<string, any[]>;
	suppliers?: Array<{ id: number; product_code: string; cost: number }>;
	relations?: Array<{ product_id: number; relation_type: string }>;
	shipping_template?: Record<string, string>;
	[key: string]: any;
}

export interface IBaseLinkerProductStockItem {
	product_id: number;
	stock: Record<string, number>;
	reservations?: Record<string, number>;
	variants?: Record<string, Record<string, number>>;
	variant_reservations?: Record<string, Record<string, number>>;
	[key: string]: any;
}

export interface IBaseLinkerProductPriceItem {
	product_id: number;
	prices: Record<string, number>;
	variants?: Record<string, Record<string, number>>;
	[key: string]: any;
}

export interface IBaseLinkerProductLogEntry {
	type: number;
	from?: any;
	to?: any;
	info?: any;
	[key: string]: any;
}

export interface IBaseLinkerProductLog {
	profile: string;
	date: number;
	entries: IBaseLinkerProductLogEntry[];
	[key: string]: any;
}

export interface IBaseLinkerCategory {
	category_id: number;
	name: string;
	parent_id: number;
	[key: string]: any;
}

export interface IBaseLinkerManufacturer {
	manufacturer_id: number;
	name: string;
	[key: string]: any;
}

export interface IBaseLinkerPriceGroup {
	price_group_id: number;
	name: string;
	description?: string;
	currency: string;
	is_default?: boolean;
	[key: string]: any;
}

export interface IBaseLinkerTag {
	tag_id: number;
	name: string;
	[key: string]: any;
}

export interface IBaseLinkerInventoryExtraField {
	extra_field_id: number;
	name: string;
	editor_type?: string;
	[key: string]: any;
}

export interface IBaseLinkerInventoryMap {
	map_id: number;
	name: string;
	[key: string]: any;
}

export interface IBaseLinkerInventoryParameter {
	parameter_id: number;
	name: string;
	[key: string]: any;
}

export interface IBaseLinkerShippingTemplate {
	template_id: number | string;
	name: string;
	[key: string]: any;
}

export interface IBaseLinkerInventoryPrintoutTemplate {
	printout_id: number;
	name: string;
	[key: string]: any;
}

export interface IBaseLinkerSyncLog {
	log_id: number;
	date: number;
	source: string;
	[key: string]: any;
}

export interface IBaseLinkerPromotion {
	promotion_id: number;
	[key: string]: any;
}

export interface IBaseLinkerWarehouseLocation {
	location_id: number;
	name: string;
	warehouse_id: number;
	warehouse_type: string;
	[key: string]: any;
}

export interface IBaseLinkerWarehouseLocationType {
	location_type_id: number;
	name: string;
	[key: string]: any;
}

export interface IBaseLinkerWarehouseZone {
	zone_id: number;
	name: string;
	[key: string]: any;
}

export interface IBaseLinkerWarehouseRack {
	rack_id: number;
	name: string;
	zone_id?: number;
	[key: string]: any;
}

export interface IBaseLinkerSupplier {
	supplier_id: number;
	name: string;
	[key: string]: any;
}

export interface IBaseLinkerPayer {
	payer_id: number;
	name: string;
	[key: string]: any;
}

export interface IBaseLinkerDocument {
	document_id: number;
	document_type: number;
	document_status: number;
	warehouse_id: number;
	[key: string]: any;
}

export interface IBaseLinkerDocumentItem {
	item_id?: number;
	product_id: number;
	quantity: number;
	price?: number;
	[key: string]: any;
}

export interface IBaseLinkerDocumentSeries {
	series_id: number;
	name: string;
	format: string;
	warehouse_id: number;
	[key: string]: any;
}

export interface IBaseLinkerPurchaseOrder {
	order_id: number;
	status: number;
	warehouse_id: number;
	supplier_id?: number;
	[key: string]: any;
}

export interface IBaseLinkerPurchaseOrderItem {
	item_id?: number;
	product_id: number;
	quantity: number;
	item_cost?: number;
	[key: string]: any;
}

export interface IBaseLinkerPurchaseOrderSeries {
	series_id: number;
	name: string;
	format: string;
	warehouse_id: number;
	[key: string]: any;
}

export interface IBaseLinkerPurchaseOrderLog {
	log_id?: number;
	order_id?: number;
	date: number;
	[key: string]: any;
}

export interface IBaseLinkerTransfer {
	transfer_id: number;
	warehouse_id: number;
	target_warehouse_id: number;
	status: number;
	[key: string]: any;
}

export interface IBaseLinkerTransferItem {
	item_id?: number;
	product_id: number;
	quantity: number;
	[key: string]: any;
}

export interface IBaseLinkerTransferSeries {
	series_id: number;
	name: string;
	format: string;
	warehouse_id: number;
	[key: string]: any;
}

export interface IBaseLinkerStocktake {
	stocktake_id: number;
	warehouse_id: number;
	status: number;
	[key: string]: any;
}

export interface IBaseLinkerStocktakeItem {
	item_id?: number;
	product_id: number;
	quantity: number;
	[key: string]: any;
}

export interface IBaseLinkerStocktakeSeries {
	series_id: number;
	name: string;
	format: string;
	warehouse_id: number;
	[key: string]: any;
}

export interface IBaseLinkerFulfillmentDelivery {
	delivery_id: number;
	warehouse_id?: number;
	fulfillment_warehouse_id?: number;
	status?: number;
	[key: string]: any;
}

export interface IBaseLinkerFulfillmentDeliveryItem {
	delivery_id?: number;
	product_id: number;
	quantity: number;
	[key: string]: any;
}

