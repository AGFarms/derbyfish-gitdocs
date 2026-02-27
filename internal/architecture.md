# Architecture

## System Overview

DerbyFish runs on a Hetzner VPS with Docker containers for each service. Nginx handles routing from public domains to internal ports.

## Services

| Service | Port | Purpose |
|---------|------|---------|
| derbyfish-web | 3003 | Main Next.js app (derby.fish) |
| derbyfish-captain-web | TBD | Captain dashboard (captain.derby.fish) |
| derbyfish-helm | 3085 | Legacy captain dashboard (helm.derby.fish) |
| derbyfish-flow-api | 5000 | Flow blockchain API |
| derbyfish-flow-sync | - | Flow wallet sync worker |
| derbyfish-ai | 3123 | WebSocket AI API (species ID, verification) |
| derbyfish-builder | 8080 (internal) | Claude Code job dispatcher |
| derbyfish-opsbot | 9090 (internal) | Linear to builder pipeline |
| gtm-dashboard | 3100 | GTM mission control (gtm.derby.fish) |
| n8n | 5678 | Automation workflows |

## Docker Networks

- **builder-network** (bridge): builder + opsbot communication
- Builder is NOT exposed to the host. Access via opsbot container.

## Public Domains

| Domain | Service |
|--------|---------|
| derby.fish | derbyfish-web |
| captain.derby.fish | derbyfish-captain-web |
| helm.derby.fish | derbyfish-helm (restricted) |
| gtm.derby.fish | GTM dashboard |
| hooks.derby.fish | n8n webhooks |

## Tech Stack

- **Frontend:** Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Database:** Supabase (PostgreSQL + Auth + Storage)
- **Blockchain:** Flow (Cadence smart contracts, BAIT token)
- **AI/ML:** Species identification, catch verification
- **CI/CD:** GitHub Actions, opsbot automated PRs

## Builder Pipeline

1. Linear ticket gets `ops:auto` label
2. Opsbot polls Linear every 60 seconds
3. GPT-4.1-mini decomposes ticket into subtasks (max 200 lines each)
4. Each subtask dispatched to builder as a job
5. Builder clones repo, creates branch, runs Claude Code, pushes
6. Opsbot opens a draft PR via GitHub API
7. Status posted to Linear + Slack

## GitHub Repos

| Repo | Purpose |
|------|---------|
| AGFarms/derbyfish-web | Main website and API |
| AGFarms/derbyfish-captain-web | Captain dashboard |
| AGFarms/derbyfish-native | React Native mobile app |
| AGFarms/derbyfish-helm | Legacy captain dashboard |
| AGFarms/derbyfish-flow | Flow blockchain integration |
| AGFarms/derbyfish-ai | AI/ML services |
| AGFarms/derbyfish-gtm | GTM agent and playbooks |
| AGFarms/derbyfish-gitdocs | This documentation repo |
