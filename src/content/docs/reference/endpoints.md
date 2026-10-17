---
title: Endpoints
description: Endpoint contract and OAuth 2.0 scope registry for EmbargoGate API.
---

## Summary

All endpoints require mutual TLS (mTLS) and an OAuth 2.0 access token bound to the client certificate. See [Authentication](../../authentication/).

Base URL: `https://api.embargogate.example/v1`

## Scope registry

| Method | Route | Purpose | Required scope |
| :--- | :--- | :--- | :--- |
| `POST` | `/sboms` | Ingest a signed SBOM (CycloneDX or SPDX JSON) | `sbom:write` |
| `GET` | `/sboms/{sbom_id}` | Retrieve SBOM metadata and SHA-256 digest | `sbom:read` |
| `POST` | `/advisories` | Submit an OpenVEX advisory (state: `SUBMITTED`) | `advisory:write` |
| `GET` | `/advisories/{advisory_id}` | Retrieve an advisory (ABAC applies while `EMBARGOED`) | `advisory:read` |
| `POST` | `/advisories/{advisory_id}/transitions` | Move an advisory to its next state | `advisory:verify`, `advisory:embargo`, or `advisory:disclose` |
| `POST` | `/webhooks` | Register an HMAC-signed webhook endpoint | `webhook:manage` |
| `DELETE` | `/webhooks/{webhook_id}` | Remove a webhook endpoint | `webhook:manage` |

The transition scope depends on the target state. See [Core concepts](../../concepts/core-concepts/#transition-rules).

## Sample OpenVEX submission

`POST /advisories`

```json
{
  "@context": "https://openvex.dev/ns/v0.2.0",
  "@id": "https://embargogate.example/vex/2026-0042",
  "author": "security@vendor.example",
  "timestamp": "2026-10-17T09:00:00Z",
  "version": 1,
  "statements": [
    {
      "vulnerability": { "name": "CVE-2026-12345" },
      "products": [
        { "@id": "pkg:npm/example-parser@4.2.1" }
      ],
      "status": "affected",
      "action_statement": "Upgrade to example-parser 4.2.2 when the embargo ends."
    }
  ]
}
```

A successful submission returns `201 Created` with the advisory ID and its initial state, `SUBMITTED`.

## Related pages

- [Errors](../../errors/)
- [Webhooks](../../guides/webhooks/)
