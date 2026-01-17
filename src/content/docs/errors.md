---
title: Errors
description: Understand error responses and how to fix them.
---

## Summary

This API uses standard HTTP status codes. Error responses may include a JSON body with details.

## Common status codes

- **400 Bad Request**: Your request is invalid or missing required fields.
- **401 Unauthorized**: Missing or invalid token.
- **403 Forbidden**: Token is valid but lacks permission.
- **404 Not Found**: Resource or endpoint does not exist.
- **409 Conflict**: Request conflicts with current state.
- **429 Too Many Requests**: You hit a rate limit.
- **5xx Server Error**: Problem on the server side.

## Troubleshooting checklist

1. Confirm the endpoint path and HTTP method.
2. Confirm the `Authorization` header is present and correct.
3. Validate JSON format and required fields.
4. Check rate limits and retry after a delay if you get 429.
