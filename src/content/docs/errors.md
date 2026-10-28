---
title: Errors
description: RFC 7807 problem details and error examples for EmbargoGate API.
---

## Summary

EmbargoGate API returns errors as problem details with the `application/problem+json` media type. The format is defined in RFC 7807, which RFC 9457 has since replaced; both describe the same fields.

| Field | Meaning |
| :--- | :--- |
| `type` | URI identifying the error type |
| `title` | Short, human-readable summary |
| `status` | HTTP status code |
| `detail` | Explanation specific to this occurrence |
| `instance` | URI of the request or resource that caused the error |

## Examples

### 422: Sigstore signature verification failed

The SBOM signature does not match the submitter's OIDC identity.

```json
{
  "type": "https://docs.andrewkelly.de/errors/signature-invalid",
  "title": "Signature verification failed",
  "status": 422,
  "detail": "Cosign signature on the submitted SBOM does not match identity 'ci@vendor.example'.",
  "instance": "/v1/sboms",
  "sha256": "9f2c7e1a4b..."
}
```

### 422: Invalid state transition

The requested transition is not defined in the [advisory state machine](../concepts/core-concepts/).

```json
{
  "type": "https://docs.andrewkelly.de/errors/invalid-transition",
  "title": "Invalid state transition",
  "status": 422,
  "detail": "Advisory EG-2026-0042 cannot move from SUBMITTED to DISCLOSED.",
  "instance": "/v1/advisories/EG-2026-0042/transitions",
  "current_state": "SUBMITTED",
  "allowed_states": ["VERIFIED", "REJECTED"]
}
```

### 403: Missing scope

The client certificate is valid, but the access token lacks the required scope.

```json
{
  "type": "https://docs.andrewkelly.de/errors/insufficient-scope",
  "title": "Insufficient scope",
  "status": 403,
  "detail": "This operation requires scope 'advisory:disclose'.",
  "instance": "/v1/advisories/EG-2026-0042/transitions",
  "required_scope": "advisory:disclose"
}
```

## Status codes

 If your client certificate is missing or invalid, the connection fails. No HTTP response is returned. The TLS handshake fails, and your client shows a TLS or SSL error.

| Code | Meaning |
| :--- | :--- |
| **400** | The request is malformed. |
| **401** | The access token is missing, invalid, or not bound to the client certificate on this connection. |
| **403** | The token lacks the required scope. |
| **404** | The resource does not exist, or it is an embargoed advisory outside the caller's coordination group. |
| **413** | The payload exceeds the size limit. |
| **422** | The payload is well-formed but fails signature, schema, or state-transition checks. |
| **429** | The client exceeded its rate limit. Respect the `Retry-After` header. |
