import programLogo from "../../assets/menu/program-logo-2.png";
import weatherIcon from "../../assets/menu/weather.png";
import discoverJson from "./fixtures/discover.json";
import epgJson from "./fixtures/epg.json";
import liveJson from "./fixtures/live.json";
import profileJson from "./fixtures/profile.json";
import weatherJson from "./fixtures/weather.json";
import { mapEpg, mapNowPlaying } from "./mapEpg";
import { mapWeatherCard, mapWeatherSlot } from "./mapWeather";
import type {
  DiscoverPayload,
  EpgPayload,
  HomeNowPlaying,
  HomeWeather,
  LivePayload,
  ProfilePayload,
  ShelfCard,
  ShelfCardsByRail,
  WeatherPayload,
  WidgetItem,
} from "./types";

const epg = epgJson as EpgPayload;
const weather = weatherJson as WeatherPayload;
const discover = discoverJson as DiscoverPayload;
const live = liveJson as LivePayload;
const profile = profileJson as ProfilePayload;

function mapItems(items: WidgetItem[]): ShelfCard[] {
  return items.map((item) => ({
    id: item.id,
    title: item.title,
    subtitle: item.subtitle,
  }));
}

function mapProfile(payload: ProfilePayload): ShelfCard[] {
  return payload.items.map((item) => ({
    id: item.id,
    title: item.title,
    subtitle: item.subtitle,
    surface: item.surface,
  }));
}

export type HomeContent = {
  shelfCards: ShelfCardsByRail;
  weather: HomeWeather;
  nowPlaying: HomeNowPlaying;
};

export function mapHomeContent(
  payload: {
    epg: EpgPayload;
    weather: WeatherPayload;
    discover: DiscoverPayload;
    live: LivePayload;
    profile: ProfilePayload;
  } = { epg, weather, discover, live, profile },
  assets: { weatherIcon: string; programLogo: string } = {
    weatherIcon,
    programLogo,
  },
): HomeContent {
  const nowPlaying = mapNowPlaying(payload.epg, assets.programLogo);
  if (!nowPlaying) {
    throw new Error("EPG fixture has no current or upcoming program");
  }

  return {
    weather: mapWeatherSlot(payload.weather, assets.weatherIcon),
    nowPlaying,
    shelfCards: {
      profile: mapProfile(payload.profile),
      epg: mapEpg(payload.epg),
      discover: [
        mapWeatherCard(payload.weather, assets.weatherIcon),
        ...mapItems(payload.discover.widgets),
      ],
      live: mapItems(payload.live.items),
    },
  };
}

/** Recorded Globo afternoon — swap this for a live fetch later. */
export const homeContent = mapHomeContent();
