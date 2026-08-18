import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MainButton } from "./MainButton";
import styles from "./MainButton.module.css";
import css from "./MainButton.module.css?raw";

function measureTitle(name: string) {
  const card = screen.getByRole("button", { name });
  const title = card.querySelector(`.${styles.title}`);
  const content = card.querySelector(`.${styles.content}`);
  if (!title || !content) {
    throw new Error("MainButton title/content missing");
  }
  const titleStyle = getComputedStyle(title);
  const contentStyle = getComputedStyle(content);
  return {
    contentWidth: contentStyle.width,
    titleWidth: titleStyle.width,
    fontSize: titleStyle.fontSize,
    lineHeight: titleStyle.lineHeight,
    whiteSpace: titleStyle.whiteSpace,
  };
}

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

  it("keeps the resting title wrap and width when the card is focused", () => {
    const label = "Vote no Craque do Jogo";
    const { rerender } = render(<MainButton title={label} />);
    const rest = measureTitle(label);

    rerender(<MainButton title={label} selected />);
    const selected = measureTitle(label);

    expect(rest.contentWidth).toBe("118px");
    expect(selected.contentWidth).toBe(rest.contentWidth);
    expect(selected.titleWidth).toBe(rest.titleWidth);
    expect(selected.whiteSpace).toBe(rest.whiteSpace);
    expect(selected.whiteSpace).not.toBe("nowrap");
    expect(selected.fontSize).toBe(rest.fontSize);
    expect(selected.lineHeight).toBe(rest.lineHeight);

    // jsdom does not apply :focus-visible, so lock the stylesheet itself:
    // focus must not restyle type (that would reflow a two-line label).
    expect(css).not.toContain(":focus-visible .title");
    expect(css).not.toContain(":focus-visible .overline");
    expect(css).not.toContain(":focus-visible .subtitle");
    expect(css).not.toMatch(
      /\.overline,\s*\.subtitle,\s*\.title\s*\{[^}]*white-space:\s*nowrap/,
    );
  });
});
