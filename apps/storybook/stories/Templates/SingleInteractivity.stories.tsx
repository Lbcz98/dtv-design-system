import type { Meta, StoryObj } from "@storybook/react";
import { Placeholder } from "./Placeholder";
import { CANVAS, CLOSE, TvFrame, templateParameters } from "./TvFrame";

function CloseSlot() {
  return (
    <Placeholder
      label="close"
      width={CLOSE.size}
      height={CLOSE.size}
      radius="50%"
      style={{
        position: "absolute",
        right: CLOSE.right,
        bottom: CLOSE.bottom,
      }}
    />
  );
}

function TallCardTemplate() {
  return (
    <TvFrame>
      <Placeholder
        label="Level 3 — tall card (e.g. stats)"
        focused
        width={288}
        height={440}
        style={{
          position: "absolute",
          top: 160,
          right: CANVAS.inset,
        }}
      />
      <CloseSlot />
    </TvFrame>
  );
}

function FullPageTemplate() {
  return (
    <TvFrame>
      <Placeholder
        label="Level 3 — full page (VOD). Not a fourth level."
        focused
        width={CANVAS.width - CANVAS.inset * 2}
        height={CANVAS.height - CANVAS.inset * 2}
        style={{
          position: "absolute",
          top: CANVAS.inset,
          left: CANVAS.inset,
        }}
      />
      <CloseSlot />
    </TvFrame>
  );
}

const meta: Meta = {
  title: "Templates/SingleInteractivity",
  parameters: {
    ...templateParameters,
    docs: {
      description: {
        component:
          "Level 3 single interactivity. Menu off. Close is the persistent control (top-right of the chrome band). Enter only from Level 2. Back / close: Level 2, or Level 1 if this was a full page.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const TallCard: Story = {
  render: () => <TallCardTemplate />,
};

export const FullPage: Story = {
  render: () => <FullPageTemplate />,
};
