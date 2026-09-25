import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import ts from "typescript-eslint";
import globals from "globals";
export default defineConfig(
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "wp-*/**",
      ".local/**",
      "scripts/*.py",
    ],
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      "no-control-regex": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
    },
  },
);
