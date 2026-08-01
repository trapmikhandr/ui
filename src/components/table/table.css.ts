/**
 * table.css.ts - Styles for the Table component.
 *
 * ✅ Use colorContract for colors (changes between light and dark themes).
 * ✅ Use globalContract for spacing, typography, shape, and elevation.
 * ✅ Structure based on the M3 Data Table specification.
 */

import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import {
  activeMix,
  focusRing,
  hoverMix,
  transparentActiveMix,
  transparentHoverMix,
} from "@/shared/utils";
import { colorContract, globalContract } from "@/themes";

/**
 * Main table container.
 * M3 Data Table with a surface background.
 */
export const table = style({
  width: "100%",
  overflow: "hidden",
  borderCollapse: "collapse",
  backgroundColor: colorContract.surface.containerLow,
  borderRadius: globalContract.shape.sm,

  // M3 elevation level 1 for data tables.
  boxShadow: globalContract.elevation.level1,
  color: colorContract.onSurface.default,
});

/*containerLow*
 * Table header group (thead).
 */
export const headerGroup = style({
  borderBottom: `1px solid ${colorContract.outline.variant}`,
});

/**
 * Table body group (tbody).
 */
export const bodyGroup = style({
  // Body-group styles, if needed.
});

/**
 * Table header row.
 */
export const headerRow = style({
  outline: "none",
});

/**
 * Table header cell (th).
 * M3 Data Table Column Header
 */
export const columnHeader = recipe({
  base: {
    padding: `${globalContract.spacing.md} ${globalContract.spacing.lg}`,
    outline: "none",
    cursor: "default",
    position: "relative",

    // M3 typography: title.small for column headers.
    fontFamily: globalContract.typography.fontFamily.brand,
    fontSize: globalContract.typography.title.small.fontSize,
    fontWeight: globalContract.typography.title.small.fontWeight,
    lineHeight: globalContract.typography.title.small.lineHeight,
    letterSpacing: globalContract.typography.title.small.letterSpacing,

    color: colorContract.onSurface.default,
    backgroundColor: colorContract.surface.container,

    ":focus-visible": focusRing(),
  },

  variants: {
    // Alignment for colspan columns.
    align: {
      left: {
        textAlign: "left",
      },
      center: {
        textAlign: "center",
      },
      right: {
        textAlign: "right",
      },
    },
  },

  defaultVariants: {
    align: "left",
  },
});

/**
 * Sort icon in the header.
 */
export const sortIcon = recipe({
  base: {
    marginLeft: globalContract.spacing.xs,
    color: colorContract.onSurface.muted,
    transition: "visibility 0.15s ease-out",
  },

  variants: {
    isVisible: {
      true: {
        visibility: "visible",
      },
      false: {
        visibility: "hidden",
      },
    },
  },
});

/**
 * Table row (tr).
 * M3 Data Table Row with selection and hover states.
 */
export const row = recipe({
  base: {
    outline: "none",
    cursor: "default",
    transition: "background-color 0.15s ease-out",

    ":focus-visible": {
      ...focusRing(),
      outlineOffset: "-3px",
    },

    // M3: hover state for interactive rows.
    ":hover": {
      backgroundColor: transparentHoverMix(colorContract.onSurface.default),
    },
  },

  variants: {
    // Selection state.
    isSelected: {
      true: {
        backgroundColor: colorContract.secondary.container,
        color: colorContract.secondary.onContainer,

        ":hover": {
          // Use hoverMix when hovering a selected row.
          backgroundColor: hoverMix(
            colorContract.secondary.container,
            colorContract.secondary.onContainer,
          ),
        },
      },
    },

    // Pressed (active) state.
    isPressed: {
      true: {
        backgroundColor: transparentActiveMix(colorContract.onSurface.default),
      },
    },

    // Row action (onRowAction): the entire row is the press target.
    isInteractive: {
      true: {
        cursor: "pointer",
      },
    },
  },

  compoundVariants: [
    {
      variants: {
        isSelected: true,
        isPressed: true,
      },
      style: {
        // Use activeMix when pressing a selected row.
        backgroundColor: activeMix(
          colorContract.secondary.container,
          colorContract.secondary.onContainer,
        ),
      },
    },
  ],
});

/**
 * Table cell (td).
 * M3 Data Table Cell
 */
export const cell = recipe({
  base: {
    padding: `${globalContract.spacing.md} ${globalContract.spacing.lg}`,
    outline: "none",

    // M3 typography: body.medium for table cells.
    fontFamily: globalContract.typography.fontFamily.brand,
    fontSize: globalContract.typography.body.medium.fontSize,
    fontWeight: globalContract.typography.body.medium.fontWeight,
    lineHeight: globalContract.typography.body.medium.lineHeight,
    letterSpacing: globalContract.typography.body.medium.letterSpacing,

    ":focus-visible": {
      ...focusRing(),
      outlineOffset: "-3px",
    },
  },

  variants: {
    // Remove isFocused because :focus-visible is used.
  },
});
