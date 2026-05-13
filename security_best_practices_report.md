# Security Best Practices Report

## Executive Summary

This repository is a static React 19 + Vite portfolio deployed to GitHub Pages. The current application has a strong security baseline for its risk profile: no backend, no authentication/session state, no forms, no runtime API calls, no service worker, no browser storage, no raw HTML rendering, no `eval`, and outbound links consistently use `rel="noopener noreferrer"`.

No critical, high, or medium findings were found in the current codebase. Dependency audit is clean for runtime and development dependencies. The remaining items are low-severity hardening recommendations around static-hosting header limits, third-party font loading, and immutable GitHub Actions pinning.

## Scope

- Language/framework: JavaScript, React 19, Vite.
- Runtime model: browser-only static SPA.
- Hosting model: GitHub Pages.
- Relevant guidance loaded:
  - `javascript-general-web-frontend-security.md`
  - `javascript-typescript-react-web-frontend-security.md`
- Backend guidance was not loaded because this repo does not contain backend code.

## Verification Performed

- `npm audit --omit=dev`: 0 vulnerabilities.
- `npm audit`: 0 vulnerabilities.
- `npm run check`: lint, 12 tests, and production build passed.
- `npm run visual:smoke`: all route/viewport scenarios passed after using an alternate local port because `127.0.0.1:4173` was occupied by another local preview.
- Static scan for DOM XSS sinks, string code execution, unsafe navigation, browser storage, `postMessage`, service workers, dynamic script injection, credentialed fetches, common secret patterns, and committed secret-like files.
- Production header check against `https://coleyrockin.github.io/react-portfolio/`.
- Production build check for CSP placeholder leakage, `unsafe-inline`, `unsafe-eval`, source maps, and social-preview metadata.

## Critical

None.

## High

None.

## Medium

None for the current static-site threat model.

## Low

### BP-1: Security headers are constrained by GitHub Pages hosting

- Rule ID: `REACT-HEADERS-001`, `JS-CSP-001`
- Severity: Low
- Location: `index.html:6-7`, `vite.config.js:4-15`
- Evidence:

```html
<meta http-equiv="Content-Security-Policy" content="__CONTENT_SECURITY_POLICY__" />
<meta name="referrer" content="strict-origin-when-cross-origin" />
```

```js
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
```

- Impact: The app has an early meta CSP and referrer policy, but meta-delivered CSP cannot provide every header-level control. Runtime headers from GitHub Pages include HTTPS/HSTS, but app-controlled `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, and clickjacking controls such as `frame-ancestors` are not visible as HTTP headers.
- Fix: If the site moves to a header-capable host/CDN, set security headers at the edge: `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, and `frame-ancestors 'none'` unless embedding is required.
- Mitigation: Keep the current meta CSP early in `index.html`, keep `script-src 'self'`, and continue avoiding raw DOM/HTML sinks.
- False positive notes: This is a GitHub Pages platform limitation rather than an application vulnerability.

### BP-2: Google Fonts remains a third-party stylesheet/font dependency

- Rule ID: `REACT-SRI-001`, `JS-SUPPLY-001`
- Severity: Low
- Location: `index.html:12-14`, `vite.config.js:8-9`
- Evidence:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Manrope:wght@400;500;600;700;800&display=swap" />
```

```js
`style-src 'self'${allowInlineStyles ? " 'unsafe-inline'" : ""} https://fonts.googleapis.com`,
"font-src 'self' https://fonts.gstatic.com",
```

- Impact: Google Fonts is a small third-party dependency and privacy/supply-chain exposure. The CSP is narrowly scoped to Google Fonts, and no third-party script executes, so this is low risk.
- Fix: For maximum static-site hardening, self-host the selected font files and remove `fonts.googleapis.com` / `fonts.gstatic.com` from CSP.
- Mitigation: Keep the current CSP allowlist narrow and avoid adding third-party scripts or tag managers.
- False positive notes: SRI is not practical for the Google Fonts CSS response because it can vary by user agent; self-hosting is the cleaner fix if this becomes important.

### BP-3: GitHub Actions are pinned to version tags, not immutable SHAs

- Rule ID: `REACT-SUPPLY-001`
- Severity: Low
- Location: `.github/workflows/ci.yml:17-20`, `.github/workflows/deploy.yml:21-24`, `.github/workflows/deploy.yml:35-49`, `.github/workflows/codeql.yml:21-35`
- Evidence:

```yaml
uses: actions/checkout@v5
uses: actions/setup-node@v5
uses: actions/upload-pages-artifact@v4
uses: actions/deploy-pages@v5
uses: github/codeql-action/init@v4
uses: github/codeql-action/analyze@v4
```

- Impact: Major-version tags are common and acceptable for small public projects, but immutable SHA pinning gives stronger supply-chain integrity because the exact action code cannot move under the same tag.
- Fix: Pin each action to a full commit SHA and use Dependabot to keep the pins updated.
- Mitigation: Current workflows use scoped permissions, `npm ci`, Dependabot, CI, Pages deployment, and CodeQL, which is a good baseline for this repo.
- False positive notes: This is a supply-chain hardening recommendation, not evidence of compromised workflow code.

## Positive Controls

### BP-4: Production CSP is currently strict for scripts and styles

- Location: `vite.config.js:4-15`, `build/index.html:6`
- Evidence: Production build output contains `script-src 'self'` and `style-src 'self' https://fonts.googleapis.com`, with no `unsafe-inline` or `unsafe-eval`. Development mode still permits inline styles because Vite/React development tooling may need it; production does not.

### BP-5: Public source maps are disabled

- Location: `vite.config.js:34-37`
- Evidence:

```js
build: {
  outDir: "build",
  sourcemap: false,
},
```

- Note: This avoids publishing source maps from GitHub Pages.

### BP-6: React rendering uses safe defaults

- Location: `src/components/Portfolio/index.jsx:47-77`, `src/components/Contact/index.jsx:19-31`, `src/components/Footer/index.jsx:14-22`
- Evidence: Project and social data render through JSX text/attributes, no `dangerouslySetInnerHTML` is used, and external links include `rel="noopener noreferrer"`.

### BP-7: Hash routing is allowlisted

- Location: `src/App.jsx:9-18`, `src/App.jsx:38-72`, `src/App.jsx:103-107`
- Evidence: `window.location.hash` is normalized and matched against a fixed `sections` list before state changes or rendering. Unknown hashes are not rendered as markup and are not used for redirects.

### BP-8: Client configuration does not expose secrets

- Location: `.env.example:1-6`, `src/components/About/index.jsx:10-11`, `src/data/languages.js:1`
- Evidence: `.env.example` warns not to commit `.env.local`, and the only `import.meta.env` use is `BASE_URL` for public asset paths.

### BP-9: Dependency and CI governance are solid for repo size

- Location: `package-lock.json`, `.github/workflows/ci.yml:17-29`, `.github/workflows/deploy.yml:21-29`, `.github/workflows/codeql.yml:11-35`, `.github/dependabot.yml:1-40`
- Evidence: The repo has a lockfile, CI uses `npm ci`, CodeQL runs on push/PR/schedule, and Dependabot covers npm plus GitHub Actions.

## Recommended Fix Order

1. Optional: Self-host fonts if you want to remove the last third-party resource dependency.
2. Optional: Pin GitHub Actions to immutable commit SHAs.
3. Optional: Move to a header-capable host/CDN if you want HTTP-level CSP, `nosniff`, and `frame-ancestors`.

## Suggested Verification

- Run `npm run check` after any code/config hardening change.
- Run `npm audit --omit=dev` and full `npm audit` before releases.
- After CSP changes, run `npm run build` and inspect `build/index.html` for `unsafe-inline`, `unsafe-eval`, and unresolved `__CONTENT_SECURITY_POLICY__`.
- After deploys, verify GitHub Actions and Pages are green and inspect live response headers.
