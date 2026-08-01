import { style } from "@vanilla-extract/css";
import { colorContract, globalContract } from "@/themes";

/**
 * UNDERLAY
 * Invisible layer that captures clicks outside the popover.
 * Does not dim the background, unlike Modal.
 */
export const underlay = style({
  position: "fixed",
  inset: 0,
  // Transparent: only captures outside clicks without dimming.
});

/**
 * POPOVER CONTENT
 * Popover on the highest surface layer.
 * Uses elevation (shadow) to visually lift it above the content.
 */
export const popover = style({
  backgroundColor: colorContract.surface.containerHighest,
  borderRadius: globalContract.shape.md,
  padding: globalContract.spacing.sm,
  border: `1px solid ${colorContract.outline.variant}`,
  color: colorContract.onSurface.default,
  boxShadow: globalContract.elevation.level3,
});
