import { createElement } from "react";
import type { HomeWeather, ShelfCard, WeatherPayload } from "./types";

function place(payload: WeatherPayload): string {
  return `${payload.city}, ${payload.region}`;
}

export function mapWeatherCard(
  payload: WeatherPayload,
  iconSrc: string,
): ShelfCard {
  return {
    id: "weather",
    title: `${Math.round(payload.tempC)}°`,
    subtitle: place(payload),
    thumbnail: createElement("img", {
      src: iconSrc,
      alt: "",
      style: { width: 40, height: 40 },
    }),
  };
}

export function mapWeatherSlot(
  payload: WeatherPayload,
  iconSrc: string,
): HomeWeather {
  return {
    title: "Previsão do tempo",
    subtitle: place(payload),
    iconSrc,
  };
}
