# Portfolio Polish Pass — Design Spec

**Date:** 2026-05-09
**Status:** Implemented (commit `3ab067b`)
**Scope:** CSS-only polish of existing "black luxury editorial" design. No structural changes, no new sections, no redesign.

---

## Problem

The portfolio had several CSS bugs and visual rough edges that prevented it from looking fully polished:

1. Section gold hairlines were written but rendered nothing (missing `content`, `height`, `display` on `::before` rules)
2. 3-column grids collapsed directly to 1-column at 960px — no 2-column intermediate step for tablet sizes
3. Nav link hover used pure white (`--ink`) instead of the warmer cream tone the editorial palette calls for
4. Hero name was flat white — missed an opportunity for depth against the near-black background
5. Project card content used a flat `gap: 10px` for all children — no visual hierarchy between title, description, meta, and actions
6. Project images filtered at `brightness(0.88)` — slightly too dark
7. Credential badges at `grayscale(0.6) brightness(0.85)` — too washed out to read
8. Section eyebrow 22px gap from title felt disconnected

---

## Changes Made

### 1. Section gold hairlines (`::before` fix)
Added `content: ""`, `display: block`, `height: 1px`, `margin: 0 auto 28px` to `.about-panel::before`, `.portfolio-panel::before`, `.knowledge-panel::before`, `.contact-panel::before`. The gradient and opacity were already correct.

### 2. Intermediate grid breakpoint
At `max-width: 960px`: `.about-highlight-grid`, `.language-group-grid`, `.capability-grid`, `.social-grid`, `.cert-list` now use `repeat(2, minmax(0, 1fr))` instead of `1fr`. Added new `max-width: 600px` breakpoint that collapses to `1fr`. Project grid (`project-grid`) still goes to 1 column at 960px — this is correct behavior for the card layout.

### 3. Nav hover color
`.section-link:hover` changed from `color: var(--ink)` (#f7f4ee) to `color: var(--ink-secondary)` (#d6d0c8) — warm cream, consistent with the palette.

### 4. Hero name gradient
Added `background: linear-gradient(170deg, var(--ink) 35%, #cdb99a 100%)` with `-webkit-background-clip: text` and `-webkit-text-fill-color: transparent`. Fades from off-white to warm cream over the large display type.

### 5. Project card content rhythm
Changed `gap: 10px` to `gap: 0`. Added targeted margins:
- `.project-content h3`: `margin: 0 0 0.55rem`
- `.project-content .project-category + h3`: `margin-top: 0.2rem`
- `.project-meta`: `margin-top: 0.85rem`
- `.project-stack`: `margin-top: 0.3rem`
- `.project-actions` already had `margin-top: auto`

### 6. Project image brightness
`filter: saturate(0.88) contrast(1.06) brightness(0.88)` → `saturate(0.92) contrast(1.04) brightness(0.94)`.

### 7. Credential badge filter
`filter: grayscale(0.6) brightness(0.85)` → `grayscale(0.25) brightness(0.95)`.

### 8. Section eyebrow spacing
`margin: 0 0 22px` → `margin: 0 0 12px`. Mobile override updated from 16px to 10px.

---

## Architecture

Single-file CSS change: `src/editorial.css`. No component changes, no new dependencies, no data changes. All changes are pure visual CSS.

---

## Testing

Visual check at `http://localhost:3333/react-portfolio/` across:
- Desktop (>960px): gold hairlines, gradient hero name, brighter images, tighter eyebrow
- Tablet (600–960px): 2-column grids
- Mobile (<600px): 1-column grids
