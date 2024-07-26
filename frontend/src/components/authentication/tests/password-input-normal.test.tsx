import { render, screen, fireEvent } from "@testing-library/react";
import PasswordInputNormal from "../password-input-normal";

describe("PasswordInputNormal", () => {
  const setup = () => {
    const utils = render(
      <PasswordInputNormal
        placeholder="Enter Password"
        value=""
        onChange={jest.fn()}
        name="password"
        onPaste={jest.fn()}
      />
    );

    const input = utils.getByPlaceholderText("Enter Password");
    const toggleIcon = utils.getByRole("button");
    const spreadUtils = { ...utils };

    return {
      input,
      toggleIcon,
      ...utils,
    };
  };

  it("should renders the input with the correct attributes", () => {
    const { input } = setup();
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "password");
    expect(input).toHaveAttribute("placeholder", "Enter Password");
  });

  it("should toggle visibility", () => {
    const { input, toggleIcon } = setup();
    expect(input).toHaveAttribute("type", "password");
    fireEvent.click(toggleIcon);
    expect(input).toHaveAttribute("type", "text");
    fireEvent.click(toggleIcon);
    expect(input).toHaveAttribute("type", "password");
  });

  it("should calls onChange handler", () => {
    const handleChange = jest.fn();

    render(
      <PasswordInputNormal
        placeholder="Enter Password"
        value=""
        onChange={handleChange}
        name="password"
        onPaste={jest.fn()}
      />
    );

    const input = screen.getByPlaceholderText("Enter Password");
    fireEvent.change(input, { target: { value: "newPassword" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("calls onPaste handler", () => {
    const handlePaste = jest.fn();

    render(
      <PasswordInputNormal
        placeholder="Enter Password"
        value=""
        onChange={jest.fn()}
        name="password"
        onPaste={handlePaste}
      />
    );

    const input = screen.getByPlaceholderText("Enter password");
    fireEvent.paste(input, { clipboardData: { getData: () => "pastedText" } });
    expect(handlePaste).toHaveBeenCalledTimes(1);
  });
});
