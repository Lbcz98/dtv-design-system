import { type ButtonHTMLAttributes } from "react";
import styles from "./Menu.module.css";

export interface HomeLogoProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Company bug image, centered in the 88×88 hit target. */
  src: string;
  /** Decorative; the button `aria-label` is the accessible name. */
  alt?: string;
  /** Required. This control returns to home / clean transmission. */
  "aria-label": string;
}

/**
 * Far-right company logo in the menu. Distinct from `RoundButton`: it is the
 * Globo bug, not a circle chrome control, and is the home-page origin.
 */
export function HomeLogo({
  src,
  alt = "",
  className,
  type = "button",
  ...props
}: HomeLogoProps) {
  const classes = [styles.homeLogo, className].filter(Boolean).join(" ");

  return (
    <button type={type} className={classes} {...props}>
      <img className={styles.bug} src={src} alt={alt} width={88} height={88} />
    </button>
  );
}
