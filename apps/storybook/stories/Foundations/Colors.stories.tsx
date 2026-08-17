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

const primaryTokens = [
  "color-primary-dia-light",
  "color-primary-dia-dark",
  "color-primary-tarde-light",
  "color-primary-tarde-dark",
  "color-primary-noite-light",
  "color-primary-noite-dark",
];

const complementaryTokens = [
  "color-complementary-error",
  "color-complementary-confirmation",
  "color-complementary-alert",
];

const neutralTokens = [
  "color-neutral-white",
  "color-neutral-light",
  "color-neutral-medium",
  "color-neutral-dark",
  "color-neutral-black",
];

const gradientTokens = [
  "gradient-dia",
  "gradient-dia-inverse",
  "gradient-tarde",
  "gradient-tarde-inverse",
  "gradient-noite",
  "gradient-noite-inverse",
  "gradient-live",
  "gradient-text",
];

const opacityTokens = [
  "opacity-dark-10",
  "opacity-dark-20",
  "opacity-dark-30",
  "opacity-dark-50",
  "opacity-dark-70",
  "opacity-light-10",
  "opacity-light-20",
  "opacity-light-30",
  "opacity-light-50",
  "opacity-light-70",
];

function BrandSwatch({ token }: { token: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div
        style={{
          width: 80,
          height: 48,
          borderRadius: 8,
          backgroundColor: `var(--${token})`,
          border: "1px solid var(--color-border-default)",
        }}
      />
      <code style={{ fontSize: 11 }}>{token}</code>
    </div>
  );
}

function GradientSwatch({ token }: { token: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div
        style={{
          width: 120,
          height: 48,
          borderRadius: 8,
          backgroundImage: `var(--${token})`,
          border: "1px solid var(--color-border-default)",
        }}
      />
      <code style={{ fontSize: 11 }}>{token}</code>
    </div>
  );
}

function OpacitySwatch({ token }: { token: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <div
        style={{
          width: 80,
          height: 48,
          borderRadius: 8,
          border: "1px solid var(--color-border-default)",
          backgroundImage:
            "linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%)",
          backgroundSize: "12px 12px",
          backgroundPosition: "0 0, 0 6px, 6px -6px, -6px 0px",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 8,
            backgroundColor: `var(--${token})`,
          }}
        />
      </div>
      <code style={{ fontSize: 11 }}>{token}</code>
    </div>
  );
}

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

export const BrandPalette: StoryObj = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <section>
        <h3 style={{ marginBottom: 16 }}>Neutral</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          {neutralTokens.map((token) => (
            <BrandSwatch key={token} token={token} />
          ))}
        </div>
      </section>
      <section>
        <h3 style={{ marginBottom: 16 }}>Primary (Dia / Tarde / Noite)</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          {primaryTokens.map((token) => (
            <BrandSwatch key={token} token={token} />
          ))}
        </div>
      </section>
      <section>
        <h3 style={{ marginBottom: 16 }}>Complementary</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          {complementaryTokens.map((token) => (
            <BrandSwatch key={token} token={token} />
          ))}
        </div>
      </section>
      <section>
        <h3 style={{ marginBottom: 16 }}>Gradients</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          {gradientTokens.map((token) => (
            <GradientSwatch key={token} token={token} />
          ))}
        </div>
      </section>
      <section>
        <h3 style={{ marginBottom: 16 }}>Opacity scale</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          {opacityTokens.map((token) => (
            <OpacitySwatch key={token} token={token} />
          ))}
        </div>
      </section>
    </div>
  ),
};
