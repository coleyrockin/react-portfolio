# Showcase and Security Audit

_Last verified: 2026-07-21_

## Executive Summary

This repository is a static React 19 and Vite portfolio deployed to GitHub Pages. No open critical, high, or medium application-security findings were found for its current threat model. The audit fixed development-tool advisories, removed an unnecessary production CSP relaxation, pinned GitHub Actions to immutable commits, and corrected stale public documentation and preview content.

The remaining low-severity limitation is imposed by GitHub Pages: it cannot configure project-specific HTTP response headers. The app therefore uses an early meta-delivered CSP and referrer policy, while header-only controls remain unavailable on the current host.

## Scope

- Application source, tests, data modules, static assets, and build configuration.
- npm dependency tree and lockfile.
- CI, CodeQL, Dependabot, and GitHub Pages deployment workflows.
- README, maintenance documentation, metadata, and showcase images.
- Production rendering at four viewports across all four hash routes.
- Live portfolio, demo, repository, social, and credential links.

The app has no backend, authentication, session state, form submission, runtime API calls, service worker, or browser storage.

## Findings Resolved

### Development dependency advisories

The baseline full `npm audit` reported three high-severity advisories through development tooling: `brace-expansion`, `js-yaml`, and `undici`. Updating packages within the existing semver ranges refreshed the lockfile and cleared all three without adding dependencies or changing the public API.

### Production CSP relaxation

The production `style-src` allowed `'unsafe-inline'` even though the built app emits a stylesheet and does not use inline style attributes. The Vite config now allows inline styles only while serving the development environment. Production excludes both `'unsafe-inline'` and `'unsafe-eval'`, and the visual smoke gate enforces that invariant.

### GitHub Actions supply-chain hardening

All third-party Actions are pinned to full commit SHAs, with version comments retained for readability. Dependabot remains configured to update GitHub Actions weekly. Workflow permissions remain least-privilege, and CI plus deployment both call the repository's shared `npm run check` gate.

### Stale showcase claims and assets

The README and roadmap described five projects, 36 tests, 12 visual scenarios, stale performance guarantees, and mutable Action tags. They now match the four-project app, 38-test suite, 16-scenario browser smoke, current security posture, and maintenance workflow. The README and social preview generation script now refreshes both images from the production build.

## Verification Evidence

- `npm run check`: repository-wide Prettier check, ESLint, 38 Vitest tests, and production build passed.
- `npm audit`: 0 vulnerabilities.
- `npm audit --omit=dev`: 0 vulnerabilities.
- `npm run visual:smoke`: 16 route and viewport scenarios passed at 320x720, 360x780, 390x844, and 1440x1000.
- Browser checks found no horizontal overflow, missing image alt text, missing route headings, CSP regression, console error, or page error.
- Static scans found no `dangerouslySetInnerHTML`, `eval`, dynamic script injection, unsafe hash navigation, credentialed fetch, storage, `postMessage`, service worker, or committed secret pattern.
- The live portfolio, four demos, four source repositories, GitHub profile, and Credly badge returned successful HTTP responses. LinkedIn returned its automated-request block status (`999`), so only the rendered target URL was verified.

## Positive Controls

- React JSX text and attribute escaping; no raw HTML rendering.
- Allowlisted hash routing against the four known section identifiers.
- External links use `rel="noopener noreferrer"`.
- Production source maps are disabled.
- Fonts and images are self-hosted; the runtime has no third-party script dependency.
- Early meta CSP includes same-origin defaults, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'`, and HTTPS upgrades.
- CI uses `npm ci`, scoped permissions, CodeQL, and Dependabot.
- Automated `axe-core` coverage, keyboard navigation tests, reduced-motion handling, and visible focus styles.

## Remaining Low-Severity Limitation

### GitHub Pages response headers

A meta CSP cannot enforce header-only directives such as `frame-ancestors`, and GitHub Pages does not support custom project response headers such as `X-Content-Type-Options` or `Permissions-Policy`.

If the site moves to a header-capable host, configure CSP and security headers at the edge, including `frame-ancestors 'none'` unless embedding is required. On GitHub Pages, the current meta policy is the practical ceiling for this static, state-free site.

## Release Checklist

```bash
npm run check
npm audit
npm audit --omit=dev
npm run visual:smoke
npm run screenshot:readme
```

Recheck external links after content changes and inspect the deployed GitHub Actions run after every release.
