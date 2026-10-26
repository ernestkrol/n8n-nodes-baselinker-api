# BaseLinker Node: Comprehensive API Reference

This document provides exhaustive reference documentation for all implemented BaseLinker API groups, resources, operations, parameters, and behaviors within the **n8n-nodes-baselinker-api** package.

All operations strictly mirror the official [BaseLinker API Documentation](https://api.baselinker.com/).

---

## Table of Contents
- [1. Orders Resource](#1-orders-resource)
  - [Order Retrieval & Filters (`getOrders`)](#order-retrieval--filters-getorders)
  - [Order Mutations (`setOrderFields`, `addOrder`, `addOrderBySplit`, `addOrderDuplicate`, `deleteOrders`, `setOrdersMerge`)](#order-mutations)
  - [Order Products (`addOrderProduct`, `deleteOrderProduct`, `setOrderProductFields`)](#order-products)
  - [Payments (`getOrderPaymentsHistory`, `setOrderPayment`)](#payments)
  - [Status Lifecycle (`getOrderStatusList`, `getOrderStatusGroups`, `setOrderStatus`, `setOrderStatuses`, `addOrderStatus`, `addOrderStatusGroup`, `deleteOrderStatus`, `deleteOrderStatusGroup`)](#status-lifecycle)
  - [Invoices & Receipts (`getInvoices`, `getInvoiceFile`, `getSeries`, `addInvoice`, `addInvoiceCorrection`, `addOrderInvoiceFile`, `getReceipts`, `getReceipt`, `getNewReceipts`, `addReceipt`, `setOrderReceipt`, `addOrderReceiptFile`)](#invoices--receipts)
  - [Lookups & Macros (`getOrdersByEmail`, `getOrdersByPhone`, `getOrderTransactionData`, `getOrderPrintoutTemplates`, `runOrderMacroTrigger`)](#lookups--macros)
  - [Pick Lists & PickPack Carts (`addOrderPickList`, `getOrderPickLists`, `getOrderPickPackHistory`, `getPickPackCarts`, `addPickPackCart`, `deletePickPackCart`, `getPickPackCartOrders`, `getPickPackOrderCart`, `addPickPackOrdersToCart`, `deletePickPackCartOrders`, `deletePickPackOrderFromCart`)](#pick-lists--pickpack-carts)
  - [Order Metadata (`getJournalList`, `getOrderExtraFields`, `getOrderSources`)](#order-metadata)
- [2. Order Returns Resource](#2-order-returns-resource)
  - [Return Retrieval & Mutations (`getOrderReturns`, `addOrderReturn`, `setOrderReturnFields`, `getOrderReturnExtraFields`)](#return-retrieval--mutations)
  - [Return Products (`addOrderReturnProduct`, `deleteOrderReturnProduct`, `setOrderReturnProductFields`)](#return-products)
  - [Return Statuses & Reasons (`getOrderReturnStatusList`, `getOrderReturnStatusGroups`, `setOrderReturnStatus`, `setOrderReturnStatuses`, `addOrderReturnStatus`, `addOrderReturnStatusGroup`, `deleteOrderReturnStatus`, `deleteOrderReturnStatusGroup`, `getOrderReturnProductStatuses`, `getOrderReturnReasonsList`)](#return-statuses--reasons)
  - [Return Payments, Refunds & Journal (`getOrderReturnPaymentsHistory`, `setOrderReturnRefund`, `getOrderReturnJournalList`, `runOrderReturnMacroTrigger`)](#return-payments-refunds--journal)
- [3. Courier Shipments Resource](#3-courier-shipments-resource)
  - [Shipments & Bookings (`getOrderPackages`, `getPackageDetails`, `getCourierPackagesStatusHistory`, `createPackage`, `createPackageManual`, `deleteCourierPackage`, `getPricePackage`)](#shipments--bookings)
  - [Courier Info & Services (`getCouriersList`, `getCourierAccounts`, `getCourierFields`, `getCourierServices`)](#courier-info--services)
  - [Labels, Documents & Protocol (`getLabel`, `getCourierDocument`, `getProtocol`)](#labels-documents--protocol)
  - [Parcel Pickups (`getRequestParcelPickupFields`, `runRequestParcelPickup`)](#parcel-pickups)
- [4. Clients (CRM) Resource](#4-clients-crm-resource)
  - [Clients Management (`getCrmClients`, `getCrmClientData`, `addCrmClient`, `deleteCrmClient`, `getCrmClientExtraFields`)](#clients-management)
  - [Client Statuses & Groups (`getCrmClientStatusGroups`, `getCrmClientStatuses`, `addCrmClientStatus`, `addCrmClientStatusGroup`, `deleteCrmClientStatus`, `deleteCrmClientStatusGroup`)](#client-statuses--groups)
- [5. Product Catalog Resource](#5-product-catalog-resource)
  - [Catalogs & Warehouses (`getInventories`, `getInventoryWarehouses`, `addInventory`, `deleteInventory`, `addInventoryWarehouse`, `deleteInventoryWarehouse`, `getInventoryMaps`, `getInventoryMapDetails`)](#catalogs--warehouses)
  - [Product Listings & Details (`getInventoryProductsList`, `getInventoryProductsData`, `addInventoryProduct`, `deleteInventoryProduct`, `getInventoryParameters`, `runProductMacroTrigger`, `runFulfillmentLinkProducts`)](#product-listings--details)
  - [Stock & Prices (`getInventoryProductsStock`, `getInventoryProductsPrices`, `updateInventoryProductsStock`, `updateInventoryProductsPrices`)](#stock--prices)
  - [Product Logs (`getInventoryProductLogs`, `getSyncLogList`)](#product-logs)
  - [Categories, Manufacturers, Price Groups & Tags (`getInventoryCategories`, `addInventoryCategory`, `deleteInventoryCategory`, `getInventoryManufacturers`, `addInventoryManufacturer`, `deleteInventoryManufacturer`, `getInventoryPriceGroups`, `addInventoryPriceGroup`, `deleteInventoryPriceGroup`, `getInventoryTags`, `addInventoryTag`, `deleteInventoryTag`)](#taxonomy--dictionaries)
  - [Extra Fields, Integrations & Promotions (`getInventoryExtraFields`, `getInventoryAvailableTextFieldKeys`, `getInventoryIntegrations`, `getInventoryShippingTemplates`, `getInventoryPrintoutTemplates`, `addInventoryPromotion`, `getInventoryPromotionsList`)](#extra-fields-integrations--promotions)
  - [WMS: Locations, Zones & Racks (`getInventoryWarehouseLocations`, `getInventoryWarehouseLocationTypes`, `addInventoryWarehouseLocation`, `addInventoryWarehouseLocationType`, `deleteInventoryWarehouseLocation`, `deleteInventoryWarehouseLocationType`, `getInventoryWarehouseZones`, `addInventoryWarehouseZone`, `deleteInventoryWarehouseZone`, `getInventoryWarehouseRacks`, `addInventoryWarehouseRack`, `deleteInventoryWarehouseRack`)](#wms-locations-zones--racks)
  - [Suppliers & Payers (`getInventorySuppliers`, `addInventorySupplier`, `deleteInventorySupplier`, `getInventoryPayers`, `addInventoryPayer`, `deleteInventoryPayer`)](#suppliers--payers)
  - [WMS Documents, Purchase Orders, Transfers, Stocktakes & Deliveries](#wms-documents--logistics)
- [6. Base Connect Resource](#6-base-connect-resource)
  - [Connect Integrations & Contractors (`getConnectIntegrations`, `getConnectIntegrationContractors`)](#connect-integrations--contractors)
  - [Trade Credit Management (`getConnectContractorCreditHistory`, `addConnectContractorCreditSettlement`, `setConnectContractorCreditLimit`)](#trade-credit-management)
- [7. External Storages Resource](#7-external-storages-resource)
  - [Storages & Categories (`getExternalStoragesList`, `getExternalStorageCategories`)](#storages--categories)
  - [Products Retrieval & Details (`getExternalStorageProductsList`, `getExternalStorageProductsData`)](#products-retrieval--details)
  - [Stock & Prices Sync (`getExternalStorageProductsQuantity`, `getExternalStorageProductsPrices`, `updateExternalStorageProductsQuantity`)](#stock--prices-sync)

---

## 1. Orders Resource

### Order Retrieval & Filters (`getOrders`)
Download orders from the BaseLinker order manager with granular filtering and automated multi-batch retrieval.

- **Operation:** `getOrders`
- **Resource:** `orders`
- **Parameters:**
  - **Input Mode (`parameterInputMode`):** `fields` (Form Fields UI) or `json` (Raw Parameters JSON).
  - **Pagination (`returnAll`):** If enabled, retrieves all matching orders up to `maxTotalOrders` using selectable cursor fields:
    - `date_confirmed_from` *(Recommended for confirmed order syncing)*: Advances cursor by `+1` second. Automatically falls back to `id_from` if unconfirmed orders (`date_confirmed === 0`) are encountered.
    - `date_from`: Synchronizes orders based on order creation date.
    - `id_from`: Sequential synchronization strictly by order ID.
  - **Unconfirmed Orders (`get_unconfirmed_orders`):** Toggle retrieval of unconfirmed or pending orders.
  - **Include Custom Extra Fields (`include_custom_extra_fields`):** Toggle retrieval of custom additional field values defined in BaseLinker.
  - **Status Filtering (`statusFilter`):**
    - `All Statuses`: Download regardless of status.
    - `Single Status`: Filter by specific `status_id` (with dynamic dropdown).
    - `Status Group` *(High-level capability)*: Select a `status_group_id` to automatically retrieve orders from **all statuses** within that group sequentially with rate-limit pacing.
  - **Additional Filters:** Customer `email`, `order_source` (e.g. `allegro`, `amazon`, `ebay`, `shop`), `order_source_id`, `shop_order_id`, `filter_external_order_id`, and inclusion flags (`include_commissions`, `include_connect_data`, `include_discounts_data`).

### Order Mutations
- **`setOrderFields`:** Edit selected fields (e.g. recipient details, delivery address, comments, parcel pick/pack status, star rating, and custom extra fields) of a specific order.
  - Custom Extra Fields: Interactive UI picker populated dynamically via `methods.loadOptions.getOrderExtraFieldsList` or raw JSON mapping. Values can be updated, set, or cleared (by passing empty string `""` per BaseLinker spec). Base64 file attachments are supported.
- **`addOrder`:** Add a new order directly to the BaseLinker order manager with items, delivery details, billing addresses, and custom extra fields. Supports visual item builder (`productsUi`) or raw JSON (`productsJson`), currency, automatic creation date normalization, and payment flags.
- **`addOrderBySplit`:** Create a new order by splitting selected products and optional delivery charges from an existing order. The newly created order inherits all client and address data from the original order.
- **`addOrderDuplicate`:** Creates a copy of an existing order in the BaseLinker order manager with identical items and customer details under a new order ID.
- **`deleteOrders`:** Delete one or multiple orders simultaneously (accepts comma-separated list or JSON array of order IDs).
- **`setOrdersMerge`:** Merges two or more orders together with configurable merge mode (`into_main_order` or `technical_merge`) and optional delivery cost summation.

### Order Products
- **`addOrderProduct`:** Add a line item product to an order (`order_id`, `name`, `price_brutto`, `quantity`, `storage`, `storage_id`, `product_id`, `variant_id`, `sku`, `ean`, `location`, `warehouse_id`, `attributes`, `tax_rate`, `weight`).
- **`deleteOrderProduct`:** Remove a line item from an order (`order_id`, `order_product_id`).
- **`setOrderProductFields`:** Modify product details of an item within an order (`order_id`, `order_product_id`, and editable product properties).

### Payments
- **`getOrderPaymentsHistory`:** Retrieve payment history for a selected order, including gateway transaction IDs, payment gateway references, and manual adjustments (`order_id`, `show_full_history`).
- **`setOrderPayment`:** Add a payment or set total paid amount for an order (`order_id`, `payment_done`, `payment_date` with automatic timestamp normalization, `payment_comment`, `external_payment_id`). Note: in BaseLinker, `payment_done` sets the new payment total, not an incremental addition.

### Status Lifecycle
Comprehensive order status lifecycle and taxonomy management:
- **`getOrderStatusList`:** Retrieves all order statuses. Populates dynamic dropdowns across workflow nodes (`methods.loadOptions.getOrderStatuses` and `methods.loadOptions.getOrderStatusList`).
- **`getOrderStatusGroups`:** Retrieves the list of order status groups with names and primary group indicators (`methods.loadOptions.getOrderStatusGroups`).
- **`setOrderStatus`:** Changes the status of a single order (`order_id`, `status_id`).
- **`setOrderStatuses`:** Batch updates status for multiple orders simultaneously (`order_ids`, `status_id`).
- **`addOrderStatus`:** Creates a new order status or updates an existing one when `status_id` is specified (`name`, `status_id`, `color`, `short_name`, `name_for_customer`, `group_id`, `type`, `comments`).
- **`addOrderStatusGroup`:** Creates a new status group or updates an existing one when `group_id` is specified (`name`, `group_id`).
- **`deleteOrderStatus`:** Deletes an order status and migrates existing orders to a designated target status (`status_id`, `target_status_id`). Enforces `status_id !== target_status_id`.
- **`deleteOrderStatusGroup`:** Deletes a status group and moves all its member statuses back into the default main group (`group_id`).

### Invoices & Receipts
- **`getInvoices`:** Retrieves invoices issued from BaseLinker order manager with cursor pagination (`id_from` or `date_from`), series filter, and government/KSeF data flags.
- **`getInvoiceFile`:** Downloads invoice PDF documents. When `downloadBinary: true`, automatically strips BaseLinker's `data:` prefix and decodes the payload into a native n8n binary PDF attachment.
- **`getSeries`:** Retrieves numbering series for regular invoices (`INVOICE`), correction invoices (`CORRECTION`), and receipts (`RECEIPT`). Populates dynamic dropdowns (`methods.loadOptions.getInvoiceSeries`).
- **`addInvoice`:** Issues an invoice for an order in BaseLinker (`order_id`, `series_id`, optional `vat_rate`).
- **`addInvoiceCorrection`:** Issues a correction invoice linked to an existing invoice (`invoice_id`, `series_id`, `reason`, `products`, `additionalFields`).
- **`addOrderInvoiceFile`:** Attaches an external PDF invoice document to an order (`order_id`). Supports direct input of a Base64 string or reading from an upstream incoming n8n binary file property.
- **`getReceipts`:** Retrieves receipts issued from BaseLinker with multi-batch pagination (`returnAll: true`).
- **`getReceipt`:** Retrieves detailed data of a single receipt (`receipt_id`).
- **`getNewReceipts`:** Retrieves receipts waiting in queue to be printed on a local fiscal printer (`series_id`, `id_from`, `device_id`).
- **`addReceipt`:** Issues a fiscal receipt for an order (`order_id`, `series_id`, `vat_rate`).
- **`setOrderReceipt`:** Marks a receipt as printed, recording fiscal receipt number, date, and external printer identification.
- **`addOrderReceiptFile`:** Uploads an external receipt document file to an order (`order_id`). Supports raw Base64 strings or binary attachment processing.

### Lookups & Macros
- **`getOrdersByEmail`:** Retrieves all orders associated with a customer email address.
- **`getOrdersByPhone`:** Retrieves all orders associated with a customer phone number.
- **`getOrderTransactionData`:** Retrieves detailed transaction and payment parameters for an order (`order_id`), including complex tax breakdowns (`include_complex_taxes`) and Amazon transaction metadata (`include_amazon_data`).
- **`getOrderPrintoutTemplates`:** Retrieves configured printout templates available for orders. Populates dynamic dropdowns (`methods.loadOptions.getOrderPrintoutTemplates`).
- **`runOrderMacroTrigger`:** Executes an automatic action macro trigger on an order (`order_id`, `trigger_id`).

### Pick Lists & PickPack Carts
Full support for BaseLinker PickPack WMS and order collection workflows:
- **`addOrderPickList`:** Creates a new pick list grouping multiple orders (`order_ids`).
- **`getOrderPickLists`:** Retrieves pick lists with filtering by single `pick_list_id` or multi-batch cursor pagination (`returnAll: true` via `id_from`).
- **`getOrderPickPackHistory`:** Retrieves the packing and picking action audit trail for an order (`order_id`, optional `action_type`).
- **`getPickPackCarts`:** Retrieves all PickPack collection carts configured in the warehouse. Populates dynamic dropdowns (`methods.loadOptions.getPickPackCarts`).
- **`addPickPackCart`:** Creates a new PickPack cart or updates an existing one when `cart_id` is supplied (`name`, `color`).
- **`deletePickPackCart`:** Deletes a PickPack collection cart (`cart_id`).
- **`getPickPackCartOrders`:** Retrieves the list of order IDs currently assigned to a cart (`cart_id`).
- **`getPickPackOrderCart`:** Identifies which PickPack cart an order is currently assigned to (`order_id`).
- **`addPickPackOrdersToCart`:** Assigns multiple orders to a PickPack cart (`cart_id`, `order_ids`).
- **`deletePickPackCartOrders`:** Clears all orders currently assigned to a PickPack cart (`cart_id`).
- **`deletePickPackOrderFromCart`:** Removes a specific order from its assigned PickPack cart (`order_id`).

### Order Metadata
- **`getJournalList`:** Download the order event log from the last 3 days (`last_log_id`, `logs_types`, `order_id`). Also powers the `BaseLinkerTrigger` node.
- **`getOrderExtraFields`:** Returns definitions and IDs of custom extra fields configured for orders.
- **`getOrderSources`:** Retrieves configured order sources. Supports **Flattened Mode** (individual items with `source_type`, `source_id`, `source_name`) or **Raw Mode** (grouped dictionary).

---

## 2. Order Returns Resource

### Return Retrieval & Mutations
- **`getOrderReturns`:** Downloads customer returns from BaseLinker return manager with multi-batch cursor pagination (`id_from` [recommended] or `date_from`), rate-limit delay (`delayMs`), and filters (`return_id`, `order_id`, `status_id`, `filter_email`, `filter_order_source`, `filter_order_source_id`, `include_custom_extra_fields`).
- **`addOrderReturn`:** Creates a new return with line items (`productsUi` or `productsJson`), delivery and invoice addresses, currency, creation date normalization, and custom extra fields.
- **`setOrderReturnFields`:** Updates return fields (comments, refund flags, address fields) and custom extra fields (setting or clearing by sending `""`).
- **`getOrderReturnExtraFields`:** Retrieves definitions of custom extra fields configured for returns. Populates dynamic dropdown `methods.loadOptions.getOrderReturnExtraFieldsList`.

### Return Products
- **`addOrderReturnProduct`:** Adds a product line item to an order return (`return_id`, `name`, `quantity`, `price_brutto`, `tax_rate`, `storage`, `storage_id`, `product_id`, `variant_id`, `sku`, `ean`, `status_id`, `reason_id`).
- **`deleteOrderReturnProduct`:** Removes a product line item from an order return (`return_id`, `return_product_id`).
- **`setOrderReturnProductFields`:** Edits details of a product item within an order return, including item-level status and reason codes.

### Return Statuses & Reasons
- **`getOrderReturnStatusList`:** Retrieves all order return statuses (`methods.loadOptions.getOrderReturnStatuses` and `methods.loadOptions.getOrderReturnStatusList`).
- **`getOrderReturnStatusGroups`:** Retrieves return status groups (`methods.loadOptions.getOrderReturnStatusGroups`).
- **`setOrderReturnStatus`:** Changes the status of a single order return (`return_id`, `status_id`).
- **`setOrderReturnStatuses`:** Batch updates the status for multiple returns simultaneously (`return_ids`, `status_id`).
- **`addOrderReturnStatus`:** Creates a new return status or updates an existing status when `status_id` is supplied (`name`, `status_id`, `color`, `group_id`).
- **`addOrderReturnStatusGroup`:** Creates a new return status group or updates an existing group when `group_id` is supplied (`name`, `group_id`).
- **`deleteOrderReturnStatus`:** Deletes a return status and migrates existing returns to a designated target status (`status_id`, `target_status_id`). Enforces `status_id !== target_status_id`.
- **`deleteOrderReturnStatusGroup`:** Deletes a return status group (`group_id`).
- **`getOrderReturnProductStatuses`:** Retrieves item-level statuses for return products (`methods.loadOptions.getOrderReturnProductStatuses`).
- **`getOrderReturnReasonsList`:** Retrieves return reason codes (`methods.loadOptions.getOrderReturnReasonsList`).

### Return Payments, Refunds & Journal
- **`getOrderReturnPaymentsHistory`:** Retrieves payment history and refund records for an order return (`return_id`).
- **`setOrderReturnRefund`:** Marks a return as refunded or updates refund financial parameters (`return_id`, `refund_status`, `refund_type`, `amount`, `currency`).
- **`getOrderReturnJournalList`:** Downloads the return event log from the last 3 days (`last_log_id`, `logs_types`, `return_id`).
- **`runOrderReturnMacroTrigger`:** Executes an automatic action personal trigger macro on an order return (`return_id`, `trigger_id`).

---

## 3. Courier Shipments Resource

### Shipments & Bookings
- **`getOrderPackages`:** Downloads all courier shipments previously created for an order (`order_id`).
- **`getPackageDetails`:** Retrieves detailed parcel dimensions, weight, COD, insurance, service type, and courier-specific additional fields for a shipment (`package_id`).
- **`getCourierPackagesStatusHistory`:** Retrieves tracking history for up to 100 packages at once (`package_ids`). Supports `perPackage` (grouped history) or `flatEvents` (flat checkpoint list).
- **`createPackage`:** Creates a new shipment in the selected courier's system with courier form fields and parcel dimensions/weights.
- **`createPackageManual`:** Adds an external consignment/tracking number created outside BaseLinker to an order (`order_id`, `courier_code`, `manual_package_number`, optional `pickup_date`, `return_shipment`).
- **`deleteCourierPackage`:** Cancels/deletes a shipment from BaseLinker and the courier system (`courier_code`, `package_id` or `package_number`, optional `force_delete`).
- **`getPricePackage`:** Retrieves available shipment quotations and service pricing from the courier. Unpacks each available quote as a distinct item with service name, price, currency, surcharges, and selection state.

### Courier Info & Services
- **`getCouriersList`:** Retrieves all available courier integrations. Populates dynamic dropdowns (`methods.loadOptions.getCouriersList`).
- **`getCourierAccounts`:** Lists connected accounts for a given courier (`courier_code`). Populates dynamic dropdowns (`methods.loadOptions.getCourierAccounts`).
- **`getCourierFields`:** Retrieves the form field schema and package fields required to create shipments for a specific courier (`courier_code`).
- **`getCourierServices`:** Retrieves dynamic, order-dependent courier services (for BrokerSystem, Wysyłam z Allegro, ErliPRO) unpacked into individual items.

### Labels, Documents & Protocol
- **`getLabel`:** Downloads shipping label for a parcel (`courier_code`, `package_id` or `package_number`). When `downloadBinary: true`, automatically decodes Base64 label into native n8n binary attachment (`data` or custom property).
- **`getCourierDocument`:** Downloads parcel documents (`manifest`, `protocol`, `label`, `customs_document`). Supports native binary attachment decoding (`downloadBinary`).
- **`getProtocol`:** Downloads dispatch protocol / handover manifest for shipments. Supports native binary attachment decoding (`downloadBinary`).

### Parcel Pickups
- **`getRequestParcelPickupFields`:** Retrieves additional form fields required to request a courier parcel pickup (`courier_code`).
- **`runRequestParcelPickup`:** Orders a courier parcel pickup for previously created shipments.

---

## 4. Clients (CRM) Resource

### Clients Management
- **`getCrmClients`:** Retrieves a list of CRM clients with page-based multi-batch pagination (`returnAll: true`, `page`, `delayMs`) and rich filters (`crm_client_id`, `email`, `phone`, `login`, `invoice_company`, `invoice_tax_id`, `invoice_fullname`, `status_id`).
- **`getCrmClientData`:** Retrieves detailed profile information for a specific client (`crm_client_id`), including internal `notes` and custom extra fields (`include_custom_extra_fields`).
- **`addCrmClient`:** Creates a new client or updates an existing client when `crm_client_id` is supplied (`email`, `phone`, `status_id`, `star`, `login`, `notes`, invoice/delivery details, custom extra fields).
- **`deleteCrmClient`:** Permanently removes a CRM client from BaseLinker (`delete_crm_client_id`). Past orders associated with the client are preserved.
- **`getCrmClientExtraFields`:** Retrieves definitions and IDs of custom extra fields configured for CRM clients (`methods.loadOptions.getCrmClientExtraFields`).

### Client Statuses & Groups
- **`getCrmClientStatusGroups`:** Returns all CRM client status groups (`group_id`, `name`, `is_main_group`). Populates dynamic dropdowns (`methods.loadOptions.getCrmClientStatusGroups`).
- **`getCrmClientStatuses`:** Returns all CRM client statuses (`id`, `name`, `color`, `group_id`, `is_primary`). Populates dynamic dropdowns (`methods.loadOptions.getCrmClientStatuses`).
- **`addCrmClientStatus`:** Creates a new client status or updates an existing status (`name`, `color`, `group_id`, `status_id`).
- **`addCrmClientStatusGroup`:** Creates a new client status group or updates an existing group (`name`, `group_id`).
- **`deleteCrmClientStatus`:** Deletes a CRM client status and migrates existing clients to a designated target status (`status_id`, `target_status_id`). Enforces `status_id !== target_status_id`.
- **`deleteCrmClientStatusGroup`:** Deletes a status group and moves all member statuses back to the default main group (`group_id`).

---

## 5. Product Catalog Resource

### Catalogs & Warehouses
- **`getInventories`:** Retrieves the list of catalogs (inventories). Populates dynamic dropdowns (`methods.loadOptions.getInventories`).
- **`getInventoryWarehouses`:** Retrieves all warehouses (`bl` native, `shop`, `warehouse`, fulfillment). Populates dynamic dropdowns (`methods.loadOptions.getInventoryWarehouses`).
- **`addInventory` / `deleteInventory`:** Create, update, or remove product catalogs.
- **`addInventoryWarehouse` / `deleteInventoryWarehouse`:** Create, update, or remove warehouses.
- **`getInventoryMaps` / `getInventoryMapDetails`:** Retrieve warehouse visual floor layouts and maps.

### Product Listings & Details
- **`getInventoryProductsList`:** Retrieves basic product listings with rich filtering and page-based pagination (`returnAll: true`, up to 1000 items/page). Unpacks products dictionary into individual items.
- **`getInventoryProductsData`:** Retrieves comprehensive product profiles for selected product IDs (`products`), including bundles, dimensions, weights, tax rates, images, videos, variants, suppliers, and locations. Unpacks into individual items.
- **`addInventoryProduct`:** Creates or updates a product in the catalog (upsert when `product_id` is supplied). Provides rich inputs for core attributes, text field overrides, price groups, warehouse stocks, locations, and images.
- **`deleteInventoryProduct`:** Removes a product from the catalog.
- **`getInventoryParameters`:** Retrieves catalog parameter definitions, types, choices, and translations.
- **`runProductMacroTrigger`:** Executes personal automatic action triggers on catalog products.
- **`runFulfillmentLinkProducts`:** Links selected inventory products to a fulfillment center.

### Stock & Prices
- **`getInventoryProductsStock`:** Retrieves warehouse stock levels, reservations, and variant stock breakdowns. Unpacks dictionary into individual items. Supports pagination (`returnAll: true`).
- **`getInventoryProductsPrices`:** Retrieves gross prices per price group for all catalog products and variants. Unpacks dictionary into individual items. Supports pagination (`returnAll: true`).
- **`updateInventoryProductsStock`:** Bulk updates stock levels across warehouses (supports single product UI mode or bulk JSON dictionary mapping up to 1,000 items/request).
- **`updateInventoryProductsPrices`:** Bulk updates gross prices across price groups (supports single product UI mode or bulk JSON dictionary mapping up to 1,000 items/request).

### Product Logs
- **`getInventoryProductLogs`:** Event history for modifications made to products or variants (stock adjustments, price updates, text field edits, location changes, gallery updates, link changes, variant edits, bundle updates). Supports `perLog` (grouped) or `flatEntries` (flat list), smart timestamp normalization, and pagination (`returnAll: true`).
- **`getSyncLogList`:** Downloads marketplace synchronization error and change logs (up to 1,000 entries).

### Taxonomy & Dictionaries
- **Categories:** `getInventoryCategories` (dynamic dropdown), `addInventoryCategory`, `deleteInventoryCategory`.
- **Manufacturers:** `getInventoryManufacturers` (dynamic dropdown with 1,000 item pagination), `addInventoryManufacturer`, `deleteInventoryManufacturer`.
- **Price Groups:** `getInventoryPriceGroups` (dynamic dropdown), `addInventoryPriceGroup` (with formula multipliers and additions), `deleteInventoryPriceGroup`.
- **Tags:** `getInventoryTags` (dynamic dropdown), `addInventoryTag`, `deleteInventoryTag`.

### Extra Fields, Integrations & Promotions
- **`getInventoryExtraFields`:** Catalog extra field definitions. Populates dynamic dropdown `methods.loadOptions.getInventoryExtraFields`.
- **`getInventoryAvailableTextFieldKeys` & `getInventoryIntegrations`:** Inspect marketplace integrations and overridable text keys per sales channel.
- **`getInventoryShippingTemplates`:** Returns shipping templates for connected accounts (`methods.loadOptions.getInventoryShippingTemplates`).
- **`getInventoryPrintoutTemplates`:** Returns product printout templates.
- **`addInventoryPromotion` & `getInventoryPromotionsList`:** Create, update, and list catalog promotional rules.

### WMS: Locations, Zones & Racks
- **Locations & Location Types:**
  - `getInventoryWarehouseLocations`: List slots/bins with page-based pagination (`returnAll: true`).
  - `getInventoryWarehouseLocationTypes` / `addInventoryWarehouseLocationType` / `deleteInventoryWarehouseLocationType`: Manage bin types, dimensions, max weights, and transfer/receiving flags.
  - `addInventoryWarehouseLocation` / `deleteInventoryWarehouseLocation`: Create, update, and remove bin locations.
- **Zones & Racks:**
  - `getInventoryWarehouseZones` / `addInventoryWarehouseZone` / `deleteInventoryWarehouseZone`: Organize warehouses into colored zones with location prefixes.
  - `getInventoryWarehouseRacks` / `addInventoryWarehouseRack` / `deleteInventoryWarehouseRack`: Manage racks within zones.

### Suppliers & Payers
- **Suppliers:** `getInventorySuppliers`, `addInventorySupplier`, `deleteInventorySupplier`. Manage suppliers, tax numbers, contact details, currency, and cost/code mapping rules.
- **Payers:** `getInventoryPayers`, `addInventoryPayer`, `deleteInventoryPayer`. Manage payer companies and billing details.

### WMS Documents & Logistics
- **Warehouse Documents (GR, IGR, GI, IGI, IT, OB):**
  - `getInventoryDocuments`: List documents with filters and pagination (`returnAll: true`).
  - `getInventoryDocumentItems` / `addInventoryDocumentItems`: Retrieve and update line items.
  - `getInventoryDocumentSeries`: Numbering series per warehouse.
  - `getInventoryDocumentFile`: Download PDF with optional binary data decoding.
  - `addInventoryDocument` / `addInventoryDocumentFile` / `setInventoryDocumentStatusConfirmed`: Document lifecycle and stock confirmation.
- **Purchase Orders (PO):**
  - `getInventoryPurchaseOrders` / `getInventoryPurchaseOrderItems` / `getInventoryPurchaseOrderSeries` / `getInventoryPurchaseOrderLogs`: Full PO visibility and audit logs.
  - `getInventoryPurchaseOrderFile` / `addInventoryPurchaseOrderFile`: Manage supplier cost invoices with binary decoding/encoding.
  - `addInventoryPurchaseOrder` / `addInventoryPurchaseOrderItems` / `deleteInventoryPurchaseOrderItems` / `setInventoryPurchaseOrderStatus`: PO drafts, item adjustments, and status progression.
- **Transfers & Stocktakes:**
  - `getInventoryTransfers` / `getInventoryTransferItems` / `getInventoryTransferSeries` / `addInventoryTransfer` / `addInventoryTransferItems` / `setInventoryTransferStatus`: Inter-warehouse stock transfers.
  - `getInventoryStocktakes` / `getInventoryStocktakeItems` / `getInventoryStocktakeSeries` / `addInventoryStocktake` / `addInventoryStocktakeItems` / `setInventoryStocktakeStatus`: Physical inventory counts and discrepancy reconciliations.
- **Fulfillment Deliveries:**
  - `getInventoryFulfillmentDeliveries` / `getInventoryFulfillmentDeliveryItems` / `getInventoryFulfillmentDeliveryLabels`: Manage shipments to fulfillment centers with box/pallet label downloads.
  - `addInventoryFulfillmentDelivery` / `addInventoryFulfillmentDeliveryItems` / `runInventoryFulfillmentDeliverySubmission`: Register and submit deliveries.

---

## 6. Base Connect Resource

The `baseConnect` resource provides comprehensive integration with Base Connect B2B channels, contractor trade credit limits, credit history logs, and manual settlement payments.

### Connect Integrations & Contractors
- **`getConnectIntegrations`:**
  - Retrieves all Base Connect integrations on the account, divided into own integrations (`own_integrations`: created on this account) and connected integrations (`connected_integrations`: to which this account has connected).
  - Supports `integrationsOutputFormat`: `unpacked` (default: each integration emitted as an individual item tagged with `integration_type: 'own' | 'connected'`) or `raw` (returns raw integrations object).
  - Populates dynamic canvas dropdown `methods.loadOptions.getConnectIntegrations`.
- **`getConnectIntegrationContractors`:**
  - Retrieves all contractors connected to a selected Base Connect integration (`connect_integration_id`).
  - Returns contractor profiles: `connect_contractor_id`, `name`, `credit_data` (summary of trade credit limits, blocked credit, and available balance), and integration `settings`.
  - Supports Form Fields UI mode (with dynamic integration dropdown) and Raw Parameters JSON mode. Unpacks contractor dictionary into individual items.

### Trade Credit Management
- **`getConnectContractorCreditHistory`:**
  - Retrieves the full trade credit ledger and audit log for a chosen contractor (`connect_contractor_id`).
  - Returns entries: `credit_entry_id`, `date_add` (Unix timestamp), `description`, `currency`, `type` (`charge` | `payment`), `amount`, and `is_accepted` (`0` - waiting, `1` - active).
  - Unpacks credit history array into individual items.
- **`addConnectContractorCreditSettlement`:**
  - Adds a manual credit settlement (repayment) for a contractor in Base Connect.
  - Reduces the blocked credit amount (`credit_to_pay`) for the contractor, recording a payment received for previously charged orders.
  - Parameters: `connect_contractor_id`, `amount` (must be positive and cannot exceed `credit_to_pay`), `message` (repayment note / transfer ID, up to 255 chars), and optional `order_id`.
  - Returns `{ credit_entry_id, new_blocked_credit, new_available_credit }`.
- **`setConnectContractorCreditLimit`:**
  - Updates the trade credit ceiling for a chosen contractor (`connect_contractor_id`).
  - Parameters: `connect_contractor_id`, `new_limit` (float), and `message` (note displayed in trade credit history ledger).
  - Returns `{ new_limit_set }` formatted with currency (e.g. `"10000.00 PLN"`).

---

## 7. External Storages Resource

The `externalStorages` resource enables deep bidirectional synchronization with online stores and external wholesale warehouses connected to BaseLinker (such as PrestaShop, WooCommerce, Magento, Shopify, and custom shop integrations).

### Storages & Categories
- **`getExternalStoragesList`:**
  - Retrieves all connected external storages (shops, wholesalers) available on the BaseLinker account.
  - Returns `storage_id` (format: `shop_[id]` or `warehouse_[id]`), `name`, supported `methods`, `read`, and `write` permissions.
  - Populates dynamic canvas dropdown `methods.loadOptions.getExternalStorages`.
- **`getExternalStorageCategories`:**
  - Retrieves the category hierarchy tree (`category_id`, `name`, `parent_id`) from the specified external storage.
  - Populates dynamic canvas dropdown `methods.loadOptions.getExternalStorageCategories`.
  - Supports Form Fields UI mode and Raw Parameters JSON mode. Unpacks categories into individual items.

### Products Retrieval & Details
- **`getExternalStorageProductsList`:**
  - Retrieves basic product listings (`product_id`, `sku`, `ean`, `asin`, `name`, `quantity`, `price_brutto`) from an external storage.
  - Supports rich filtering: category ID, sort (`id ASC/DESC`, `name ASC/DESC`, `quantity ASC/DESC`, `price ASC/DESC`), product ID, SKU, EAN, ASIN, name, price range (`filter_price_from`, `filter_price_to`), quantity range (`filter_quantity_from`, `filter_quantity_to`), and availability (`filter_available`).
  - Supports automated multi-batch page pagination (`returnAll: true`) via `baselinkerGetExternalStorageProductsListAll` with rate-limiting pacing (`delayMs: 650` ms).
- **`getExternalStorageProductsData`:**
  - Retrieves complete product profiles from an external shop/wholesaler: net and gross prices, wholesale price, VAT tax rate, weight, full description and extra descriptions, manufacturer details, images array, attributes/features list, and variant breakdown.
  - Accepts comma-separated string, JSON bracketed array, or raw parameters. Unpacks product dictionary or array into individual items.

### Stock & Prices Sync
- **`getExternalStorageProductsQuantity`:**
  - Retrieves stock quantities for products and their variants from an external storage.
  - Supports page-based pagination (`returnAll: true`) via `baselinkerGetExternalStorageProductsQuantityAll`.
- **`getExternalStorageProductsPrices`:**
  - Retrieves gross prices for products and variants from an external storage.
  - Supports page-based pagination (`returnAll: true`) via `baselinkerGetExternalStorageProductsPricesAll`.
- **`updateExternalStorageProductsQuantity`:**
  - Bulk updates product and variant stock in the external storage (up to 1,000 products per request).
  - Supports Form Fields UI mode:
    - **Single Product / Variant:** Update a single product (`product_id`, `variant_id` [0 for main product], `quantity`).
    - **Multiple Products (UI Form):** Visual fixedCollection of products.
    - **Multiple Products (Raw JSON Array):** `[[productId, variantId, quantity], ...]` array.
  - Supports Raw Parameters JSON mode (`{ "storage_id": "...", "products": [...] }`).
  - Returns `counter` (number of updated items) and `warnings`.
