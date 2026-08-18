import type { Meta, StoryObj } from "@storybook/react";
import { Icon, RoundButton } from "@dtv/react";
import { Placeholder } from "./Placeholder";
import { CANVAS, CLOSE, TvFrame, templateParameters } from "./TvFrame";

function CloseControl() {
  return (
    <div
      style={{
        position: "absolute",
        right: CLOSE.right,
        bottom: CLOSE.bottom,
      }}
    >
      <RoundButton icon={<Icon name="x" size="lg" />} aria-label="Close" autoFocus />
    </div>
  );
}

function TallCardTemplate() {
  return (
    <TvFrame overlay="interactivityCardsEnd">
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
      <CloseControl />
    </TvFrame>
  );
}

function FullPageTemplate() {
  return (
    <TvFrame overlay="home">
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
      <CloseControl />
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
          "Level 3 single interactivity. Menu off. Close is the persistent control. Enter only from Level 2. Back / close: Level 2, or Level 1 if this was a full page.",
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
