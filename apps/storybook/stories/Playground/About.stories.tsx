/**
 * Level 3 About full page, entered from the EPG Level 2 trail.
 * Playground only — card shells and hug InsertButtons stay local.
 */
import { useEffect, useRef, useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  ContentTrail,
  Icon,
  InsertButton,
  type InsertButtonProps,
  MainButton,
  RoundButton,
  Text,
} from "@dtv/react";
import {
  NAV_KEYS,
  TopShelf,
  overlayForLevel2,
} from "../Templates/chrome";
import { TvFrame, templateParameters } from "../Templates/TvFrame";
import copaDoMundo from "../assets/pages/copa-do-mundo.png";
import bell from "../assets/playground/bell.svg";
import film from "../assets/playground/film.svg";
import { homeContent } from "../Pages/home/mapHome";
import type { ShelfCard } from "../Pages/home/types";
import aboutJson from "./about.json";
import styles from "./About.module.css";

const TABS = [
  { id: "detalhes", label: "Detalhes" },
  { id: "elenco", label: "Elenco" },
  { id: "episodios", label: "Episódios recentes" },
] as const;

type AboutTab = (typeof TABS)[number]["id"];
type Band = "tabs" | "actions" | "episodes" | "back";
type StartAt = "schedule" | "about";

type AboutCredit = { label: string; value: string; more?: boolean };
type AboutEpisode = { overline: string; title: string };
type AboutProgram = {
  title: string;
  rating?: string;
  synopsis: string;
  meta: string[];
  credits: AboutCredit[];
  cast: string[];
  episodes: AboutEpisode[];
};

const aboutCatalog = aboutJson as Record<string, AboutProgram>;
const epgCards = homeContent.shelfCards.epg;
const etaIndex = Math.max(
  0,
  epgCards.findIndex((card) => card.id === "eta-mundo-melhor"),
);

function resolveAbout(card: ShelfCard): AboutProgram {
  if (card.id && aboutCatalog[card.id]) return aboutCatalog[card.id];
  return {
    title: card.title,
    synopsis: "Mais informações em breve.",
    meta: card.overline ? [card.overline] : [],
    credits: [],
    cast: [],
    episodes: [],
  };
}

function Glyph({ src }: { src: string }) {
  return <img src={src} alt="" className={styles.glyph} />;
}

function HugInsertButton({
  selected,
  className,
  ...props
}: InsertButtonProps & { selected?: boolean }) {
  return (
    <InsertButton
      {...props}
      className={[styles.hug, className].filter(Boolean).join(" ")}
      data-selected={selected ? "true" : undefined}
    />
  );
}

function DetailsBody({
  program,
  actionIndex,
  band,
  onAction,
}: {
  program: AboutProgram;
  actionIndex: number;
  band: Band;
  onAction: (index: number) => void;
}) {
  return (
    <div className={styles.row}>
      <section className={`${styles.card} ${styles.detail}`}>
        <div className={styles.info}>
          <div className={styles.header}>
            <Text variant="heading3" weight="semibold">
              {program.title}
            </Text>
            {program.rating ? (
              <span className={styles.rating}>{program.rating}</span>
            ) : null}
          </div>
          <Text variant="body-md" className={styles.synopsis}>
            {program.synopsis}
          </Text>
          {program.meta.length > 0 ? (
            <div className={styles.meta}>
              {program.meta.map((item, index) => (
                <span key={item} className={styles.metaItem}>
                  {index > 0 ? <span className={styles.dot} aria-hidden /> : null}
                  <Text variant="caption" color="secondary">
                    {item}
                  </Text>
                </span>
              ))}
            </div>
          ) : null}
        </div>
        <div className={styles.actions}>
          <HugInsertButton
            data-about-action=""
            leftIcon={<Glyph src={bell} />}
            tabIndex={band === "actions" && actionIndex === 0 ? 0 : -1}
            onClick={() => onAction(0)}
          >
            Avise-me
          </HugInsertButton>
          <HugInsertButton
            data-about-action=""
            leftIcon={<Glyph src={film} />}
            tabIndex={band === "actions" && actionIndex === 1 ? 0 : -1}
            onClick={() => onAction(1)}
          >
            Prévia do episódio
          </HugInsertButton>
        </div>
      </section>
      <section className={`${styles.card} ${styles.credits}`}>
        {program.credits.length > 0 ? (
          program.credits.map((credit) => (
            <p key={credit.label} className={styles.creditLine}>
              <Text as="span" variant="body-sm" weight="bold">
                {credit.label}{" "}
              </Text>
              <Text as="span" variant="body-sm">
                {credit.value}
              </Text>
              {credit.more ? (
                <Text as="span" variant="body-sm" weight="bold" className={styles.creditMore}>
                  {" "}
                  e mais
                </Text>
              ) : null}
            </p>
          ))
        ) : (
          <Text variant="body-sm" color="secondary">
            Ficha técnica indisponível.
          </Text>
        )}
      </section>
    </div>
  );
}

function CastBody({ cast }: { cast: string[] }) {
  return (
    <section className={`${styles.card} ${styles.wide}`}>
      {cast.length > 0 ? (
        <div className={styles.castList}>
          {cast.map((name) => (
            <span key={name} className={styles.castChip}>
              <Text variant="body-sm" weight="medium">
                {name}
              </Text>
            </span>
          ))}
        </div>
      ) : (
        <Text variant="body-sm" color="secondary">
          Elenco indisponível.
        </Text>
      )}
    </section>
  );
}

function EpisodesBody({
  episodes,
  episodeIndex,
  band,
  onSelect,
}: {
  episodes: AboutEpisode[];
  episodeIndex: number;
  band: Band;
  onSelect: (index: number) => void;
}) {
  if (episodes.length === 0) {
    return (
      <section className={`${styles.card} ${styles.wide}`}>
        <Text variant="body-sm" color="secondary">
          Episódios indisponíveis.
        </Text>
      </section>
    );
  }

  return (
    <ContentTrail side="start" aria-label="Episódios recentes">
      {episodes.map((episode, index) => (
        <MainButton
          key={episode.title}
          data-about-episode=""
          overline={episode.overline}
          title={episode.title}
          selected={band === "episodes" && episodeIndex === index}
          tabIndex={band === "episodes" && episodeIndex === index ? 0 : -1}
          onClick={() => onSelect(index)}
        />
      ))}
    </ContentTrail>
  );
}

function AboutPlayground({ startAt = "schedule" }: { startAt?: StartAt }) {
  const [level, setLevel] = useState<2 | 3>(startAt === "about" ? 3 : 2);
  const [trailIndex, setTrailIndex] = useState(etaIndex);
  const [tabIndex, setTabIndex] = useState(0);
  const [band, setBand] = useState<Band>("tabs");
  const [actionIndex, setActionIndex] = useState(0);
  const [episodeIndex, setEpisodeIndex] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);

  const card = epgCards[trailIndex] ?? epgCards[0];
  const program = resolveAbout(card);
  const tab: AboutTab = TABS[tabIndex].id;

  useEffect(() => {
    setLevel(startAt === "about" ? 3 : 2);
    setTrailIndex(etaIndex);
    setTabIndex(0);
    setBand("tabs");
    setActionIndex(0);
    setEpisodeIndex(0);
  }, [startAt]);

  function openAbout(index: number) {
    setTrailIndex(index);
    setTabIndex(0);
    setBand("tabs");
    setActionIndex(0);
    setEpisodeIndex(0);
    setLevel(3);
  }

  function closeAbout() {
    if (startAt === "about") {
      setBand("tabs");
      setTabIndex(0);
      return;
    }
    setLevel(2);
    setBand("tabs");
  }

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (level === 2) {
      stage.querySelectorAll<HTMLElement>('[role="group"] button')[trailIndex]?.focus();
      return;
    }
    if (band === "back") {
      stage.querySelector<HTMLElement>('[aria-label="Voltar"]')?.focus();
      return;
    }
    if (band === "tabs") {
      stage.querySelectorAll<HTMLElement>("[data-about-tab]")[tabIndex]?.focus();
      return;
    }
    if (band === "actions") {
      stage.querySelectorAll<HTMLElement>("[data-about-action]")[actionIndex]?.focus();
      return;
    }
    stage.querySelectorAll<HTMLElement>("[data-about-episode]")[episodeIndex]?.focus();
  }, [level, band, tabIndex, actionIndex, episodeIndex, trailIndex]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (!NAV_KEYS.has(event.key)) return;
      event.preventDefault();

      if (level === 2) {
        if (event.key === "ArrowLeft") {
          setTrailIndex((index) => Math.max(0, index - 1));
        }
        if (event.key === "ArrowRight") {
          setTrailIndex((index) => Math.min(epgCards.length - 1, index + 1));
        }
        if (event.key === "Enter") {
          openAbout(trailIndex);
        }
        return;
      }

      if (event.key === "Backspace" || event.key === "Escape") {
        closeAbout();
        return;
      }

      if (band === "back") {
        if (event.key === "Enter") closeAbout();
        if (event.key === "ArrowUp") {
          if (tab === "detalhes") setBand("actions");
          else if (tab === "episodios" && program.episodes.length > 0) {
            setBand("episodes");
          } else {
            setBand("tabs");
          }
        }
        return;
      }

      if (band === "tabs") {
        if (event.key === "ArrowLeft") {
          setTabIndex((index) => Math.max(0, index - 1));
        }
        if (event.key === "ArrowRight") {
          setTabIndex((index) => Math.min(TABS.length - 1, index + 1));
        }
        if (event.key === "ArrowDown") {
          const next = TABS[tabIndex].id;
          if (next === "detalhes") setBand("actions");
          else if (next === "episodios" && program.episodes.length > 0) {
            setBand("episodes");
          } else {
            setBand("back");
          }
        }
        return;
      }

      if (band === "actions") {
        if (event.key === "ArrowLeft") {
          setActionIndex((index) => Math.max(0, index - 1));
        }
        if (event.key === "ArrowRight") {
          setActionIndex((index) => Math.min(1, index + 1));
        }
        if (event.key === "ArrowDown") setBand("back");
        if (event.key === "ArrowUp") setBand("tabs");
        return;
      }

      if (event.key === "ArrowLeft") {
        setEpisodeIndex((index) => Math.max(0, index - 1));
      }
      if (event.key === "ArrowRight") {
        setEpisodeIndex((index) =>
          Math.min(Math.max(program.episodes.length - 1, 0), index + 1),
        );
      }
      if (event.key === "ArrowDown") setBand("back");
      if (event.key === "ArrowUp") setBand("tabs");
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [level, band, tab, tabIndex, trailIndex, program.episodes.length, startAt]);

  const overlay = level === 3 ? "home" : overlayForLevel2.epg;

  return (
    <TvFrame overlay={overlay} video={copaDoMundo}>
      <div ref={stageRef} className={styles.page}>
        {level === 3 ? (
          <>
            <div className={styles.body}>
              <div className={styles.tabs} role="tablist" aria-label="Sobre o programa">
                {TABS.map((item, index) => (
                  <HugInsertButton
                    key={item.id}
                    data-about-tab=""
                    role="tab"
                    aria-selected={tabIndex === index}
                    selected={tabIndex === index}
                    tabIndex={band === "tabs" && tabIndex === index ? 0 : -1}
                    onClick={() => {
                      setTabIndex(index);
                      setBand("tabs");
                    }}
                  >
                    {item.label}
                  </HugInsertButton>
                ))}
              </div>
              {tab === "detalhes" ? (
                <DetailsBody
                  program={program}
                  actionIndex={actionIndex}
                  band={band}
                  onAction={(index) => {
                    setActionIndex(index);
                    setBand("actions");
                  }}
                />
              ) : null}
              {tab === "elenco" ? <CastBody cast={program.cast} /> : null}
              {tab === "episodios" ? (
                <EpisodesBody
                  episodes={program.episodes}
                  episodeIndex={episodeIndex}
                  band={band}
                  onSelect={(index) => {
                    setEpisodeIndex(index);
                    setBand("episodes");
                  }}
                />
              ) : null}
            </div>
            <div className={styles.back}>
              <RoundButton
                icon={<Icon name="arrow-left" size="lg" />}
                aria-label="Voltar"
                tabIndex={band === "back" ? 0 : -1}
                onClick={closeAbout}
              />
            </div>
          </>
        ) : (
          <div className={styles.trail}>
            <TopShelf
              tab="epg"
              cards={epgCards}
              focusIndex={trailIndex}
              onActivate={openAbout}
            />
          </div>
        )}
      </div>
    </TvFrame>
  );
}

const meta: Meta<typeof AboutPlayground> = {
  title: "Playground/About",
  component: AboutPlayground,
  parameters: {
    ...templateParameters,
    docs: {
      description: {
        component:
          "Level 3 About full page from the EPG trail. Menu off. Overlay `home`. Enter on a Level 2 program opens About; Back returns to the trail. Click the canvas, then use the arrows.",
      },
    },
  },
  args: {
    startAt: "schedule",
  },
};

export default meta;
type Story = StoryObj<typeof AboutPlayground>;

export const FromSchedule: Story = {
  args: { startAt: "schedule" },
};

export const Detalhes: Story = {
  args: { startAt: "about" },
};
