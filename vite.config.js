import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const createContentSecurityPolicy = ({ allowInlineStyles }) =>
  [
    "default-src 'self'",
    "script-src 'self'",
    `style-src 'self'${allowInlineStyles ? " 'unsafe-inline'" : ""} https://fonts.googleapis.com`,
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data:",
    "connect-src 'self'",
    "base-uri 'self'",
    "form-action 'none'",
    "object-src 'none'",
  ].join("; ");

const contentSecurityPolicy = (allowInlineStyles) => ({
  name: "portfolio-content-security-policy",
  transformIndexHtml(html) {
    return html.replace(
      "__CONTENT_SECURITY_POLICY__",
      createContentSecurityPolicy({ allowInlineStyles })
    );
  },
});

export default defineConfig(({ command }) => ({
  base: "/react-portfolio/",
  plugins: [react(), contentSecurityPolicy(command === "serve")],
  server: {
    port: Number(process.env.PORT) || 3000,
    open: false,
  },
  build: {
    outDir: "build",
    sourcemap: false,
  },
}));
