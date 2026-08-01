import { style } from "@vanilla-extract/css";
import { colorContract, globalContract } from "@/themes";
import { CALENDAR } from "./calendar.constants";

export const gridContainer = style({
  position: "relative",
  display: "grid",
  borderTop: `${CALENDAR.gridLine} solid ${colorContract.outline.variant}`,
  // The body scrolls internally: the grid does not push out the modal and fills
  // the wrapper's available height (edge-to-edge, without a card frame).
  flex: "1",
  minHeight: "0",
  overflow: "auto",
  backgroundColor: colorContract.surface.default,

  "@media": {
    "screen and (max-width: 768px)": {
      height: "100%",
    },
  },

  // Thin token-based scrollbar (Firefox).
  scrollbarWidth: "thin",
  scrollbarColor: `${colorContract.outline.default} transparent`,

  // Thin token-based scrollbar (WebKit).
  "::-webkit-scrollbar": {
    width: CALENDAR.scrollbarSize,
    height: CALENDAR.scrollbarSize,
  },
  "::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
  "::-webkit-scrollbar-thumb": {
    backgroundColor: colorContract.outline.default,
    borderRadius: globalContract.shape.full,
    // A transparent border plus content-box creates space around the thumb.
    border: `${CALENDAR.scrollbarThumbInset} solid transparent`,
    backgroundClip: "content-box",
  },
  // Remove the corner square where the tracks intersect.
  "::-webkit-scrollbar-corner": {
    backgroundColor: "transparent",
  },
  // A pseudo-element plus :hover cannot be a top-level key; use selectors instead.
  selectors: {
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: colorContract.onSurface.muted,
    },
  },
});
