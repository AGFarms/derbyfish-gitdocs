# API Reference

DerbyFish exposes REST APIs through two services:

- **derbyfish-web** — Main application API (Next.js API routes)
- **derbyfish-flow** — Flow blockchain integration API (Python Flask)

## Authentication

All API requests require a valid Supabase JWT token in the `Authorization` header:

```
Authorization: Bearer <supabase_jwt_token>
```

Tokens are obtained through Supabase Auth (email/password or OAuth).

## Base URLs

| Service | URL |
|---------|-----|
| Main API | https://derby.fish/api |
| Flow API | https://flow.derby.fish |

## Main API Endpoints

### Derbies

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/derbies | List derbies (with filters) |
| GET | /api/derbies/[id] | Get derby details |
| POST | /api/derbies | Create a derby (captain only) |
| PATCH | /api/derbies/[id] | Update derby settings |

### Submissions

| Method | Path | Description |
|--------|------|-------------|
| POST | /api/submissions | Submit a catch (BHRV data) |
| GET | /api/submissions/[id] | Get submission details |

### Rankboards

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/rankboards/[derby_id] | Get derby leaderboard |

### Profiles

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/profiles/me | Get current user profile |
| PATCH | /api/profiles/me | Update profile |

### Shops

| Method | Path | Description |
|--------|------|-------------|
| GET | /api/shops | List shops |
| POST | /api/shops | Register a shop (captain only) |

## Flow API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| POST | /verify | Submit BHRV verification to blockchain |
| GET | /verify/[tx_id] | Check verification status |
| GET | /wallet/[address] | Get BAIT balance |
| POST | /wallet/transfer | Transfer BAIT |

## Rate Limits

- 100 requests per minute per authenticated user
- 20 requests per minute for unauthenticated requests

## Error Responses

All errors follow the format:

```json
{
  "error": "Error message",
  "code": "ERROR_CODE"
}
```

Common error codes: `UNAUTHORIZED`, `NOT_FOUND`, `VALIDATION_ERROR`, `RATE_LIMITED`
