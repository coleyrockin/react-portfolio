# React Portfolio — Next-Agent Roadmap

_Last audited: 2026-05-26_

## Current project summary

This is a static, hash-routed React 19 + Vite portfolio published to GitHub Pages under `/react-portfolio/`. The app is a polished recruitment-facing showcase built around four sections: About, Portfolio, Knowledge, and Contact.

### What the project currently does

- Serves a portfolio experience with:
  - Dynamic section shell (`App.jsx`) with hash-based navigation and focus restoration.
  - Shared data modules (`src/data/projects.js`, `src/data/languages.js`, `src/data/socialLinks.js`).
  - Manual visual regression smoke test via Playwright (`npm run visual:smoke`).
  - CI (`.github/workflows/ci.yml`) and deploy (`.github/workflows/deploy.yml`) pipelines.
  - CSP injection in `index.html` (via Vite plugin in `vite.config.js`).
- Uses static assets and metadata from `public/` and `src/assets/`.
- Exposes a public, zero-authentication build with external outbound links only.

### What appears finished

- Production hardening baseline is present: lint, tests, build, and deploy workflows.
- Core content surfaces exist and are wired correctly to route sections.
- Accessibility support is materially good for current scope (skip link, labelled regions, semantic landmarks, reduced-motion handling, visible active nav).
- Visual QA is in place via `VISUAL_SMOKE_PORT` + `npm run visual:smoke`.
- Project/research credibility is represented in `src/data/projects.js`, `src/data/languages.js`, and README tables.
- Portfolio-facing docs exist (`README.md`, `SECURITY.md`, `security_best_practices_report.md`).

### What appears unfinished

- CI is production-safe but conservative hardening opportunities remain documented only as recommendations.
- Documentation quality is uneven: some claims are static and appear to drift risk (for example, performance numbers and test counts are presented as fixed facts).
- Architecture and UX recommendations are split across a legacy roadmap plus prior handoffs and specs; one canonical, execution-ready doc was needed.
- No explicit release owner checklist for when to cut the next change or when to pause and ask for review.

### What appears broken or risky

- GitHub Actions rely on major-version tags, not SHA-pinned SHAs.
- Security posture is currently constrained by hosting-level CSP behavior (meta policy in HTML, not all header-level controls).
- Third-party fonts (`fonts.googleapis.com`, `fonts.gstatic.com`) remain a dependency in CSP and network profile.
- `visual:smoke` is manual-only; useful evidence is produced but not enforced in CI yet.
- Some repo-facing copy emphasizes outcomes that can age quickly without date context.

### What is duplicated or outdated

- Legacy roadmap content in `docs/ROADMAP.md` was short and partially superseded by ad-hoc findings and Handoff notes.
- SEO/performance claims in README are snapshot-style and not consistently date-stamped.
- Security recommendations are split: one actionable report (`security_best_practices_report.md`) and one roadmap surface.

### What hurts maintainability

- Single-component monolith in `src/App.jsx` with route config/state logic coupled to section metadata.
- Large component count is manageable, but test strategy is still centralized in a single file (`src/App.test.jsx`).
- No explicit changelog/verification log in docs that maps commits to user-facing changes.
- CSS is intentionally extensive (`src/editorial.css`), but no comment map for section intent/tuning and no visual change checklist in docs.

### What hurts user experience

- UX is strong overall, but there is no explicit “known issues” section for users to set expectations.
- Recruiter flow is good, but there is no standardized checklist for verifying that live links and project CTAs still resolve over time.
- Some wording in sections/projects is marketing-forward and could use consistency checks for currency.

### What hurts recruiter / GitHub presentation

- A few static claims in README can feel “stale by default” if untouched.
- No explicit mention of verification results dates near benchmark numbers.
- No explicit command list that maps to “what a reviewer should run before trusting a change.”

### What should be protected

- URL behavior and section semantics (`#about`, `#portfolio`, `#knowledge`, `#contact`).
- Existing accessibility behaviors: skip link, focus management, reduced-motion behavior, semantic section labeling.
- Current project dataset schema and the existing link source-of-truth pattern in `src/data/*`.
- Manual `visual:smoke` evidence workflow.

## Current architecture snapshot

- Shell: `src/App.jsx` renders one section component for each allowed slug.
- Components:
  - `src/components/About/index.jsx`
  - `src/components/Portfolio/index.jsx`
  - `src/components/Knowledge/index.jsx`
  - `src/components/Contact/index.jsx`
  - `src/components/Nav/index.jsx`
  - `src/components/Footer/index.jsx`
- Shared behavior:
  - Intersection reveal: `src/hooks/useInViewport.js`, `src/components/RevealItem.jsx`
  - Shared icon and social mapping in `src/data/iconMap.js` and `src/data/socialLinks.js`.
- Tooling:
  - Tests: Vitest + Testing Library.
  - Lint: ESLint flat config.
  - Build/preview/deploy: Vite.
  - QA automation: custom Playwright smoke script at `scripts/visual-smoke.mjs`.

## Current product vision

Primary objective: maintain a high-trust, recruiter-grade portfolio that presents verified shipping work with clear proof and stable behavior.

Secondary objective: keep the editorial aesthetic while reducing maintenance drag and preventing documentation drift.

## Target users

- Recruiters and hiring managers evaluating engineering profile quality.
- Human reviewers checking deployment and portfolio polish from browser preview alone.
- Future maintainers rotating the portfolio on a cadence.

## Current strengths

- Strong visual identity and brand consistency (`src/editorial.css`, `README.md`, social preview + screenshot assets).
- Reliable section routing logic with defensive hash handling.
- Good baseline a11y and interaction behavior.
- Clear external-link hygiene (`target="_blank"` + `rel="noopener noreferrer"`).
- Existing security report and CI/security workflows already available.

## Current weaknesses

- Documentation can age faster than code if verification metadata is not dated.
- Deployment-hardening items are documented but not prioritized as milestones.
- Security-hardening recommendations exist but are optional rather than operational for this branch.
- No gating policy for visual smoke in CI.

## Highest priority fixes (next 2–4 weeks)

### P1-01 — Date-stamp and truth-source all public-facing status claims
- What: Align README and docs claims to explicit commands or dated verification outputs.
- Why it matters: Prevents confusion for reviewers and avoids overclaiming.
- Expected impact: Improved credibility and lower trust debt.
- Difficulty: Low
- Risk: Low
- Dependencies: `README.md`, `docs/ROADMAP.md`, `SECURITY.md`.
- Suggested order: 1
- Acceptance criteria:
  - All metrics in README are either date-stamped or tied to command outputs.
  - Claims with time sensitivity are moved to roadmap status where needed.
- Tests/checks:
  - `npm run check`
  - visual spot-check on local route pages.

### P1-02 — Add roadmap-level security hardening plan in one canonical doc
- What: Keep actionable security recommendations in one section (`security headers`, `third-party font policy`, `action pinning`) with acceptance gates.
- Why it matters: Security posture is currently split across docs; execution can stall.
- Expected impact: Faster triage and lower accidental regression risk.
- Difficulty: Low
- Risk: Low
- Dependencies: `docs/ROADMAP.md`, `security_best_practices_report.md`.
- Suggested order: 1
- Acceptance criteria:
  - Explicit “when to do” and “how to verify” items exist for each recommendation.
  - No conflicting security recommendations across docs.
- Tests/checks:
  - N/A (documentation task)
  - Post-edit `npm run lint` not required for docs-only but run in verification step for repo health.

### P1-03 — Protect release documentation and handoff consistency
- What: Mark `docs/HANDOFF-2026-05-20.md` as historical and keep active operating plan in `docs/ROADMAP.md`.
- Why it matters: Prevents conflicting instructions for the next agent.
- Expected impact: One source of truth for execution order.
- Difficulty: Low
- Risk: Low
- Dependencies: `docs/HANDOFF-2026-05-20.md`, `docs/ROADMAP.md`.
- Suggested order: 1
- Acceptance criteria:
  - `docs/ROADMAP.md` references handoff docs as historical context.
- Tests/checks:
  - Manual review of doc links.

### P1-04 — Add explicit CI/verification status block
- What: Record command outputs and pass/fail status in one section near repo top-level docs.
- Why it matters: Future contributors need quick safety gates without guessing.
- Expected impact: Better confidence before merge and release decisions.
- Difficulty: Low
- Risk: Low
- Dependencies: `docs/ROADMAP.md`, `README.md`, `security_best_practices_report.md`.
- Suggested order: 1
- Acceptance criteria:
  - `npm run lint`, `npm test`, `npm run build`, and optional `npm run visual:smoke` are referenced with expected outcomes and failure paths.
- Tests/checks:
  - `npm run lint`
  - `npm test`
  - `npm run build`

## Architecture recommendations

### A-01 — Keep route model stable unless product direction changes
- What: Preserve hash-routing and section list in `src/App.jsx` for now.
- Why it matters: Existing deep links and nav behavior are stable and validated.
- Expected impact: Zero behavior breakage for current users.
- Difficulty: Low
- Risk: Very low
- Dependencies: `src/App.jsx`
- Suggested order: 2
- Acceptance criteria:
  - `#about`, `#portfolio`, `#knowledge`, `#contact` remain canonical and visible.
- Tests/checks:
  - Existing section tests in `src/App.test.jsx`.

### A-02 — Keep data modules as single source-of-truth
- What: Maintain current data ownership in `src/data/*`; avoid duplicating project metadata in components/markdown.
- Why it matters: Prevents divergence between project cards and quick-path links.
- Expected impact: Lower content drift.
- Difficulty: Low
- Risk: Low
- Dependencies: `src/data/projects.js`, `src/data/languages.js`, `src/data/socialLinks.js`.
- Suggested order: 2
- Acceptance criteria:
  - Adding/removing project entries updates all relevant surfaces via existing data model.
- Tests/checks:
  - Render test for 5 project cards continues to pass.

## Refactor recommendations

### R-01 — Keep tests co-located as behavior grows
- What: Split `src/App.test.jsx` into section-level test files when additional behavior is added.
- Why it matters: Prevents growing single-test coupling.
- Expected impact: Cleaner ownership and faster test maintenance.
- Difficulty: Medium
- Risk: Low
- Dependencies: `src/App.test.jsx`, optional future `src/components/*/*.test.jsx`.
- Suggested order: 4
- Acceptance criteria:
  - Existing coverage remains equivalent for hash-routing, skip link, social links, and project actions.
- Tests/checks:
  - `npm test`

## UI and UX recommendations

### U-01 — Preserve existing editorial language and copy deck as default
- What: Keep all section names and content direction stable (`About`, `Portfolio`, `Knowledge`, `Contact`) and avoid layout redesigns.
- Why it matters: Project is already close to target tone; churn risks user trust and recruiter familiarity.
- Expected impact: Consistent brand quality and lower regression risk.
- Difficulty: Low
- Risk: Low
- Dependencies: `src/components/About/index.jsx`, `src/components/Portfolio/index.jsx`, `src/components/Knowledge/index.jsx`, `src/components/Contact/index.jsx`.
- Suggested order: 3
- Acceptance criteria:
- No route-level behavioral changes.
- Tests/checks:
  - Visual smoke passes across breakpoints.
  - Section headings remain unchanged.

### U-02 — Add explicit “proof of live evidence” documentation
- What: Keep the README quick path and project table aligned with verified demo/repo links.
- Why it matters: Recruiters care about verification, not only narrative.
- Expected impact: Better trust and easier decision-making.
- Difficulty: Low
- Risk: Low
- Dependencies: `README.md`, `src/data/projects.js`.
- Suggested order: 3
- Acceptance criteria:
  - Every row in “Featured Project Links” resolves in one click.
  - Source vs demo labels remain accurate.
- Tests/checks:
  - Manual `curl -I` spot-check commands on links.

### U-03 — Add lightweight UX maintenance checklist
- What: Document known visual/perception checks at 390px and 360px for every release.
- Why it matters: Prevents regressions in critical recruiterview breakpoints.
- Expected impact: Stable mobile presentation.
- Difficulty: Low
- Risk: Low
- Dependencies: `docs/ROADMAP.md`, README visual instructions.
- Suggested order: 3
- Acceptance criteria:
- “Smallest viewport first” section exists and is followed before release.
- Tests/checks:
  - `npm run visual:smoke` with `VISUAL_SMOKE_PORT=4174`.

## Performance recommendations

### P-01 — Keep current image strategy and document constraints
- What: Confirm image dimensions/sizes behavior and avoid introducing uncached large assets.
- Why it matters: Keeps LCP stability and avoids accidental regressions.
- Expected impact: Predictable load profile.
- Difficulty: Low
- Risk: Low
- Dependencies: `src/components/About/index.jsx`, `src/components/Portfolio/index.jsx`, `src/editorial.css`.
- Suggested order: 3
- Acceptance criteria:
- Hero and featured images retain explicit dimensioning and lazy strategy where intended.
- Tests/checks:
  - `npm run build`
  - visual smoke screenshot set review.

### P-02 — Keep bundle and script boundaries conservative
- What: Continue no dependency bloat; add notes only if bundle changes.
- Why it matters: Simplicity reduces attack surface and build friction.
- Expected impact: Faster builds and predictable runtime.
- Difficulty: Low
- Risk: Low
- Dependencies: `package.json`, `package-lock.json`.
- Suggested order: 4
- Acceptance criteria:
  - No unnecessary new production dependency is introduced without roadmap decision.
- Tests/checks:
  - `npm run check`

## Security recommendations

### S-01 — Define hardening execution cadence (operational, not code changes)
- What: Promote `security_best_practices_report.md` recommendations with next-agent order.
- Why it matters: Keeps low-severity issues visible and actionable.
- Expected impact: Better long-term posture without production risk.
- Difficulty: Low
- Risk: Low
- Dependencies: `.github/workflows`, `index.html`, `vite.config.js`, `security_best_practices_report.md`.
- Suggested order: 1
- Acceptance criteria:
- Every low-severity note has owner + trigger + verification command.
- Tests/checks:
  - `npm audit --omit=dev`
  - security headers review after any deployment target change.

### S-02 — Plan for action-pinning strategy and documentation
- What: Track pinning GitHub Actions and discuss rollout with dependency updates.
- Why it matters: Minor supply-chain improvement; high confidence value.
- Expected impact: Better reproducibility and supply-chain integrity.
- Difficulty: Medium
- Risk: Low to Medium (workflow changes require care).
- Dependencies: `.github/workflows/*.yml`, `dependabot`.
- Suggested order: 2
- Acceptance criteria:
- Each workflow action call has migration plan with rollback note.
- Tests/checks:
  - Deploy workflow dry-run in PR context.

### S-03 — Keep security checks non-breaking
- What: Continue to validate CSP placeholders and production headers in visual/build checks.
- Why it matters: Prevents accidental inline security regressions.
- Expected impact: Stable security baseline.
- Difficulty: Low
- Risk: Low
- Dependencies: `scripts/visual-smoke.mjs`, `vite.config.js`, `index.html`.
- Suggested order: 1
- Acceptance criteria:
- Visual smoke reports continue to fail if CSP placeholder leaks or inline style allowances return.
- Tests/checks:
  - `npm run visual:smoke`

## Accessibility recommendations

### A11Y-01 — Continue periodic keyboard and heading audits
- What: Keep a short section in roadmap for automated/manual a11y checks.
- Why it matters: Accessibility regressions can be subtle and costly.
- Expected impact: Maintained inclusive baseline.
- Difficulty: Low
- Risk: Low
- Dependencies: `src/components/*`, `README.md`.
- Suggested order: 2
- Acceptance criteria:
- Skip link, headings, and social labels remain reliable in tests.
- Tests/checks:
  - `npm test`
  - `npm run visual:smoke` scenario route checks.

### A11Y-02 — Keep alt text and link labels mandatory
- What: Enforce no decorative text without labels in project and card imagery.
- Why it matters: Recruiter and keyboard users need reliable semantics.
- Expected impact: Cleaner audit profile.
- Difficulty: Low
- Risk: Low
- Dependencies: `src/components/About/index.jsx`, `src/components/Portfolio/index.jsx`.
- Suggested order: 2
- Acceptance criteria:
- Zero broken/unlabeled images in visual smoke summary.
- Tests/checks:
  - `npm run visual:smoke`

## SEO recommendations

### SEO-01 — Make SEO claims date-aware
- What: Maintain canonical link, OG/Twitter image, and social preview in README with validation date.
- Why it matters: SEO assertions in docs should be trustworthy.
- Expected impact: Better trust and maintainability.
- Difficulty: Low
- Risk: Low
- Dependencies: `index.html`, `docs/screenshot.png`, `public/images/social-preview.png`, `README.md`.
- Suggested order: 1
- Acceptance criteria:
- Snapshot and social assets stay aligned to current about-route screenshot.
- Tests/checks:
  - `npm run build`
  - check `build/index.html` metadata fields.

### SEO-02 — Keep robots and manifest clean
- What: Keep permissive robots and manifest start URL aligned with repo routing.
- Why it matters: Low effort, prevents indexing surprises.
- Expected impact: Stable crawler behavior.
- Difficulty: Low
- Risk: Low
- Dependencies: `public/robots.txt`, `public/site.webmanifest`, `vite.config.js`.
- Suggested order: 2
- Acceptance criteria:
- No accidental path rewrites from base config.
- Tests/checks:
  - `npm run build`.

## Testing strategy

### T-01 — Keep current verification triad as baseline
- What: `npm run lint`, `npm test`, `npm run build`.
- Why it matters: Most regressions show quickly in this stack.
- Expected impact: Stable merge confidence.
- Difficulty: Low
- Risk: Low
- Dependencies: `package.json`, source files.
- Suggested order: 1 for every release.
- Acceptance criteria:
- Clean exit on all three commands.
- Tests/checks:
- `npm run check` or individual commands above.

### T-02 — Keep visual smoke in release process
- What: Run `npm run visual:smoke` for candidate releases (manual unless next agent changes CI policy).
- Why it matters: Provides evidence beyond unit/integration assertions.
- Expected impact: Reduced regressions in layout and route headings.
- Difficulty: Low
- Risk: Low
- Dependencies: `scripts/visual-smoke.mjs`, screenshots folder in `reports/`.
- Suggested order: 2 for every release candidate.
- Acceptance criteria:
- Zero `failedCount` in visual smoke summary.
- Tests/checks:
- `npm run visual:smoke`.

## CI/CD and deployment recommendations

### C-01 — Keep CI split: quality + deploy
- What: Maintain separate quality (`ci.yml`) and deployment (`deploy.yml`) workflows.
- Why it matters: Keeps deploy intent explicit and recoverable.
- Expected impact: Cleaner operational model.
- Difficulty: Low
- Risk: Low
- Dependencies: `.github/workflows/ci.yml`, `.github/workflows/deploy.yml`, `.github/workflows/codeql.yml`.
- Suggested order: 1
- Acceptance criteria:
- Both workflows still run on pushes/PRs and do not conflict.
- Tests/checks:
- GitHub Actions run status on `main`.

### C-02 — Consider visual gate policy decision point (not implementation)
- What: Document decision whether visual smoke stays manual or becomes conditional CI.
- Why it matters: Prevents accidental policy debt.
- Expected impact: Explicit team operating model.
- Difficulty: Low
- Risk: Low
- Dependencies: `README.md`, `docs/ROADMAP.md`, `.github/workflows/ci.yml`.
- Suggested order: 1
- Acceptance criteria:
- Decision is explicit with rollback instruction.
- Tests/checks:
- Manual visual smoke command remains reproducible.

### C-03 — Keep deployment permissions minimal
- What: Continue least privilege in workflow permissions and ensure no accidental broadening.
- Why it matters: Small portfolio still benefits from defensive CI hygiene.
- Expected impact: Reduced supply-chain risk.
- Difficulty: Low
- Risk: Very low
- Dependencies: `.github/workflows/*`.
- Suggested order: 2
- Acceptance criteria:
- Permissions remain read-only except deploy step needs only pages/id-token.
- Tests/checks:
- Review workflow YAML after each edit.

## Documentation improvements

### D-01 — Standardize README structure around truth
- What: Keep README to concise sections: purpose, status, stack, run/test commands, links, verification.
- Why it matters: Recruiters and contributors need quick orientation.
- Expected impact: Lower onboarding friction.
- Difficulty: Low
- Risk: Low
- Dependencies: `README.md`.
- Suggested order: 1
- Acceptance criteria:
- No stale or unverifiable statements in lead sections.
- Tests/checks:
- N/A (reviewer check).

### D-02 — Maintain roadmap as current operations doc
- What: Treat this roadmap as the only active execution plan.
- Why it matters: Eliminates duplicated direction and conflicting tasks.
- Expected impact: Faster handoff and clearer ownership.
- Difficulty: Low
- Risk: Low
- Dependencies: `docs/ROADMAP.md`.
- Suggested order: 1
- Acceptance criteria:
- Handoff docs marked historical; active plan remains in one file.
- Tests/checks:
- Quick link sanity test for all file references.

## GitHub presentation improvements

### G-01 — Keep screenshot and social preview assets fresh
- What: Refresh `docs/screenshot.png` and `public/images/social-preview.png` only when visual direction materially changes.
- Why it matters: Sharing quality depends on accurate preview assets.
- Expected impact: Higher click-through trust from external links.
- Difficulty: Medium
- Risk: Low
- Dependencies: `docs/screenshot.png`, `public/images/social-preview.png`, README route.
- Suggested order: 2
- Acceptance criteria:
- Files reflect current About route and are lightweight enough for social scraping.
- Tests/checks:
- Manual visual review; no stale path references.

### G-02 — Keep badges and project links current
- What: Ensure README badges and project table match current script/tool versions and repo behavior.
- Why it matters: Static badges are a quick credibility signal.
- Expected impact: Cleaner external perception.
- Difficulty: Low
- Risk: Low
- Dependencies: `README.md`.
- Suggested order: 2
- Acceptance criteria:
- No broken badge URLs; no false-positive claims.
- Tests/checks:
- Manual README render check.

## Recruiter and portfolio polish

### R-01 — Keep “quick validation path” prominent
- What: Maintain a concise block in README: live site, best project, source, validation commands.
- Why it matters: Hiring teams and reviewers scan for proof first.
- Expected impact: Shorter decision loop.
- Difficulty: Low
- Risk: Low
- Dependencies: `README.md`.
- Suggested order: 1
- Acceptance criteria:
- Quick path links work and point to deployed/live artifacts.
- Tests/checks:
- Manual spot-check each link.

### R-02 — Track live link validity cadence
- What: Add an explicit periodic link check task (manual process in roadmap).
- Why it matters: Link rot directly harms recruiter confidence.
- Expected impact: Sustained credibility.
- Difficulty: Low
- Risk: Low
- Dependencies: `src/data/projects.js`, `README.md`.
- Suggested order: 3
- Acceptance criteria:
- A quarterly check cadence is documented.
- Tests/checks:
- `curl -I` against all externally linked project URLs.

## Future feature ideas (non-blocking, no implementation request)

- Add a simple “case-study notes” page as content docs outside code (if desired later).
- Add a dark-mode visual variant only as optional alternate story, not route logic change.
- Introduce optional “proof of deployment” list for each project in roadmap docs.
- Add a lightweight `docs/` changelog for monthly updates.
- Add an issue/PR template for visual evidence.

## Production readiness checklist

### Must pass before any release candidate

- `npm run lint` passes.
- `npm test` passes.
- `npm run build` passes.
- `npm run visual:smoke` run and passes on selected routes/screen sizes.
- Route headings remain stable and all four sections render.
- Live demo/source links in README and `projects` data are reachable.
- No security regression in CSP placeholder behavior (visual smoke + production build check).

### Nice-to-have checks

- `npm audit --omit=dev` clean.
- Manual review of `build/index.html` for CSP and metadata.
- Confirm `docs/ROADMAP.md` and `README.md` still agree on feature count/status.

## Suggested milestone order

1. Refresh README truthfulness and roadmap as single source of execution truth.
2. Add canonical verification status block and periodic link validation procedure.
3. Complete low-friority hardening tasks that are documentation-owned (`S-01`, `S-03`, `SEO-01`).
4. Optional CI/process decision for visual smoke gating.
5. Optional action pinning and self-hosting plans if host risk profile changes.
6. Quarterly documentation hygiene pass: screenshots, links, counts, and evidence paths.

## Current Verification Status

- `npm run lint`: passed (exit 0).
- `npm run test`: passed (12 tests, exit 0).
- `npm run build`: passed (build completed successfully).
- `npm run visual:smoke`:
  - failed on port 4173 with `EPERM: listen ... 127.0.0.1:4173` (environment port conflict),
  - failed on port 4174 with `EPERM: listen ... 127.0.0.1:4174` (environment port restriction),
  - passed on 4174 when rerun with escalated execution privileges.
- `npm audit --omit=dev`: previous scan in `security_best_practices_report.md` passed with `0 vulnerabilities`; rerun only if dependencies change.
- Deployment workflow and headers status: unchanged for this documentation-only update.

## Next Agent Instructions

### First 5 tasks

1. Validate docs edits and commit history state.
- Files: `README.md`, `docs/ROADMAP.md`
- Why first: Prevents mixed ownership between old and new roadmaps.

2. Add date-stamped verification outcomes to README or roadmap sections.
- Files: `README.md`
- Why: Prevents stale claim drift.

3. Reconcile links and check for route/name mismatches.
- Files: `src/App.jsx`, `src/data/projects.js`, `README.md`, `docs/ROADMAP.md`
- Why: Keeps public docs and route semantics aligned.

4. Run `npm run check`.
- Files: none
- Why: Ensures existing gates still pass.

5. Run `VISUAL_SMOKE_PORT=4174 npm run visual:smoke` once.
- Files: `scripts/visual-smoke.mjs` (existing), `docs/` (for generated artifacts)
- Why: Confirms no UX regressions on mobile + desktop breakpoints.

### Commands before making changes

- `git status`
- `git log --oneline --decorate -n 8`
- `git show --stat -- README.md docs/ROADMAP.md`

### Commands after changes

- `npm run lint`
- `npm test`
- `npm run build`
- `VISUAL_SMOKE_PORT=4174 npm run visual:smoke` (if no local port conflict)
- `git diff --stat`

### Tests to verify

- `npm run check`
- Manual link validation (`curl -I`) for `projects` demo/source URLs
- `npm run visual:smoke` route/headings/alt-text checks
- Quick live verification of `build/index.html` CSP and metadata

### What not to break

- Do not change hash-route slugs without updating tests and documentation.
- Do not remove `aria` accessibility structure.
- Do not remove visual smoke checks or test coverage around route headings/social link labels.
- Do not alter production routing or data-schema behavior without explicit roadmap item and acceptance criteria.

### Recommended first commit message for the next agent

- `chore: stabilize roadmap and README verification posture`
