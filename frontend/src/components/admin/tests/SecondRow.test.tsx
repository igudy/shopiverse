import { render, screen } from "@testing-library/react";
import React from "react";
import SecondRow from "../SecondRow";

describe("second row", () => {
  it("should render the second row component", () => {
    render(<SecondRow />);
  });
});
