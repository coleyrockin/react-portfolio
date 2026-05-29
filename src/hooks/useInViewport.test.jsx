import { renderHook } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import useInViewport from "./useInViewport";

const originalMatchMedia = window.matchMedia;

afterEach(() => {
  window.matchMedia = originalMatchMedia;
});

function mockMatchMedia(reduced) {
  window.matchMedia = vi.fn((query) => ({
    matches: reduced && query === "(prefers-reduced-motion: reduce)",
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: () => false,
  }));
}

describe("useInViewport", () => {
  test("returns visible immediately when the user prefers reduced motion", () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useInViewport());
    // [ref, isVisible] — content should be revealed up front, no observer wait.
    expect(result.current[1]).toBe(true);
  });

  test("starts hidden when reduced motion is not requested", () => {
    mockMatchMedia(false);
    const { result } = renderHook(() => useInViewport());
    expect(result.current[1]).toBe(false);
  });
});
