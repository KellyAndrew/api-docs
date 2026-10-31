---
title: Authentication
description: Mutual TLS, OAuth 2.0, and time-bound ABAC in EmbargoGate API.
---

## Summary

EmbargoGate API uses three layers of access control:

1. **Mutual TLS (mTLS)** proves which client is connecting.
2. **OAuth 2.0 scopes** define which operations that client may perform.
3. **Time-bound attribute-based access control (ABAC)** decides whether the client may see a specific embargoed advisory at this moment.

## Mutual TLS

Every connection must present a client certificate issued to a registered organization. Connections without a valid certificate are refused before any request is processed.

## OAuth 2.0

Clients obtain access tokens using the client credentials grant. Tokens are certificate-bound (RFC 8705): a token is only accepted on a connection that presents the same client certificate it was issued to. A stolen token is useless on its own.

Request only the scopes you need. See the [scope registry](../reference/endpoints/#scope-registry).

## Time-bound ABAC

While an advisory is `EMBARGOED`, scopes alone are not enough. Access is granted only when all of these attributes match:

| Attribute | Rule |
| :--- | :--- |
| Organization | The client's organization belongs to the advisory's coordination group. |
| Time | The current time is before the end of the grace period (embargo end date + 14 days). |
| State | The advisory is in the `EMBARGOED` state. |

Coordination-group access expires automatically on disclosure. This can happen before the end of the embargo if a fix is ready early. Otherwise, access remains valid up to the end of the grace period. Once the advisory is `DISCLOSED`, it is public. See [Embargo timeline](../concepts/core-concepts/#embargo-timeline).

## Related pages

- [Security considerations](../concepts/security-considerations/)
- [Errors](../errors/)
