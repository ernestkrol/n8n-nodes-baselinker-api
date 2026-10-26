import { INodeProperties } from 'n8n-workflow';

export const productCatalogOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
			},
		},
		options: [
			{
				name: 'Add / Update Catalog',
				value: 'addInventory',
				description: 'Create a new catalog or update an existing one (method: addInventory)',
				action: 'Add or update catalog',
			},
			{
				name: 'Add / Update Category',
				value: 'addInventoryCategory',
				description: 'Create a new product category or update an existing one (method: addInventoryCategory)',
				action: 'Add or update category',
			},
			{
				name: 'Add / Update Document',
				value: 'addInventoryDocument',
				description: 'Create a new inventory document (method: addInventoryDocument)',
				action: 'Add document',
			},
			{
				name: 'Add / Update Document File',
				value: 'addInventoryDocumentFile',
				description: 'Attach an external PDF file to a warehouse document (method: addInventoryDocumentFile)',
				action: 'Add document file',
			},
			{
				name: 'Add / Update Document Items',
				value: 'addInventoryDocumentItems',
				description: 'Add or update items in an inventory document (method: addInventoryDocumentItems)',
				action: 'Add or update document items',
			},
			{
				name: 'Add / Update Fulfillment Delivery',
				value: 'addInventoryFulfillmentDelivery',
				description: 'Create a new fulfillment delivery (method: addInventoryFulfillmentDelivery)',
				action: 'Add fulfillment delivery',
			},
			{
				name: 'Add / Update Fulfillment Delivery Items',
				value: 'addInventoryFulfillmentDeliveryItems',
				description: 'Add products to a fulfillment delivery (method: addInventoryFulfillmentDeliveryItems)',
				action: 'Add fulfillment delivery items',
			},
			{
				name: 'Add / Update Manufacturer',
				value: 'addInventoryManufacturer',
				description: 'Create a new manufacturer or update an existing one (method: addInventoryManufacturer)',
				action: 'Add manufacturer',
			},
			{
				name: 'Add / Update Payer',
				value: 'addInventoryPayer',
				description: 'Add or update a payer in Base storage (method: addInventoryPayer)',
				action: 'Add or update payer',
			},
			{
				name: 'Add / Update Price Group',
				value: 'addInventoryPriceGroup',
				description: 'Create a new price group or update an existing one (method: addInventoryPriceGroup)',
				action: 'Add or update price group',
			},
			{
				name: 'Add / Update Product',
				value: 'addInventoryProduct',
				description: 'Add a new product or update an existing product in Base catalog (method: addInventoryProduct)',
				action: 'Add or update product',
			},
			{
				name: 'Add / Update Promotion',
				value: 'addInventoryPromotion',
				description: 'Create or update an account-level catalog promotion (method: addInventoryPromotion)',
				action: 'Add or update promotion',
			},
			{
				name: 'Add / Update Purchase Order',
				value: 'addInventoryPurchaseOrder',
				description: 'Create a new purchase order (method: addInventoryPurchaseOrder)',
				action: 'Add purchase order',
			},
			{
				name: 'Add / Update Purchase Order File',
				value: 'addInventoryPurchaseOrderFile',
				description: 'Attach a cost invoice PDF file to a purchase order (method: addInventoryPurchaseOrderFile)',
				action: 'Add purchase order file',
			},
			{
				name: 'Add / Update Purchase Order Items',
				value: 'addInventoryPurchaseOrderItems',
				description: 'Add or update items in a purchase order (method: addInventoryPurchaseOrderItems)',
				action: 'Add or update purchase order items',
			},
			{
				name: 'Add / Update Stocktake',
				value: 'addInventoryStocktake',
				description: 'Create a new stocktake count (method: addInventoryStocktake)',
				action: 'Add stocktake',
			},
			{
				name: 'Add / Update Stocktake Items',
				value: 'addInventoryStocktakeItems',
				description: 'Add or update items in a stocktake (method: addInventoryStocktakeItems)',
				action: 'Add or update stocktake items',
			},
			{
				name: 'Add / Update Supplier',
				value: 'addInventorySupplier',
				description: 'Add or update a supplier in Base storage (method: addInventorySupplier)',
				action: 'Add or update supplier',
			},
			{
				name: 'Add / Update Tag',
				value: 'addInventoryTag',
				description: 'Create a new product tag or update an existing one (method: addInventoryTag)',
				action: 'Add or update tag',
			},
			{
				name: 'Add / Update Transfer',
				value: 'addInventoryTransfer',
				description: 'Create a new inventory transfer (method: addInventoryTransfer)',
				action: 'Add transfer',
			},
			{
				name: 'Add / Update Transfer Items',
				value: 'addInventoryTransferItems',
				description: 'Add or update planning items in an inventory transfer (method: addInventoryTransferItems)',
				action: 'Add or update transfer items',
			},
			{
				name: 'Add / Update Warehouse',
				value: 'addInventoryWarehouse',
				description: 'Create a new warehouse or update an existing one (method: addInventoryWarehouse)',
				action: 'Add or update warehouse',
			},
			{
				name: 'Add / Update Warehouse Location',
				value: 'addInventoryWarehouseLocation',
				description: 'Add or update a warehouse location (method: addInventoryWarehouseLocation)',
				action: 'Add or update warehouse location',
			},
			{
				name: 'Add / Update Warehouse Location Type',
				value: 'addInventoryWarehouseLocationType',
				description: 'Add or update a warehouse location type (method: addInventoryWarehouseLocationType)',
				action: 'Add or update location type',
			},
			{
				name: 'Add / Update Warehouse Rack',
				value: 'addInventoryWarehouseRack',
				description: 'Add or update a warehouse rack (method: addInventoryWarehouseRack)',
				action: 'Add or update warehouse rack',
			},
			{
				name: 'Add / Update Warehouse Zone',
				value: 'addInventoryWarehouseZone',
				description: 'Add or update a warehouse zone (method: addInventoryWarehouseZone)',
				action: 'Add or update warehouse zone',
			},
			{
				name: 'Confirm Document Status',
				value: 'setInventoryDocumentStatusConfirmed',
				description: 'Confirm an inventory document and update warehouse stock (method: setInventoryDocumentStatusConfirmed)',
				action: 'Confirm document status',
			},
			{
				name: 'Delete Catalog',
				value: 'deleteInventory',
				description: 'Delete a product catalog from Base storage (method: deleteInventory)',
				action: 'Delete catalog',
			},
			{
				name: 'Delete Category',
				value: 'deleteInventoryCategory',
				description: 'Delete a product category from Base catalog (method: deleteInventoryCategory)',
				action: 'Delete category',
			},
			{
				name: 'Delete Manufacturer',
				value: 'deleteInventoryManufacturer',
				description: 'Delete a manufacturer from Base catalog (method: deleteInventoryManufacturer)',
				action: 'Delete manufacturer',
			},
			{
				name: 'Delete Payer',
				value: 'deleteInventoryPayer',
				description: 'Remove a payer from Base storage (method: deleteInventoryPayer)',
				action: 'Delete payer',
			},
			{
				name: 'Delete Price Group',
				value: 'deleteInventoryPriceGroup',
				description: 'Delete a price group from Base storage (method: deleteInventoryPriceGroup)',
				action: 'Delete price group',
			},
			{
				name: 'Delete Product',
				value: 'deleteInventoryProduct',
				description: 'Delete a product from Base catalog (method: deleteInventoryProduct)',
				action: 'Delete product',
			},
			{
				name: 'Delete Purchase Order Items',
				value: 'deleteInventoryPurchaseOrderItems',
				description: 'Remove items from a purchase order in draft status (method: deleteInventoryPurchaseOrderItems)',
				action: 'Delete purchase order items',
			},
			{
				name: 'Delete Supplier',
				value: 'deleteInventorySupplier',
				description: 'Remove a supplier from Base storage (method: deleteInventorySupplier)',
				action: 'Delete supplier',
			},
			{
				name: 'Delete Tag',
				value: 'deleteInventoryTag',
				description: 'Delete a tag from Base catalog (method: deleteInventoryTag)',
				action: 'Delete tag',
			},
			{
				name: 'Delete Warehouse',
				value: 'deleteInventoryWarehouse',
				description: 'Delete a warehouse from Base inventories (method: deleteInventoryWarehouse)',
				action: 'Delete warehouse',
			},
			{
				name: 'Delete Warehouse Location',
				value: 'deleteInventoryWarehouseLocation',
				description: 'Delete a single warehouse location (method: deleteInventoryWarehouseLocation)',
				action: 'Delete warehouse location',
			},
			{
				name: 'Delete Warehouse Location Type',
				value: 'deleteInventoryWarehouseLocationType',
				description: 'Delete a warehouse location type (method: deleteInventoryWarehouseLocationType)',
				action: 'Delete location type',
			},
			{
				name: 'Delete Warehouse Rack',
				value: 'deleteInventoryWarehouseRack',
				description: 'Delete a warehouse rack (method: deleteInventoryWarehouseRack)',
				action: 'Delete warehouse rack',
			},
			{
				name: 'Delete Warehouse Zone',
				value: 'deleteInventoryWarehouseZone',
				description: 'Delete a warehouse zone (method: deleteInventoryWarehouseZone)',
				action: 'Delete warehouse zone',
			},
			{
				name: 'Get Available Text Field Keys',
				value: 'getInventoryAvailableTextFieldKeys',
				description: 'List product text fields that can be overwritten per integration (method: getInventoryAvailableTextFieldKeys)',
				action: 'Get available text field keys',
			},
			{
				name: 'Get Catalogs (Inventories)',
				value: 'getInventories',
				description: 'Retrieve a list of catalogs available in Base storage (method: getInventories)',
				action: 'Get catalogs',
			},
			{
				name: 'Get Categories',
				value: 'getInventoryCategories',
				description: 'Retrieve a list of categories for a Base catalog (method: getInventoryCategories)',
				action: 'Get categories',
			},
			{
				name: 'Get Document File',
				value: 'getInventoryDocumentFile',
				description: 'Download a warehouse document PDF file (method: getInventoryDocumentFile)',
				action: 'Get document file',
			},
			{
				name: 'Get Document Items',
				value: 'getInventoryDocumentItems',
				description: 'Retrieve items for an inventory document (method: getInventoryDocumentItems)',
				action: 'Get document items',
			},
			{
				name: 'Get Document Series',
				value: 'getInventoryDocumentSeries',
				description: 'Retrieve available inventory document series (method: getInventoryDocumentSeries)',
				action: 'Get document series',
			},
			{
				name: 'Get Documents',
				value: 'getInventoryDocuments',
				description: 'Retrieve a list of inventory documents from Base (method: getInventoryDocuments)',
				action: 'Get documents',
			},
			{
				name: 'Get Extra Fields',
				value: 'getInventoryExtraFields',
				description: 'Retrieve a list of extra fields for a Base catalog (method: getInventoryExtraFields)',
				action: 'Get extra fields',
			},
			{
				name: 'Get Fulfillment Deliveries',
				value: 'getInventoryFulfillmentDeliveries',
				description: 'Retrieve a list of fulfillment deliveries with filtering (method: getInventoryFulfillmentDeliveries)',
				action: 'Get fulfillment deliveries',
			},
			{
				name: 'Get Fulfillment Delivery Items',
				value: 'getInventoryFulfillmentDeliveryItems',
				description: 'Retrieve items from a specific fulfillment delivery (method: getInventoryFulfillmentDeliveryItems)',
				action: 'Get fulfillment delivery items',
			},
			{
				name: 'Get Fulfillment Delivery Labels',
				value: 'getInventoryFulfillmentDeliveryLabels',
				description: 'Download labels for a specific fulfillment delivery (method: getInventoryFulfillmentDeliveryLabels)',
				action: 'Get fulfillment delivery labels',
			},
			{
				name: 'Get Integrations',
				value: 'getInventoryIntegrations',
				description: 'List integrations where catalog text values can be overwritten (method: getInventoryIntegrations)',
				action: 'Get integrations',
			},
			{
				name: 'Get Location Types',
				value: 'getInventoryWarehouseLocationTypes',
				description: 'List warehouse location types (method: getInventoryWarehouseLocationTypes)',
				action: 'Get location types',
			},
			{
				name: 'Get Manufacturers',
				value: 'getInventoryManufacturers',
				description: 'Retrieve a list of manufacturers for a Base catalog (method: getInventoryManufacturers)',
				action: 'Get manufacturers',
			},
			{
				name: 'Get Payers',
				value: 'getInventoryPayers',
				description: 'Retrieve a list of payers available in BaseLinker storage (method: getInventoryPayers)',
				action: 'Get payers',
			},
			{
				name: 'Get Price Groups',
				value: 'getInventoryPriceGroups',
				description: 'Retrieve price groups existing in Base storage (method: getInventoryPriceGroups)',
				action: 'Get price groups',
			},
			{
				name: 'Get Printout Templates',
				value: 'getInventoryPrintoutTemplates',
				description: 'List configured printout templates available for inventory (method: getInventoryPrintoutTemplates)',
				action: 'Get printout templates',
			},
			{
				name: 'Get Product Change Logs',
				value: 'getInventoryProductLogs',
				description: 'Retrieve event history for product and variant edits (method: getInventoryProductLogs)',
				action: 'Get product change logs',
			},
			{
				name: 'Get Product Parameters',
				value: 'getInventoryParameters',
				description: 'Returns predefined inventory parameters and translations (method: getInventoryParameters)',
				action: 'Get product parameters',
			},
			{
				name: 'Get Product Prices',
				value: 'getInventoryProductsPrices',
				description: 'Retrieve gross prices of products per price group (method: getInventoryProductsPrices)',
				action: 'Get product prices',
			},
			{
				name: 'Get Product Stock',
				value: 'getInventoryProductsStock',
				description: 'Retrieve stock levels and reservations per warehouse (method: getInventoryProductsStock)',
				action: 'Get product stock',
			},
			{
				name: 'Get Products (Detailed)',
				value: 'getInventoryProductsData',
				description: 'Retrieve detailed data for selected products (method: getInventoryProductsData)',
				action: 'Get products (detailed)',
			},
			{
				name: 'Get Products (List)',
				value: 'getInventoryProductsList',
				description: 'Retrieve a list of products with basic data and pagination (method: getInventoryProductsList)',
				action: 'Get products (list)',
			},
			{
				name: 'Get Promotions List',
				value: 'getInventoryPromotionsList',
				description: 'Returns account-level catalog promotion definitions (method: getInventoryPromotionsList)',
				action: 'Get promotions list',
			},
			{
				name: 'Get Purchase Order File',
				value: 'getInventoryPurchaseOrderFile',
				description: 'Download a cost invoice PDF file attached to a purchase order (method: getInventoryPurchaseOrderFile)',
				action: 'Get purchase order file',
			},
			{
				name: 'Get Purchase Order Items',
				value: 'getInventoryPurchaseOrderItems',
				description: 'Retrieve items from a specific purchase order (method: getInventoryPurchaseOrderItems)',
				action: 'Get purchase order items',
			},
			{
				name: 'Get Purchase Order Logs',
				value: 'getInventoryPurchaseOrderLogs',
				description: 'Returns a list of log entries for a purchase order (method: getInventoryPurchaseOrderLogs)',
				action: 'Get purchase order logs',
			},
			{
				name: 'Get Purchase Order Series',
				value: 'getInventoryPurchaseOrderSeries',
				description: 'Retrieve a list of available purchase order series (method: getInventoryPurchaseOrderSeries)',
				action: 'Get purchase order series',
			},
			{
				name: 'Get Purchase Orders',
				value: 'getInventoryPurchaseOrders',
				description: 'Retrieve a list of purchase orders from Base storage (method: getInventoryPurchaseOrders)',
				action: 'Get purchase orders',
			},
			{
				name: 'Get Shipping Templates',
				value: 'getInventoryShippingTemplates',
				description: 'Returns available delivery schemas for marketplace integrations (method: getInventoryShippingTemplates)',
				action: 'Get shipping templates',
			},
			{
				name: 'Get Stocktake Items',
				value: 'getInventoryStocktakeItems',
				description: 'Retrieve items from a specific stocktake (method: getInventoryStocktakeItems)',
				action: 'Get stocktake items',
			},
			{
				name: 'Get Stocktake Series',
				value: 'getInventoryStocktakeSeries',
				description: 'Retrieve available stocktake numbering series (method: getInventoryStocktakeSeries)',
				action: 'Get stocktake series',
			},
			{
				name: 'Get Stocktakes',
				value: 'getInventoryStocktakes',
				description: 'Retrieve a paginated list of stocktakes (method: getInventoryStocktakes)',
				action: 'Get stocktakes',
			},
			{
				name: 'Get Suppliers',
				value: 'getInventorySuppliers',
				description: 'Retrieve a list of suppliers available in BaseLinker storage (method: getInventorySuppliers)',
				action: 'Get suppliers',
			},
			{
				name: 'Get Sync Log List',
				value: 'getSyncLogList',
				description: 'Returns price and stock synchronization logs (method: getSyncLogList)',
				action: 'Get sync log list',
			},
			{
				name: 'Get Tags',
				value: 'getInventoryTags',
				description: 'Retrieve a list of tags for a Base catalog (method: getInventoryTags)',
				action: 'Get tags',
			},
			{
				name: 'Get Transfer Items',
				value: 'getInventoryTransferItems',
				description: 'Retrieve items from a specific inventory transfer (method: getInventoryTransferItems)',
				action: 'Get transfer items',
			},
			{
				name: 'Get Transfer Series',
				value: 'getInventoryTransferSeries',
				description: 'Retrieve available transfer numbering series (method: getInventoryTransferSeries)',
				action: 'Get transfer series',
			},
			{
				name: 'Get Transfers',
				value: 'getInventoryTransfers',
				description: 'Retrieve a list of inventory transfers (method: getInventoryTransfers)',
				action: 'Get transfers',
			},
			{
				name: 'Get Warehouse Locations',
				value: 'getInventoryWarehouseLocations',
				description: 'Retrieve warehouse locations (slots/bins) for a warehouse (method: getInventoryWarehouseLocations)',
				action: 'Get warehouse locations',
			},
			{
				name: 'Get Warehouse Map Details',
				value: 'getInventoryMapDetails',
				description: 'Retrieve detailed information and visual map layout (method: getInventoryMapDetails)',
				action: 'Get warehouse map details',
			},
			{
				name: 'Get Warehouse Maps',
				value: 'getInventoryMaps',
				description: 'Retrieve a list of warehouse maps (method: getInventoryMaps)',
				action: 'Get warehouse maps',
			},
			{
				name: 'Get Warehouse Racks',
				value: 'getInventoryWarehouseRacks',
				description: 'Retrieve the list of warehouse racks (method: getInventoryWarehouseRacks)',
				action: 'Get warehouse racks',
			},
			{
				name: 'Get Warehouse Zones',
				value: 'getInventoryWarehouseZones',
				description: 'Retrieve the list of warehouse zones (method: getInventoryWarehouseZones)',
				action: 'Get warehouse zones',
			},
			{
				name: 'Get Warehouses',
				value: 'getInventoryWarehouses',
				description: 'Retrieve a list of warehouses available in Base inventories (method: getInventoryWarehouses)',
				action: 'Get warehouses',
			},
			{
				name: 'Link Products to Fulfillment',
				value: 'runFulfillmentLinkProducts',
				description: 'Synchronously link selected products to a fulfillment warehouse (method: runFulfillmentLinkProducts)',
				action: 'Link products to fulfillment',
			},
			{
				name: 'Run Product Macro Trigger',
				value: 'runProductMacroTrigger',
				description: 'Run personal trigger for product automatic actions (method: runProductMacroTrigger)',
				action: 'Run product macro trigger',
			},
			{
				name: 'Set Purchase Order Status',
				value: 'setInventoryPurchaseOrderStatus',
				description: 'Change status of a purchase order and mark completed items (method: setInventoryPurchaseOrderStatus)',
				action: 'Set purchase order status',
			},
			{
				name: 'Set Stocktake Status',
				value: 'setInventoryStocktakeStatus',
				description: 'Change status of a stocktake and apply verified quantities (method: setInventoryStocktakeStatus)',
				action: 'Set stocktake status',
			},
			{
				name: 'Set Transfer Status',
				value: 'setInventoryTransferStatus',
				description: 'Change status of an inventory transfer (method: setInventoryTransferStatus)',
				action: 'Set transfer status',
			},
			{
				name: 'Submit Fulfillment Delivery',
				value: 'runInventoryFulfillmentDeliverySubmission',
				description: 'Submit and register fulfillment delivery with fulfillment center (method: runInventoryFulfillmentDeliverySubmission)',
				action: 'Submit fulfillment delivery',
			},
			{
				name: 'Update Product Prices (Bulk)',
				value: 'updateInventoryProductsPrices',
				description: 'Bulk update gross prices of products and variants (method: updateInventoryProductsPrices)',
				action: 'Update product prices',
			},
			{
				name: 'Update Product Stock (Bulk)',
				value: 'updateInventoryProductsStock',
				description: 'Bulk update stock levels of products and variants (method: updateInventoryProductsStock)',
				action: 'Update product stock',
			},
		],
		default: 'getInventoryProductsList',
	},
];

export const productCatalogFields: INodeProperties[] = [
// ----------------------------------
	//   Fields for getInventoryProductsList
	// ----------------------------------
	{
		displayName: 'Catalog Name or ID',
		name: 'inventory_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getInventories',
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryProductsList'],
				parameterMode: ['fields'],
			},
		},
		description: 'Catalog ID. Choose from the list, or specify an ID using an <expression>.',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryProductsList'],
				parameterMode: ['fields'],
			},
		},
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryProductsList'],
				parameterMode: ['fields'],
				returnAll: [false],
			},
		},
		description: 'Page number of results to fetch (up to 1000 products per page)',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 100,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryProductsList'],
				parameterMode: ['fields'],
			},
		},
		description: 'Max number of results to return. If Return All is true, 0 or empty means fetch all available records.',
	},
	{
		displayName: 'Delay Between Requests (ms)',
		name: 'delayMs',
		type: 'number',
		typeOptions: {
			minValue: 0,
		},
		default: 650,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryProductsList'],
				parameterMode: ['fields'],
				returnAll: [true],
			},
		},
		description: 'Delay in milliseconds between pagination requests to comply with the 100 req/min API rate limit',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryProductsList'],
				parameterMode: ['fields'],
			},
		},
		options: [
			{
				displayName: 'Product ID',
				name: 'filter_id',
				type: 'number',
				default: '',
				description: 'Limit results to a specific product ID',
			},
			{
				displayName: 'Category ID',
				name: 'filter_category_id',
				type: 'number',
				default: '',
				description: 'Retrieve products from a specific category',
			},
			{
				displayName: 'Tag ID',
				name: 'filter_tag',
				type: 'number',
				default: '',
				description: 'Limit results to products assigned to the specified inventory tag ID',
			},
			{
				displayName: 'EAN',
				name: 'filter_ean',
				type: 'string',
				default: '',
				description: 'Limit results to a specific EAN (including additional product EANs)',
			},
			{
				displayName: 'SKU',
				name: 'filter_sku',
				type: 'string',
				default: '',
				description: 'Limit results to a specific SKU (stock keeping unit)',
			},
			{
				displayName: 'Name',
				name: 'filter_name',
				type: 'string',
				default: '',
				description: 'Item name filter (part of the searched name)',
			},
			{
				displayName: 'Price From',
				name: 'filter_price_from',
				type: 'number',
				default: '',
				description: 'Minimum gross price limit',
			},
			{
				displayName: 'Price To',
				name: 'filter_price_to',
				type: 'number',
				default: '',
				description: 'Maximum gross price limit',
			},
			{
				displayName: 'Stock From',
				name: 'filter_stock_from',
				type: 'number',
				default: '',
				description: 'Minimum stock quantity limit',
			},
			{
				displayName: 'Stock To',
				name: 'filter_stock_to',
				type: 'number',
				default: '',
				description: 'Maximum stock quantity limit',
			},
			{
				displayName: 'Sort',
				name: 'filter_sort',
				type: 'options',
				options: [
					{
						name: 'ID Ascending',
						value: 'id ASC',
					},
					{
						name: 'ID Descending',
						value: 'id DESC',
					},
				],
				default: 'id ASC',
				description: 'Sorting of the product list',
			},
			{
				displayName: 'Location',
				name: 'filter_locations',
				type: 'string',
				default: '',
				description: 'Filter results by location name',
			},
			{
				displayName: 'Include Variants',
				name: 'include_variants',
				type: 'boolean',
				default: false,
				description: 'Whether to include product variants additionally to products',
			},
		],
	},

	// ----------------------------------
	//   Fields for getInventoryProductsData
	// ----------------------------------
	{
		displayName: 'Catalog Name or ID',
		name: 'inventory_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getInventories',
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryProductsData'],
				parameterMode: ['fields'],
			},
		},
		description: 'Catalog ID. Choose from the list, or specify an ID using an <expression>.',
	},
	{
		displayName: 'Product IDs',
		name: 'products',
		type: 'string',
		default: '',
		placeholder: 'e.g. 2685 or 2685, 2686',
		required: true,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryProductsData'],
				parameterMode: ['fields'],
			},
		},
		description: 'Comma-separated list of product IDs or a JSON array of IDs',
	},
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryProductsData'],
				parameterMode: ['fields'],
			},
		},
		options: [
			{
				displayName: 'Include Additional EANs',
				name: 'include_additional_eans',
				type: 'boolean',
				default: false,
				description: 'Whether to include additional product EANs in the response',
			},
			{
				displayName: 'Include Channels Media',
				name: 'include_channels_media',
				type: 'boolean',
				default: false,
				description: 'Whether to include channel-specific media overrides and media_options in the response',
			},
			{
				displayName: 'Include ERP Units',
				name: 'include_erp_units',
				type: 'boolean',
				default: false,
				description: 'Whether to include ERP units in the response',
			},
			{
				displayName: 'Include Marketplace Categories',
				name: 'include_marketplace_categories',
				type: 'boolean',
				default: false,
				description: 'Whether to include marketplace category assignments in text_fields',
			},
			{
				displayName: 'Include Relations',
				name: 'include_relations',
				type: 'boolean',
				default: false,
				description: 'Whether to include product relationships (related, substitution, upsell, downsell, crosssell)',
			},
			{
				displayName: 'Include Shipping Templates',
				name: 'include_shipping_templates',
				type: 'boolean',
				default: false,
				description: 'Whether to include shipping template assignments per integration channel',
			},
			{
				displayName: 'Include Suppliers',
				name: 'include_suppliers',
				type: 'boolean',
				default: false,
				description: 'Whether to include suppliers data in the response',
			},
			{
				displayName: 'Include WMS Units',
				name: 'include_wms_units',
				type: 'boolean',
				default: false,
				description: 'Whether to include WMS units in the response',
			},
		],
	},

	// ----------------------------------
	//   Fields for getInventoryProductsStock
	// ----------------------------------
	{
		displayName: 'Catalog Name or ID',
		name: 'inventory_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getInventories',
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryProductsStock'],
				parameterMode: ['fields'],
			},
		},
		description: 'Catalog ID. Choose from the list, or specify an ID using an <expression>.',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryProductsStock'],
				parameterMode: ['fields'],
			},
		},
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryProductsStock'],
				parameterMode: ['fields'],
				returnAll: [false],
			},
		},
		description: 'Page number of results to fetch (up to 1000 products per page)',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 100,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryProductsStock'],
				parameterMode: ['fields'],
			},
		},
		description: 'Max number of results to return. If Return All is true, 0 or empty means fetch all available records.',
	},
	{
		displayName: 'Delay Between Requests (ms)',
		name: 'delayMs',
		type: 'number',
		typeOptions: {
			minValue: 0,
		},
		default: 650,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryProductsStock'],
				parameterMode: ['fields'],
				returnAll: [true],
			},
		},
		description: 'Delay in milliseconds between pagination requests to comply with the 100 req/min API rate limit',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryProductsStock'],
				parameterMode: ['fields'],
			},
		},
		options: [
			{
				displayName: 'Product ID',
				name: 'filter_id',
				type: 'number',
				default: '',
				description: 'Limit results to a specific product ID',
			},
			{
				displayName: 'Category ID',
				name: 'filter_category_id',
				type: 'number',
				default: '',
				description: 'Limit results to products from a specific category',
			},
			{
				displayName: 'EAN',
				name: 'filter_ean',
				type: 'string',
				default: '',
				description: 'Limit results to a specific EAN (including additional product EANs)',
			},
			{
				displayName: 'SKU',
				name: 'filter_sku',
				type: 'string',
				default: '',
				description: 'Limit results to a specific SKU (stock keeping unit)',
			},
			{
				displayName: 'Name',
				name: 'filter_name',
				type: 'string',
				default: '',
				description: 'Product name filter (part of the searched name)',
			},
			{
				displayName: 'ASIN',
				name: 'filter_asin',
				type: 'string',
				default: '',
				description: 'Limit results to a specific ASIN',
			},
			{
				displayName: 'Stock From',
				name: 'filter_stock_from',
				type: 'number',
				default: '',
				description: 'Minimum stock quantity limit',
			},
			{
				displayName: 'Stock To',
				name: 'filter_stock_to',
				type: 'number',
				default: '',
				description: 'Maximum stock quantity limit',
			},
			{
				displayName: 'Sort',
				name: 'filter_sort',
				type: 'options',
				options: [
					{
						name: 'ID Ascending',
						value: 'id ASC',
					},
					{
						name: 'ID Descending',
						value: 'id DESC',
					},
				],
				default: 'id ASC',
				description: 'Sort the returned products',
			},
			{
				displayName: 'Location',
				name: 'filter_locations',
				type: 'string',
				default: '',
				description: 'Filter results by location name',
			},
		],
	},

	// ----------------------------------
	//   Fields for getInventoryProductsPrices
	// ----------------------------------
	{
		displayName: 'Catalog Name or ID',
		name: 'inventory_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getInventories',
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryProductsPrices'],
				parameterMode: ['fields'],
			},
		},
		description: 'Catalog ID. Choose from the list, or specify an ID using an <expression>.',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryProductsPrices'],
				parameterMode: ['fields'],
			},
		},
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryProductsPrices'],
				parameterMode: ['fields'],
				returnAll: [false],
			},
		},
		description: 'Page number of results to fetch (up to 1000 products per page)',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 100,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryProductsPrices'],
				parameterMode: ['fields'],
			},
		},
		description: 'Max number of results to return. If Return All is true, 0 or empty means fetch all available records.',
	},
	{
		displayName: 'Delay Between Requests (ms)',
		name: 'delayMs',
		type: 'number',
		typeOptions: {
			minValue: 0,
		},
		default: 650,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryProductsPrices'],
				parameterMode: ['fields'],
				returnAll: [true],
			},
		},
		description: 'Delay in milliseconds between pagination requests to comply with the 100 req/min API rate limit',
	},

	// ----------------------------------
	//   Fields for getInventoryProductLogs
	// ----------------------------------
	{
		displayName: 'Product ID',
		name: 'product_id',
		type: 'number',
		default: '',
		placeholder: 'e.g. 2685',
		required: true,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryProductLogs'],
				parameterMode: ['fields'],
			},
		},
		description: 'Product identifier (or variant identifier to retrieve logs for a specific variant)',
	},
	{
		displayName: 'Output Format',
		name: 'outputFormat',
		type: 'options',
		options: [
			{
				name: 'Per Log Event (Grouped Entries)',
				value: 'perLog',
				description: 'Return one item per log event with the entries array',
			},
			{
				name: 'Individual Entries (Flat List)',
				value: 'flatEntries',
				description: 'Unpack each change entry into an individual item',
			},
		],
		default: 'perLog',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryProductLogs'],
				parameterMode: ['fields'],
			},
		},
		description: 'Choose whether to output grouped log events or flatten each entry into a separate item',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryProductLogs'],
				parameterMode: ['fields'],
			},
		},
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryProductLogs'],
				parameterMode: ['fields'],
				returnAll: [false],
			},
		},
		description: 'Page number of results to fetch (up to 100 log items per page)',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 100,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryProductLogs'],
				parameterMode: ['fields'],
			},
		},
		description: 'Max number of results to return. If Return All is true, 0 or empty means fetch all available records.',
	},
	{
		displayName: 'Delay Between Requests (ms)',
		name: 'delayMs',
		type: 'number',
		typeOptions: {
			minValue: 0,
		},
		default: 650,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryProductLogs'],
				parameterMode: ['fields'],
				returnAll: [true],
			},
		},
		description: 'Delay in milliseconds between pagination requests to comply with the 100 req/min API rate limit',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryProductLogs'],
				parameterMode: ['fields'],
			},
		},
		options: [
			{
				displayName: 'Date From',
				name: 'date_from',
				type: 'string',
				default: '',
				placeholder: '1609459200 or 2026-01-01',
				description: 'Date/time from which logs are retrieved. Accepts Unix timestamp (seconds/ms), ISO string, or YYYY-MM-DD.',
			},
			{
				displayName: 'Date To',
				name: 'date_to',
				type: 'string',
				default: '',
				placeholder: '1609459200 or 2026-01-01',
				description: 'Date/time up to which logs are retrieved. Accepts Unix timestamp (seconds/ms), ISO string, or YYYY-MM-DD.',
			},
			{
				displayName: 'Log Types',
				name: 'log_types',
				type: 'multiOptions',
				options: [
					{ name: '1 - Change in Stock', value: 1 },
					{ name: '2 - Price Change', value: 2 },
					{ name: '3 - Product Creation', value: 3 },
					{ name: '4 - Product Deletion', value: 4 },
					{ name: '5 - Text Fields Modifications', value: 5 },
					{ name: '6 - Locations Modifications', value: 6 },
					{ name: '7 - Modifications of Links', value: 7 },
					{ name: '8 - Gallery Modifications', value: 8 },
					{ name: '9 - Variant Modifications', value: 9 },
					{ name: '10 - Modifications of Bundle Products', value: 10 },
				],
				default: [],
				description: 'Filter by event types',
			},
			{
				displayName: 'Sort',
				name: 'sort',
				type: 'options',
				options: [
					{ name: 'Ascending (by Date)', value: 'ASC' },
					{ name: 'Descending (by Date)', value: 'DESC' },
				],
				default: 'ASC',
				description: 'Type of log sorting',
			},
		],
	},

	// ----------------------------------
	//   Fields for addInventory
	// ----------------------------------
	{
		displayName: 'Catalog Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventory'],
				parameterMode: ['fields'],
			},
		},
		description: 'Catalog name (max 100 chars)',
	},
	{
		displayName: 'Catalog ID (for Update)',
		name: 'inventory_id',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventory'],
				parameterMode: ['fields'],
			},
		},
		description: 'Catalog ID if updating an existing catalog. Leave 0 or empty to create a new catalog.',
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventory'],
				parameterMode: ['fields'],
			},
		},
		description: 'Catalog description',
	},
	{
		displayName: 'Default Language',
		name: 'default_language',
		type: 'string',
		default: 'pl',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventory'],
				parameterMode: ['fields'],
			},
		},
		description: '2-letter code of default language (e.g. pl, en, de)',
	},
	{
		displayName: 'Languages',
		name: 'languages',
		type: 'string',
		default: 'pl',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventory'],
				parameterMode: ['fields'],
			},
		},
		description: 'Comma-separated list of languages supported in catalog (e.g. pl, en, de)',
	},
	{
		displayName: 'Default Price Group Name or ID',
		name: 'default_price_group',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getInventoryPriceGroups',
		},
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventory'],
				parameterMode: ['fields'],
			},
		},
		description: 'Default price group identifier. Choose from the list, or specify an ID using an <expression>.',
	},
	{
		displayName: 'Price Groups',
		name: 'price_groups',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventory'],
				parameterMode: ['fields'],
			},
		},
		description: 'Comma-separated list of price group IDs assigned to this catalog (e.g. 105, 106)',
	},
	{
		displayName: 'Default Warehouse Name or ID',
		name: 'default_warehouse',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getInventoryWarehouses',
		},
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventory'],
				parameterMode: ['fields'],
			},
		},
		description: 'Default warehouse identifier. Choose from the list, or specify an ID using an <expression>.',
	},
	{
		displayName: 'Warehouses',
		name: 'warehouses',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventory'],
				parameterMode: ['fields'],
			},
		},
		description: 'Comma-separated list of warehouse identifiers assigned to this catalog (e.g. bl_205, shop_23)',
	},
	{
		displayName: 'Reservations',
		name: 'reservations',
		type: 'boolean',
		default: true,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventory'],
				parameterMode: ['fields'],
			},
		},
		description: 'Whether stock reservations are enabled in this catalog',
	},

	// ----------------------------------
	//   Fields for deleteInventory
	// ----------------------------------
	{
		displayName: 'Catalog Name or ID',
		name: 'inventory_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getInventories',
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['deleteInventory'],
			},
		},
		description: 'Catalog ID to delete. Choose from the list, or specify an ID using an <expression>.',
	},

	// ----------------------------------
	//   Fields for addInventoryWarehouse
	// ----------------------------------
	{
		displayName: 'Warehouse Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryWarehouse'],
				parameterMode: ['fields'],
			},
		},
		description: 'Warehouse name',
	},
	{
		displayName: 'Warehouse ID (for Update)',
		name: 'warehouse_id',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryWarehouse'],
				parameterMode: ['fields'],
			},
		},
		description: 'Warehouse ID if updating an existing warehouse. Leave 0 or empty to create a new warehouse.',
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryWarehouse'],
				parameterMode: ['fields'],
			},
		},
		description: 'Warehouse description',
	},
	{
		displayName: 'Stock Edition Allowed',
		name: 'stock_edition',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryWarehouse'],
				parameterMode: ['fields'],
			},
		},
		description: 'Whether manual stock editing is allowed for this warehouse',
	},
	{
		displayName: 'Country Code',
		name: 'country',
		type: 'string',
		default: 'PL',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryWarehouse'],
				parameterMode: ['fields'],
			},
		},
		description: '2-letter country code (e.g. PL, DE, GB)',
	},
	{
		displayName: 'Address',
		name: 'address',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryWarehouse'],
				parameterMode: ['fields'],
			},
		},
		description: 'Street address',
	},
	{
		displayName: 'City',
		name: 'city',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryWarehouse'],
				parameterMode: ['fields'],
			},
		},
		description: 'City',
	},
	{
		displayName: 'Postcode',
		name: 'postcode',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryWarehouse'],
				parameterMode: ['fields'],
			},
		},
		description: 'Postal code',
	},

	// ----------------------------------
	//   Fields for deleteInventoryWarehouse
	// ----------------------------------
	{
		displayName: 'Warehouse ID',
		name: 'warehouse_id',
		type: 'number',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['deleteInventoryWarehouse'],
			},
		},
		description: 'Identifier of the warehouse to remove (only user-created bl warehouses can be deleted)',
	},

	// ----------------------------------
	//   Fields for getInventoryMapDetails
	// ----------------------------------
	{
		displayName: 'Map ID',
		name: 'map_id',
		type: 'number',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryMapDetails'],
			},
		},
		description: 'Warehouse map identifier',
	},

	// ----------------------------------
	//   Fields for updateInventoryProductsStock
	// ----------------------------------
	{
		displayName: 'Catalog Name or ID',
		name: 'inventory_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getInventories',
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['updateInventoryProductsStock'],
				parameterMode: ['fields'],
			},
		},
		description: 'Catalog ID. Choose from the list, or specify an ID using an <expression>.',
	},
	{
		displayName: 'Update Mode',
		name: 'stockUpdateMode',
		type: 'options',
		options: [
			{
				name: 'Single Product Stock',
				value: 'single',
				description: 'Update stock for a single product/variant in a warehouse',
			},
			{
				name: 'Bulk Stock (JSON Object)',
				value: 'json',
				description: 'Provide stock dictionary mapping product IDs to warehouse IDs and quantities',
			},
		],
		default: 'single',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['updateInventoryProductsStock'],
				parameterMode: ['fields'],
			},
		},
		description: 'Choose whether to update a single product stock or pass a bulk stock dictionary',
	},
	{
		displayName: 'Product ID',
		name: 'product_id',
		type: 'number',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['updateInventoryProductsStock'],
				parameterMode: ['fields'],
				stockUpdateMode: ['single'],
			},
		},
		description: 'Identifier of the product or variant',
	},
	{
		displayName: 'Warehouse Name or ID',
		name: 'warehouse_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getInventoryWarehouses',
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['updateInventoryProductsStock'],
				parameterMode: ['fields'],
				stockUpdateMode: ['single'],
			},
		},
		description: 'Warehouse identifier (e.g. bl_206). Choose from the list, or specify an ID using an <expression>.',
	},
	{
		displayName: 'Quantity',
		name: 'quantity',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['updateInventoryProductsStock'],
				parameterMode: ['fields'],
				stockUpdateMode: ['single'],
			},
		},
		description: 'New stock level in the warehouse',
	},
	{
		displayName: 'Products Stock JSON',
		name: 'productsStockJson',
		type: 'string',
		typeOptions: {
			rows: 5,
		},
		default: '{\n  "2685": {\n    "bl_206": 5\n  }\n}',
		required: true,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['updateInventoryProductsStock'],
				parameterMode: ['fields'],
				stockUpdateMode: ['json'],
			},
		},
		description: 'Dictionary of stock levels: {"product_id": {"warehouse_id": quantity}}',
	},

	// ----------------------------------
	//   Fields for updateInventoryProductsPrices
	// ----------------------------------
	{
		displayName: 'Catalog Name or ID',
		name: 'inventory_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getInventories',
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['updateInventoryProductsPrices'],
				parameterMode: ['fields'],
			},
		},
		description: 'Catalog ID. Choose from the list, or specify an ID using an <expression>.',
	},
	{
		displayName: 'Update Mode',
		name: 'priceUpdateMode',
		type: 'options',
		options: [
			{
				name: 'Single Product Price',
				value: 'single',
				description: 'Update price for a single product/variant in a price group',
			},
			{
				name: 'Bulk Prices (JSON Object)',
				value: 'json',
				description: 'Provide price dictionary mapping product IDs to price group IDs and gross prices',
			},
		],
		default: 'single',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['updateInventoryProductsPrices'],
				parameterMode: ['fields'],
			},
		},
		description: 'Choose whether to update a single product price or pass a bulk prices dictionary',
	},
	{
		displayName: 'Product ID',
		name: 'product_id',
		type: 'number',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['updateInventoryProductsPrices'],
				parameterMode: ['fields'],
				priceUpdateMode: ['single'],
			},
		},
		description: 'Identifier of the product or variant',
	},
	{
		displayName: 'Price Group Name or ID',
		name: 'price_group_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getInventoryPriceGroups',
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['updateInventoryProductsPrices'],
				parameterMode: ['fields'],
				priceUpdateMode: ['single'],
			},
		},
		description: 'Price group ID. Choose from the list, or specify an ID using an <expression>.',
	},
	{
		displayName: 'Gross Price',
		name: 'price_brutto',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['updateInventoryProductsPrices'],
				parameterMode: ['fields'],
				priceUpdateMode: ['single'],
			},
		},
		description: 'New gross price for the product in the chosen price group',
	},
	{
		displayName: 'Products Prices JSON',
		name: 'productsPricesJson',
		type: 'string',
		typeOptions: {
			rows: 5,
		},
		default: '{\n  "2685": {\n    "105": 21.99\n  }\n}',
		required: true,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['updateInventoryProductsPrices'],
				parameterMode: ['fields'],
				priceUpdateMode: ['json'],
			},
		},
		description: 'Dictionary of prices: {"product_id": {"price_group_id": price_brutto}}',
	},

	// ----------------------------------
	//   Fields for addInventoryProduct
	// ----------------------------------
	{
		displayName: 'Catalog Name or ID',
		name: 'inventory_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getInventories',
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryProduct'],
				parameterMode: ['fields'],
			},
		},
		description: 'Catalog ID where product is created or updated. Choose from the list, or specify an ID using an <expression>.',
	},
	{
		displayName: 'Product Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryProduct'],
				parameterMode: ['fields'],
			},
		},
		description: 'Product name',
	},
	{
		displayName: 'Product ID (for Update)',
		name: 'product_id',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryProduct'],
				parameterMode: ['fields'],
			},
		},
		description: 'Product ID if updating an existing product. Leave 0 or empty to create a new product.',
	},
	{
		displayName: 'SKU',
		name: 'sku',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryProduct'],
				parameterMode: ['fields'],
			},
		},
		description: 'Product SKU',
	},
	{
		displayName: 'EAN',
		name: 'ean',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryProduct'],
				parameterMode: ['fields'],
			},
		},
		description: 'Product EAN number',
	},
	{
		displayName: 'Category Name or ID',
		name: 'category_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getInventoryCategories',
		},
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryProduct'],
				parameterMode: ['fields'],
			},
		},
		description: 'Product category. Choose from the list, or specify an ID using an <expression>.',
	},
	{
		displayName: 'Manufacturer Name or ID',
		name: 'manufacturer_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getInventoryManufacturers',
		},
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryProduct'],
				parameterMode: ['fields'],
			},
		},
		description: 'Product manufacturer. Choose from the list, or specify an ID using an <expression>.',
	},
	{
		displayName: 'Tax Rate (%)',
		name: 'tax_rate',
		type: 'number',
		default: 23,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryProduct'],
				parameterMode: ['fields'],
			},
		},
		description: 'VAT / Tax rate percentage (e.g. 23)',
	},
	{
		displayName: 'Price Group Name or ID',
		name: 'price_group_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getInventoryPriceGroups',
		},
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryProduct'],
				parameterMode: ['fields'],
			},
		},
		description: 'Price group for initial gross price. Choose from the list, or specify an ID using an <expression>.',
	},
	{
		displayName: 'Gross Price',
		name: 'price_brutto',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryProduct'],
				parameterMode: ['fields'],
			},
		},
		description: 'Gross price for the selected price group',
	},
	{
		displayName: 'Warehouse Name or ID',
		name: 'warehouse_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getInventoryWarehouses',
		},
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryProduct'],
				parameterMode: ['fields'],
			},
		},
		description: 'Warehouse for initial stock. Choose from the list, or specify an ID using an <expression>.',
	},
	{
		displayName: 'Stock Quantity',
		name: 'stock_quantity',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryProduct'],
				parameterMode: ['fields'],
			},
		},
		description: 'Initial stock level for the selected warehouse',
	},
	{
		displayName: 'Weight (kg)',
		name: 'weight',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryProduct'],
				parameterMode: ['fields'],
			},
		},
		description: 'Product weight in kilograms',
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		typeOptions: {
			rows: 3,
		},
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryProduct'],
				parameterMode: ['fields'],
			},
		},
		description: 'Product description (HTML supported)',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryProduct'],
				parameterMode: ['fields'],
			},
		},
		options: [
			{
				displayName: 'ASIN',
				name: 'asin',
				type: 'string',
				default: '',
				description: 'Amazon ASIN identifier',
			},
			{
				displayName: 'Average Cost',
				name: 'average_cost',
				type: 'number',
				default: 0,
				description: 'Average purchase cost of product',
			},
			{
				displayName: 'Height (m)',
				name: 'height',
				type: 'number',
				default: 0,
				description: 'Product height in meters',
			},
			{
				displayName: 'Images (JSON)',
				name: 'images_json',
				type: 'string',
				default: '',
				placeholder: '{"0": "url:https://example.com/photo.jpg"}',
				description: 'JSON object with photos index mapping to URL or Base64 strings',
			},
			{
				displayName: 'Is Bundle',
				name: 'is_bundle',
				type: 'boolean',
				default: false,
				description: 'Whether product is a bundle composed of other products',
			},
			{
				displayName: 'Length (m)',
				name: 'length',
				type: 'number',
				default: 0,
				description: 'Product length in meters',
			},
			{
				displayName: 'Locations (JSON)',
				name: 'locations_json',
				type: 'string',
				default: '',
				placeholder: '{"bl_206": "A-5-2"}',
				description: 'JSON object mapping warehouse ID to shelf location string',
			},
			{
				displayName: 'Prices (JSON)',
				name: 'prices_json',
				type: 'string',
				default: '',
				placeholder: '{"105": 20.99, "106": 23.99}',
				description: 'JSON object mapping price group IDs to gross prices',
			},
			{
				displayName: 'Star Rating',
				name: 'star',
				type: 'number',
				typeOptions: {
					minValue: 0,
					maxValue: 5,
				},
				default: 0,
				description: 'Star rating (0-5)',
			},
			{
				displayName: 'Stock (JSON)',
				name: 'stock_json',
				type: 'string',
				default: '',
				placeholder: '{"bl_206": 5, "bl_207": 7}',
				description: 'JSON object mapping warehouse IDs to stock quantities',
			},
			{
				displayName: 'Tags',
				name: 'tags',
				type: 'string',
				default: '',
				placeholder: 'Summer, Sale',
				description: 'Comma-separated list of tags to assign to the product',
			},
			{
				displayName: 'Text Fields (JSON)',
				name: 'text_fields_json',
				type: 'string',
				default: '',
				placeholder: '{"features": {"Cover": "Hardcover"}}',
				description: 'JSON object with extra text fields, features, or translations',
			},
			{
				displayName: 'Width (m)',
				name: 'width',
				type: 'number',
				default: 0,
				description: 'Product width in meters',
			},
		],
	},

	// ----------------------------------
	//   Fields for deleteInventoryProduct
	// ----------------------------------
	{
		displayName: 'Product ID',
		name: 'product_id',
		type: 'number',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['deleteInventoryProduct'],
			},
		},
		description: 'Product identifier to remove from Base catalog',
	},

	// ----------------------------------
	//   Fields for getInventoryParameters
	// ----------------------------------
	{
		displayName: 'Catalog Name or ID',
		name: 'inventory_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getInventories',
		},
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryParameters'],
			},
		},
		description: 'Optional catalog ID filter. Choose from the list, or specify an ID using an <expression>.',
	},

	// ----------------------------------
	//   Fields for runProductMacroTrigger
	// ----------------------------------
	{
		displayName: 'Product ID',
		name: 'product_id',
		type: 'number',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['runProductMacroTrigger'],
			},
		},
		description: 'Product identifier to run the macro trigger on',
	},
	{
		displayName: 'Trigger ID',
		name: 'trigger_id',
		type: 'number',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['runProductMacroTrigger'],
			},
		},
		description: 'Identifier of the personal macro trigger',
	},

	// ----------------------------------
	//   Fields for runFulfillmentLinkProducts
	// ----------------------------------
	{
		displayName: 'Fulfillment Warehouse ID',
		name: 'fulfillment_warehouse_id',
		type: 'number',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['runFulfillmentLinkProducts'],
			},
		},
		description: 'Fulfillment warehouse identifier',
	},
	{
		displayName: 'Product IDs',
		name: 'product_ids',
		type: 'string',
		default: '',
		required: true,
		placeholder: '1001, 1002 or [1001, 1002]',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['runFulfillmentLinkProducts'],
			},
		},
		description: 'List of product identifiers to link, as a comma-separated string or JSON array',
	},

	// ----------------------------------
	//   Fields for getInventoryCategories
	// ----------------------------------
	{
		displayName: 'Catalog Name or ID',
		name: 'inventory_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getInventories',
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryCategories'],
			},
		},
		description: 'Catalog ID. Choose from the list, or specify an ID using an <expression>.',
	},

	// ----------------------------------
	//   Fields for addInventoryCategory
	// ----------------------------------
	{
		displayName: 'Catalog Name or ID',
		name: 'inventory_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getInventories',
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryCategory'],
				parameterMode: ['fields'],
			},
		},
		description: 'Catalog ID. Choose from the list, or specify an ID using an <expression>.',
	},
	{
		displayName: 'Category Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryCategory'],
				parameterMode: ['fields'],
			},
		},
		description: 'Name of the category',
	},
	{
		displayName: 'Parent Category ID',
		name: 'parent_id',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryCategory'],
				parameterMode: ['fields'],
			},
		},
		description: 'Parent category ID (0 for root category)',
	},
	{
		displayName: 'Category ID (for Update)',
		name: 'category_id',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryCategory'],
				parameterMode: ['fields'],
			},
		},
		description: 'Category ID if updating an existing category. Leave 0 or empty to create a new category.',
	},

	// ----------------------------------
	//   Fields for deleteInventoryCategory
	// ----------------------------------
	{
		displayName: 'Category ID',
		name: 'category_id',
		type: 'number',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['deleteInventoryCategory'],
			},
		},
		description: 'Identifier of the category to delete',
	},

	// ----------------------------------
	//   Fields for getInventoryManufacturers
	// ----------------------------------
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryManufacturers'],
			},
		},
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryManufacturers'],
				returnAll: [false],
			},
		},
		description: 'Page number of results to fetch (up to 1000 manufacturers per page)',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 100,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryManufacturers'],
			},
		},
		description: 'Max number of results to return. If Return All is true, 0 or empty means fetch all available records.',
	},
	{
		displayName: 'Delay Between Requests (ms)',
		name: 'delayMs',
		type: 'number',
		typeOptions: {
			minValue: 0,
		},
		default: 650,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryManufacturers'],
				returnAll: [true],
			},
		},
		description: 'Delay in milliseconds between pagination requests to comply with the 100 req/min API rate limit',
	},

	// ----------------------------------
	//   Fields for addInventoryManufacturer
	// ----------------------------------
	{
		displayName: 'Manufacturer Name',
		name: 'manufacturer_name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryManufacturer'],
				parameterMode: ['fields'],
			},
		},
		description: 'Name of the manufacturer',
	},
	{
		displayName: 'Manufacturer ID (for Update)',
		name: 'manufacturer_id',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryManufacturer'],
				parameterMode: ['fields'],
			},
		},
		description: 'Manufacturer ID if updating an existing manufacturer. Leave 0 or empty to create a new one.',
	},
	{
		displayName: 'Website URL',
		name: 'manufacturer_url',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryManufacturer'],
				parameterMode: ['fields'],
			},
		},
		description: 'Manufacturer website address',
	},
	{
		displayName: 'Logo URL or Photo',
		name: 'manufacturer_photo',
		type: 'string',
		default: '',
		placeholder: 'url:https://example.com/logo.png',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryManufacturer'],
				parameterMode: ['fields'],
			},
		},
		description: 'URL or Base64 string of the manufacturer photo/logo',
	},
	{
		displayName: 'Address Details',
		name: 'addressDetails',
		type: 'collection',
		placeholder: 'Add Address Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryManufacturer'],
				parameterMode: ['fields'],
			},
		},
		options: [
			{
				displayName: 'City',
				name: 'manufacturer_city',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Country Code',
				name: 'manufacturer_country_code',
				type: 'string',
				default: 'PL',
			},
			{
				displayName: 'Email',
				name: 'manufacturer_email',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Phone',
				name: 'manufacturer_phone',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Postcode',
				name: 'manufacturer_postcode',
				type: 'string',
				default: '',
			},
			{
				displayName: 'State',
				name: 'manufacturer_state',
				type: 'string',
				default: '',
			},
			{
				displayName: 'Street',
				name: 'manufacturer_street',
				type: 'string',
				default: '',
			},
		],
	},

	// ----------------------------------
	//   Fields for deleteInventoryManufacturer
	// ----------------------------------
	{
		displayName: 'Manufacturer ID',
		name: 'manufacturer_id',
		type: 'number',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['deleteInventoryManufacturer'],
			},
		},
		description: 'Identifier of the manufacturer to remove',
	},

	// ----------------------------------
	//   Fields for addInventoryPriceGroup
	// ----------------------------------
	{
		displayName: 'Price Group Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryPriceGroup'],
				parameterMode: ['fields'],
			},
		},
		description: 'Price group name (e.g. Retail PLN, Wholesale EUR)',
	},
	{
		displayName: 'Currency',
		name: 'currency',
		type: 'string',
		default: 'PLN',
		required: true,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryPriceGroup'],
				parameterMode: ['fields'],
			},
		},
		description: '3-letter currency code (e.g. PLN, EUR, USD, GBP)',
	},
	{
		displayName: 'Price Group ID (for Update)',
		name: 'price_group_id',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryPriceGroup'],
				parameterMode: ['fields'],
			},
		},
		description: 'Price Group ID if updating an existing price group. Leave 0 or empty to create a new price group.',
	},
	{
		displayName: 'Description',
		name: 'description',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryPriceGroup'],
				parameterMode: ['fields'],
			},
		},
		description: 'Price group description',
	},
	{
		displayName: 'Price Group Type',
		name: 'price_group_type',
		type: 'options',
		options: [
			{
				name: 'Independent',
				value: 'independent',
				description: 'Standard independent price group',
			},
			{
				name: 'Dependent on Another Price Group',
				value: 'dependent_on_price_group',
				description: 'Calculated from another price group using a multiplier and addition',
			},
		],
		default: 'independent',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryPriceGroup'],
				parameterMode: ['fields'],
			},
		},
		description: 'Calculation method for this price group',
	},
	{
		displayName: 'Source Price Group ID',
		name: 'source_price_group_id',
		type: 'number',
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryPriceGroup'],
				parameterMode: ['fields'],
				price_group_type: ['dependent_on_price_group'],
			},
		},
		description: 'ID of the source price group from which prices are calculated',
	},
	{
		displayName: 'Price Multiplier',
		name: 'price_multiplier',
		type: 'number',
		default: 1,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryPriceGroup'],
				parameterMode: ['fields'],
				price_group_type: ['dependent_on_price_group'],
			},
		},
		description: 'Multiplier applied to the source price (e.g. 1.2 for +20%)',
	},
	{
		displayName: 'Price Addition',
		name: 'price_addition',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryPriceGroup'],
				parameterMode: ['fields'],
				price_group_type: ['dependent_on_price_group'],
			},
		},
		description: 'Fixed amount added after multiplication (e.g. 0.99)',
	},

	// ----------------------------------
	//   Fields for deleteInventoryPriceGroup
	// ----------------------------------
	{
		displayName: 'Price Group ID',
		name: 'price_group_id',
		type: 'number',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['deleteInventoryPriceGroup'],
			},
		},
		description: 'Identifier of the price group to delete',
	},

	// ----------------------------------
	//   Fields for addInventoryTag
	// ----------------------------------
	{
		displayName: 'Tag Name',
		name: 'name',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryTag'],
				parameterMode: ['fields'],
			},
		},
		description: 'Name of the product tag',
	},
	{
		displayName: 'Tag ID (for Update)',
		name: 'tag_id',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryTag'],
				parameterMode: ['fields'],
			},
		},
		description: 'Tag ID if updating an existing tag. Leave 0 or empty to create a new tag.',
	},

	// ----------------------------------
	//   Fields for deleteInventoryTag
	// ----------------------------------
	{
		displayName: 'Tag ID',
		name: 'tag_id',
		type: 'number',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['deleteInventoryTag'],
			},
		},
		description: 'Identifier of the tag to delete',
	},

	// ----------------------------------
	//   Fields for getInventoryAvailableTextFieldKeys
	// ----------------------------------
	{
		displayName: 'Catalog Name or ID',
		name: 'inventory_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getInventories',
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryAvailableTextFieldKeys'],
			},
		},
		description: 'Catalog ID. Choose from the list, or specify an ID using an <expression>.',
	},

	// ----------------------------------
	//   Fields for getInventoryIntegrations
	// ----------------------------------
	{
		displayName: 'Catalog Name or ID',
		name: 'inventory_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getInventories',
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryIntegrations'],
			},
		},
		description: 'Catalog ID. Choose from the list, or specify an ID using an <expression>.',
	},

	// ----------------------------------
	//   Fields for getSyncLogList
	// ----------------------------------
	{
		displayName: 'Marketplace Source',
		name: 'source',
		type: 'options',
		options: [
			{ name: 'Allegro', value: 'allegro' },
			{ name: 'Amazon', value: 'amazon' },
			{ name: 'Amazon Vendor', value: 'amazon_vendor' },
			{ name: 'eBay', value: 'ebay' },
		],
		default: 'allegro',
		required: true,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getSyncLogList'],
				parameterMode: ['fields'],
			},
		},
		description: 'Integration source for sync logs',
	},
	{
		displayName: 'Last Log ID',
		name: 'last_log_id',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getSyncLogList'],
				parameterMode: ['fields'],
			},
		},
		description: 'Retrieve logs with ID greater than this value (cursor pagination)',
	},
	{
		displayName: 'Errors Only',
		name: 'errors_only',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getSyncLogList'],
				parameterMode: ['fields'],
			},
		},
		description: 'Whether to return only logs with synchronization errors',
	},

	// ----------------------------------
	//   Fields for addInventoryPromotion
	// ----------------------------------
	{
		displayName: 'Promotion ID (for Update)',
		name: 'promotion_id',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryPromotion'],
				parameterMode: ['fields'],
			},
		},
		description: 'Promotion ID if updating an existing promotion. Leave 0 or empty to create a new promotion.',
	},
	{
		displayName: 'Promotion Definition (JSON)',
		name: 'promotionDefinitionJson',
		type: 'string',
		typeOptions: {
			rows: 6,
		},
		default: '{\n  "price_group_filter": {\n    "name": "Weekend Sale",\n    "target_price_group_id": 105,\n    "price_multiplier": 0.85\n  }\n}',
		required: true,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryPromotion'],
				parameterMode: ['fields'],
			},
		},
		description: 'Promotion filter definition JSON (e.g. price_group_filter, tag_filter, category_filter, or file_filter)',
	},

	// ----------------------------------
	//   Fields for getInventoryPromotionsList
	// ----------------------------------
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryPromotionsList'],
			},
		},
		description: 'Page number of results to fetch',
	},

	// ----------------------------------
	//   Fields for getInventoryWarehouseLocations
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryWarehouseLocations'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryWarehouseLocations'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"warehouse_id\": 205,\n  \"warehouse_type\": \"bl\",\n  \"page\": 1\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for getInventoryWarehouseLocations',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryWarehouseLocations'],
				parameterMode: ['fields'],
			},
		},
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 100,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryWarehouseLocations'],
				parameterMode: ['fields'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryWarehouseLocations'],
				parameterMode: ['fields'],
				returnAll: [false],
			},
		},
		description: 'Results page number',
	},
	{
		displayName: 'Warehouse Id',
		name: 'warehouse_id',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryWarehouseLocations'],
				parameterMode: ['fields'],
			},
		},
		description: "Warehouse identifier returned by getInventoryWarehouses (the warehouse_id field).",
	},
	{
		displayName: 'Warehouse Type',
		name: 'warehouse_type',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryWarehouseLocations'],
				parameterMode: ['fields'],
			},
		},
		description: "Warehouse type returned by getInventoryWarehouses (the warehouse_type field).",
	},
	{
		displayName: 'Filter Location Id',
		name: 'filter_location_id',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryWarehouseLocations'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Filter results to return only the location with the specified ID.",
	},
	{
		displayName: 'Filter Name',
		name: 'filter_name',
		type: 'string',
		required: false,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryWarehouseLocations'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Filter results by location name. Use * as a wildcard for any sequence of characters, e.g. \"A-01*\" matches all locations starting with \"A-01\". Without a wildcard, an exact match is performed.",
	},
	{
		displayName: 'Filter Rack Id',
		name: 'filter_rack_id',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryWarehouseLocations'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Filter results to return only locations assigned to the specified rack. Pass 0 to get locations not assigned to any rack.",
	},
	{
		displayName: 'Filter Zone Id',
		name: 'filter_zone_id',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryWarehouseLocations'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Filter results to return only locations assigned to the specified zone. Pass 0 to get locations not assigned to any zone.",
	},


	// ----------------------------------
	//   Fields for getInventoryWarehouseLocationTypes
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryWarehouseLocationTypes'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryWarehouseLocationTypes'],
				parameterMode: ['json'],
			},
		},
		default: "{}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for getInventoryWarehouseLocationTypes',
	},


	// ----------------------------------
	//   Fields for addInventoryWarehouseLocation
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryWarehouseLocation'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryWarehouseLocation'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"warehouse_id\": 205,\n  \"warehouse_type\": \"bl\",\n  \"name\": \"A-01-A-1\",\n  \"color\": \"5cb85c\",\n  \"is_pickable\": true,\n  \"priority\": 5,\n  \"location_type_id\": 1,\n  \"zone_id\": 0,\n  \"rack_id\": 0\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for addInventoryWarehouseLocation',
	},
	{
		displayName: 'Location Id',
		name: 'location_id',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryWarehouseLocation'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) ID of the location to update. Omit this parameter to create a new location.",
	},
	{
		displayName: 'Warehouse Id',
		name: 'warehouse_id',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryWarehouseLocation'],
				parameterMode: ['fields'],
			},
		},
		description: "Warehouse identifier returned by getInventoryWarehouses (the warehouse_id field).",
	},
	{
		displayName: 'Warehouse Type',
		name: 'warehouse_type',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryWarehouseLocation'],
				parameterMode: ['fields'],
			},
		},
		description: "Warehouse type returned by getInventoryWarehouses (the warehouse_type field).",
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryWarehouseLocation'],
				parameterMode: ['fields'],
			},
		},
		description: "Location name (e.g. \"A-01-A-1\"). Required when creating a new location, optional when updating. Must be unique within the warehouse, max 20 characters, cannot contain a semicolon (\";\").",
	},
	{
		displayName: 'Color',
		name: 'color',
		type: 'string',
		required: false,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryWarehouseLocation'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Location label color as a 6-character hex string, e.g. \"5cb85c\". The value is normalized to lowercase. Default for new locations: \"4285f4\".",
	},
	{
		displayName: 'Is Pickable',
		name: 'is_pickable',
		type: 'boolean',
		required: false,
		default: false,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryWarehouseLocation'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Whether the location is pickable (can be used during pick & pack). Default for new locations: true.",
	},
	{
		displayName: 'Priority',
		name: 'priority',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryWarehouseLocation'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Priority value, integer in range 1..99999. Lower values are picked first. Default for new locations: 1.",
	},
	{
		displayName: 'Location Type Id',
		name: 'location_type_id',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryWarehouseLocation'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Identifier of the location type. Must be an existing location type for the user. Omit to use the user's default location type when creating.",
	},
	{
		displayName: 'Zone Id',
		name: 'zone_id',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryWarehouseLocation'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Identifier of the zone. Pass 0 to leave the location unassigned to any zone. When updating, changing zone_id without also passing rack_id resets rack_id to 0 (the previous rack would not match the new zone). If a non-zero rack_id is provided, zone_id can be omitted (the rack's zone will be used automatically); when explicitly provided, it must match the rack's zone.",
	},
	{
		displayName: 'Rack Id',
		name: 'rack_id',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryWarehouseLocation'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Identifier of the rack. Pass 0 to leave the location unassigned to any rack. If a non-zero rack_id is provided, the location's zone is set to the rack's zone (an explicitly provided zone_id must match it).",
	},


	// ----------------------------------
	//   Fields for addInventoryWarehouseLocationType
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryWarehouseLocationType'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryWarehouseLocationType'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"name\": \"Pallet\",\n  \"max_quantity\": 200,\n  \"max_weight\": 800,\n  \"width\": 120,\n  \"height\": 180,\n  \"depth\": 80,\n  \"is_transfer_bin\": false,\n  \"is_receiving_bin\": false\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for addInventoryWarehouseLocationType',
	},
	{
		displayName: 'Location Type Id',
		name: 'location_type_id',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryWarehouseLocationType'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) ID of the location type to update. Omit this parameter to create a new location type.",
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryWarehouseLocationType'],
				parameterMode: ['fields'],
			},
		},
		description: "Location type name (e.g. \"Pallet\"). Required when creating a new location type, optional when updating. Maximum 50 characters, must be unique among the authenticated user's location types.",
	},
	{
		displayName: 'Max Quantity',
		name: 'max_quantity',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryWarehouseLocationType'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Maximum number of products allowed at a single location of this type. 0 means no limit. Range: 0 - 999999999. Default for new types: 0.",
	},
	{
		displayName: 'Max Weight',
		name: 'max_weight',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryWarehouseLocationType'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Maximum total weight in kilograms allowed at a single location of this type. 0 means no limit. Range: 0 - 9999.99. Default for new types: 0.",
	},
	{
		displayName: 'Width',
		name: 'width',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryWarehouseLocationType'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Width of a single location of this type, in centimeters. 0 means not set. Range: 0 - 9999.99. Default for new types: 0.",
	},
	{
		displayName: 'Height',
		name: 'height',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryWarehouseLocationType'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Height of a single location of this type, in centimeters. 0 means not set. Range: 0 - 9999.99. Default for new types: 0.",
	},
	{
		displayName: 'Depth',
		name: 'depth',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryWarehouseLocationType'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Depth of a single location of this type, in centimeters. 0 means not set. Range: 0 - 9999.99. Default for new types: 0.",
	},
	{
		displayName: 'Is Transfer Bin',
		name: 'is_transfer_bin',
		type: 'boolean',
		required: false,
		default: false,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryWarehouseLocationType'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Whether locations of this type are used as transfer bins (intermediate locations during goods movements). Mutually exclusive with is_receiving_bin. Default for new types: false.",
	},
	{
		displayName: 'Is Receiving Bin',
		name: 'is_receiving_bin',
		type: 'boolean',
		required: false,
		default: false,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryWarehouseLocationType'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Whether locations of this type are used for goods receiving (e.g. delivery assistant suggestions). Mutually exclusive with is_transfer_bin. Default for new types: false.",
	},


	// ----------------------------------
	//   Fields for deleteInventoryWarehouseLocation
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['deleteInventoryWarehouseLocation'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['deleteInventoryWarehouseLocation'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"location_id\": 17,\n  \"warehouse_id\": 205,\n  \"warehouse_type\": \"bl\"\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for deleteInventoryWarehouseLocation',
	},
	{
		displayName: 'Warehouse Id',
		name: 'warehouse_id',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['deleteInventoryWarehouseLocation'],
				parameterMode: ['fields'],
			},
		},
		description: "Warehouse identifier returned by getInventoryWarehouses (the warehouse_id field). The location must belong to this warehouse.",
	},
	{
		displayName: 'Warehouse Type',
		name: 'warehouse_type',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['deleteInventoryWarehouseLocation'],
				parameterMode: ['fields'],
			},
		},
		description: "Warehouse type returned by getInventoryWarehouses (the warehouse_type field).",
	},
	{
		displayName: 'Location Id',
		name: 'location_id',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['deleteInventoryWarehouseLocation'],
				parameterMode: ['fields'],
			},
		},
		description: "ID of the location to delete (the value of location_id returned by getInventoryWarehouseLocations).",
	},


	// ----------------------------------
	//   Fields for deleteInventoryWarehouseLocationType
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['deleteInventoryWarehouseLocationType'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['deleteInventoryWarehouseLocationType'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"location_type_id\": 12\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for deleteInventoryWarehouseLocationType',
	},
	{
		displayName: 'Location Type Id',
		name: 'location_type_id',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['deleteInventoryWarehouseLocationType'],
				parameterMode: ['fields'],
			},
		},
		description: "ID of the location type to delete (the value of location_type_id returned by getInventoryWarehouseLocationTypes).",
	},


	// ----------------------------------
	//   Fields for getInventoryWarehouseZones
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryWarehouseZones'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryWarehouseZones'],
				parameterMode: ['json'],
			},
		},
		default: "{}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for getInventoryWarehouseZones',
	},


	// ----------------------------------
	//   Fields for addInventoryWarehouseZone
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryWarehouseZone'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryWarehouseZone'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"name\": \"Cold Storage\",\n  \"color\": \"4285f4\",\n  \"location_prefix\": \"CS\"\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for addInventoryWarehouseZone',
	},
	{
		displayName: 'Zone Id',
		name: 'zone_id',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryWarehouseZone'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Zone identifier for update. Leave blank or pass 0 to create a new zone. If provided, the zone with this ID will be updated.",
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryWarehouseZone'],
				parameterMode: ['fields'],
			},
		},
		description: "Zone name. Maximum 50 characters, cannot be empty.",
	},
	{
		displayName: 'Color',
		name: 'color',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryWarehouseZone'],
				parameterMode: ['fields'],
			},
		},
		description: "Zone color as a 6-character hex string, e.g. \"5cb85c\". The value is normalized to lowercase.",
	},
	{
		displayName: 'Location Prefix',
		name: 'location_prefix',
		type: 'string',
		required: false,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryWarehouseZone'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Prefix applied to location names within this zone. Maximum 10 characters. Default: empty string.",
	},


	// ----------------------------------
	//   Fields for deleteInventoryWarehouseZone
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['deleteInventoryWarehouseZone'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['deleteInventoryWarehouseZone'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"zone_id\": 101\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for deleteInventoryWarehouseZone',
	},
	{
		displayName: 'Zone Id',
		name: 'zone_id',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['deleteInventoryWarehouseZone'],
				parameterMode: ['fields'],
			},
		},
		description: "ID of the zone to delete (the value of zone_id returned by getInventoryWarehouseZones).",
	},


	// ----------------------------------
	//   Fields for getInventoryWarehouseRacks
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryWarehouseRacks'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryWarehouseRacks'],
				parameterMode: ['json'],
			},
		},
		default: "{}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for getInventoryWarehouseRacks',
	},


	// ----------------------------------
	//   Fields for addInventoryWarehouseRack
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryWarehouseRack'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryWarehouseRack'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"name\": \"Rack A-01\",\n  \"zone_id\": 101,\n  \"layout\": 0,\n  \"location_prefix\": \"A01\"\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for addInventoryWarehouseRack',
	},
	{
		displayName: 'Rack Id',
		name: 'rack_id',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryWarehouseRack'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Rack identifier for update. Leave blank or pass 0 to create a new rack. If provided, the rack with this ID will be updated.",
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryWarehouseRack'],
				parameterMode: ['fields'],
			},
		},
		description: "Rack name. Maximum 100 characters, cannot be empty.",
	},
	{
		displayName: 'Zone Id',
		name: 'zone_id',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryWarehouseRack'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Identifier of the zone this rack belongs to. Must be an existing zone for the user. Pass 0 or omit to leave unassigned. Default: 0.",
	},
	{
		displayName: 'Layout',
		name: 'layout',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryWarehouseRack'],
				parameterMode: ['fields'],
			},
		},
		description: "Picking side layout. Accepted values: 0 (top), 1 (right), 2 (bottom), 3 (left).",
	},
	{
		displayName: 'Location Prefix',
		name: 'location_prefix',
		type: 'string',
		required: false,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryWarehouseRack'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Prefix applied to location names within this rack. Maximum 10 characters. Default: empty string.",
	},


	// ----------------------------------
	//   Fields for deleteInventoryWarehouseRack
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['deleteInventoryWarehouseRack'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['deleteInventoryWarehouseRack'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"rack_id\": 501\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for deleteInventoryWarehouseRack',
	},
	{
		displayName: 'Rack Id',
		name: 'rack_id',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['deleteInventoryWarehouseRack'],
				parameterMode: ['fields'],
			},
		},
		description: "ID of the rack to delete (the value of rack_id returned by getInventoryWarehouseRacks).",
	},


	// ----------------------------------
	//   Fields for getInventorySuppliers
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventorySuppliers'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventorySuppliers'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"filter_id\": 1,\n  \"filter_name\": \"Example Supplier\"\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for getInventorySuppliers',
	},
	{
		displayName: 'Filter Id',
		name: 'filter_id',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventorySuppliers'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Limiting results to a specific supplier ID",
	},
	{
		displayName: 'Filter Name',
		name: 'filter_name',
		type: 'string',
		required: false,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventorySuppliers'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Filtering by supplier name (full or partial match)",
	},


	// ----------------------------------
	//   Fields for addInventorySupplier
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventorySupplier'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventorySupplier'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"name\": \"Supplier Ltd\",\n  \"take_product_cost_from\": \"cost\",\n  \"take_product_code_from\": \"sku\",\n  \"address\": \"123 Main Street\",\n  \"postcode\": \"12-345\",\n  \"city\": \"London\",\n  \"phone\": \"+44123456789\",\n  \"email\": \"contact@supplier.com\",\n  \"email_copy_to\": \"manager@supplier.com\",\n  \"currency\": \"GBP\",\n  \"tax_no\": \"GB123456789\"\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for addInventorySupplier',
	},
	{
		displayName: 'Supplier Id',
		name: 'supplier_id',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventorySupplier'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Supplier identifier. If provided, the existing supplier will be updated.",
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventorySupplier'],
				parameterMode: ['fields'],
			},
		},
		description: "Supplier name. Required when creating a new supplier. When updating, if not provided, the name remains unchanged.",
	},
	{
		displayName: 'Take Product Cost From',
		name: 'take_product_cost_from',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventorySupplier'],
				parameterMode: ['fields'],
			},
		},
		description: "Source of product cost for this supplier. Available values: \"cost\" (Product cost at the supplier), or price group ID. Price group ids can be retrieved from the method getInventoryPriceGroups",
	},
	{
		displayName: 'Take Product Code From',
		name: 'take_product_code_from',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventorySupplier'],
				parameterMode: ['fields'],
			},
		},
		description: "Source of product code for this supplier. Available values: \"sku\" (Product SKU), \"ean\" (Product EAN), \"code\" (Product code at the supplier), or extra field ID. Extra field ids can be retrieved from the method getInventoryExtraFields",
	},
	{
		displayName: 'Address',
		name: 'address',
		type: 'string',
		required: false,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventorySupplier'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Supplier address",
	},
	{
		displayName: 'Postcode',
		name: 'postcode',
		type: 'string',
		required: false,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventorySupplier'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Supplier postal code",
	},
	{
		displayName: 'City',
		name: 'city',
		type: 'string',
		required: false,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventorySupplier'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Supplier city",
	},
	{
		displayName: 'Phone',
		name: 'phone',
		type: 'string',
		required: false,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventorySupplier'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Supplier phone number",
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		required: false,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventorySupplier'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Supplier email address",
	},
	{
		displayName: 'Email Copy To',
		name: 'email_copy_to',
		type: 'string',
		required: false,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventorySupplier'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Additional email addresses for correspondence",
	},
	{
		displayName: 'Currency',
		name: 'currency',
		type: 'string',
		required: false,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventorySupplier'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Default supplier currency (e.g. EUR, USD)",
	},
	{
		displayName: 'Tax No',
		name: 'tax_no',
		type: 'string',
		required: false,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventorySupplier'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Supplier tax identification number",
	},


	// ----------------------------------
	//   Fields for deleteInventorySupplier
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['deleteInventorySupplier'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['deleteInventorySupplier'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"supplier_id\": 1\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for deleteInventorySupplier',
	},
	{
		displayName: 'Supplier Id',
		name: 'supplier_id',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['deleteInventorySupplier'],
				parameterMode: ['fields'],
			},
		},
		description: "Supplier identifier",
	},


	// ----------------------------------
	//   Fields for getInventoryPayers
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryPayers'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryPayers'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"filter_id\": 1,\n  \"filter_name\": \"Company\"\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for getInventoryPayers',
	},
	{
		displayName: 'Filter Id',
		name: 'filter_id',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryPayers'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Limiting results to a specific payer ID",
	},
	{
		displayName: 'Filter Name',
		name: 'filter_name',
		type: 'string',
		required: false,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryPayers'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Filtering by payer name (full or partial match)",
	},


	// ----------------------------------
	//   Fields for addInventoryPayer
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryPayer'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryPayer'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"name\": \"Company Ltd\",\n  \"address\": \"123 Main Street\",\n  \"postcode\": \"12-345\",\n  \"city\": \"London\",\n  \"tax_no\": \"GB123456789\"\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for addInventoryPayer',
	},
	{
		displayName: 'Payer Id',
		name: 'payer_id',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryPayer'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Payer identifier. If provided, the existing payer will be updated.",
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryPayer'],
				parameterMode: ['fields'],
			},
		},
		description: "Payer name. Required when creating a new payer. When updating, if not provided, the name remains unchanged.",
	},
	{
		displayName: 'Address',
		name: 'address',
		type: 'string',
		required: false,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryPayer'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Payer address",
	},
	{
		displayName: 'Postcode',
		name: 'postcode',
		type: 'string',
		required: false,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryPayer'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Payer postal code",
	},
	{
		displayName: 'City',
		name: 'city',
		type: 'string',
		required: false,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryPayer'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Payer city",
	},
	{
		displayName: 'Tax No',
		name: 'tax_no',
		type: 'string',
		required: false,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryPayer'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Payer tax identification number",
	},


	// ----------------------------------
	//   Fields for deleteInventoryPayer
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['deleteInventoryPayer'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['deleteInventoryPayer'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"payer_id\": 1\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for deleteInventoryPayer',
	},
	{
		displayName: 'Payer Id',
		name: 'payer_id',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['deleteInventoryPayer'],
				parameterMode: ['fields'],
			},
		},
		description: "Payer identifier",
	},


	// ----------------------------------
	//   Fields for getInventoryDocuments
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryDocuments'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryDocuments'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"filter_source_object_type\": 1,\n  \"filter_source_object_id\": 123456,\n  \"filter_document_type\": 1,\n  \"filter_date_from\": 1693459200,\n  \"page\": 1\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for getInventoryDocuments',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryDocuments'],
				parameterMode: ['fields'],
			},
		},
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 100,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryDocuments'],
				parameterMode: ['fields'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryDocuments'],
				parameterMode: ['fields'],
				returnAll: [false],
			},
		},
		description: 'Results page number',
	},
	{
		displayName: 'Filter Source Object Type',
		name: 'filter_source_object_type',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryDocuments'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) The source object type to filter by: 1 - order, 2 - purchase order, 3 - stock take, 4 - order return, 7 - fulfillment delivery, 8 - transfer",
	},
	{
		displayName: 'Filter Source Object Id',
		name: 'filter_source_object_id',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryDocuments'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) The source object ID to filter by",
	},
	{
		displayName: 'Filter Document Id',
		name: 'filter_document_id',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryDocuments'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) A specific inventory document ID",
	},
	{
		displayName: 'Filter Document Type',
		name: 'filter_document_type',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryDocuments'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) The document type: 0 - GR (Goods Received), 1 - IGR (Internal Goods Received), 2 - GI (Goods Issue), 3 - IGI (Internal Goods Issue), 4 - IT (Internal Transfer), 5 - OB (Opening Balance)",
	},
	{
		displayName: 'Filter Document Status',
		name: 'filter_document_status',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryDocuments'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) The document status: 0 - Draft, 1 - Confirmed",
	},
	{
		displayName: 'Filter Date From',
		name: 'filter_date_from',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryDocuments'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) The minimum creation date (unix timestamp) to filter by",
	},
	{
		displayName: 'Filter Date To',
		name: 'filter_date_to',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryDocuments'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) The maximum creation date (unix timestamp) to filter by",
	},
	{
		displayName: 'Filter Warehouse Id',
		name: 'filter_warehouse_id',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryDocuments'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) The warehouse ID",
	},


	// ----------------------------------
	//   Fields for getInventoryDocumentItems
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryDocumentItems'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryDocumentItems'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"document_id\": 452\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for getInventoryDocumentItems',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryDocumentItems'],
				parameterMode: ['fields'],
			},
		},
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 100,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryDocumentItems'],
				parameterMode: ['fields'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryDocumentItems'],
				parameterMode: ['fields'],
				returnAll: [false],
			},
		},
		description: 'Results page number',
	},
	{
		displayName: 'Document Id',
		name: 'document_id',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryDocumentItems'],
				parameterMode: ['fields'],
			},
		},
		description: "Document identifier",
	},


	// ----------------------------------
	//   Fields for getInventoryDocumentSeries
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryDocumentSeries'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryDocumentSeries'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"warehouse_id\": 205\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for getInventoryDocumentSeries',
	},
	{
		displayName: 'Warehouse Id',
		name: 'warehouse_id',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryDocumentSeries'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Filter series by warehouse ID",
	},


	// ----------------------------------
	//   Fields for getInventoryDocumentFile
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryDocumentFile'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryDocumentFile'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"document_id\": 4521\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for getInventoryDocumentFile',
	},
	{
		displayName: 'Download as Binary Data',
		name: 'downloadAsBinary',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryDocumentFile'],
				parameterMode: ['fields'],
			},
		},
		description: 'Whether to download the base64 file decoded directly into native n8n binary data attachment',
	},
	{
		displayName: 'Binary Property Name',
		name: 'binaryPropertyName',
		type: 'string',
		default: 'data',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryDocumentFile'],
				parameterMode: ['fields'],
				downloadAsBinary: [true],
			},
		},
		description: 'Name of the binary property to store the file in',
	},
	{
		displayName: 'Document Id',
		name: 'document_id',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryDocumentFile'],
				parameterMode: ['fields'],
			},
		},
		description: "Warehouse document identifier from Base",
	},
	{
		displayName: 'Get External',
		name: 'get_external',
		type: 'boolean',
		required: true,
		default: false,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryDocumentFile'],
				parameterMode: ['fields'],
			},
		},
		description: "false (by default) - download document file generated by Base. true - download a document from an external accounting system (if available). If an external document file does not exist, a document in Base format will be returned",
	},


	// ----------------------------------
	//   Fields for addInventoryDocument
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryDocument'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryDocument'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"warehouse_id\": 205,\n  \"document_type\": 2,\n  \"date_add\": 1740479190,\n  \"date_execute\": 1740479190,\n  \"notes\": \"Important delivery - handle with care\"\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for addInventoryDocument',
	},
	{
		displayName: 'Warehouse Id',
		name: 'warehouse_id',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryDocument'],
				parameterMode: ['fields'],
			},
		},
		description: "Source warehouse identifier",
	},
	{
		displayName: 'Document Type',
		name: 'document_type',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryDocument'],
				parameterMode: ['fields'],
			},
		},
		description: "Document type: 0 - GR (Goods Received), 1 - IGR (Internal Goods Received), 2 - GI (Goods Issue), 3 - IGI (Internal Goods Issue), 4 - IT (Internal Transfer), 5 - OB (Opening Balance)",
	},
	{
		displayName: 'Target Warehouse Id',
		name: 'target_warehouse_id',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryDocument'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Target warehouse identifier - required only for transfer documents (type 4)",
	},
	{
		displayName: 'Date Add',
		name: 'date_add',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryDocument'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Date of document creation (unix timestamp). If not specified, the current date will be used.",
	},
	{
		displayName: 'Date Execute',
		name: 'date_execute',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryDocument'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Date of document execution (unix timestamp). If not specified, the current date will be used.",
	},
	{
		displayName: 'Contractor',
		name: 'contractor',
		type: 'string',
		required: false,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryDocument'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Contractor description/notes",
	},
	{
		displayName: 'Invoice No',
		name: 'invoice_no',
		type: 'string',
		required: false,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryDocument'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Related invoice number",
	},
	{
		displayName: 'Notes',
		name: 'notes',
		type: 'string',
		required: false,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryDocument'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Document notes/comments",
	},


	// ----------------------------------
	//   Fields for addInventoryDocumentItems
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryDocumentItems'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryDocumentItems'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"document_id\": 101,\n  \"items\": [\n    {\n      \"product_id\": 5432,\n      \"quantity\": 5,\n      \"price\": 10.99,\n      \"location_name\": \"A-1-2\",\n      \"target_location_name\": \"B-1-2\",\n      \"expiry_date\": \"2023-12-31\",\n      \"batch\": \"LOT2021\",\n      \"serial_no\": \"SN20211231001\",\n      \"comments\": \"Important item\"\n    },\n    {\n      \"product_id\": 5433,\n      \"quantity\": 3,\n      \"price\": 24.5,\n      \"location_name\": \"A-2-1\"\n    },\n    {\n      \"item_id\": 1001,\n      \"quantity\": 8,\n      \"price\": 12.5\n    }\n  ]\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for addInventoryDocumentItems',
	},
	{
		displayName: 'Document Id',
		name: 'document_id',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryDocumentItems'],
				parameterMode: ['fields'],
			},
		},
		description: "Document identifier",
	},
	{
		displayName: 'Items',
		name: 'items',
		type: 'json',
		required: true,
		default: '[]',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryDocumentItems'],
				parameterMode: ['fields'],
			},
		},
		description: "List of document items to add or update. At most 1000 items with item_id can be updated at a time",
	},


	// ----------------------------------
	//   Fields for addInventoryDocumentFile
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryDocumentFile'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryDocumentFile'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"document_id\": 4521,\n  \"file\": \"data:4AAQSkZJRgABA[...]\",\n  \"external_document_number\": \"WZ/2026/03/001\"\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for addInventoryDocumentFile',
	},
	{
		displayName: 'Document Id',
		name: 'document_id',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryDocumentFile'],
				parameterMode: ['fields'],
			},
		},
		description: "Warehouse document identifier from Base",
	},
	{
		displayName: 'File',
		name: 'file',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryDocumentFile'],
				parameterMode: ['fields'],
			},
		},
		description: "Document PDF file in binary format encoded in base64. Provide a prefix \"data:\" at the beginning e.g. \"data:4AAQSkSzkJRgABA[...]\"",
	},
	{
		displayName: 'External Document Number',
		name: 'external_document_number',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryDocumentFile'],
				parameterMode: ['fields'],
			},
		},
		description: "External system document number",
	},


	// ----------------------------------
	//   Fields for setInventoryDocumentStatusConfirmed
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['setInventoryDocumentStatusConfirmed'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['setInventoryDocumentStatusConfirmed'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"document_id\": 101\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for setInventoryDocumentStatusConfirmed',
	},
	{
		displayName: 'Document Id',
		name: 'document_id',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['setInventoryDocumentStatusConfirmed'],
				parameterMode: ['fields'],
			},
		},
		description: "Document identifier",
	},


	// ----------------------------------
	//   Fields for getInventoryPurchaseOrders
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryPurchaseOrders'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryPurchaseOrders'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"date_from\": 1609459200,\n  \"date_to\": 1640995199,\n  \"page\": 1\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for getInventoryPurchaseOrders',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryPurchaseOrders'],
				parameterMode: ['fields'],
			},
		},
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 100,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryPurchaseOrders'],
				parameterMode: ['fields'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryPurchaseOrders'],
				parameterMode: ['fields'],
				returnAll: [false],
			},
		},
		description: 'Results page number',
	},
	{
		displayName: 'Warehouse Id',
		name: 'warehouse_id',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryPurchaseOrders'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Warehouse ID. The list of identifiers can be retrieved using the method getInventoryWarehouses.",
	},
	{
		displayName: 'Supplier Id',
		name: 'supplier_id',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryPurchaseOrders'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Limiting results to a specific supplier ID",
	},
	{
		displayName: 'Series Id',
		name: 'series_id',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryPurchaseOrders'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Limiting results to a specific document series ID",
	},
	{
		displayName: 'Date From',
		name: 'date_from',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryPurchaseOrders'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Date from which documents should be retrieved (Unix timestamp)",
	},
	{
		displayName: 'Date To',
		name: 'date_to',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryPurchaseOrders'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Date up to which documents should be retrieved (Unix timestamp)",
	},
	{
		displayName: 'Filter Document Number',
		name: 'filter_document_number',
		type: 'string',
		required: false,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryPurchaseOrders'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Filtering by document number (full or partial match)",
	},
	{
		displayName: 'Filter Product Id',
		name: 'filter_product_id',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryPurchaseOrders'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Limiting results to purchase orders containing a product with the given ID",
	},


	// ----------------------------------
	//   Fields for getInventoryPurchaseOrderItems
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryPurchaseOrderItems'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryPurchaseOrderItems'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"order_id\": 452\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for getInventoryPurchaseOrderItems',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryPurchaseOrderItems'],
				parameterMode: ['fields'],
			},
		},
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 100,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryPurchaseOrderItems'],
				parameterMode: ['fields'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryPurchaseOrderItems'],
				parameterMode: ['fields'],
				returnAll: [false],
			},
		},
		description: 'Results page number',
	},
	{
		displayName: 'Order Id',
		name: 'order_id',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryPurchaseOrderItems'],
				parameterMode: ['fields'],
			},
		},
		description: "Purchase order identifier",
	},


	// ----------------------------------
	//   Fields for getInventoryPurchaseOrderSeries
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryPurchaseOrderSeries'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryPurchaseOrderSeries'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"warehouse_id\": 205\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for getInventoryPurchaseOrderSeries',
	},
	{
		displayName: 'Warehouse Id',
		name: 'warehouse_id',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryPurchaseOrderSeries'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Filter series by warehouse ID",
	},


	// ----------------------------------
	//   Fields for getInventoryPurchaseOrderLogs
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryPurchaseOrderLogs'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryPurchaseOrderLogs'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"purchase_order_id\": 456,\n  \"date_from\": 1700000000\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for getInventoryPurchaseOrderLogs',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryPurchaseOrderLogs'],
				parameterMode: ['fields'],
			},
		},
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 100,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryPurchaseOrderLogs'],
				parameterMode: ['fields'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryPurchaseOrderLogs'],
				parameterMode: ['fields'],
				returnAll: [false],
			},
		},
		description: 'Results page number',
	},
	{
		displayName: 'Purchase Order Id',
		name: 'purchase_order_id',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryPurchaseOrderLogs'],
				parameterMode: ['fields'],
			},
		},
		description: "Purchase order (delivery) identifier.",
	},
	{
		displayName: 'Date From',
		name: 'date_from',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryPurchaseOrderLogs'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Date from which logs are to be retrieved. Unix timestamp format.",
	},
	{
		displayName: 'Date To',
		name: 'date_to',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryPurchaseOrderLogs'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Date to which logs are to be retrieved. Unix timestamp format.",
	},
	{
		displayName: 'Log Type',
		name: 'log_type',
		type: 'json',
		required: false,
		default: '[]',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryPurchaseOrderLogs'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Array of event type IDs you want to retrieve. Available values:0 - Purchase order creation1 - Purchase order deletion2 - Status change3 - Email sent to supplier4 - Text field modifications5 - Items modifications6 - Landed costs modifications7 - Packages modifications8 - Shared via supply page9 - Item negotiations10 - Purchase order merge11 - Purchase order split",
	},
	{
		displayName: 'Sort',
		name: 'sort',
		type: 'string',
		required: false,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryPurchaseOrderLogs'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Log sorting direction. Default: \"ASC\".",
	},


	// ----------------------------------
	//   Fields for getInventoryPurchaseOrderFile
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryPurchaseOrderFile'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryPurchaseOrderFile'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"purchase_order_id\": 4521\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for getInventoryPurchaseOrderFile',
	},
	{
		displayName: 'Download as Binary Data',
		name: 'downloadAsBinary',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryPurchaseOrderFile'],
				parameterMode: ['fields'],
			},
		},
		description: 'Whether to download the base64 file decoded directly into native n8n binary data attachment',
	},
	{
		displayName: 'Binary Property Name',
		name: 'binaryPropertyName',
		type: 'string',
		default: 'data',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryPurchaseOrderFile'],
				parameterMode: ['fields'],
				downloadAsBinary: [true],
			},
		},
		description: 'Name of the binary property to store the file in',
	},
	{
		displayName: 'Purchase Order Id',
		name: 'purchase_order_id',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryPurchaseOrderFile'],
				parameterMode: ['fields'],
			},
		},
		description: "Purchase order identifier from BaseLinker",
	},


	// ----------------------------------
	//   Fields for addInventoryPurchaseOrder
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryPurchaseOrder'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryPurchaseOrder'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"warehouse_id\": 1,\n  \"supplier_id\": 5,\n  \"payer_id\": 1,\n  \"currency\": \"EUR\",\n  \"name\": \"Monthly stock delivery\",\n  \"notes\": \"Monthly stock delivery\",\n  \"invoice_no\": \"FV/2021/12/123\",\n  \"date_cost_invoice_issue\": 1640908800,\n  \"date_delivery_expected\": 1640908800,\n  \"additional_costs\": [\n    {\n      \"name\": \"Transport\",\n      \"cost\": 120.5\n    },\n    {\n      \"name\": \"Insurance\",\n      \"cost\": 35\n    }\n  ],\n  \"packages\": [\n    {\n      \"courier_code\": \"dpd\",\n      \"package_number\": \"1234567890\"\n    },\n    {\n      \"courier_code\": \"other\",\n      \"courier_other_name\": \"Local Courier\",\n      \"package_number\": \"LC-9876543\"\n    }\n  ]\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for addInventoryPurchaseOrder',
	},
	{
		displayName: 'Warehouse Id',
		name: 'warehouse_id',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryPurchaseOrder'],
				parameterMode: ['fields'],
			},
		},
		description: "Warehouse identifier",
	},
	{
		displayName: 'Supplier Id',
		name: 'supplier_id',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryPurchaseOrder'],
				parameterMode: ['fields'],
			},
		},
		description: "Supplier identifier",
	},
	{
		displayName: 'Payer Id',
		name: 'payer_id',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryPurchaseOrder'],
				parameterMode: ['fields'],
			},
		},
		description: "Payer identifier",
	},
	{
		displayName: 'Currency',
		name: 'currency',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryPurchaseOrder'],
				parameterMode: ['fields'],
			},
		},
		description: "Order currency (e.g. EUR, USD)",
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: false,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryPurchaseOrder'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Order name",
	},
	{
		displayName: 'Notes',
		name: 'notes',
		type: 'string',
		required: false,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryPurchaseOrder'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Order description/notes",
	},
	{
		displayName: 'Invoice No',
		name: 'invoice_no',
		type: 'string',
		required: false,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryPurchaseOrder'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Related invoice number",
	},
	{
		displayName: 'Date Cost Invoice Issue',
		name: 'date_cost_invoice_issue',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryPurchaseOrder'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Cost invoice issue date as unix timestamp",
	},
	{
		displayName: 'Date Delivery Expected',
		name: 'date_delivery_expected',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryPurchaseOrder'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Expected delivery date as unix timestamp",
	},
	{
		displayName: 'Additional Costs',
		name: 'additional_costs',
		type: 'json',
		required: false,
		default: '[]',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryPurchaseOrder'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) List of additional costs assigned to the purchase order. Each element should contain fields listed below",
	},
	{
		displayName: 'Packages',
		name: 'packages',
		type: 'json',
		required: false,
		default: '[]',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryPurchaseOrder'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) List of packages with tracking information assigned to the purchase order. Each element should contain fields listed below",
	},


	// ----------------------------------
	//   Fields for addInventoryPurchaseOrderItems
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryPurchaseOrderItems'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryPurchaseOrderItems'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"order_id\": 1234,\n  \"items\": [\n    {\n      \"product_id\": 5432,\n      \"quantity\": 5,\n      \"item_cost\": 10.99,\n      \"supplier_code\": \"SUP-001\",\n      \"location\": \"A-1-2\",\n      \"batch\": \"LOT2021\",\n      \"expiry_date\": \"2023-12-31\",\n      \"serial_no\": \"SN20211231001\",\n      \"comments\": \"Important item\"\n    },\n    {\n      \"product_id\": 5433,\n      \"quantity\": 3,\n      \"item_cost\": 24.5,\n      \"location\": \"A-2-1\"\n    },\n    {\n      \"item_id\": 1001,\n      \"quantity\": 8,\n      \"item_cost\": 12.5\n    }\n  ]\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for addInventoryPurchaseOrderItems',
	},
	{
		displayName: 'Order Id',
		name: 'order_id',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryPurchaseOrderItems'],
				parameterMode: ['fields'],
			},
		},
		description: "Purchase order identifier",
	},
	{
		displayName: 'Items',
		name: 'items',
		type: 'json',
		required: true,
		default: '[]',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryPurchaseOrderItems'],
				parameterMode: ['fields'],
			},
		},
		description: "List of items to add or update. At most 1000 items with item_id can be updated at a time. Each item should contain fields listed below",
	},


	// ----------------------------------
	//   Fields for addInventoryPurchaseOrderFile
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryPurchaseOrderFile'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryPurchaseOrderFile'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"purchase_order_id\": 4521,\n  \"file\": \"data:4AAQSkZJRgABA[...]\",\n  \"cost_invoice_no\": \"FV/2026/03/001\"\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for addInventoryPurchaseOrderFile',
	},
	{
		displayName: 'Purchase Order Id',
		name: 'purchase_order_id',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryPurchaseOrderFile'],
				parameterMode: ['fields'],
			},
		},
		description: "Purchase order identifier from BaseLinker",
	},
	{
		displayName: 'File',
		name: 'file',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryPurchaseOrderFile'],
				parameterMode: ['fields'],
			},
		},
		description: "Invoice PDF file in binary format encoded in base64. Provide a prefix \"data:\" at the beginning e.g. \"data:4AAQSkSzkJRgABA[...]\"",
	},
	{
		displayName: 'Cost Invoice No',
		name: 'cost_invoice_no',
		type: 'string',
		required: false,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryPurchaseOrderFile'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Cost invoice number",
	},


	// ----------------------------------
	//   Fields for deleteInventoryPurchaseOrderItems
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['deleteInventoryPurchaseOrderItems'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['deleteInventoryPurchaseOrderItems'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"order_id\": 1234,\n  \"item_ids\": [\n    1002,\n    1003\n  ]\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for deleteInventoryPurchaseOrderItems',
	},
	{
		displayName: 'Order Id',
		name: 'order_id',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['deleteInventoryPurchaseOrderItems'],
				parameterMode: ['fields'],
			},
		},
		description: "Purchase order identifier",
	},
	{
		displayName: 'Item Ids',
		name: 'item_ids',
		type: 'json',
		required: true,
		default: '[]',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['deleteInventoryPurchaseOrderItems'],
				parameterMode: ['fields'],
			},
		},
		description: "Purchase order item identifiers to remove. Maximum 1000 items at a time.",
	},


	// ----------------------------------
	//   Fields for setInventoryPurchaseOrderStatus
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['setInventoryPurchaseOrderStatus'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['setInventoryPurchaseOrderStatus'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"order_id\": 1234,\n  \"status\": 2,\n  \"completed_items\": [\n    {\n      \"item_id\": 1,\n      \"completed_quantity\": 3\n    }\n  ]\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for setInventoryPurchaseOrderStatus',
	},
	{
		displayName: 'Order Id',
		name: 'order_id',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['setInventoryPurchaseOrderStatus'],
				parameterMode: ['fields'],
			},
		},
		description: "Purchase order identifier",
	},
	{
		displayName: 'Status',
		name: 'status',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['setInventoryPurchaseOrderStatus'],
				parameterMode: ['fields'],
			},
		},
		description: "New order status. Available values:0 - draft1 - sent2 - received3 - completed4 - completed partially5 - canceled6 - received (not started)",
	},
	{
		displayName: 'Completed Items',
		name: 'completed_items',
		type: 'json',
		required: false,
		default: '[]',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['setInventoryPurchaseOrderStatus'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) List of items received. Each element should contain fields listed below",
	},


	// ----------------------------------
	//   Fields for getInventoryTransfers
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryTransfers'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryTransfers'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"filter_warehouse_id\": 205,\n  \"filter_transfer_status\": 0,\n  \"filter_date_from\": 1693459200,\n  \"page\": 1\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for getInventoryTransfers',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryTransfers'],
				parameterMode: ['fields'],
			},
		},
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 100,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryTransfers'],
				parameterMode: ['fields'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryTransfers'],
				parameterMode: ['fields'],
				returnAll: [false],
			},
		},
		description: 'Results page number',
	},
	{
		displayName: 'Filter Transfer Id',
		name: 'filter_transfer_id',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryTransfers'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Filter by a specific transfer ID",
	},
	{
		displayName: 'Filter Warehouse Id',
		name: 'filter_warehouse_id',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryTransfers'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Filter by source warehouse ID",
	},
	{
		displayName: 'Filter Target Warehouse Id',
		name: 'filter_target_warehouse_id',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryTransfers'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Filter by target warehouse ID",
	},
	{
		displayName: 'Filter Transfer Status',
		name: 'filter_transfer_status',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryTransfers'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Filter by transfer status: 0 - draft, 1 - commissioned, 2 - in progress, 3 - completed",
	},
	{
		displayName: 'Filter Transfer Type',
		name: 'filter_transfer_type',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryTransfers'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Filter by transfer type: 0 - replenishment, 1 - putaway transfer, 2 - location change",
	},
	{
		displayName: 'Filter Series Id',
		name: 'filter_series_id',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryTransfers'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Filter by numbering series identifier",
	},
	{
		displayName: 'Filter Date From',
		name: 'filter_date_from',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryTransfers'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Minimum creation date (unix timestamp)",
	},
	{
		displayName: 'Filter Date To',
		name: 'filter_date_to',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryTransfers'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Maximum creation date (unix timestamp)",
	},
	{
		displayName: 'Filter Transfer Number',
		name: 'filter_transfer_number',
		type: 'string',
		required: false,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryTransfers'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Filter by transfer number (partial match)",
	},


	// ----------------------------------
	//   Fields for getInventoryTransferItems
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryTransferItems'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryTransferItems'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"transfer_id\": 452\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for getInventoryTransferItems',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryTransferItems'],
				parameterMode: ['fields'],
			},
		},
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 100,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryTransferItems'],
				parameterMode: ['fields'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryTransferItems'],
				parameterMode: ['fields'],
				returnAll: [false],
			},
		},
		description: 'Results page number',
	},
	{
		displayName: 'Transfer Id',
		name: 'transfer_id',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryTransferItems'],
				parameterMode: ['fields'],
			},
		},
		description: "Transfer identifier",
	},


	// ----------------------------------
	//   Fields for getInventoryTransferSeries
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryTransferSeries'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryTransferSeries'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"warehouse_id\": 205\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for getInventoryTransferSeries',
	},
	{
		displayName: 'Warehouse Id',
		name: 'warehouse_id',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryTransferSeries'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Filter series by warehouse ID",
	},


	// ----------------------------------
	//   Fields for addInventoryTransfer
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryTransfer'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryTransfer'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"warehouse_id\": 205,\n  \"target_warehouse_id\": 310,\n  \"transfer_type\": 0,\n  \"name\": \"Stock replenishment March 2026\",\n  \"priority\": 2,\n  \"date_scheduled\": 1740479190,\n  \"date_due\": 1740565590,\n  \"notes\": \"Restock picking warehouse from high storage\"\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for addInventoryTransfer',
	},
	{
		displayName: 'Warehouse Id',
		name: 'warehouse_id',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryTransfer'],
				parameterMode: ['fields'],
			},
		},
		description: "Source warehouse identifier",
	},
	{
		displayName: 'Target Warehouse Id',
		name: 'target_warehouse_id',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryTransfer'],
				parameterMode: ['fields'],
			},
		},
		description: "Target warehouse identifier. Can be the same as source warehouse for intra-warehouse location transfers.",
	},
	{
		displayName: 'Transfer Type',
		name: 'transfer_type',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryTransfer'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Transfer type: 0 - replenishment (default), 1 - putaway transfer, 2 - location change",
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: false,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryTransfer'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Transfer name/description",
	},
	{
		displayName: 'Priority',
		name: 'priority',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryTransfer'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Priority: 0 - low (default), 1 - medium, 2 - high, 3 - urgent",
	},
	{
		displayName: 'Assigned To',
		name: 'assigned_to',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryTransfer'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Assigned employee identifier",
	},
	{
		displayName: 'Date Scheduled',
		name: 'date_scheduled',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryTransfer'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Scheduled date (unix timestamp)",
	},
	{
		displayName: 'Date Due',
		name: 'date_due',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryTransfer'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Due date (unix timestamp). Must be later than or equal to date_scheduled.",
	},
	{
		displayName: 'Notes',
		name: 'notes',
		type: 'string',
		required: false,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryTransfer'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Transfer notes/comments",
	},


	// ----------------------------------
	//   Fields for addInventoryTransferItems
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryTransferItems'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryTransferItems'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"transfer_id\": 452,\n  \"items\": [\n    {\n      \"product_id\": 5432,\n      \"quantity\": 10,\n      \"location_name\": \"A-1-2\",\n      \"target_location_name\": \"B-3-1\",\n      \"expiry_date\": \"2026-12-31\",\n      \"batch\": \"LOT2026A\",\n      \"serial_no\": \"\"\n    },\n    {\n      \"product_id\": 5433,\n      \"quantity\": 5,\n      \"location_name\": \"A-1-3\",\n      \"target_location_name\": \"B-3-2\"\n    },\n    {\n      \"item_id\": 1001,\n      \"quantity\": 8\n    }\n  ]\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for addInventoryTransferItems',
	},
	{
		displayName: 'Transfer Id',
		name: 'transfer_id',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryTransferItems'],
				parameterMode: ['fields'],
			},
		},
		description: "Transfer identifier",
	},
	{
		displayName: 'Items',
		name: 'items',
		type: 'json',
		required: true,
		default: '[]',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryTransferItems'],
				parameterMode: ['fields'],
			},
		},
		description: "List of items to add or update. At most 1000 items with item_id can be updated at a time",
	},


	// ----------------------------------
	//   Fields for setInventoryTransferStatus
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['setInventoryTransferStatus'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['setInventoryTransferStatus'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"transfer_id\": 452,\n  \"status\": 3,\n  \"completed_items\": [\n    {\n      \"item_id\": 1001,\n      \"completed_quantity\": 10\n    }\n  ]\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for setInventoryTransferStatus',
	},
	{
		displayName: 'Transfer Id',
		name: 'transfer_id',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['setInventoryTransferStatus'],
				parameterMode: ['fields'],
			},
		},
		description: "Transfer identifier",
	},
	{
		displayName: 'Status',
		name: 'status',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['setInventoryTransferStatus'],
				parameterMode: ['fields'],
			},
		},
		description: "Target transfer status: 0 - draft, 1 - commissioned, 2 - in progress, 3 - completed.",
	},
	{
		displayName: 'Completed Items',
		name: 'completed_items',
		type: 'json',
		required: false,
		default: '[]',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['setInventoryTransferStatus'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) List of transferred items. Unlisted unverified items are marked as missing goods.",
	},


	// ----------------------------------
	//   Fields for getInventoryStocktakes
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryStocktakes'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryStocktakes'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"filter_warehouse_id\": 205,\n  \"filter_stocktake_status\": 0,\n  \"filter_date_from\": 1693459200,\n  \"page\": 1\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for getInventoryStocktakes',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryStocktakes'],
				parameterMode: ['fields'],
			},
		},
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 100,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryStocktakes'],
				parameterMode: ['fields'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryStocktakes'],
				parameterMode: ['fields'],
				returnAll: [false],
			},
		},
		description: 'Results page number',
	},
	{
		displayName: 'Filter Stocktake Id',
		name: 'filter_stocktake_id',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryStocktakes'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Filter by a specific stocktake identifier",
	},
	{
		displayName: 'Filter Warehouse Id',
		name: 'filter_warehouse_id',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryStocktakes'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Filter by warehouse identifier",
	},
	{
		displayName: 'Filter Stocktake Status',
		name: 'filter_stocktake_status',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryStocktakes'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Filter by stocktake status: 0 - draft, 1 - commissioned, 2 - in progress, 3 - completed, 4 - counted, 5 - rejected",
	},
	{
		displayName: 'Filter Series Id',
		name: 'filter_series_id',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryStocktakes'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Filter by numbering series identifier",
	},
	{
		displayName: 'Filter Stocktake Number',
		name: 'filter_stocktake_number',
		type: 'string',
		required: false,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryStocktakes'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Filter by stocktake number (partial match)",
	},
	{
		displayName: 'Filter Date From',
		name: 'filter_date_from',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryStocktakes'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Minimum creation date (unix timestamp)",
	},
	{
		displayName: 'Filter Date To',
		name: 'filter_date_to',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryStocktakes'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Maximum creation date (unix timestamp)",
	},


	// ----------------------------------
	//   Fields for getInventoryStocktakeItems
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryStocktakeItems'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryStocktakeItems'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"stocktake_id\": 452\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for getInventoryStocktakeItems',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryStocktakeItems'],
				parameterMode: ['fields'],
			},
		},
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 100,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryStocktakeItems'],
				parameterMode: ['fields'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryStocktakeItems'],
				parameterMode: ['fields'],
				returnAll: [false],
			},
		},
		description: 'Results page number',
	},
	{
		displayName: 'Stocktake Id',
		name: 'stocktake_id',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryStocktakeItems'],
				parameterMode: ['fields'],
			},
		},
		description: "Stocktake identifier",
	},


	// ----------------------------------
	//   Fields for getInventoryStocktakeSeries
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryStocktakeSeries'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryStocktakeSeries'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"warehouse_id\": 205\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for getInventoryStocktakeSeries',
	},
	{
		displayName: 'Warehouse Id',
		name: 'warehouse_id',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryStocktakeSeries'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Filter series by warehouse ID",
	},


	// ----------------------------------
	//   Fields for addInventoryStocktake
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryStocktake'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryStocktake'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"warehouse_id\": 205,\n  \"scope\": 0,\n  \"name\": \"Monthly full stocktake\",\n  \"priority\": 1,\n  \"assigned_to\": 15,\n  \"date_scheduled\": 1740479190,\n  \"date_due\": 1740565590,\n  \"approval_method\": \"confirm\",\n  \"blind_count\": true,\n  \"confirm_location\": false,\n  \"allow_add_remove_items\": false\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for addInventoryStocktake',
	},
	{
		displayName: 'Warehouse Id',
		name: 'warehouse_id',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryStocktake'],
				parameterMode: ['fields'],
			},
		},
		description: "Warehouse identifier. The list of identifiers can be retrieved using the method getInventoryWarehouses.",
	},
	{
		displayName: 'Scope',
		name: 'scope',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryStocktake'],
				parameterMode: ['fields'],
			},
		},
		description: "Stocktake scope defining which products are included: 0 - all products, 1 - manual product selection, 3 - specific warehouse zones, 4 - specific location prefixes, 5 - random product selection",
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: false,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryStocktake'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Stocktake name/description",
	},
	{
		displayName: 'Priority',
		name: 'priority',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryStocktake'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Priority: 0 - low (default), 1 - medium, 2 - high, 3 - urgent",
	},
	{
		displayName: 'Assigned To',
		name: 'assigned_to',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryStocktake'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Assigned employee identifier",
	},
	{
		displayName: 'Date Scheduled',
		name: 'date_scheduled',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryStocktake'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Execution scheduled date (unix timestamp)",
	},
	{
		displayName: 'Date Due',
		name: 'date_due',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryStocktake'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Execution due date (unix timestamp). Must be later than or equal to date_scheduled.",
	},
	{
		displayName: 'Approval Method',
		name: 'approval_method',
		type: 'string',
		required: false,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryStocktake'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Approval method: \"immediate\" (default) - stocktake is completed immediately after counting, \"confirm\" - requires secondary approval step after counting",
	},
	{
		displayName: 'Blind Count',
		name: 'blind_count',
		type: 'boolean',
		required: false,
		default: false,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryStocktake'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) If true, hides the expected quantity from the counter. Default: false",
	},
	{
		displayName: 'Confirm Location',
		name: 'confirm_location',
		type: 'boolean',
		required: false,
		default: false,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryStocktake'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) If true, forces the user to scan/confirm the location before counting. Default: false",
	},
	{
		displayName: 'Allow Add Remove Items',
		name: 'allow_add_remove_items',
		type: 'boolean',
		required: false,
		default: false,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryStocktake'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) If true, allows adding or removing products during the counting phase. Default: false. Always true for manual scope.",
	},
	{
		displayName: 'Product Ids',
		name: 'product_ids',
		type: 'json',
		required: false,
		default: '[]',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryStocktake'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) List of simple product or variant identifiers to include. Required when scope is 1 (manual).",
	},
	{
		displayName: 'Scope Zones',
		name: 'scope_zones',
		type: 'json',
		required: false,
		default: '[]',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryStocktake'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) List of warehouse zone identifiers. Required when scope is 3 (zones).",
	},
	{
		displayName: 'Scope Locations Prefix',
		name: 'scope_locations_prefix',
		type: 'string',
		required: false,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryStocktake'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Semicolon-separated location name prefixes to filter by. Required when scope is 4 (locations). Example: \"A-1;B-2\"",
	},
	{
		displayName: 'Scope Random Count',
		name: 'scope_random_count',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryStocktake'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Number of random products to select. Required when scope is 5 (random). Must be a positive integer.",
	},


	// ----------------------------------
	//   Fields for addInventoryStocktakeItems
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryStocktakeItems'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryStocktakeItems'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"stocktake_id\": 789,\n  \"items\": [\n    {\n      \"product_id\": 5432,\n      \"quantity\": 10,\n      \"location_name\": \"A-1-2\",\n      \"expiry_date\": \"2026-12-31\",\n      \"batch\": \"LOT2026A\",\n      \"serial_no\": \"\"\n    },\n    {\n      \"product_id\": 5433,\n      \"quantity\": 25,\n      \"location_name\": \"B-3-1\"\n    },\n    {\n      \"item_id\": 1001,\n      \"quantity\": 12\n    }\n  ]\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for addInventoryStocktakeItems',
	},
	{
		displayName: 'Stocktake Id',
		name: 'stocktake_id',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryStocktakeItems'],
				parameterMode: ['fields'],
			},
		},
		description: "Stocktake identifier",
	},
	{
		displayName: 'Items',
		name: 'items',
		type: 'json',
		required: true,
		default: '[]',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryStocktakeItems'],
				parameterMode: ['fields'],
			},
		},
		description: "List of items to add or update. At most 1000 items with item_id can be updated at a time",
	},


	// ----------------------------------
	//   Fields for setInventoryStocktakeStatus
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['setInventoryStocktakeStatus'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['setInventoryStocktakeStatus'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"stocktake_id\": 789,\n  \"status\": 3,\n  \"completed_items\": [\n    {\n      \"item_id\": 1001,\n      \"completed_quantity\": 8\n    }\n  ]\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for setInventoryStocktakeStatus',
	},
	{
		displayName: 'Stocktake Id',
		name: 'stocktake_id',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['setInventoryStocktakeStatus'],
				parameterMode: ['fields'],
			},
		},
		description: "Stocktake identifier",
	},
	{
		displayName: 'Status',
		name: 'status',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['setInventoryStocktakeStatus'],
				parameterMode: ['fields'],
			},
		},
		description: "Target stocktake status: 0 - draft, 1 - commissioned, 2 - in progress, 3 - completed, 4 - counted, 5 - rejected",
	},
	{
		displayName: 'Completed Items',
		name: 'completed_items',
		type: 'json',
		required: false,
		default: '[]',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['setInventoryStocktakeStatus'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) List of verified items with counted quantities. Can be provided when changing status to in progress (2), counted (4), or completed (3).",
	},


	// ----------------------------------
	//   Fields for getInventoryFulfillmentDeliveries
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryFulfillmentDeliveries'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryFulfillmentDeliveries'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"external_warehouse_ids\": [\n    \"2e2d8d52-1c36-4e83-8bb4-3a8090d7d60f\",\n    \"7a9c1e34-6b8d-4f20-9a11-5c3d7e8f2460\"\n  ],\n  \"fulfillment_warehouse_ids\": [\n    100,\n    101\n  ],\n  \"statuses\": [\n    30,\n    40\n  ],\n  \"page\": 0\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for getInventoryFulfillmentDeliveries',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryFulfillmentDeliveries'],
				parameterMode: ['fields'],
			},
		},
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 100,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryFulfillmentDeliveries'],
				parameterMode: ['fields'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryFulfillmentDeliveries'],
				parameterMode: ['fields'],
				returnAll: [false],
			},
		},
		description: 'Results page number',
	},
	{
		displayName: 'Fulfillment Warehouse Id',
		name: 'fulfillment_warehouse_id',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryFulfillmentDeliveries'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Filter by fulfillment warehouse identifier",
	},
	{
		displayName: 'Fulfillment Warehouse Ids',
		name: 'fulfillment_warehouse_ids',
		type: 'json',
		required: false,
		default: '[]',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryFulfillmentDeliveries'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Filter by multiple fulfillment warehouse identifiers (array of ints)",
	},
	{
		displayName: 'External Warehouse Id',
		name: 'external_warehouse_id',
		type: 'string',
		required: false,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryFulfillmentDeliveries'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Filter by external fulfillment center identifier",
	},
	{
		displayName: 'External Warehouse Ids',
		name: 'external_warehouse_ids',
		type: 'json',
		required: false,
		default: '[]',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryFulfillmentDeliveries'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Filter by multiple external fulfillment center identifiers (array of strings)",
	},
	{
		displayName: 'Warehouse Id',
		name: 'warehouse_id',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryFulfillmentDeliveries'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Filter by source warehouse identifier",
	},
	{
		displayName: 'Status',
		name: 'status',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryFulfillmentDeliveries'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Filter by delivery status",
	},
	{
		displayName: 'Statuses',
		name: 'statuses',
		type: 'json',
		required: false,
		default: '[]',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryFulfillmentDeliveries'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Filter by multiple delivery statuses (array of ints)",
	},
	{
		displayName: 'Date From',
		name: 'date_from',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryFulfillmentDeliveries'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Date from filter (unix timestamp)",
	},
	{
		displayName: 'Date To',
		name: 'date_to',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryFulfillmentDeliveries'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Date to filter (unix timestamp)",
	},
	{
		displayName: 'Filter Document Number',
		name: 'filter_document_number',
		type: 'string',
		required: false,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryFulfillmentDeliveries'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Filter by document number (partial match)",
	},


	// ----------------------------------
	//   Fields for getInventoryFulfillmentDeliveryItems
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryFulfillmentDeliveryItems'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryFulfillmentDeliveryItems'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"delivery_id\": 42\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for getInventoryFulfillmentDeliveryItems',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryFulfillmentDeliveryItems'],
				parameterMode: ['fields'],
			},
		},
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 100,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryFulfillmentDeliveryItems'],
				parameterMode: ['fields'],
				returnAll: [false],
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryFulfillmentDeliveryItems'],
				parameterMode: ['fields'],
				returnAll: [false],
			},
		},
		description: 'Results page number',
	},
	{
		displayName: 'Delivery Id',
		name: 'delivery_id',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryFulfillmentDeliveryItems'],
				parameterMode: ['fields'],
			},
		},
		description: "Fulfillment delivery identifier",
	},


	// ----------------------------------
	//   Fields for getInventoryFulfillmentDeliveryLabels
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryFulfillmentDeliveryLabels'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryFulfillmentDeliveryLabels'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"delivery_id\": 23,\n  \"type\": \"box\"\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for getInventoryFulfillmentDeliveryLabels',
	},
	{
		displayName: 'Download as Binary Data',
		name: 'downloadAsBinary',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryFulfillmentDeliveryLabels'],
				parameterMode: ['fields'],
			},
		},
		description: 'Whether to download the base64 file decoded directly into native n8n binary data attachment',
	},
	{
		displayName: 'Binary Property Name',
		name: 'binaryPropertyName',
		type: 'string',
		default: 'data',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryFulfillmentDeliveryLabels'],
				parameterMode: ['fields'],
				downloadAsBinary: [true],
			},
		},
		description: 'Name of the binary property to store the file in',
	},
	{
		displayName: 'Delivery Id',
		name: 'delivery_id',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryFulfillmentDeliveryLabels'],
				parameterMode: ['fields'],
			},
		},
		description: "Fulfillment delivery identifier",
	},
	{
		displayName: 'Type',
		name: 'type',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['getInventoryFulfillmentDeliveryLabels'],
				parameterMode: ['fields'],
			},
		},
		description: "Type of labels to download",
	},


	// ----------------------------------
	//   Fields for addInventoryFulfillmentDelivery
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryFulfillmentDelivery'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryFulfillmentDelivery'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"warehouse_id\": 1,\n  \"fulfillment_warehouse_id\": 5,\n  \"name\": \"Delivery March 2026\"\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for addInventoryFulfillmentDelivery',
	},
	{
		displayName: 'Warehouse Id',
		name: 'warehouse_id',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryFulfillmentDelivery'],
				parameterMode: ['fields'],
			},
		},
		description: "Source warehouse identifier",
	},
	{
		displayName: 'Fulfillment Warehouse Id',
		name: 'fulfillment_warehouse_id',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryFulfillmentDelivery'],
				parameterMode: ['fields'],
			},
		},
		description: "Fulfillment warehouse identifier",
	},
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryFulfillmentDelivery'],
				parameterMode: ['fields'],
			},
		},
		description: "Delivery name",
	},


	// ----------------------------------
	//   Fields for addInventoryFulfillmentDeliveryItems
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryFulfillmentDeliveryItems'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryFulfillmentDeliveryItems'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"delivery_id\": 42,\n  \"items\": [\n    {\n      \"product_id\": 101,\n      \"quantity\": 10\n    },\n    {\n      \"product_id\": 102,\n      \"quantity\": 5\n    }\n  ]\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for addInventoryFulfillmentDeliveryItems',
	},
	{
		displayName: 'Delivery Id',
		name: 'delivery_id',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryFulfillmentDeliveryItems'],
				parameterMode: ['fields'],
			},
		},
		description: "Fulfillment delivery identifier",
	},
	{
		displayName: 'Items',
		name: 'items',
		type: 'json',
		required: true,
		default: '[]',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['addInventoryFulfillmentDeliveryItems'],
				parameterMode: ['fields'],
			},
		},
		description: "Array of items to add to the delivery",
	},


	// ----------------------------------
	//   Fields for runInventoryFulfillmentDeliverySubmission
	// ----------------------------------
	{
		displayName: 'Parameter Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{ name: 'Form Fields', value: 'fields' },
			{ name: 'Raw Parameters (JSON)', value: 'json' },
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['runInventoryFulfillmentDeliverySubmission'],
			},
		},
		description: 'Choose whether to configure request via form fields or raw JSON parameters',
	},
	{
		displayName: 'JSON Parameters',
		name: 'jsonParameters',
		type: 'json',
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['runInventoryFulfillmentDeliverySubmission'],
				parameterMode: ['json'],
			},
		},
		default: "{\n  \"delivery_id\": 42,\n  \"date_arrival\": 1772668800\n}",
		description: 'Raw JSON parameters object according to BaseLinker API docs for runInventoryFulfillmentDeliverySubmission',
	},
	{
		displayName: 'Delivery Id',
		name: 'delivery_id',
		type: 'number',
		required: true,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['runInventoryFulfillmentDeliverySubmission'],
				parameterMode: ['fields'],
			},
		},
		description: "Fulfillment delivery identifier to submit",
	},
	{
		displayName: 'Date Arrival',
		name: 'date_arrival',
		type: 'number',
		required: false,
		default: 0,
		displayOptions: {
			show: {
				resource: ['productCatalog'],
				operation: ['runInventoryFulfillmentDeliverySubmission'],
				parameterMode: ['fields'],
			},
		},
		description: "(optional) Expected arrival date at the fulfillment center (unix timestamp). Required by some integrations that need a planned receipt date (e.g. DHL Fulfillment).",
	},

];
