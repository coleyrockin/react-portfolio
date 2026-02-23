import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navigation from "../index";

const sections = [
  { name: "About", comp: () => <div>About</div> },
  { name: "Portfolio", comp: () => <div>Portfolio</div> },
];

test("renders the brand name", () => {
  render(
    <Navigation
      sections={sections}
      currentSection={sections[0]}
      setCurrentSection={() => {}}
    />
  );
  expect(screen.getByText("Boyd Roberts")).toBeInTheDocument();
});

test("renders a button for each section", () => {
  render(
    <Navigation
      sections={sections}
      currentSection={sections[0]}
      setCurrentSection={() => {}}
    />
  );
  expect(screen.getByRole("button", { name: "About" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Portfolio" })).toBeInTheDocument();
});

test("active section button has aria-current='page'", () => {
  render(
    <Navigation
      sections={sections}
      currentSection={sections[0]}
      setCurrentSection={() => {}}
    />
  );
  expect(screen.getByRole("button", { name: "About" })).toHaveAttribute(
    "aria-current",
    "page"
  );
  expect(
    screen.getByRole("button", { name: "Portfolio" })
  ).not.toHaveAttribute("aria-current");
});

test("calls setCurrentSection when a nav button is clicked", () => {
  const setCurrentSection = jest.fn();
  render(
    <Navigation
      sections={sections}
      currentSection={sections[0]}
      setCurrentSection={setCurrentSection}
    />
  );
  userEvent.click(screen.getByRole("button", { name: "Portfolio" }));
  expect(setCurrentSection).toHaveBeenCalledWith(sections[1]);
});
