# Portfolio Roadmap

_Last audited: 2026-05-21_

The site is intentionally a dark editorial portfolio, not a generic app shell. Design direction is settled. Remaining work is finish polish, content accuracy, and maintainability.

---

## Shipped

- **2026-05-21 — Editorial language across Portfolio + Knowledge** (`aed8c59`): Faded gold italic numerals (01–05) on all project cards with featured/lead variant. Featured + lead cards now lift -6px on hover with stronger gold border. Section eyebrow numerals converted to gold italic serif pills (Instrument Serif) consistent with hero name. Hairline gold dividers between Knowledge sub-panels (Capability Grid → AI Work → Certifications).
- **2026-05-20 — Cinematic hero + About redesign** (`cbbd4cc`): Hero name pushed to `clamp(4.5rem, 12vw, 10rem)` / `-0.035em` tracking. Headshot halo strengthened + outer ambient glow added. Tech badges replaced with monochrome gold icon row (React, Next.js, Node.js, AI, Central Texas). Highlight tiles converted to 1.7fr/1fr asymmetric grid with huge faded background numerals.
- **2026-05-20 — a11y parity** (`0a20e0b`): AI-Accelerated Work and Certifications sections now carry `aria-label` matching Engineering Capabilities.
- CSS cleanup: duplicate/dead rules removed, hover-only states guarded for pointer devices, Safari mask support.
- Performance cleanup: Google Fonts load from `index.html`, production source maps disabled, unused local assets pruned.
- Portfolio polish: featured case study marker, larger featured image area, demo-first CTA order.
- Recruiter polish: hero proof chips, compact project metrics, location language, 360px visual smoke coverage.
- Knowledge polish: language tier key, AI work elevated above certifications.
- Accessibility cleanup: skip link, labelled regions, semantic landmarks, reduced-motion handling, focus management.
- CI + deploy: separate quality (`ci.yml`) and deployment (`deploy.yml`) workflows, CodeQL scanning.
- Visual QA: `npm run visual:smoke` covers desktop / mobile / narrow × 4 routes.

---

## Bugs & Visual Issues (fix first)

### 1. Contact section dead zone
**Critical visual bug.** Desktop Contact has ~350px of empty black below the 3 social cards before the footer. The panel is not vertically balanced — content sits near the top, footer is far below, and the void dominates. Feels abandoned.

**File:** `src/editorial.css` — `.contact-panel` padding/min-height rules.
**Fix:** Remove or reduce `min-height` on `.contact-panel`. Let the section height come naturally from content. Alternatively, add a horizontal hairline + brief availability note ("Open to full-time and contract opportunities") above the footer to anchor the space.

---

## Visual Polish (next session)

### 2. Contact copy scope
"For engineering opportunities, reach me directly…" is passive. Doesn't say: full-time? contract? advisory?
**File:** `src/components/Contact/index.jsx` line 11.
**Fix:** "For full-time, contract, or advisory opportunities — reach me directly by email, LinkedIn, or GitHub."

### 3. Screenshot + social preview assets are stale
`docs/screenshot.png` and `public/images/social-preview.png` reflect the pre-cinematic-hero About layout. The OG preview card shown when someone shares the link is outdated.
**Fix:** Take fresh screenshots of the current About route at 1200×630 (OG spec) and replace both files. Commit as `chore: refresh social preview and README screenshot`.

### 4. Project category labels — two are weak
- CherryTree: "Interactive Motion Experience" → doesn't signal technical depth. Could be "3D WebGL Performance & Animation" or "WebGL / Three.js Animation Showcase".
- WestWardRPG: "Polyglot Browser Game Engine" → novelty label that doesn't communicate capability. Could be "Multi-Language Browser Game Engine" or just drop the "Polyglot" jargon.
**File:** `src/data/projects.js` — `category` fields.

### 5. Certifications + project link validation
Quarterly sanity check: Credly badge URL, Baylor PDF path, and all 5 project demo/repo URLs.
**Commands:** `curl -I <url>` for each externally linked URL in `src/data/projects.js` and `src/data/languages.js`.

---

## Maintenance & Credibility

### 6. README performance metrics lack dates
Lines reporting "Lighthouse Performance 91 / LCP 2.9s" have no timestamp. Stale metrics undermine recruiter trust.
**Fix:** Add `(measured 2026-05-21 against production build)` inline. Re-run Lighthouse on `npm run preview` whenever dependencies bump.

### 7. CSS has no rule navigator
`src/editorial.css` is 1600+ lines with 195+ selectors and no section comments. Finding a rule requires grep or memory.
**Fix:** Add a ~20-line comment block at the top:
```css
/* ─── TABLE OF CONTENTS ──────────────────────────────────────
   01. Custom Properties & Tokens
   02. Reset + Base
   03. Layout Shells (nav, main, footer)
   04. Hero & About Panel
   05. Portfolio Cards & Grid
   06. Knowledge Grid & Sub-panels
   07. Contact Social Grid
   08. Shared: Cards, Chips, Buttons, Links
   09. Responsive Breakpoints
   10. Animation, Motion, Reveal
   ─────────────────────────────────────────────────────────── */
```
No refactoring — just navigation aid.

### 8. Bundle size undocumented
225 KB JS / ~73 KB gzipped is fine for React 19 + react-icons + Vite runtime, but nothing says that in docs. A maintainer might flag it unnecessarily.
**Fix:** Add one line to README Performance section: "JS bundle: 226 KB min / 73 KB gzip (React 19 + react-icons + Vite runtime)."

### 9. JSON-LD schema missing workLocation
`index.html` schema has `jobTitle`, `alumniOf`, `sameAs` but no `workLocation`.
**Fix:** Add `"workLocation": { "@type": "Place", "name": "Central Texas, USA" }` to the Person schema block.

---

## Deferred (conscious decisions)

- **Light mode:** Dark-only is the design direction. Not planned.
- **More projects:** 5 strong projects is better than padded inventory. Add only when a new build is worth showcasing.
- **Blog/writing:** Defer until there's strong content to put there.
- **Custom domain:** Optional brand polish; not a code quality need.
- **Static pre-rendering / SSG:** Only if SEO or first-paint becomes a measurable problem.
- **Visual smoke in CI:** Manual-only until regressions become frequent enough to justify browser runtime in CI.
- **GitHub Action SHA-pinning:** Worth doing eventually; not urgent for a static portfolio with no secrets in workflows.
- **Hero ambient orb:** Single soft radial gradient behind hero copy — nice but low-impact after the halo work already shipped.

---

## Verification commands

```bash
npm run lint          # must be clean
npm test              # 12/12 must pass
npm run build         # must succeed
npm run visual:smoke  # 12 screenshots, all routes × 3 viewports
```

## Historical handoffs

- `docs/HANDOFF-2026-05-20.md` — May 20 session context (cinematic hero, a11y parity)
