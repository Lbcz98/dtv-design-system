import { type HTMLAttributes } from "react";
import styles from "./Overlay.module.css";

export const overlayLayers = {
  home: ["dim", "down", "downEnd", "downStart"],
  homeNotification: ["dim", "down", "upEnd", "downEnd", "downStart"],
  homeButtonsEnd: ["dim", "down", "downEnd"],
  homeButtonsStart: ["dim", "down", "downStart"],
  interactivityButtonsEnd: ["dim", "downEnd", "down"],
  interactivityButtonsStart: ["dim", "downStart", "down"],
  interactivityCardsEnd: ["dim", "downEnd", "toEnd"],
  interactivityCardsStart: ["dim", "downStart", "toStart"],
  notification: ["upEnd"],
} as const;

export type OverlayVariant = keyof typeof overlayLayers;
export type OverlayLayer = (typeof overlayLayers)[OverlayVariant][number];

export interface OverlayProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Screen footprint this overlay stack is built for.
   * Each value composes the isolated gradient layers from Figma.
   */
  variant?: OverlayVariant;
}

/** Full-bleed contrast stack that sits over video/hero and under chrome. */
export function Overlay({
  variant = "home",
  className,
  ...props
}: OverlayProps) {
  const classes = [styles.root, className].filter(Boolean).join(" ");

  return (
    <div
      className={classes}
      {...props}
      data-variant={variant}
      aria-hidden
    >
      {overlayLayers[variant].map((layer) => (
        <div
          key={layer}
          className={[styles.layer, styles[layer]].join(" ")}
          data-layer={layer}
        />
      ))}
    </div>
  );
}
