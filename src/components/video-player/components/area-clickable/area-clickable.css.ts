import { style } from "@vanilla-extract/css";
import { colorContract, globalContract } from "@/themes";

export const areaClickable = style({
  width: "100%",
  height: "100%",
  backgroundColor: "transparent",
  border: "none",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
  cursor: "pointer",
  outline: "none", // ← Remove the default outline.
  zIndex: globalContract.zIndex.popover,

  // Critical for keyboard navigation and screen readers.
  ":focus-visible": {
    outline: `2px solid ${colorContract.primary.base}`,
    outlineOffset: "2px",
  },
});
