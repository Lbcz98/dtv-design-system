import type { Meta, StoryObj } from "@storybook/react";
import { MainButton } from "@dtv/react";

const meta: Meta<typeof MainButton> = {
  title: "Components/MainButton",
  component: MainButton,
  tags: ["autodocs"],
  argTypes: {
    live: { control: "boolean" },
    checked: { control: "boolean" },
    selected: { control: "boolean" },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          gap: 32,
          alignItems: "flex-end",
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
type Story = StoryObj<typeof MainButton>;

export const Default: Story = {
  args: {
    overline: "Overline",
    title: "Title",
    subtitle: "Subtitle",
    live: true,
  },
};

export const Selected: Story = {
  args: {
    overline: "Overline",
    title: "Title",
    subtitle: "Subtitle",
    live: true,
    selected: true,
  },
};

export const WithCheck: Story = {
  args: {
    overline: "Overline",
    title: "Title",
    subtitle: "Subtitle",
    checked: true,
  },
};

export const WithSponsor: Story = {
  args: {
    overline: "Overline",
    title: "Title",
    subtitle: "Subtitle",
    sponsor: { label: "Publicidade" },
  },
};

export const AllStates: Story = {
  render: () => (
    <>
      <MainButton overline="Overline" title="Title" subtitle="Subtitle" live />
      <MainButton
        overline="Overline"
        title="Title"
        subtitle="Subtitle"
        live
        selected
      />
      <MainButton overline="Overline" title="Title" subtitle="Subtitle" checked />
    </>
  ),
};
