import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: "index.html",
        login: "login.html",
        about: "about.html",
        dashboard: "dashboard.html",
        tracking: "tracking.html",
        stock: "stock.html",
      },
    },
  },
});
