import { render, screen, within } from "@testing-library/react";
import Portfolio from "./index";
import { projects } from "../../data/projects";

describe("Portfolio", () => {
  test("renders one <article> card per project with an accessible heading", () => {
    render(<Portfolio />);

    const cards = screen.getAllByRole("article");
    expect(cards.length).toBeGreaterThanOrEqual(projects.length);

    projects.forEach((project) => {
      expect(screen.getByRole("heading", { name: project.name })).toBeInTheDocument();
    });
  });

  test("every external project link uses rel='noopener noreferrer' and target='_blank'", () => {
    render(<Portfolio />);

    const externalLinks = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("href")?.startsWith("https://"));

    expect(externalLinks.length).toBeGreaterThan(0);

    externalLinks.forEach((link) => {
      const rel = link.getAttribute("rel") || "";
      expect(rel).toContain("noopener");
      expect(rel).toContain("noreferrer");
      expect(link.getAttribute("target")).toBe("_blank");
    });
  });

  test("each project exposes a 'Source' link pointing at the repo URL", () => {
    render(<Portfolio />);

    const sourceLinks = screen.getAllByRole("link", { name: "Source" });
    expect(sourceLinks).toHaveLength(projects.length);

    const sourceHrefs = sourceLinks.map((link) => link.getAttribute("href"));
    projects.forEach((project) => {
      expect(sourceHrefs).toContain(project.repo);
    });
  });

  test("each project image link has an accessible name tied to the project", () => {
    render(<Portfolio />);

    projects.forEach((project) => {
      const expectedLabel = project.demo
        ? `${project.name} live demo`
        : `${project.name} repository`;
      const link = screen.getByRole("link", { name: expectedLabel });
      expect(link).toHaveAttribute("href", project.demo || project.repo);
    });
  });

  test("rendered project metric chips match the data module", () => {
    const { container } = render(<Portfolio />);

    projects.forEach((project) => {
      const metricList = container.querySelector(`[aria-label="${project.name} key metrics"]`);
      expect(metricList).not.toBeNull();
      const scoped = within(metricList);
      project.metrics.forEach((metric) => {
        expect(scoped.getByText(metric.label)).toBeInTheDocument();
        expect(scoped.getByText(metric.value)).toBeInTheDocument();
      });
    });
  });
});
