/**
 * list-menu.css.ts - Styles for the ListMenu component.
 *
 * ✅ Use colorContract for colors (changes between light and dark themes).
 * ✅ Use globalContract for spacing, shape, and elevation.
 * ✅ Structure based on the M3 Menu specification.
 */

import { style } from "@vanilla-extract/css";
import { colorContract, globalContract } from "@/themes";

/**
 * Menu container (ul).
 * M3 menu containers have a minimum width, padding, background, and shadow.
 */
export const list = style({
  listStyle: "none",
  margin: 0,
  padding: globalContract.spacing.xs,
  minWidth: "112px", // M3 minimum menu width
  outline: "none",

  // M3 surface for menus — use containerHigh for dropdown menus.
  backgroundColor: colorContract.surface.containerHigh,
  borderRadius: globalContract.shape.sm,

  // M3 elevation level 2 for dropdown menus.
  boxShadow: globalContract.elevation.level2,
});
