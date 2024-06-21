import { render, screen } from "@testing-library/react";
import ThirdRow from "../ThirdRow";
import React from "react";

describe("third row", () => {
  it("should render the third row", () => {
    render(<ThirdRow />);
  });
});
