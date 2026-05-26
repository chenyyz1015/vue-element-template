import antfu from "@antfu/eslint-config";
import eslintConfigPrettier from "eslint-config-prettier";
import autoImportGlobals from "./.eslintrc-auto-import.json" with { type: "json" };

export default antfu(
  {
    typescript: true,
    vue: true,
    unocss: true,
    jsonc: false,
    yaml: false,
    stylistic: false,
    ignores: ["dist/**", "types/auto-imports.d.ts", "types/components.d.ts"],
  },
  {
    languageOptions: {
      globals: autoImportGlobals.globals,
    },
    rules: {
      "vue/multi-word-component-names": "off",
      "no-console": "off",
      "ts/no-explicit-any": "warn",
      "ts/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
  eslintConfigPrettier
);
