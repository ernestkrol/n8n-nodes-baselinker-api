# BaseLinker Node: Workflow Recipes & Examples

This document provides step-by-step architectural examples of common e-commerce automation patterns built using **n8n-nodes-baselinker-api**.

---

## 1. Hourly Sync of Confirmed Orders to ERP / Google Sheets

Synchronize newly confirmed orders into external accounting or ERP systems without missing orders or downloading duplicates.

```
[Schedule Trigger (Every 1 hour)]
       ↓
[BaseLinker: Orders / getOrders]
   - Parameter Mode: Form Fields
   - Return All: true
   - Pagination Cursor: date_confirmed_from
   - Date Confirmed From: ={{ $now.minus({ hours: 1 }).toUnixInteger() }}
   - Include Custom Extra Fields: true
       ↓
[Google Sheets / Postgres / ERP API Node]
```

**Key Advantages:**
- Cursor-based pagination automatically iterates across batches if more than 100 orders were confirmed in the hour.
- Safe `650 ms` delay prevents API rate-limiting spikes.

---

## 2. Generate Shipping Label & Send via Email Attachment

Triggered on parcel creation or packaging completion, downloads the shipping label PDF and emails it directly to warehouse staff or logistics partners.

```
[BaseLinker Trigger: Courier Package Created (log_type: 9)]
       ↓
[BaseLinker: Courier Shipments / getLabel]
   - Courier Code: ={{ $json.courier_code || 'inpost' }}
   - Package ID: ={{ $json.object_id }}
   - Download as Binary Data: true
   - Binary Property Name: data
       ↓
[Send Email (SMTP / Gmail / SendGrid)]
   - To: warehouse@company.com
   - Subject: =New Shipping Label for Order #{{ $json.order_id }}
   - Attachments: Binary Data (data)
```

**Key Advantages:**
- Automatically decodes the Base64 label stream from BaseLinker into a native n8n binary PDF attachment.
- Zero manual file conversion required.

---

## 3. CRM Client Profile Synchronization

Synchronize B2B customer profiles and custom extra fields from BaseLinker into your CRM or helpdesk (e.g. HubSpot, Pipedrive, Zendesk).

```
[Schedule Trigger / Webhook]
       ↓
[BaseLinker: Clients (CRM) / getCrmClients]
   - Parameter Mode: Form Fields
   - Return All: true
   - Filter: Invoice Company = "Acme"
       ↓
[BaseLinker: Clients (CRM) / getCrmClientData]
   - CRM Client ID: ={{ $json.crm_client_id }}
   - Include Custom Extra Fields: true
       ↓
[HubSpot / Pipedrive Node]
```

---

## 4. Process Customer Return & Issue Automated Refund

Receive a customer return form from your e-commerce storefront or support desk, register the return in BaseLinker, and record the refund status.

```
[Webhook / Storefront Return Form]
       ↓
[BaseLinker: Order Return / addOrderReturn]
   - Parameter Mode: Form Fields
   - Status ID: 101 (New Return)
   - Order ID: ={{ $json.order_id }}
   - Products: ={{ $json.returned_items }}
   - Admin Comments: "Customer initiated online return"
       ↓
[BaseLinker: Order Return / setOrderReturnRefund]
   - Return ID: ={{ $json.return_id }}
   - Refund Status: true
   - Refund Type: 2 (Bank transfer)
   - Amount: ={{ $json.refund_amount }}
   - Currency: ={{ $json.currency }}
       ↓
[Slack / Email Notification to Finance Team]
```

---

## 5. Catalog Stock & Gross Price Synchronization

Bulk update inventory stock levels and gross prices from supplier feeds or ERP systems.

```
[FTP / HTTP Request (Supplier XML/JSON Feed)]
       ↓
[Code Node: Format Products Dictionary]
  // Format as: { "12345": { "w101": 50 }, "12346": { "w101": 15 } }
       ↓
[BaseLinker: Product Catalog / updateInventoryProductsStock]
   - Parameter Mode: Raw Parameters (JSON)
   - Parameters:
     {
       "inventory_id": 1,
       "products": ={{ $json.stockPayload }}
     }
       ↓
[BaseLinker: Product Catalog / updateInventoryProductsPrices]
   - Parameter Mode: Raw Parameters (JSON)
   - Parameters:
     {
       "inventory_id": 1,
       "products": ={{ $json.pricePayload }}
     }
```

**Key Advantages:**
- BaseLinker supports updating up to 1,000 products per API call, allowing lightning-fast inventory synchronization without per-item loop overhead.
