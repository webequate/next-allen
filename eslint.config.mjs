import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    ignores: [".mailing/**", ".next/**", "node_modules/**", ".backup-pages/**", "next-env.d.ts"],
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
