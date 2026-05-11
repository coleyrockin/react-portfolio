# Portfolio Roadmap

Current status after the May 2026 audit and polish passes. The site is intentionally a dark editorial portfolio, not a generic app shell or marketing page.

## Shipped

- CSS cleanup: duplicate/dead rules removed, hover-only states guarded for pointer devices, Safari mask support added.
- Performance cleanup: Google Fonts load from `index.html`, production source maps are disabled, and unused local assets are pruned.
- Hero polish: desktop two-column composition, tighter portrait/name rhythm, outcome-led tagline, keyboard-friendly meta text.
- Portfolio polish: featured case study marker, larger featured image area, consistent project image overlay, demo-first featured CTA order.
- Knowledge polish: numbered section eyebrows, language tier sentence-key, AI work elevated above certifications.
- Accessibility cleanup: duplicate credential links removed, contact links use visible labels, active nav focus is visually distinct.

## Next Best Work

### 1. Add Visual Regression Coverage

Use Playwright against the local preview build for the four hash routes at desktop and mobile sizes. Keep it screenshot-focused and cheap to run manually before visual pushes.

**Files:** `package.json`, `tests/` or `src/App.visual.test.*`

### 2. Responsive Hero Images

Generate 480 / 960 / 1440 hero variants and wire `srcset`/`sizes` for the portrait. The current WebP is acceptable, but this is the clearest remaining LCP improvement.

**Files:** `src/assets/images/`, `src/components/About/index.jsx`

### 3. Split Tests When Behavior Grows

`src/App.test.jsx` is still fine at this size. Split into per-section tests only when more behavior lands, not just for organization.

**Files:** `src/App.test.jsx`

### 4. Consider Static Pre-rendering

If SEO or first paint becomes a priority, evaluate `vite-plugin-ssg` or a small static generation pass. Keep the hash-routing behavior unless there is a clear reason to move to full routes.

**Files:** `vite.config.js`, `src/App.jsx`

## Deferred

- Light mode: dark-only is the design direction.
- More projects: five strong projects is better than padded inventory.
- Blog/writing: defer until there is strong content.
- Custom domain: optional brand polish, not a code quality need.
