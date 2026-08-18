import type { Meta, StoryObj } from "@storybook/react";
import { FocusedContentTrail } from "./chrome";
import { CANVAS, TvFrame, templateParameters } from "./TvFrame";

function FocusedRailTemplate({ side }: { side: "start" | "end" }) {
  return (
    <TvFrame
      overlay={
        side === "start" ? "interactivityCardsStart" : "interactivityCardsEnd"
      }
    >
      <div
        style={{
          position: "absolute",
          left: CANVAS.inset,
          right: CANVAS.inset,
          bottom: CANVAS.inset,
        }}
      >
        <FocusedContentTrail side={side} />
      </div>
    </TvFrame>
  );
}

const meta: Meta<typeof FocusedRailTemplate> = {
  title: "Templates/FocusedRail",
  component: FocusedRailTemplate,
  parameters: {
    ...templateParameters,
    docs: {
      description: {
        component:
          "Level 2 focused trail. Menu hidden. Only the content trail. X: interactivities in the trail. Back: Level 1. Do not mix left and right on the same page.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof FocusedRailTemplate>;

export const Left: Story = {
  args: { side: "start" },
};

export const Right: Story = {
  args: { side: "end" },
};
