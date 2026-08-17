import type { Meta, StoryObj } from "@storybook/react";

const colorGroups = [
  {
    title: "Text",
    tokens: [
      "color-text-primary",
      "color-text-secondary",
      "color-text-tertiary",
      "color-text-inverse",
      "color-text-link",
      "color-text-error",
      "color-text-success",
    ],
  },
  {
    title: "Surface",
    tokens: [
      "color-surface-default",
      "color-surface-subtle",
      "color-surface-muted",
      "color-surface-inverse",
    ],
  },
  {
    title: "Border",
    tokens: [
      "color-border-default",
      "color-border-subtle",
      "color-border-strong",
      "color-border-focus",
      "color-border-error",
    ],
  },
  {
    title: "Action",
    tokens: [
      "color-action-primary",
      "color-action-primary-hover",
      "color-action-primary-pressed",
      "color-action-secondary",
      "color-action-secondary-hover",
      "color-action-ghost-hover",
    ],
  },
];

function Swatch({ token }: { token: string }) {
  const isText = token.includes("text");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div
        style={{
          width: 80,
          height: 48,
          borderRadius: 8,
          backgroundColor: isText
            ? "var(--color-surface-default)"
            : `var(--${token})`,
          border: "1px solid var(--color-border-default)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isText && (
          <span style={{ color: `var(--${token})`, fontWeight: 600 }}>Aa</span>
        )}
      </div>
      <code style={{ fontSize: 11 }}>{token}</code>
    </div>
  );
}

const meta: Meta = {
  title: "Foundations/Colors",
  parameters: { layout: "padded" },
};

export default meta;

export const SemanticColors: StoryObj = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {colorGroups.map((group) => (
        <section key={group.title}>
          <h3 style={{ marginBottom: 16 }}>{group.title}</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            {group.tokens.map((token) => (
              <Swatch key={token} token={token} />
            ))}
          </div>
        </section>
      ))}
    </div>
  ),
};
