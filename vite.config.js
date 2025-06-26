import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/PortfolioV2",
  build: {
    rollupOptions: {
      external: [],
    },
  },
  optimizeDeps: {
    include: ["split-type"],
  },
});
