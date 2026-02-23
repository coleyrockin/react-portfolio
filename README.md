# Developer Portfolio

Personal developer portfolio built with **React**, **Tailwind CSS**, and **React Icons**.  
Live at: [coleyrockin.github.io/react-portfolio](https://coleyrockin.github.io/react-portfolio/)

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| [React 17](https://reactjs.org/) | UI component library |
| [Tailwind CSS 3](https://tailwindcss.com/) | Utility-first styling |
| [React Icons](https://react-icons.github.io/react-icons/) | Social / UI icons |
| [react-scripts / CRA](https://create-react-app.dev/) | Build tooling and test runner |
| [Testing Library](https://testing-library.com/) | Component and integration tests |

---

## Project Structure

```
src/
├── App.js                  # Root component — section routing and layout shell
├── index.js                # React DOM entry point
├── index.css               # Global styles and CSS custom properties
├── setupTests.js           # Jest / Testing Library global setup
├── assets/
│   └── images/             # Profile photo, credential badge, and project screenshots
├── components/
│   ├── About/              # Hero panel — bio, highlights, and credential links
│   ├── Contact/            # Social profile cards (Instagram, LinkedIn, GitHub)
│   ├── Footer/             # Copyright notice and social icon links
│   ├── Nav/                # Sticky top navigation with active-section indicator
│   ├── Portfolio/          # Project card grid driven by data/projects.js
│   └── Resume/             # Engineering knowledge — language map, capabilities, and certs
├── data/
│   ├── languages.js        # Language groups, capability pillars, certifications, and AI copy
│   └── projects.js         # Project metadata (name, description, tags, image, repo URL)
└── utils/
    └── helpers.js          # Shared utility functions (email validation, string helpers)
```

---

## Components

### `App`
Root component that owns section state. Renders `Nav`, the active section, and `Footer`.  
Sections are defined as a static array so adding a new page only requires one entry.

### `Nav`
Sticky floating header with the developer name and pill-style nav buttons.  
The active section receives `aria-current="page"` for accessibility.

### `About`
Hero panel with profile photo, short bio, a highlight grid (Core Stack / Focus / Current Growth), and links to both developer credentials.

### `Portfolio`
Grid of `ProjectCard` components populated from `data/projects.js`.  
Each card shows a project screenshot, description, scope note, technology tags, and a repository link.

### `Resume` (Knowledge)
Summarises engineering breadth across three sub-sections:
- **Language Map** — chips grouped by category, sourced from `data/languages.js`
- **Capability Pillars** — Product Engineering, Backend and Data, AI-Accelerated Delivery
- **Certifications** — SMU Web Development and Baylor Java + Python credentials with external links
- **AI Experience** — short copy describing two-plus years of daily AI tooling use

### `Contact`
Social profile cards linking to Instagram, LinkedIn, and GitHub.  
All links open in a new tab with `rel="noopener noreferrer"`.

### `Footer`
Displays the current year copyright and icon links to the same three social profiles.

---

## Data Files

### `src/data/projects.js`
Exports a `projects` array. Each project object has:

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Display name and card heading |
| `description` | string | One-sentence project summary |
| `scope` | string | Italicised scope / focus note |
| `repo` | string | GitHub repository URL |
| `tags` | string[] | Technology tags rendered as pills |
| `image` | import | Imported project screenshot |
| `imageAlt` | string | Alt text for the screenshot |

### `src/data/languages.js`
Exports four named constants consumed by the `Resume` component:

| Export | Description |
|--------|-------------|
| `languageGroups` | Array of `{ title, languages[] }` used in the Language Map section |
| `capabilityPillars` | Array of `{ title, description }` for the capability grid |
| `certifications` | Array of credential objects with link and button text |
| `aiExperienceCopy` | Array of paragraph strings for the AI Experience section |
| `languageSourceNote` | Source-of-truth footnote string |

---

## Utilities

### `src/utils/helpers.js`

| Function | Signature | Description |
|----------|-----------|-------------|
| `capitalizeFirstLetter` | `(string) => string` | Returns the input with its first character uppercased |
| `validateEmail` | `(email) => boolean` | Returns `true` if the string is a valid email address |

---

## Available Scripts

```bash
npm start       # Start development server at http://localhost:3000
npm test        # Run the Jest test suite (watch mode off in CI)
npm run build   # Production build to /build
npm run deploy  # Build then push to GitHub Pages via gh-pages
```

---

## Tests

Tests live next to the code they cover:

| File | What it tests |
|------|--------------|
| `src/App.test.js` | Renders, nav buttons, section switching, footer |
| `src/utils/helpers.test.js` | `capitalizeFirstLetter` and `validateEmail` |
| `src/components/About/__tests__/About.test.js` | Heading, photo, credential links, highlight grid |
| `src/components/Nav/__tests__/Nav.test.js` | Brand name, section buttons, active state, click handler |
| `src/components/Footer/__tests__/Footer.test.js` | Copyright year, social icon links |
| `src/components/Portfolio/__tests__/Portfolio.test.js` | Section heading, all project cards, repo links |
| `src/components/Resume/__tests__/Resume.test.js` | Heading, language groups, pillars, certs, AI section |
| `src/components/Contact/__tests__/Contact.test.js` | Heading, social cards, handles, external link attributes |

Run all tests:

```bash
npm test -- --watchAll=false
```

---

## Deployment

The portfolio is deployed to GitHub Pages at **[coleyrockin.github.io/react-portfolio](https://coleyrockin.github.io/react-portfolio/)**.

```bash
npm run deploy
```

This runs `npm run build` first (`predeploy`) then publishes the `build/` directory via `gh-pages`.

---

## Screenshot

![Portfolio screenshot](./src/assets/images/PortfolioIMG.png)

