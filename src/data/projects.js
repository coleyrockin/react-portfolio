import WorldAssetPricesImage from "../assets/images/portfolio/world-asset-prices-dark-1280.webp";
import WorldAssetPricesImage720 from "../assets/images/portfolio/world-asset-prices-dark-720.webp";
import NeonCityChessImage from "../assets/images/portfolio/neon-city-chess-1280.webp";
import NeonCityChessImage720 from "../assets/images/portfolio/neon-city-chess-720.webp";
import POWOImage from "../assets/images/portfolio/powo-1280.webp";
import POWOImage720 from "../assets/images/portfolio/powo-720.webp";
import CherryTreeImage from "../assets/images/portfolio/cherrytree-1280.webp";
import CherryTreeImage720 from "../assets/images/portfolio/cherrytree-720.webp";

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
    name: "Neon City Chess",
    featured: true,
    category: "Real-Time 3D Chess Engine",
    description:
      "A browser-first 3D chess game with a premium Three.js Staunton board, full chess.js rule enforcement, and an AI opponent across three difficulty tiers.",
    scope:
      "Built in React + Three.js with the engine running in a Web Worker — iterative-deepening alpha-beta, transposition table, quiescence search, and a tapered evaluation — plus FEN share, PGN import/export, and screen-reader board navigation.",
    highlights: [
      "Alpha-beta engine in a Web Worker",
      "Full chess.js rule set",
      "Screen-reader board navigation",
    ],
    metrics: [
      { label: "AI Engine", value: "Web Worker" },
      { label: "Difficulty", value: "3 tiers" },
    ],
    repo: "https://github.com/coleyrockin/Chess-Game",
    demo: "https://neon-city-chess.vercel.app",
    tags: ["React", "Three.js", "chess.js", "Web Workers"],
    image: NeonCityChessImage,
    imageSrcSet: `${NeonCityChessImage720} 720w, ${NeonCityChessImage} 1280w`,
    imageAlt: "Neon City Chess — 3D Staunton board with live game HUD",
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
    imageAlt: "CherryTree bloom scene — pink cherry blossoms in cinematic gallery",
  },
];
