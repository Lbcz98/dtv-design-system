import { type HTMLAttributes, type ReactNode } from "react";
import styles from "./Menu.module.css";

export interface MenuProps extends HTMLAttributes<HTMLElement> {
  /** Left rail (`Options`): profile, schedule, and dynamic widgets. */
  start?: ReactNode;
  /** Right rail (`Live`): now-playing slot plus the company logo (home). */
  end?: ReactNode;
}

/**
 * Split navigation bar for the TV shell. Slots hug the left and right edges
 * so the bar can be fully configured on home, or reduced to loose round
 * buttons on the second level of navigation.
 */
export function Menu({ start, end, className, ...props }: MenuProps) {
  const classes = [styles.menu, className].filter(Boolean).join(" ");

  return (
    <nav className={classes} {...props}>
      {start ? <div className={styles.railStart}>{start}</div> : null}
      {end ? <div className={styles.railEnd}>{end}</div> : null}
    </nav>
  );
}
