const publicPath = (import.meta.env.BASE_URL || "/").replace(/\/$/, "");

export const languageGroups = [
  {
    title: "Core",
    languages: [
      { name: "JavaScript", tier: "primary" },
      { name: "TypeScript", tier: "primary" },
      { name: "Python", tier: "primary" },
      { name: "Java", tier: "primary" },
      { name: "C#", tier: "proficient" },
    ],
  },
  {
    title: "Systems and Backend",
    languages: [
      { name: "C++", tier: "proficient" },
      { name: "C", tier: "familiar" },
      { name: "Go", tier: "proficient" },
      { name: "Rust", tier: "familiar" },
      { name: "PHP", tier: "familiar" },
      { name: "Ruby", tier: "familiar" },
      { name: "Perl", tier: "familiar" },
      { name: "Shell", tier: "proficient" },
    ],
  },
  {
    title: "Web and Specialized",
    languages: [
      { name: "HTML", tier: "primary" },
      { name: "CSS", tier: "primary" },
      { name: "Handlebars", tier: "familiar" },
      { name: "GLSL", tier: "familiar" },
    ],
  },
];

export const capabilityPillars = [
  {
    title: "Product Engineering",
    description:
      "Build and ship user-facing features with clear UX decisions, maintainable architecture, and practical iteration.",
  },
  {
    title: "Backend and Data",
    description:
      "Design API layers, model data relationships, and structure services for predictable performance and scalability.",
  },
  {
    title: "AI-Accelerated Delivery",
    description:
      "Use AI tooling for faster prototyping, code quality loops, and system-level exploration without sacrificing rigor.",
  },
];

export const certifications = [
  {
    title: "Java Programmer + Python Developer",
    provider: "Baylor Professional Education / ed2go",
    detail: "255 hours completed • July 18, 2023",
    link: `${publicPath}/certificates/baylor-java-python-certificate.pdf`,
    buttonText: "View Certificate",
  },
  {
    title: "Web Development Certificate",
    provider: "Southern Methodist University",
    detail: "MERN-focused developer program",
    link: "https://www.credly.com/badges/8329e5c9-3399-4e92-906a-78eb4548a282/public_url",
    buttonText: "View Credential",
  },
];

export const languageSourceNote =
  "Language source of truth: derived from public GitHub repositories and active project history.";

export const aiExperienceCopy = [
  "Built PythonAINews — a daily automation pipeline using LLM-assisted draft generation with human-in-the-loop approval gates and test-backed publishing.",
  "Use Claude and GPT daily for code review, architecture exploration, debugging, and test generation across all active projects.",
  "Design prompt workflows for rapid prototyping, turning natural-language specs into working code with iterative refinement.",
  "Study AI agent patterns, tool-use architectures, and retrieval-augmented generation to build more capable software systems.",
];
