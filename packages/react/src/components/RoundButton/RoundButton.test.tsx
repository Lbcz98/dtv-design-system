import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { RoundButton } from "./RoundButton";
import { Icon } from "../Icon";

describe("RoundButton", () => {
  it("renders with an accessible label", () => {
    render(<RoundButton icon={<Icon name="x" />} aria-label="Close" />);
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("calls onClick when activated", () => {
    const onClick = vi.fn();
    render(
      <RoundButton icon={<Icon name="arrow-left" />} aria-label="Back" onClick={onClick} />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Back" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("can be disabled", () => {
    render(<RoundButton icon={<Icon name="menu" />} aria-label="Menu" disabled />);
    expect(screen.getByRole("button", { name: "Menu" })).toBeDisabled();
  });
});
