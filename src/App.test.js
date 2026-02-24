import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { languageGroups } from "./data/languages";
import { projects } from "./data/projects";
import { socialLinks } from "./data/socialLinks";

describe("Portfolio site", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/");
  });

  test("loads About section by default and normalizes hash", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: "Developer" })).toBeInTheDocument();
    expect(window.location.hash).toBe("#about");
  });

  test("supports hash-based section navigation", () => {
    render(<App />);

    userEvent.click(screen.getByRole("button", { name: "Portfolio" }));

    expect(screen.getByRole("heading", { name: "Selected Work" })).toBeInTheDocument();
    expect(window.location.hash).toBe("#portfolio");
  });

  test("loads the section from URL hash on first render", () => {
    window.history.pushState({}, "", "/#knowledge");
    render(<App />);

    expect(screen.getByRole("heading", { name: "Engineering Knowledge" })).toBeInTheDocument();
    expect(window.location.hash).toBe("#knowledge");
  });

  test("renders six portfolio projects with repository actions", () => {
    render(<App />);
    userEvent.click(screen.getByRole("button", { name: "Portfolio" }));

    const projectCards = screen.getAllByRole("article");
    const projectRepoLinks = screen.getAllByRole("link", { name: "View Repository" });

    expect(projectRepoLinks).toHaveLength(6);
    expect(projectCards.length).toBeGreaterThanOrEqual(6);

    projects.forEach((project) => {
      expect(screen.getByText(project.name)).toBeInTheDocument();
      expect(screen.getByRole("link", { name: project.name + " repository" })).toHaveAttribute(
        "href",
        project.repo
      );
    });
  });

  test("renders social-first contact links", () => {
    render(<App />);
    userEvent.click(screen.getByRole("button", { name: "Contact" }));

    const contactPanel = screen.getByRole("heading", { name: "Connect With Me" }).closest("article");
    expect(contactPanel).toBeTruthy();

    const scoped = within(contactPanel);
    socialLinks.forEach((profile) => {
      expect(scoped.getByRole("link", { name: profile.name })).toHaveAttribute("href", profile.href);
    });
  });

  test("renders footer social icons from the same link source", () => {
    render(<App />);

    socialLinks.forEach((profile) => {
      const links = screen.getAllByRole("link", { name: profile.name });
      expect(links.length).toBeGreaterThanOrEqual(1);
      expect(links[links.length - 1]).toHaveAttribute("href", profile.href);
    });
  });

  test("renders the complete language map and AI section", () => {
    render(<App />);
    userEvent.click(screen.getByRole("button", { name: "Knowledge" }));

    languageGroups.forEach((group) => {
      expect(screen.getByRole("heading", { name: group.title })).toBeInTheDocument();
      group.languages.forEach((language) => {
        expect(screen.getByText(language)).toBeInTheDocument();
      });
    });

    expect(screen.getByRole("heading", { name: "AI Experience" })).toBeInTheDocument();
  });
});
