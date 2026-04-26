# Project: next-allen (Allen Hayden Johnson — allenhaydenjohnson.com)

This is one of a family of 9 similar Next.js projects managed by Webequate. The projects share the same stack and architecture but are not identical.

**Purpose:** Personal portfolio site for Allen Hayden Johnson. Visitors can browse a nested photo gallery (albums → sections → individual photos), watch archived videos, and contact the owner via a form that sends email through Gmail SMTP.

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
- **Email** is sent via `nodemailer` (Gmail SMTP) through an App Router API route at `app/api/send-email/route.ts`.
- **All content is static.** No database or CMS. Photo data lives in `data/photos.json`, video data in `data/videos.json`, and site identity in `data/basics.json`. Pages are statically generated at build time.
- **Hierarchical photo model.** Unlike the sibling projects that use a flat post list, this project has a three-level structure: Album → Section → Photo, reflected in nested dynamic routes.

---

## Directory structure

```
next-allen/
├── app/                                    # All routes (App Router)
│   ├── layout.tsx                          # Root layout: HTML shell, ThemeProvider, font
│   ├── page.tsx                            # Home page: BusinessCard
│   ├── about/
│   │   └── page.tsx                        # About page (same content as home)
│   ├── contact/
│   │   └── page.tsx                        # Contact page: form + contact details
│   ├── photos/
│   │   └── page.tsx                        # Album grid listing (/photos)
│   ├── album/
│   │   └── [albumId]/
│   │       ├── page.tsx                    # Album detail: sections + photo grid
│   │       └── photo/
│   │           └── [photoId]/
│   │               └── page.tsx            # Individual photo view
│   ├── videos/
│   │   └── page.tsx                        # Video grid listing (/videos)
│   ├── video/
│   │   └── [videoId]/
│   │       └── page.tsx                    # Individual video player
│   └── api/
│       └── send-email/
│           └── route.ts                    # POST: contact form → Nodemailer. GET: health ping
│
├── components/                             # Shared UI components
│   ├── AllenJohnson.tsx                    # SVG wordmark "ALLEN JOHNSON" (used as home link)
│   ├── Album.tsx                           # Renders all sections in an album
│   ├── BusinessCard.tsx                    # Home page: two AI-hacker portrait images
│   ├── ContactDetails.tsx                  # Static contact info (icons + text)
│   ├── ContactForm.tsx                     # Contact form with honeypot, validation, submit state
│   ├── Copyright.tsx                       # Footer copyright with dynamic year
│   ├── DownloadCV.tsx                      # CV download icon button
│   ├── Footer.tsx                          # Footer nav, social links, copyright, WebEquate branding
│   ├── FormInput.tsx                       # Reusable labeled input field
│   ├── Hamburger.tsx                       # Mobile menu toggle icon (Menu/X)
│   ├── Header.tsx                          # Responsive nav with hamburger, logo, theme switcher
│   ├── Heading.tsx                         # Section heading with accent-color text
│   ├── PhotoFooter.tsx                     # Photo caption display
│   ├── PhotoGrid.tsx                       # Responsive grid of photo thumbnails with links
│   ├── PhotoHeader.tsx                     # Photo title + prev/next navigation arrows
│   ├── Social.tsx                          # Maps socialLinks → SocialButton list
│   ├── SocialButton.tsx                    # Individual social icon link (opens new tab)
│   ├── ThemeSwitcher.tsx                   # Moon/Sun toggle using next-themes
│   └── WebEquate.tsx                       # WebEquate branding link
│
├── hooks/
│   ├── useScrollToTop.tsx                  # Returns scroll-to-top button JSX; shows after 400px scroll (not currently wired up)
│   └── useThemeSwitcher.tsx                # Legacy localStorage theme hook (superseded by next-themes)
│
├── interfaces/
│   └── ContactForm.ts                      # ContactForm interface (name, email, subject, message, website)
│
├── lib/
│   └── email.ts                            # escapeHtml, buildHtmlEmail, buildPlainText, sendContactEmail
│
├── types/
│   ├── basics.ts                           # Basics and SocialLink types (matches data/basics.json shape)
│   ├── photo.ts                            # Photo, Section, and Album types (matches data/photos.json shape)
│   └── video.ts                            # Video type (matches data/videos.json shape)
│
├── data/                                   # Static JSON content (source of truth for all site content)
│   ├── basics.json                         # Site identity: name, abouts, social links, contact info
│   ├── photos.json                         # All albums with nested sections and photos (~258KB)
│   └── videos.json                         # All videos: id, title, thumb, poster, description, file
│
├── scripts/
│   ├── sort-sitemap.js                     # Sorts sitemap-0.xml alphabetically by URL after generation
│   └── generate-video-posters.sh          # FFmpeg: extracts poster frames from MP4s at 5-second mark
│
├── styles/
│   └── globals.css                         # Google Fonts @import, Tailwind directives, animation keyframes, nav classes
│
├── public/
│   ├── img/
│   │   └── photos/                         # Album photo thumbnails organized by albumId/
│   ├── images/                             # Business card portraits (allen-flux-hacker.jpg, allen-android-hacker.jpg)
│   ├── video/                              # MP4 files + poster/ subfolder for thumbnails
│   ├── robots.txt
│   └── sitemap*.xml
│
├── next.config.js                          # Turbopack SVG extensions, image formats, strict mode
├── tsconfig.json                           # Target ES2022, react-jsx, @/* alias, bundler resolution
├── tailwind.config.js                      # Custom palette, dark mode: class, forms plugin
├── eslint.config.mjs                       # ESLint v9 flat config
├── postcss.config.js                       # PostCSS for Tailwind
├── .prettierrc.json                        # Formatting rules
├── next-sitemap.config.js                  # Sitemap generator config
├── vercel.json                             # NODE_VERSION: 24.15.0
├── .nvmrc                                  # Node 24
└── .env.template                           # Environment variable reference (see section below)
```

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
| `data/basics.json` | Site identity and contact config |
| `data/photos.json` | All albums, sections, and photos (single source of truth) |
| `data/videos.json` | All video metadata (single source of truth) |

---

## Environment variables

All variables are required in production unless marked optional. Copy `.env.template` to `.env.local` for local development.

| Variable | Required | Description |
|---|---|---|
| `GMAIL_USER` | Yes | Gmail account used as the SMTP sender |
| `GMAIL_APP_PASS` | Yes | Gmail app-specific password (not the account password) |
| `EMAIL_FROM` | Yes | `From:` address in outgoing emails |
| `EMAIL_TO` | Yes | Recipient address for contact form submissions |
| `EMAIL_CC` | No | CC address for contact form submissions |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical site URL (`https://allenhaydenjohnson.com`) — used for metadata and sitemaps |
| `NEXT_PUBLIC_ASSET_URL` | Yes | Base URL for public assets |
| `NEXT_PUBLIC_GTM_ID` | Yes | Google Tag Manager container ID (e.g. `GTM-XXXXXXX`) |
| `NEXT_PUBLIC_GA_ID` | No | Google Analytics measurement ID |

`NEXT_PUBLIC_*` variables are embedded at build time and exposed to the browser. Never put secrets in `NEXT_PUBLIC_*` variables.

---

## Third-party services

| Service | How used |
|---|---|
| **Gmail SMTP** | Nodemailer connects on port 465 (TLS) using `GMAIL_USER` + `GMAIL_APP_PASS`. Configure a Gmail App Password — standard account passwords are rejected. |
| **Google Tag Manager** | `@next/third-parties` is installed; controlled by `NEXT_PUBLIC_GTM_ID`. |
| **Google Fonts** | Bruno Ace (weight 400) loaded via `@import` in `globals.css`. Must appear before `@tailwind` directives (Turbopack requirement). |
| **Vercel** | Deployment platform. No custom build command — Vercel auto-detects Next.js. Node version set in `vercel.json`. |
| **next-sitemap** | Generates `sitemap.xml` and `robots.txt` at build time via `npm run build:sitemap`. Config in `next-sitemap.config.js`. |
| **FFmpeg** | Used offline by `scripts/generate-video-posters.sh` to extract poster frames from MP4s. Not a runtime dependency. |

---

## Data model

### `data/basics.json` → `types/basics.ts`

Single object with site-wide identity and contact info. Imported directly in server components.

```ts
type SocialLink = { name: string; handle: string; url: string };

type Basics = {
  name: string;
  titles: string[];
  abouts: string[];
  email: string;
  socialLinks: SocialLink[];
  location: string;
  website: string;
  contactIntro: string;
};
```

### `data/photos.json` → `types/photo.ts`

Array of albums. Each album contains sections; each section contains photos. This is the single source of truth for all photo pages. The file is ~258KB.

```ts
type Photo = {
  id: number;       // Unique within the album; used as the photoId URL segment
  file: string;     // Filename under /public/img/photos/[albumId]/
  caption: string;
};

type Section = {
  heading: string;
  photos: Photo[];
};

type Album = {
  id: string;       // URL segment: /album/[id]
  title: string;
  cover: string;    // Cover image filename (used on /photos listing)
  description: string;
  sections: Section[];
};
```

Photo images live at `/public/img/photos/[albumId]/[file]`.

### `data/videos.json` → `types/video.ts`

Array of 15 video objects. Used exclusively by the `/videos` listing and `/video/[videoId]` detail pages.

```ts
type Video = {
  id: string;           // URL segment: /video/[id]
  title: string;
  thumb: string;        // Thumbnail filename under /public/video/
  poster: string;       // Poster frame filename under /public/video/poster/
  description: string;
  file: string;         // MP4 filename under /public/video/
};
```

Video files live at `/public/video/[file]`. Poster frames live at `/public/video/poster/[poster]`.

### `interfaces/ContactForm.ts`

```ts
interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  website?: string;   // Honeypot — must be empty; bots fill it in
}
```

---

## Routing

| URL pattern | Source file | Notes |
|---|---|---|
| `/` | `app/page.tsx` | Home: BusinessCard (two portrait images) |
| `/about` | `app/about/page.tsx` | About: same layout as home |
| `/photos` | `app/photos/page.tsx` | Album grid (all albums, cover image + title) |
| `/album/[albumId]` | `app/album/[albumId]/page.tsx` | Album detail: prev/next nav, sections, photo grid |
| `/album/[albumId]/photo/[photoId]` | `app/album/[albumId]/photo/[photoId]/page.tsx` | Individual photo: full-size image, prev/next arrows |
| `/videos` | `app/videos/page.tsx` | Video grid (all videos, thumbnail + title) |
| `/video/[videoId]` | `app/video/[videoId]/page.tsx` | Video player: HTML5 `<video>` with poster + controls |
| `/contact` | `app/contact/page.tsx` | Two-column: form left, contact details right on lg |
| `/api/send-email` | `app/api/send-email/route.ts` | POST only; GET returns health ping |

All dynamic pages (`[albumId]`, `[photoId]`, `[videoId]`) use `generateStaticParams` to pre-render every route at build time.

**Note on album navigation:** The album detail page renders prev/next album links by finding the current album's index in the `photos.json` array. Photo detail pages navigate within the same album only, not across albums.

---

## Theming

Dark mode is class-based (set on `<html>`). `next-themes` manages persistence to `localStorage` and hydration safety. The root layout wraps the app in `<ThemeProvider attribute="class">`.

**Custom Tailwind palette:**

| Token | Value | Role |
|---|---|---|
| `light-1` | `#f5f5f5` | Light background |
| `light-2` | `#a3a3a3` | Light secondary text |
| `light-3` | `#404040` | Light primary text |
| `dark-1` | `#262626` | Dark background |
| `dark-2` | `#525252` | Dark secondary text |
| `dark-3` | `#d4d4d4` | Dark primary text |
| `accent-light` | `#6655aa` | Purple accent (light mode) |
| `accent-dark` | `#553388` | Purple accent (dark mode) |

The accent color is **purple** — different from the orange used in the sibling projects. Use `dark:` prefix variants for dark-mode styles.

The `ThemeSwitcher` component guards its render with a `mounted` check to avoid hydration mismatches.

**Typography:** Bruno Ace (Google Fonts) is the display font, applied via the `.bruno` CSS class. Standard body text uses the Tailwind sans stack.

---

## Coding conventions

### Imports

All imports use the `@/` alias (maps to project root). No relative imports.

```ts
import basics from "@/data/basics.json";
import { Album } from "@/types/photo";
import Header from "@/components/Header";
```

### Server vs client components

The default is server component. Add `"use client"` only when the component needs browser APIs, event handlers, or React hooks. Components that are client components in this project: `Header`, `Footer`, `ContactForm`, `Hamburger`, `ThemeSwitcher`.

### TypeScript

- Strict mode is on. Avoid `any` — the ESLint config allows it only in API route files.
- Type data shapes in `types/` (matching JSON structure). Put component prop interfaces inline or in `interfaces/` if reused.
- Dynamic route params are typed as `Promise<{ ... }>` and must be awaited: `const { albumId } = await params`.

### Styling

- Tailwind utility classes only — no inline styles, no CSS modules.
- Dark mode via `dark:` prefix on every element that needs it.
- Animation classes are defined in `globals.css` — use them via `className`; don't recreate the keyframes.
- Nav class hierarchy: `.nav-primary` (desktop top), `.nav-secondary` (footer), `.nav-mobile` (hamburger drawer).
- The mobile nav uses a max-height transition (0 → 300px on `.show` class) rather than display toggling, to allow CSS animation.

### Forms

- All form state lives in client components with `useState`.
- Submit handler POSTs JSON to `/api/send-email`, reads `{ success, message }` response.
- Always include the honeypot `website` field (hidden via CSS, not `type="hidden"`).
- Reset form fields on successful submission.
- Show loading state on the submit button during the request.

### Email API route

Server-side validation mirrors client validation. The route:
1. Rejects requests with a filled honeypot field silently (returns success to confuse bots).
2. Validates all required fields and email format.
3. Escapes HTML in all user-supplied strings before embedding in the HTML email body.
4. Sends both an HTML version and a plain-text fallback.
5. Is configured with `export const runtime = "nodejs"` (required for Nodemailer).

### Photo and video media

- Photo images live at `/public/img/photos/[albumId]/[file]`. Render with `next/image`.
- Video files live at `/public/video/[file]`. Render with the HTML5 `<video>` element (not `next/image`).
- Video posters live at `/public/video/poster/[poster]`. Generate them offline with `scripts/generate-video-posters.sh` (requires FFmpeg).
- Do not confuse `thumb` (used on the grid listing) with `poster` (used on the video player) in the `Video` type.

### SEO / metadata

Every route exports a `metadata` object or `generateMetadata` function. Required fields:

```ts
export const metadata: Metadata = {
  title: "...",
  description: "...",
  alternates: { canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/route` },
  openGraph: { ... },
};
```

Dynamic album and video pages call `generateMetadata` to produce per-page titles and descriptions sourced from the JSON data.

---

## Component conventions

- **File names:** PascalCase matching the exported component name (`PhotoGrid.tsx`, not `photo-grid.tsx`).
- **Hook files:** camelCase prefixed with `use` (`useScrollToTop.tsx`).
- **One component per file.**
- **Props:** Inline interface or type at the top of the file.
- **No default export wrapping** — components are exported as `export default function ComponentName`.
- **Icons:** Use `react-icons` subpackages: `fi` (Feather Icons), `fa` (Font Awesome). Import only what's used. The `SocialButton` icon mapping covers: facebook, github, instagram, linkedin, twitter, youtube.
- **Header receives a single `socialLink: SocialLink`** (not an array) for the primary social link displayed in the nav bar. The full `socialLinks` array is passed to `Footer`.

---

## Scripts

### `scripts/sort-sitemap.js`

Runs after `next-sitemap` to alphabetically sort all `<url>` entries in `public/sitemap-0.xml`. Uses `localeCompare` with `{ numeric: true, sensitivity: "base" }`. Called automatically by `npm run build:sitemap`.

### `scripts/generate-video-posters.sh`

Offline utility — not part of the CI/build pipeline. Requires FFmpeg installed locally. For each `.mp4` in `public/video/`, extracts a single frame at the 5-second mark, scales to 640×480, and writes it to `public/video/poster/[basename].jpg`. Run this manually when adding new video files.

```bash
# Usage
bash scripts/generate-video-posters.sh
```

---

## Testing

**Stack:** Vitest + React Testing Library (`@testing-library/react` v16, `@testing-library/user-event` v14, `@testing-library/jest-dom` v6).

**Config files:**
- `vitest.config.ts` — jsdom environment, `globals: true`, `@/` alias, `@vitejs/plugin-react`
- `vitest.setup.ts` — imports `jest-dom`, globally mocks `next/link` (→ plain `<a>`) and `next/navigation` (`usePathname` as a `vi.fn()`)

**Test location:** `__tests__/` mirroring the source tree (`__tests__/lib/`, `__tests__/components/`).

**Conventions:**
- Import `describe`, `it`, `expect`, `vi`, etc. from `vitest` explicitly in each test file.
- Use `userEvent.setup()` + `await user.click/type/…` for all interaction tests.
- Mock `next/navigation`'s `usePathname` per-test: `vi.mocked(usePathname).mockReturnValue("/photos")`.
- Mock `next-themes` per test file where `ThemeSwitcher` is involved: `vi.mock("next-themes", () => ({ useTheme: vi.fn(() => ({ theme: "dark", setTheme: vi.fn() })) }))`.
- Mock `react-icons` subpackages with `data-testid` stubs when you need to assert which icon rendered.
- Scope `getByRole` queries with `within(document.querySelector(".nav-primary") as HTMLElement)` when the logo link and nav links share the same `aria-label`.
- Mock `global.fetch` via `vi.stubGlobal("fetch", mockFn)` in `beforeEach`; restore with `vi.unstubAllGlobals()` in `afterEach`.
- Use `vi.hoisted()` to declare mock variables that are referenced inside a `vi.mock()` factory (e.g. the nodemailer mock in `__tests__/lib/email.test.ts`).

**What is tested vs skipped:**
- Tested: components with logic, interactivity, or non-trivial conditional rendering (`ContactForm`, `Header`, `Footer`, `ThemeSwitcher`, `SocialButton`, `PhotoHeader`) and all utility functions in `lib/`.
- Skipped as purely presentational (no logic): `BusinessCard`, `Album`, `AllenJohnson`, `ContactDetails`, `Copyright`, `DownloadCV`, `FormInput`, `Heading`, `PhotoFooter`, `Social`, `WebEquate`.

---

## Commands

```bash
npm run dev            # dev server on port 7777 (Turbopack)
npm run build          # production build
npm run lint           # eslint . (ESLint v9 flat config)
npm run format         # prettier --write on all source files
npm run build:sitemap  # next-sitemap + sort-sitemap.js
npm run test           # vitest watch mode
npm run test:run       # vitest single run (CI)
```

---

## What to avoid

- Do not add a `webpack()` function to `next.config.js` — Turbopack is active.
- Do not add `baseUrl` to `tsconfig.json` — deprecated in TS 6.0.
- Do not use `next/head` or `next/router` — App Router uses `export const metadata` and `next/navigation`.
- Do not use `.eslintrc.*` files — ESLint v9 reads only `eslint.config.mjs`.
- Do not use `next lint` in scripts — replaced by `eslint .`.
- Do not downgrade Node below 24 — `package.json` `engines` enforces `>=24.0.0`.
- Do not use relative imports — use the `@/` alias.
- Do not read from `data/posts.json` for new features — it is a legacy file not used by any route.
- Do not use `useThemeSwitcher.tsx` — it is a legacy hook superseded by `next-themes`. Use `useTheme()` from `next-themes` instead.
- Do not put secrets in `NEXT_PUBLIC_*` environment variables — they are embedded in the client bundle.
- Do not forget to `await params` in dynamic route files — Next.js 16 passes `params` as a `Promise`.

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
