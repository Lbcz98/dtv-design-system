import { type HTMLAttributes, type ReactNode } from "react";
import styles from "./ContentTrail.module.css";

export type ContentTrailSide = "start" | "end";

export interface ContentTrailProps extends HTMLAttributes<HTMLElement> {
  /**
   * Which main-menu rail this trail belongs to.
   * `start` groups from the left (profile, schedule, dynamic).
   * `end` groups from the right (live / contextual).
   */
  side?: ContentTrailSide;
  children: ReactNode;
}

/** Horizontal group of `MainButton`s, aligned to the left or right menu rail. */
export function ContentTrail({
  side = "start",
  className,
  children,
  ...props
}: ContentTrailProps) {
  const classes = [styles.trail, styles[`side_${side}`], className].filter(Boolean).join(" ");

  return (
    <div role="group" className={classes} data-side={side} {...props}>
      {children}
    </div>
  );
}
