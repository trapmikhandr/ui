/**
 * item-menu.css.ts - Styles for the ItemMenu component.
 *
 * ✅ Use colorContract for colors (changes between light and dark themes).
 * ✅ Use globalContract for spacing, typography, and shape.
 * ✅ Structure based on the M3 Menu Item specification.
 */

import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { transparentHoverMix } from "@/shared/utils";
import { colorContract, globalContract } from "@/themes";

/**
 * Base styles for the menu item (li).
 * M3 menu items support several interaction states.
 */
export const itemBase = style({
  display: "flex",
  alignItems: "center",
  padding: `${globalContract.spacing.smd} ${globalContract.spacing.md}`, // 12 16
  // minHeight: "48px", // M3 touch target
  borderRadius: globalContract.shape.sm,
  cursor: "pointer",
  outline: "none",
  position: "relative",

  // M3 typography: label.large for menu items.
  fontFamily: globalContract.typography.fontFamily.brand,
  fontSize: globalContract.typography.label.large.fontSize,
  fontWeight: globalContract.typography.label.large.fontWeight,
  lineHeight: globalContract.typography.label.large.lineHeight,
  letterSpacing: globalContract.typography.label.large.letterSpacing,

  color: colorContract.onSurface.default,
  backgroundColor: "transparent",

  transition: "background-color 0.15s ease-out, color 0.15s ease-out",

  // Remove the default browser outline.
  WebkitTapHighlightColor: "transparent",
});

/**
 * Recipe for the menu item's interaction states.
 */
export const item = recipe({
  base: itemBase,

  variants: {
    // Focus state (keyboard navigation).
    isFocused: {
      true: {
        backgroundColor: transparentHoverMix(colorContract.onSurface.default),
      },
    },

    // Disabled state.
    isDisabled: {
      true: {
        cursor: "not-allowed",
        opacity: colorContract.state.disabledOpacity,
        color: colorContract.onSurface.muted,
      },
    },
  },

  // Compound variants for state combinations.
  compoundVariants: [
    {
      variants: {
        isDisabled: true,
        isFocused: true,
      },
      style: {
        // Disabled elements should not respond to focus.
        backgroundColor: "transparent",
      },
    },
  ],
});
