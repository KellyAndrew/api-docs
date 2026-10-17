---
title: Core concepts
description: The advisory state machine and its EU CRA and NIST SP 800-161 compliance context.
---

## Summary

EmbargoGate API manages each vulnerability advisory as a record that moves through a strict state machine. The state machine controls who can see an advisory and when it can be published.

## Compliance context

### EU Cyber Resilience Act (CRA)

The CRA requires manufacturers of products with digital elements to handle vulnerabilities throughout the product lifecycle and to report actively exploited vulnerabilities to the relevant CSIRT and ENISA. EmbargoGate API models that obligation as a pipeline: intake, verification, a controlled embargo period, and publication.

### NIST SP 800-161

NIST SP 800-161 covers cybersecurity supply chain risk management. EmbargoGate API applies it by ingesting SBOMs, so that a verified vulnerability can be traced to every product that contains the affected component.

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
| `EMBARGOED` | A fix is in progress. Details are shared only with the coordination group until the embargo ends. | Coordination group (time-bound) |
| `DISCLOSED` | The advisory and OpenVEX statements are published. | Public |
| `REJECTED` | The report is invalid, out of scope, or a duplicate. | Submitter and triage team |

## Transition rules

| From | To | Required scope | Condition |
| :--- | :--- | :--- | :--- |
| `SUBMITTED` | `VERIFIED` | `advisory:verify` | Submitted SBOM digest and signature are valid. |
| `SUBMITTED` | `REJECTED` | `advisory:verify` | A rejection reason is provided. |
| `VERIFIED` | `EMBARGOED` | `advisory:embargo` | An embargo end date and coordination group are set. |
| `EMBARGOED` | `DISCLOSED` | `advisory:disclose` | The embargo end date has passed, or the coordinator records an early-disclosure reason. |

`DISCLOSED` and `REJECTED` are final states. The API rejects any transition not listed in this table with `422 Unprocessable Content`. See [Errors](../../errors/).

## Related pages

- [Security considerations](../security-considerations/)
- [Endpoints](../../reference/endpoints/)
