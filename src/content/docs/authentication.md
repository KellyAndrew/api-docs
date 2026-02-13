---
title: Authentication
description: Learn how to securely authenticate your requests to the EventFlow API.
---

At EventFlow, security isn't an afterthought—it's the core of our architecture. All API requests must be made over **HTTPS** and include a valid API Key. 

### The Security First Philosophy
To protect your data and our infrastructure, we enforce the following:
* **Rotation:** We recommend rotating API keys every 90 days.
* **Least Privilege:** Keys should only have access to the specific event streams they require.
* **Encrypted Transit:** Requests made over plain HTTP will be automatically rejected.

> [!CAUTION]
> **Keep your keys secret.** Never commit API keys to version control or expose them in client-side code (like browser-based JavaScript).

---

### Authentication Method: Bearer Tokens

EventFlow uses standard **Bearer Token** authentication. You must include your API key in the `Authorization` header of every request.



#### 1. Obtain your API Key
You can generate and manage your keys via the [EventFlow Dashboard](#). 

#### 2. Authorize your Request
Include the key in your header using the following format:
`Authorization: Bearer YOUR_API_KEY`

#### Example Request
Here is how to structure a secure request using `cURL`:

```bash
curl -X POST [https://api.eventflow.io/v1/events](https://api.eventflow.io/v1/events) \
  -H "Authorization: Bearer ef_live_xxxxxxxxxxxx" \
  -H "Content-Type: application/json" \
  -d '{
    "event": "user.signup",
    "payload": { "id": "user_42" }
  }'
```
