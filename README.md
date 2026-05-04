# Boyd Roberts — Developer Portfolio

[![CI](https://github.com/coleyrockin/react-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/coleyrockin/react-portfolio/actions/workflows/ci.yml)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat&logo=vite&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-4-6E9F18?style=flat&logo=vitest&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-9-4B32C3?style=flat&logo=eslint&logoColor=white)
![Lighthouse Perf](https://img.shields.io/badge/Lighthouse_Perf-91-brightgreen?style=flat&logo=lighthouse&logoColor=white)
![Lighthouse A11y](https://img.shields.io/badge/Lighthouse_A11y-100-brightgreen?style=flat&logo=lighthouse&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow?style=flat)

**Live Site:** [coleyrockin.github.io/react-portfolio](https://coleyrockin.github.io/react-portfolio/)

> Single-page React 19 portfolio — migrated from Create React App to Vite,
> CI-enforced quality gates (lint + test + build), strict CSP, WCAG-aware
> component tree, and **0 npm advisories**. Lighthouse: **91 / 100 / 100 / 100**.

---

![Portfolio home preview](docs/screenshot.png)

---

## About

A single-page developer portfolio built with React 19 and Vite.

Highlights selected engineering work, language breadth, certifications, and AI workflow experience — with hash-based deep linking, an editorial portrait hero, mobile-first responsive layout, and an accessibility-conscious component tree.

## Features

- **Hash-based routing** — deep-linkable sections with full browser back/forward support
- **Editorial portrait hero** — optimized headshot treatment with credential badges and direct work/contact CTAs
- **Dark editorial design system** — ink, gold, and muted neutral tokens with serif display type and restrained motion
- **Responsive from 320px up** — mobile-first layout with a fluid `clamp()` type scale
- **Accessibility-first** — skip link, `aria-current` nav, reduced-motion support, keyboard focus management, semantic landmarks, descriptive alt text
- **Data-driven content** — projects, languages, certifications, and social links centralized in `src/data/*`
- **PWA-ready** — web app manifest, themed favicons, OG/Twitter meta, JSON-LD `Person` schema
- **CI/CD** — GitHub Actions runs lint + test + build on every push; separate workflow deploys to GitHub Pages

## Performance & Accessibility

Measured with Lighthouse 12 against the production build (`npm run preview`):

| Category | Score |
|---|---|
| Performance | **91** |
| Accessibility | **100** |
| Best Practices | **100** |
| SEO | **100** |

Key Web Vitals: **LCP 2.9 s · CLS 0 · TBT 0 ms**. Hero photo ships as a 25 KB WebP (down from 353 KB PNG). Non-hero images carry `loading="lazy"`; the hero photo uses `fetchPriority="high"` and explicit dimensions to front-load the LCP element.

Deliberate accessibility choices, verified in `App.test.jsx`:

- Skip link to `#main-content` as the first focusable element
- `aria-current="page"` on the active section button; focus moves to `<main>` on navigation
- Semantic landmarks (`<header>`, `<nav>`, `<main>`, `<footer>`) with labelled regions
- `prefers-reduced-motion` short-circuits reveal transitions
- No divs-as-buttons; every interactive control is a real `<button>` or `<a>`

## Testing

12 integration tests cover:

- Default section (About) renders and URL hash normalizes to `#about`
- Hash-based section navigation (Portfolio, Contact, Knowledge)
- Deep-linking from a URL hash on first render
- Portfolio: five project cards + repository action links match the data module
- About: credential badges remain the only credential link surface
- Contact / Footer: social links render from the same single source of truth
- Skip link exists and points at `#main-content`
- Skip-link hash change does not reset the active section

Run with `npm test` (Vitest + jsdom + Testing Library).

## Security

- Strict production `Content-Security-Policy` meta tag: `default-src 'self'`, scripts same-origin only, fonts pinned to Google, no inline executable scripts, no inline style allowance, no form exfil, no object embeds
- `Referrer-Policy: strict-origin-when-cross-origin`
- Least-privilege GitHub Actions (`contents: read` on CI; `pages: write` / `id-token: write` scoped only to the deploy job)
- All outbound links include `rel="noopener noreferrer"`
- Hash routing is a whitelist match against a known section list — no `innerHTML`, `eval`, or dynamic HTML anywhere
- `npm audit`: **0 vulnerabilities**

## Tech Stack

| Category | Technologies |
|---|---|
| **Frontend** | React 19, JavaScript (ES2022), plain CSS |
| **Icons** | React Icons 5 |
| **Build** | Vite 8, `@vitejs/plugin-react` |
| **Testing** | Vitest 4, Testing Library (React 16, user-event 14), jest-dom 6, jsdom |
| **Linting** | ESLint 9 (flat config), `eslint-plugin-react`, `eslint-plugin-react-hooks`, `eslint-plugin-jsx-a11y` |
| **Formatting** | Prettier 3 |
| **CI/CD** | GitHub Actions (CI + Pages deploy) |
| **Deployment** | GitHub Pages |

## Getting Started

```bash
# Clone
git clone https://github.com/coleyrockin/react-portfolio.git
cd react-portfolio

# Install
npm install

# Start dev server at http://localhost:3000
npm run dev
```

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build to `build/` |
| `npm run preview` | Preview the production build locally |
| `npm test` | Run the Vitest suite once |
| `npm run test:watch` | Run Vitest in watch mode |
| `npm run lint` | Lint `src/` with ESLint |
| `npm run lint:fix` | Lint and auto-fix |
| `npm run format` | Format `src/` with Prettier |
| `npm run check` | Lint + test + build (full CI pipeline) |

<details>
<summary><strong>Project Structure</strong></summary>

```
react-portfolio/
├── .github/workflows/    # CI + GitHub Pages deploy
├── public/               # Static assets, manifest, favicons, certificates
├── src/
│   ├── components/       # About, Portfolio, Contact, Resume, Nav, Footer, RevealItem
│   ├── data/             # projects, languages, socialLinks, iconMap
│   ├── hooks/            # useInViewport (IntersectionObserver w/ reduced-motion guard)
│   ├── App.jsx           # Hash-routed shell
│   ├── App.test.jsx      # Integration tests
│   ├── index.jsx         # Entry point (React 19 createRoot)
│   └── editorial.css     # Global styles + editorial design tokens
├── index.html            # Vite entry HTML
├── vite.config.js        # Build config (base: /react-portfolio/)
├── vitest.config.js      # Test env (jsdom + setupTests)
└── eslint.config.js      # ESLint flat config
```

</details>

## What this demonstrates

- Migrating a mature Create React App project to Vite + React 19 + Vitest without dropping a single test
- Accessibility-conscious React (skip link, reduced-motion, semantic landmarks, keyboard-friendly nav)
- Data-driven portfolio content with reusable section components and centralized link sources
- CI-enforced quality gates (lint + test + build) before any deploy, plus a strict production content-security policy
- Measurable results: Lighthouse **91 / 100 / 100 / 100** with LCP under 3 seconds

## What I'd do next

- Split `App.test.jsx` into per-component test files and add Playwright visual regression against the live preview URL
- Pre-render the static shell with `vite-plugin-ssg` or similar for near-instant FCP
- Add a `srcset` for the hero photo (480 / 960 / 1440) and a blurhash placeholder to cut LCP further
- Migrate content modules (`src/data/*`) to MDX so project case studies can include inline diagrams and code

## License

MIT © Boyd Roberts
