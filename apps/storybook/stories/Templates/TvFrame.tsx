import type { ReactNode } from "react";
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

export function TvFrame({ children }: { children: ReactNode }) {
  return (
    <div
      className={styles.frame}
      style={{ width: CANVAS.width, height: CANVAS.height }}
    >
      <div className={styles.video} aria-hidden>
        video
      </div>
      <div className={styles.overlay} aria-hidden>
        <span className={styles.overlayLabel}>overlay</span>
      </div>
      <div className={styles.stage}>{children}</div>
    </div>
  );
}
