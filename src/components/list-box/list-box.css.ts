/**
 * list-box.css.ts - Styles for the ListBox component.
 *
 * ✅ Use colorContract for colors (changes between light and dark themes).
 * ✅ Use globalContract for spacing, typography, and shape.
 * ✅ Structure based on the M3 Menu specification.
 */

import { style } from "@vanilla-extract/css";
import { colorContract, globalContract } from "@/themes";
import { animationPresets } from "@/themes/animations.css";

/**
 * ListBox container (ul).
 * In M3, surface.containerHigh places dropdown content above the main content.
 */
export const listBoxContainer = style({
  listStyle: "none",
  margin: 0,
  padding: globalContract.spacing.xs,
  backgroundColor: colorContract.surface.containerHigh,
  border: `1px solid ${colorContract.outline.variant}`,
  borderRadius: globalContract.shape.md,
  minWidth: "200px",
  boxShadow: globalContract.elevation.level2,
  outline: "none",

  // Subtle entrance animation.
  animation: animationPresets.slideUpFast,
});
