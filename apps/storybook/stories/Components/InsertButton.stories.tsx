import type { Meta, StoryObj } from "@storybook/react";
import { InsertButton, Icon } from "@dtv/react";

const meta: Meta<typeof InsertButton> = {
  title: "Components/InsertButton",
  component: InsertButton,
  tags: ["autodocs"],
  argTypes: {
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          width: 320,
          padding: 32,
          background: "#0c0c0f",
          borderRadius: 12,
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof InsertButton>;

export const Default: Story = {
  args: { children: "Label" },
};

export const WithIcons: Story = {
  args: {
    children: "Label",
    leftIcon: <Icon name="arrow-left" size="sm" />,
    rightIcon: <Icon name="arrow-right" size="sm" />,
  },
};

export const Loading: Story = {
  args: { children: "Label", loading: true },
};

export const Disabled: Story = {
  args: { children: "Label", disabled: true },
};

export const AllStates: Story = {
  render: () => (
    <>
      <InsertButton>Label</InsertButton>
      <InsertButton loading>Label</InsertButton>
      <InsertButton disabled>Label</InsertButton>
    </>
  ),
};
