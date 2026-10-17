---
title: Security considerations
description: STRIDE threat model for the EmbargoGate API intake and disclosure pipeline.
---

## Summary

This page applies the STRIDE threat model to EmbargoGate API. The asset that matters most is embargoed vulnerability information. If it leaks before patch day, attackers can exploit the vulnerability before users can fix it.

The model covers three surfaces:

- **Intake:** SBOM and OpenVEX advisory submission
- **Lifecycle:** state transitions from `SUBMITTED` to `DISCLOSED` or `REJECTED`
- **Delivery:** webhook notifications to downstream consumers

## STRIDE threat matrix

| Threat | Intake scenario | Mitigation |
| :--- | :--- | :--- |
| **Spoofing** | An attacker submits an SBOM or advisory while posing as a trusted vendor. | Mutual TLS (mTLS) client authentication, plus Sigstore Cosign keyless signatures bound to the submitter's OIDC identity. |
| **Tampering** | An SBOM is altered in transit or at rest to hide an affected component. | SHA-256 digest recorded at intake and re-verified before every state transition; Cosign signature verification against the Rekor transparency log. |
| **Repudiation** | A participant denies approving a transition, such as an early disclosure. | Append-only audit log recording actor identity, OAuth 2.0 client, timestamp, and before/after state for every transition. |
| **Information disclosure** | Embargoed advisory details reach a party outside the coordination group. | Time-bound attribute-based access control (ABAC): access requires membership in the advisory's coordination group, and expires when the embargo window ends. |
| **Denial of service** | Oversized or deeply nested SBOM files exhaust parser resources and delay triage. | Parser sandboxing with memory and CPU limits, payload size caps, and per-client rate limits. |
| **Elevation of privilege** | A reporter moves their own advisory directly to `DISCLOSED`. | Scope-checked transitions: each transition requires a specific OAuth 2.0 scope, and only transitions defined in the state machine are accepted. |

## Related pages

- [Core concepts](../core-concepts/)
- [Authentication](../../authentication/)
- [Errors](../../errors/)
