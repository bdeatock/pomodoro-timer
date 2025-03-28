// eslint.config.mjs
import antfu from "@antfu/eslint-config";
import prettierConflicts from "eslint-config-prettier";

export default antfu({
  formatters: {
    html: true,
    markdown: true,
    mjs: true,
    json: true,
    jsonc: true,
    yaml: true,
    toml: true,
  },
  typescript: {
    tsconfigPath: "./tsconfig.json",
  },
  react: true,
  rules: {
    "antfu/top-level-function": "off",
  },
}, prettierConflicts);
