import { render, screen } from "@testing-library/react";

describe("Simple Truthy Test Suite", () => {
  it("should check if 1 is truthy", () => {
    expect(1).toBeTruthy();
  });
});
