import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Fonts are self-hosted from src/assets/fonts, so the policy below pins every resource to
// 'self'. The 'unsafe-inline' on style-src covers Vite-injected runtime CSS and inline
// style attributes used by RevealItem; it is NOT relaxed for script-src.
// Note: `frame-ancestors` is intentionally omitted — the CSP spec ignores it in a meta
// element (header-only directive). Clickjacking risk is low (static, no auth/state).
const createContentSecurityPolicy = () =>
  [
    "default-src 'self'",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self' data:",
    "connect-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "form-action 'self'",
    "upgrade-insecure-requests",
  ].join("; ");

const contentSecurityPolicy = () => ({
  name: "portfolio-content-security-policy",
  transformIndexHtml(html) {
    return html.replace("__CONTENT_SECURITY_POLICY__", createContentSecurityPolicy());
  },
});

export default defineConfig(() => ({
  base: "/react-portfolio/",
  plugins: [react(), contentSecurityPolicy()],
  server: {
    port: Number(process.env.PORT) || 3000,
    open: false,
  },
  build: {
    outDir: "build",
    sourcemap: false,
  },
}));
