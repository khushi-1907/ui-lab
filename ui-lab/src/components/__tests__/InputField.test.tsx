import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputField } from "../../components/InputField";
import { vi } from "vitest";

describe("InputField", () => {
  it("renders label and placeholder", () => {
    render(<InputField label="Email" placeholder="name@example.com" />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("name@example.com")).toBeInTheDocument();
  });

  it("shows error message when invalid", () => {
    render(<InputField label="Email" invalid errorMessage="Invalid email" />);
    expect(screen.getByText("Invalid email")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toHaveAttribute("aria-invalid", "true");
  });

  it("supports typing & clear", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<InputField label="Name" value="hi" onChange={onChange} clearable />);
    const input = screen.getByLabelText("Name") as HTMLInputElement;
    await user.clear(input);
    expect(onChange).toHaveBeenCalled();
  });
});
