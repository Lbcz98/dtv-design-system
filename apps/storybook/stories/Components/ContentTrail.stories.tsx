import type { Meta, StoryObj } from "@storybook/react";
import { ContentTrail, MainButton } from "@dtv/react";

const contextualCards = (
  <>
    <MainButton title="Opções de áudio" />
    <MainButton title="Lances da partida" />
    <MainButton title="Vote no Craque do Jogo" />
    <MainButton title="Estatísticas" />
  </>
);

const profileCards = (
  <>
    <MainButton title="Minha conta" />
    <MainButton title="Perfis" />
    <MainButton title="Configurações" />
    <MainButton title="Ajuda" />
  </>
);

const meta: Meta<typeof ContentTrail> = {
  title: "Components/ContentTrail",
  component: ContentTrail,
  tags: ["autodocs"],
  argTypes: {
    side: { control: "radio", options: ["start", "end"] },
  },
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          boxSizing: "border-box",
          width: 1280,
          padding: 40,
          background: "#0c0c0f",
          minHeight: 320,
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ContentTrail>;

export const FromStart: Story = {
  name: "From left menu (default)",
  args: {
    side: "start",
    "aria-label": "Trilho de conteúdo",
    children: profileCards,
  },
};

export const FromEnd: Story = {
  name: "From right menu (default)",
  args: {
    side: "end",
    "aria-label": "Trilho de conteúdo",
    children: contextualCards,
  },
};

export const SelectedFromStart: Story = {
  name: "From left menu (selected)",
  render: () => (
    <ContentTrail side="start" aria-label="Trilho de conteúdo">
      <MainButton title="Minha conta" autoFocus />
      <MainButton title="Perfis" />
      <MainButton title="Configurações" />
      <MainButton title="Ajuda" />
    </ContentTrail>
  ),
};

export const SelectedFromEnd: Story = {
  name: "From right menu (selected)",
  render: () => (
    <ContentTrail side="end" aria-label="Trilho de conteúdo">
      <MainButton title="Opções de áudio" />
      <MainButton title="Lances da partida" />
      <MainButton title="Vote no Craque do Jogo" />
      <MainButton title="Estatísticas" autoFocus />
    </ContentTrail>
  ),
};
