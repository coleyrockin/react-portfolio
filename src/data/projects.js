import WorldAssetPricesImage from "../assets/images/portfolio/world-asset-prices.jpg";
import CherryTreeImage from "../assets/images/portfolio/cherrytree.jpg";
import WestWardRPGImage from "../assets/images/portfolio/westwardrpg.jpg";
import POWOImage from "../assets/images/portfolio/powo.jpg";
import CJIIIPickleballImage from "../assets/images/portfolio/cjiiipickleball.jpg";

export const projects = [
  {
    name: "World Asset Prices",
    featured: true,
    category: "Realtime Financial Data Platform",
    description:
      "Tracks major stocks, ETFs, currencies, and crypto by market cap in a single live dashboard with watchlist and trend sparklines.",
    scope: "Built with React 19 + Vercel serverless using resilient cache fallbacks (live -> fresh -> stale-if-error) and a secured logo proxy.",
    highlights: ["Single endpoint architecture", "CI quality gates", "Production caching strategy"],
    metrics: [
      { label: "Tracked Assets", value: "Top 10+" },
      { label: "API Surface", value: "1 endpoint" },
    ],
    repo: "https://github.com/coleyrockin/world-asset-prices",
    demo: "https://world-asset-prices.vercel.app",
    tags: ["TypeScript", "React 19", "Vercel", "Node.js"],
    image: WorldAssetPricesImage,
    imageAlt: "World Asset Prices — live global assets dashboard",
  },
  {
    name: "POWO",
    featured: true,
    category: "Health Analytics Dashboard",
    description:
      "Transforms Apple Health exports into a mobile-first analytics experience with workout, sleep, cardio, and VO2 Max trend tracking.",
    scope: "Built in Next.js 15 with data parsing pipelines, period-over-period comparison views, and animated metric reveals.",
    highlights: ["91-day health timeline", "HealthKit XML parser", "Performance-focused mobile UX"],
    metrics: [
      { label: "Data Window", value: "91 days" },
      { label: "Framework", value: "Next.js 15" },
    ],
    repo: "https://github.com/coleyrockin/POWO",
    tags: ["Next.js 15", "TypeScript", "React", "Apple Health"],
    image: POWOImage,
    imageAlt: "POWO fitness dashboard preview",
  },
  {
    name: "CherryTree",
    category: "Interactive Motion Experience",
    description:
      "Delivers a cinematic WebGL gallery with layered motion choreography, ambient sound design, and progressive media loading.",
    scope: "Built with Three.js + GSAP + Lenis, including reduced-motion accessibility and DPR-aware rendering for stable performance.",
    highlights: ["240+ animated petals", "Three GSAP motion modes", "Reduced-motion support"],
    metrics: [
      { label: "Animated Elements", value: "240+" },
      { label: "Motion Modes", value: "3 presets" },
    ],
    repo: "https://github.com/coleyrockin/CherryTree",
    tags: ["JavaScript", "Three.js", "GSAP", "Vite"],
    image: CherryTreeImage,
    imageAlt: "CherryTree cinematic gallery preview",
  },
  {
    name: "WestWardRPG",
    category: "Polyglot Browser Game Engine",
    description:
      "Framework-free RPG featuring raycasting combat, quest systems, weather simulation, localization, and an NPC-driven in-game economy.",
    scope: "Built across 9 languages with custom rendering, AI pathfinding, economic simulation logic, and Playwright-driven quality checks.",
    highlights: ["9-language architecture", "Canvas engine + AI systems", "Playwright QA automation"],
    metrics: [
      { label: "Languages", value: "9" },
      { label: "Localization", value: "8 locales" },
    ],
    repo: "https://github.com/coleyrockin/WestWardRPG",
    tags: ["JavaScript", "TypeScript", "Python", "Go"],
    image: WestWardRPGImage,
    imageAlt: "WestWardRPG browser game preview",
  },
  {
    name: "CJIIIPICKLEBALL",
    category: "Client Marketing Site",
    description:
      "Production community site for a real sports brand focused on conversion, affiliate performance, and polished content presentation.",
    scope: "Implemented with custom coupon tooling, 10+ affiliate integrations, Open Graph setup, and strict CSP script-src 'self' hardening.",
    highlights: ["Real client delivery", "Affiliate conversion features", "Security-first deployment"],
    metrics: [
      { label: "Affiliate Partners", value: "10+" },
      { label: "Delivery Type", value: "Production" },
    ],
    repo: "https://github.com/coleyrockin/CJIIIPICKLEBALL",
    demo: "https://cjspickleball.netlify.app",
    tags: ["HTML", "CSS", "JavaScript", "Web Security"],
    image: CJIIIPickleballImage,
    imageAlt: "CJIIIPICKLEBALL community site preview",
  },
];
