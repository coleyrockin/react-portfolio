import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("renders the developer name in the nav", () => {
  render(<App />);
  expect(screen.getByText("Boyd Roberts")).toBeInTheDocument();
});

test("renders all nav section buttons", () => {
  render(<App />);
  expect(screen.getByRole("button", { name: "About" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Portfolio" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Contact" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Knowledge" })).toBeInTheDocument();
});

test("About section is shown by default", () => {
  render(<App />);
  expect(screen.getByText(/Full stack developer with a strong foundation/i)).toBeInTheDocument();
});

test("clicking Portfolio nav button shows the portfolio section", () => {
  render(<App />);
  userEvent.click(screen.getByRole("button", { name: "Portfolio" }));
  expect(screen.getByText("Selected Work")).toBeInTheDocument();
});

test("clicking Contact nav button shows the contact section", () => {
  render(<App />);
  userEvent.click(screen.getByRole("button", { name: "Contact" }));
  expect(screen.getByText("Connect With Me")).toBeInTheDocument();
});

test("clicking Knowledge nav button shows the knowledge section", () => {
  render(<App />);
  userEvent.click(screen.getByRole("button", { name: "Knowledge" }));
  expect(screen.getByText("Engineering Knowledge")).toBeInTheDocument();
});

test("renders footer with copyright", () => {
  render(<App />);
  const year = new Date().getFullYear();
  expect(screen.getByText(`© ${year} Boyd Roberts`)).toBeInTheDocument();
});
