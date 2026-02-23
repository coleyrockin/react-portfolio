import { capitalizeFirstLetter, validateEmail } from "./helpers";

describe("capitalizeFirstLetter", () => {
  test("capitalizes the first letter of a lowercase string", () => {
    expect(capitalizeFirstLetter("hello")).toBe("Hello");
  });

  test("leaves an already-capitalized string unchanged", () => {
    expect(capitalizeFirstLetter("World")).toBe("World");
  });

  test("handles a single character", () => {
    expect(capitalizeFirstLetter("a")).toBe("A");
  });

  test("handles an empty string", () => {
    expect(capitalizeFirstLetter("")).toBe("");
  });

  test("handles a string that starts with a number", () => {
    expect(capitalizeFirstLetter("1abc")).toBe("1abc");
  });
});

describe("validateEmail", () => {
  test("returns true for a valid email", () => {
    expect(validateEmail("user@example.com")).toBe(true);
  });

  test("returns true for a subdomain email", () => {
    expect(validateEmail("user@mail.example.com")).toBe(true);
  });

  test("returns false for an email missing the @", () => {
    expect(validateEmail("userexample.com")).toBe(false);
  });

  test("returns false for an email missing the domain", () => {
    expect(validateEmail("user@")).toBe(false);
  });

  test("returns false for an empty string", () => {
    expect(validateEmail("")).toBe(false);
  });

  test("returns false for a plain string", () => {
    expect(validateEmail("notanemail")).toBe(false);
  });
});
