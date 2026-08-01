import { style } from "@vanilla-extract/css";
import { colorContract, globalContract } from "@/themes";

export const block = style({
  appearance: "none",
  position: "absolute",
  left: "2px",
  right: "2px",
  backgroundColor: colorContract.primary.container,
  border: `2px solid ${colorContract.primary.base}`,
  borderRadius: globalContract.shape.xs,
  cursor: "pointer",
  overflow: "hidden",
  zIndex: 1,
  transition: "box-shadow 0.15s ease, background-color 0.15s ease",
  selectors: {
    "&:hover": {
      boxShadow: globalContract.elevation.level2,
    },
  },
});

export const blockContent = style({
  padding: `${globalContract.spacing.xs} ${globalContract.spacing.sm}`,
  fontSize: globalContract.typography.label.small.fontSize,
  fontWeight: globalContract.typography.label.medium.fontWeight,
  lineHeight: globalContract.typography.label.small.lineHeight,
  color: colorContract.primary.onContainer,
  textAlign: "center",
  pointerEvents: "none",
});

const resizeHandleBase = style({
  position: "absolute",
  left: 0,
  right: 0,
  height: "20px",
  cursor: "row-resize",
  zIndex: 2,
  opacity: 0,
  transition: "opacity 0.15s ease",
  selectors: {
    [`${block}:hover &`]: {
      opacity: 1,
    },
  },
  "@media": {
    "(hover: none)": {
      opacity: 1,
      height: "16px",
    },
    "(pointer: coarse)": {
      height: "16px",
    },
  },
});

export const resizeHandleTop = style([
  resizeHandleBase,
  {
    top: "-3px",
    backgroundColor: colorContract.primary.base,
    borderRadius: `${globalContract.shape.xs} ${globalContract.shape.xs} 0 0`,
    "@media": {
      "(hover: none)": {
        top: "-8px",
      },
      "(pointer: coarse)": {
        top: "-8px",
      },
    },
  },
]);

export const resizeHandleBottom = style([
  resizeHandleBase,
  {
    bottom: "-3px",
    backgroundColor: colorContract.primary.base,
    borderRadius: `0 0 ${globalContract.shape.xs} ${globalContract.shape.xs}`,
    "@media": {
      "(hover: none)": {
        bottom: "-8px",
      },
      "(pointer: coarse)": {
        bottom: "-8px",
      },
    },
  },
]);
