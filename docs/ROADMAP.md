# Portfolio Maintenance

_Last audited: 2026-08-11_

The dark editorial direction is settled. The repository is in maintenance mode: keep the content accurate, dependencies current, and release evidence reproducible.

## Current State

- Four featured projects, each with a live demo and source repository.
- Hash-routed About, Portfolio, Knowledge, and Contact sections.
- React 19, Vite 8, Vitest 4, ESLint 9, and Prettier 3.
- CI and deployment share `npm run check` as the quality gate.
- CodeQL and Dependabot cover source, npm, and GitHub Actions updates.
- Production CSP excludes `unsafe-inline` and `unsafe-eval`.
- Visual smoke covers four routes at 320px, 360px, 390px, and 1440px.
- Every section reads off one left axis; alignment is set once on the panel rule.
- The hero entrance is the only orchestrated motion on the site — keep it that way.

## Maintenance Cadence

- **Before release:** `npm run check`, full `npm audit`, and `npm run visual:smoke`.
- **Quarterly:** verify every demo, repository, social, and credential link.
- **After visible changes:** run `npm run screenshot:readme` to refresh both showcase images.
- **When dependencies change:** review the lockfile diff and keep GitHub Actions pinned to immutable SHAs.

## Deferred Deliberately

- Light mode: the dark-only presentation is intentional.
- Blog or case-study CMS: add only when there is strong content to publish.
- Static generation: adopt only if measured SEO or first-paint data justifies it.
- Browser smoke in CI: keep local until regression frequency justifies the runtime cost.
- More projects: quality takes precedence over inventory size.

## Verification

```bash
npm run check
npm audit
npm audit --omit=dev
npm run visual:smoke
```

See [security-review.md](security-review.md) for the latest audit evidence and remaining hosting limitation.
