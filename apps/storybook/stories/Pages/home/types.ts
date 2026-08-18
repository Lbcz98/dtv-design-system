import type { ReactNode } from "react";

export type ShelfCard = {
  id?: string;
  title: string;
  subtitle?: string;
  overline?: string;
  live?: boolean;
  thumbnail?: ReactNode;
  surface?: "tall" | "page";
};

export type HomeWeather = {
  title: string;
  subtitle: string;
  iconSrc: string;
};

export type HomeNowPlaying = {
  title: string;
  subtitle?: string;
  logoSrc: string;
};

export type EpgProgram = {
  id: string;
  title: string;
  seriesTitle?: string;
  start: string;
  end: string;
};

export type EpgPayload = {
  channel: string;
  now: string;
  programs: EpgProgram[];
};

export type WeatherPayload = {
  city: string;
  region: string;
  tempC: number;
  condition: string;
  icon: string;
};

export type WidgetItem = {
  id: string;
  title: string;
  subtitle?: string;
};

export type DiscoverPayload = {
  widgets: WidgetItem[];
};

export type LivePayload = {
  items: WidgetItem[];
};

export type ProfileItem = WidgetItem & {
  surface?: "tall" | "page";
};

export type ProfilePayload = {
  items: ProfileItem[];
};

export const homeRails = ["profile", "epg", "discover", "live"] as const;
export type HomeRail = (typeof homeRails)[number];
export type ShelfCardsByRail = Record<HomeRail, ShelfCard[]>;
