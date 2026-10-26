# BaseLinker Trigger Node: Architecture & Guide

The `BaseLinkerTrigger` node initiates automated n8n workflows whenever order and logistics events take place in BaseLinker (such as order creation, order status changes, payment registration, courier package creation, and invoice issuance).

```mermaid
flowchart LR
    BL["BaseLinker Event Log (getJournalList)"] -->|Poll Interval (e.g. 1m)| TR["BaseLinker Trigger Node"]
    TR -->|Filter by Event Type & Target Status| FILT{Matching Event?}
    FILT -->|No| DROP["Skip / Store Cursor"]
    FILT -->|Yes| HYDR{Hydrate Order Details?}
    HYDR -->|No| OUT1["Emit Journal Event Metadata"]
    HYDR -->|Yes (getOrders)| OUT2["Emit Enriched Full Order Profile"]
    OUT1 --> WF["Downstream n8n Workflow"]
    OUT2 --> WF
```

---

## Why Polling `getJournalList`?

BaseLinker does not provide a public API to programmatically register, inspect, or manage outgoing webhooks. Setting up traditional webhooks requires manually navigating the BaseLinker web dashboard, creating *Automatic Actions* for each specific event, and hardcoding callback URLs.

The **BaseLinker Trigger node** provides a zero-configuration, plug-and-play experience:

1. **Zero BaseLinker Dashboard Setup:** Simply authenticate with your API token in n8n and activate the workflow.
2. **Rolling 3-Day Buffer:** BaseLinker retains a 3-day history of all account journal events. If your n8n instance is temporarily restarted, upgraded, or offline, no events are lost.
3. **Monotonic Cursor:** Remembers the last processed event ID (`lastLogId`) via `workflowStaticData`.
4. **Safe Quota Consumption:** 1 polling request per minute consumes `< 1%` of BaseLinker's 100 requests/minute API quota.

---

## Pre-Configured Event Types

The node provides quick selection for the most common e-commerce workflows:

| Trigger Option | BaseLinker Log Type | Description |
|---|---|---|
| **Order Created** | `log_type: 1` | Fires whenever a new order is received in BaseLinker |
| **Order Status Changed** | `log_type: 18` | Fires when an order transitions to any status (supports Target Status Filter) |
| **Order Paid** | `log_type: 3` | Fires when payment is registered for an order |
| **Courier Package Created** | `log_type: 9` | Fires when a shipping label or consignment is created |
| **Courier Package Status Changed** | `log_type: 22` | Fires when tracking status changes (e.g. delivered, in transit) |
| **Invoice Issued** | `log_type: 7` | Fires when an invoice document is generated |
| **All Order Events** | `all` | Listens to all journal events across the account |
| **Custom Event Types** | `custom` | Multi-select any combination from all 22 official log types |

---

## Target Status Filter (`statusId`)

When listening to **Order Status Changed** (`log_type: 18`), BaseLinker fires events for *every* status change across your entire account. 

To prevent workflows from triggering unnecessarily on irrelevant status transitions, the trigger node provides a **Target Status Filter**:
- Dynamically populated with your live BaseLinker order statuses via `loadOptions`.
- Evaluates `log.object_id === targetStatusId` client-side before emitting.
- Only orders entering your designated status (e.g. *Ready for shipping*, *Packed*, or *Awaiting payment*) will trigger downstream workflow execution.

---

## Optional Order Details Resolution (`resolveOrderDetails`)

By default, BaseLinker's event journal returns lightweight event metadata:

```json
{
  "id": 892341,
  "order_id": 1234567,
  "log_type": 18,
  "object_id": 1051,
  "date": 1711200000
}
```

When **Resolve Order Details (`resolveOrderDetails`)** is toggled **ON**:
- The trigger node automatically calls `getOrders({ order_id })` with rate-limit pacing.
- The emitted payload is enriched with the complete order profile:
  - Customer contact details (`email`, `phone`, `user_login`)
  - Delivery and billing addresses
  - Ordered products list (`name`, `sku`, `ean`, `price`, `quantity`)
  - Order totals, currency, payment status, and custom extra fields.

---

## Cold Start Modes (`initialRun`)

When a workflow containing a trigger node is activated for the first time:

- **`Fetch Only New Events After Activation` (Default):**
  Initializes the cursor (`lastLogId`) to the highest existing event ID in BaseLinker without triggering downstream actions for historical events from the last 3 days. Recommended for production workflows.
- **`Fetch All Existing Events from Last 3 Days`:**
  Processes and emits the entire 3-day backlog of matching events upon first run. Ideal for backfilling data or re-processing recent events.

---

## Canvas Testing in Manual Mode

When building and testing workflows inside the n8n canvas editor:
- Clicking **"Test step"** in manual mode (`getMode() === 'manual'`) fetches recent sample events from BaseLinker without mutating the production `lastLogId` cursor stored in workflow static data.
- This allows you to inspect event outputs, build expressions, and test downstream nodes safely without needing to simulate actual orders in your store.
