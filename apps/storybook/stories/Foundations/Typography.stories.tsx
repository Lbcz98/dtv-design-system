import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "@dtv/react";

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
      {(["regular", "medium", "semibold", "bold"] as const).map((weight) => (
        <Text key={weight} variant="body-md" weight={weight}>
          Weight: {weight} — The quick brown fox
        </Text>
      ))}
    </div>
  ),
};
