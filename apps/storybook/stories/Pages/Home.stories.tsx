import { useEffect, useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  HomeMenu,
  NAV_KEYS,
  TopShelf,
  activeTabs,
  dockOrder,
  overlayForTab,
} from "../Templates/chrome";
import type { ActiveTab } from "../Templates/chrome";
import { CANVAS, TvFrame, templateParameters } from "../Templates/TvFrame";
import copaDoMundo from "../assets/pages/copa-do-mundo.png";
import { homeContent } from "./home/mapHome";

function moveDock(tab: ActiveTab, delta: -1 | 1): ActiveTab {
  const index = dockOrder.indexOf(tab);
  const next = index + delta;
  if (next < 0 || next >= dockOrder.length) return tab;
  return dockOrder[next];
}

function HomePage({ activeTab: initialTab }: { activeTab: ActiveTab }) {
  const [tab, setTab] = useState<ActiveTab>(initialTab);
  const [clean, setClean] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTab(initialTab);
    setClean(false);
  }, [initialTab]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || clean) return;
    stage.querySelector<HTMLElement>(`[data-tab="${tab}"]`)?.focus();
  }, [tab, clean]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (!NAV_KEYS.has(event.key)) return;
      event.preventDefault();

      if (clean) {
        if (
          event.key === "Backspace" ||
          event.key === "Escape" ||
          event.key === "Enter"
        ) {
          setClean(false);
          setTab("home");
        }
        return;
      }

      if (event.key === "ArrowLeft") setTab((current) => moveDock(current, -1));
      if (event.key === "ArrowRight") setTab((current) => moveDock(current, 1));

      if (event.key === "Backspace" || event.key === "Escape") {
        if (tab === "home") setClean(true);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [clean, tab]);

  const overlay =
    clean || tab === "home" ? overlayForTab.home : overlayForTab[tab];

  return (
    <TvFrame overlay={overlay} video={copaDoMundo}>
      <div ref={stageRef} style={{ position: "absolute", inset: 0 }}>
        {clean ? null : (
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
              cards={tab === "home" ? undefined : homeContent.shelfCards[tab]}
            />
            <HomeMenu
              activeTab={tab}
              weather={homeContent.weather}
              nowPlaying={homeContent.nowPlaying}
            />
          </div>
        )}
      </div>
    </TvFrame>
  );
}

const meta: Meta<typeof HomePage> = {
  title: "Pages/Home",
  component: HomePage,
  parameters: {
    ...templateParameters,
    docs: {
      description: {
        component:
          "Level 1 Home. Menu and hint trails are mapped from recorded EPG, weather, live, and profile JSON — swap the fixtures or the mapper input for a live API. Left/Right move the dock. The bug has no trail; Back from it returns to a clean transmission. Click the canvas, then use the arrows.",
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
    activeTab: "live",
  },
};

export default meta;
type Story = StoryObj<typeof HomePage>;

export const Default: Story = {};

export const Profile: Story = {
  args: { activeTab: "profile" },
};

export const Schedule: Story = {
  args: { activeTab: "epg" },
};

export const Discover: Story = {
  args: { activeTab: "discover" },
};

export const Bug: Story = {
  args: { activeTab: "home" },
};
