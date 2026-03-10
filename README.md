# Boyd Roberts — Software Engineer Portfolio

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Deployed on GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-222?logo=github)
![License](https://img.shields.io/badge/License-All%20Rights%20Reserved-lightgrey)

A modern, single-page portfolio built with **React 18** showcasing selected engineering work, technical depth, certifications, and AI workflow experience.

**[🌐 View Live Site →](https://coleyrockin.github.io/react-portfolio/)**

---

## What This Is

This portfolio is a production-deployed React application that serves as a professional home for Boyd Roberts — a software engineer with a MERN-focused core stack and a background spanning frontend, backend, game systems, and AI-accelerated delivery.

It is designed to give recruiters, employers, and collaborators a fast, clear read on engineering capability: what has been built, what languages and tools are in active use, and how to connect.

---

## Features

- **Hash-based routing** — deep-linkable sections with browser back/forward support
- **Responsive design** — mobile-first layout with glassmorphism nav and gradient backgrounds
- **Accessibility** — skip link, `aria-current` navigation, `prefers-reduced-motion` support, keyboard focus management
- **Data-driven rendering** — projects, languages, certifications, and social links all sourced from centralized data modules
- **PWA-ready** — web app manifest, themed favicons, OG/Twitter meta tags for social sharing
- **Graceful image fallbacks** — project cards degrade gracefully when preview images are unavailable
- **Subtle animations** — fade-in section transitions (disabled for reduced-motion preference)

## Sections

| Section | Description |
|---------|-------------|
| **About** | Professional summary, core stack highlights, and credential links |
| **Portfolio** | Six featured projects with screenshots, tech tags, and repo links |
| **Contact** | Social profile cards (GitHub, LinkedIn, Instagram) |
| **Knowledge** | Language map, engineering capabilities, certifications, and AI experience |

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Framework** | React 18, Create React App |
| **Styling** | Custom CSS design system with CSS custom properties |
| **Icons** | React Icons (Font Awesome) |
| **Fonts** | Bricolage Grotesque, Space Grotesk (Google Fonts) |
| **Deployment** | GitHub Pages via `gh-pages` |

## Featured Projects

| Project | Description | Stack |
|---------|-------------|-------|
| [WestWardRPG](https://github.com/coleyrockin/WestWardRPG) | Large-scale RPG codebase with a polyglot toolchain | JS, TS, Python, Go, Rust, PHP |
| [Chess-Game](https://github.com/coleyrockin/Chess-Game) | Chess platform with engine logic and graphics experimentation | C++, Python, TS, GLSL, C# |
| [CryptoPrice](https://github.com/coleyrockin/cryptoprice) | Production crypto dashboard with resilient provider fallbacks | TypeScript, React, Node.js |
| [CherryTree](https://github.com/coleyrockin/CherryTree) | Scroll-driven 3D web experience with GSAP choreography | JS, Three.js, GSAP, Vite |
| [PythonAINews](https://github.com/coleyrockin/PythonAINews) | LLM-assisted news automation pipeline with approval-gated publishing | Python, Automation |
| [CJIIIPICKLEBALL](https://github.com/coleyrockin/CJIIIPICKLEBALL) | Real-world community site with custom branding and CSP hardening | HTML, CSS, JS |

## Project Structure

```
src/
├── App.js                    # Main app shell with hash routing
├── index.js                  # React 18 createRoot entry point
├── index.css                 # Full CSS design system
├── assets/images/            # Profile photo, badge, project screenshots
├── components/
│   ├── About/                # Bio, highlights, credential links
│   ├── Contact/              # Social profile grid
│   ├── Footer/               # Copyright + social icon links
│   ├── Nav/                  # Sticky glassmorphism navigation
│   ├── Portfolio/            # Project cards with image fallbacks
│   └── Resume/               # Language map, capabilities, certs, AI
├── data/
│   ├── iconMap.js            # Shared icon component mapping
│   ├── languages.js          # Language groups, capabilities, certs
│   ├── projects.js           # Featured project data
│   └── socialLinks.js        # Social profile links
public/
├── index.html                # HTML template with OG/Twitter meta
├── site.webmanifest          # PWA manifest
├── certificates/             # PDF credential files
└── images/                   # Favicons and app icons
```

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm start
```

Opens at [http://localhost:3000](http://localhost:3000).

## Build & Deploy

```bash
# Create optimized production build
npm run build

# Deploy to GitHub Pages
npm run deploy
```

The `predeploy` script runs `npm run build` automatically before deploying.

## Future Improvements

- Add a dark/light mode toggle
- Add a contact form with email delivery (e.g., EmailJS or Formspree)
- Expand the Portfolio section with more project detail pages or modal overlays
- Add GitHub stats or language usage badges pulled from the API
- Improve performance with image optimization (WebP conversion, responsive `srcset`)
- Add automated testing coverage for component rendering

See [ROADMAP.md](ROADMAP.md) for the full planned feature list.

## Why This Project Exists

Most portfolio templates are either generic or over-engineered. This one is built from scratch with a clear engineering philosophy: clean component boundaries, centralized data, no framework bloat, and a design system that scales. It demonstrates the same principles that apply to any product-facing codebase — intentional architecture, maintainability, and attention to user experience.

## Contributing / Screenshot Instructions

See [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) for instructions on how to add screenshots or contribute improvements.

## License

© 2026 Boyd Roberts. All rights reserved.
