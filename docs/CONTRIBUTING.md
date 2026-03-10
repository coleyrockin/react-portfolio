# Contributing & Development Notes

## Adding a README Screenshot

To add or update the portfolio screenshot displayed on GitHub:

1. Run `npm start` to launch the dev server
2. Open [http://localhost:3000](http://localhost:3000) in Chrome
3. Open DevTools → Device Toolbar → set viewport to **1280 × 800**
4. Navigate to the **About** section for the best hero view
5. Take a full-page screenshot (⌘⇧P → "Capture screenshot" in Chrome DevTools)
6. Save as `docs/screenshot.png`
7. Update `README.md` to reference it:

```markdown
![Boyd Roberts Portfolio](docs/screenshot.png)
```

## Updating Project Data

All content is centralized in `src/data/`:

- **`projects.js`** — Add, remove, or update featured projects (name, description, tags, image, repo link)
- **`languages.js`** — Update language groups, capability pillars, certifications, and AI experience copy
- **`socialLinks.js`** — Update social profile handles and URLs
- **`iconMap.js`** — Map social profile keys to icon components

No component code needs to change when updating content — editing the data files is sufficient.

## Adding a New Project

1. Add a project image to `src/assets/images/portfolio/` (PNG or JPG, ideally 1280×720)
2. Import it in `src/data/projects.js`
3. Add an entry to the `projects` array with the required fields:

```js
{
  name: "ProjectName",
  description: "One or two sentence summary of what was built and why it matters.",
  scope: "Short phrase describing the technical focus.",
  repo: "https://github.com/username/repo",
  tags: ["Tech1", "Tech2", "Tech3"],
  image: ProjectImage,
  imageAlt: "ProjectName project preview",
}
```

## Deployment

The site deploys to GitHub Pages from the `build/` output directory:

```bash
npm run deploy
```

This runs `npm run build` automatically (via `predeploy`) before pushing to the `gh-pages` branch.
