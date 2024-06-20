import React from "react";
import { render, screen } from "@testing-library/react";
import Card, { CardGraph } from "../Card";
import { FaBeer } from "react-icons/fa";

describe("Card", () => {
  // Because its a prop, you make sure the following are in the document.
  it("should render the card component", () => {
    render(<Card top={"Hello"} icon={FaBeer} amount={"1000"} />);
    const top = screen.getByText("Hello");
    const amount = screen.getByText("1000");
    expect(top).toBeInTheDocument();
    expect(amount).toBeInTheDocument();
  });

  // use data-testid for this one.
  it("should render the svg(icon)", () => {
    render(<Card top={"Hello"} icon={FaBeer} amount={"1000"} />);
    const icon = screen.getByTestId("card-icon");
    expect(icon).toBeInTheDocument();
  });

  // render cardGraph
  it("should render card graph", () => {
    render(<CardGraph>Card Graph Content</CardGraph>);
    const text_content = screen.getByText("Card Graph Content");
    expect(text_content).toBeInTheDocument();
  });

  // the first way of rendering
  it("should render card graph", () => {
    render(<CardGraph>Card Graph Content</CardGraph>);
    const text_content = screen.getByText("Card Graph Content");
    expect(text_content).toBeInTheDocument();
  });

  // second way of testing
  it("should render card graph", () => {
    const { getByText } = render(
      <CardGraph>Testing the second style</CardGraph>
    );
    const textContent = getByText("Testing the second style");
    expect(textContent).toBeInTheDocument();
  });
});
