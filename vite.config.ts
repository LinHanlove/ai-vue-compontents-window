import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import * as path from "path";

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [Vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
});
