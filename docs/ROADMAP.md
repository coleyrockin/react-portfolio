# Portfolio Roadmap — Post-Audit

Rebuilt after full code audit on 2026-05-09. Previous roadmap superseded.

---

## Phase 1 — CSS Cleanup *(~20 min, zero visual risk)*

Dead rules, duplicate declarations, and browser-compat gaps. Ship as one commit.

### 1.1 — Merge duplicate `.footer-shell` and `.footer-copy` declarations
**Problem:** Both classes are declared twice — once in the base layer, once in the "editorial polish" layer. The second block partially overrides the first, making both fragile to edit.
**Fix:** Merge into single canonical declarations.
**Files:** `src/editorial.css`

### 1.2 — Remove dead CSS classes
**Problem:** Four rules in the file reference classes that no component uses:
- `.language-tier-legend` (replaced by `.language-tier-key`)
- `.cta-link:focus-visible` (no `.cta-link` element exists)
- `.brand-kicker` (not rendered in `Nav`)
- `.project-grid--symmetrical .reveal:last-child { grid-column: auto; display: block }` (browser defaults, no effect)
**Fix:** Delete all four.
**Files:** `src/editorial.css`

### 1.3 — Remove duplicate `.project-content .project-category + h3` rule
**Problem:** Selector written twice — `margin-top: 0.25rem` then `margin-top: 0.2rem`. Second silently wins.
**Fix:** Delete the first instance.
**Files:** `src/editorial.css`

### 1.4 — Merge the two `@media (hover: hover)` blocks for `.hero-cta`
**Problem:** Arrow animation (`::after`) and hover transform/shadow live in two separate identical media query blocks.
**Fix:** Combine into one block.
**Files:** `src/editorial.css`

### 1.5 — Wrap `.social-card:hover` in hover media query
**Problem:** `.social-card:hover` is the only hover rule not wrapped in `@media (hover: hover) and (pointer: fine)`. On touch devices the card gets stuck in hover state after a tap.
**Fix:** Wrap it.
**Files:** `src/editorial.css`

### 1.6 — Add `-webkit-mask-image` to `body::before`
**Problem:** The grid overlay uses `mask-image` without `-webkit-mask-image`. Safari requires the prefix — the subtle background grid is invisible in Safari.
**Fix:** Add the prefixed property alongside the unprefixed one.
**Files:** `src/editorial.css`

---

## Phase 2 — Hero Layout Elevation *(~45 min, highest visual impact)*

### 2.1 — Two-column hero at ≥900px
**Problem:** Photo and name are stacked on all screen sizes. At 1400px, the portrait stays small and the horizontal space goes unused.
**Fix:** At `min-width: 900px`, switch `.hero-grid` to a 2-column layout — photo right, name/copy left. Keep the existing stacked layout at <900px.
**Files:** `src/editorial.css`

### 2.2 — Increase featured card image height
**Problem:** Featured card `min-height: 420px` but image area is `minmax(225px, 0.9fr)`. Tall content compresses the image to near its minimum — short for the headline full-width card.
**Fix:** Change featured card image area to `minmax(320px, 0.9fr)`.
**Files:** `src/editorial.css`

### 2.3 — Add `text-decoration: none` to `.project-image-link`
**Problem:** No explicit `text-decoration: none`. If an image fails and the fallback text renders, some browsers show an underline on the link wrapper.
**Fix:** One line.
**Files:** `src/editorial.css`

---

## Phase 3 — Interaction & Motion *(~30 min)*

### 3.1 — Section exit animation
**Problem:** Switching sections cuts instantly — `sectionIn` animates the entry but there's no exit. The abrupt swap breaks the editorial pacing.
**Fix:** In `App.jsx`, apply a brief exit class (`sectionOut`: `opacity: 0, translateY(-8px)` over ~180ms) to the leaving section before swapping state. Trigger entry after a short timeout or `animationend` listener.
**Files:** `src/App.jsx`, `src/editorial.css`

### 3.2 — Flip CTA order on featured cards
**Problem:** "View Repository" and "Live Demo" have the same visual weight. On featured cards the demo is the more compelling action but sits second.
**Fix:** On featured cards, render Demo CTA first (gold-filled primary), Repo second (ghost). Standard cards unchanged.
**Files:** `src/components/Portfolio/index.jsx`

### 3.3 — Focus ring for active vs focused nav links
**Problem:** No visual distinction between a nav link that is active vs one that is merely focused by keyboard. A keyboard user tabbing through the nav can't tell which state they're in.
**Fix:** Add a distinct `box-shadow` inset to `.section-link.is-active:focus-visible` so it differs from the plain `.section-link:focus-visible` ring.
**Files:** `src/editorial.css`

---

## Phase 4 — Performance & Compatibility *(~15 min)*

### 4.1 — Move Google Fonts from CSS `@import` to HTML `<link>`
**Problem:** `@import` in CSS is render-blocking — the browser can't discover the font request until it parses the stylesheet. `index.html` already has the preconnect hints but the font stylesheet load is delayed.
**Fix:** Delete the `@import` from `editorial.css`. Add `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?...&display=swap">` in `index.html` after the preconnect links.
**Files:** `src/editorial.css`, `index.html`

### 4.2 — Delete unused image assets
**Problem:** `src/assets/images/MeBGrm.webp` and `src/assets/images/boyd-roberts-headshot.png` are not imported by any component and are dead build weight. The `.webp` headshot replaces the `.png`.
**Fix:** Delete both.
**Files:** `src/assets/images/`

---

## Phase 5 — Accessibility & Content *(~30 min)*

### 5.1 — Screen-reader-friendly hero meta line
**Problem:** "5 SHIPPED PROJECTS • DALLAS, TX • OPEN TO ENGINEERING ROLES" — screen readers announce `•` as "bullet", making it choppy. The dots are visual-only separators.
**Fix:** Add `aria-label="5 shipped projects, Dallas TX, open to engineering roles"` to the meta paragraph. Visual output unchanged.
**Files:** `src/components/About/index.jsx`

### 5.2 — Remove redundant `aria-label` on social cards
**Problem:** `aria-label={profile.name}` overrides the card's visible content and announces just "Email", "LinkedIn", "GitHub" — not useful. The visible `.social-name` + `.social-handle` content is already accessible.
**Fix:** Remove the `aria-label` prop. Let visible content speak.
**Files:** `src/components/Contact/index.jsx`

### 5.3 — Elevate AI experience section
**Problem:** The AI experience panel is the last item in Knowledge — three bullets most visitors never reach. Given that AI tooling is central to Boyd's workflow and differentiates him, it deserves more visibility.
**Fix:** Move the AI experience panel above Certifications. Add a kicker label (`AI-ACCELERATED WORK`) to match the editorial heading pattern.
**Files:** `src/components/Resume/index.jsx`, `src/editorial.css`

### 5.4 — Hero tagline rewrite
**Problem:** "I build production-grade web products with React, TypeScript, Node.js, Java, and Python." leads with a tech list rather than delivered value. The language list belongs in Knowledge.
**Fix:** Rewrite to lead with outcome: e.g. "I turn product ideas into production-ready software — interactive UIs, backend systems, and AI-accelerated workflows." (exact copy TBD)
**Files:** `src/components/About/index.jsx`

---

## Out of Scope

- CSS file split — 1250 lines is manageable as-is; component CSS files add tooling complexity for no gain at this scale.
- Light mode — dark-only is intentional.
- More projects — 5 is right; padding the grid dilutes it.
- Blog / writing — no compelling content yet.
- Custom domain — not a priority.

---

## Priority Order

| Phase | Items | Est. | Risk |
|---|---|---|---|
| 1 — CSS Cleanup | 6 | ~20 min | None |
| 4 — Performance | 2 | ~15 min | Very low |
| 2 — Hero Elevation | 3 | ~45 min | Low |
| 5 — Content | 4 | ~30 min | Low |
| 3 — Interaction | 3 | ~30 min | Medium |

**Recommended order:** 1 → 4 → 2 → 5 → 3
