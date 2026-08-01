/**
 * checkbox.css.ts - Styles for the Checkbox component.
 *
 * ✅ Material Design 3 specs
 * ✅ Use colorContract for colors.
 * ✅ Use globalContract for spacing, typography, and shape.
 */

import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { activeMix, focusRing, hoverMix } from "@/shared/utils";
import { colorContract, globalContract } from "@/themes";

export const checkboxContainer = style({
  display: "inline-flex",
  alignItems: "center",
  gap: globalContract.spacing.sm,
  cursor: "pointer",
  userSelect: "none",

  selectors: {
    "&[data-disabled='true']": {
      cursor: "not-allowed",
      opacity: colorContract.state.disabledOpacity,
    },
  },
});

export const checkboxInput = style({
  position: "absolute",
  width: "1px",
  height: "1px",
  margin: "-1px",
  padding: 0,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  border: 0,
});

export const checkboxBox = recipe({
  base: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: globalContract.shape.xs,
    border: `2px solid ${colorContract.outline.default}`,
    backgroundColor: "transparent",
    transition: "all 0.2s ease-in-out",
    flexShrink: 0,

    selectors: {
      // Focus visible — halo ring through a data attribute (the input is hidden and focus is managed manually).
      [`${checkboxContainer}[data-focus-visible='true'] &`]: {
        ...focusRing(),
      },

      // Hover (not checked, not disabled) — data-checked is on the container.
      [`${checkboxContainer}:not([data-checked='true']):not([data-disabled='true']):hover &`]:
        {
          backgroundColor: hoverMix(
            colorContract.surface.default,
            colorContract.primary.base,
          ),
          borderColor: colorContract.primary.base,
        },

      // Active/press (not checked, not disabled).
      [`${checkboxContainer}:not([data-checked='true']):not([data-disabled='true']):active &`]:
        {
          backgroundColor: activeMix(
            colorContract.surface.default,
            colorContract.primary.base,
          ),
        },

      // Checked state
      [`${checkboxContainer}[data-checked='true'] &`]: {
        backgroundColor: colorContract.primary.base,
        borderColor: colorContract.primary.base,
      },

      // Checked + hover — data-checked is on the container.
      [`${checkboxContainer}[data-checked='true']:not([data-disabled='true']):hover &`]:
        {
          backgroundColor: hoverMix(
            colorContract.primary.base,
            colorContract.primary.on,
          ),
        },

      // Checked + Active
      [`${checkboxContainer}[data-checked='true']:not([data-disabled='true']):active &`]:
        {
          backgroundColor: activeMix(
            colorContract.primary.base,
            colorContract.primary.on,
          ),
        },

      // Indeterminate state (partially selected).
      [`${checkboxContainer}[data-indeterminate='true'] &`]: {
        backgroundColor: colorContract.primary.base,
        borderColor: colorContract.primary.base,
      },

      // Disabled
      [`${checkboxContainer}[data-disabled='true'] &`]: {
        borderColor: colorContract.outline.variant,
        backgroundColor: "transparent",
      },

      // Disabled + Checked
      [`${checkboxContainer}[data-disabled='true'][data-checked='true'] &`]: {
        backgroundColor: colorContract.onSurface.muted,
        borderColor: colorContract.onSurface.muted,
      },
    },
  },

  variants: {
    size: {
      small: {
        width: "16px",
        height: "16px",
      },
      medium: {
        width: "18px",
        height: "18px",
      },
      large: {
        width: "20px",
        height: "20px",
      },
    },
    error: {
      true: {
        borderColor: colorContract.error.base,

        selectors: {
          [`${checkboxContainer}[data-focus-visible='true'] &`]: {
            ...focusRing(colorContract.error.base),
          },

          [`${checkboxContainer}[data-checked='true'] &`]: {
            backgroundColor: colorContract.error.base,
            borderColor: colorContract.error.base,
          },
          [`${checkboxContainer}[data-checked='true']:not([data-disabled='true']):hover &`]:
            {
              backgroundColor: hoverMix(
                colorContract.error.base,
                colorContract.error.on,
              ),
            },
          [`${checkboxContainer}[data-checked='true']:not([data-disabled='true']):active &`]:
            {
              backgroundColor: activeMix(
                colorContract.error.base,
                colorContract.error.on,
              ),
            },
        },
      },
    },
  },

  defaultVariants: {
    size: "medium",
  },
});

export const checkboxIcon = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: colorContract.primary.on,
    opacity: 0,
    transform: "scale(0.5)",
    transition: "all 0.15s ease-in-out",
    selectors: {
      [`${checkboxContainer}[data-checked='true'] &, ${checkboxContainer}[data-indeterminate='true'] &`]:
        {
          opacity: 1,
          transform: "scale(1)",
        },
    },
  },
  variants: {
    size: {
      small: {
        width: "12px",
        height: "12px",
      },
      medium: {
        width: "14px",
        height: "14px",
      },
      large: {
        width: "16px",
        height: "16px",
      },
    },
  },

  defaultVariants: {
    size: "medium",
  },
});

export const checkboxLabel = style({
  fontFamily: globalContract.typography.fontFamily.plain,
  fontSize: globalContract.typography.body.medium.fontSize,
  lineHeight: globalContract.typography.body.medium.lineHeight,
  color: colorContract.onSurface.default,

  selectors: {
    [`${checkboxContainer}[data-disabled='true'] &`]: {
      color: colorContract.onSurface.muted,
    },
  },
});

export const checkboxDescription = style({
  fontFamily: globalContract.typography.fontFamily.plain,
  fontSize: globalContract.typography.body.small.fontSize,
  lineHeight: globalContract.typography.body.small.lineHeight,
  color: colorContract.onSurface.variant,
  marginTop: globalContract.spacing.xs,

  selectors: {
    [`${checkboxContainer}[data-disabled='true'] &`]: {
      color: colorContract.onSurface.muted,
    },
  },
});

export const checkboxContent = style({
  display: "flex",
  flexDirection: "column",
});
