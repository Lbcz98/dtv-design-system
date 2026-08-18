import type { ReactNode } from "react";
import { Overlay, type OverlayVariant } from "@dtv/react";
import styles from "./TvFrame.module.css";

export const CANVAS = { width: 1280, height: 720, inset: 40 } as const;
export const MENU = { width: 1200, height: 88 } as const;
export const SLOT = { size: 88 } as const;
export const CLOSE = { size: 88, right: 40, bottom: 36 } as const;

export const templateParameters = {
  layout: "fullscreen" as const,
  viewport: {
    defaultViewport: "dtvHd",
    viewports: {
      dtvHd: {
        name: "DTV HD",
        styles: { width: "1280px", height: "720px" },
        type: "desktop" as const,
      },
    },
  },
};

export function TvFrame({
  children,
  overlay = "home",
  video,
}: {
  children: ReactNode;
  overlay?: OverlayVariant;
  /** Optional 1280×720 still for the video layer. Templates omit this. */
  video?: string;
}) {
  return (
    <div
      className={styles.frame}
      data-theme="dark"
      style={{ width: CANVAS.width, height: CANVAS.height }}
    >
      <div
        className={styles.video}
        aria-hidden
        style={video ? { backgroundImage: `url(${video})` } : undefined}
      />
      <Overlay variant={overlay} />
      <div className={styles.stage}>{children}</div>
    </div>
  );
}
