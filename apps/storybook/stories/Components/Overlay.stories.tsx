import type { CSSProperties } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Overlay, overlayLayers, type OverlayVariant } from "@dtv/react";

const variantLabels: Record<OverlayVariant, string> = {
  home: "Home",
  homeNotification: "Home + Notificação",
  homeButtonsEnd: "Home – Botões Direita",
  homeButtonsStart: "Home – Botões Esquerda",
  interactivityButtonsEnd: "Interatividades Botões – Direita",
  interactivityButtonsStart: "Interatividades Botões – Esquerda",
  interactivityCardsEnd: "Interatividades Cards – Direita",
  interactivityCardsStart: "Interatividades Cards – Esquerda",
  notification: "Notificação",
};

const screenStyle: CSSProperties = {
  position: "relative",
  width: 1280,
  height: 720,
  overflow: "hidden",
  background:
    "radial-gradient(ellipse at 28% 42%, #5aa0e8 0%, transparent 52%), radial-gradient(ellipse at 78% 18%, #f0b54a 0%, transparent 46%), linear-gradient(160deg, #1c4f73 0%, #c45a32 48%, #2f6a45 100%)",
};

const meta: Meta<typeof Overlay> = {
  title: "Components/Overlay",
  component: Overlay,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: Object.keys(overlayLayers),
    },
  },
  parameters: {
    layout: "fullscreen",
  },
  render: (args) => (
    <div style={screenStyle}>
      <Overlay {...args} />
    </div>
  ),
};

export default meta;
type Story = StoryObj<typeof Overlay>;

export const Home: Story = {
  args: { variant: "home" },
};

export const HomeNotification: Story = {
  name: "Home + Notificação",
  args: { variant: "homeNotification" },
};

export const HomeButtonsEnd: Story = {
  name: "Home – Botões Direita",
  args: { variant: "homeButtonsEnd" },
};

export const HomeButtonsStart: Story = {
  name: "Home – Botões Esquerda",
  args: { variant: "homeButtonsStart" },
};

export const InteractivityCardsEnd: Story = {
  name: "Interatividades Cards – Direita",
  args: { variant: "interactivityCardsEnd" },
};

export const InteractivityButtonsEnd: Story = {
  name: "Interatividades Botões – Direita",
  args: { variant: "interactivityButtonsEnd" },
};

export const InteractivityCardsStart: Story = {
  name: "Interatividades Cards – Esquerda",
  args: { variant: "interactivityCardsStart" },
};

export const InteractivityButtonsStart: Story = {
  name: "Interatividades Botões – Esquerda",
  args: { variant: "interactivityButtonsStart" },
};

export const Notification: Story = {
  name: "Notificação",
  args: { variant: "notification" },
};

export const AllVariants: Story = {
  name: "All screen combinations",
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 400px)",
        gap: 24,
        padding: 40,
        background: "#0c0c0f",
      }}
    >
      {(Object.keys(overlayLayers) as OverlayVariant[]).map((variant) => (
        <figure key={variant} style={{ margin: 0 }}>
          <div
            style={{
              ...screenStyle,
              width: 400,
              height: 225,
            }}
          >
            <Overlay variant={variant} />
          </div>
          <figcaption
            style={{
              marginTop: 8,
              color: "#f5f5f5",
              fontSize: 13,
              fontFamily: "var(--font-family-sans)",
            }}
          >
            {variantLabels[variant]}
          </figcaption>
        </figure>
      ))}
    </div>
  ),
};
