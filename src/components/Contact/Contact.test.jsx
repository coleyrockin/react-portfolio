import { render, screen, within } from "@testing-library/react";
import Contact from "./index";
import { socialLinks } from "../../data/socialLinks";

const ALLOWED_SCHEMES = ["mailto:", "https://"];

describe("Contact", () => {
  test("renders every social link with an accessible name", () => {
    render(<Contact />);

    const region = screen.getByRole("region", { name: "Social Profiles" });
    socialLinks.forEach((profile) => {
      expect(
        within(region).getByRole("link", { name: `${profile.name}: ${profile.handle}` })
      ).toBeInTheDocument();
    });
  });

  test("every contact link uses an allowed href scheme (mailto: or https://)", () => {
    render(<Contact />);

    const region = screen.getByRole("region", { name: "Social Profiles" });
    const links = within(region).getAllByRole("link");
    expect(links).toHaveLength(socialLinks.length);

    links.forEach((link) => {
      const href = link.getAttribute("href") || "";
      expect(ALLOWED_SCHEMES.some((scheme) => href.startsWith(scheme))).toBe(true);
    });
  });

  test("https contact links carry rel='noopener noreferrer' and open in a new tab", () => {
    render(<Contact />);

    const externalLinks = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("href")?.startsWith("https://"));

    externalLinks.forEach((link) => {
      const rel = link.getAttribute("rel") || "";
      expect(rel).toContain("noopener");
      expect(rel).toContain("noreferrer");
      expect(link.getAttribute("target")).toBe("_blank");
    });
  });
});
