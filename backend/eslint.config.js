import tseslint from "typescript-eslint";

export default [
  {
    files: ["src/**/*.ts"],   // only TS files
    ignores: ["dist/**"],     // ignore dist completely
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  {
    ignores: ["**/*.js"], // <--- explicitly ignore all .js files
  },
];
