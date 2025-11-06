import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true, // define `test` e `expect` globalmente
    setupFiles: "./src/setupTests.js",
  },
});
