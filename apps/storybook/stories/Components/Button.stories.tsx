import type { Meta, StoryObj } from "@storybook/react";
import { Button, Icon } from "@dtv/react";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary", "ghost"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { children: "Button", variant: "primary", size: "md" },
};

export const Secondary: Story = {
  args: { children: "Button", variant: "secondary", size: "md" },
};

export const Ghost: Story = {
  args: { children: "Button", variant: "ghost", size: "md" },
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 16 }}>
      <Button leftIcon={<Icon name="plus" size="sm" />}>Add item</Button>
      <Button rightIcon={<Icon name="chevron-down" size="sm" />}>
        Options
      </Button>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {(["primary", "secondary", "ghost"] as const).map((variant) => (
        <div key={variant} style={{ display: "flex", gap: 12, alignItems: "center" }}>
          {(["sm", "md", "lg"] as const).map((size) => (
            <Button key={size} variant={variant} size={size}>
              {variant} {size}
            </Button>
          ))}
          <Button variant={variant} size="md" disabled>
            Disabled
          </Button>
        </div>
      ))}
    </div>
  ),
};
