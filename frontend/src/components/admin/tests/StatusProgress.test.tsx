import React from "react";
import { render, screen } from "@testing-library/react";
import { Approved, Disable, Error } from "../StatusProgress";

describe("status progress", () => {
  it("should render the approved component", () => {
    render(<Approved />);
    const approvedText = screen.getByText(/approved/i);
    expect(approvedText).toBeInTheDocument();
    const approvedIcon = screen.getByLabelText("check_icon");
    expect(approvedIcon).toBeInTheDocument();
  });

  it("should render the disable component", () => {
    render(<Disable />);
    const disableText = screen.getByText(/disable/i);
    expect(disableText).toBeInTheDocument();
    const disableIcon = screen.getByLabelText("close_sharp");
    expect(disableIcon).toBeInTheDocument();
  });

  it("should render the error component", () => {
    render(<Error />);
    const errorText = screen.getByText(/error/i);
    expect(errorText).toBeInTheDocument();
    const errorIcon = screen.getByLabelText("exclamation");
    expect(errorIcon).toBeInTheDocument();
  });
});
