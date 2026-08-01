import { style } from "@vanilla-extract/css";
import { colorContract, globalContract } from "@/themes";

// ============================================================================
// Main time container (currentTime / duration).
// ============================================================================
export const timeDisplay = style({
  display: "flex",
  alignItems: "center",
  gap: globalContract.spacing.xs,
  fontSize: globalContract.typography.body.medium.fontSize,
  fontFamily: "monospace",
  color: colorContract.inverse.onSurface,
  whiteSpace: "nowrap",
  userSelect: "none",
  fontVariantNumeric: "tabular-nums",
});

// ============================================================================
// Current time (emphasized style).
// ============================================================================
export const currentTime = style({
  fontWeight: globalContract.typography.label.medium.fontWeight,
});

// ============================================================================
// Separator between current time and duration.
// ============================================================================
export const separator = style({
  opacity: 0.7,
});

// ============================================================================
// Video duration.
// ============================================================================
export const duration = style({
  opacity: 0.8,
});
