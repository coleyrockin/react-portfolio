import { act, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { axe } from "vitest-axe";
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
    const stackRow = screen.getByRole("list", { name: /core stack/i });
    expect(within(stackRow).getByText(/react/i)).toBeInTheDocument();
    expect(within(stackRow).getByText(/next\.js/i)).toBeInTheDocument();
    expect(within(stackRow).getByText(/node\.js/i)).toBeInTheDocument();
    expect(within(stackRow).getByText(/ai workflows/i)).toBeInTheDocument();
    expect(within(stackRow).getByText(/central texas/i)).toBeInTheDocument();
    expect(screen.getByRole("list", { name: "Portfolio proof points" })).toHaveTextContent(
      "CI + CodeQL"
    );
    expect(window.location.hash).toBe("#about");
  });

  test("supports hash-based section navigation", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Portfolio" }));

    expect(await screen.findByRole("heading", { name: "Selected Work" })).toBeInTheDocument();
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

  test("renders all curated portfolio projects with source/demo actions and metrics", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: "Portfolio" }));
    await screen.findByRole("heading", { name: "Selected Work" });

    const projectCards = screen.getAllByRole("article");
    const projectRepoLinks = projects.map((project) =>
      screen.getByRole("link", { name: `View ${project.name} source code` })
    );

    expect(projectRepoLinks).toHaveLength(projects.length);
    expect(projectCards.length).toBeGreaterThanOrEqual(projects.length);

    projects.forEach((project) => {
      const previewLabel = project.demo
        ? `${project.name} live demo`
        : `${project.name} repository`;
      const expectedHref = project.demo || project.repo;

      expect(screen.getByRole("link", { name: previewLabel })).toHaveAttribute(
        "href",
        expectedHref
      );
      project.metrics.forEach((metric) => {
        expect(screen.getByText(metric.label)).toBeInTheDocument();
        expect(screen.getByText(metric.value)).toBeInTheDocument();
      });
    });
  });

  test("hero exposes GitHub + résumé (LinkedIn) profile links and exactly one h1", () => {
    render(<App />);

    const heroLinks = within(screen.getByRole("list", { name: "Profile links" })).getAllByRole(
      "link"
    );
    const hrefs = heroLinks.map((link) => link.getAttribute("href"));
    expect(hrefs).toContain("https://github.com/coleyrockin");
    expect(hrefs).toContain("https://www.linkedin.com/in/boydcroberts");

    const h1s = document.querySelectorAll("h1");
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent(/boyd\s*roberts/i);
  });

  test("renders social-first contact links", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: "Contact" }));

    const scoped = within(await screen.findByRole("region", { name: "Social Profiles" }));
    socialLinks.forEach((profile) => {
      expect(
        scoped.getByRole("link", { name: `${profile.name}: ${profile.handle}` })
      ).toHaveAttribute("href", profile.href);
    });
  });

  test("renders credential badge links without duplicate credential CTAs", () => {
    render(<App />);

    const smuCredentialUrl =
      "https://www.credly.com/badges/8329e5c9-3399-4e92-906a-78eb4548a282/public_url";
    const baylorCertificatePath = "/certificates/baylor-java-python-certificate.pdf";
    const links = screen.getAllByRole("link");

    expect(links.filter((link) => link.getAttribute("href") === smuCredentialUrl)).toHaveLength(1);
    expect(
      links.filter((link) => link.getAttribute("href")?.endsWith(baylorCertificatePath))
    ).toHaveLength(1);
    expect(
      screen.queryByRole("link", { name: "View SMU Developer Credential" })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "View Baylor Java + Python Certificate" })
    ).not.toBeInTheDocument();
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
    await screen.findByRole("heading", { name: "Engineering Knowledge" });

    languageGroups.forEach((group) => {
      expect(screen.getByRole("heading", { name: group.title })).toBeInTheDocument();
      group.languages.forEach((language) => {
        expect(screen.getByText(language.name)).toBeInTheDocument();
      });
    });

    expect(screen.getByRole("heading", { name: "AI-Accelerated Work" })).toBeInTheDocument();
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

    expect(screen.getByRole("link", { name: "Skip to content" })).toHaveAttribute(
      "href",
      "#main-content"
    );
  });

  test("rendered shell has no axe-detectable a11y violations", async () => {
    const { container } = render(<App />);
    // Wait for the default section to mount before scanning.
    await screen.findByRole("heading", { name: /boyd\s*roberts\./i });
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test("skip link hash does not reset the active section", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Portfolio" }));
    await screen.findByRole("heading", { name: "Selected Work" });
    window.history.pushState({}, "", "/#main-content");
    fireEvent(window, new HashChangeEvent("hashchange"));

    expect(window.location.hash).toBe("#main-content");
    expect(screen.getByRole("heading", { name: "Selected Work" })).toBeInTheDocument();
    await waitFor(() => {
      expect(document.title).toBe("Boyd Roberts | Portfolio");
    });
  });

  test("resets scroll to top when switching sections", () => {
    vi.useFakeTimers();
    const scrollSpy = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    try {
      render(<App />);
      fireEvent.click(screen.getByRole("button", { name: "Portfolio" }));
      // The swap (and scroll reset) happen after the 180ms exit transition.
      act(() => {
        vi.advanceTimersByTime(200);
      });
      expect(screen.getByRole("heading", { name: "Selected Work" })).toBeInTheDocument();
      expect(scrollSpy).toHaveBeenCalledWith(0, 0);
    } finally {
      scrollSpy.mockRestore();
      vi.useRealTimers();
    }
  });

  test("rapid section clicks land on the last selection, not a stale one", () => {
    vi.useFakeTimers();
    try {
      render(<App />);
      // Click Portfolio, then Knowledge before the 180ms exit completes.
      fireEvent.click(screen.getByRole("button", { name: "Portfolio" }));
      act(() => {
        vi.advanceTimersByTime(90);
      });
      fireEvent.click(screen.getByRole("button", { name: "Knowledge" }));
      act(() => {
        vi.advanceTimersByTime(200);
      });
      // Only the final selection should render; the pending Portfolio swap is cancelled.
      expect(screen.getByRole("heading", { name: "Engineering Knowledge" })).toBeInTheDocument();
      expect(screen.queryByRole("heading", { name: "Selected Work" })).not.toBeInTheDocument();
      expect(window.location.hash).toBe("#knowledge");
    } finally {
      vi.useRealTimers();
    }
  });
});
