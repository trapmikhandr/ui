/**
 * option-list-box.css.ts - Styles for the OptionListBox component.
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
 * Base styles for a list option (li).
 * M3 menu items support several interaction states.
 */
export const optionBase = style({
  display: "flex",
  alignItems: "center",
  padding: `${globalContract.spacing.sm} ${globalContract.spacing.md}`,
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
 * Recipe for option interaction states.
 */
export const option = recipe({
  base: optionBase,

  variants: {
    // Hover state.
    isFocused: {
      true: {
        backgroundColor: transparentHoverMix(colorContract.onSurface.default),
      },
    },

    // Selected state.
    isSelected: {
      true: {
        backgroundColor: colorContract.secondary.container,
        color: colorContract.secondary.onContainer,
        fontWeight: 600, // Slightly heavier for emphasis.
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
        isFocused: true,
        isSelected: true,
      },
      style: {
        // When an item is selected and focused, add a slightly darker shade.
        backgroundColor: transparentHoverMix(
          colorContract.secondary.onContainer,
        ),
      },
    },
    {
      variants: {
        isDisabled: true,
        isFocused: true,
      },
      style: {
        // Disabled elements should not respond to hover.
        backgroundColor: "transparent",
      },
    },
  ],
});

/**
 * Styles for the active-state indicator (optional).
 * A checkmark or another indicator can be added for selected items.
 */
export const selectedIndicator = style({
  marginLeft: "auto",
  paddingLeft: globalContract.spacing.sm,
  color: colorContract.secondary.base,
  fontSize: "1.2em",
});
