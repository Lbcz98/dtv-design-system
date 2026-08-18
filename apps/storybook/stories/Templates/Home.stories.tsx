import { useEffect, useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  HomeMenu,
  Level3Surface,
  NAV_KEYS,
  TopShelf,
  activeTabs,
  dockOrder,
  overlayForLevel2,
  overlayForTab,
  shelfCards,
} from "./chrome";
import type { ActiveTab } from "./chrome";
import { CANVAS, TvFrame, templateParameters } from "./TvFrame";

function moveDock(tab: ActiveTab, delta: -1 | 1): ActiveTab {
  const index = dockOrder.indexOf(tab);
  const next = index + delta;
  if (next < 0 || next >= dockOrder.length) return tab;
  return dockOrder[next];
}

function overlayForLevel3(tab: Exclude<ActiveTab, "home">, index: number) {
  return shelfCards[tab][index]?.surface === "page"
    ? overlayForTab.home
    : overlayForLevel2[tab];
}

function HomeTemplate({ activeTab: initialTab }: { activeTab: ActiveTab }) {
  const [tab, setTab] = useState<ActiveTab>(initialTab);
  const [level, setLevel] = useState<1 | 2 | 3>(1);
  const [clean, setClean] = useState(false);
  const [trailIndex, setTrailIndex] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTab(initialTab);
    setLevel(1);
    setClean(false);
    setTrailIndex(0);
  }, [initialTab]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    if (level === 3) {
      stage.querySelector<HTMLElement>('[aria-label="Close"]')?.focus();
      return;
    }

    const selector =
      level === 2 ? '[role="group"] button' : `[data-tab="${tab}"]`;
    const nodes = stage.querySelectorAll<HTMLElement>(selector);
    const target = level === 2 ? nodes[trailIndex] : nodes[0];
    target?.focus();
  }, [tab, level, clean, trailIndex]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (!NAV_KEYS.has(event.key)) return;
      event.preventDefault();

      if (clean) {
        if (event.key === "ArrowLeft") {
          setClean(false);
          setTab("live");
          setLevel(1);
        }
        if (
          event.key === "Backspace" ||
          event.key === "Escape" ||
          event.key === "Enter"
        ) {
          setClean(false);
          setTab("home");
          setLevel(1);
        }
        return;
      }

      if (level === 3 && tab !== "home") {
        if (
          event.key === "Backspace" ||
          event.key === "Escape" ||
          event.key === "Enter"
        ) {
          const card = shelfCards[tab][trailIndex];
          setLevel(card.surface === "page" ? 1 : 2);
        }
        return;
      }

      if (level === 2 && tab !== "home") {
        const count = shelfCards[tab].length;
        if (event.key === "ArrowLeft") {
          setTrailIndex((index) => Math.max(0, index - 1));
        }
        if (event.key === "ArrowRight") {
          setTrailIndex((index) => Math.min(count - 1, index + 1));
        }
        if (event.key === "Enter") {
          setLevel(3);
        }
        if (
          event.key === "ArrowDown" ||
          event.key === "Backspace" ||
          event.key === "Escape"
        ) {
          setLevel(1);
          setTrailIndex(0);
        }
        return;
      }

      if (event.key === "ArrowLeft") setTab((current) => moveDock(current, -1));
      if (event.key === "ArrowRight") setTab((current) => moveDock(current, 1));

      if (event.key === "ArrowUp" || event.key === "Enter") {
        if (tab === "home") {
          setClean(true);
          return;
        }
        setTrailIndex(0);
        setLevel(2);
      }

      if (event.key === "Backspace" || event.key === "Escape") {
        if (tab === "home") setClean(true);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [clean, level, tab]);

  const overlay =
    clean || tab === "home"
      ? overlayForTab.home
      : level === 3
        ? overlayForLevel3(tab, trailIndex)
        : level === 2
          ? overlayForLevel2[tab]
          : overlayForTab[tab];

  const level3Card =
    level === 3 && tab !== "home" ? shelfCards[tab][trailIndex] : null;

  return (
    <TvFrame overlay={overlay}>
      <div ref={stageRef} style={{ position: "absolute", inset: 0 }}>
        {clean ? null : level3Card && tab !== "home" ? (
          <Level3Surface
            tab={tab}
            card={level3Card}
            onClose={() =>
              setLevel(level3Card.surface === "page" ? 1 : 2)
            }
          />
        ) : (
          <div
            style={{
              position: "absolute",
              left: CANVAS.inset,
              right: CANVAS.inset,
              bottom: CANVAS.inset,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <TopShelf
              tab={tab}
              focusIndex={level === 2 ? trailIndex : undefined}
              onActivate={
                level === 2
                  ? (index) => {
                      setTrailIndex(index);
                      setLevel(3);
                    }
                  : undefined
              }
            />
            {level === 1 ? <HomeMenu activeTab={tab} /> : null}
          </div>
        )}
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
          "Level 1 Home. Left/Right move the dock and swap the top shelf preview. Up or Enter on a tab with a shelf enters Level 2 (menu hidden). On Level 2, Left/Right move across cards; Enter / OK opens Level 3. The bug is in the dock path but has no shelf; Up/Enter/Back from the bug goes to a clean transmission. Click the canvas, then use the arrows.",
      },
    },
  },
  argTypes: {
    activeTab: {
      control: "select",
      options: [...activeTabs],
    },
  },
  args: {
    activeTab: "profile",
  },
};

export default meta;
type Story = StoryObj<typeof HomeTemplate>;

export const Default: Story = {};
