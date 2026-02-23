import ChessGameImage from "../assets/images/portfolio/chess-game.png";
import CherryTreeImage from "../assets/images/portfolio/cherrytree.png";
import CryptoPriceImage from "../assets/images/portfolio/cryptoprice.png";
import MVCTechBlogImage from "../assets/images/portfolio/mvctechblog.png";
import SocialNetworkApiImage from "../assets/images/portfolio/social-network-api.png";
import WestWardRPGImage from "../assets/images/portfolio/westwardrpg.png";

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
      "Delivered a market-tracking interface with data-driven views, responsive layout decisions, and production-oriented front-end structure.",
    scope: "Data UI, API-driven updates, and responsive interface architecture.",
    repo: "https://github.com/coleyrockin/cryptoprice",
    tags: ["TypeScript", "JavaScript", "CSS", "HTML"],
    image: CryptoPriceImage,
    imageAlt: "CryptoPrice dashboard project preview",
  },
  {
    name: "Social-Network-API",
    description:
      "Designed and implemented API-first backend architecture for social features with clear route/controller/model separation.",
    scope: "Backend architecture, relationship modeling, and API design.",
    repo: "https://github.com/coleyrockin/Social-Network-API",
    tags: ["JavaScript", "Node.js", "Express", "MongoDB"],
    image: SocialNetworkApiImage,
    imageAlt: "Social-Network-API portfolio preview",
  },
  {
    name: "MVCTechBlog",
    description:
      "Implemented a complete MVC web application with authentication, session handling, template rendering, and durable persistence.",
    scope: "Full-stack MVC app with auth and persistence.",
    repo: "https://github.com/coleyrockin/MVCTechBlog",
    tags: ["JavaScript", "Handlebars", "CSS", "SQL"],
    image: MVCTechBlogImage,
    imageAlt: "MVC Tech Blog project preview",
  },
  {
    name: "CherryTree",
    description:
      "Built a polished product experience focused on practical UX, modern architecture, and production-ready execution.",
    scope: "Product build with frontend and backend integration.",
    repo: "https://github.com/coleyrockin/CherryTree",
    tags: ["TypeScript", "React", "Node.js", "CSS"],
    image: CherryTreeImage,
    imageAlt: "CherryTree project preview",
  },
];
