import ChessGameImage from "../assets/images/portfolio/chess-game.jpg";
import CJIIIPickleballImage from "../assets/images/portfolio/cjiiipickleball.jpg";
import CherryTreeImage from "../assets/images/portfolio/cherrytree.jpg";
import CryptoPriceImage from "../assets/images/portfolio/cryptoprice.jpg";
import WestWardRPGImage from "../assets/images/portfolio/westwardrpg.jpg";

export const projects = [
  {
    name: "WestWardRPG",
    description:
      "Architected and iterated on a large-scale RPG codebase with a polyglot toolchain and gameplay-driven feature delivery.",
    scope: "Polyglot game systems and production delivery workflow.",
    repo: "https://github.com/coleyrockin/WestWardRPG",
    tags: ["JavaScript", "TypeScript", "Python", "Go", "Rust", "PHP"],
    image: WestWardRPGImage,
    imageAlt: "WestWardRPG portfolio preview",
  },
  {
    name: "Chess-Game",
    description:
      "Built a chess platform that blends engine logic, interactive UI layers, and graphics experimentation into one cohesive build.",
    scope: "Engine logic, frontend state, and rendering experimentation.",
    repo: "https://github.com/coleyrockin/Chess-Game",
    tags: ["C++", "Python", "TypeScript", "JavaScript", "GLSL", "C#"],
    image: ChessGameImage,
    imageAlt: "Chess-Game portfolio preview",
  },
  {
    name: "cryptoprice",
    description:
      "Shipped a production crypto/asset dashboard with resilient provider fallbacks, typed API contracts, and polished data-heavy UX.",
    scope: "Type-safe full-stack market dashboard with reliability-first API behavior.",
    repo: "https://github.com/coleyrockin/cryptoprice",
    tags: ["TypeScript", "React", "Node.js", "Vercel"],
    image: CryptoPriceImage,
    imageAlt: "CryptoPrice dashboard project preview",
  },
  {
    name: "CherryTree",
    description:
      "Built a cinematic, scroll-driven web experience combining 3D graphics, choreography, and progressive media loading.",
    scope: "Vite + Three.js + GSAP experience engineering for high-impact interaction.",
    repo: "https://github.com/coleyrockin/CherryTree",
    tags: ["JavaScript", "Three.js", "GSAP", "Vite"],
    image: CherryTreeImage,
    imageAlt: "CherryTree project preview",
  },
  {
    name: "PythonAINews",
    description:
      "Engineered a safe daily automation pipeline for AI/tech news ranking, LLM-assisted draft generation, and approval-gated publishing.",
    scope: "Python automation system with validation, scheduling, and test-backed publishing workflow.",
    repo: "https://github.com/coleyrockin/PythonAINews",
    tags: ["Python", "Automation", "LLM Workflows", "Testing"],
    image: "",
    imageAlt: "PythonAINews automation engine overview",
  },
  {
    name: "CJIIIPICKLEBALL",
    description:
      "Delivered a real-world community site with custom branding, conversion-focused layout, and deployment hardening.",
    scope: "Client-facing web product with UX polish, CSP/security tightening, and social integration.",
    repo: "https://github.com/coleyrockin/CJIIIPICKLEBALL",
    tags: ["HTML", "CSS", "JavaScript", "Web Security"],
    image: CJIIIPickleballImage,
    imageAlt: "CJIIIPICKLEBALL website preview",
  },
];
