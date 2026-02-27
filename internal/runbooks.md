# Runbooks

## Rebuilding Opsbot

After changes to `server.js` or `policy.yml`:

```bash
cd /home/giany/derbyfish-opsbot
docker compose build --no-cache
docker compose up -d --force-recreate
docker logs derbyfish-opsbot --tail=10
```

## Checking Builder Health

```bash
docker exec derbyfish-opsbot curl -s http://derbyfish-builder:8080/health \
  -H "Authorization: Bearer <BUILDER_TOKEN>"
```

Returns: claudeAuth status, active jobs, mirrored repos, recent jobs.

## Checking Opsbot Logs

```bash
docker logs derbyfish-opsbot --tail=50
```

## Creating a Linear Ticket for Builder

Include `repo: AGFarms/<repo-name>` at the top of the ticket description. Add the `ops:auto` label for automatic processing.

## Database Migrations

1. Write migration SQL in the appropriate upgrade step folder
2. Create a Linear ticket with `ops:db` label
3. Wait for Giany to review and run in Supabase SQL editor
4. Never run migrations directly without approval

## Deploying derbyfish-web

Changes merged to `main` in AGFarms/derbyfish-web trigger automatic deployment.

## Rotating GitHub App Token

The builder container refreshes its GitHub App installation token every 3000 seconds automatically via the entrypoint script.

## Monitoring Crons

| Schedule | Task |
|----------|------|
| 4:30 AM | Memory backup (git commit GTM repo) |
| Every 30min | Watchdog health check |
| 6:00 AM | Scout lead scrape |
| 8:00 AM | Daily GTM digest |
