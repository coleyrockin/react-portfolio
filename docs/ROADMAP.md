# Portfolio Visual Roadmap

A prioritized fix list from the May 2026 visual audit. Items are grouped by phase, each scoped to ship in a single focused commit.

**Goal:** push the editorial-luxury aesthetic from "very good" to "would impress a senior design hire at a top product company." No rewrites — every fix is surgical.

---

## Phase 1 — High-impact polish *(ship together, ~30 min total)*

These are the three changes that lift the perceived quality of the whole site.

### 1.1 — Resolve the duplicated credential CTAs in About
**Problem:** "View SMU Developer Credential" / "View Baylor Java + Python Certificate" text buttons sit directly above the same two badge images, both linking to the same URLs. The bright SMU/Baylor logos also break the dark luxury palette — they read as clip art.

**Fix:** Drop the text-button row entirely. Keep the two badges as the link surface, but tone them down:
- Wrap each in a circular dark-tinted frame with a thin gold hairline
- Apply `filter: grayscale(0.6) brightness(0.85)`
- Restore color on hover (`filter: none; transition: filter 240ms ease`)

**Files:** `src/components/About/index.jsx`, `src/editorial.css`
**Acceptance:** No duplicate CTA text. Badges read as muted artifacts at rest, snap to color on hover. No broken links.

### 1.2 — Tighten the hero photo → name vertical rhythm
**Problem:** A perceptible gap between the bottom-fade of the headshot and the top of "Boyd Roberts." On mobile the name floats untethered from the portrait.

**Fix:** Reduce the `gap` on `.hero-grid` from `22px` → `clamp(8px, 1.5vw, 14px)`. The mask already does the soft handoff; closing the literal gap completes the illusion that the name is rising out of the same darkness as the photo.

**Files:** `src/editorial.css`
**Acceptance:** No visible empty band between photo fade-out and name. Spacing scales smoothly mobile → desktop.

### 1.3 — Give the footer room to breathe
**Problem:** "© 2026 Boyd Roberts" + 3 social icons all jammed onto one line, hugging the right edge. Looks cramped at 1440px.

**Fix:** Stack the footer vertically — copy on top row centered, icons in their own row below. Keep the single-line layout only at >1100px viewports if desired.

**Files:** `src/components/Footer/index.jsx`, `src/editorial.css`
**Acceptance:** Footer reads as a deliberate composition, not a leftover row.

---

## Phase 2 — Editorial weight *(ship as one polish pass, ~45 min)*

These add the small ornaments that make a portfolio feel like a magazine spread instead of a template.

### 2.1 — Add visual anchors to section headers
**Problem:** "Selected Work" / "Engineering Knowledge" / "Contact" titles float without context. A serif heading + plain subtitle is functional but undifferentiated.

**Fix:** Add an editorial kicker above each section title — small caps gold text:
- About: `THE PERSON` (or `01 — INTRODUCTION`)
- Portfolio: `02 — SELECTED WORK · 5 PROJECTS`
- Knowledge: `03 — ENGINEERING DEPTH`
- Contact: `04 — REACH OUT`

**Files:** `src/components/About/index.jsx`, `Portfolio/index.jsx`, `Resume/index.jsx`, `Contact/index.jsx`, `src/editorial.css`
**Acceptance:** Each section opens with a consistent kicker → title → subtitle pattern. Numbers tie the four sections into a coherent narrative.

### 2.2 — Mark the featured project visually
**Problem:** The World Asset Prices card spans full width but is otherwise styled identically to the others. Hierarchy is ambiguous.

**Fix:** Add a `FEATURED CASE STUDY` kicker above the project category for the featured card. Optionally swap its CTA buttons for slightly larger versions (gold-filled "VIEW LIVE DEMO" as primary, ghost "REPOSITORY" as secondary).

**Files:** `src/components/Portfolio/index.jsx`, `src/editorial.css`
**Acceptance:** Featured card is unmistakable as the headline project, not just a wider rectangle.

### 2.3 — Upgrade the highlight cards (Core Stack / Focus / GitHub)
**Problem:** Just label + sentence inside a flat rectangle. Reads like a contact form.

**Fix:** Each card gets a small numbered kicker (`01` / `02` / `03`) in gold at the top-left, plus a thin gold hairline above the heading. Bump internal padding and tighten typography so the cards feel like content, not containers.

**Files:** `src/components/About/index.jsx`, `src/editorial.css`
**Acceptance:** Each highlight reads as a deliberate editorial card, not a div with text.

### 2.4 — Replace the tier-legend pills with a sentence-key
**Problem:** Three gold pills (Primary / Proficient / Familiar) floating in a row look like form chips, not a legend.

**Fix:** Convert to a single small-caps line: `● PRIMARY    ◐ PROFICIENT    ○ FAMILIAR` with the dots in gold and the labels in muted ink. More elegant, more editorial.

**Files:** `src/components/Resume/index.jsx`, `src/editorial.css`
**Acceptance:** Legend reads as a typographic key, not a UI control.

---

## Phase 3 — Quiet refinements *(optional, ship one at a time)*

### 3.1 — Unify project card image treatments
**Problem:** Five projects, five wildly different image styles (dark phone mock, pale editorial poster, low-res game still, packshot with overlay, dashboard screenshot). Grid feels like a stock-photo collage.

**Fix:** Add a consistent top-edge gradient overlay (`linear-gradient(180deg, rgba(0,0,0,0.35), transparent 30%)`) across all `.project-image` elements. Subtle but unifies the grid as a series.

**Files:** `src/editorial.css`
**Acceptance:** All five card images share a common atmospheric treatment without losing the screenshot's recognizability.

### 3.2 — Strengthen section divider hairlines
**Problem:** The `linear-gradient(transparent, line-strong, transparent)` rule above each panel is barely perceptible.

**Fix:** Bump opacity from current to ~30% and lengthen from 72px to 96px. Add a tiny center ornament (small gold circle or slash) to mark transitions.

**Files:** `src/editorial.css`
**Acceptance:** Divider is felt, not searched for.

### 3.3 — Hero meta-line line-break control
**Problem:** "5 SHIPPED PROJECTS · DALLAS, TX · OPEN TO ENGINEERING ROLES" wraps awkwardly on mobile (`TX` hangs alone).

**Fix:** Use `&nbsp;` between `DALLAS,` and `TX`, or split the meta into two stacked lines on mobile.

**Files:** `src/components/About/index.jsx`
**Acceptance:** No orphan words on any breakpoint 320px → 1920px.

### 3.4 — Hero CTAs slightly more generous
**Problem:** "VIEW WORK" / "GET IN TOUCH" buttons feel cramped at the current 0.78rem font + 0.66rem padding.

**Fix:** Bump padding to `0.78rem 1.25rem`. Optionally add an arrow glyph (`→`) that animates on hover.

**Files:** `src/editorial.css`
**Acceptance:** CTAs feel weighty without dominating.

### 3.5 — Knowledge GitHub CTA placement
**Problem:** "REVIEW BUILD HISTORY ON GITHUB" floats orphaned between section subtitle and language map.

**Fix:** Tuck it into the language map panel as a footer link, or pair it with the panel below using a thin connecting hairline.

**Files:** `src/components/Resume/index.jsx`, `src/editorial.css`
**Acceptance:** Button feels anchored to a specific section, not orphaned.

---

## Out of scope (intentionally deferred)

- **Light-mode toggle** — site is committed to dark-only luxury aesthetic.
- **More projects** — current 5 represent the strongest work; padding the grid weakens it.
- **Blog / writing section** — no compelling content yet.
- **Custom domain** — `coleyrockin.github.io/react-portfolio` is fine until there's a personal brand reason to switch.

---

## Effort summary

| Phase | Items | Est. time | Risk |
|---|---|---|---|
| Phase 1 | 3 fixes | ~30 min | Low — visual only, no logic changes |
| Phase 2 | 4 ornaments | ~45 min | Low — additive copy + CSS |
| Phase 3 | 5 refinements | ~10–15 min each | Very low — micro-tweaks |

**Total time to fully ship Phase 1 + 2:** ~75 minutes of focused work.

**Recommended execution order:** 1.1 → 1.3 → 1.2 → 2.2 → 2.1 → 2.3 → 2.4 → Phase 3 as time permits.
