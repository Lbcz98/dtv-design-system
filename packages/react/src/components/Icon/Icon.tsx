import { type LucideIcon, type LucideProps } from "lucide-react";
import * as icons from "lucide-react";
import styles from "./Icon.module.css";

export type IconName =
  | "plus"
  | "x"
  | "check"
  | "chevron-down"
  | "search"
  | "alert-circle"
  | "info"
  | "arrow-left"
  | "arrow-right"
  | "menu"
  | "clock";

export type IconSize = "sm" | "md" | "lg";

export interface IconProps extends Omit<LucideProps, "ref"> {
  name: IconName;
  size?: IconSize;
}

const iconMap: Record<IconName, LucideIcon> = {
  plus: icons.Plus,
  x: icons.X,
  check: icons.Check,
  "chevron-down": icons.ChevronDown,
  search: icons.Search,
  "alert-circle": icons.AlertCircle,
  info: icons.Info,
  "arrow-left": icons.ArrowLeft,
  "arrow-right": icons.ArrowRight,
  menu: icons.Menu,
  clock: icons.Clock,
};

export function Icon({ name, size = "md", className, ...props }: IconProps) {
  const LucideIconComponent = iconMap[name];
  const classes = [styles.icon, styles[size], className].filter(Boolean).join(" ");

  return (
    <LucideIconComponent
      className={classes}
      aria-hidden="true"
      {...props}
    />
  );
}
