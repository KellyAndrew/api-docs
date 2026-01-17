---
title: Authentication
description: How to authenticate requests.
---

## Summary

This API uses bearer tokens.

## Get a token

Get an API token from the developer dashboard.

## Send the token

If you get 401 Unauthorized, verify the token is valid and that you sent it in the Authorization header.

```bash
curl -H "Authorization: Bearer <token>" https://example.com
```
