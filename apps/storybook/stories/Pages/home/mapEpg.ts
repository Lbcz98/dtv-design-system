import type { EpgPayload, EpgProgram, HomeNowPlaying, ShelfCard } from "./types";

export const HINT_TRAIL_LIMIT = 4;

const timeFormat = new Intl.DateTimeFormat("pt-BR", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "America/Sao_Paulo",
});

function clock(iso: string): string {
  return timeFormat.format(new Date(iso));
}

export function formatRange(start: string, end: string): string {
  return `${clock(start)} – ${clock(end)}`;
}

export function isLiveAt(program: EpgProgram, now: Date): boolean {
  const start = new Date(program.start);
  const end = new Date(program.end);
  return now >= start && now < end;
}

function upcoming(programs: EpgProgram[], now: Date): EpgProgram[] {
  return [...programs]
    .filter((program) => new Date(program.end) > now)
    .sort((a, b) => +new Date(a.start) - +new Date(b.start));
}

export function mapEpgCard(program: EpgProgram, now: Date): ShelfCard {
  return {
    id: program.id,
    overline: formatRange(program.start, program.end),
    title: program.title,
    live: isLiveAt(program, now),
  };
}

/** Hint trail: live + next programs, capped so Home stays a preview. */
export function mapEpg(
  payload: EpgPayload,
  now = new Date(payload.now),
  limit = HINT_TRAIL_LIMIT,
): ShelfCard[] {
  return upcoming(payload.programs, now).slice(0, limit).map((program) =>
    mapEpgCard(program, now),
  );
}

export function currentProgram(
  payload: EpgPayload,
  now = new Date(payload.now),
): EpgProgram | undefined {
  return (
    payload.programs.find((program) => isLiveAt(program, now)) ??
    upcoming(payload.programs, now)[0]
  );
}

export function nextProgram(
  payload: EpgPayload,
  now = new Date(payload.now),
): EpgProgram | undefined {
  const current = currentProgram(payload, now);
  if (!current) return undefined;
  const currentEnd = new Date(current.end);
  return upcoming(payload.programs, now).find(
    (program) => new Date(program.start) >= currentEnd,
  );
}

export function menuTitle(program: EpgProgram): string {
  return program.seriesTitle
    ? `${program.seriesTitle}: ${program.title}`
    : program.title;
}

export function mapNowPlaying(
  payload: EpgPayload,
  logoSrc: string,
  now = new Date(payload.now),
): HomeNowPlaying | undefined {
  const current = currentProgram(payload, now);
  if (!current) return undefined;
  const next = nextProgram(payload, now);
  return {
    title: menuTitle(current),
    subtitle: next ? `A seguir ${next.title}` : undefined,
    logoSrc,
  };
}
