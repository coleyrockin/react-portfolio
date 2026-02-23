const publicPath = process.env.PUBLIC_URL || "";

export const languageGroups = [
  {
    title: "Core",
    languages: ["JavaScript", "TypeScript", "Python", "Java", "C#"],
  },
  {
    title: "Systems and Backend",
    languages: ["C++", "C", "Go", "Rust", "PHP", "Ruby", "Perl", "Shell"],
  },
  {
    title: "Web and Specialized",
    languages: ["HTML", "CSS", "Handlebars", "GLSL"],
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
  "I have been on the frontier of AI research and practical application for over 2 years, using AI tools daily to accelerate development, ideation, and problem solving.",
  "I actively study and experiment with AI agents, prompt design, and tool-driven workflows to build more capable software systems.",
];
