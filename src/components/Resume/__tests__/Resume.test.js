import React from "react";
import { render, screen } from "@testing-library/react";
import Resume from "../index";

test("renders the main heading", () => {
  render(<Resume />);
  expect(screen.getByText("Engineering Knowledge")).toBeInTheDocument();
});

test("renders language group headings", () => {
  render(<Resume />);
  expect(screen.getByText("Core")).toBeInTheDocument();
  expect(screen.getByText("Systems and Backend")).toBeInTheDocument();
  expect(screen.getByText("Web and Specialized")).toBeInTheDocument();
});

test("renders capability pillars", () => {
  render(<Resume />);
  expect(screen.getByText("Product Engineering")).toBeInTheDocument();
  expect(screen.getByText("Backend and Data")).toBeInTheDocument();
  expect(screen.getByText("AI-Accelerated Delivery")).toBeInTheDocument();
});

test("renders the certifications section heading", () => {
  render(<Resume />);
  expect(screen.getByText("Certifications")).toBeInTheDocument();
});

test("renders certificate links", () => {
  render(<Resume />);
  expect(screen.getByText("View Certificate")).toBeInTheDocument();
  expect(screen.getByText("View Credential")).toBeInTheDocument();
});

test("renders the AI Experience section", () => {
  render(<Resume />);
  expect(screen.getByText("AI Experience")).toBeInTheDocument();
});
