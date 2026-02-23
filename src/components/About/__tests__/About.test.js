import React from "react";
import { render, screen } from "@testing-library/react";
import About from "../index";

test("renders the developer name heading", () => {
  render(<About />);
  expect(screen.getByRole("heading", { name: "Developer" })).toBeInTheDocument();
});

test("renders the profile photo with accessible alt text", () => {
  render(<About />);
  expect(screen.getByAltText("Boyd Roberts")).toBeInTheDocument();
});

test("renders the SMU credential link", () => {
  render(<About />);
  expect(screen.getByText("View SMU Developer Credential")).toBeInTheDocument();
});

test("renders the Baylor certificate link", () => {
  render(<About />);
  expect(screen.getByText("View Baylor Java + Python Certificate")).toBeInTheDocument();
});

test("renders the Core Stack highlight", () => {
  render(<About />);
  expect(screen.getByText("Core Stack")).toBeInTheDocument();
});
