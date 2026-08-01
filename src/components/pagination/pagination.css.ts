import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { focusRing, focusTransition } from "@/shared/utils";
import { colorContract, globalContract } from "@/themes";

// Local container style.
export const containerStyle = style({
  display: "flex",
  gap: globalContract.spacing.xs,
  alignItems: "center",
  justifyContent: "center",
});

// Pagination container.
export const paginationContainer = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: globalContract.spacing.xs, // M3 uses small gaps between buttons.
  padding: globalContract.spacing.md,
  width: "100%",
});

// Button recipe (numbers and arrows).
export const paginationButton = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    appearance: "none",
    border: "none",
    background: "transparent",
    cursor: "pointer",

    // M3 Label Large typography for numbers.
    fontFamily: globalContract.typography.fontFamily.brand,
    fontSize: globalContract.typography.label.large.fontSize,
    fontWeight: globalContract.typography.label.large.fontWeight,
    lineHeight: globalContract.typography.label.large.lineHeight,

    // Dimensions (usually 40x40 for touch targets).
    minWidth: "40px",
    height: "40px",
    padding: `0 ${globalContract.spacing.sm}`,
    borderRadius: globalContract.shape.full, // Circular buttons.

    ...focusTransition,

    ":disabled": {
      cursor: "not-allowed",
      opacity: colorContract.state.disabledOpacity,
    },

    ":focus-visible": focusRing(),
  },

  variants: {
    variant: {
      // Regular page (inactive).
      default: {
        color: colorContract.onSurface.variant,
        ":hover": {
          // Simulate a State Layer (Surface Variant + Hover Opacity).
          backgroundColor: colorContract.surface.containerHighest,
        },
        ":active": {
          backgroundColor: colorContract.surface.dim,
        },
      },
      // Current active page.
      active: {
        backgroundColor: colorContract.primary.container,
        color: colorContract.primary.onContainer,
        fontWeight: "bold",
        ":hover": {
          // Use a slightly stronger or more specific overlay for the active item.
          boxShadow: globalContract.elevation.level1,
        },
      },
      // Navigation buttons (arrows).
      icon: {
        color: colorContract.onSurface.variant,
        padding: 0,
        width: "35px", // Square/circle for icons.
        ":hover": {
          backgroundColor: colorContract.surface.containerHighest,
        },
      },
      // Ellipsis.
      ellipsis: {
        cursor: "default",
        color: colorContract.onSurface.variant,
        ":hover": {
          backgroundColor: "transparent",
        },
      },
    },
  },

  defaultVariants: {
    variant: "default",
  },
});
