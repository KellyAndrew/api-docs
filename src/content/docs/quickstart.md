---
title: Quickstart
description: Establish your first connection to the Kyanite mesh.
---

## Summary

Initialize the conduit by sending a test signal to verify your credentials and network path.

## Goal

Successfully conduct a "Pulse" request and receive a confirmation from the Kyanite core.

## Establish Conduction

To verify your integration, send a `GET` request to the heartbeat endpoint. This ensures your **Crystal-Key** is valid and the path to the **Ingress Stratum** is clear.

```bash
curl -H "Authorization: Bearer ky_live_YOUR_KEY" \
     [https://api.kyanite.io/v1/pulse](https://api.kyanite.io/v1/pulse)