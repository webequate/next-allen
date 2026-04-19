# Project: next-allen (Allen Hayden Johnson — allenhaydenjohnson1.com)

This is one of a family of 9 similar Next.js projects managed by Webequate. The projects share the same stack and architecture but are not identical.

---

## Stack

| Layer | Version | Notes |
|---|---|---|
| Node.js | 24 LTS (24.15.0) | Pinned in `.nvmrc` and `vercel.json` |
| Next.js | 16 | App Router only; Turbopack enabled |
| React | 19 | Automatic JSX runtime (`react-jsx`) |
| TypeScript | 5.x | strict mode, `moduleResolution: bundler` |
| Tailwind CSS | 3.x | PostCSS pipeline |
| ESLint | 9 | Flat config (`eslint.config.mjs`) |
| Prettier | 3.x | Integrated via `eslint-plugin-prettier` |
| Nodemailer | 8 | Contact form email (Gmail SMTP) |
| Deployment | Vercel | Node 24, no custom build command |

---

## Architecture

- **App Router only.** There is no `pages/` directory (excluded in `tsconfig.json`). All routes live under `app/`.
- **Turbopack** is the bundler for both dev and build. Do not add webpack configuration — it will be ignored and may cause errors.
- **SVG imports** are handled natively by Turbopack via `resolveExtensions` in `next.config.js`. No `@svgr/webpack` loader needed.
- **CSS `@import`** statements must appear before all `@tailwind` directives in `globals.css` — Turbopack enforces this.
- **Email** is sent via `nodemailer` (Gmail SMTP) through an App Router API route at `app/api/send-email/route.ts`. The old `@mailing-core` / React Email setup has been removed.

---

## Key files

| File | Purpose |
|---|---|
| `next.config.js` | Turbopack extensions, AVIF/WebP image formats, strict mode |
| `tsconfig.json` | `jsx: react-jsx`, no `baseUrl`, `moduleResolution: bundler` |
| `eslint.config.mjs` | ESLint v9 flat config with native `@typescript-eslint` rules |
| `styles/globals.css` | `@import` first, then `@tailwind` directives |
| `.nvmrc` | Node 24 |
| `vercel.json` | `NODE_VERSION: 24.15.0` |
| `lib/email.ts` | Nodemailer setup and send helpers |
| `app/api/send-email/route.ts` | Contact form API handler |

---

## Commands

```bash
npm run dev        # dev server on port 7777 (Turbopack)
npm run build      # production build
npm run lint       # eslint . (ESLint v9 flat config)
npm run format     # prettier --write on all source files
npm run build:sitemap  # next-sitemap + custom sort script
```

---

## What to avoid

- Do not add a `webpack()` function to `next.config.js` — Turbopack is active.
- Do not add `baseUrl` to `tsconfig.json` — deprecated in TS 6.0.
- Do not use `next/head` or `next/router` — App Router uses `export const metadata` and `next/navigation`.
- Do not use `.eslintrc.*` files — ESLint v9 reads only `eslint.config.mjs`.
- Do not use `next lint` in scripts — replaced by `eslint .`.
- Do not downgrade Node below 24 — `package.json` `engines` enforces `>=24.0.0`.

---

## Upgrade history (condensed)

The following changes were made to reach the current state from a Next.js 15 / Node 22 baseline:

1. **Next.js 16 + Turbopack** — removed webpack SVG loader, added `turbopack.resolveExtensions`, fixed `globals.css` import order, set `jsx: react-jsx`.
2. **ESLint v9 flat config** — deleted `.eslintrc.*`, created `eslint.config.mjs`, changed lint script from `next lint` to `eslint .`.
3. **Security audit pass** — `nodemailer` 6→8, various ReDoS/injection fixes.
4. **Dependency refresh** — all packages to current stable, `@typescript-eslint` parser + plugin added.
5. **Dead code removal** — deleted unused components (`Instructions.tsx`, `Layout.tsx`, `LayoutWidget.tsx`), unused state, unused variables.
6. **tsconfig cleanup** — removed redundant include paths, removed deprecated `baseUrl`.
7. **Node.js 24 LTS** — `.nvmrc`, `vercel.json`, `engines` all updated.
