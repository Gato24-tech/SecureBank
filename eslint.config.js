import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.node, // Cambiado de browser a node
    },
    rules: {
      "no-unused-vars": "warn", // Advertencia para variables no usadas
      "no-console": "off", // Permitimos console.log()
      "semi": ["error", "always"], // Obligamos a usar punto y coma
    },
  },
  pluginJs.configs.recommended,
];
