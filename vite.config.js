import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/react-portfolio/",
  plugins: [react()],
  server: {
    port: Number(process.env.PORT) || 3000,
    open: false,
  },
  build: {
    outDir: "build",
    sourcemap: true,
  },
});
