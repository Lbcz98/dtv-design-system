import { type ButtonHTMLAttributes, type ReactNode } from "react";
import styles from "./InsertButton.module.css";

export interface InsertButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon rendered before the label, e.g. `<Icon name="arrow-left" size="sm" />`. */
  leftIcon?: ReactNode;
  /** Icon rendered after the label, e.g. `<Icon name="arrow-right" size="sm" />`. */
  rightIcon?: ReactNode;
  /** Shows a spinner in place of the content while keeping the button chrome. */
  loading?: boolean;
}

/**
 * Full-width pill action button. Shares the design system's dark fill and 1px
 * diagonal-light stroke, lighting up with the primary gradient glow on focus
 * (`:focus-visible`) to mirror TV remote-control navigation.
 */
export function InsertButton({
  leftIcon,
  rightIcon,
  loading = false,
  children,
  className,
  type = "button",
  disabled = false,
  ...props
}: InsertButtonProps) {
  const classes = [styles.insertButton, loading && styles.loading, className]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type={type}
      className={classes}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <span className={styles.spinner} aria-hidden="true" />
      ) : (
        <span className={styles.content}>
          {leftIcon && <span className={styles.iconSlot}>{leftIcon}</span>}
          {children && <span className={styles.label}>{children}</span>}
          {rightIcon && <span className={styles.iconSlot}>{rightIcon}</span>}
        </span>
      )}
    </button>
  );
}
