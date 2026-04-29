import ChessGameImage from "../assets/images/portfolio/chess-game.webp";
import CJIIIPickleballImage from "../assets/images/portfolio/cjiiipickleball.webp";
import CherryTreeImage from "../assets/images/portfolio/cherrytree.jpg";
import CryptoPriceImage from "../assets/images/portfolio/cryptoprice.jpg";
import WestWardRPGImage from "../assets/images/portfolio/westwardrpg.jpg";

export const projects = [
  {
    name: "WestWardRPG",
    description:
      "Framework-free 3D raycast RPG with combo-chain combat, quest progression, dynamic weather, and 8-language internationalization — built across 9 languages with Playwright-driven QA automation.",
    scope: "Polyglot game engine: canvas rendering, AI pathfinding, economic simulation, and cross-language tooling.",
    repo: "https://github.com/coleyrockin/WestWardRPG",
    tags: ["JavaScript", "TypeScript", "Python", "Go", "Rust", "PHP"],
    image: WestWardRPGImage,
    imageAlt: "WestWardRPG portfolio preview",
  },
  {
    name: "Chess-Game",
    description:
      "Dual-platform chess engine with Python/ModernGL desktop rendering and TypeScript/Babylon.js browser client — featuring engine-agnostic game logic designed for cross-platform portability.",
    scope: "WebGPU + WebGL rendering, shader-driven post-processing, and turn-based camera choreography.",
    repo: "https://github.com/coleyrockin/Chess-Game",
    tags: ["C++", "Python", "TypeScript", "JavaScript", "GLSL", "C#"],
    image: ChessGameImage,
    imageAlt: "Chess-Game portfolio preview",
  },
  {
    name: "CryptoPrice",
    description:
      "9,000+ LOC type-safe dashboard aggregating crypto and stock data with multi-tier caching (in-memory, durable KV, validated JSON fallback) and stale-if-error resilience across 98 source files.",
    scope: "React 19 + Vercel serverless with watchlist pinning, compare mode, logo proxy with security allowlisting, and full test suite.",
    repo: "https://github.com/coleyrockin/world-asset-prices",
    tags: ["TypeScript", "React", "Node.js", "Vercel"],
    image: CryptoPriceImage,
    imageAlt: "CryptoPrice dashboard project preview",
  },
  {
    name: "CherryTree",
    description:
      "Cinematic scroll-driven experience with 240+ WebGL-animated petals, 3 GSAP motion presets (parallax, crossfade, drift), and progressive media loading via IntersectionObserver.",
    scope: "Vite + Three.js + GSAP + Lenis: accessible motion choreography with reduced-motion support.",
    repo: "https://github.com/coleyrockin/CherryTree",
    tags: ["JavaScript", "Three.js", "GSAP", "Vite"],
    image: CherryTreeImage,
    imageAlt: "CherryTree project preview",
  },
  {
    name: "CJIIIPICKLEBALL",
    description:
      "Production community site delivered for a real client — featuring 10+ affiliate partner integrations, copy-to-clipboard coupon system, and strict Content-Security-Policy with script-src 'self' enforcement.",
    scope: "Client-facing web product with conversion-focused UX, Facebook Open Graph integration, and security hardening.",
    repo: "https://github.com/coleyrockin/CJIIIPICKLEBALL",
    tags: ["HTML", "CSS", "JavaScript", "Web Security"],
    image: CJIIIPickleballImage,
    imageAlt: "CJIIIPICKLEBALL website preview",
  },
];
