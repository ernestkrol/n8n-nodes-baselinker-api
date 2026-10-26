# BaseLinker n8n Node: Extended Documentation

Welcome to the extended documentation directory for **n8n-nodes-baselinker-api**.

Here you will find exhaustive guides, complete API method signatures, architecture deep-dives, workflow recipes, and container installation guides.

---

## Documentation Index

| Guide | Description |
|---|---|
| **[API Reference](api-reference.md)** | Comprehensive method-by-method parameter descriptions, input modes (UI fields vs raw JSON), and return values for all implemented resources (Orders, Order Returns, Courier Shipments, Clients CRM, Product Catalog). |
| **[Coverage Matrix](coverage-matrix.md)** | Full checklist of all 205 official BaseLinker API methods across 7 API groups with direct links to official documentation. |
| **[Trigger Node Guide](trigger-guide.md)** | Deep-dive into `BaseLinkerTrigger`, zero-configuration journal polling (`getJournalList`), rolling 3-day buffer, monotonic cursor, target status filtering, and automatic order hydration. |
| **[Pagination & Rate Limiting Strategy](pagination-and-rate-limiting.md)** | Detailed breakdown of cursor-based pagination (`id_from`, `date_confirmed_from`, `date_from`), page-based pagination, rate-limit pacing (`delayMs`), and infinite loop guards. |
| **[Workflow Recipes & Examples](workflows.md)** | Practical, real-world workflow patterns (hourly order sync to ERP, shipping label emailer with binary attachments, CRM sync, return/refund automation, catalog stock/price update feeds). |
| **[Self-Hosted Docker Installation Guide](docker-installation.md)** | Complete guide for mounting the node into self-hosted Docker n8n instances using host bind mounts without custom Docker image builds. |
| **[Development Roadmap](roadmap.md)** | Phased milestones tracking completed features and upcoming capabilities (Base Connect, External Storages). |
