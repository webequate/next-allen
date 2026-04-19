# Next.js 16 Upgrade Checklist

Apply to each of the 8 other projects in the family (9 total). The projects are similar but not identical — treat each step as a checklist to verify and adapt rather than a blind copy-paste. Work through the steps in order; each step has a verification gate before moving on.

---

## Step 1 — Upgrade core framework packages

Edit `package.json`:

```jsonc
// dependencies
"next": "^16.0.0",
"@next/third-parties": "^16.0.0",

// devDependencies
"eslint-config-next": "^16.0.0",
"eslint": "^9.39.4",
"@typescript-eslint/eslint-plugin": "^8.58.2",
"@typescript-eslint/parser": "^8.58.2"
```

Also bump these to current stable while you're in the file:

```jsonc
"react": "^19.2.5",
"react-dom": "^19.2.5",
"nodemailer": "^8.0.5",
"sharp": "^0.34.5",
"@types/react": "^19.2.14",
"@types/node": "^22.19.17",
"prettier": "^3.8.3",
"postcss": "^8.5.10",
"autoprefixer": "^10.5.0"
```

Set `engines` in `package.json`:

```json
"engines": {
  "node": ">=24.0.0"
}
```

Run `npm install` and confirm `package-lock.json` updates cleanly.

---

## Step 2 — Pin Node.js version

Create `.nvmrc` at project root:

```
24
```

Create (or replace) `vercel.json` at project root:

```json
{
  "env": {
    "NODE_VERSION": "24.15.0"
  }
}
```

Switch your local shell: `nvm use` (or `nvm install 24`).

**Verify:** `node -v` prints `v24.x.x`.

---

## Step 3 — Replace webpack SVG config with Turbopack config

Open `next.config.js`. Remove any `webpack` key that adds an SVG loader rule, e.g.:

```js
// DELETE this entire block:
webpack(config) {
  config.module.rules.push({ test: /\.svg$/, use: ['@svgr/webpack'] });
  return config;
}
```

Replace with (or merge into) the Turbopack block:

```js
module.exports = {
  turbopack: {
    resolveExtensions: [".ts", ".tsx", ".js", ".jsx", ".svg"],
  },
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};
```

> If the project imports SVGs via `import Logo from './logo.svg'`, those imports continue to work. For a static URL use `import logoUrl from './logo.svg?url'`.

---

## Step 4 — Fix CSS `@import` ordering in `globals.css`

Open `styles/globals.css` (or wherever global CSS lives). Ensure any `@import` lines appear **before** all `@tailwind` directives:

```css
/* CORRECT */
@import url("https://fonts.googleapis.com/...");

@tailwind base;
@tailwind components;
@tailwind utilities;
```

Turbopack enforces this ordering strictly; a wrong order produces a build error.

---

## Step 5 — Update `tsconfig.json`

Make these changes:

1. Set `"jsx": "react-jsx"` (enables the automatic JSX runtime; no need to `import React` everywhere).
2. Remove `"baseUrl": "."` if present (deprecated in TypeScript 6.0).
3. Remove redundant include paths — `app/**/*.tsx` is covered by `**/*.tsx`:

```jsonc
{
  "compilerOptions": {
    "target": "es2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "paths": { "@/*": ["./*"] },
    "plugins": [{ "name": "next" }]
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    "next-env.d.ts",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts"
  ],
  "exclude": ["node_modules", ".next", ".mailing", ".backup-pages", "pages"]
}
```

---

## Step 6 — Migrate ESLint to v9 flat config

Delete the old config file (`.eslintrc.js`, `.eslintrc.json`, or `.eslintrc.cjs`).

Create `eslint.config.mjs`:

```js
import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    ignores: [".mailing/**", ".next/**", "node_modules/**", ".backup-pages/**"],
  },
  // TypeScript/TSX files
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: { jsx: true },
        project: "./tsconfig.json",
      },
      globals: {
        React: "readonly",
        document: "readonly",
        window: "readonly",
        localStorage: "readonly",
        console: "readonly",
        process: "readonly",
        fetch: "readonly",
      },
    },
    plugins: { "@typescript-eslint": tsPlugin },
    rules: {
      ...js.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
  // API routes may use `any`
  {
    files: ["**/api/**/*.ts"],
    rules: { "@typescript-eslint/no-explicit-any": "off" },
  },
  // JavaScript/JSX files
  {
    files: ["**/*.{jsx,js}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: {
        React: "readonly",
        document: "readonly",
        window: "readonly",
        localStorage: "readonly",
        console: "readonly",
        require: "readonly",
        module: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        process: "readonly",
      },
    },
    rules: { ...js.configs.recommended.rules },
  },
];
```

Update `package.json` `lint` script:

```json
"lint": "eslint ."
```

(Remove `next lint` — it expected the old config format.)

**Verify:** `npm run lint` exits 0 with no errors.

---

## Step 7 — Remove unused legacy Pages Router components

Check for and delete these files if present:

- `components/Layout.tsx` — Pages Router component using `next/head` / `next/router`
- `components/LayoutWidget.tsx` — unused widget component

Search for any remaining `next/router` or `next/head` imports in `components/` and migrate them to App Router equivalents (`next/navigation`, metadata exports) if found.

---

## Step 8 — Remove dead code (ESLint zero-warning pass)

Run `npm run lint` and resolve every warning:

- Unused variables → delete them
- Unused `catch` parameters → `catch (_e)` or remove the binding
- Unused React state + side-effect hooks → delete the state and `useEffect`/event listeners that drive it
- Unused components with no imports anywhere → delete the file

Target: `npm run lint` exits 0 with zero warnings.

---

## Step 9 — Full build verification

```bash
npm run build
```

Expected output: all pages generate successfully, 0 errors, 0 warnings.

Also smoke-test the dev server with Turbopack:

```bash
npm run dev
```

Visit the home page and at least one dynamic route. Confirm no console errors.

---

## Step 10 — Security audit

```bash
npm audit
```

Target: 0 vulnerabilities. If any appear, run `npm audit fix` or manually bump the affected package. Re-run until clean.

---

## Final verification gate

- [ ] `node -v` → v24.x.x
- [ ] `npm run build` → 0 errors
- [ ] `npm run lint` → 0 warnings, 0 errors
- [ ] `npm audit` → 0 vulnerabilities
- [ ] Dev server starts and pages render correctly
- [ ] `.nvmrc` contains `24`
- [ ] `vercel.json` contains `"NODE_VERSION": "24.15.0"`
