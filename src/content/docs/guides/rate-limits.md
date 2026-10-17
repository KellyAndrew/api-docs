---
title: Rate limits
description: Request rate limits, payload size limits, and how to handle 429 responses.
---

## Summary

EmbargoGate API limits request rates and payload sizes per client. The limits keep intake responsive, so a flood of submissions cannot delay triage of a critical report. See the denial-of-service row in [Security considerations](../../concepts/security-considerations/).

## Request limits

Limits apply per OAuth 2.0 client.

| Route | Limit |
| :--- | :--- |
| `POST /sboms` | 60 requests per hour |
| `POST /advisories` | 60 requests per hour |
| `POST /advisories/{advisory_id}/transitions` | 120 requests per hour |
| All `GET` routes | 600 requests per hour |

## Payload limits

| Payload | Limit |
| :--- | :--- |
| SBOM | 10 MB |
| OpenVEX advisory | 1 MB |

Larger payloads are rejected with `413`.

## Rate limit headers

Every response includes:

| Header | Meaning |
| :--- | :--- |
| `RateLimit-Limit` | Requests allowed in the current window |
| `RateLimit-Remaining` | Requests left in the current window |
| `RateLimit-Reset` | Seconds until the window resets |

## Handling 429 responses

When you exceed a limit, the API returns `429 Too Many Requests` with a `Retry-After` header.

1. Wait the number of seconds in `Retry-After` before retrying.
2. If you retry again, use exponential backoff with jitter.
3. Watch `RateLimit-Remaining` to slow down before you hit the limit.

## Related pages

- [Errors](../../errors/)
- [Endpoints](../../reference/endpoints/)
