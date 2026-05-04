# Security Best Practices Report

## Executive Summary

This repository is a static React 19 + Vite portfolio deployed to GitHub Pages. The application has a strong baseline for its risk profile: no backend, no auth/session state, no forms, no client storage, no runtime API calls, no raw HTML rendering, no `eval`, and outbound links consistently use `rel="noopener noreferrer"`.

No critical or high-severity best-practice failures were found. The main recommendations are hardening items: avoid publishing source maps by default, move security headers to an edge/header-capable host if possible, tighten CSP over time, pin GitHub Actions more strictly, and add lint guardrails for future risky DOM/React patterns.

## Scope

- Language/framework: JavaScript, React 19, Vite.
- Runtime model: browser-only static SPA.
- Relevant guidance loaded:
  - `javascript-general-web-frontend-security.md`
  - `javascript-typescript-react-web-frontend-security.md`
- Backend guidance was not loaded because this repo does not contain a backend.

## Critical

None.

## High

None.

## Medium

None for the current static-site threat model.

## Low

### BP-1: Public source maps are enabled by default

- Rule ID: `REACT-CONFIG-001`
- Severity: Low
- Status: Fixed
- Location: `vite.config.js:11-14`
- Evidence:

```js
build: {
  outDir: "build",
  sourcemap: false,
},
```

- Impact: Public source maps could expose original source structure, comments, and future internal implementation details. The current repo is public and contains no secrets, so this was not a vulnerability, but it was a poor default if the project later adds private logic, internal URLs, feature flags, or non-public code.
- Fix: Public source map emission is now disabled by default.
- Mitigation: If source maps are needed for error reporting, upload them to a private error-reporting service rather than serving them from GitHub Pages.
- False positive notes: This was low risk because the repository source is already public.

### BP-2: Security headers are only partially visible in repository-controlled config

- Rule ID: `REACT-HEADERS-001`
- Severity: Low
- Location: `index.html:6-8`
- Evidence:

```html
<meta http-equiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; base-uri 'self'; form-action 'none'; object-src 'none'" />
<meta name="referrer" content="strict-origin-when-cross-origin" />
```

- Impact: The app has a CSP and referrer policy, but meta-delivered CSP cannot provide every header-level protection. In particular, clickjacking controls such as `frame-ancestors` must be set via HTTP headers, and `X-Content-Type-Options: nosniff` is not visible in this repo.
- Fix: If the site moves to a header-capable host or CDN, set CSP and related headers at the edge: `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, and `frame-ancestors 'none'` unless embedding is required.
- Mitigation: Keep the current early meta CSP as a GitHub Pages-compatible fallback and document that header-level protections depend on hosting.
- False positive notes: GitHub Pages may constrain custom response headers, so this may be an accepted platform limitation.

### BP-3: CSP still allows inline styles

- Rule ID: `REACT-CSP-001`
- Severity: Low
- Location: `index.html:6-7`, `src/components/NeuralCanvas.jsx:89-102`
- Evidence:

```html
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
```

```jsx
<canvas
  ref={canvasRef}
  className={className}
  style={{
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    borderRadius: "inherit",
    pointerEvents: "none",
  }}
  aria-hidden="true"
/>
```

- Impact: `style-src 'unsafe-inline'` is less dangerous than `script-src 'unsafe-inline'`, but it still weakens CSP and makes future style-injection mistakes harder to contain.
- Fix: Move inline styles into a CSS class, remove unused inline-style components if they are dead code, then test whether `style-src 'self' https://fonts.googleapis.com` works.
- Mitigation: Keep `script-src 'self'` strict and continue avoiding raw DOM/HTML sinks.
- False positive notes: The inline style component is not currently imported, so the immediate runtime risk appears very low.

### BP-4: GitHub Actions are pinned to version tags, not immutable SHAs

- Rule ID: CI supply-chain hardening
- Severity: Low
- Location: `.github/workflows/ci.yml:17-20`, `.github/workflows/deploy.yml:21-24`, `.github/workflows/deploy.yml:35-49`, `.github/workflows/codeql.yml:23-35`
- Evidence:

```yaml
uses: actions/checkout@v4
uses: actions/setup-node@v4
uses: actions/upload-pages-artifact@v3
uses: actions/deploy-pages@v4
uses: github/codeql-action/init@v3
uses: github/codeql-action/analyze@v3
```

- Impact: Major-version tags are standard and usually acceptable for small projects, but immutable SHA pinning gives stronger supply-chain integrity because the exact action code cannot move under the same tag.
- Fix: Pin each third-party action to a full commit SHA and use Dependabot to keep action pins updated.
- Mitigation: The repo already uses least-privilege workflow permissions and Dependabot for GitHub Actions updates, which reduces risk.
- False positive notes: This is a hardening recommendation, not evidence of a compromised workflow.

### BP-5: Manual `gh-pages` deploy path duplicates the GitHub Pages workflow

- Rule ID: deploy-path minimization
- Severity: Low
- Status: Fixed
- Location: `package.json:17-30`
- Evidence:

```json
"check": "npm run lint && npm run test && npm run build"
```

- Impact: The repository already deploys through GitHub Actions with scoped Pages permissions. Keeping a separate local publish path increased the chance of accidental manual deployment from an unreviewed local build.
- Fix: The `deploy` script and `gh-pages` development dependency have been removed; deployment now flows through `.github/workflows/deploy.yml`.
- Mitigation: Continue using the workflow in `.github/workflows/deploy.yml` as the normal release path.
- False positive notes: If local deployment is reintroduced later, document the intended operator path and required review checks.

## Informational / Positive Controls

### BP-6: React rendering uses safe defaults

- Location: `src/components/Portfolio/index.jsx:45-58`, `src/components/Contact/index.jsx:18-30`, `src/components/Footer/index.jsx:15-23`
- Evidence: Project and social data are rendered through JSX text/attributes, and blank-target links include `rel="noopener noreferrer"`.
- Note: This aligns with React guidance to rely on escaping-by-default and avoid raw HTML escape hatches.

### BP-7: Hash routing is allowlisted

- Location: `src/App.jsx:16-18`, `src/App.jsx:36-61`, `src/App.jsx:80-98`
- Evidence: `window.location.hash` is normalized and matched against the fixed `sections` list before state changes or rendering.
- Note: This is a good pattern for client-side routing because unrecognized hash values are not rendered as markup or used as open redirects.

### BP-8: CI and dependency governance are already strong for repo size

- Location: `.github/workflows/ci.yml:9-35`, `.github/workflows/codeql.yml:11-37`, `.github/dependabot.yml:1-40`
- Evidence: CI uses read-only contents permission, CodeQL runs on push/PR/schedule, and Dependabot covers npm plus GitHub Actions.
- Note: This is a solid baseline; SHA pinning would improve it further.

## Recommended Fix Order

1. BP-3: Move inline styles to CSS and tighten `style-src`.
2. BP-4: Pin GitHub Actions to immutable SHAs.
3. BP-2: Add edge/header-level security headers if the hosting platform supports them.

## Suggested Verification

- Run `npm run check` after any code/config hardening change.
- After CSP changes, run `npm run build` and manually load the built site or preview server to check browser console CSP violations.
- After workflow hardening, verify GitHub Actions still runs CI, CodeQL, Dependabot, and Pages deployment successfully.
