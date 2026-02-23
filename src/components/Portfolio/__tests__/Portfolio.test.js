import React from "react";
import { render, screen } from "@testing-library/react";
import Portfolio from "../index";

test("renders the section heading", () => {
  render(<Portfolio />);
  expect(screen.getByText("Selected Work")).toBeInTheDocument();
});

test("renders project cards for all projects", () => {
  render(<Portfolio />);
  expect(screen.getByText("WestWardRPG")).toBeInTheDocument();
  expect(screen.getByText("Chess-Game")).toBeInTheDocument();
  expect(screen.getByText("cryptoprice")).toBeInTheDocument();
  expect(screen.getByText("Social-Network-API")).toBeInTheDocument();
  expect(screen.getByText("MVCTechBlog")).toBeInTheDocument();
  expect(screen.getByText("CherryTree")).toBeInTheDocument();
});

test("each project card has a 'View Repository' link", () => {
  render(<Portfolio />);
  const repoLinks = screen.getAllByText("View Repository");
  expect(repoLinks).toHaveLength(6);
});
