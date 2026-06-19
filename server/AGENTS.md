# AGENTS.md — server/ (Nitro API Routes)

## Purpose
Nuxt Nitro server API routes — proxyless data endpoints for prayers, Quran, hijri calendar, and PDF generation.

## Ownership
- All files under `server/api/`

## Local Contracts
- **Handlers**: Direct event handlers `defineEventHandler(async (event) => { ... })`
- **No framework**: Plain Nitro, no Express/Koa/H3 wrappers
- **Input**: URL params from `getRouterParam(event, 'key')`, body from `readBody(event)`
- **Output**: Return a response object directly (Nitro serializes)
- **External deps**: `puppeteer-core` + `@sparticuz/chromium` for PDF

## Endpoints
- `POST /api/prayers` — prayer times by year, lat, long, timezone
- `GET /api/surah` — Quran surah list
- `GET /api/verse` — ayah by surah + verse number
- `GET /api/hijri-calendar` — hijri calendar data
- `POST /api/generate-pdf` — generate PDF from HTML via Chromium/Puppeteer

## Work Guidance
- Do not import from client-side composables or stores
- Use `server/` imports only (nitro, h3 utilities)
- Config via `useRuntimeConfig()` available in event handlers
- Keep endpoints focused — one responsibility per file

## Verification
Manual via `curl` or browser with `bun run dev`.
