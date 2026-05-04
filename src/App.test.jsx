import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
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

    expect(screen.getByRole("heading", { name: /boyd\s*roberts\./i })).toBeInTheDocument();
    expect(window.location.hash).toBe("#about");
  });

  test("supports hash-based section navigation", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Portfolio" }));

    expect(screen.getByRole("heading", { name: "Selected Work" })).toBeInTheDocument();
    expect(window.location.hash).toBe("#portfolio");
    await waitFor(() => {
      expect(document.title).toBe("Boyd Roberts | Portfolio");
    });
  });

  test("loads the section from URL hash on first render", () => {
    window.history.pushState({}, "", "/#knowledge");
    render(<App />);

    expect(screen.getByRole("heading", { name: "Engineering Knowledge" })).toBeInTheDocument();
    expect(window.location.hash).toBe("#knowledge");
  });

  test("renders five portfolio projects with repository actions", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: "Portfolio" }));

    const projectCards = screen.getAllByRole("article");
    const projectRepoLinks = screen.getAllByRole("link", { name: "View Repository" });

    expect(projectRepoLinks).toHaveLength(5);
    expect(projectCards.length).toBeGreaterThanOrEqual(5);

    projects.forEach((project) => {
      expect(screen.getByRole("link", { name: project.name + " repository" })).toHaveAttribute(
        "href",
        project.repo
      );
    });
  });

  test("renders social-first contact links", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: "Contact" }));

    const scoped = within(screen.getByRole("region", { name: "Social Profiles" }));
    socialLinks.forEach((profile) => {
      expect(scoped.getByRole("link", { name: profile.name })).toHaveAttribute("href", profile.href);
    });
  });

  test("renders credential badge links without duplicate credential CTAs", () => {
    render(<App />);

    const smuCredentialUrl =
      "https://www.credly.com/badges/8329e5c9-3399-4e92-906a-78eb4548a282/public_url";
    const baylorCertificatePath = "/certificates/baylor-java-python-certificate.pdf";
    const links = screen.getAllByRole("link");

    expect(links.filter((link) => link.getAttribute("href") === smuCredentialUrl)).toHaveLength(1);
    expect(links.filter((link) => link.getAttribute("href")?.endsWith(baylorCertificatePath))).toHaveLength(1);
    expect(screen.queryByRole("link", { name: "View SMU Developer Credential" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "View Baylor Java + Python Certificate" })).not.toBeInTheDocument();
  });

  test("renders footer social icons from the same link source", () => {
    render(<App />);

    socialLinks.forEach((profile) => {
      const links = screen.getAllByRole("link", { name: profile.name });
      expect(links.length).toBeGreaterThanOrEqual(1);
      expect(links[links.length - 1]).toHaveAttribute("href", profile.href);
    });
  });

  test("renders the complete language map and AI section", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: "Knowledge" }));

    languageGroups.forEach((group) => {
      expect(screen.getByRole("heading", { name: group.title })).toBeInTheDocument();
      group.languages.forEach((language) => {
        expect(screen.getByText(language.name)).toBeInTheDocument();
      });
    });

    expect(screen.getByRole("heading", { name: "AI Experience" })).toBeInTheDocument();
  });

  test("hero 'View Projects' CTA navigates to portfolio and focuses main", async () => {
    render(<App />);

    const cta = screen.getByRole("link", { name: /view work/i });
    expect(cta).toHaveAttribute("href", "#portfolio");

    // Simulate the browser updating the hash + firing hashchange (the link's
    // default behavior); jsdom doesn't navigate on click.
    window.history.pushState({}, "", "/#portfolio");
    fireEvent(window, new HashChangeEvent("hashchange"));

    expect(screen.getByRole("heading", { name: "Selected Work" })).toBeInTheDocument();
    expect(window.location.hash).toBe("#portfolio");
    expect(document.activeElement).toBe(document.getElementById("main-content"));
  });

  test("hero 'Get in Touch' CTA navigates to contact and focuses main", () => {
    render(<App />);

    const cta = screen.getByRole("link", { name: /get in touch/i });
    expect(cta).toHaveAttribute("href", "#contact");

    window.history.pushState({}, "", "/#contact");
    fireEvent(window, new HashChangeEvent("hashchange"));

    expect(screen.getByRole("region", { name: "Social Profiles" })).toBeInTheDocument();
    expect(window.location.hash).toBe("#contact");
    expect(document.activeElement).toBe(document.getElementById("main-content"));
  });

  test("renders skip link to main content", () => {
    render(<App />);

    expect(screen.getByRole("link", { name: "Skip to content" })).toHaveAttribute("href", "#main-content");
  });

  test("skip link hash does not reset the active section", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Portfolio" }));
    window.history.pushState({}, "", "/#main-content");
    fireEvent(window, new HashChangeEvent("hashchange"));

    expect(window.location.hash).toBe("#main-content");
    expect(screen.getByRole("heading", { name: "Selected Work" })).toBeInTheDocument();
    expect(document.title).toBe("Boyd Roberts | Portfolio");
  });
});
