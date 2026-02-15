---
title: Errors & Interference
description: Identifying and resolving structural fractures in your signal.
---

## Summary

Kyanite uses standard HTTP status codes to communicate the state of the mesh. When a signal fails to conduct, the API returns a response body detailing the **Fracture Point** so you can restore the flow.

## Response Indicators

In the **Kyanite Dashboard**, error states are visualized using your theme’s accent colors:
* ☀️ **Light Mode:** High-priority errors pulse in **Burnt Orange** (#C2410C).
* 🌙 **Dark Mode:** System interference is highlighted against the **Dark Teal** grid.

## Common Status Codes

| Code | Status | Meaning in the Mesh |
| :--- | :--- | :--- |
| **400** | Bad Request | **Structural Flaw:** The request is malformed or missing required fields. |
| **401** | Unauthorized | **Invalid Key:** The signal lacks the necessary Crystal-Key for entry. |
| **403** | Forbidden | **Restricted Stratum:** Your key lacks permission for this specific conduit. |
| **404** | Not Found | **Void Path:** The requested endpoint or resource does not exist. |
| **409** | Conflict | **State Collision:** The request conflicts with the current bedrock data. |
| **429** | Too Many Requests | **Saturation:** The conduit is at capacity. Implement exponential backoff. |
| **5xx** | Server Error | **Core Disturbance:** An internal issue occurred within the Kyanite core. |

## Troubleshooting Checklist

1. **Verify the Path:** Ensure the endpoint and method align with the Kyanite documentation.
2. **Check Conduction:** Confirm the `Authorization` header is correctly formatted as `Bearer ky_live_...`.
3. **Inspect the Payload:** Validate that your JSON is structurally sound and matches the required schema.
4. **Monitor Pressure:** If you encounter a **429**, check your rate limits in the dashboard and retry after the specified cooldown.

---