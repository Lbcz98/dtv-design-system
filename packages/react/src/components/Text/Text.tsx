import { type ElementType, type HTMLAttributes } from "react";
import styles from "./Text.module.css";

export type TextVariant =
  | "display"
  | "heading1"
  | "heading2"
  | "heading3"
  | "heading4"
  | "body-lg"
  | "body-md"
  | "body-sm"
  | "label"
  | "caption";

export type TextWeight = "regular" | "medium" | "semibold" | "bold" | "extrabold";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: TextVariant;
  weight?: TextWeight;
  as?: ElementType;
  color?: "primary" | "secondary" | "tertiary" | "inverse" | "link" | "error" | "success";
}

const defaultElements: Record<TextVariant, ElementType> = {
  display: "h1",
  heading1: "h1",
  heading2: "h2",
  heading3: "h3",
  heading4: "h4",
  "body-lg": "p",
  "body-md": "p",
  "body-sm": "p",
  label: "span",
  caption: "span",
};

export function Text({
  variant = "body-md",
  weight,
  as,
  color = "primary",
  className,
  children,
  ...props
}: TextProps) {
  const Component = as ?? defaultElements[variant];
  const classes = [
    styles.text,
    styles[variant.replace("-", "_")],
    weight && styles[`weight_${weight}`],
    styles[`color_${color}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}
