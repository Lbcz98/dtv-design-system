import type { Meta, StoryObj } from "@storybook/react";
import { Placeholder } from "./Placeholder";
import { CANVAS, TvFrame, templateParameters } from "./TvFrame";

function FocusedRailTemplate({ side }: { side: "left" | "right" }) {
  return (
    <TvFrame>
      <div
        style={{
          position: "absolute",
          left: CANVAS.inset,
          right: CANVAS.inset,
          bottom: CANVAS.inset,
          display: "flex",
          justifyContent: side === "left" ? "flex-start" : "flex-end",
        }}
      >
        <Placeholder
          label={
            side === "left"
              ? "Content trail — left (profile / schedule / alerts)"
              : "Content trail — right (live / contextual)"
          }
          focused
          width={868}
          height={160}
        />
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
  args: { side: "left" },
};

export const Right: Story = {
  args: { side: "right" },
};
