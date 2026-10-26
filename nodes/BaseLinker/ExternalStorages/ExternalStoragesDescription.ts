import { INodeProperties } from 'n8n-workflow';

export const externalStoragesOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['externalStorages'],
			},
		},
		options: [
			{
				name: 'Get Categories',
				value: 'getExternalStorageCategories',
				description: 'Retrieve a category list from an external storage (method: getExternalStorageCategories)',
				action: 'Get categories from external storage',
			},
			{
				name: 'Get External Storages List',
				value: 'getExternalStoragesList',
				description: 'Retrieve a list of available external storages (shops, wholesalers) (method: getExternalStoragesList)',
				action: 'Get external storages list',
			},
			{
				name: 'Get Products Data',
				value: 'getExternalStorageProductsData',
				description: 'Retrieve detailed data of selected products from an external storage (method: getExternalStorageProductsData)',
				action: 'Get products data from external storage',
			},
			{
				name: 'Get Products List',
				value: 'getExternalStorageProductsList',
				description: 'Retrieve a list of products from an external storage with filters (method: getExternalStorageProductsList)',
				action: 'Get products list from external storage',
			},
			{
				name: 'Get Products Prices',
				value: 'getExternalStorageProductsPrices',
				description: 'Retrieve product prices from an external storage (method: getExternalStorageProductsPrices)',
				action: 'Get products prices from external storage',
			},
			{
				name: 'Get Products Quantity',
				value: 'getExternalStorageProductsQuantity',
				description: 'Retrieve stock quantities from an external storage (method: getExternalStorageProductsQuantity)',
				action: 'Get products quantity from external storage',
			},
			{
				name: 'Update Products Quantity',
				value: 'updateExternalStorageProductsQuantity',
				description: 'Bulk update product and variant stock in an external storage (method: updateExternalStorageProductsQuantity)',
				action: 'Update products quantity in external storage',
			},
		],
		default: 'getExternalStoragesList',
	},
];

export const externalStoragesFields: INodeProperties[] = [
	// ----------------------------------
	//   Mode toggle for methods with parameters
	// ----------------------------------
	{
		displayName: 'Parameters Input Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{
				name: 'Form Fields',
				value: 'fields',
				description: 'Fill in method parameters using visual UI inputs',
			},
			{
				name: 'Raw JSON',
				value: 'json',
				description: 'Provide parameters directly as a JSON object matching BaseLinker API documentation',
			},
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['externalStorages'],
				operation: [
					'getExternalStorageCategories',
					'getExternalStorageProductsList',
					'getExternalStorageProductsData',
					'getExternalStorageProductsQuantity',
					'getExternalStorageProductsPrices',
					'updateExternalStorageProductsQuantity',
				],
			},
		},
		description: 'Choose whether to configure parameters via UI fields or provide raw JSON object',
	},

	// ----------------------------------
	//   JSON Mode for getExternalStorageCategories
	// ----------------------------------
	{
		displayName: 'JSON Parameters',
		name: 'parametersJson',
		type: 'json',
		default: '{\n  "storage_id": "shop_2445"\n}',
		displayOptions: {
			show: {
				resource: ['externalStorages'],
				operation: ['getExternalStorageCategories'],
				parameterMode: ['json'],
			},
		},
		description: 'Raw parameters object sent to getExternalStorageCategories method',
	},

	// ----------------------------------
	//   Fields Mode for getExternalStorageCategories
	// ----------------------------------
	{
		displayName: 'Storage Name or ID',
		name: 'storage_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getExternalStorages',
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['externalStorages'],
				operation: ['getExternalStorageCategories'],
				parameterMode: ['fields'],
			},
		},
		description: 'External storage ID in format "[type:shop|warehouse]_[id:int]" (e.g. "shop_2445"). Choose from the list, or specify an ID using an <expression>.',
	},

	// ----------------------------------
	//   JSON Mode for getExternalStorageProductsList
	// ----------------------------------
	{
		displayName: 'JSON Parameters',
		name: 'parametersJson',
		type: 'json',
		default: '{\n  "storage_id": "shop_2445",\n  "filter_category_id": "543"\n}',
		displayOptions: {
			show: {
				resource: ['externalStorages'],
				operation: ['getExternalStorageProductsList'],
				parameterMode: ['json'],
			},
		},
		description: 'Raw parameters object sent to getExternalStorageProductsList method',
	},

	// ----------------------------------
	//   Fields Mode for getExternalStorageProductsList
	// ----------------------------------
	{
		displayName: 'Storage Name or ID',
		name: 'storage_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getExternalStorages',
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['externalStorages'],
				operation: ['getExternalStorageProductsList'],
				parameterMode: ['fields'],
			},
		},
		description: 'External storage ID in format "[type:shop|warehouse]_[id:int]" (e.g. "shop_2445"). Choose from the list, or specify an ID using an <expression>.',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['externalStorages'],
				operation: ['getExternalStorageProductsList'],
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
				resource: ['externalStorages'],
				operation: ['getExternalStorageProductsList'],
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
				resource: ['externalStorages'],
				operation: ['getExternalStorageProductsList'],
				parameterMode: ['fields'],
				returnAll: [false],
			},
		},
		description: 'Results paging',
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
				resource: ['externalStorages'],
				operation: ['getExternalStorageProductsList'],
				parameterMode: ['fields'],
				returnAll: [true],
			},
		},
		description: 'Delay in milliseconds between pagination requests to avoid BaseLinker rate limits (100 req/min)',
	},
	{
		displayName: 'Filters',
		name: 'filters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['externalStorages'],
				operation: ['getExternalStorageProductsList'],
				parameterMode: ['fields'],
			},
		},
		options: [
			{
				displayName: 'Category Name or ID',
				name: 'filter_category_id',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getExternalStorageCategories',
				},
				default: '',
				description: 'Retrieving products from a specific category. Choose from the list, or specify an ID using an <expression>.',
			},
			{
				displayName: 'Sort',
				name: 'filter_sort',
				type: 'options',
				options: [
					{ name: 'ID (Ascending)', value: 'id ASC' },
					{ name: 'ID (Descending)', value: 'id DESC' },
					{ name: 'Name (Ascending)', value: 'name ASC' },
					{ name: 'Name (Descending)', value: 'name DESC' },
					{ name: 'Quantity (Ascending)', value: 'quantity ASC' },
					{ name: 'Quantity (Descending)', value: 'quantity DESC' },
					{ name: 'Price (Ascending)', value: 'price ASC' },
					{ name: 'Price (Descending)', value: 'price DESC' },
				],
				default: 'id ASC',
				description: 'The sorting value for the product list',
			},
			{
				displayName: 'Product ID',
				name: 'filter_id',
				type: 'string',
				default: '',
				description: 'Limiting results to a specific product ID',
			},
			{
				displayName: 'SKU',
				name: 'filter_sku',
				type: 'string',
				default: '',
				description: 'Limiting results to a specific SKU',
			},
			{
				displayName: 'EAN',
				name: 'filter_ean',
				type: 'string',
				default: '',
				description: 'Limiting results to a specific EAN',
			},
			{
				displayName: 'ASIN',
				name: 'filter_asin',
				type: 'string',
				default: '',
				description: 'Limiting results to a specific ASIN',
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
				default: 0,
				description: 'Minimum price limit (does not display products with lower price)',
			},
			{
				displayName: 'Price To',
				name: 'filter_price_to',
				type: 'number',
				default: 0,
				description: 'Maximum price limit',
			},
			{
				displayName: 'Quantity From',
				name: 'filter_quantity_from',
				type: 'number',
				default: 0,
				description: 'Minimum quantity limit',
			},
			{
				displayName: 'Quantity To',
				name: 'filter_quantity_to',
				type: 'number',
				default: 0,
				description: 'Maximum quantity limit',
			},
			{
				displayName: 'Availability',
				name: 'filter_available',
				type: 'options',
				options: [
					{ name: 'All', value: '' },
					{ name: 'Available Only', value: 1 },
					{ name: 'Not Available Only', value: 0 },
				],
				default: '',
				description: 'Displaying only products marked as available, not available, or all',
			},
		],
	},

	// ----------------------------------
	//   JSON Mode for getExternalStorageProductsData
	// ----------------------------------
	{
		displayName: 'JSON Parameters',
		name: 'parametersJson',
		type: 'json',
		default: '{\n  "storage_id": "shop_2445",\n  "products": [\n    524,\n    734\n  ]\n}',
		displayOptions: {
			show: {
				resource: ['externalStorages'],
				operation: ['getExternalStorageProductsData'],
				parameterMode: ['json'],
			},
		},
		description: 'Raw parameters object sent to getExternalStorageProductsData method',
	},

	// ----------------------------------
	//   Fields Mode for getExternalStorageProductsData
	// ----------------------------------
	{
		displayName: 'Storage Name or ID',
		name: 'storage_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getExternalStorages',
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['externalStorages'],
				operation: ['getExternalStorageProductsData'],
				parameterMode: ['fields'],
			},
		},
		description: 'External storage ID in format "[type:shop|warehouse]_[id:int]" (e.g. "shop_2445"). Choose from the list, or specify an ID using an <expression>.',
	},
	{
		displayName: 'Product IDs',
		name: 'productIds',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['externalStorages'],
				operation: ['getExternalStorageProductsData'],
				parameterMode: ['fields'],
			},
		},
		description: 'Comma-separated list of product ID numbers to download (e.g. "524, 734") or JSON array',
	},

	// ----------------------------------
	//   JSON Mode for getExternalStorageProductsQuantity
	// ----------------------------------
	{
		displayName: 'JSON Parameters',
		name: 'parametersJson',
		type: 'json',
		default: '{\n  "storage_id": "shop_2445"\n}',
		displayOptions: {
			show: {
				resource: ['externalStorages'],
				operation: ['getExternalStorageProductsQuantity'],
				parameterMode: ['json'],
			},
		},
		description: 'Raw parameters object sent to getExternalStorageProductsQuantity method',
	},

	// ----------------------------------
	//   Fields Mode for getExternalStorageProductsQuantity
	// ----------------------------------
	{
		displayName: 'Storage Name or ID',
		name: 'storage_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getExternalStorages',
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['externalStorages'],
				operation: ['getExternalStorageProductsQuantity'],
				parameterMode: ['fields'],
			},
		},
		description: 'External storage ID in format "[type:shop|warehouse]_[id:int]" (e.g. "shop_2445"). Choose from the list, or specify an ID using an <expression>.',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['externalStorages'],
				operation: ['getExternalStorageProductsQuantity'],
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
				resource: ['externalStorages'],
				operation: ['getExternalStorageProductsQuantity'],
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
				resource: ['externalStorages'],
				operation: ['getExternalStorageProductsQuantity'],
				parameterMode: ['fields'],
				returnAll: [false],
			},
		},
		description: 'Results paging',
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
				resource: ['externalStorages'],
				operation: ['getExternalStorageProductsQuantity'],
				parameterMode: ['fields'],
				returnAll: [true],
			},
		},
		description: 'Delay in milliseconds between pagination requests to avoid BaseLinker rate limits (100 req/min)',
	},

	// ----------------------------------
	//   JSON Mode for getExternalStorageProductsPrices
	// ----------------------------------
	{
		displayName: 'JSON Parameters',
		name: 'parametersJson',
		type: 'json',
		default: '{\n  "storage_id": "shop_2445"\n}',
		displayOptions: {
			show: {
				resource: ['externalStorages'],
				operation: ['getExternalStorageProductsPrices'],
				parameterMode: ['json'],
			},
		},
		description: 'Raw parameters object sent to getExternalStorageProductsPrices method',
	},

	// ----------------------------------
	//   Fields Mode for getExternalStorageProductsPrices
	// ----------------------------------
	{
		displayName: 'Storage Name or ID',
		name: 'storage_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getExternalStorages',
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['externalStorages'],
				operation: ['getExternalStorageProductsPrices'],
				parameterMode: ['fields'],
			},
		},
		description: 'External storage ID in format "[type:shop|warehouse]_[id:int]" (e.g. "shop_2445"). Choose from the list, or specify an ID using an <expression>.',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['externalStorages'],
				operation: ['getExternalStorageProductsPrices'],
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
				resource: ['externalStorages'],
				operation: ['getExternalStorageProductsPrices'],
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
				resource: ['externalStorages'],
				operation: ['getExternalStorageProductsPrices'],
				parameterMode: ['fields'],
				returnAll: [false],
			},
		},
		description: 'Results paging',
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
				resource: ['externalStorages'],
				operation: ['getExternalStorageProductsPrices'],
				parameterMode: ['fields'],
				returnAll: [true],
			},
		},
		description: 'Delay in milliseconds between pagination requests to avoid BaseLinker rate limits (100 req/min)',
	},

	// ----------------------------------
	//   JSON Mode for updateExternalStorageProductsQuantity
	// ----------------------------------
	{
		displayName: 'JSON Parameters',
		name: 'parametersJson',
		type: 'json',
		default: '{\n  "storage_id": "shop_2445",\n  "products": [\n    [1081730, 0, 100],\n    [1081730, 1734642, 150]\n  ]\n}',
		displayOptions: {
			show: {
				resource: ['externalStorages'],
				operation: ['updateExternalStorageProductsQuantity'],
				parameterMode: ['json'],
			},
		},
		description: 'Raw parameters object sent to updateExternalStorageProductsQuantity method',
	},

	// ----------------------------------
	//   Fields Mode for updateExternalStorageProductsQuantity
	// ----------------------------------
	{
		displayName: 'Storage Name or ID',
		name: 'storage_id',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getExternalStorages',
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['externalStorages'],
				operation: ['updateExternalStorageProductsQuantity'],
				parameterMode: ['fields'],
			},
		},
		description: 'External storage ID in format "[type:shop|warehouse]_[id:int]" (e.g. "shop_2445"). Choose from the list, or specify an ID using an <expression>.',
	},
	{
		displayName: 'Update Mode',
		name: 'stockUpdateMode',
		type: 'options',
		options: [
			{
				name: 'Single Product / Variant',
				value: 'single',
				description: 'Update the stock of a single product or variant',
			},
			{
				name: 'Multiple Products (UI Form)',
				value: 'multipleUi',
				description: 'Provide multiple products using visual form list',
			},
			{
				name: 'Multiple Products (Raw JSON Array)',
				value: 'multipleJson',
				description: 'Provide an array of [productId, variantId, quantity] tuples in JSON format',
			},
		],
		default: 'single',
		displayOptions: {
			show: {
				resource: ['externalStorages'],
				operation: ['updateExternalStorageProductsQuantity'],
				parameterMode: ['fields'],
			},
		},
		description: 'Choose whether to update a single product or bulk update multiple items',
	},
	{
		displayName: 'Product ID',
		name: 'product_id',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['externalStorages'],
				operation: ['updateExternalStorageProductsQuantity'],
				parameterMode: ['fields'],
				stockUpdateMode: ['single'],
			},
		},
		description: 'Product ID number in external storage',
	},
	{
		displayName: 'Variant ID',
		name: 'variant_id',
		type: 'string',
		default: '0',
		displayOptions: {
			show: {
				resource: ['externalStorages'],
				operation: ['updateExternalStorageProductsQuantity'],
				parameterMode: ['fields'],
				stockUpdateMode: ['single'],
			},
		},
		description: 'Variant ID number (set 0 if the main product is changed, not the variant)',
	},
	{
		displayName: 'Quantity',
		name: 'quantity',
		type: 'number',
		default: 0,
		required: true,
		displayOptions: {
			show: {
				resource: ['externalStorages'],
				operation: ['updateExternalStorageProductsQuantity'],
				parameterMode: ['fields'],
				stockUpdateMode: ['single'],
			},
		},
		description: 'Stock quantity to set in the external storage',
	},
	{
		displayName: 'Products',
		name: 'productsUi',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		default: {},
		placeholder: 'Add Product Stock Update',
		displayOptions: {
			show: {
				resource: ['externalStorages'],
				operation: ['updateExternalStorageProductsQuantity'],
				parameterMode: ['fields'],
				stockUpdateMode: ['multipleUi'],
			},
		},
		options: [
			{
				name: 'values',
				displayName: 'Product',
				values: [
					{
						displayName: 'Product ID',
						name: 'product_id',
						type: 'string',
						default: '',
						required: true,
						description: 'Product ID number in external storage',
					},
					{
						displayName: 'Variant ID',
						name: 'variant_id',
						type: 'string',
						default: '0',
						description: 'Variant ID number (0 if the main product is changed)',
					},
					{
						displayName: 'Quantity',
						name: 'quantity',
						type: 'number',
						default: 0,
						required: true,
						description: 'Stock quantity to set',
					},
				],
			},
		],
		description: 'List of products/variants and their new stock quantities',
	},
	{
		displayName: 'Products Array (JSON)',
		name: 'productsJson',
		type: 'json',
		default: '[\n  [1081730, 0, 100],\n  [1081730, 1734642, 150]\n]',
		displayOptions: {
			show: {
				resource: ['externalStorages'],
				operation: ['updateExternalStorageProductsQuantity'],
				parameterMode: ['fields'],
				stockUpdateMode: ['multipleJson'],
			},
		},
		description: 'Array of products in format [[productId, variantId, quantity], ...]',
	},
];
