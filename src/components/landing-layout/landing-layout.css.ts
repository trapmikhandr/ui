import { style } from "@vanilla-extract/css";
import { colorContract, globalContract } from "@/themes";

const MOBILE_BREAKPOINT = "768px";
const TABLET_BREAKPOINT = "1024px";

// --- Layout ---
export const layout = style({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  backgroundColor: colorContract.surface.default,
  color: colorContract.onSurface.default,
});

// --- Header ---
export const header = style({
  position: "sticky",
  top: 0,
  zIndex: 100,
  backgroundColor: colorContract.surface.default,
  borderBottom: `1px solid ${colorContract.outline.variant}`,
  padding: `${globalContract.spacing.md} ${globalContract.spacing.lg}`,

  "@media": {
    [`screen and (max-width: ${MOBILE_BREAKPOINT})`]: {
      padding: `${globalContract.spacing.sm} ${globalContract.spacing.md}`,
    },
  },
});

// --- Section ---
export const section = style({
  width: "100%",
  padding: `${globalContract.spacing.xl} ${globalContract.spacing.lg}`,

  selectors: {
    '&[data-variant="accent"]': {
      backgroundColor: colorContract.surface.containerLow,
    },
  },

  "@media": {
    [`screen and (max-width: ${MOBILE_BREAKPOINT})`]: {
      padding: `${globalContract.spacing.lg} ${globalContract.spacing.md}`,
    },
  },
});

// --- Container (content max-width) ---
export const container = style({
  maxWidth: "1200px",
  margin: "0 auto",
  width: "100%",

  "@media": {
    [`screen and (max-width: ${TABLET_BREAKPOINT})`]: {
      maxWidth: "100%",
    },
  },
});

// --- Footer ---
export const footer = style({
  marginTop: "auto",
  backgroundColor: colorContract.surface.containerHigh,
  borderTop: `1px solid ${colorContract.outline.variant}`,
  padding: `${globalContract.spacing.lg}`,

  "@media": {
    [`screen and (max-width: ${MOBILE_BREAKPOINT})`]: {
      padding: `${globalContract.spacing.md}`,
    },
  },
});
