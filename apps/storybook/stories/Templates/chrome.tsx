import type { CSSProperties, ReactNode } from "react";
import type { OverlayVariant } from "@dtv/react";
import {
  ContentTrail,
  HomeLogo,
  Icon,
  MainButton,
  Menu,
  MenuItem,
} from "@dtv/react";
import globoBug from "../assets/menu/globo-bug.png";
import avatar from "../assets/menu/avatar.png";
import programLogo from "../assets/menu/program-logo-2.png";
import weather from "../assets/menu/weather.png";

export const activeTabs = [
  "profile",
  "epg",
  "discover",
  "live",
  "home",
] as const;

export type ActiveTab = (typeof activeTabs)[number];

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

export type ShelfCard = {
  title: string;
  subtitle?: string;
  overline?: string;
  live?: boolean;
  thumbnail?: ReactNode;
};

export const shelfCards: Record<Exclude<ActiveTab, "home">, ShelfCard[]> = {
  profile: [
    { title: "Configurações da conta" },
    { title: "Sair da conta" },
  ],
  epg: [
    {
      overline: "16:00 – 17:50",
      title: "Equador x Argentina",
      live: true,
    },
    { overline: "17:50 – 19:20", title: "Central da Copa" },
    { overline: "19:20 – 21:00", title: "Jornal Nacional" },
    { overline: "21:00 – 23:00", title: "Fantástico" },
  ],
  discover: [
    {
      title: "26°",
      subtitle: "São Paulo, SP",
      thumbnail: (
        <img src={weather} alt="" style={{ width: 40, height: 40 }} />
      ),
    },
    { title: "Vote no Craque do Jogo" },
    { title: "Prévia da Copa", subtitle: "Hoje à noite" },
  ],
  live: [
    { title: "Opções de áudio" },
    { title: "Lances da partida" },
    { title: "Vote no Craque do Jogo" },
    { title: "Estatísticas" },
  ],
};

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
  focusIndex,
}: {
  tab: ActiveTab;
  focusIndex?: number;
}) {
  if (tab === "home") return null;
  const cards = shelfCards[tab];
  return (
    <Trail side={shelfSide(tab)} label={`${tab} shelf`}>
      {cards.map((card, index) => (
        <MainButton
          key={`${tab}-${card.title}`}
          title={card.title}
          subtitle={card.subtitle}
          overline={card.overline}
          live={card.live}
          thumbnail={card.thumbnail}
          selected={focusIndex === index}
          tabIndex={focusIndex === index ? 0 : -1}
        />
      ))}
    </Trail>
  );
}

export function FocusedContentTrail({ side }: { side: "start" | "end" }) {
  const tab = side === "start" ? "profile" : "live";
  return <TopShelf tab={tab} focusIndex={0} />;
}

export function HomeMenu({ activeTab }: { activeTab: ActiveTab }) {
  return (
    <Menu
      aria-label="Main menu"
      start={
        <>
          <MenuItem
            data-tab="profile"
            icon={<img src={avatar} alt="" style={avatarStyle} />}
            aria-label="Profile"
            tabIndex={activeTab === "profile" ? 0 : -1}
          />
          <MenuItem
            data-tab="epg"
            icon={<Icon name="clock" size="lg" />}
            aria-label="EPG"
            tabIndex={activeTab === "epg" ? 0 : -1}
          />
          <MenuItem
            data-tab="discover"
            icon={<img src={weather} alt="" style={iconStyle} />}
            title="Discover"
            subtitle="Widgets"
            aria-label="Discover"
            tabIndex={activeTab === "discover" ? 0 : -1}
          />
        </>
      }
      end={
        <>
          <MenuItem
            data-tab="live"
            align="end"
            icon={<img src={programLogo} alt="" style={logoStyle} />}
            title="World Cup: Ecuador vs Argentina"
            subtitle="Up next Central da Copa"
            aria-label="Live"
            tabIndex={activeTab === "live" ? 0 : -1}
          />
          <HomeLogo
            data-tab="home"
            src={globoBug}
            aria-label="Home"
            tabIndex={activeTab === "home" ? 0 : -1}
          />
        </>
      }
    />
  );
}
