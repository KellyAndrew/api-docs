---
title: Quickstart
description: Get an access token and submit your first OpenVEX advisory to EmbargoGate API.
---

## Summary

This guide takes you from client certificate to a submitted advisory in three requests.

## Before you begin

You need:

- a client certificate and private key issued to your organization (`client.crt`, `client.key`)
- an OAuth 2.0 client ID and secret
- the `advisory:write` and `advisory:read` scopes

Every request uses mutual TLS. See [Authentication](../authentication/).

## 1. Get an access token

Request a token with the client credentials grant. The token is bound to the certificate you connect with.

```bash
curl --cert client.crt --key client.key \
  -X POST https://auth.embargogate.example/oauth2/token \
  --data-urlencode "grant_type=client_credentials" \
  --data-urlencode "client_id=<CLIENT_ID>" \
  --data-urlencode "client_secret=<CLIENT_SECRET>" \
  --data-urlencode "scope=advisory:write advisory:read"
```

The response contains an `access_token`. Use it in the next steps.

## 2. Submit an advisory

Send an OpenVEX document to `POST /advisories`.

```bash
curl --cert client.crt --key client.key \
  -X POST https://api.embargogate.example/v1/advisories \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -H "Content-Type: application/json" \
  -d @advisory.json
```

For the contents of `advisory.json`, see the [sample OpenVEX submission](../reference/endpoints/#sample-openvex-submission).

A successful request returns `201 Created` with the advisory ID. The advisory starts in the `SUBMITTED` state.

## 3. Check the advisory

```bash
curl --cert client.crt --key client.key \
  "https://api.embargogate.example/v1/advisories/<ADVISORY_ID>" \
  -H "Authorization: Bearer <ACCESS_TOKEN>"
```

The response shows the current state. The triage team moves it to `VERIFIED` or `REJECTED`. To be notified when that happens instead of polling, register a [webhook](../guides/webhooks/).

## Next steps

- [Core concepts](../concepts/core-concepts/): how an advisory moves through its lifecycle
- [Errors](../errors/): what to do when a request fails
