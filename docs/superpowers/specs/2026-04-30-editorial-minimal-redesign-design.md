# Editorial Minimal Redesign Spec

## Goal
Create a full visual overhaul of the React portfolio using a less-is-more editorial direction: strong typography, minimal palette, restrained motion, and tighter content hierarchy focused on proof of engineering capability.

## User Intent
- "Make it more badass looking visually and change everything."
- Preference selected: minimalist premium.
- Keep motion restrained ("minimal" / less is more).
- Use `github.com/coleyrockin` as a reference for technology credibility.

## Direction
- Tone: editorial minimal, high-end, confident.
- Visual density: reduced.
- Motion: subtle reveal/hover polish only.
- Content style: concise, impact-first language.

## Information Architecture
1. About (hero + concise bio + focused highlights + credentials)
2. Portfolio (featured-first work cards, clean and scannable)
3. Contact (short conversion-first CTA + social cards)
4. Knowledge (compressed engineering credibility and stack clusters)

## Component Plan

### `src/components/About/index.jsx`
- Remove visually noisy hero effects and reduce decorative wrapping.
- Keep profile image but simplify presentation.
- Tighten hero copy to one-line value proposition + compact metadata.
- Keep proof links and credentials with cleaner visual hierarchy.

### `src/components/Portfolio/index.jsx`
- Keep existing card logic and project data source.
- Simplify card surface treatment and emphasize title/impact/stack.
- Keep image-first cards with uniform framing and understated hover.
- Preserve repo/demo actions with quieter button styling.

### `src/components/Resume/index.jsx`
- Reframe section as concise "tech credibility."
- Keep language map/capabilities/certs but reduce chrome.
- Add explicit GitHub profile link to connect claims to public evidence.

### `src/components/Contact/index.jsx`
- Keep social link map but simplify card visuals and spacing.
- Add direct, concise conversion-oriented intro line.

### `src/components/Nav/index.jsx` and `src/components/Footer/index.jsx`
- Flatten visual weight, increase whitespace, reduce effects.
- Keep accessibility and section switching behavior intact.

## Styling Plan (`src/index.css`)
- Rebuild around a tighter variable system:
  - neutral background layers
  - one accent color
  - restrained border/shadow tokens
- Typography:
  - strong display serif for headings
  - clean sans for body/UI
  - larger hero scale with cleaner line-height
- Layout:
  - improved vertical rhythm and section spacing
  - narrower text measures for readability
  - cleaner card geometry
- Motion:
  - gentle transitions only
  - preserve reduced-motion behavior

## Accessibility and UX Constraints
- Keep skip-link and keyboard nav behavior.
- Maintain visible focus states.
- Preserve reduced-motion handling and reveal fallback behavior.
- Avoid color-only state cues.

## Verification Plan
- Run lints on changed files.
- Run unit tests to ensure section switching and skip-link behavior remain intact.
- Manual smoke check:
  - section nav updates content and hash
  - CTA links jump to expected sections
  - project cards and social links remain functional

## Out of Scope
- No data model or routing overhaul.
- No additional pages.
- No backend/API changes.
