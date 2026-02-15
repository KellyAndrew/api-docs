---
title: Authentication
description: Authenticate requests to KyaniteAPI.
---

KyaniteAPI requires all requests to use **HTTPS** and include a valid API key.

## Security recommendations

- **Key rotation:** Rotate API keys regularly (for example, every 90 days) and immediately after suspected exposure.
- **Least privilege:** Create separate keys per environment (development/staging/production) and scope each key to only the resources it needs.
- **Transport security:** Requests sent over HTTP are rejected. Use HTTPS for all requests.

> [!CAUTION]
> Never commit API keys to version control or expose them in client-side code (for example, browser-based JavaScript). Store keys in a secrets manager or environment variables.

## Authentication method

KyaniteAPI uses **Bearer token** authentication. Include your API key in the `Authorization` header of every request:

`Authorization: Bearer <API_KEY>`

### 1. Obtain an API key

Generate and manage API keys in the **Kyanite Dashboard**.

### 2. Send an authenticated request

Example request using `curl`:

```bash
curl -X POST https://api.kyanite.io/v1/events \
  -H "Authorization: Bearer <API_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "user.signup",
    "payload": { "id": "usr_88" }
  }'
