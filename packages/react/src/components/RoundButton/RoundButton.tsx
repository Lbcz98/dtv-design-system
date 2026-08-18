import { type ButtonHTMLAttributes, type ReactNode } from "react";
import styles from "./RoundButton.module.css";

export interface RoundButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon rendered inside the button, e.g. `<Icon name="arrow-left" />`. */
  icon: ReactNode;
  /** Required since this is an icon-only control. */
  "aria-label": string;
}

/**
 * Fixed-size circular icon button used for menu, back, and close actions.
 * Grows and gains a glowing ring on focus (`:focus-visible`) to mirror TV
 * remote-control navigation.
 */
export function RoundButton({
  icon,
  className,
  type = "button",
  ...props
}: RoundButtonProps) {
  const classes = [styles.roundButton, className].filter(Boolean).join(" ");

  return (
    <button type={type} className={classes} {...props}>
      <span className={styles.circle}>
        <span className={styles.iconSlot}>{icon}</span>
      </span>
    </button>
  );
}
