import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "@dtv/react";

const meta: Meta<typeof Text> = {
  title: "Components/Text",
  component: Text,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
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
      ],
    },
    weight: {
      control: "select",
      options: ["regular", "medium", "semibold", "bold"],
    },
    color: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "tertiary",
        "inverse",
        "link",
        "error",
        "success",
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    children: "The quick brown fox jumps over the lazy dog",
    variant: "body-md",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {(
        [
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
        ] as const
      ).map((variant) => (
        <Text key={variant} variant={variant}>
          {variant}
        </Text>
      ))}
    </div>
  ),
};
