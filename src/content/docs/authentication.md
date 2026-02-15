---
title: Authentication
description: Secure the perimeter of your Kyanite mesh.
---

At **Kyanite**, security is the crystalline lattice that holds the infrastructure together. We enforce strict structural integrity: all signals must be transmitted over **HTTPS** and carry a valid Kyanite Key.

### The Bedrock Security Philosophy
To protect your data and the stability of the mesh, we enforce the following:
* **Key Rotation:** We recommend rotating your keys every 90 days to prevent erosion of security.
* **Least Privilege:** Keys should only have access to the specific **Strata** (event streams) they require.
* **Encrypted Conduction:** Signals sent over plain HTTP lack the necessary structure and will be automatically rejected by the Ingress Stratum.

> [!CAUTION]
> **Keep your keys in the dark.** Never commit Kyanite Keys to version control or expose them in client-side code (like browser-based JavaScript).

---

### Authentication Method: Bearer Tokens

Kyanite uses standard **Bearer Token** authentication to validate the integrity of the signal. You must include your Kyanite Key in the `Authorization` header of every request.

#### 1. Obtain your Kyanite Key
You can generate and manage your keys via the **[Kyanite Dashboard](#)**.
* *Note: In the dashboard, look for the **Burnt Orange** "Generate Key" button (Light Mode) or the **Dark Teal** "Pulse" icon (Dark Mode).*

#### 2. Authenticate the Signal
Include the key in your header using the standard format:
`Authorization: Bearer YOUR_KYANITE_KEY`

#### Example Request
Here is how to structure a secure request using `cURL`:

```bash
curl -X POST [https://api.kyanite.io/v1/conduit](https://api.kyanite.io/v1/conduit) \
  -H "Authorization: Bearer ky_live_a1b2c3d4e5f6" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "user.signup",
    "payload": { "id": "usr_88" }
  }'