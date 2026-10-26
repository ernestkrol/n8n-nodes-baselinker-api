# BaseLinker API Methods Coverage Matrix

This document provides a complete method-by-method breakdown of all 205 official BaseLinker API methods across all 7 API groups, tracking implementation status and linking directly to the official BaseLinker documentation.

## Summary Coverage Matrix

| API Group | Total Methods | Implemented | Coverage | Status |
|---|:---:|:---:|:---:|:---:|
| **1. Orders** | 51 | 51 | 100% | ✅ Fully Implemented |
| **2. Order returns** | 21 | 21 | 100% | ✅ Fully Implemented |
| **3. Courier shipments** | 16 | 16 | 100% | ✅ Fully Implemented |
| **4. Clients (CRM)** | 11 | 11 | 100% | ✅ Fully Implemented |
| **5. Product catalog** | 94 | 94 | 100% | ✅ Fully Implemented |
| **6. Base Connect** | 5 | 5 | 100% | ✅ Fully Implemented |
| **7. External storages** | 7 | 7 | 100% | ✅ Fully Implemented |
| **Total** | **205** | **205** | **100%** | ✅ 100% Official API Coverage |

---

## Detailed Category Breakdown

<details open>
<summary><b>1. Orders (51 / 51 implemented)</b></summary>

- **Orders:**
  - [x] [`getOrders`](https://api.baselinker.com/index.php?method=getOrders) — Download orders with filtering and cursor pagination
  - [x] [`setOrderFields`](https://api.baselinker.com/index.php?method=setOrderFields) — Update order fields and custom extra fields
  - [x] [`addOrder`](https://api.baselinker.com/index.php?method=addOrder) — Add a new order
  - [x] [`addOrderBySplit`](https://api.baselinker.com/index.php?method=addOrderBySplit) — Create order by splitting items from existing order
  - [x] [`addOrderDuplicate`](https://api.baselinker.com/index.php?method=addOrderDuplicate) — Duplicate an existing order
  - [x] [`deleteOrders`](https://api.baselinker.com/index.php?method=deleteOrders) — Delete orders in bulk
  - [x] [`setOrdersMerge`](https://api.baselinker.com/index.php?method=setOrdersMerge) — Merge multiple orders together
- **Order Products:**
  - [x] [`addOrderProduct`](https://api.baselinker.com/index.php?method=addOrderProduct) — Add a product item to an existing order
  - [x] [`deleteOrderProduct`](https://api.baselinker.com/index.php?method=deleteOrderProduct) — Remove a product item from an order
  - [x] [`setOrderProductFields`](https://api.baselinker.com/index.php?method=setOrderProductFields) — Edit product details in an order
- **Payments:**
  - [x] [`getOrderPaymentsHistory`](https://api.baselinker.com/index.php?method=getOrderPaymentsHistory) — Download payments and adjustments history
  - [x] [`setOrderPayment`](https://api.baselinker.com/index.php?method=setOrderPayment) — Add payment to order or mark as paid
- **Statuses:**
  - [x] [`getOrderStatusList`](https://api.baselinker.com/index.php?method=getOrderStatusList) — List all order statuses (dynamic loadOptions)
  - [x] [`getOrderStatusGroups`](https://api.baselinker.com/index.php?method=getOrderStatusGroups) — List status groups (dynamic loadOptions)
  - [x] [`setOrderStatus`](https://api.baselinker.com/index.php?method=setOrderStatus) — Change order status
  - [x] [`setOrderStatuses`](https://api.baselinker.com/index.php?method=setOrderStatuses) — Batch change statuses for multiple orders
  - [x] [`addOrderStatus`](https://api.baselinker.com/index.php?method=addOrderStatus) — Create or update an order status
  - [x] [`addOrderStatusGroup`](https://api.baselinker.com/index.php?method=addOrderStatusGroup) — Create or update a status group
  - [x] [`deleteOrderStatus`](https://api.baselinker.com/index.php?method=deleteOrderStatus) — Delete status and migrate orders
  - [x] [`deleteOrderStatusGroup`](https://api.baselinker.com/index.php?method=deleteOrderStatusGroup) — Delete status group
- **Invoices & Receipts:**
  - [x] [`getInvoices`](https://api.baselinker.com/index.php?method=getInvoices) — Download invoices with cursor pagination
  - [x] [`getInvoiceFile`](https://api.baselinker.com/index.php?method=getInvoiceFile) — Download invoice PDF with binary attachment decoding
  - [x] [`getSeries`](https://api.baselinker.com/index.php?method=getSeries) — List numbering series for invoices/receipts
  - [x] [`addInvoice`](https://api.baselinker.com/index.php?method=addInvoice) — Issue invoice for an order
  - [x] [`addInvoiceCorrection`](https://api.baselinker.com/index.php?method=addInvoiceCorrection) — Issue correction invoice
  - [x] [`addOrderInvoiceFile`](https://api.baselinker.com/index.php?method=addOrderInvoiceFile) — Upload external invoice PDF file to order
  - [x] [`getReceipts`](https://api.baselinker.com/index.php?method=getReceipts) — Download fiscal receipts with pagination
  - [x] [`getReceipt`](https://api.baselinker.com/index.php?method=getReceipt) — Detailed receipt information
  - [x] [`getNewReceipts`](https://api.baselinker.com/index.php?method=getNewReceipts) — Queue of receipts waiting to print on fiscal printer
  - [x] [`addReceipt`](https://api.baselinker.com/index.php?method=addReceipt) — Issue receipt for an order
  - [x] [`setOrderReceipt`](https://api.baselinker.com/index.php?method=setOrderReceipt) — Mark receipt as printed on fiscal printer
  - [x] [`addOrderReceiptFile`](https://api.baselinker.com/index.php?method=addOrderReceiptFile) — Upload receipt document file to order
- **Lookups & Logistics:**
  - [x] [`getOrdersByEmail`](https://api.baselinker.com/index.php?method=getOrdersByEmail) — Search orders by customer email
  - [x] [`getOrdersByPhone`](https://api.baselinker.com/index.php?method=getOrdersByPhone) — Search orders by customer phone
  - [x] [`getOrderTransactionData`](https://api.baselinker.com/index.php?method=getOrderTransactionData) — Detailed transaction and payment parameters
  - [x] [`getOrderPrintoutTemplates`](https://api.baselinker.com/index.php?method=getOrderPrintoutTemplates) — List configured printout templates
  - [x] [`runOrderMacroTrigger`](https://api.baselinker.com/index.php?method=runOrderMacroTrigger) — Execute automatic action macro trigger on order
- **Pick Lists & PickPack Carts:**
  - [x] [`addOrderPickList`](https://api.baselinker.com/index.php?method=addOrderPickList) — Create a new order pick list
  - [x] [`getOrderPickLists`](https://api.baselinker.com/index.php?method=getOrderPickLists) — Download pick lists with cursor pagination
  - [x] [`getOrderPickPackHistory`](https://api.baselinker.com/index.php?method=getOrderPickPackHistory) — Order collection/packing action history
  - [x] [`getPickPackCarts`](https://api.baselinker.com/index.php?method=getPickPackCarts) — List PickPack collection carts (dynamic loadOptions)
  - [x] [`addPickPackCart`](https://api.baselinker.com/index.php?method=addPickPackCart) — Add or edit PickPack cart
  - [x] [`deletePickPackCart`](https://api.baselinker.com/index.php?method=deletePickPackCart) — Delete PickPack cart
  - [x] [`getPickPackCartOrders`](https://api.baselinker.com/index.php?method=getPickPackCartOrders) — List orders currently in cart
  - [x] [`getPickPackOrderCart`](https://api.baselinker.com/index.php?method=getPickPackOrderCart) — Check cart assigned to order
  - [x] [`addPickPackOrdersToCart`](https://api.baselinker.com/index.php?method=addPickPackOrdersToCart) — Assign orders to cart
  - [x] [`deletePickPackCartOrders`](https://api.baselinker.com/index.php?method=deletePickPackCartOrders) — Remove all orders from cart
  - [x] [`deletePickPackOrderFromCart`](https://api.baselinker.com/index.php?method=deletePickPackOrderFromCart) — Remove specific order from cart
- **Other:**
  - [x] [`getJournalList`](https://api.baselinker.com/index.php?method=getJournalList) — Order event log from last 3 days
  - [x] [`getOrderExtraFields`](https://api.baselinker.com/index.php?method=getOrderExtraFields) — Order custom extra field definitions
  - [x] [`getOrderSources`](https://api.baselinker.com/index.php?method=getOrderSources) — Order sources and accounts

</details>

<details open>
<summary><b>2. Order returns (21 / 21 implemented)</b></summary>

- **Returns:**
  - [x] [`getOrderReturns`](https://api.baselinker.com/index.php?method=getOrderReturns) — Download order returns with filtering and pagination
  - [x] [`addOrderReturn`](https://api.baselinker.com/index.php?method=addOrderReturn) — Add a new order return with products and custom fields
  - [x] [`setOrderReturnFields`](https://api.baselinker.com/index.php?method=setOrderReturnFields) — Update order return fields and custom extra fields
  - [x] [`getOrderReturnExtraFields`](https://api.baselinker.com/index.php?method=getOrderReturnExtraFields) — Retrieve custom extra fields defined for order returns
- **Return products:**
  - [x] [`addOrderReturnProduct`](https://api.baselinker.com/index.php?method=addOrderReturnProduct) — Add a product item to an order return
  - [x] [`deleteOrderReturnProduct`](https://api.baselinker.com/index.php?method=deleteOrderReturnProduct) — Remove a product item from an order return
  - [x] [`setOrderReturnProductFields`](https://api.baselinker.com/index.php?method=setOrderReturnProductFields) — Edit product details in an order return
- **Statuses:**
  - [x] [`getOrderReturnStatusList`](https://api.baselinker.com/index.php?method=getOrderReturnStatusList) — List return statuses (dynamic loadOptions)
  - [x] [`getOrderReturnStatusGroups`](https://api.baselinker.com/index.php?method=getOrderReturnStatusGroups) — List return status groups (dynamic loadOptions)
  - [x] [`setOrderReturnStatus`](https://api.baselinker.com/index.php?method=setOrderReturnStatus) — Change order return status
  - [x] [`setOrderReturnStatuses`](https://api.baselinker.com/index.php?method=setOrderReturnStatuses) — Batch change statuses for multiple returns
  - [x] [`addOrderReturnStatus`](https://api.baselinker.com/index.php?method=addOrderReturnStatus) — Create or update an order return status
  - [x] [`addOrderReturnStatusGroup`](https://api.baselinker.com/index.php?method=addOrderReturnStatusGroup) — Create or update an order return status group
  - [x] [`deleteOrderReturnStatus`](https://api.baselinker.com/index.php?method=deleteOrderReturnStatus) — Delete an order return status and migrate returns
  - [x] [`deleteOrderReturnStatusGroup`](https://api.baselinker.com/index.php?method=deleteOrderReturnStatusGroup) — Delete an order return status group
  - [x] [`getOrderReturnProductStatuses`](https://api.baselinker.com/index.php?method=getOrderReturnProductStatuses) — List return item statuses (dynamic loadOptions)
  - [x] [`getOrderReturnReasonsList`](https://api.baselinker.com/index.php?method=getOrderReturnReasonsList) — List return reasons (dynamic loadOptions)
- **Payments & Other:**
  - [x] [`getOrderReturnPaymentsHistory`](https://api.baselinker.com/index.php?method=getOrderReturnPaymentsHistory) — Retrieve payment transactions history for returns
  - [x] [`setOrderReturnRefund`](https://api.baselinker.com/index.php?method=setOrderReturnRefund) — Mark return as refunded
  - [x] [`getOrderReturnJournalList`](https://api.baselinker.com/index.php?method=getOrderReturnJournalList) — Return event log from last 3 days
  - [x] [`runOrderReturnMacroTrigger`](https://api.baselinker.com/index.php?method=runOrderReturnMacroTrigger) — Execute automatic action macro trigger on return

</details>

<details open>
<summary><b>3. Courier shipments (16 / 16 implemented)</b></summary>

- **Packages & Bookings:**
  - [x] [`getOrderPackages`](https://api.baselinker.com/index.php?method=getOrderPackages) — Shipments created for an order
  - [x] [`getPackageDetails`](https://api.baselinker.com/index.php?method=getPackageDetails) — Package dimensions, weight, and subpackages
  - [x] [`getCourierPackagesStatusHistory`](https://api.baselinker.com/index.php?method=getCourierPackagesStatusHistory) — Parcel tracking history
  - [x] [`createPackage`](https://api.baselinker.com/index.php?method=createPackage) — Create courier shipment via courier API
  - [x] [`createPackageManual`](https://api.baselinker.com/index.php?method=createPackageManual) — Add external tracking number to order
  - [x] [`deleteCourierPackage`](https://api.baselinker.com/index.php?method=deleteCourierPackage) — Cancel / delete courier shipment
  - [x] [`getPricePackage`](https://api.baselinker.com/index.php?method=getPricePackage) — Courier shipment quotations / pricing
- **Courier Info & Services:**
  - [x] [`getCouriersList`](https://api.baselinker.com/index.php?method=getCouriersList) — List all available courier integrations (dynamic loadOptions)
  - [x] [`getCourierAccounts`](https://api.baselinker.com/index.php?method=getCourierAccounts) — Connected accounts for a courier (dynamic loadOptions)
  - [x] [`getCourierFields`](https://api.baselinker.com/index.php?method=getCourierFields) — Courier form field definitions
  - [x] [`getCourierServices`](https://api.baselinker.com/index.php?method=getCourierServices) — Dynamic courier services based on package parameters
- **Labels, Documents & Protocol:**
  - [x] [`getLabel`](https://api.baselinker.com/index.php?method=getLabel) — Download shipping label (PDF, ZPL, EPL with binary attachment)
  - [x] [`getCourierDocument`](https://api.baselinker.com/index.php?method=getCourierDocument) — Download parcel documents (manifest, customs, label) with binary attachment
  - [x] [`getProtocol`](https://api.baselinker.com/index.php?method=getProtocol) — Download dispatch protocol / manifest with binary attachment
- **Parcel Pickups:**
  - [x] [`getRequestParcelPickupFields`](https://api.baselinker.com/index.php?method=getRequestParcelPickupFields) — Retrieve pickup request form fields
  - [x] [`runRequestParcelPickup`](https://api.baselinker.com/index.php?method=runRequestParcelPickup) — Order courier parcel pickup

</details>

<details open>
<summary><b>4. Clients (CRM) (11 / 11 implemented)</b></summary>

- **Clients:**
  - [x] [`getCrmClients`](https://api.baselinker.com/index.php?method=getCrmClients) — List CRM clients with pagination
  - [x] [`getCrmClientData`](https://api.baselinker.com/index.php?method=getCrmClientData) — Detailed client profile with notes and extra fields
  - [x] [`addCrmClient`](https://api.baselinker.com/index.php?method=addCrmClient) — Create or update CRM client
  - [x] [`deleteCrmClient`](https://api.baselinker.com/index.php?method=deleteCrmClient) — Delete CRM client
  - [x] [`getCrmClientExtraFields`](https://api.baselinker.com/index.php?method=getCrmClientExtraFields) — Client custom extra field definitions
- **Statuses:**
  - [x] [`getCrmClientStatusGroups`](https://api.baselinker.com/index.php?method=getCrmClientStatusGroups) — List client status groups
  - [x] [`getCrmClientStatuses`](https://api.baselinker.com/index.php?method=getCrmClientStatuses) — List client statuses
  - [x] [`addCrmClientStatus`](https://api.baselinker.com/index.php?method=addCrmClientStatus) — Create or update client status
  - [x] [`addCrmClientStatusGroup`](https://api.baselinker.com/index.php?method=addCrmClientStatusGroup) — Create or update client status group
  - [x] [`deleteCrmClientStatus`](https://api.baselinker.com/index.php?method=deleteCrmClientStatus) — Delete client status and migrate clients
  - [x] [`deleteCrmClientStatusGroup`](https://api.baselinker.com/index.php?method=deleteCrmClientStatusGroup) — Delete client status group

</details>

<details open>
<summary><b>5. Product catalog (94 / 94 implemented)</b></summary>

- **Inventories:**
  - [x] [`getInventories`](https://api.baselinker.com/index.php?method=getInventories) — List catalogs (loadOptions dropdown)
  - [x] [`addInventory`](https://api.baselinker.com/index.php?method=addInventory) — Add or update catalog
  - [x] [`deleteInventory`](https://api.baselinker.com/index.php?method=deleteInventory) — Delete catalog
- **Warehouses:**
  - [x] [`getInventoryWarehouses`](https://api.baselinker.com/index.php?method=getInventoryWarehouses) — List warehouses (loadOptions dropdown)
  - [x] [`addInventoryWarehouse`](https://api.baselinker.com/index.php?method=addInventoryWarehouse) — Add or update warehouse
  - [x] [`deleteInventoryWarehouse`](https://api.baselinker.com/index.php?method=deleteInventoryWarehouse) — Delete warehouse
  - [x] [`getInventoryMaps`](https://api.baselinker.com/index.php?method=getInventoryMaps) — List warehouse maps
  - [x] [`getInventoryMapDetails`](https://api.baselinker.com/index.php?method=getInventoryMapDetails) — Full warehouse visual layout
- **Products:**
  - [x] [`getInventoryProductsList`](https://api.baselinker.com/index.php?method=getInventoryProductsList) — Basic product listings with pagination
  - [x] [`getInventoryProductsData`](https://api.baselinker.com/index.php?method=getInventoryProductsData) — Detailed product profiles
  - [x] [`getInventoryProductsStock`](https://api.baselinker.com/index.php?method=getInventoryProductsStock) — Stock levels & reservations
  - [x] [`getInventoryProductsPrices`](https://api.baselinker.com/index.php?method=getInventoryProductsPrices) — Gross prices per price group
  - [x] [`getInventoryProductLogs`](https://api.baselinker.com/index.php?method=getInventoryProductLogs) — Change audit logs (perLog / flatEntries)
  - [x] [`updateInventoryProductsStock`](https://api.baselinker.com/index.php?method=updateInventoryProductsStock) — Bulk update stock
  - [x] [`updateInventoryProductsPrices`](https://api.baselinker.com/index.php?method=updateInventoryProductsPrices) — Bulk update prices
  - [x] [`addInventoryProduct`](https://api.baselinker.com/index.php?method=addInventoryProduct) — Create or update product
  - [x] [`deleteInventoryProduct`](https://api.baselinker.com/index.php?method=deleteInventoryProduct) — Delete product
  - [x] [`getInventoryParameters`](https://api.baselinker.com/index.php?method=getInventoryParameters) — Predefined parameter dictionary
  - [x] [`runProductMacroTrigger`](https://api.baselinker.com/index.php?method=runProductMacroTrigger) — Execute automatic action personal trigger
  - [x] [`runFulfillmentLinkProducts`](https://api.baselinker.com/index.php?method=runFulfillmentLinkProducts) — Link products to fulfillment warehouse
- **Categories, Manufacturers & Price Groups:**
  - [x] [`getInventoryCategories`](https://api.baselinker.com/index.php?method=getInventoryCategories) — List categories (loadOptions dropdown)
  - [x] [`addInventoryCategory`](https://api.baselinker.com/index.php?method=addInventoryCategory) — Add or update category
  - [x] [`deleteInventoryCategory`](https://api.baselinker.com/index.php?method=deleteInventoryCategory) — Delete category
  - [x] [`getInventoryManufacturers`](https://api.baselinker.com/index.php?method=getInventoryManufacturers) — List manufacturers with pagination
  - [x] [`addInventoryManufacturer`](https://api.baselinker.com/index.php?method=addInventoryManufacturer) — Add or update manufacturer
  - [x] [`deleteInventoryManufacturer`](https://api.baselinker.com/index.php?method=deleteInventoryManufacturer) — Delete manufacturer
  - [x] [`getInventoryPriceGroups`](https://api.baselinker.com/index.php?method=getInventoryPriceGroups) — List price groups (loadOptions dropdown)
  - [x] [`addInventoryPriceGroup`](https://api.baselinker.com/index.php?method=addInventoryPriceGroup) — Add or update price group
  - [x] [`deleteInventoryPriceGroup`](https://api.baselinker.com/index.php?method=deleteInventoryPriceGroup) — Delete price group
- **Tags, Extra Fields, Integrations & Promotions:**
  - [x] [`getInventoryTags`](https://api.baselinker.com/index.php?method=getInventoryTags) — List tags (loadOptions dropdown)
  - [x] [`addInventoryTag`](https://api.baselinker.com/index.php?method=addInventoryTag) — Add or update tag
  - [x] [`deleteInventoryTag`](https://api.baselinker.com/index.php?method=deleteInventoryTag) — Delete tag
  - [x] [`getInventoryExtraFields`](https://api.baselinker.com/index.php?method=getInventoryExtraFields) — Catalog extra field definitions
  - [x] [`getInventoryAvailableTextFieldKeys`](https://api.baselinker.com/index.php?method=getInventoryAvailableTextFieldKeys) — Overwritable text keys
  - [x] [`getInventoryIntegrations`](https://api.baselinker.com/index.php?method=getInventoryIntegrations) — Integrations with text overrides
  - [x] [`getInventoryShippingTemplates`](https://api.baselinker.com/index.php?method=getInventoryShippingTemplates) — Shipping delivery schemas
  - [x] [`getSyncLogList`](https://api.baselinker.com/index.php?method=getSyncLogList) — Price/stock synchronization logs
  - [x] [`getInventoryPrintoutTemplates`](https://api.baselinker.com/index.php?method=getInventoryPrintoutTemplates) — Product printout templates
  - [x] [`addInventoryPromotion`](https://api.baselinker.com/index.php?method=addInventoryPromotion) — Add or update promotion
  - [x] [`getInventoryPromotionsList`](https://api.baselinker.com/index.php?method=getInventoryPromotionsList) — List catalog promotions
- **WMS, Documents & Logistics:**
  - [x] Documents (8): [`getInventoryDocuments`](https://api.baselinker.com/index.php?method=getInventoryDocuments), [`getInventoryDocumentItems`](https://api.baselinker.com/index.php?method=getInventoryDocumentItems), [`getInventoryDocumentSeries`](https://api.baselinker.com/index.php?method=getInventoryDocumentSeries), [`getInventoryDocumentFile`](https://api.baselinker.com/index.php?method=getInventoryDocumentFile), [`addInventoryDocument`](https://api.baselinker.com/index.php?method=addInventoryDocument), [`addInventoryDocumentItems`](https://api.baselinker.com/index.php?method=addInventoryDocumentItems), [`addInventoryDocumentFile`](https://api.baselinker.com/index.php?method=addInventoryDocumentFile), [`setInventoryDocumentStatusConfirmed`](https://api.baselinker.com/index.php?method=setInventoryDocumentStatusConfirmed)
  - [x] Purchase Orders (10): [`getInventoryPurchaseOrders`](https://api.baselinker.com/index.php?method=getInventoryPurchaseOrders), [`getInventoryPurchaseOrderItems`](https://api.baselinker.com/index.php?method=getInventoryPurchaseOrderItems), [`getInventoryPurchaseOrderSeries`](https://api.baselinker.com/index.php?method=getInventoryPurchaseOrderSeries), [`getInventoryPurchaseOrderLogs`](https://api.baselinker.com/index.php?method=getInventoryPurchaseOrderLogs), [`getInventoryPurchaseOrderFile`](https://api.baselinker.com/index.php?method=getInventoryPurchaseOrderFile), [`addInventoryPurchaseOrder`](https://api.baselinker.com/index.php?method=addInventoryPurchaseOrder), [`addInventoryPurchaseOrderItems`](https://api.baselinker.com/index.php?method=addInventoryPurchaseOrderItems), [`addInventoryPurchaseOrderFile`](https://api.baselinker.com/index.php?method=addInventoryPurchaseOrderFile), [`deleteInventoryPurchaseOrderItems`](https://api.baselinker.com/index.php?method=deleteInventoryPurchaseOrderItems), [`setInventoryPurchaseOrderStatus`](https://api.baselinker.com/index.php?method=setInventoryPurchaseOrderStatus)
  - [x] Transfers (6): [`getInventoryTransfers`](https://api.baselinker.com/index.php?method=getInventoryTransfers), [`getInventoryTransferItems`](https://api.baselinker.com/index.php?method=getInventoryTransferItems), [`getInventoryTransferSeries`](https://api.baselinker.com/index.php?method=getInventoryTransferSeries), [`addInventoryTransfer`](https://api.baselinker.com/index.php?method=addInventoryTransfer), [`addInventoryTransferItems`](https://api.baselinker.com/index.php?method=addInventoryTransferItems), [`setInventoryTransferStatus`](https://api.baselinker.com/index.php?method=setInventoryTransferStatus)
  - [x] Stocktakes (6): [`getInventoryStocktakes`](https://api.baselinker.com/index.php?method=getInventoryStocktakes), [`getInventoryStocktakeItems`](https://api.baselinker.com/index.php?method=getInventoryStocktakeItems), [`getInventoryStocktakeSeries`](https://api.baselinker.com/index.php?method=getInventoryStocktakeSeries), [`addInventoryStocktake`](https://api.baselinker.com/index.php?method=addInventoryStocktake), [`addInventoryStocktakeItems`](https://api.baselinker.com/index.php?method=addInventoryStocktakeItems), [`setInventoryStocktakeStatus`](https://api.baselinker.com/index.php?method=setInventoryStocktakeStatus)
  - [x] Fulfillment Deliveries (6): [`getInventoryFulfillmentDeliveries`](https://api.baselinker.com/index.php?method=getInventoryFulfillmentDeliveries), [`getInventoryFulfillmentDeliveryItems`](https://api.baselinker.com/index.php?method=getInventoryFulfillmentDeliveryItems), [`getInventoryFulfillmentDeliveryLabels`](https://api.baselinker.com/index.php?method=getInventoryFulfillmentDeliveryLabels), [`addInventoryFulfillmentDelivery`](https://api.baselinker.com/index.php?method=addInventoryFulfillmentDelivery), [`addInventoryFulfillmentDeliveryItems`](https://api.baselinker.com/index.php?method=addInventoryFulfillmentDeliveryItems), [`runInventoryFulfillmentDeliverySubmission`](https://api.baselinker.com/index.php?method=runInventoryFulfillmentDeliverySubmission)
  - [x] Locations (6): [`getInventoryWarehouseLocations`](https://api.baselinker.com/index.php?method=getInventoryWarehouseLocations), [`getInventoryWarehouseLocationTypes`](https://api.baselinker.com/index.php?method=getInventoryWarehouseLocationTypes), [`addInventoryWarehouseLocation`](https://api.baselinker.com/index.php?method=addInventoryWarehouseLocation), [`addInventoryWarehouseLocationType`](https://api.baselinker.com/index.php?method=addInventoryWarehouseLocationType), [`deleteInventoryWarehouseLocation`](https://api.baselinker.com/index.php?method=deleteInventoryWarehouseLocation), [`deleteInventoryWarehouseLocationType`](https://api.baselinker.com/index.php?method=deleteInventoryWarehouseLocationType)
  - [x] Zones & Racks (6): [`getInventoryWarehouseZones`](https://api.baselinker.com/index.php?method=getInventoryWarehouseZones), [`addInventoryWarehouseZone`](https://api.baselinker.com/index.php?method=addInventoryWarehouseZone), [`deleteInventoryWarehouseZone`](https://api.baselinker.com/index.php?method=deleteInventoryWarehouseZone), [`getInventoryWarehouseRacks`](https://api.baselinker.com/index.php?method=getInventoryWarehouseRacks), [`addInventoryWarehouseRack`](https://api.baselinker.com/index.php?method=addInventoryWarehouseRack), [`deleteInventoryWarehouseRack`](https://api.baselinker.com/index.php?method=deleteInventoryWarehouseRack)
  - [x] Suppliers & Payers (6): [`getInventorySuppliers`](https://api.baselinker.com/index.php?method=getInventorySuppliers), [`addInventorySupplier`](https://api.baselinker.com/index.php?method=addInventorySupplier), [`deleteInventorySupplier`](https://api.baselinker.com/index.php?method=deleteInventorySupplier), [`getInventoryPayers`](https://api.baselinker.com/index.php?method=getInventoryPayers), [`addInventoryPayer`](https://api.baselinker.com/index.php?method=addInventoryPayer), [`deleteInventoryPayer`](https://api.baselinker.com/index.php?method=deleteInventoryPayer)

</details>

<details open>
<summary><b>6. Base Connect (5 / 5 implemented)</b></summary>

- **Integrations:**
  - [x] [`getConnectIntegrations`](https://api.baselinker.com/index.php?method=getConnectIntegrations) — Retrieve list of all Base Connect integrations on this account (own and connected)
  - [x] [`getConnectIntegrationContractors`](https://api.baselinker.com/index.php?method=getConnectIntegrationContractors) — Retrieve list of contractors connected to the selected Base Connect integration
- **Contractor credit:**
  - [x] [`getConnectContractorCreditHistory`](https://api.baselinker.com/index.php?method=getConnectContractorCreditHistory) — Retrieve trade credit history for a chosen contractor
  - [x] [`addConnectContractorCreditSettlement`](https://api.baselinker.com/index.php?method=addConnectContractorCreditSettlement) — Add a manual credit settlement (repayment) for a chosen contractor
  - [x] [`setConnectContractorCreditLimit`](https://api.baselinker.com/index.php?method=setConnectContractorCreditLimit) — Set new trade credit limit for chosen contractor

</details>

<details open>
<summary><b>7. External storages (7 / 7 implemented)</b></summary>

- **External connections:**
  - [x] [`getExternalStoragesList`](https://api.baselinker.com/index.php?method=getExternalStoragesList) — Retrieve list of connected external storages (shops, wholesalers)
  - [x] [`getExternalStorageCategories`](https://api.baselinker.com/index.php?method=getExternalStorageCategories) — Retrieve category list from external storage
  - [x] [`getExternalStorageProductsList`](https://api.baselinker.com/index.php?method=getExternalStorageProductsList) — Retrieve list of products with filters and pagination
  - [x] [`getExternalStorageProductsData`](https://api.baselinker.com/index.php?method=getExternalStorageProductsData) — Retrieve detailed product profiles, variants, features, and images
  - [x] [`getExternalStorageProductsQuantity`](https://api.baselinker.com/index.php?method=getExternalStorageProductsQuantity) — Retrieve stock quantities and variants from external storage
  - [x] [`getExternalStorageProductsPrices`](https://api.baselinker.com/index.php?method=getExternalStorageProductsPrices) — Retrieve product gross prices and variant prices
  - [x] [`updateExternalStorageProductsQuantity`](https://api.baselinker.com/index.php?method=updateExternalStorageProductsQuantity) — Bulk update stock for products and variants in external storage

</details>
