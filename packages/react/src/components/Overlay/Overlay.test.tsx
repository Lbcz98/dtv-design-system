import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Overlay, overlayLayers, type OverlayVariant } from "./Overlay";

describe("Overlay", () => {
  it("defaults to the home stack and is hidden from assistive tech", () => {
    render(<Overlay data-testid="overlay" />);
    const root = screen.getByTestId("overlay");

    expect(root).toHaveAttribute("data-variant", "home");
    expect(root).toHaveAttribute("aria-hidden", "true");
    expect(root.querySelectorAll("[data-layer]")).toHaveLength(overlayLayers.home.length);
  });

  it("renders the layers for each screen variant in Figma stacking order", () => {
    const variants = Object.keys(overlayLayers) as OverlayVariant[];

    for (const variant of variants) {
      const { unmount } = render(<Overlay variant={variant} data-testid={variant} />);
      const layers = [...screen.getByTestId(variant).querySelectorAll("[data-layer]")].map(
        (node) => node.getAttribute("data-layer"),
      );

      expect(layers).toEqual([...overlayLayers[variant]]);
      unmount();
    }
  });

  it("forwards className onto the root", () => {
    render(<Overlay className="shell-overlay" data-testid="overlay" />);
    expect(screen.getByTestId("overlay")).toHaveClass("shell-overlay");
  });
});
