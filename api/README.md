# API Reference

DerbyFish provides a REST API for integrating with the platform.

## Authentication

All API requests require a valid access token in the `Authorization` header:

```
Authorization: Bearer <access_token>
```

Tokens are obtained through the DerbyFish authentication flow.

## Base URL

```
https://derby.fish/api
```

## Endpoints

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
