import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MainButton } from "./MainButton";

describe("MainButton", () => {
  it("renders the title", () => {
    render(<MainButton title="Brasileirão" />);
    expect(screen.getByRole("button", { name: /Brasileirão/ })).toBeInTheDocument();
  });

  it("renders overline and subtitle when provided", () => {
    render(<MainButton title="Title" overline="Overline" subtitle="Subtitle" />);
    expect(screen.getByText("Overline")).toBeInTheDocument();
    expect(screen.getByText("Subtitle")).toBeInTheDocument();
  });

  it("renders the live badge when live", () => {
    render(<MainButton title="Title" live />);
    expect(screen.getByText("AO VIVO")).toBeInTheDocument();
  });

  it("renders the sponsor row when provided", () => {
    render(<MainButton title="Title" sponsor={{ label: "Publicidade" }} />);
    expect(screen.getByText("Publicidade")).toBeInTheDocument();
  });

  it("calls onClick when activated", () => {
    const onClick = vi.fn();
    render(<MainButton title="Title" onClick={onClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
