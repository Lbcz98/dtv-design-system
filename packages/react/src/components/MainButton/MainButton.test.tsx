import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MainButton } from "./MainButton";
import styles from "./MainButton.module.css";
import css from "./MainButton.module.css?raw";

function measureCard(name: string) {
  const card = screen.getByRole("button", { name });
  const title = card.querySelector(`.${styles.title}`);
  const label = card.querySelector(`.${styles.label}`);
  const shell = card.querySelector(`.${styles.shell}`);
  if (!title || !label || !shell) {
    throw new Error("MainButton label/shell missing");
  }
  const titleStyle = getComputedStyle(title);
  const labelStyle = getComputedStyle(label);
  const cardStyle = getComputedStyle(card);
  return {
    cardWidth: cardStyle.width,
    cardHeight: cardStyle.height,
    cardPadding: cardStyle.padding,
    labelWidth: labelStyle.width,
    titleWidth: titleStyle.width,
    fontSize: titleStyle.fontSize,
    lineHeight: titleStyle.lineHeight,
    whiteSpace: titleStyle.whiteSpace,
    shellTransform: getComputedStyle(shell).transform,
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

  it("keeps the resting title wrap and layout box when the card is focused", () => {
    const label = "Vote no Craque do Jogo";
    const { rerender } = render(<MainButton title={label} />);
    const rest = measureCard(label);

    rerender(<MainButton title={label} selected />);
    const selected = measureCard(label);

    expect(rest.cardWidth).toBe("158px");
    expect(rest.cardHeight).toBe("122px");
    expect(selected.cardWidth).toBe(rest.cardWidth);
    expect(selected.cardHeight).toBe(rest.cardHeight);
    expect(selected.cardPadding).toBe(rest.cardPadding);
    expect(rest.labelWidth).toBe("118px");
    expect(selected.labelWidth).toBe(rest.labelWidth);
    expect(selected.titleWidth).toBe(rest.titleWidth);
    expect(selected.whiteSpace).toBe(rest.whiteSpace);
    expect(selected.whiteSpace).not.toBe("nowrap");
    expect(selected.fontSize).toBe(rest.fontSize);
    expect(selected.lineHeight).toBe(rest.lineHeight);

    expect(css).toMatch(
      /transform:\s*scale\(\s*var\(--main-button-focus-scale-x\),\s*var\(--main-button-focus-scale-y\)\s*\)/,
    );
    expect(css).not.toMatch(/transition:[^;}]*\bwidth\b/);
    expect(css).not.toMatch(/transition:[^;}]*\bheight\b/);
    expect(css).not.toMatch(/transition:[^;}]*\bpadding\b/);
    expect(css).not.toContain(":focus-visible .title");
    expect(css).not.toContain(":focus-visible .overline");
    expect(css).not.toContain(":focus-visible .subtitle");
    expect(css).not.toMatch(/\.mainButton:focus-visible[^{]*\{[^}]*width:\s*208px/);
  });
});
