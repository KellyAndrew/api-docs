# EmbargoGate API Docs

[![Docs](https://img.shields.io/badge/docs-docs.andrewkelly.de-blue)](https://docs.andrewkelly.de)
[![Deploy](https://github.com/KellyAndrew/api-docs/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/KellyAndrew/api-docs/actions/workflows/deploy.yml)
[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

Reference specification for **EmbargoGate API**, a Coordinated Vulnerability Disclosure (CVD) and SBOM ingestion engine aligned with the EU Cyber Resilience Act.

## Contents

- **Start here:** Overview, Quickstart, Authentication, Errors
- **Concepts:** Core concepts (advisory state machine), Security considerations (STRIDE)
- **Guides:** Rate limits, Webhooks
- **Reference:** Endpoints
- **Help:** FAQ & Edge cases

## Local development

Install dependencies:

```bash
npm install
```

Start the dev server at `http://localhost:4321/`:

```bash
npm run dev
```

## Deployment

Every push to `main` builds the site and deploys it to GitHub Pages using GitHub Actions (`.github/workflows/deploy.yml`).
