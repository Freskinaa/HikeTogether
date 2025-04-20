import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom", // Use jsdom for browser-like testing
    globals: true, // Enable global test functions like describe, it, expect
    setupFiles: "./frontend/src/tests/setupTests.js", // Correct path to setupTests.js
  },
});