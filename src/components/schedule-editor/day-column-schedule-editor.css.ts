import { style } from "@vanilla-extract/css";
import { colorContract } from "@/themes";

export const dayColumn = style({
  display: "contents",
});

export const slotsContainer = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  borderRight: `1px solid ${colorContract.outline.variant}`,
  selectors: {
    "&[data-last='true']": {
      borderRight: "none",
    },
  },
});
