import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import unusedImports from "eslint-plugin-unused-imports";
import globals from "globals";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    plugins: {
      "unused-imports": unusedImports,
    },
  },
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "no-console": ["error", { allow: ["warn", "error"] }],
      "no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "newline-before-return": "error",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/strict-boolean-expressions": "off",
      "@typescript-eslint/space-before-function-paren": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-use-before-define": "error",
      "no-duplicate-imports": "warn",
      "react/jsx-key": [
        "error",
        {
          checkFragmentShorthand: true,
          checkKeyMustBeforeSpread: true,
          warnOnDuplicates: true,
        },
      ],
      "react/prop-types": "off",
      "no-multiple-empty-lines": "warn",
      "no-restricted-imports": "error",
      "no-empty": ["error", { allowEmptyCatch: true }],
      eqeqeq: "off",
    },
  },
];
