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

## Sample advisory submission

`POST /advisories`

The request body has two fields:

| Field | Meaning |
| :--- | :--- |
| `sbom_digest` | SHA-256 digest of the SBOM file, calculated by the submitter (for example, with `sha256sum`). The server matches it against an SBOM already uploaded with `POST /sboms`. Upload the SBOM first, or the submission fails with `422`. |
| `vex` | The OpenVEX document, unchanged. OpenVEX has no field for an SBOM digest, so the digest sits next to the document instead of inside it. |

```json
{
  "sbom_digest": "sha256:50d858e0985ecc7f60418aaf0cc5ab587f42c2570a884095a9e8ccacd0f6545c",
  "vex": {
    "@context": "https://openvex.dev/ns/v0.2.0",
    "@id": "https://vendor.example/vex/2026-0042",
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
}
```

The full schema is `AdvisorySubmission` in the [OpenAPI document](/openapi.yaml).

A successful submission returns `201 Created` with the advisory ID and its initial state, `SUBMITTED`.

## Related pages

- [Errors](../../errors/)
- [Webhooks](../../guides/webhooks/)
