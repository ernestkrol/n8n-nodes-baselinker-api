# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- **Output Schema Return Without Live Data (`returnSampleData`)**:
  - Added a top-level parameter `Return Sample Data (Mock / Schema Only)` to the `BaseLinker` node.
  - Allows workflow designers to click "Test step" and immediately receive complete, realistic BaseLinker output schemas in downstream nodes without making any external API calls or consuming rate limits.
- **n8n AI Tool Support (`usableAsTool: true`)**:
  - Configured `usableAsTool: true` on `BaseLinker` node, allowing it to be used directly as an on-demand tool by n8n AI Agents (LangChain agents).
- **Realistic Sample Data Generators**:
  - Added [`nodes/BaseLinker/Samples/SampleData.ts`](nodes/BaseLinker/Samples/SampleData.ts) providing typed schema fixtures across all 8 BaseLinker resources (`orders`, `orderStatus`, `courierShipments`, `invoices`, `productCatalog`, `crm`, `orderReturns`, `externalStorages`, `baseConnect`).
- **Automated Tests**:
  - Added [`test/SampleData.test.ts`](test/SampleData.test.ts) (10 tests) and [`test/AiToolAndMock.test.ts`](test/AiToolAndMock.test.ts) (4 tests), bringing test suite to 312 tests passing.

---

## [0.1.1] - 2026-10-27

### Security
- **Dependency Hardening & Vulnerability Remediation**:
  - Upgraded `n8n-workflow` from `^2.16.0` to `~2.44.2` (the official npm `stable` release). Resolves expression-runtime sandbox escapes (**CVE-2026-25049**, **CVE-2025-68613**, **CVE-2026-1470**) and updates older core sub-dependencies (`lodash@4.18.1`, `axios@1.20.0`, `form-data@4.0.6`, `uuid@11.1.1`).
  - Added dependency override for `"zod": "^4.6.7"` to resolve the memory exhaustion vulnerability **GHSA-mrhx-c7xc-m3w5** (`zod < 4.6.6`).
  - Verified clean security status with `npm audit` (**0 vulnerabilities**).

### Added
- **Configurable BaseLinker API Endpoint**:
  - Configured `apiUrl` in `BaseLinkerApi` credentials as `required: true` with placeholder `https://api.baselinker.com/connector.php`.
  - Added fallback expression `={{$credentials.apiUrl || "https://api.baselinker.com/connector.php"}}` in credential test requests.
  - Added automated unit test suite [`test/Credentials.test.ts`](test/Credentials.test.ts) (5 tests) verifying custom endpoint dispatching, whitespace trimming, and default fallback.
- **Developer & Test Tooling**:
  - Added [`test/tsconfig.json`](test/tsconfig.json) (`noEmit: true`) providing full TypeScript IDE language server support across all test files while ensuring production builds in `dist/` remain clean.

### Changed
- **Compiler Modernization**:
  - Upgraded `typescript` from `^5.4.0` to `^5.9.3`.
  - Enabled `"cpu-features@0.0.10": true` in `allowScripts` to support native acceleration in `ssh2@1.15.0`.
- **URL Sanitization**:
  - Applied `.trim()` sanitization to `credentials.apiUrl` in [`nodes/BaseLinker/GenericFunctions.ts`](nodes/BaseLinker/GenericFunctions.ts) to handle accidental leading/trailing whitespace.

### Fixed
- **Test Compatibility**:
  - Replaced CommonJS `require` with standard TypeScript ES module imports in [`test/setup.ts`](test/setup.ts), eliminating IDE `Cannot find name 'require'` diagnostics.
  - Patched `z.string().ip()` delegation to `.ipv4()` / `.ipv6()` for n8n-workflow schema validators across Zod versions.

---

## [0.1.0] - 2026-10-26

### Added
- **Initial Release of BaseLinker n8n Community Node (`n8n-nodes-baselinker-api`)**:
  - **100% Complete BaseLinker API Coverage**: 205 operations implemented across all 7 official API groups:
    - **Orders & Order Products**: Order creation (`addOrder`, `addOrderBySplit`, `addOrderDuplicate`), mutations (`setOrderFields`, `setOrdersMerge`, `deleteOrders`), line item management (`addOrderProduct`, `setOrderProductFields`, `deleteOrderProduct`), payments (`setOrderPayment`, `getOrderPaymentsHistory`), order pick lists, and PickPack collection carts.
    - **Order Statuses & Groups**: Status taxonomy queries (`getOrderStatusList`, `getOrderStatusGroups`), batch transitions (`setOrderStatus`, `setOrderStatuses`), and status CRUD (`addOrderStatus`, `addOrderStatusGroup`, `deleteOrderStatus`, `deleteOrderStatusGroup`).
    - **Order Returns**: Return lifecycle management (`getOrderReturns`, `addOrderReturn`, `setOrderReturnFields`), return items, return statuses/groups, refunds, and return event logs.
    - **Courier Shipments**: Label generation (`getLabel`), manifests (`getProtocol`, `getCourierDocument`), parcel bookings (`createPackage`, `createPackageManual`), package tracking history (`getCourierPackagesStatusHistory`), pickup dispatching (`runRequestParcelPickup`), and pricing quotations (`getPricePackage`).
    - **Product Catalog (WMS)**: Inventory catalogs (`getInventories`, `getInventoryWarehouses`), product data & stock (`getInventoryProductsList`, `getInventoryProductsData`, `getInventoryProductsStock`, `getInventoryProductsPrices`), bulk mutations (`updateInventoryProductsStock`, `updateInventoryProductsPrices`), taxonomy (categories, manufacturers, tags, price groups), warehouse zones/racks, and inventory documents.
    - **Clients (CRM)**: Customer profiles (`getCrmClients`, `getCrmClientData`, `addCrmClient`, `deleteCrmClient`), custom CRM extra fields, and CRM status groups.
    - **Base Connect & External Storages**: Marketplace integration sync logs, text field overrides, shipping templates, and external warehouse synchronization.
  - **Dedicated Polling Trigger Node (`BaseLinkerTrigger`)**:
    - Automatic polling powered by BaseLinker's 3-day event journal (`getJournalList`).
    - Monotonic state tracking via `lastLogId` in workflow static data.
    - Target status transition filtering (`log_type: 18`).
    - Automatic order profile hydration (`resolveOrderDetails: true`).
    - Non-destructive canvas test executions.
  - **Dual Parameter Input Modes**:
    - **Form Fields (UI)**: Typed form controls, dynamic dropdown pickers via `loadOptions`, and structured sub-builders for products, packages, and custom fields.
    - **Raw Parameters (JSON)**: Direct JSON payload input supporting dynamic n8n expressions.
  - **Automated Multi-Batch Cursor Pagination**:
    - `returnAll: true` option with automatic cursor advancement (`id_from`, `date_confirmed_from`, `date_from`).
    - Configurable rate-limit pacing delay (`delayMs: 650` ms) guaranteeing compliance with BaseLinker's 100 req/min threshold.
  - **Automated CI/CD Workflows**:
    - GitHub Actions pipeline (`.github/workflows/ci.yml` and `.github/workflows/publish.yml`) for linting, testing, building, and publishing to npmjs with SLSA / npm Provenance attestations.
    - Comprehensive unit test suite covering all resources and workflows (293 tests passing).
