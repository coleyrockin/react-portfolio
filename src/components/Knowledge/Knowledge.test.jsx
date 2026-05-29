import { render, screen, within } from "@testing-library/react";
import Knowledge from "./index";
import {
  aiExperienceCopy,
  capabilityPillars,
  certifications,
  languageGroups,
} from "../../data/languages";

describe("Knowledge", () => {
  test("renders every language group heading and each language chip", () => {
    render(<Knowledge />);

    languageGroups.forEach((group) => {
      const heading = screen.getByRole("heading", { name: group.title });
      expect(heading).toBeInTheDocument();
      group.languages.forEach((language) => {
        expect(screen.getByText(language.name, { exact: true })).toBeInTheDocument();
      });
    });
  });

  test("renders all capability pillars with their descriptions", () => {
    render(<Knowledge />);

    capabilityPillars.forEach((pillar) => {
      expect(screen.getByRole("heading", { name: pillar.title })).toBeInTheDocument();
      expect(screen.getByText(pillar.description)).toBeInTheDocument();
    });
  });

  test("renders the AI-accelerated work section with every bullet", () => {
    render(<Knowledge />);

    const region = screen.getByRole("region", { name: "AI-Accelerated Work" });
    aiExperienceCopy.forEach((line) => {
      expect(within(region).getByText(line)).toBeInTheDocument();
    });
  });

  test("renders each certification with an allowed-scheme link", () => {
    render(<Knowledge />);

    const region = screen.getByRole("region", { name: "Certifications" });
    certifications.forEach((cert) => {
      expect(within(region).getByRole("heading", { name: cert.title })).toBeInTheDocument();
      const link = within(region).getByRole("link", { name: cert.buttonText });
      const href = link.getAttribute("href") || "";
      expect(href.startsWith("https://") || href.endsWith(".pdf")).toBe(true);
    });
  });

  test("external GitHub link uses rel='noopener noreferrer'", () => {
    render(<Knowledge />);

    const ghLink = screen.getByRole("link", { name: /review build history on github/i });
    expect(ghLink.getAttribute("rel")).toContain("noopener");
    expect(ghLink.getAttribute("rel")).toContain("noreferrer");
    expect(ghLink).toHaveAttribute("target", "_blank");
  });
});
