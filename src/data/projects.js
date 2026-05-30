import WorldAssetPricesImage from "../assets/images/portfolio/world-asset-prices-dark-1280.webp";
import WorldAssetPricesImage720 from "../assets/images/portfolio/world-asset-prices-dark-720.webp";
import CherryTreeImage from "../assets/images/portfolio/cherrytree-1280.webp";
import CherryTreeImage720 from "../assets/images/portfolio/cherrytree-720.webp";
import WestWardRPGImage from "../assets/images/portfolio/westwardrpg-1280.webp";
import WestWardRPGImage720 from "../assets/images/portfolio/westwardrpg-720.webp";
import POWOImage from "../assets/images/portfolio/powo-1280.webp";
import POWOImage720 from "../assets/images/portfolio/powo-720.webp";
import CJIIIPickleballImage from "../assets/images/portfolio/cjiiipickleball-1280.webp";
import CJIIIPickleballImage720 from "../assets/images/portfolio/cjiiipickleball-720.webp";

export const projects = [
  {
    name: "World Asset Prices",
    featured: true,
    category: "Realtime Financial Data Platform",
    description:
      "Tracks major stocks, ETFs, currencies, and crypto by market cap in a single live dashboard with watchlist and trend sparklines.",
    scope:
      "Built with React 19 + Vercel serverless using resilient cache fallbacks (live -> fresh -> stale-if-error) and a secured logo proxy.",
    highlights: ["Single endpoint architecture", "CI quality gates", "Production caching strategy"],
    metrics: [
      { label: "Tracked Assets", value: "Top 10 by cap" },
      { label: "API Surface", value: "1 endpoint" },
    ],
    repo: "https://github.com/coleyrockin/world-asset-prices",
    demo: "https://world-asset-prices.vercel.app",
    tags: ["TypeScript", "React 19", "Vercel", "Node.js"],
    image: WorldAssetPricesImage,
    imageSrcSet: `${WorldAssetPricesImage720} 720w, ${WorldAssetPricesImage} 1280w`,
    imageAlt: "World Asset Prices — live global assets dashboard",
  },
  {
    name: "POWO — Proof of Workout",
    featured: true,
    category: "Health Analytics Dashboard",
    description:
      "Transforms Apple Health exports into a mobile-first analytics experience with workout, sleep, cardio, and VO2 Max trend tracking.",
    scope:
      "Built in Next.js 16 with data parsing pipelines, period-over-period comparison views, and animated metric reveals.",
    highlights: ["91-day health timeline", "HealthKit XML parser", "Performance-focused mobile UX"],
    metrics: [
      { label: "Data Window", value: "91 days" },
      { label: "Framework", value: "Next.js 16" },
    ],
    repo: "https://github.com/coleyrockin/POWO",
    demo: "https://proof-of-workout-next.vercel.app",
    tags: ["Next.js 16", "TypeScript", "React", "Apple Health"],
    image: POWOImage,
    imageSrcSet: `${POWOImage720} 720w, ${POWOImage} 1280w`,
    imageAlt: "POWO fitness dashboard preview",
  },
  {
    name: "CherryTree",
    category: "Interactive Motion Experience",
    description:
      "Delivers a cinematic WebGL gallery with layered motion choreography, ambient sound design, and progressive media loading.",
    scope:
      "Built with Three.js + GSAP + Lenis, including reduced-motion accessibility and DPR-aware rendering for stable performance.",
    highlights: ["240+ animated petals", "Three GSAP motion modes", "Reduced-motion support"],
    metrics: [
      { label: "Animated Elements", value: "240+" },
      { label: "Motion Modes", value: "3 presets" },
    ],
    repo: "https://github.com/coleyrockin/CherryTree",
    demo: "https://cherry-tree-psi.vercel.app",
    tags: ["JavaScript", "Three.js", "GSAP", "Vite"],
    image: CherryTreeImage,
    imageSrcSet: `${CherryTreeImage720} 720w, ${CherryTreeImage} 1280w`,
    imageAlt: "CherryTree cinematic gallery preview",
  },
  {
    name: "WestWardRPG",
    category: "Polyglot Browser Game Engine",
    description:
      "Framework-free RPG featuring raycasting combat, quest systems, weather simulation, localization, and an NPC-driven in-game economy.",
    scope:
      "Built across 9 languages with custom rendering, AI pathfinding, economic simulation logic, and Playwright-driven quality checks.",
    highlights: [
      "9-language architecture",
      "Canvas engine + AI systems",
      "Playwright QA automation",
    ],
    metrics: [
      { label: "Languages", value: "9" },
      { label: "Localization", value: "8 locales" },
    ],
    repo: "https://github.com/coleyrockin/WestWardRPG",
    demo: "https://westward-rpg.vercel.app",
    tags: ["JavaScript", "TypeScript", "Python", "Go"],
    image: WestWardRPGImage,
    imageSrcSet: `${WestWardRPGImage720} 720w, ${WestWardRPGImage} 1280w`,
    imageAlt: "WestWardRPG browser game preview",
  },
  {
    name: "CJIII Pickleball",
    category: "Client Marketing Site",
    description:
      "Production community site for a real sports brand focused on conversion, affiliate performance, and polished content presentation.",
    scope:
      "Implemented with custom coupon tooling, 10+ affiliate integrations, Open Graph setup, and strict CSP script-src 'self' hardening.",
    highlights: [
      "Real client delivery",
      "Affiliate conversion features",
      "Security-first deployment",
    ],
    metrics: [
      { label: "Affiliate Partners", value: "10+" },
      { label: "Delivery Type", value: "Production" },
    ],
    repo: "https://github.com/coleyrockin/CJIIIPICKLEBALL",
    demo: "https://cjspickleball.netlify.app",
    tags: ["HTML", "CSS", "JavaScript", "Web Security"],
    image: CJIIIPickleballImage,
    imageSrcSet: `${CJIIIPickleballImage720} 720w, ${CJIIIPickleballImage} 1280w`,
    imageAlt: "CJIIIPICKLEBALL community site preview",
  },
];
