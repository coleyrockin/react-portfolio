import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import ErrorBoundary from "./index";

function Boom() {
  throw new Error("kaboom");
}

describe("ErrorBoundary", () => {
  test("renders children when nothing throws", () => {
    render(
      <ErrorBoundary>
        <p>healthy content</p>
      </ErrorBoundary>
    );
    expect(screen.getByText("healthy content")).toBeInTheDocument();
  });

  test("renders the on-theme fallback (not a crash) when a child throws", () => {
    // React logs the error to console.error during the caught render; silence it.
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <Boom />
      </ErrorBoundary>
    );

    const alert = screen.getByRole("alert");
    expect(alert).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /this section hit a snag/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /back to start/i })).toHaveAttribute("href", "#about");
    expect(screen.getByRole("button", { name: /reload/i })).toBeInTheDocument();

    spy.mockRestore();
  });
});
