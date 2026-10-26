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

The German Federal Office for Information Security (BSI) technical guideline TR-03183-2 version 2.1.0 specifies accepted SBOM formats, required fields, and depth. EmbargoGate API checks that the submitted SBOMs conform to the format and field rules. The vulnerability is then confirmed and affected components are identified.

### NIST SP 800-161

The US National Institute of Standards and Technology (NIST) Special Publication SP 800-161 covers cybersecurity supply chain risk management and is guidance not law. EmbargoGate API applies it by ingesting SBOMs, so that a verified vulnerability can be traced to every product that contains the affected component.

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
| `SUBMITTED` | `VERIFIED` | `advisory:verify` | Submitted SBOM digest and signature are valid. Checks format and field-rule conformity. |
| `SUBMITTED` | `REJECTED` | `advisory:verify` | A rejection reason is provided. |
| `VERIFIED` | `EMBARGOED` | `advisory:embargo` | An embargo end date and coordination group are set. |
| `EMBARGOED` | `DISCLOSED` | `advisory:disclose` | The embargo end date has passed, or the coordinator records an early-disclosure reason. |

`DISCLOSED` and `REJECTED` are final states. The API rejects any transition not listed in this table with `422 Unprocessable Content`. See [Errors](../../errors/).

## Related pages

- [Security considerations](../security-considerations/)
- [Endpoints](../../reference/endpoints/)
