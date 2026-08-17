import type { Meta, StoryObj } from "@storybook/react";

const spacingTokens = [
  "space-0",
  "space-1",
  "space-2",
  "space-3",
  "space-4",
  "space-5",
  "space-6",
  "space-8",
  "space-10",
  "space-12",
  "space-16",
];

const radiusTokens = [
  "radius-none",
  "radius-sm",
  "radius-md",
  "radius-lg",
  "radius-xl",
  "radius-full",
];

const meta: Meta = {
  title: "Foundations/Spacing",
  parameters: { layout: "padded" },
};

export default meta;

export const SpacingScale: StoryObj = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {spacingTokens.map((token) => (
        <div
          key={token}
          style={{ display: "flex", alignItems: "center", gap: 16 }}
        >
          <code style={{ width: 80, fontSize: 12 }}>{token}</code>
          <div
            style={{
              height: 24,
              width: `var(--${token})`,
              minWidth: 4,
              backgroundColor: "var(--color-action-primary)",
              borderRadius: 4,
            }}
          />
        </div>
      ))}
    </div>
  ),
};

export const BorderRadius: StoryObj = {
  render: () => (
    <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
      {radiusTokens.map((token) => (
        <div key={token} style={{ textAlign: "center" }}>
          <div
            style={{
              width: 64,
              height: 64,
              backgroundColor: "var(--color-action-primary)",
              borderRadius: `var(--${token})`,
              marginBottom: 8,
            }}
          />
          <code style={{ fontSize: 11 }}>{token}</code>
        </div>
      ))}
    </div>
  ),
};

export const Shadows: StoryObj = {
  render: () => (
    <div style={{ display: "flex", gap: 32 }}>
      {["shadow-sm", "shadow-md", "shadow-lg"].map((token) => (
        <div key={token} style={{ textAlign: "center" }}>
          <div
            style={{
              width: 120,
              height: 80,
              backgroundColor: "var(--color-surface-default)",
              borderRadius: "var(--radius-md)",
              boxShadow: `var(--${token})`,
              marginBottom: 8,
            }}
          />
          <code style={{ fontSize: 11 }}>{token}</code>
        </div>
      ))}
    </div>
  ),
};
