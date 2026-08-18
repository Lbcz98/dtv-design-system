import { useEffect, useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Level3Surface,
  NAV_KEYS,
  TopShelf,
  overlayForLevel2,
  overlayForTab,
  shelfCards,
} from "./chrome";
import type { ActiveTab } from "./chrome";
import { CANVAS, TvFrame, templateParameters } from "./TvFrame";

function overlayForLevel3(tab: Exclude<ActiveTab, "home">, index: number) {
  return shelfCards[tab][index]?.surface === "page"
    ? overlayForTab.home
    : overlayForLevel2[tab];
}

function FocusedRailTemplate({ side }: { side: "start" | "end" }) {
  const tab: Exclude<ActiveTab, "home"> = side === "start" ? "profile" : "live";
  const cards = shelfCards[tab];
  const [level, setLevel] = useState<2 | 3>(2);
  const [trailIndex, setTrailIndex] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (level === 3) {
      stage.querySelector<HTMLElement>('[aria-label="Close"]')?.focus();
      return;
    }
    stage.querySelectorAll<HTMLElement>('[role="group"] button')[trailIndex]?.focus();
  }, [level, trailIndex]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (!NAV_KEYS.has(event.key)) return;
      event.preventDefault();

      if (level === 3) {
        if (
          event.key === "Backspace" ||
          event.key === "Escape" ||
          event.key === "Enter"
        ) {
          setLevel(2);
        }
        return;
      }

      if (event.key === "ArrowLeft") {
        setTrailIndex((index) => Math.max(0, index - 1));
      }
      if (event.key === "ArrowRight") {
        setTrailIndex((index) => Math.min(cards.length - 1, index + 1));
      }
      if (event.key === "Enter") {
        setLevel(3);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [cards.length, level]);

  const overlay =
    level === 3 ? overlayForLevel3(tab, trailIndex) : overlayForLevel2[tab];
  const card = cards[trailIndex];

  return (
    <TvFrame overlay={overlay}>
      <div ref={stageRef} style={{ position: "absolute", inset: 0 }}>
        {level === 3 ? (
          <Level3Surface tab={tab} card={card} onClose={() => setLevel(2)} />
        ) : (
          <div
            style={{
              position: "absolute",
              left: CANVAS.inset,
              right: CANVAS.inset,
              bottom: CANVAS.inset,
            }}
          >
            <TopShelf
              tab={tab}
              focusIndex={trailIndex}
              onActivate={(index) => {
                setTrailIndex(index);
                setLevel(3);
              }}
            />
          </div>
        )}
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
          "Level 2 focused trail. Menu hidden. Only the content trail. Left/Right move across cards. Enter / OK opens Level 3. Back from Level 3 returns here. Do not mix left and right on the same page. Click the canvas, then use the arrows.",
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
