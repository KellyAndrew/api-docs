---
title: FAQ & Edge cases
description: Common questions and edge cases in the EmbargoGate API advisory lifecycle.
---

## Can a rejected advisory be reopened?

No. `REJECTED` is a final state. If you have new evidence, submit a new advisory and reference the rejected advisory ID in your submission.

## Can an advisory be disclosed before the embargo ends?

Yes, but only by a coordinator with the `advisory:disclose` scope, and only with a recorded early-disclosure reason. A typical reason is active exploitation in the wild. The reason is kept in the audit log. See [Core concepts](../../concepts/core-concepts/#transition-rules).

## Why do I get 404 for an advisory I know exists?

While an advisory is `EMBARGOED`, the API returns `404` to callers outside the coordination group. A `403` would confirm that the advisory exists, which is itself a leak. See [Authentication](../../authentication/#time-bound-abac).

## My access to an embargoed advisory stopped working. Why?

Coordination-group access is time-bound and expires when the embargo window ends. Once the advisory is `DISCLOSED`, it is public and can be read without coordination-group membership.

## Why does my webhook contain no advisory details?

Webhook payloads contain identifiers and state only, so embargoed details are never pushed to an endpoint outside access control. Fetch the details with `GET /advisories/{advisory_id}`. See [Webhooks](../../guides/webhooks/).

## My webhook signature never matches. What's wrong?

The most common cause is computing the signature over parsed and re-serialized JSON. Use the raw request body bytes. Also check that your server clock is accurate: deliveries more than five minutes old are rejected.

## Can I submit an advisory without a signed SBOM?

You can submit the advisory, but it cannot move from `SUBMITTED` to `VERIFIED` until the related SBOM's signature and SHA-256 digest are valid.
