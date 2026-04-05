# Visual Polish & Signature Moments — Design Spec

**Date:** 2026-04-05
**Goal:** Elevate the portfolio from functional to refined & elegant through deliberate motion, scroll-triggered reveals, and layout fixes.
**Approach:** B (Signature Moments) — CSS-only animations, no new dependencies.

---

## 1. Section Transitions

**Current:** Sections swap instantly via conditional render in `App.js`.

**Change:** Entrance-only animation on section swap. When the active section changes, the new section mounts with a CSS keyframe animation (`opacity 0 → 1, translateY(12px) → 0` over 250ms ease-out). No outgoing animation — the old section unmounts instantly and the new one fades up into place. This is simpler than managing two mounted sections for a cross-fade, and feels snappy.

**Implementation:** Add a `@keyframes section-enter` animation. Apply it to the section wrapper using a React `key` prop set to the active section name — when the key changes, React remounts the element, re-triggering the animation. Pure CSS + React's built-in key behavior, no state management needed.

**Files:** `App.js`, `index.css`

---

## 2. Scroll-Triggered Reveals

**Hook:** `useInViewport(ref, options)` — thin wrapper around IntersectionObserver.
- Returns a boolean `isVisible`
- Default threshold: `0.15`
- `triggerOnce: true` — animate in, stay visible

**CSS classes:**
- `.reveal` — base: `opacity: 0; transform: translateY(20px); transition: opacity 500ms ease-out, transform 500ms ease-out;`
- `.reveal.visible` — `opacity: 1; transform: translateY(0);`
- `.reveal-delay-1` through `.reveal-delay-5` — add `transition-delay: 80ms * N`

**Applied to:**
- About: highlight cards (Core Stack, Focus, Current Growth) — staggered
- Portfolio: project cards — staggered 80ms per card
- Knowledge: language group panels + capability pillars — staggered
- Contact: social cards — staggered
- About: credential badges — staggered

**Reduced motion:** When `prefers-reduced-motion: reduce`, `.reveal` starts at `opacity: 1; transform: none` — no animation.

**Files:** New `src/hooks/useInViewport.js`, updates to each component, `index.css`

---

## 3. Hero Headshot Glow

**Element:** `::before` pseudo-element on the headshot container (`.about-header-photo` or equivalent).

**Effect:**
- Conic gradient: `conic-gradient(from 0deg, var(--teal), var(--orange), var(--teal))`
- Size: slightly larger than the photo (4-6px bleed on each side)
- `border-radius: 50%` to match circular photo
- `filter: blur(12px)` for soft glow
- `animation: glow-spin 8s linear infinite`
- `@keyframes glow-spin { to { rotate: 360deg } }`

**Reduced motion:** `animation-play-state: paused` — shows static gradient glow, no spin.

**Note:** Per CLAUDE.md gotcha, if `prefers-reduced-motion` suppresses `animation-duration`, use Web Animations API (`element.animate()`) as fallback. Test this during implementation.

**Files:** `index.css`, possibly `About/index.js` for structure

---

## 4. Refined Hover States

### Portfolio Cards
- `transform: translateY(-6px)` on hover (currently -4px in some states)
- `box-shadow` deepens from current to `0 12px 32px rgba(15, 23, 42, 0.18)`
- Image inside card: `transform: scale(1.03)` with `overflow: hidden` on container
- All transitions: `200ms ease-out`

### Nav Buttons (Inactive)
- Add a bottom border that slides in from center on hover
- `::after` pseudo-element, `width: 0 → 100%`, `height: 2px`, centered, teal color
- `transition: width 200ms ease-out`
- Active button keeps its filled pill style — no underline

### CTA Buttons (View Repository, View SMU Credential, etc.)
- `transform: scale(1.02)` on hover
- Shadow lift: `box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15)`
- `transition: transform 180ms ease-out, box-shadow 180ms ease-out`

### Footer Social Icons
- Color transition to `var(--teal)` on hover
- `transform: translateY(-1px)`
- `transition: color 180ms, transform 180ms`

**Files:** `index.css`

---

## 5. Contact Section Fix

**Current:** Only Email shows as a card. LinkedIn and GitHub data exists in `socialLinks.js` but only Email renders as a contact card (LinkedIn/GitHub only appear as footer icons).

**Change:** Render all three social links (Email, LinkedIn, GitHub) as full cards in the Contact section. Same card component/style already used for Email — extend to all entries in `socialLinks`.

**Layout:** CSS Grid, `grid-template-columns: repeat(auto-fit, minmax(240px, 1fr))`, `gap: 16px`. Three cards on desktop, stacks on mobile.

**Each card shows:** Icon (already mapped in `iconMap.js`), platform name, handle/address, clickable link.

**Files:** `Contact/index.js`, `index.css`

---

## 6. Staggered Card Entrances

Uses the scroll-triggered reveal system from Section 2. Specific timing:

| Element Group | Base Delay | Per-Item Delay |
|---|---|---|
| Portfolio project cards | 0ms | 80ms |
| About highlight cards | 0ms | 100ms |
| Knowledge language groups | 0ms | 80ms |
| Knowledge capability pillars | 0ms | 100ms |
| Contact cards | 0ms | 80ms |
| Credential badges | 0ms | 120ms |

Delay classes (`.reveal-delay-0` through `.reveal-delay-5`) applied via index in the map function.

**Files:** Each component file, `index.css`

---

## Technical Constraints

- **Zero new dependencies.** All animations via CSS transitions/keyframes + one custom hook.
- **`prefers-reduced-motion` respected everywhere.** Animations disabled or paused.
- **WAAPI fallback** for the hero glow if Chrome suppresses CSS animation-duration under reduced-motion UA stylesheet (per known gotcha).
- **Existing design system preserved.** Same color tokens, fonts, border-radius, spacing.
- **No structural refactoring.** Components keep their current shape — we're adding motion and fixing Contact layout.

---

## Files Changed (Summary)

| File | Changes |
|---|---|
| `src/hooks/useInViewport.js` | **New** — IntersectionObserver hook |
| `src/App.js` | Section transition logic |
| `src/index.css` | All animation classes, hover states, transition styles |
| `src/components/About/index.js` | Scroll reveals on highlights + badges, headshot glow structure |
| `src/components/Portfolio/index.js` | Scroll reveals on project cards |
| `src/components/Contact/index.js` | Render all 3 social cards, scroll reveals |
| `src/components/Resume/index.js` | Scroll reveals on language groups + pillars |
| `src/components/Nav/index.js` | Nav hover underline (if CSS-only isn't sufficient) |
| `src/components/Footer/index.js` | Icon hover refinements (CSS-only) |
