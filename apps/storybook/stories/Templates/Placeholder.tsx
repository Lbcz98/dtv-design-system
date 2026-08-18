import type { CSSProperties } from "react";

export function Placeholder({
  label,
  focused = false,
  width,
  height,
  radius = 8,
  style,
}: {
  label: string;
  focused?: boolean;
  width?: number | string;
  height?: number | string;
  radius?: number | string;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        boxSizing: "border-box",
        width,
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 8,
        textAlign: "center",
        fontSize: 12,
        lineHeight: 1.3,
        color: focused ? "#fff" : "rgba(255, 255, 255, 0.85)",
        background: focused
          ? "rgba(255, 255, 255, 0.18)"
          : "rgba(255, 255, 255, 0.1)",
        border: focused
          ? "2px solid var(--color-border-focus, #fff)"
          : "1px dashed rgba(255, 255, 255, 0.4)",
        borderRadius: radius,
        ...style,
      }}
    >
      {label}
    </div>
  );
}
