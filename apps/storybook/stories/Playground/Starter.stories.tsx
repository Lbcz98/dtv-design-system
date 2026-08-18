/**
 * Duplicate this file as `Playground/<Name>.stories.tsx`.
 *
 * Level 1 starter: video → overlay → hint trail → configured menu.
 * Level 2: clone Templates/FocusedRail (menu hidden).
 * Level 3: clone Templates/SingleInteractivity (Close only).
 *
 * Keep TvFrame, Overlay, Menu, and trail regions. Do not invent chrome.
 * Map copy through Pages/home fixtures — do not hardcode MainButton strings.
 */
import type { Meta, StoryObj } from "@storybook/react";
import {
  HomeMenu,
  TopShelf,
  activeTabs,
  overlayForTab,
} from "../Templates/chrome";
import type { ActiveTab } from "../Templates/chrome";
import { CANVAS, TvFrame, templateParameters } from "../Templates/TvFrame";
import copaDoMundo from "../assets/pages/copa-do-mundo.png";
import { homeContent } from "../Pages/home/mapHome";

function Starter({ activeTab }: { activeTab: ActiveTab }) {
  const overlay =
    activeTab === "home" ? overlayForTab.home : overlayForTab[activeTab];

  return (
    <TvFrame overlay={overlay} video={copaDoMundo}>
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
          tab={activeTab}
          cards={
            activeTab === "home" ? undefined : homeContent.shelfCards[activeTab]
          }
        />
        <HomeMenu
          activeTab={activeTab}
          weather={homeContent.weather}
          nowPlaying={homeContent.nowPlaying}
        />
      </div>
    </TvFrame>
  );
}

const meta: Meta<typeof Starter> = {
  title: "Playground/Starter",
  component: Starter,
  parameters: {
    ...templateParameters,
    docs: {
      description: {
        component:
          "Scratch Level 1 Home. Duplicate this story to prototype. Change `activeTab` to swap the hint trail. For D-pad behavior copy Pages/Home. For Level 2 or 3 clone the matching template instead.",
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
type Story = StoryObj<typeof Starter>;

export const Default: Story = {};
