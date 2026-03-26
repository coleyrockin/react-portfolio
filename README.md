# Boyd Roberts — Developer Portfolio

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-Modules-1572B6?style=flat&logo=css3&logoColor=white)
![React Icons](https://img.shields.io/badge/React_Icons-4.6-E91E63?style=flat&logo=react&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-Deployed-222?style=flat&logo=githubpages&logoColor=white)

**Live Site:** [coleyrockin.github.io/react-portfolio](https://coleyrockin.github.io/react-portfolio/)

---

## About

A modern, single-page developer portfolio built with React 18. Showcases selected engineering projects, technical skills, certifications, and professional experience with a clean, responsive design featuring glassmorphism styling and smooth animations.

## Features

- **Hash-based routing** — deep-linkable sections with browser back/forward support
- **Responsive design** — mobile-first layout with glassmorphism nav and gradient backgrounds
- **Accessibility** — skip link, aria-current navigation, prefers-reduced-motion support, keyboard focus management
- **Data-driven rendering** — projects, languages, certifications, and social links sourced from centralized data modules
- **PWA-ready** — web app manifest, themed favicons, OG/Twitter meta tags for social sharing
- **Subtle animations** — fade-in section transitions (disabled for reduced-motion preference)

## Sections

| Section | Description |
|---------|-------------|
| **About** | Professional summary, core strengths, and background |
| **Projects** | Selected work with live demos and source links |
| **Skills** | Languages, frameworks, and tools with proficiency indicators |
| **Certifications** | Professional certifications and completed programs |
| **Contact** | Social links and contact information |

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Frontend** | React 18, JavaScript ES6+, CSS Modules |
| **Icons** | React Icons 4.6 |
| **Testing** | Testing Library, Jest |
| **Build** | Create React App (react-scripts 5) |
| **Deployment** | GitHub Pages via gh-pages |

## Getting Started

```bash
# Clone the repository
git clone https://github.com/coleyrockin/react-portfolio.git

# Navigate to the project
cd react-portfolio

# Install dependencies
npm install

# Start the development server
npm start
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start development server |
| `npm run build` | Production build |
| `npm test` | Run tests |
| `npm run deploy` | Deploy to GitHub Pages |

## Project Structure

```
react-portfolio/
├── public/            # Static assets, manifest, favicons
├── src/               # React source code
│   ├── components/    # Reusable UI components
│   ├── data/          # Centralized content modules
│   └── styles/        # CSS modules and global styles
├── CNAME              # Custom domain configuration
└── package.json       # Dependencies and scripts
```

---

*Built with React and deployed on GitHub Pages.*
