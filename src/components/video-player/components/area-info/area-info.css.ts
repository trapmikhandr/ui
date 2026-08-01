import { style } from "@vanilla-extract/css";
import { colorContract, globalContract } from "@/themes";

// Fixed.
export const areaInfo = style({
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
  outline: "none",
  zIndex: globalContract.zIndex.modal,

  // Added focus state for accessibility.
  ":focus-visible": {
    outline: `2px solid ${colorContract.primary.base}`,
    outlineOffset: "2px",
  },
});

export const areaInfoWrapper = style({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "100%",
  height: "100%",
  padding: globalContract.spacing.sm,
});

export const infoContent = style({
  display: "flex",
  width: "100%",
  minHeight: "50px",
  alignItems: "center",
  gap: globalContract.spacing.md,
});
