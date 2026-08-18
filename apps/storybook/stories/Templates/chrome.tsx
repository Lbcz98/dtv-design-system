import type { CSSProperties, ReactNode } from "react";
import type { OverlayVariant } from "@dtv/react";
import {
  ContentTrail,
  HomeLogo,
  Icon,
  MainButton,
  Menu,
  MenuItem,
  RoundButton,
} from "@dtv/react";
import globoBug from "../assets/menu/globo-bug.png";
import avatar from "../assets/menu/avatar.png";
import { homeContent } from "../Pages/home/mapHome";
import type { HomeNowPlaying, HomeWeather, ShelfCard } from "../Pages/home/types";
import { Placeholder } from "./Placeholder";
import { CANVAS, CLOSE } from "./TvFrame";

export type { HomeNowPlaying, HomeWeather, ShelfCard } from "../Pages/home/types";

export const activeTabs = [
  "profile",
  "epg",
  "discover",
  "live",
  "home",
] as const;

export type ActiveTab = (typeof activeTabs)[number];

export const NAV_KEYS = new Set([
  "ArrowLeft",
  "ArrowRight",
  "ArrowUp",
  "ArrowDown",
  "Enter",
  "Backspace",
  "Escape",
]);

export const dockOrder: ActiveTab[] = [
  "profile",
  "epg",
  "discover",
  "live",
  "home",
];

export const overlayForTab: Record<ActiveTab, OverlayVariant> = {
  profile: "homeButtonsStart",
  epg: "homeButtonsStart",
  discover: "homeButtonsStart",
  live: "homeButtonsEnd",
  home: "home",
};

export const overlayForLevel2: Record<Exclude<ActiveTab, "home">, OverlayVariant> =
  {
    profile: "interactivityCardsStart",
    epg: "interactivityCardsStart",
    discover: "interactivityCardsStart",
    live: "interactivityCardsEnd",
  };

const avatarStyle: CSSProperties = {
  width: 40,
  height: 40,
  objectFit: "cover",
  borderRadius: "50%",
  display: "block",
};

const iconStyle: CSSProperties = {
  width: 40,
  height: 40,
  objectFit: "contain",
  display: "block",
};

const logoStyle: CSSProperties = {
  width: 48,
  height: 48,
  objectFit: "contain",
  display: "block",
  mixBlendMode: "screen",
};

export const shelfCards: Record<Exclude<ActiveTab, "home">, ShelfCard[]> =
  homeContent.shelfCards;

function Trail({
  side,
  label,
  children,
}: {
  side: "start" | "end";
  label: string;
  children: ReactNode;
}) {
  return (
    <ContentTrail side={side} aria-label={`${label} trail`}>
      {children}
    </ContentTrail>
  );
}

function shelfSide(tab: Exclude<ActiveTab, "home">): "start" | "end" {
  return tab === "live" ? "end" : "start";
}

export function TopShelf({
  tab,
  cards,
  focusIndex,
  onActivate,
}: {
  tab: ActiveTab;
  cards?: ShelfCard[];
  focusIndex?: number;
  onActivate?: (index: number) => void;
}) {
  if (tab === "home") return null;
  const trail = cards ?? shelfCards[tab];
  return (
    <Trail side={shelfSide(tab)} label={`${tab} shelf`}>
      {trail.map((card, index) => (
        <MainButton
          key={card.id ?? `${tab}-${card.title}`}
          title={card.title}
          subtitle={card.subtitle}
          overline={card.overline}
          live={card.live}
          thumbnail={card.thumbnail}
          selected={focusIndex === index}
          tabIndex={focusIndex === index ? 0 : -1}
          onClick={
            onActivate && focusIndex !== undefined
              ? () => onActivate(index)
              : undefined
          }
        />
      ))}
    </Trail>
  );
}

export function HomeMenu({
  activeTab,
  weather = homeContent.weather,
  nowPlaying = homeContent.nowPlaying,
}: {
  activeTab: ActiveTab;
  weather?: HomeWeather;
  nowPlaying?: HomeNowPlaying;
}) {
  return (
    <Menu
      aria-label="Menu principal"
      start={
        <>
          <MenuItem
            data-tab="profile"
            icon={<img src={avatar} alt="" style={avatarStyle} />}
            aria-label="Perfil"
            tabIndex={activeTab === "profile" ? 0 : -1}
          />
          <MenuItem
            data-tab="epg"
            icon={<Icon name="clock" size="lg" />}
            aria-label="Programação"
            tabIndex={activeTab === "epg" ? 0 : -1}
          />
          <MenuItem
            data-tab="discover"
            icon={<img src={weather.iconSrc} alt="" style={iconStyle} />}
            title={weather.title}
            subtitle={weather.subtitle}
            aria-label={weather.title}
            tabIndex={activeTab === "discover" ? 0 : -1}
          />
        </>
      }
      end={
        <>
          <MenuItem
            data-tab="live"
            align="end"
            icon={<img src={nowPlaying.logoSrc} alt="" style={logoStyle} />}
            title={nowPlaying.title}
            subtitle={nowPlaying.subtitle}
            aria-label={nowPlaying.title}
            tabIndex={activeTab === "live" ? 0 : -1}
          />
          <HomeLogo
            data-tab="home"
            src={globoBug}
            aria-label="Início"
            tabIndex={activeTab === "home" ? 0 : -1}
          />
        </>
      }
    />
  );
}

export function CloseControl({
  autoFocus,
  onClose,
}: {
  autoFocus?: boolean;
  onClose?: () => void;
}) {
  return (
    <div
      style={{
        position: "absolute",
        right: CLOSE.right,
        bottom: CLOSE.bottom,
      }}
    >
      <RoundButton
        icon={<Icon name="x" size="lg" />}
        aria-label="Close"
        autoFocus={autoFocus}
        onClick={onClose}
      />
    </div>
  );
}

export function Level3Surface({
  tab,
  card,
  onClose,
}: {
  tab: Exclude<ActiveTab, "home">;
  card: ShelfCard;
  onClose: () => void;
}) {
  const page = card.surface === "page";
  const start = shelfSide(tab) === "start";
  return (
    <>
      <Placeholder
        label={`Level 3 — ${page ? "full page" : "tall card"}: ${card.title}`}
        focused
        width={page ? CANVAS.width - CANVAS.inset * 2 : 288}
        height={page ? CANVAS.height - CANVAS.inset * 2 : 440}
        style={{
          position: "absolute",
          ...(page
            ? { top: CANVAS.inset, left: CANVAS.inset }
            : {
                top: 160,
                ...(start ? { left: CANVAS.inset } : { right: CANVAS.inset }),
              }),
        }}
      />
      <CloseControl autoFocus onClose={onClose} />
    </>
  );
}
