import base from "./base.js";
import reactPlugin from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";
import rnPlugin from "eslint-plugin-react-native";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...base,
  {
    plugins: {
      react: reactPlugin,
      "react-hooks": hooksPlugin,
      "react-native": rnPlugin,
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...hooksPlugin.configs.recommended.rules,
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react-native/no-unused-styles": "warn",
      "react-native/no-inline-styles": "warn",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
