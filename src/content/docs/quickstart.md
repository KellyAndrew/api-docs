---
title: Quickstart
description: Make your first request to KyaniteAPI.
---

## Summary

Send a test request to verify your API key and connectivity.

## Goal

Call the health check endpoint and receive a successful response.

## Make a test request

To verify your integration, send a `GET` request to the health check endpoint. This confirms that your API key is valid and that you can reach the KyaniteAPI service.

```bash
curl -H "Authorization: Bearer ky_live_YOUR_KEY" \
  https://api.kyanite.io/v1/pulse
