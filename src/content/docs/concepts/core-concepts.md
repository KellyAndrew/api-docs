---
title: Core concepts
description: The advisory state machine and its EU CRA, BSI TR-03183-2, and NIST SP 800-161 compliance context.
---

## Summary

EmbargoGate API manages each vulnerability advisory as a record that moves through a strict state machine. The state machine controls who can see an advisory and when it can be published.

## Compliance context

### EU Cyber Resilience Act (CRA)

The CRA requires manufacturers of products with digital elements to handle vulnerabilities throughout the product lifecycle and to report actively exploited vulnerabilities to the relevant Computer Security Incident Response Team (CSIRT) and the European Union Agency for Cybersecurity (ENISA). EmbargoGate API models that obligation as a pipeline: intake, verification, a controlled embargo period, and publication.

The CRA also requires manufacturers to draw up a software bill of materials (SBOM), under Annex I, Part II of the CRA. EmbargoGate API checks the SBOM for affected software components, so that the coordinator can issue advisories and the coordination group can work on a fix.

### BSI TR-03183-2

The Federal Office for Information Security (BSI) technical guideline TR-03183-2 version 2.1.0 specifies accepted SBOM formats, required fields, and depth. EmbargoGate API checks that the submitted SBOMs conform to the format and field rules. The vulnerability is then confirmed and affected components are identified.

### NIST SP 800-161

The US National Institute of Standards and Technology (NIST) Special Publication (SP) 800-161 covers cybersecurity supply chain risk management and is guidance, not law. EmbargoGate API applies it by ingesting SBOMs, so that a verified vulnerability can be traced to every product that contains the affected component.

## Advisory state machine

```
SUBMITTED ──► VERIFIED ──► EMBARGOED ──► DISCLOSED
    │
    └──► REJECTED
```

| State | Meaning | Visible to |
| :--- | :--- | :--- |
| `SUBMITTED` | A report has been received but not yet assessed. | Submitter and triage team |
| `VERIFIED` | The vulnerability is confirmed and affected components are identified. | Submitter and triage team |
| `EMBARGOED` | A fix is in progress. Details are shared only with the coordination group until the advisory is disclosed. | Coordination group (until disclosure) |
| `DISCLOSED` | The advisory and OpenVEX statements are published. | Public |
| `REJECTED` | The report is invalid, out of scope, or a duplicate. | Submitter and triage team |

## Transition rules

| From | To | Required scope | Condition |
| :--- | :--- | :--- | :--- |
| `SUBMITTED` | `VERIFIED` | `advisory:verify` | Submitted SBOM digest and signature are valid, and the SBOM conforms to BSI TR-03183-2. |
| `SUBMITTED` | `REJECTED` | `advisory:verify` | A rejection reason is provided. |
| `VERIFIED` | `EMBARGOED` | `advisory:embargo` | An embargo end date and coordination group are set. The end date is at most 90 days away. |
| `EMBARGOED` | `DISCLOSED` | `advisory:disclose` | The coordinator records a disclosure reason, or the grace period has ended. See [Embargo timeline](#embargo-timeline). |

`DISCLOSED` and `REJECTED` are final states. The API rejects any transition not listed in this table with `422 Unprocessable Content`. See [Errors](../../errors/).

## Embargo timeline

The coordinator sets the embargo end date when the advisory enters `EMBARGOED`. The end date is at most 90 days away. It can be sooner, depending on how ready the fix is, but never later.

When the embargo ends, a 14-day grace period starts automatically. It applies to every advisory and doesn't require a request. During the grace period, the advisory remains `EMBARGOED` and the coordination group keeps access.

An advisory moves to `DISCLOSED` in one of two ways:

- **Manually**, at any point, for example when a fix ships. The coordinator records the reason, and the call requires the `advisory:disclose` scope.
- **Automatically**, when the grace period ends. EmbargoGate performs the transition itself and logs it, so no scope is required.

If an advisory is disclosed without a fix, it still carries mitigations. Users can then decide how to act, for example by isolating the affected component or by discontinuing use of the product until a fix is available.

## Related pages

- [Security considerations](../security-considerations/)
- [Endpoints](../../reference/endpoints/)
