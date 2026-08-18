import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { Icon } from "../Icon";
import styles from "./MainButton.module.css";

export interface MainButtonSponsor {
  label: string;
  logo?: ReactNode;
}

export interface MainButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Main heading of the card. */
  title: string;
  /** Small label shown above the title. */
  overline?: string;
  /** Secondary line shown below the title. */
  subtitle?: string;
  /** Thumbnail/media content rendered at the top of the card. */
  thumbnail?: ReactNode;
  /** Shows the "AO VIVO" live badge. */
  live?: boolean;
  /** Shows a check badge (e.g. already watched/confirmed). */
  checked?: boolean;
  /** Sponsor/ad attribution row. */
  sponsor?: MainButtonSponsor;
  /**
   * Marks the card as selected even without keyboard focus. The background
   * shell scales like focus; the label box does not move.
   */
  selected?: boolean;
}

/**
 * Fixed-size media card button. The layout box and label stay 158×122 /
 * 118px; focus scales a background shell so type never reflows.
 */
export function MainButton({
  title,
  overline,
  subtitle,
  thumbnail,
  live = false,
  checked = false,
  sponsor,
  selected = false,
  className,
  type = "button",
  ...props
}: MainButtonProps) {
  const classes = [styles.mainButton, selected && styles.selected, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} className={classes} {...props}>
      <span className={styles.shell} aria-hidden="true" />
      <span className={styles.thumbnail}>{thumbnail}</span>

      {live && (
        <span className={styles.liveBadge}>
          <span className={styles.liveLabel}>AO VIVO</span>
        </span>
      )}

      {checked && (
        <span className={styles.checkBadge}>
          <Icon name="check" size="sm" />
        </span>
      )}

      <span className={styles.label}>
        {overline && <span className={styles.overline}>{overline}</span>}
        <span className={styles.title}>{title}</span>
        {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
        {sponsor && (
          <span className={styles.sponsor}>
            <span className={styles.sponsorLabel}>{sponsor.label}</span>
            {sponsor.logo}
          </span>
        )}
      </span>
    </button>
  );
}
