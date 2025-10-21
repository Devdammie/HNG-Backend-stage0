# HNG Backend-Stage0

Minimal Express service that returns user info plus a cat fact.

## Prerequisites
- Node.js (v18+ recommended). If using Node <18, you'll need node-fetch.
- npm (bundled with Node)

## Setup
1. Clone or open the repository.
2. Install dependencies:
```sh
npm install
```
If you need the fetch fallback (Node <18):
```sh
npm install node-fetch
```

## Run locally
- Start production:
```sh
npm run start
```
- Start development (auto-reload):
```sh
npm run dev
```
The server listens on the environment variable PORT or defaults to 3100. In containerized environments ensure the process binds to 0.0.0.0.

## Endpoints
- GET /  — health check
- GET /me — returns JSON:
```json
{
  "status": "success",
  "user": { "name": "...", "email": "...", "stack": ["..."] },
  "timestamp": "ISO timestamp",
  "fact": "cat fact string"
}
```

Notes:
- Content-Type is application/json.
- Timestamp is ISO 8601 (new Date().toISOString()).
- The cat fact is fetched each request from https://catfact.ninja/fact so it should be dynamic.
- If the upstream catfact API is unavailable, /me returns HTTP 503.

Troubleshooting:
- If validators see HTTP 503, check server logs and network connectivity to catfact.ninja.
- If Content-Type is incorrect, confirm you use res.json() or res.type('application/json').json(...).
- For Docker builds, ensure shell scripts use LF endings and the container has bash if scripts require it.