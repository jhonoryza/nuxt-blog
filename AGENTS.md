# AGENTS.md — Nuxt Blog

## Purpose
Personal blog by Fajar SP — Nuxt 3 SSR app with Tailwind CSS, shadcn-vue UI, admin panel, prayer times, Quran reader, and Markdown rendering with Shiki highlighting.

## Ownership
- **Blog frontend** (pages, components, layouts, composables)
- **Admin panel** (CRUD posts via external API, auth via cookie)
- **Server API routes** (prayers, surah, verse, hijri-calendar, PDF generation)
- **UI system** — shadcn-vue components under `components/ui/`

## Local Contracts
- **Framework**: Nuxt 3, Vue 3 Composition API, `<script setup>`
- **Styling**: Tailwind CSS 3, shadcn-vue theme variables (oklch), `cn()` from `lib/utils.ts`
- **UI Library**: shadcn-vue via `shadcn-nuxt` module; components in `components/ui/`
- **State**: Pinia (`stores/`)
- **Auth**: JWT token in `auth-token` cookie; `middleware/admin.ts` guards `/admin/*`
- **API client**: `composables/useAdminApi.ts` — talks to external API
- **Markdown**: `composables/useMarkdown.ts` — markdown-it + Shiki (vitesse-dark/light)
- **Server routes**: Nuxt Nitro in `server/api/` — proxyless, direct response
- **External config**: `.env` for API_URL, API_CHAT_URL, API_MERCUREHUB_URL, GTM_ID
- **Build**: Nuxt 3 (`nuxt build`/`nuxt generate`)
- **Runtime**: Bun (lockfile: `bun.lock`, `deno.json`)

## Work Guidance
- All new Vue components use `<script setup>` + Composition API
- Use shadcn-vue components from `components/ui/` for consistency; import via `@/components/ui/xxx`
- Dark mode via `@nuxtjs/color-mode` — use `dark:` Tailwind prefix, theme vars from `main.css`
- Code blocks use `useMarkdown` composable (Shiki for SSR-safe highlight)
- External API calls use `useAdminApi` composable which handles auth headers
- Admin routes use `definePageMeta({ middleware: 'admin' })`

## Verification
No test framework configured yet. Verify manually via `npm run dev` / `bun run dev`.

## Child DOX Index

### `server/` — Nitro API Routes
- Child doc: `server/AGENTS.md`
- `server/api/prayers.ts` — POST prayer times by year/lat/long/timezone
- `server/api/surah.ts` — GET Quran surah list
- `server/api/verse.ts` — GET ayah by surah + verse number
- `server/api/hijri-calendar.ts` — GET hijri calendar data
- `server/api/generate-pdf.ts` — POST generate PDF (Chromium/puppeteer)
- Owns all Nitro backend logic; no framework, direct handlers

### `components/ui/` — shadcn-vue UI Components
- Child doc: `components/ui/AGENTS.md`
- Managed by shadcn-nuxt; do not edit manually unless customizing
- badge, button, card, input, table — standard shadcn-vue components
- `index.ts` re-exports; `index.vue` or named Vue files per component
- Alias: `@/components/ui/xxx`

### `components/` — Application Components
- App-level Vue components (TopNav, Footer, Landing, Logo, ThemeToggle, Toaster, etc.)
- Feature components: Prayer, Surah, Chatbox, CVPreview, DarkPreview, DatePicker, ImageUpload, MarkdownRenderer

### `pages/` — Route Pages
- Nuxt file-based routing
- `/` — blog post list (searchable, sortable table)
- `/posts/[slug]` — single post view
- `/admin/` — admin dashboard (CRUD posts, auth-guarded)
- `/admin/login` — login page
- `/admin/posts/new` — create post
- `/admin/posts/[slug]` — edit post
- `/about`, `/cv`, `/work-with-me`, `/disclaimer`, `/tools` — static pages
- `/prayers` — prayer times viewer
- `/alquran` + `/alquran/[surahId]` — Quran reader
- `/chat` — chat interface

### `layouts/` — Page Layouts
- `default.vue` — main site layout (TopNav, Footer, NuxtPage slot)
- `admin.vue` — minimal admin layout

### `composables/` — Vue Composables
- `useAdminApi.ts` — external API client (login, CRUD posts, uploads)
- `useMarkdown.ts` — Markdown renderer with Shiki code highlighting
- `useToast.ts` — toast notification system (global handler pattern)

### `stores/` — Pinia Stores
- `prayers.js` — prayer times cache (1-day TTL, coordinate-aware)

### `middleware/` — Route Middleware
- `admin.ts` — auth guard: redirects to `/admin/login` if no `auth-token` cookie

### `assets/` — Static Assets
- `css/main.css` — Tailwind base + shadcn-vue theme CSS variables (oklch light/dark)
- `css/style.css` — legacy stub
- Static images: `pic.jpeg`, `banner.png`

### `public/` — Public Static Files
- `favicon.ico`, `labkita.png`, `pic.png`, `robots.txt`
- `posts/` — post static assets (subdirs: dist, languages, themes)
- `alquran/` — Quran data files
- `dist/` — Shiki onig.wasm
- `languages/`, `themes/` — Shiki language/theme grammars

### `utils/` — Utility Functions
- `adminPostDates.ts` — date parsing/formatting for admin post dates

### `lib/` — Library Code
- `utils.ts` — `cn()` helper (clsx + tailwind-merge), shadcn-vue shared

### `data/` — Static Data
- `cv.json` — CV content data

### `plugins/` — Nuxt Plugins
- Empty (configured in `nuxt.config.ts` instead)

### Nuxt Config
- `nuxt.config.ts` — all Nuxt, module, and runtime config
- `tailwind.config.js` — Tailwind configuration
- `components.json` — shadcn-vue configuration
- `tsconfig.json` — TypeScript config (auto-generated)
- `deno.json` + `deno.lock` — Deno config (for script runner)
