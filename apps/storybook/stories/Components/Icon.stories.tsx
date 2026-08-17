import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "@dtv/react";

const meta: Meta<typeof Icon> = {
  title: "Components/Icon",
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "select",
      options: [
        "plus",
        "x",
        "check",
        "chevron-down",
        "search",
        "alert-circle",
        "info",
      ],
    },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Default: Story = {
  args: { name: "plus", size: "md" },
};

export const AllIcons: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      {(
        [
          "plus",
          "x",
          "check",
          "chevron-down",
          "search",
          "alert-circle",
          "info",
        ] as const
      ).map((name) => (
        <Icon key={name} name={name} size="md" />
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
      <Icon name="plus" size="sm" />
      <Icon name="plus" size="md" />
      <Icon name="plus" size="lg" />
    </div>
  ),
};
