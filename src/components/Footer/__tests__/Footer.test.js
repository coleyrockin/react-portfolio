import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "../index";

test("renders the copyright notice with the current year", () => {
  render(<Footer />);
  const year = new Date().getFullYear();
  expect(screen.getByText(`© ${year} Boyd Roberts`)).toBeInTheDocument();
});

test("renders the GitHub link", () => {
  render(<Footer />);
  expect(screen.getByLabelText("GitHub")).toBeInTheDocument();
});

test("renders the LinkedIn link", () => {
  render(<Footer />);
  expect(screen.getByLabelText("LinkedIn")).toBeInTheDocument();
});

test("renders the Instagram link", () => {
  render(<Footer />);
  expect(screen.getByLabelText("Instagram")).toBeInTheDocument();
});
