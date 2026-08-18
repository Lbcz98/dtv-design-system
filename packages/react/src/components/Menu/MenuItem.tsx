import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { RoundButton } from "../RoundButton";
import styles from "./Menu.module.css";

export type MenuItemAlign = "start" | "end";

export interface MenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Content inside the round button (icon, avatar, or program logo). */
  icon: ReactNode;
  /** Primary label shown beside the button on the home (configured) menu. */
  title?: string;
  /** Secondary line under the title. */
  subtitle?: string;
  /**
   * `start` places copy to the right of the button (left rail).
   * `end` places copy to the left, right-aligned (live/program rail).
   */
  align?: MenuItemAlign;
  /** Required since the round control is icon-first. */
  "aria-label": string;
}

/**
 * A menu slot: the shared round button, optionally paired with two-line copy.
 * Omit `title`/`subtitle` to render a loose rail button.
 */
export function MenuItem({
  icon,
  title,
  subtitle,
  align = "start",
  className,
  ...props
}: MenuItemProps) {
  const hasCopy = Boolean(title || subtitle);
  const classes = [styles.item, styles[`align_${align}`], className].filter(Boolean).join(" ");

  const copy = hasCopy ? (
    <span className={styles.copy}>
      {title ? <span className={styles.title}>{title}</span> : null}
      {subtitle ? <span className={styles.subtitle}>{subtitle}</span> : null}
    </span>
  ) : null;

  return (
    <span className={classes}>
      {align === "end" ? copy : null}
      <RoundButton icon={icon} {...props} />
      {align === "start" ? copy : null}
    </span>
  );
}
