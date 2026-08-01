import { style } from "@vanilla-extract/css";
import { colorContract, globalContract } from "@/themes";

export const timeCell = style({
  position: "relative",
  padding: globalContract.spacing.sm,
  fontSize: globalContract.typography.label.small.fontSize,
  fontWeight: globalContract.typography.label.small.fontWeight,
  color: colorContract.onSurface.variant,
  textAlign: "right",
  borderBottom: `1px solid ${colorContract.outline.variant}`,
  borderRight: `1px solid ${colorContract.outline.variant}`,
  backgroundColor: colorContract.surface.containerLow,
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  selectors: {
    "&[data-last='true']": {
      borderBottom: "none",
    },
  },
});

export const timeInfo = style({
  position: "absolute",
  top: "-8px",
  left: "-20px",
  height: "20px",
  width: "100%",
  background: colorContract.surface.containerLow,
});
