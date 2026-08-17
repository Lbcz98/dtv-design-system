import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "@dtv/react";

const fontSizes = [
  "3xs",
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "5xl",
] as const;

const fontWeights = ["regular", "medium", "semibold", "bold", "extrabold"] as const;

const variants = [
  "display",
  "heading1",
  "heading2",
  "heading3",
  "heading4",
  "body-lg",
  "body-md",
  "body-sm",
  "label",
  "caption",
] as const;

const meta: Meta = {
  title: "Foundations/Typography",
  parameters: { layout: "padded" },
};

export default meta;

export const TypeScale: StoryObj = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {variants.map((variant) => (
        <div key={variant}>
          <Text variant="caption" color="secondary">
            {variant}
          </Text>
          <Text variant={variant}>
            The quick brown fox jumps over the lazy dog
          </Text>
        </div>
      ))}
    </div>
  ),
};

export const FontWeights: StoryObj = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {fontWeights.map((weight) => (
        <Text key={weight} variant="body-md" weight={weight}>
          Weight: {weight} — The quick brown fox
        </Text>
      ))}
    </div>
  ),
};

export const FontSizeScale: StoryObj = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
      {fontSizes.map((size) => (
        <div
          key={size}
          style={{
            width: 180,
            padding: 16,
            border: "1px solid var(--color-border-default)",
            borderRadius: 8,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          <span
            style={{
              fontSize: `var(--font-size-${size})`,
              fontFamily: "var(--font-family-sans)",
            }}
          >
            aA
          </span>
          <Text variant="caption" color="link">
            {`$font-size-${size}`}
          </Text>
          <Text variant="caption" color="secondary">
            {`var(--font-size-${size})`}
          </Text>
        </div>
      ))}
    </div>
  ),
};
