# Self-Hosted Docker Installation Guide (Bind Mount Pattern)

If you are running a self-hosted instance of n8n in Docker and wish to install or develop **n8n-nodes-baselinker-api** without building or maintaining a custom Docker image, you can use the **host bind mount pattern**.

---

## Prerequisites

- Docker and Docker Compose installed on your host system.
- Node.js (v18+) and npm installed on your host system to build the initial TypeScript files.

---

## Step 1: Clone and Build the Repository on Host

Clone the repository to a persistent path on your host machine and compile the TypeScript source into the `dist/` directory:

```bash
git clone https://github.com/ernestkrol/n8n-nodes-baselinker-api.git
cd n8n-nodes-baselinker-api
npm install
npm run build
```

Verify that the `dist/` folder was generated and contains `dist/nodes/BaseLinker/BaseLinker.node.js` and `dist/credentials/BaseLinkerApi.credentials.js`.

---

## Step 2: Configure Docker Compose Bind Mount

Mount the repository directory into your n8n container alongside your persistent `.n8n` data volume.

Edit your `docker-compose.yml`:

```yaml
version: '3.8'

services:
  n8n:
    image: docker.n8n.io/n8nio/n8n:latest
    container_name: n8n
    restart: always
    ports:
      - "5678:5678"
    environment:
      - N8N_COMMUNITY_PACKAGES_ENABLED=true
      - GENERIC_TIMEZONE=Europe/Warsaw
      - TZ=Europe/Warsaw
    volumes:
      - /path/on/host/n8n_data:/home/node/.n8n
      # Bind mount the compiled node repository as read-only:
      - /path/on/host/n8n-nodes-baselinker-api:/home/node/n8n-nodes-baselinker-api:ro
```

*(If running with standard `docker run`, add `-v /path/on/host/n8n-nodes-baselinker-api:/home/node/n8n-nodes-baselinker-api:ro`)*.

---

## Step 3: Install the Node Inside n8n

Launch the container and install the mounted package inside n8n's data directory:

### Option A: Via `docker exec` (Inside Container)
```bash
docker exec -u node -it n8n sh -c "cd /home/node/.n8n && npm install /home/node/n8n-nodes-baselinker-api"
```

### Option B: Directly from Host (If n8n_data is Mounted Locally)
If `/home/node/.n8n` is mapped directly to a local directory `/path/on/host/n8n_data` on your host:
```bash
cd /path/on/host/n8n_data
npm install /path/on/host/n8n-nodes-baselinker-api
```

---

## Step 4: Restart the n8n Container

Restart the container to trigger n8n's extension scanner:

```bash
docker restart n8n
```

Upon restart, n8n scans `/home/node/.n8n/node_modules/` and automatically registers:
1. **BaseLinker** node (with all 5 supported resources: Orders, Order Returns, Courier Shipments, Clients CRM, Product Catalog).
2. **BaseLinker Trigger** node (event journal listener).
3. **BaseLinker API** credential type.

---

## Updating the Node

When new versions or features are pulled from Git:
```bash
cd /path/on/host/n8n-nodes-baselinker-api
git pull
npm run build
docker restart n8n
```
Because the host directory is bind-mounted, changes in `dist/` are instantly visible to the container upon restart without re-running `npm install`.
