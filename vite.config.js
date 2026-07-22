import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Fonts are self-hosted from public/fonts, so the policy below pins every resource to
// 'self'. Vite injects styles during development, but production emits a stylesheet and
// does not need 'unsafe-inline'. Script execution is never relaxed.
// Note: `frame-ancestors` is intentionally omitted — the CSP spec ignores it in a meta
// element (header-only directive). Clickjacking risk is low (static, no auth/state).
const createContentSecurityPolicy = ({ allowInlineStyles }) =>
  [
    "default-src 'self'",
    "script-src 'self'",
    `style-src 'self'${allowInlineStyles ? " 'unsafe-inline'" : ""}`,
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "form-action 'self'",
    "upgrade-insecure-requests",
  ].join("; ");

const contentSecurityPolicy = (options) => ({
  name: "portfolio-content-security-policy",
  transformIndexHtml(html) {
    return html.replace("__CONTENT_SECURITY_POLICY__", createContentSecurityPolicy(options));
  },
});

export default defineConfig(({ command }) => ({
  base: "/react-portfolio/",
  plugins: [react(), contentSecurityPolicy({ allowInlineStyles: command === "serve" })],
  server: {
    port: Number(process.env.PORT) || 3000,
    open: false,
  },
  build: {
    outDir: "build",
    sourcemap: false,
  },
}));
