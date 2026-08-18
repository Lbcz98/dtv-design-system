import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { InsertButton } from "./InsertButton";

describe("InsertButton", () => {
  it("renders the label", () => {
    render(<InsertButton>Label</InsertButton>);
    expect(screen.getByRole("button", { name: "Label" })).toBeInTheDocument();
  });

  it("calls onClick when activated", () => {
    const onClick = vi.fn();
    render(<InsertButton onClick={onClick}>Label</InsertButton>);
    fireEvent.click(screen.getByRole("button", { name: "Label" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("can be disabled", () => {
    render(<InsertButton disabled>Label</InsertButton>);
    expect(screen.getByRole("button", { name: "Label" })).toBeDisabled();
  });

  it("disables the button and marks it busy while loading", () => {
    render(<InsertButton loading>Label</InsertButton>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(screen.queryByText("Label")).not.toBeInTheDocument();
  });
});
