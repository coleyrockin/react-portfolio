# Roadmap

Planned improvements and feature ideas for this portfolio. Items are loosely prioritized from top to bottom within each section.

---

## Near-Term

- [ ] **Add README screenshot** — Capture a 1280×800 screenshot of the About section and save to `docs/screenshot.png`
- [ ] **Contact form** — Add an email contact form using [EmailJS](https://www.emailjs.com/) or [Formspree](https://formspree.io/) so visitors can reach out without leaving the site
- [ ] **Dark/light mode toggle** — Add a theme switcher that respects `prefers-color-scheme` by default and allows manual override

---

## Medium-Term

- [ ] **Project detail modals** — Expand project cards with a modal or overlay that shows full descriptions, screenshots, and key technical decisions
- [ ] **GitHub stats integration** — Pull live language usage or contribution activity from the GitHub API and display it in the Knowledge section
- [ ] **Image optimization** — Convert project preview images to WebP with responsive `srcset` for faster load times
- [ ] **Automated accessibility audit** — Add `axe-core` or `jest-axe` to the test suite to catch regressions

---

## Long-Term / Exploratory

- [ ] **Blog or writing section** — Add a section for technical writing, case studies, or dev notes
- [ ] **Project filtering** — Allow visitors to filter the Portfolio section by tag or technology
- [ ] **Animated hero** — Add a subtle animated intro or scroll-triggered reveal for the About section
- [ ] **Analytics** — Add privacy-respecting analytics (e.g., [Plausible](https://plausible.io/)) to understand visitor traffic

---

## Completed

- [x] Hash-based routing with browser history support
- [x] Responsive glassmorphism navigation
- [x] Data-driven project cards with image fallbacks
- [x] Language map and capability pillars
- [x] Certifications and AI experience sections
- [x] PWA manifest, favicons, OG/Twitter meta tags
- [x] `prefers-reduced-motion` animation support
- [x] GitHub Pages deployment pipeline
