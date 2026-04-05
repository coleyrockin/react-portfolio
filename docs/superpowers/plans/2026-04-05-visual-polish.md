# Visual Polish & Signature Moments — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add refined animations, scroll-triggered reveals, hero glow, and polished hover states to the portfolio.

**Architecture:** CSS-only animations driven by a single `useInViewport` IntersectionObserver hook. No new dependencies. Replaces existing `staggerIn` cascade with viewport-triggered reveals. Existing `fadeIn` keyframe upgraded for smoother section transitions.

**Tech Stack:** React 18, CSS custom properties, IntersectionObserver API, Web Animations API (glow fallback)

---

### Task 1: Create `useInViewport` Hook + Reveal CSS

**Files:**
- Create: `src/hooks/useInViewport.js`
- Modify: `src/index.css`

- [ ] **Step 1: Create the useInViewport hook**

```js
// src/hooks/useInViewport.js
import { useEffect, useRef, useState } from "react";

export default function useInViewport(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: options.threshold ?? 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options.threshold]);

  return [ref, isVisible];
}
```

- [ ] **Step 2: Add reveal CSS classes to index.css**

Add these rules right after the existing `@keyframes staggerIn` block (after line 259 in `src/index.css`):

```css
/* ── Scroll-triggered reveals ── */
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 500ms ease-out, transform 500ms ease-out;
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

.reveal-delay-0 { transition-delay: 0ms; }
.reveal-delay-1 { transition-delay: 80ms; }
.reveal-delay-2 { transition-delay: 160ms; }
.reveal-delay-3 { transition-delay: 240ms; }
.reveal-delay-4 { transition-delay: 320ms; }
.reveal-delay-5 { transition-delay: 400ms; }
```

- [ ] **Step 3: Run dev server and verify no regressions**

Run: `npm start` (if not already running)
Expected: App loads, no console errors. Reveal classes exist but are not yet applied to any elements.

- [ ] **Step 4: Commit**

```bash
git add src/hooks/useInViewport.js src/index.css
git commit -m "feat: add useInViewport hook and reveal CSS classes"
```

---

### Task 2: Upgrade Section Entrance Animation

**Files:**
- Modify: `src/index.css` (lines 234-276)

- [ ] **Step 1: Replace the fadeIn keyframe with a smoother entrance**

In `src/index.css`, replace the existing `fadeIn` keyframe and content-shell rule:

Old (lines 232-247):
```css
.content-shell {
  width: 100%;
  animation: fadeIn 200ms ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

New:
```css
.content-shell {
  width: 100%;
  animation: sectionEnter 300ms cubic-bezier(0.22, 1, 0.36, 1);
}

@keyframes sectionEnter {
  from {
    opacity: 0;
    transform: translateY(12px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

- [ ] **Step 2: Remove the old staggerIn cascade**

Remove the old stagger rules (lines 261-276 approximately) since scroll reveals will replace them:

Delete:
```css
.content-shell .project-card,
.content-shell .highlight-item,
.content-shell .capability-card,
.content-shell .social-card,
.content-shell .language-group-card,
.content-shell .cert-item {
  animation: staggerIn 300ms ease both;
}

.content-shell > * :nth-child(1) { animation-delay: 0ms; }
.content-shell > * :nth-child(2) { animation-delay: 60ms; }
.content-shell > * :nth-child(3) { animation-delay: 120ms; }
.content-shell > * :nth-child(4) { animation-delay: 180ms; }
.content-shell > * :nth-child(5) { animation-delay: 240ms; }
.content-shell > * :nth-child(6) { animation-delay: 300ms; }
```

Keep the `@keyframes staggerIn` definition — it's not hurting anything and may be useful later.

- [ ] **Step 3: Verify section transitions are smooth**

Switch between About/Portfolio/Contact/Knowledge in the browser. Each section should fade up over 300ms with a 12px slide. No flash of unstyled content.

- [ ] **Step 4: Commit**

```bash
git add src/index.css
git commit -m "feat: upgrade section entrance animation, remove old stagger cascade"
```

---

### Task 3: Hero Headshot Glow

**Files:**
- Modify: `src/components/About/index.js` (line 12)
- Modify: `src/index.css`

- [ ] **Step 1: Wrap the profile photo in a glow container**

In `src/components/About/index.js`, replace line 12:

Old:
```jsx
<img className="profile-photo" height={180} width={180} src={ImgMe} alt="Boyd Roberts" />
```

New:
```jsx
<div className="profile-photo-wrap">
  <img className="profile-photo" height={180} width={180} src={ImgMe} alt="Boyd Roberts" />
</div>
```

- [ ] **Step 2: Add glow CSS**

Add to `src/index.css`, right after the `.profile-photo` rule (after line 301):

```css
.profile-photo-wrap {
  position: relative;
  width: min(100%, 180px);
}

.profile-photo-wrap::before {
  content: "";
  position: absolute;
  inset: -4px;
  border-radius: 24px;
  background: conic-gradient(from 0deg, var(--teal), var(--orange), var(--teal));
  filter: blur(12px);
  opacity: 0.5;
  animation: glowSpin 8s linear infinite;
  z-index: -1;
}

@keyframes glowSpin {
  to {
    rotate: 360deg;
  }
}
```

- [ ] **Step 3: Handle mobile circular photo**

The mobile breakpoint changes `.profile-photo` to `border-radius: 50%`. The glow should match. Add inside the `@media (max-width: 700px)` block:

```css
.profile-photo-wrap {
  width: 160px;
}

.profile-photo-wrap::before {
  border-radius: 50%;
}
```

- [ ] **Step 4: Verify reduced motion behavior**

The existing `@media (prefers-reduced-motion: reduce)` block sets `animation-duration: 0.01ms !important`, which stops the spin. The conic-gradient still renders as a static glow — this is the desired reduced-motion state. No WAAPI fallback needed since we want the glow visible but static.

No code changes needed for this step — just verify during Task 6.

- [ ] **Step 5: Verify glow renders in both themes**

Check light mode and dark mode. The conic gradient uses `var(--teal)` and `var(--orange)`, which change per theme. The glow should look warm in light mode and vibrant in dark mode.

- [ ] **Step 6: Commit**

```bash
git add src/components/About/index.js src/index.css
git commit -m "feat: add animated gradient glow ring behind headshot"
```

---

### Task 4: Refined Hover States

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Upgrade portfolio card hover**

In `src/index.css`, replace the existing `.project-card:hover` rule:

Old:
```css
.project-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 48px rgba(15, 23, 42, 0.18);
  border-color: rgba(15, 118, 110, 0.35);
}
```

New:
```css
.project-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 24px 48px rgba(15, 23, 42, 0.18), 0 0 0 1px rgba(15, 118, 110, 0.12);
  border-color: rgba(15, 118, 110, 0.35);
}
```

- [ ] **Step 2: Add nav button hover underline**

Add after the existing `.section-link.is-active` rule (after line 224):

```css
.section-link:not(.is-active) {
  position: relative;
}

.section-link:not(.is-active)::after {
  content: "";
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: var(--teal);
  border-radius: 1px;
  transition: width 200ms ease-out;
}

.section-link:not(.is-active):hover::after {
  width: 60%;
}
```

- [ ] **Step 3: Upgrade CTA button hover**

Replace the existing `.cta-link:hover` rule:

Old:
```css
.cta-link:hover {
  background: rgba(15, 118, 110, 0.14);
  transform: translateY(-1px);
}
```

New:
```css
.cta-link:hover {
  background: rgba(15, 118, 110, 0.14);
  transform: scale(1.02) translateY(-1px);
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.1);
}
```

- [ ] **Step 4: Upgrade footer icon hover**

Replace the existing `.footer-icon:hover` rule:

Old:
```css
.footer-icon:hover {
  transform: translateY(-1px);
  background: rgba(15, 118, 110, 0.15);
}
```

New:
```css
.footer-icon:hover {
  transform: translateY(-2px);
  background: rgba(15, 118, 110, 0.15);
  color: var(--teal);
  box-shadow: 0 4px 8px rgba(15, 23, 42, 0.08);
}
```

- [ ] **Step 5: Upgrade social card hover**

Replace the existing `.social-card:hover` rule:

Old:
```css
.social-card:hover {
  transform: translateY(-1px);
  border-color: rgba(15, 118, 110, 0.45);
  box-shadow: 0 10px 20px rgba(15, 23, 42, 0.08);
}
```

New:
```css
.social-card:hover {
  transform: translateY(-3px);
  border-color: rgba(15, 118, 110, 0.45);
  box-shadow: 0 12px 24px rgba(15, 23, 42, 0.1);
}
```

- [ ] **Step 6: Upgrade project action button hover**

Replace the existing `.project-actions a:hover` rule:

Old:
```css
.project-actions a:hover {
  background: rgba(15, 118, 110, 0.15);
}
```

New:
```css
.project-actions a:hover {
  background: rgba(15, 118, 110, 0.15);
  transform: scale(1.02);
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.08);
}
```

Add transition to `.project-actions a` base rule. Find the existing rule:
```css
.project-actions a {
  text-decoration: none;
  border: 1px solid rgba(15, 118, 110, 0.35);
  border-radius: 999px;
  padding: 0.38rem 0.8rem;
  font-weight: 700;
  font-size: 0.8rem;
  color: var(--teal-dark);
  background: var(--teal-subtle);
}
```

Add `transition: transform 180ms ease-out, box-shadow 180ms ease-out, background 180ms ease;` to it.

- [ ] **Step 7: Update reduced-motion hover overrides**

In the existing `@media (prefers-reduced-motion: reduce)` block, the hover transforms are already set to `none`. The new `scale()` transforms also need to be reset. Update:

Old:
```css
.section-link:hover,
.cta-link:hover,
.project-card:hover,
.project-actions a:hover,
.social-card:hover,
.footer-icon:hover {
  transform: none;
}
```

New:
```css
.section-link:hover,
.cta-link:hover,
.project-card:hover,
.project-actions a:hover,
.social-card:hover,
.footer-icon:hover {
  transform: none;
  box-shadow: none;
}

.section-link:not(.is-active)::after {
  display: none;
}
```

- [ ] **Step 8: Verify all hover states in both themes**

Test each hover target in light and dark mode:
- Nav buttons (inactive): underline slides in from center
- Portfolio cards: lifts 6px with deeper shadow
- CTA buttons: subtle scale + shadow
- Social cards: lifts 3px
- Footer icons: color shift to teal + lift
- Project action buttons: subtle scale

- [ ] **Step 9: Commit**

```bash
git add src/index.css
git commit -m "feat: refine hover states across nav, cards, CTAs, and footer"
```

---

### Task 5: Apply Scroll Reveals to All Components

**Files:**
- Modify: `src/components/About/index.js`
- Modify: `src/components/Portfolio/index.js`
- Modify: `src/components/Resume/index.js`
- Modify: `src/components/Contact/index.js`

- [ ] **Step 1: Add reveals to About component**

In `src/components/About/index.js`:

Update import:
```jsx
import React from "react";
```
to:
```jsx
import React from "react";
import useInViewport from "../../hooks/useInViewport";
```

Create a small `RevealItem` wrapper component inside the file (before the `About` function):

```jsx
function RevealItem({ delay = 0, className = "", children }) {
  const [ref, isVisible] = useInViewport();
  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? "visible" : ""} reveal-delay-${delay} ${className}`}
    >
      {children}
    </div>
  );
}
```

Wrap the highlight items (Core Stack, Focus, Current Growth). Replace:
```jsx
<div className="about-highlight-grid">
  <div className="highlight-item">
    <h3>Core Stack</h3>
    <p>MongoDB, Express, React, Node.js, SQL, REST APIs</p>
  </div>
  <div className="highlight-item">
    <h3>Focus</h3>
    <p>Readable code, practical UX, and production-ready features</p>
  </div>
  <div className="highlight-item">
    <h3>Current Growth</h3>
    <p>Java, Python, AWS, and broader software engineering depth</p>
  </div>
</div>
```

With:
```jsx
<div className="about-highlight-grid">
  <RevealItem delay={0} className="highlight-item">
    <h3>Core Stack</h3>
    <p>MongoDB, Express, React, Node.js, SQL, REST APIs</p>
  </RevealItem>
  <RevealItem delay={1} className="highlight-item">
    <h3>Focus</h3>
    <p>Readable code, practical UX, and production-ready features</p>
  </RevealItem>
  <RevealItem delay={2} className="highlight-item">
    <h3>Current Growth</h3>
    <p>Java, Python, AWS, and broader software engineering depth</p>
  </RevealItem>
</div>
```

Wrap the badge section. Replace:
```jsx
<div className="badge-wrap">
```
With:
```jsx
<div className="badge-wrap reveal visible-on-load">
```

Actually, a simpler approach — wrap the badge section with `RevealItem`:
```jsx
<RevealItem delay={0}>
  <div className="badge-wrap">
    <a href="https://www.credly.com/badges/8329e5c9-3399-4e92-906a-78eb4548a282/public_url" target="_blank" rel="noopener noreferrer">
      <img src={Fullstack} alt="Southern Methodist University Full Stack Web Development credential badge" />
    </a>
    <a href={baylorCertificate} target="_blank" rel="noopener noreferrer">
      <img src={BaylorBadge} alt="Baylor University Professional Education certificate" className="baylor-badge" />
    </a>
  </div>
</RevealItem>
```

- [ ] **Step 2: Add reveals to Portfolio component**

In `src/components/Portfolio/index.js`:

Add import:
```jsx
import useInViewport from "../../hooks/useInViewport";
```

Add a `RevealItem` wrapper (same as About):
```jsx
function RevealItem({ delay = 0, className = "", children }) {
  const [ref, isVisible] = useInViewport();
  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? "visible" : ""} reveal-delay-${delay} ${className}`}
    >
      {children}
    </div>
  );
}
```

Wrap each `ProjectCard` in the map. Replace the project grid map:
```jsx
<div className="project-grid">
  {projects.map((project) => (
    <ProjectCard project={project} key={project.name} />
  ))}
</div>
```

With:
```jsx
<div className="project-grid">
  {projects.map((project, i) => (
    <RevealItem delay={Math.min(i, 5)} key={project.name}>
      <ProjectCard project={project} />
    </RevealItem>
  ))}
</div>
```

- [ ] **Step 3: Add reveals to Resume (Knowledge) component**

In `src/components/Resume/index.js`:

Add import:
```jsx
import useInViewport from "../../hooks/useInViewport";
```

Add the same `RevealItem` wrapper.

Wrap language group cards. Replace:
```jsx
<div className="language-group-grid">
  {languageGroups.map((group) => (
    <article className="language-group-card" key={group.title}>
```

With:
```jsx
<div className="language-group-grid">
  {languageGroups.map((group, i) => (
    <RevealItem delay={Math.min(i, 5)} key={group.title}>
      <article className="language-group-card">
```

Close the `RevealItem` after the closing `</article>`:
```jsx
      </article>
    </RevealItem>
  ))}
```

Wrap capability pillars. Replace:
```jsx
{capabilityPillars.map((pillar) => (
  <article className="capability-card" key={pillar.title}>
```

With:
```jsx
{capabilityPillars.map((pillar, i) => (
  <RevealItem delay={Math.min(i, 5)} key={pillar.title}>
    <article className="capability-card">
```

Close `RevealItem` after `</article>`.

- [ ] **Step 4: Add reveals to Contact component**

In `src/components/Contact/index.js`:

Add import:
```jsx
import useInViewport from "../../hooks/useInViewport";
```

Add the same `RevealItem` wrapper.

Wrap each social card. Replace the map:
```jsx
{socialLinks.map((profile) => {
  const Icon = ICON_BY_KEY[profile.key];
  return (
    <a
      className="social-card"
```

With:
```jsx
{socialLinks.map((profile, i) => {
  const Icon = ICON_BY_KEY[profile.key];
  return (
    <RevealItem delay={Math.min(i, 5)} key={profile.key}>
      <a
        className="social-card"
```

Close `RevealItem` after the closing `</a>`, and remove `key` from the `<a>` tag (it's now on `RevealItem`).

- [ ] **Step 5: Extract RevealItem to a shared location**

Since all 4 components use the same `RevealItem`, extract it. Create:

```jsx
// src/components/RevealItem.js
import React from "react";
import useInViewport from "../hooks/useInViewport";

export default function RevealItem({ delay = 0, className = "", children }) {
  const [ref, isVisible] = useInViewport();
  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? "visible" : ""} reveal-delay-${delay} ${className}`}
    >
      {children}
    </div>
  );
}
```

Then update all 4 component files to import from `../../components/RevealItem` (About, Portfolio, Resume) or `../RevealItem` (Contact, since it's a sibling) — wait, they're all in `src/components/X/index.js`, so the import would be:

```jsx
import RevealItem from "../RevealItem";
```

Remove the local `RevealItem` definitions from each component.

- [ ] **Step 6: Update reduced-motion CSS for reveals**

In the `@media (prefers-reduced-motion: reduce)` block, add:

```css
.reveal {
  opacity: 1;
  transform: none;
  transition: none;
}
```

This ensures elements are immediately visible without any animation when reduced motion is preferred. The `useInViewport` hook also handles this by immediately setting `isVisible = true`.

- [ ] **Step 7: Verify scroll reveals work**

Navigate to Portfolio section. Scroll down — project cards should cascade in with staggered delays. Same for Knowledge section language groups and capability pillars. Contact cards should reveal on section load.

- [ ] **Step 8: Commit**

```bash
git add src/components/RevealItem.js src/components/About/index.js src/components/Portfolio/index.js src/components/Resume/index.js src/components/Contact/index.js src/index.css
git commit -m "feat: add scroll-triggered reveal animations across all sections"
```

---

### Task 6: Final Verification & Cleanup

**Files:**
- Possibly: `src/index.css` (minor tweaks)

- [ ] **Step 1: Test light mode — all sections**

Click through About, Portfolio, Contact, Knowledge in light mode. Verify:
- Section entrance animation (fade + slide up)
- Scroll reveals trigger correctly on each section
- Hero glow spins smoothly
- Hover states all work (nav, cards, CTAs, footer icons)
- No layout shifts or flicker

- [ ] **Step 2: Test dark mode — all sections**

Switch to dark mode. Same checks. The glow ring should use the dark theme's teal/orange values.

- [ ] **Step 3: Test mobile viewport**

Resize to 375px width. Verify:
- Glow ring is circular (matches round photo)
- Cards stack properly
- Reveal animations still trigger
- No horizontal overflow

- [ ] **Step 4: Test reduced motion**

Enable `prefers-reduced-motion: reduce` in browser devtools. Verify:
- No animations fire
- All content is immediately visible
- Glow ring shows static (no spin)
- Hover transforms disabled

- [ ] **Step 5: Run existing tests**

```bash
npm test -- --watchAll=false
```

Expected: All existing tests pass. No regressions.

- [ ] **Step 6: Final commit if any tweaks were needed**

```bash
git add -A
git commit -m "fix: visual polish tweaks from final verification"
```

Only commit this if changes were made during verification. Skip if everything passed clean.
