import type { Meta, StoryObj } from "@storybook/react";
import { Placeholder } from "./Placeholder";
import { CANVAS, MENU, SLOT, TvFrame, templateParameters } from "./TvFrame";

const focusedSlots = [
  "profile",
  "schedule",
  "alerts",
  "live",
  "bug",
] as const;

type FocusedSlot = (typeof focusedSlots)[number];

const hintTrail: Record<FocusedSlot, string | null> = {
  profile: "Hint trail — profile cards",
  schedule: "Hint trail — programming cards",
  alerts: "Hint trail — notification cards",
  live: "Hint trail — interactivity cards",
  bug: null,
};

const leftSlots: FocusedSlot[] = ["profile", "schedule", "alerts"];

function HomeTemplate({ focusedSlot }: { focusedSlot: FocusedSlot }) {
  const trail = hintTrail[focusedSlot];
  const trailOnRight = focusedSlot === "live";

  return (
    <TvFrame>
      <div
        style={{
          position: "absolute",
          left: CANVAS.inset,
          right: CANVAS.inset,
          bottom: CANVAS.inset,
          display: "flex",
          flexDirection: "column",
          alignItems: trailOnRight ? "flex-end" : "flex-start",
          gap: 8,
        }}
      >
        {trail ? (
          <Placeholder
            label={trail}
            focused
            width={640}
            height={122}
          />
        ) : null}
        <div
          style={{
            display: "flex",
            width: MENU.width,
            height: MENU.height,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: 0 }}>
            {leftSlots.map((slot) => (
              <Placeholder
                key={slot}
                label={slot}
                focused={focusedSlot === slot}
                width={SLOT.size}
                height={SLOT.size}
                radius="50%"
              />
            ))}
          </div>
          <div style={{ display: "flex", gap: 0 }}>
            <Placeholder
              label="live"
              focused={focusedSlot === "live"}
              width={SLOT.size}
              height={SLOT.size}
              radius="50%"
            />
            <Placeholder
              label="bug"
              focused={focusedSlot === "bug"}
              width={SLOT.size}
              height={SLOT.size}
              radius="50%"
            />
          </div>
        </div>
      </div>
    </TvFrame>
  );
}

const meta: Meta<typeof HomeTemplate> = {
  title: "Templates/Home",
  component: HomeTemplate,
  parameters: {
    ...templateParameters,
    docs: {
      description: {
        component:
          "Level 1 Home. Full menu. The hint trail sits above the focused slot (preview only). X: menu slots. Up: Level 2. Bug: clean transmission. The bug does not spawn a trail.",
      },
    },
  },
  argTypes: {
    focusedSlot: {
      control: "select",
      options: [...focusedSlots],
    },
  },
  args: {
    focusedSlot: "profile",
  },
};

export default meta;
type Story = StoryObj<typeof HomeTemplate>;

export const Default: Story = {};
