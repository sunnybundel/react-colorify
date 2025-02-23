import eslint from "@eslint/js";
// import nextPlugin from "@next/eslint-plugin-next";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import jestPlugin from "eslint-plugin-jest";
import reactHooks from "eslint-plugin-react-hooks";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";

/** @type {import('eslint').Linter.Config[]} */
const config = [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.node, // Ensure Node.js globals are included
        ...globals.browser, // Include browser globals if needed
      },
    },
    ...eslint.configs.recommended,
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        project: "./tsconfig.json",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": "error", //Make it an error
      "@typescript-eslint/no-explicit-any": "error",
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx,jsx}"],
    plugins: {
      "@typescript-eslint": tseslint,
      // "@next/next": nextPlugin,
      "react-hooks": reactHooks,
      import: importPlugin,
      jest: jestPlugin,
      "simple-import-sort": simpleImportSort,
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.node, // Ensure Node.js globals are included
        ...globals.browser, // Include browser globals if needed
        React: "readonly",
        JSX: "readonly",
        jest: "readonly",
        fetch: false,
      },
    },
    settings: {
      next: {
        rootDir: ".",
      },
      jest: {
        version: "detect",
      },
      "import/parsers": {
        "@typescript-eslint/parser": [".ts", ".tsx"],
      },
      "import/resolver": {
        node: {
          extensions: [".ts", ".tsx", ".js", ".jsx"],
        },
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
    rules: {
      "no-console": ["error", { allow: ["warn", "error"] }],
      "no-undef": "error",
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn", //Make it an error
      "import/named": "error",
      "import/default": "error",
      "import/namespace": "error",
      "import/no-unresolved": "error",
      "import/no-extraneous-dependencies": ["warn", { devDependencies: true }],
      "jest/no-disabled-tests": "warn",
      "jest/no-focused-tests": "error",
      "jest/prefer-to-have-length": "warn",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
      "jest/consistent-test-it": [
        "error",
        { fn: "test", withinDescribe: "it" },
      ],
    },
  },
  {
    ignores: ["**/node_modules/**", "**/dist/**", "**eslint.config**"],
  },
];

export default config;
