import type { Meta, StoryObj } from "@storybook/react";
import { RoundButton, Icon } from "@dtv/react";

const meta: Meta<typeof RoundButton> = {
  title: "Components/RoundButton",
  component: RoundButton,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          gap: 24,
          alignItems: "center",
          padding: 24,
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
type Story = StoryObj<typeof RoundButton>;

export const Menu: Story = {
  args: { icon: <Icon name="menu" />, "aria-label": "Menu" },
};

export const Back: Story = {
  args: { icon: <Icon name="arrow-left" />, "aria-label": "Voltar" },
};

export const Close: Story = {
  args: { icon: <Icon name="x" />, "aria-label": "Fechar" },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 24 }}>
      <RoundButton icon={<Icon name="menu" />} aria-label="Menu" />
      <RoundButton icon={<Icon name="arrow-left" />} aria-label="Voltar" />
      <RoundButton icon={<Icon name="x" />} aria-label="Fechar" />
      <RoundButton icon={<Icon name="x" />} aria-label="Fechar (disabled)" disabled />
    </div>
  ),
};
