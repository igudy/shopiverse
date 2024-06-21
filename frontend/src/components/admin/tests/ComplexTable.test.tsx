import { render, screen } from "@testing-library/react";
import ComplexTable from "../ComplexTable";
import React from "react";

describe("complex-table", () => {
  it("should have headings for the table", () => {
    render(<ComplexTable />);

    const productName = screen.getByText(/product name/i);
    const status = screen.getByText(/status/i);
    const date = screen.getByText(/date/i);
    const progress = screen.getByText(/progress/i);

    expect(productName).toBeInTheDocument();
    expect(status).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(progress).toBeInTheDocument();
  });
});
