import { style } from "@vanilla-extract/css";
import { colorContract, globalContract } from "@/themes";

export const comboboxContainer = style({
  display: "flex",
  flexDirection: "column",
  gap: globalContract.spacing.xs,
  width: "100%",
  position: "relative",
});

export const comboboxError = style({
  paddingBottom: globalContract.spacing.md,
});

export const labelStyle = style({
  color: colorContract.onSurface.variant,
  fontSize: globalContract.typography.label.large.fontSize,
  lineHeight: globalContract.typography.label.large.lineHeight,
  letterSpacing: globalContract.typography.label.large.letterSpacing,
  fontWeight: globalContract.typography.label.large.fontWeight,
});

// Helper text and error message styles.
export const supportTextStyle = style({
  position: "absolute",
  bottom: "0",
  left: "0",
  fontSize: globalContract.typography.body.small.fontSize,
  lineHeight: globalContract.typography.body.small.lineHeight,
  color: colorContract.onSurface.variant,
});
