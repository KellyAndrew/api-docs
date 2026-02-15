---
title: Errors
description: HTTP status codes and error responses.
---

## Summary

KyaniteAPI uses standard HTTP status codes to indicate whether a request succeeded. For error responses, the API returns a response body that describes what went wrong and how to fix it.

## Common status codes

| Code | Status | Meaning |
| :--- | :--- | :--- |
| **400** | Bad Request | The request is malformed or missing required fields. |
| **401** | Unauthorized | The request is missing valid authentication credentials. |
| **403** | Forbidden | The credentials are valid, but do not have permission to access the resource. |
| **404** | Not Found | The requested endpoint or resource does not exist. |
| **409** | Conflict | The request conflicts with the current state of the resource (for example, a duplicate or version mismatch). |
| **429** | Too Many Requests | The request was rate limited. Retry after the specified delay. |
| **5xx** | Server Error | An internal error occurred. Retry the request. If the problem persists, contact support. |

## Troubleshooting checklist

1. **Verify the endpoint:** Confirm the URL and HTTP method match the documentation.
2. **Check authentication:** Ensure the `Authorization` header is present and formatted as `Bearer <API_KEY>`.
3. **Validate the payload:** Ensure the JSON is valid and matches the required schema.
4. **Handle rate limits:** For `429` responses, respect the `Retry-After` header (if present) and use exponential backoff.
