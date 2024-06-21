import React from "react";
import { render, screen } from "@testing-library/react";
import TopRow from "../TopRow";

// Test not working right now
describe("top row", () => {
  it("should render the top row and do some text check", () => {
    render(<TopRow />);

    expect(screen.getByText(/pages/i)).toBeInTheDocument();
    expect(screen.getByText(/dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/main/i)).toBeInTheDocument();
  });

  it("should render icons", () => {
    render(<TopRow />);

    expect(screen.getByTestId("earnings")).toBeInTheDocument();
    expect(screen.getByTestId("spent")).toBeInTheDocument();
    expect(screen.getByTestId("sales")).toBeInTheDocument();
    expect(screen.getByTestId("wallet")).toBeInTheDocument();
    expect(screen.getByTestId("projects")).toBeInTheDocument();
  });
});
