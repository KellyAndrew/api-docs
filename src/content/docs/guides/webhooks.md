---
title: Webhooks
description: Receive advisory state changes and verify HMAC-SHA256 webhook signatures.
---

## Summary

EmbargoGate API sends a webhook whenever an advisory changes state. Each delivery is signed with HMAC-SHA256 using the secret issued when you registered the webhook. Verify every signature before acting on a delivery.

## Signature header

```
EmbargoGate-Signature: t=1792252800,v1=5f8c2a...e91b
```

| Part | Meaning |
| :--- | :--- |
| `t` | Unix timestamp of when the delivery was signed |
| `v1` | Hex-encoded HMAC-SHA256 signature |

## Verification rules

1. Extract `t` and `v1` from the `EmbargoGate-Signature` header.
2. Build the signed string: the value of `t`, a period (`.`), then the raw request body.
3. Compute HMAC-SHA256 of the signed string using your webhook secret.
4. Compare the result with `v1` using a constant-time comparison.
5. Reject the delivery if `t` is more than five minutes from your current time. This blocks replay attacks.

Compute the signature over the raw body bytes, before any JSON parsing. Re-serialized JSON may not match byte for byte.

## Example payload

```json
{
  "event": "advisory.state_changed",
  "advisory_id": "EG-2026-0042",
  "from": "VERIFIED",
  "to": "EMBARGOED",
  "embargo_ends": "2026-11-03T09:00:00Z"
}
```

Webhook payloads contain identifiers and state only. Fetch embargoed details from `GET /advisories/{advisory_id}`, where ABAC applies.

## Related pages

- [Endpoints](../../reference/endpoints/)
- [Security considerations](../../concepts/security-considerations/)
