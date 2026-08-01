import { createVar, globalStyle, style } from "@vanilla-extract/css";
import { colorContract, globalContract } from "@/themes";

const MOBILE_BREAKPOINT = "768px";

export const sidebarWidth = createVar();

export const layout = style({
  vars: {
    [sidebarWidth]: "250px",
  },

  display: "grid",
  gridTemplateColumns: `${sidebarWidth} 1fr`,
  gridTemplateRows: "1fr",
  gridTemplateAreas: `"sidebar main"`,
  height: "100vh",
  backgroundColor: colorContract.surface.default,
  color: colorContract.onSurface.default,
  overflow: "hidden",
  transition: "grid-template-columns 0.3s cubic-bezier(0.2, 0, 0, 1)",

  selectors: {
    '&[data-collapsed="true"]': {
      vars: {
        [sidebarWidth]: "96px",
      },
    },
  },

  "@media": {
    [`screen and (max-width: ${MOBILE_BREAKPOINT})`]: {
      gridTemplateColumns: "1fr",
      gridTemplateRows: "1fr auto",
      gridTemplateAreas: `"main" "mobileBar"`,
    },
  },
});

export const sidebar = style({
  gridArea: "sidebar",
  position: "relative",
  overflow: "visible",
  height: "100%",

  "@media": {
    [`screen and (max-width: ${MOBILE_BREAKPOINT})`]: {
      position: "fixed",
      top: 0,
      left: 0,
      bottom: 0,
      width: "280px",
      zIndex: 50,
      transform: "translateX(-100%)",
      transition: "transform 0.3s cubic-bezier(0.2, 0, 0, 1)",
      overflow: "hidden",
    },
  },
});

globalStyle(`${layout}[data-mobile-open="true"] ${sidebar}`, {
  "@media": {
    [`screen and (max-width: ${MOBILE_BREAKPOINT})`]: {
      transform: "translateX(0)",
    },
  },
});

export const backdrop = style({
  display: "none",

  "@media": {
    [`screen and (max-width: ${MOBILE_BREAKPOINT})`]: {
      display: "block",
      position: "fixed",
      inset: 0,
      backgroundColor: colorContract.scrim,
      zIndex: 40,
      opacity: 0,
      pointerEvents: "none",
      transition: "opacity 0.3s ease",
      border: "none",
      padding: 0,
      font: "inherit",
      cursor: "pointer",
      appearance: "none",
    },
  },
});

globalStyle(`${layout}[data-mobile-open="true"] ${backdrop}`, {
  "@media": {
    [`screen and (max-width: ${MOBILE_BREAKPOINT})`]: {
      opacity: 0.4,
      pointerEvents: "auto",
    },
  },
});

export const main = style({
  gridArea: "main",
  padding: globalContract.spacing.lg,
  overflowY: "auto",
  backgroundColor: colorContract.surface.default,
  position: "relative",
});

export const mobileBar = style({
  display: "none",
  gridArea: "mobileBar",

  "@media": {
    [`screen and (max-width: ${MOBILE_BREAKPOINT})`]: {
      display: "block",
    },
  },
});

export const sidebarHeaderInner = style({
  display: "flex",
  alignItems: "center",
  gap: globalContract.spacing.sm,
  flex: 1,
  minWidth: 0,
});

export const sidebarHeaderContent = style({
  display: "flex",
  flexDirection: "column",
  minWidth: 0,
  flex: 1,
  overflow: "hidden",
});

export const desktopOnly = style({
  display: "none",

  "@media": {
    [`screen and (min-width: ${MOBILE_BREAKPOINT})`]: {
      display: "flex",
    },
  },
});

export const mobileOnly = style({
  display: "flex",

  "@media": {
    [`screen and (min-width: ${MOBILE_BREAKPOINT})`]: {
      display: "none",
    },
  },
});
