import React from "react";
import { render, screen } from "@testing-library/react";
import Contact from "../index";

test("renders the section heading", () => {
  render(<Contact />);
  expect(screen.getByText("Connect With Me")).toBeInTheDocument();
});

test("renders all three social profile cards", () => {
  render(<Contact />);
  expect(screen.getByText("Instagram")).toBeInTheDocument();
  expect(screen.getByText("LinkedIn")).toBeInTheDocument();
  expect(screen.getByText("GitHub")).toBeInTheDocument();
});

test("renders social handles", () => {
  render(<Contact />);
  expect(screen.getByText("@coleyrockin")).toBeInTheDocument();
  expect(screen.getByText("boydcroberts")).toBeInTheDocument();
  expect(screen.getByText("coleyrockin")).toBeInTheDocument();
});

test("social profile links open in a new tab", () => {
  render(<Contact />);
  const links = screen.getAllByRole("link");
  links.forEach((link) => {
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
