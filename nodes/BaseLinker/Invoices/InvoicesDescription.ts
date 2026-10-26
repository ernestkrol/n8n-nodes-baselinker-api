import { INodeProperties } from 'n8n-workflow';

export const invoicesOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['invoices'],
			},
		},
		options: [
			{
				name: 'Add Invoice',
				value: 'addInvoice',
				description: 'Issue an invoice for an order (method: addInvoice)',
				action: 'Add invoice',
			},
			{
				name: 'Add Invoice Correction',
				value: 'addInvoiceCorrection',
				description: 'Issue an invoice correction for an invoice or return order (method: addInvoiceCorrection)',
				action: 'Add invoice correction',
			},
			{
				name: 'Add Order Invoice File',
				value: 'addOrderInvoiceFile',
				description: 'Attach an external PDF or XML file to an issued invoice (method: addOrderInvoiceFile)',
				action: 'Add invoice file',
			},
			{
				name: 'Add Order Receipt File',
				value: 'addOrderReceiptFile',
				description: 'Attach an external PDF or JWS file to an issued receipt (method: addOrderReceiptFile)',
				action: 'Add receipt file',
			},
			{
				name: 'Add Receipt',
				value: 'addReceipt',
				description: 'Issue a receipt for an order (method: addReceipt)',
				action: 'Add receipt',
			},
			{
				name: 'Get Invoice File',
				value: 'getInvoiceFile',
				description: 'Download PDF invoice file from BaseLinker or external accounting integration (method: getInvoiceFile)',
				action: 'Get invoice file',
			},
			{
				name: 'Get Invoices',
				value: 'getInvoices',
				description: 'Retrieve invoices issued from BaseLinker order manager with filtering and pagination (method: getInvoices)',
				action: 'Get invoices',
			},
			{
				name: 'Get New Receipts',
				value: 'getNewReceipts',
				description: 'Retrieve receipts waiting to be printed on fiscal printer (method: getNewReceipts)',
				action: 'Get new receipts',
			},
			{
				name: 'Get Numbering Series',
				value: 'getSeries',
				description: 'Retrieve numbering series for invoices, corrections, and receipts (method: getSeries)',
				action: 'Get numbering series',
			},
			{
				name: 'Get Receipt',
				value: 'getReceipt',
				description: 'Retrieve a single receipt by receipt ID or order ID (method: getReceipt)',
				action: 'Get receipt',
			},
			{
				name: 'Get Receipts',
				value: 'getReceipts',
				description: 'Retrieve issued receipts with filtering and pagination (method: getReceipts)',
				action: 'Get receipts',
			},
			{
				name: 'Set Order Receipt',
				value: 'setOrderReceipt',
				description: 'Mark receipt as printed with fiscal receipt number (method: setOrderReceipt)',
				action: 'Set order receipt',
			},
		],
		default: 'getInvoices',
	},
];

export const invoicesFields: INodeProperties[] = [
	// ----------------------------------
	//   Fields for getInvoices
	// ----------------------------------
	{
		displayName: 'Input Mode',
		name: 'parameterMode',
		type: 'options',
		options: [
			{
				name: 'Form Fields (UI)',
				value: 'fields',
				description: 'Configure filters using UI controls',
			},
			{
				name: 'Raw JSON Payload',
				value: 'json',
				description: 'Provide parameters directly as a raw JSON string or expression',
			},
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['getInvoices'],
			},
		},
		description: 'Choose whether to configure parameters via structured UI inputs or raw JSON',
	},
	{
		displayName: 'Raw Parameters (JSON)',
		name: 'parametersJson',
		type: 'string',
		typeOptions: {
			rows: 5,
		},
		default: '{\n  "date_from": 0\n}',
		placeholder: '{\n  "date_from": 1700000000,\n  "series_id": 15\n}',
		required: true,
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['getInvoices'],
				parameterMode: ['json'],
			},
		},
		description: 'Raw parameters object sent to getInvoices method',
	},
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['getInvoices'],
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
				resource: ['invoices'],
				operation: ['getInvoices'],
				parameterMode: ['fields'],
				returnAll: [true],
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Pagination Cursor Field',
		name: 'paginationField',
		type: 'options',
		options: [
			{
				name: 'ID (id_from) - Recommended',
				value: 'id_from',
				description: 'Sequential pagination based on invoice ID (strictly incremental)',
			},
			{
				name: 'Creation Date (date_from)',
				value: 'date_from',
				description: 'Pagination based on invoice creation date (date_add + 1s)',
			},
		],
		default: 'id_from',
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['getInvoices'],
				parameterMode: ['fields'],
				returnAll: [true],
			},
		},
		description: 'Field used to advance pagination across multiple 100-item batches',
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
				resource: ['invoices'],
				operation: ['getInvoices'],
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
				resource: ['invoices'],
				operation: ['getInvoices'],
				parameterMode: ['fields'],
			},
		},
		options: [
			{
				displayName: 'Invoice ID',
				name: 'invoice_id',
				type: 'number',
				default: '',
				description: 'Invoice identifier. If specified, downloads only one specific invoice.',
			},
			{
				displayName: 'Order ID',
				name: 'order_id',
				type: 'number',
				default: '',
				description: 'Order identifier for which an invoice was issued',
			},
			{
				displayName: 'Date From',
				name: 'date_from',
				type: 'dateTime',
				default: '',
				description: 'Date from which invoices are to be collected (Unix timestamp or date string)',
			},
			{
				displayName: 'ID From',
				name: 'id_from',
				type: 'number',
				default: '',
				description: 'Starting invoice ID from which subsequent invoices should be retrieved',
			},
			{
				displayName: 'Numbering Series',
				name: 'series_id',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getInvoiceSeries',
				},
				default: '',
				description: 'Filter by numbering series ID. Choose from the list, or specify an ID using an <expression>.',
			},
			{
				displayName: 'Get External Invoices',
				name: 'get_external_invoices',
				type: 'boolean',
				default: true,
				description: 'Whether to include invoices that already have an external invoice file uploaded. Set to false to omit them.',
			},
			{
				displayName: 'Get Government Data (KSeF)',
				name: 'get_government_data',
				type: 'boolean',
				default: false,
				description: 'Whether to include government invoice fields (gov_id, gov_date, gov_status)',
			},
		],
	},

	// ----------------------------------
	//   Fields for getInvoiceFile
	// ----------------------------------
	{
		displayName: 'Invoice ID',
		name: 'invoice_id',
		type: 'number',
		default: '',
		placeholder: 'e.g. 153845',
		required: true,
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['getInvoiceFile'],
			},
		},
		description: 'BaseLinker invoice identifier to download',
	},
	{
		displayName: 'Get External File',
		name: 'get_external',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['getInvoiceFile'],
			},
		},
		description: 'Whether to download external file from connected ERP/accounting system if available (otherwise falls back to BaseLinker PDF)',
	},
	{
		displayName: 'Download as Binary Data',
		name: 'downloadBinary',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['getInvoiceFile'],
			},
		},
		description: 'Whether to decode the base64 invoice file and attach it as binary data on the item',
	},
	{
		displayName: 'Binary Property Name',
		name: 'binaryPropertyName',
		type: 'string',
		default: 'data',
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['getInvoiceFile'],
				downloadBinary: [true],
			},
		},
		description: 'Name of the binary property where the invoice PDF should be written',
	},
	{
		displayName: 'File Name',
		name: 'fileName',
		type: 'string',
		default: '',
		placeholder: 'e.g. invoice.pdf',
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['getInvoiceFile'],
				downloadBinary: [true],
			},
		},
		description: 'Optional custom file name for the downloaded invoice. Defaults to invoice_<id>.pdf or invoice_<number>.pdf.',
	},

	// ----------------------------------
	//   Fields for getSeries
	// ----------------------------------
	{
		displayName: 'Series Type Filter',
		name: 'seriesTypeFilter',
		type: 'options',
		options: [
			{
				name: 'All Series Types',
				value: 'all',
				description: 'Return all numbering series (invoices, corrections, receipts)',
			},
			{
				name: 'Invoices (INVOICE)',
				value: 'INVOICE',
				description: 'Return regular invoice numbering series',
			},
			{
				name: 'Corrections (CORRECTION)',
				value: 'CORRECTION',
				description: 'Return correction invoice numbering series',
			},
			{
				name: 'Receipts (RECEIPT)',
				value: 'RECEIPT',
				description: 'Return receipt numbering series',
			},
		],
		default: 'all',
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['getSeries'],
			},
		},
		description: 'Optionally filter numbering series by document type',
	},

	// ----------------------------------
	//   Fields for addInvoice
	// ----------------------------------
	{
		displayName: 'Input Mode',
		name: 'addInvoiceMode',
		type: 'options',
		options: [
			{
				name: 'Form Fields (UI)',
				value: 'fields',
				description: 'Configure parameters using UI controls',
			},
			{
				name: 'Raw JSON Payload',
				value: 'json',
				description: 'Provide parameters directly as a raw JSON string or expression',
			},
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['addInvoice'],
			},
		},
		description: 'Choose whether to configure parameters via structured UI inputs or raw JSON',
	},
	{
		displayName: 'Raw Parameters (JSON)',
		name: 'addInvoiceJson',
		type: 'string',
		typeOptions: {
			rows: 5,
		},
		default: '{\n  "order_id": 0\n}',
		placeholder: '{\n  "order_id": 12345,\n  "series_id": 1,\n  "vat_rate": "DEFAULT"\n}',
		required: true,
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['addInvoice'],
				addInvoiceMode: ['json'],
			},
		},
		description: 'Raw parameters object sent to addInvoice method',
	},
	{
		displayName: 'Order ID',
		name: 'addInvoiceOrderId',
		type: 'number',
		default: '',
		placeholder: 'e.g. 12345',
		required: true,
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['addInvoice'],
				addInvoiceMode: ['fields'],
			},
		},
		description: 'Order identifier from BaseLinker order manager',
	},
	{
		displayName: 'Numbering Series',
		name: 'addInvoiceSeriesId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getInvoiceSeries',
		},
		default: '',
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['addInvoice'],
				addInvoiceMode: ['fields'],
			},
		},
		description: 'Series numbering identifier. Choose from the list, or specify an ID using an <expression>.',
	},
	{
		displayName: 'VAT Rate',
		name: 'addInvoiceVatRate',
		type: 'options',
		options: [
			{
				name: 'Default (According to Series)',
				value: 'DEFAULT',
			},
			{
				name: 'Item (Rate Assigned to Item)',
				value: 'ITEM',
			},
			{
				name: 'Exempt from VAT (EXPT / ZW)',
				value: 'EXPT',
			},
			{
				name: 'Annotation NP',
				value: 'NP',
			},
			{
				name: 'VAT Reverse Charge (OO)',
				value: 'OO',
			},
			{
				name: 'Custom Numeric Rate',
				value: 'custom',
			},
		],
		default: 'DEFAULT',
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['addInvoice'],
				addInvoiceMode: ['fields'],
			},
		},
		description: 'VAT rate applied to the invoice',
	},
	{
		displayName: 'Custom VAT Rate (%)',
		name: 'addInvoiceVatRateCustom',
		type: 'number',
		default: 23,
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['addInvoice'],
				addInvoiceMode: ['fields'],
				addInvoiceVatRate: ['custom'],
			},
		},
		description: 'Numeric VAT rate (0-100)',
	},

	// ----------------------------------
	//   Fields for addInvoiceCorrection
	// ----------------------------------
	{
		displayName: 'Input Mode',
		name: 'addCorrectionMode',
		type: 'options',
		options: [
			{
				name: 'Form Fields (UI)',
				value: 'fields',
				description: 'Configure parameters using UI controls',
			},
			{
				name: 'Raw JSON Payload',
				value: 'json',
				description: 'Provide parameters directly as a raw JSON string or expression',
			},
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['addInvoiceCorrection'],
			},
		},
		description: 'Choose whether to configure parameters via structured UI inputs or raw JSON',
	},
	{
		displayName: 'Raw Parameters (JSON)',
		name: 'addCorrectionJson',
		type: 'string',
		typeOptions: {
			rows: 5,
		},
		default: '{\n  "original_invoice_id": 0\n}',
		placeholder: '{\n  "original_invoice_id": 12345,\n  "correcting_reason": 1\n}',
		required: true,
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['addInvoiceCorrection'],
				addCorrectionMode: ['json'],
			},
		},
		description: 'Raw parameters object sent to addInvoiceCorrection method',
	},
	{
		displayName: 'Identifier Type',
		name: 'correctionIdentifierType',
		type: 'options',
		options: [
			{
				name: 'Original Invoice ID',
				value: 'original_invoice_id',
				description: 'Issue correction for an existing BaseLinker invoice',
			},
			{
				name: 'Return Order ID',
				value: 'return_order_id',
				description: 'Issue correction for a return order (populates data from return order)',
			},
		],
		default: 'original_invoice_id',
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['addInvoiceCorrection'],
				addCorrectionMode: ['fields'],
			},
		},
		description: 'Specify whether to correct an invoice by invoice ID or from a return order',
	},
	{
		displayName: 'Original Invoice ID',
		name: 'correctionOriginalInvoiceId',
		type: 'number',
		default: '',
		placeholder: 'e.g. 153845',
		required: true,
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['addInvoiceCorrection'],
				addCorrectionMode: ['fields'],
				correctionIdentifierType: ['original_invoice_id'],
			},
		},
		description: 'Identifier of the original invoice to correct',
	},
	{
		displayName: 'Return Order ID',
		name: 'correctionReturnOrderId',
		type: 'number',
		default: '',
		placeholder: 'e.g. 45678',
		required: true,
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['addInvoiceCorrection'],
				addCorrectionMode: ['fields'],
				correctionIdentifierType: ['return_order_id'],
			},
		},
		description: 'Identifier of the return order',
	},
	{
		displayName: 'Numbering Series',
		name: 'correctionSeriesId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getInvoiceSeries',
		},
		default: '',
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['addInvoiceCorrection'],
				addCorrectionMode: ['fields'],
			},
		},
		description: 'Optional correction numbering series identifier',
	},
	{
		displayName: 'Additional Fields',
		name: 'correctionAdditionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['addInvoiceCorrection'],
				addCorrectionMode: ['fields'],
			},
		},
		options: [
			{
				displayName: 'Sell Date',
				name: 'date_sell',
				type: 'dateTime',
				default: '',
				description: 'Sell date (Unix timestamp or ISO string)',
			},
			{
				displayName: 'Correcting Reason',
				name: 'correcting_reason',
				type: 'options',
				options: [
					{ name: '1 - Prepayments return', value: 1 },
					{ name: '2 - Compulsory discounts', value: 2 },
					{ name: '3 - Price increase after invoicing', value: 3 },
					{ name: '4 - Refund the buyer undue amount', value: 4 },
					{ name: '5 - Return the goods', value: 5 },
					{ name: '6 - Mistakes in price / rate / tax amount', value: 6 },
					{ name: '7 - Correcting buyer address', value: 7 },
					{ name: '8 - Withdrawal from contract', value: 8 },
					{ name: '9 - Other reason', value: 9 },
				],
				default: 1,
				description: 'Reason code for the correction invoice',
			},
			{
				displayName: 'Correct Invoice Items',
				name: 'correcting_items',
				type: 'boolean',
				default: false,
				description: 'Whether to correct invoice items (0 - no, 1 - yes)',
			},
			{
				displayName: 'Correct Invoice Data',
				name: 'correcting_data',
				type: 'boolean',
				default: false,
				description: 'Whether to correct buyer / seller data (0 - no, 1 - yes)',
			},
			{
				displayName: 'Invoice Full Name',
				name: 'invoice_fullname',
				type: 'string',
				default: '',
				description: 'Full name on correction invoice',
			},
			{
				displayName: 'Invoice Company',
				name: 'invoice_company',
				type: 'string',
				default: '',
				description: 'Company name on correction invoice',
			},
			{
				displayName: 'Invoice Tax ID (NIP)',
				name: 'invoice_nip',
				type: 'string',
				default: '',
				description: 'Tax ID number',
			},
			{
				displayName: 'Invoice Address',
				name: 'invoice_address',
				type: 'string',
				default: '',
				description: 'Street address',
			},
			{
				displayName: 'Invoice Postcode',
				name: 'invoice_postcode',
				type: 'string',
				default: '',
				description: 'Postal code',
			},
			{
				displayName: 'Invoice City',
				name: 'invoice_city',
				type: 'string',
				default: '',
				description: 'City',
			},
			{
				displayName: 'Invoice State',
				name: 'invoice_state',
				type: 'string',
				default: '',
				description: 'State / Province',
			},
			{
				displayName: 'Invoice Country Code',
				name: 'invoice_country_code',
				type: 'string',
				default: '',
				description: '2-letter country code (e.g. PL)',
			},
			{
				displayName: 'Payment Method',
				name: 'fv_payment',
				type: 'string',
				default: '',
				description: 'Payment method name',
			},
			{
				displayName: 'Issuer Name',
				name: 'fv_person',
				type: 'string',
				default: '',
				description: 'Person issuing the document',
			},
			{
				displayName: 'Items (JSON)',
				name: 'itemsJson',
				type: 'string',
				typeOptions: { rows: 4 },
				default: '',
				placeholder: '[{\n  "item_name": "Product 1",\n  "item_quantity": 1,\n  "item_price_brutto": 25\n}]',
				description: 'Array of items to correct in JSON format',
			},
		],
	},

	// ----------------------------------
	//   Fields for addOrderInvoiceFile
	// ----------------------------------
	{
		displayName: 'Invoice ID',
		name: 'invoiceFileInvoiceId',
		type: 'number',
		default: '',
		placeholder: 'e.g. 153845',
		required: true,
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['addOrderInvoiceFile'],
			},
		},
		description: 'BaseLinker invoice identifier to attach file to',
	},
	{
		displayName: 'File Input Source',
		name: 'invoiceFileInputSource',
		type: 'options',
		options: [
			{
				name: 'Binary Data Attachment',
				value: 'binary',
				description: 'Upload file from an incoming n8n binary data property',
			},
			{
				name: 'Base64 Encoded String',
				value: 'base64',
				description: 'Provide Base64 encoded string starting with data: prefix',
			},
		],
		default: 'binary',
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['addOrderInvoiceFile'],
			},
		},
		description: 'Choose whether to take the file from incoming binary data or provide a Base64 string',
	},
	{
		displayName: 'Binary Property Name',
		name: 'invoiceFileBinaryPropertyName',
		type: 'string',
		default: 'data',
		required: true,
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['addOrderInvoiceFile'],
				invoiceFileInputSource: ['binary'],
			},
		},
		description: 'Name of the binary property containing the invoice PDF/XML',
	},
	{
		displayName: 'Base64 File String',
		name: 'invoiceFileBase64',
		type: 'string',
		typeOptions: { rows: 4 },
		default: '',
		placeholder: 'data:4AAQSkZJRgABA...',
		required: true,
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['addOrderInvoiceFile'],
				invoiceFileInputSource: ['base64'],
			},
		},
		description: 'Invoice PDF/XML file in binary format encoded in Base64 (starts with "data:")',
	},
	{
		displayName: 'External Invoice Number',
		name: 'invoiceFileExternalNumber',
		type: 'string',
		default: '',
		placeholder: 'e.g. FV/2024/001',
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['addOrderInvoiceFile'],
			},
		},
		description: 'External system invoice number (overwrites BaseLinker invoice number)',
	},

	// ----------------------------------
	//   Fields for addReceipt
	// ----------------------------------
	{
		displayName: 'Input Mode',
		name: 'addReceiptMode',
		type: 'options',
		options: [
			{
				name: 'Form Fields (UI)',
				value: 'fields',
				description: 'Configure parameters using UI controls',
			},
			{
				name: 'Raw JSON Payload',
				value: 'json',
				description: 'Provide parameters directly as a raw JSON string or expression',
			},
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['addReceipt'],
			},
		},
		description: 'Choose whether to configure parameters via structured UI inputs or raw JSON',
	},
	{
		displayName: 'Raw Parameters (JSON)',
		name: 'addReceiptJson',
		type: 'string',
		typeOptions: {
			rows: 5,
		},
		default: '{\n  "order_id": 0\n}',
		placeholder: '{\n  "order_id": 12345,\n  "series_id": 1\n}',
		required: true,
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['addReceipt'],
				addReceiptMode: ['json'],
			},
		},
		description: 'Raw parameters object sent to addReceipt method',
	},
	{
		displayName: 'Order ID',
		name: 'addReceiptOrderId',
		type: 'number',
		default: '',
		placeholder: 'e.g. 12345',
		required: true,
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['addReceipt'],
				addReceiptMode: ['fields'],
			},
		},
		description: 'Order identifier from BaseLinker order manager',
	},
	{
		displayName: 'Numbering Series',
		name: 'addReceiptSeriesId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getInvoiceSeries',
		},
		default: '',
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['addReceipt'],
				addReceiptMode: ['fields'],
			},
		},
		description: 'Receipt numbering series identifier. Choose from the list, or specify an ID using an <expression>.',
	},

	// ----------------------------------
	//   Fields for getReceipt
	// ----------------------------------
	{
		displayName: 'Lookup By',
		name: 'getReceiptLookupBy',
		type: 'options',
		options: [
			{
				name: 'Receipt ID',
				value: 'receipt_id',
				description: 'Retrieve receipt by its receipt ID',
			},
			{
				name: 'Order ID',
				value: 'order_id',
				description: 'Retrieve receipt associated with an order',
			},
		],
		default: 'receipt_id',
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['getReceipt'],
			},
		},
		description: 'Choose whether to find the receipt by Receipt ID or Order ID',
	},
	{
		displayName: 'Receipt ID',
		name: 'getReceiptReceiptId',
		type: 'number',
		default: '',
		placeholder: 'e.g. 3857659',
		required: true,
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['getReceipt'],
				getReceiptLookupBy: ['receipt_id'],
			},
		},
		description: 'Unique identifier of the receipt',
	},
	{
		displayName: 'Order ID',
		name: 'getReceiptOrderId',
		type: 'number',
		default: '',
		placeholder: 'e.g. 143476260',
		required: true,
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['getReceipt'],
				getReceiptLookupBy: ['order_id'],
			},
		},
		description: 'Order identifier associated with the receipt',
	},

	// ----------------------------------
	//   Fields for getReceipts
	// ----------------------------------
	{
		displayName: 'Input Mode',
		name: 'getReceiptsMode',
		type: 'options',
		options: [
			{
				name: 'Form Fields (UI)',
				value: 'fields',
				description: 'Configure filters using UI controls',
			},
			{
				name: 'Raw JSON Payload',
				value: 'json',
				description: 'Provide parameters directly as a raw JSON string or expression',
			},
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['getReceipts'],
			},
		},
		description: 'Choose whether to configure parameters via structured UI inputs or raw JSON',
	},
	{
		displayName: 'Raw Parameters (JSON)',
		name: 'getReceiptsJson',
		type: 'string',
		typeOptions: {
			rows: 5,
		},
		default: '{\n  "id_from": 0\n}',
		placeholder: '{\n  "series_id": 1,\n  "id_from": 100\n}',
		required: true,
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['getReceipts'],
				getReceiptsMode: ['json'],
			},
		},
		description: 'Raw parameters object sent to getReceipts method',
	},
	{
		displayName: 'Return All',
		name: 'getReceiptsReturnAll',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['getReceipts'],
				getReceiptsMode: ['fields'],
			},
		},
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'getReceiptsLimit',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 100,
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['getReceipts'],
				getReceiptsMode: ['fields'],
				getReceiptsReturnAll: [true],
			},
		},
		description: 'Max number of results to return',
	},
	{
		displayName: 'Delay Between Requests (ms)',
		name: 'getReceiptsDelayMs',
		type: 'number',
		typeOptions: {
			minValue: 0,
		},
		default: 650,
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['getReceipts'],
				getReceiptsMode: ['fields'],
				getReceiptsReturnAll: [true],
			},
		},
		description: 'Delay in milliseconds between pagination requests to comply with the 100 req/min API rate limit',
	},
	{
		displayName: 'Filters',
		name: 'getReceiptsFilters',
		type: 'collection',
		placeholder: 'Add Filter',
		default: {},
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['getReceipts'],
				getReceiptsMode: ['fields'],
			},
		},
		options: [
			{
				displayName: 'Numbering Series',
				name: 'series_id',
				type: 'options',
				typeOptions: {
					loadOptionsMethod: 'getInvoiceSeries',
				},
				default: '',
				description: 'Filter by receipt numbering series ID. Choose from the list, or specify an ID using an <expression>.',
			},
			{
				displayName: 'ID From',
				name: 'id_from',
				type: 'number',
				default: '',
				description: 'Starting receipt ID from which subsequent receipts should be retrieved (inclusive)',
			},
			{
				displayName: 'Date From',
				name: 'date_from',
				type: 'dateTime',
				default: '',
				description: 'Date from which receipts are to be collected (Unix timestamp or date string)',
			},
			{
				displayName: 'Date To',
				name: 'date_to',
				type: 'dateTime',
				default: '',
				description: 'Date to which receipts are to be collected (Unix timestamp or date string)',
			},
		],
	},

	// ----------------------------------
	//   Fields for getNewReceipts
	// ----------------------------------
	{
		displayName: 'Numbering Series',
		name: 'getNewReceiptsSeriesId',
		type: 'options',
		typeOptions: {
			loadOptionsMethod: 'getInvoiceSeries',
		},
		default: '',
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['getNewReceipts'],
			},
		},
		description: 'Optional numbering series ID to filter receipts for a specific fiscal printer. Choose from the list, or specify an ID using an <expression>.',
	},
	{
		displayName: 'ID From',
		name: 'getNewReceiptsIdFrom',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['getNewReceipts'],
			},
		},
		description: 'ID from which logs are to be retrieved (default 0)',
	},
	{
		displayName: 'Device ID',
		name: 'getNewReceiptsDeviceId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['getNewReceipts'],
			},
		},
		description: 'Optional device identifier for printer integration',
	},

	// ----------------------------------
	//   Fields for setOrderReceipt
	// ----------------------------------
	{
		displayName: 'Input Mode',
		name: 'setOrderReceiptMode',
		type: 'options',
		options: [
			{
				name: 'Form Fields (UI)',
				value: 'fields',
				description: 'Configure parameters using UI controls',
			},
			{
				name: 'Raw JSON Payload',
				value: 'json',
				description: 'Provide parameters directly as a raw JSON string or expression',
			},
		],
		default: 'fields',
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['setOrderReceipt'],
			},
		},
		description: 'Choose whether to configure parameters via structured UI inputs or raw JSON',
	},
	{
		displayName: 'Raw Parameters (JSON)',
		name: 'setOrderReceiptJson',
		type: 'string',
		typeOptions: {
			rows: 5,
		},
		default: '{\n  "receipt_id": 0\n}',
		placeholder: '{\n  "receipt_id": 153845,\n  "receipt_nr": "FP 23212",\n  "date": 1407341754,\n  "printer_error": false\n}',
		required: true,
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['setOrderReceipt'],
				setOrderReceiptMode: ['json'],
			},
		},
		description: 'Raw parameters object sent to setOrderReceipt method',
	},
	{
		displayName: 'Receipt ID',
		name: 'setReceiptId',
		type: 'number',
		default: '',
		placeholder: 'e.g. 153845',
		required: true,
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['setOrderReceipt'],
				setOrderReceiptMode: ['fields'],
			},
		},
		description: 'Receipt ID received in getNewReceipts or addReceipt method',
	},
	{
		displayName: 'Receipt Number',
		name: 'setReceiptNr',
		type: 'string',
		default: '',
		placeholder: 'e.g. FP 23212',
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['setOrderReceipt'],
				setOrderReceiptMode: ['fields'],
			},
		},
		description: 'The number of the issued receipt from fiscal cash register (can be blank if printer does not return number)',
	},
	{
		displayName: 'Printing Date',
		name: 'setReceiptDate',
		type: 'dateTime',
		default: '',
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['setOrderReceipt'],
				setOrderReceiptMode: ['fields'],
			},
		},
		description: 'Receipt printing date (defaults to current date/time if left empty)',
	},
	{
		displayName: 'Printer Error',
		name: 'setReceiptPrinterError',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['setOrderReceipt'],
				setOrderReceiptMode: ['fields'],
			},
		},
		description: 'Flag indicating whether an error occurred during receipt printing',
	},
	{
		displayName: 'Printer Name',
		name: 'setReceiptPrinterName',
		type: 'string',
		default: '',
		placeholder: 'e.g. Fiscal123',
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['setOrderReceipt'],
				setOrderReceiptMode: ['fields'],
			},
		},
		description: 'Name of the fiscal printer',
	},

	// ----------------------------------
	//   Fields for addOrderReceiptFile
	// ----------------------------------
	{
		displayName: 'Receipt ID',
		name: 'receiptFileReceiptId',
		type: 'number',
		default: '',
		placeholder: 'e.g. 153845',
		required: true,
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['addOrderReceiptFile'],
			},
		},
		description: 'BaseLinker receipt identifier to attach file to',
	},
	{
		displayName: 'File Input Source',
		name: 'receiptFileInputSource',
		type: 'options',
		options: [
			{
				name: 'Binary Data Attachment',
				value: 'binary',
				description: 'Upload file from an incoming n8n binary data property',
			},
			{
				name: 'Base64 Encoded PDF / Raw JWS String',
				value: 'raw',
				description: 'Provide Base64 encoded PDF (with data: prefix) or raw JWS token string',
			},
		],
		default: 'binary',
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['addOrderReceiptFile'],
			},
		},
		description: 'Choose whether to take the file from incoming binary data or provide a string',
	},
	{
		displayName: 'Binary Property Name',
		name: 'receiptFileBinaryPropertyName',
		type: 'string',
		default: 'data',
		required: true,
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['addOrderReceiptFile'],
				receiptFileInputSource: ['binary'],
			},
		},
		description: 'Name of the binary property containing the receipt PDF or JWS file',
	},
	{
		displayName: 'File String (PDF Base64 or JWS)',
		name: 'receiptFileString',
		type: 'string',
		typeOptions: { rows: 4 },
		default: '',
		placeholder: 'data:4AAQSkZJRgABA... or raw JWS string',
		required: true,
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['addOrderReceiptFile'],
				receiptFileInputSource: ['raw'],
			},
		},
		description: 'Receipt PDF (base64 with "data:" prefix) or raw JWS string for e-receipts',
	},
	{
		displayName: 'External Receipt Number',
		name: 'receiptFileExternalNumber',
		type: 'string',
		default: '',
		placeholder: 'e.g. RC40/08/2023',
		displayOptions: {
			show: {
				resource: ['invoices'],
				operation: ['addOrderReceiptFile'],
			},
		},
		description: 'External system receipt number (overwrites BaseLinker receipt number)',
	},
];
