import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@public": "/public",
      "@assets": "/src/assets/index.ts",
      "@app": "/src/app/index.ts",
      "@pages": "/src/pages/index.ts",
      "@widgets": "/src/widgets/index.ts",
      "@features": "/src/features/index.ts",
      "@entities": "/src/entities/index.ts",
      "@shared": "/src/shared/index.ts",
    },
  },
});
