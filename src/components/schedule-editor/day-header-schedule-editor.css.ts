import { style } from "@vanilla-extract/css";
import { colorContract, globalContract } from "@/themes";

export const dayHeader = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: globalContract.spacing.xs,
  padding: globalContract.spacing.sm,
  borderBottom: `1px solid ${colorContract.outline.variant}`,
  borderRight: `1px solid ${colorContract.outline.variant}`,
  backgroundColor: colorContract.surface.containerLow,
  selectors: {
    "&[data-last='true']": {
      borderRight: "none",
    },
  },
});

export const dayName = style({
  fontSize: globalContract.typography.title.small.fontSize,
  fontWeight: globalContract.typography.title.small.fontWeight,
  lineHeight: globalContract.typography.title.small.lineHeight,
  color: colorContract.onSurface.default,
});

export const constraintHint = style({
  fontSize: globalContract.typography.label.small.fontSize,
  color: colorContract.onSurface.muted,
  textAlign: "center",
});
