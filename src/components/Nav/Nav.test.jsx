import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import Nav from "./index";

const sections = [
  { name: "About", slug: "about", comp: () => null },
  { name: "Portfolio", slug: "portfolio", comp: () => null },
  { name: "Knowledge", slug: "knowledge", comp: () => null },
  { name: "Contact", slug: "contact", comp: () => null },
];

function renderNav({ active = "about", onChange = vi.fn() } = {}) {
  const current = sections.find((s) => s.slug === active);
  const result = render(
    <Nav sections={sections} currentSection={current} setCurrentSection={onChange} />
  );
  return { ...result, onChange };
}

describe("Nav", () => {
  test("renders every section as a button", () => {
    renderNav();
    sections.forEach((section) => {
      expect(screen.getByRole("button", { name: section.name })).toBeInTheDocument();
    });
  });

  test("marks the active section with aria-current=page and leaves others undecorated", () => {
    renderNav({ active: "portfolio" });
    expect(screen.getByRole("button", { name: "Portfolio" })).toHaveAttribute(
      "aria-current",
      "page"
    );
    expect(screen.getByRole("button", { name: "About" })).not.toHaveAttribute("aria-current");
    expect(screen.getByRole("button", { name: "Knowledge" })).not.toHaveAttribute("aria-current");
    expect(screen.getByRole("button", { name: "Contact" })).not.toHaveAttribute("aria-current");
  });

  test("clicking a section calls setCurrentSection with that section", async () => {
    const user = userEvent.setup();
    const { onChange } = renderNav();
    await user.click(screen.getByRole("button", { name: "Knowledge" }));
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(sections.find((s) => s.slug === "knowledge"));
  });

  test("keyboard activation (Enter and Space) triggers setCurrentSection", async () => {
    const user = userEvent.setup();
    const { onChange } = renderNav();
    const portfolioBtn = screen.getByRole("button", { name: "Portfolio" });
    portfolioBtn.focus();
    expect(portfolioBtn).toHaveFocus();

    await user.keyboard("{Enter}");
    expect(onChange).toHaveBeenLastCalledWith(sections.find((s) => s.slug === "portfolio"));

    await user.keyboard(" ");
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenLastCalledWith(sections.find((s) => s.slug === "portfolio"));
  });
});
