import { defineConfig } from "vite-plus";

export default defineConfig({
  defaultPackage: "./assets",
  fmt: {
    // Vendored by the skills CLI and pinned in skills-lock.json.
    ignorePatterns: [".agents/**"],
  },
  lint: {
    plugins: ["eslint", "typescript", "unicorn", "oxc", "react", "import", "jsx-a11y"],
    categories: { correctness: "error" },
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
});
