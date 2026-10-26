# Pagination & Rate Limiting Strategy

BaseLinker limits accounts to **100 requests per minute** with a maximum of **10 concurrent requests**. To ensure that large-scale data synchronization jobs run reliably without hitting `429 Too Many Requests` or getting throttled by BaseLinker, the **n8n-nodes-baselinker-api** node implements built-in rate-limit protection and multi-batch pagination routines.

---

## Rate-Limit Pacing (`delayMs`)

For all multi-batch pagination operations (`returnAll: true`), the node includes an intelligent pause between successive HTTP requests:
- **Default Delay:** `650 ms`
- **Effective Rate:** ~92 requests per minute (strictly below BaseLinker's 100 req/min threshold).
- **Configurable:** Advanced users running on dedicated or high-volume plans can adjust `delayMs` directly in the node parameters.

---

## Pagination Strategy Matrix

| Operation | Strategy | Cursor / Key | Default Delay | Stop Condition |
|---|---|---|---|---|
| `getOrders` | Cursor-based | `date_confirmed_from` / `date_from` / `id_from` | `650 ms` | Batch `< 100` items or limit reached |
| `getOrderReturns` | Cursor-based | `id_from` (recommended) / `date_from` | `650 ms` | Batch `< 100` items or limit reached |
| `getInvoices` | Cursor-based | `id_from` (recommended) / `date_from` | `650 ms` | Batch `< 100` items or limit reached |
| `getCrmClients` | Page-based | `page` (increments: 1, 2, 3...) | `650 ms` | Batch `< 100` items or limit reached |
| `getInventoryProductsList` | Page-based | `page` (increments: 1, 2, 3...) | `650 ms` | Batch `< 1000` items or limit reached |
| `getInventoryProductsStock` | Page-based | `page` (increments: 1, 2, 3...) | `650 ms` | Batch `< 1000` items or limit reached |
| `getInventoryProductsPrices` | Page-based | `page` (increments: 1, 2, 3...) | `650 ms` | Batch `< 1000` items or limit reached |
| `getInventoryProductLogs` | Page-based | `page` (increments: 1, 2, 3...) | `650 ms` | Batch `< 100` items or limit reached |
| `getExternalStorageProductsList` | Page-based | `page` (increments: 1, 2, 3...) | `650 ms` | Empty batch or limit reached |
| `getExternalStorageProductsQuantity` | Page-based | `page` (increments: 1, 2, 3...) | `650 ms` | Empty batch or limit reached |
| `getExternalStorageProductsPrices` | Page-based | `page` (increments: 1, 2, 3...) | `650 ms` | Empty batch or limit reached |
| `Status Groups` | Multi-query | Iterates statuses in group | `650 ms` | All statuses processed |

---

## Detailed Strategies

### 1. Cursor-Based Pagination (`getOrders`, `getOrderReturns`, `getInvoices`)
BaseLinker returns a maximum of 100 items per request for orders, returns, and invoices.

#### Cursors in `getOrders`:
1. **`date_confirmed_from` (Recommended for ongoing order synchronization):**
   - The cursor for the next batch advances to `Number(lastOrder.date_confirmed) + 1` second.
   - Avoids downloading duplicate orders across sync intervals.
   - **Unconfirmed Orders Edge Case:** If `get_unconfirmed_orders: true` is enabled, pending unconfirmed orders have `date_confirmed = 0`. If a batch ends on an unconfirmed order, the cursor automatically falls back to `id_from = lastOrder.order_id + 1` to prevent infinite loops.
2. **`date_from`:**
   - Synchronizes based on order creation date (`date_add + 1`).
   - Ideal for synchronizing newly created orders or unconfirmed orders.
3. **`id_from`:**
   - Strictly sequential synchronization by order ID (`order_id + 1`).
   - Immune to timestamp collisions.

#### Stop Conditions for Cursor Pagination:
1. Returned batch size is less than 100 (`items.length < 100`).
2. Total accumulated items reaches the user-defined `limit` or `maxTotalOrders`.
3. Guard condition: Cursor fails to advance or safety limit (1,000 iterations) is reached.

---

### 2. Page-Based Pagination (`getCrmClients`, `getInventoryProductsList`, etc.)
For endpoints that utilize explicit page indexing:
- Increments `page = 1, 2, 3...` on each batch.
- Pauses for `delayMs` between requests.
- Stops when a page returns fewer than the maximum page capacity (e.g. `< 100` for CRM clients or `< 1,000` for catalog products).

---

### 3. Status Group Multi-Query Strategy
When selecting `Status Group` under `statusFilter` in `getOrders`:
1. Queries `getOrderStatusList` to discover all status IDs belonging to the chosen group.
2. Sequentially queries orders for each status ID in that group with rate-limit pacing.
3. Consolidates all matching orders into a single continuous stream for downstream nodes.
