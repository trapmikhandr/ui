/**
 * button.css.ts - Styles for the Button component.
 *
 * ✅ Use colorContract for colors (changes between light and dark themes).
 * ✅ Use globalContract for spacing, typography, and shape.
 * ✅ Structure based on the M3 Button specification.
 */

import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import {
  activeMix,
  focusRing,
  focusTransition,
  hoverMix,
  transparentActiveMix,
  transparentHoverMix,
} from "@/shared/utils";
import { colorContract, globalContract } from "@/themes";
import { densityContract } from "@/themes/contracts/density.contract.css";
import { groupCompoundVariants, groupVariants } from "./group-variants.css";

const colorBase = createVar();
const colorOn = createVar();
const colorContainer = createVar();
const colorOnContainer = createVar();
const buttonIconGap = createVar();
const buttonSquareCorner = createVar();

// ============ BUTTON RECIPE ============
export const button = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
    borderRadius: globalContract.shape.full,
    height: densityContract.controlHeight,
    paddingInline: globalContract.spacing.lg,
    border: "none",
    cursor: "pointer",
    fontFamily: globalContract.typography.fontFamily.brand,
    fontWeight: globalContract.typography.label.large.fontWeight,
    fontSize: globalContract.typography.label.large.fontSize,
    lineHeight: globalContract.typography.label.large.lineHeight,
    letterSpacing: globalContract.typography.label.large.letterSpacing,
    textDecoration: "none",
    ...focusTransition,
    outline: "none",
    position: "relative",

    ":focus-visible": focusRing(),
    selectors: {
      "&:disabled": {
        cursor: "not-allowed",
        opacity: colorContract.state.disabledOpacity,
      },
      "&[data-loading='true']": {
        cursor: "wait",
        opacity: 1,
      },
      "&:active:not(:disabled)": {
        transform: "scale(0.96)",
      },
    },
  },

  variants: {
    variant: {
      filled: {
        backgroundColor: colorBase,
        color: colorOn,
        ":hover": { backgroundColor: hoverMix(colorBase, colorOn) },
        ":active": { backgroundColor: activeMix(colorBase, colorOn) },
      },

      tonal: {
        backgroundColor: colorContainer,
        color: colorOnContainer,
        ":hover": {
          backgroundColor: hoverMix(colorContainer, colorOnContainer),
        },
        ":active": {
          backgroundColor: activeMix(colorContainer, colorOnContainer),
        },
      },

      outlined: {
        backgroundColor: "transparent",
        color: colorBase,
        border: `1px solid ${colorContract.outline.default}`,
        ":hover": { backgroundColor: transparentHoverMix(colorBase) },
        ":active": { backgroundColor: transparentActiveMix(colorBase) },
      },

      text: {
        backgroundColor: "transparent",
        color: colorBase,
        ":hover": { backgroundColor: transparentHoverMix(colorBase) },
        ":active": { backgroundColor: transparentActiveMix(colorBase) },
      },

      elevated: {
        backgroundColor: colorContract.surface.containerLow,
        color: colorBase,
        boxShadow: globalContract.elevation.level1,
        ":hover": {
          backgroundColor: hoverMix(
            colorContract.surface.containerLow,
            colorBase,
          ),
          boxShadow: globalContract.elevation.level2,
        },
        ":active": {
          backgroundColor: activeMix(
            colorContract.surface.containerLow,
            colorBase,
          ),
        },
      },
    },

    color: {
      primary: {
        vars: {
          [colorBase]: colorContract.primary.base,
          [colorOn]: colorContract.primary.on,
          [colorContainer]: colorContract.primary.container,
          [colorOnContainer]: colorContract.primary.onContainer,
        },
      },
      secondary: {
        vars: {
          [colorBase]: colorContract.secondary.base,
          [colorOn]: colorContract.secondary.on,
          [colorContainer]: colorContract.secondary.container,
          [colorOnContainer]: colorContract.secondary.onContainer,
        },
      },
      tertiary: {
        vars: {
          [colorBase]: colorContract.tertiary.base,
          [colorOn]: colorContract.tertiary.on,
          [colorContainer]: colorContract.tertiary.container,
          [colorOnContainer]: colorContract.tertiary.onContainer,
        },
      },
      error: {
        vars: {
          [colorBase]: colorContract.error.base,
          [colorOn]: colorContract.error.on,
          [colorContainer]: colorContract.error.container,
          [colorOnContainer]: colorContract.error.onContainer,
        },
      },
    },

    size: {
      xs: {
        height: "32px",
        paddingInline: globalContract.spacing.smd,
        fontSize: globalContract.typography.label.small.fontSize,
        vars: {
          [buttonIconGap]: globalContract.spacing.xs,
          [buttonSquareCorner]: globalContract.shape.xs,
        },
      },
      s: {
        height: "40px",
        paddingInline: globalContract.spacing.md,
        fontSize: globalContract.typography.label.medium.fontSize,
        vars: {
          [buttonIconGap]: globalContract.spacing.sm,
          [buttonSquareCorner]: globalContract.shape.sm,
        },
      },
      m: {
        height: "56px",
        paddingInline: globalContract.spacing.lg,
        fontSize: globalContract.typography.label.large.fontSize,
        vars: {
          [buttonIconGap]: globalContract.spacing.sm,
          [buttonSquareCorner]: globalContract.shape.sm,
        },
      },
      l: {
        height: "96px",
        paddingInline: globalContract.spacing["2xl"],
        fontSize: globalContract.typography.label.large.fontSize,
        vars: {
          [buttonIconGap]: globalContract.spacing.smd,
          [buttonSquareCorner]: globalContract.shape.lg,
        },
      },
      xl: {
        height: "136px",
        paddingInline: globalContract.spacing["3xl"],
        fontSize: globalContract.typography.label.large.fontSize,
        vars: {
          [buttonIconGap]: globalContract.spacing.md,
          [buttonSquareCorner]: "20px",
        },
      },
      small: {
        height: "32px",
        paddingInline: globalContract.spacing.smd,
        fontSize: globalContract.typography.label.small.fontSize,
        vars: {
          [buttonIconGap]: globalContract.spacing.xs,
          [buttonSquareCorner]: globalContract.shape.xs,
        },
      },
      medium: {
        height: "40px",
        paddingInline: globalContract.spacing.lg,
        fontSize: globalContract.typography.label.medium.fontSize,
        vars: {
          [buttonIconGap]: globalContract.spacing.sm,
          [buttonSquareCorner]: globalContract.shape.sm,
        },
      },
      large: {
        height: "48px",
        paddingInline: globalContract.spacing.xl,
        fontSize: globalContract.typography.label.large.fontSize,
        vars: {
          [buttonIconGap]: globalContract.spacing.sm,
          [buttonSquareCorner]: globalContract.shape.sm,
        },
      },
    },

    shape: {
      round: { borderRadius: globalContract.shape.full },
      square: { borderRadius: buttonSquareCorner },
    },

    toggle: { true: {}, false: {} },
    selected: { true: {}, false: {} },

    fullWidth: {
      true: { width: "100%" },
    },

    isLoading: {
      true: { pointerEvents: "none" },
    },

    ...groupVariants,
  },

  compoundVariants: [
    {
      variants: { variant: "outlined", color: "error" },
      style: { border: `1px solid ${colorContract.error.base}` },
    },
    {
      variants: { toggle: true, shape: "round", selected: true },
      style: { borderRadius: buttonSquareCorner },
    },
    {
      variants: { toggle: true, shape: "square", selected: true },
      style: { borderRadius: globalContract.shape.full },
    },
    {
      variants: { toggle: true, variant: "filled", selected: false },
      style: {
        backgroundColor: colorContract.surface.containerHighest,
        color: colorContract.onSurface.variant,
        ":hover": {
          backgroundColor: hoverMix(
            colorContract.surface.containerHighest,
            colorContract.onSurface.variant,
          ),
        },
        ":active": {
          backgroundColor: activeMix(
            colorContract.surface.containerHighest,
            colorContract.onSurface.variant,
          ),
        },
      },
    },
    {
      variants: { toggle: true, variant: "tonal", selected: false },
      style: {
        backgroundColor: colorContract.surface.containerHighest,
        color: colorContract.onSurface.variant,
        ":hover": {
          backgroundColor: hoverMix(
            colorContract.surface.containerHighest,
            colorContract.onSurface.variant,
          ),
        },
        ":active": {
          backgroundColor: activeMix(
            colorContract.surface.containerHighest,
            colorContract.onSurface.variant,
          ),
        },
      },
    },
    {
      variants: { toggle: true, variant: "outlined", selected: true },
      style: {
        backgroundColor: colorBase,
        color: colorOn,
        border: `1px solid ${colorBase}`,
        ":hover": { backgroundColor: hoverMix(colorBase, colorOn) },
        ":active": { backgroundColor: activeMix(colorBase, colorOn) },
      },
    },
    {
      variants: { toggle: true, variant: "tonal", selected: true },
      style: {
        backgroundColor: colorBase,
        color: colorOn,
        ":hover": { backgroundColor: hoverMix(colorBase, colorOn) },
        ":active": { backgroundColor: activeMix(colorBase, colorOn) },
      },
    },
    {
      variants: { toggle: true, variant: "elevated", selected: true },
      style: {
        backgroundColor: colorBase,
        color: colorOn,
        boxShadow: globalContract.elevation.level1,
        ":hover": {
          backgroundColor: hoverMix(colorBase, colorOn),
          boxShadow: globalContract.elevation.level2,
        },
        ":active": { backgroundColor: activeMix(colorBase, colorOn) },
      },
    },
    ...groupCompoundVariants(buttonSquareCorner),
  ],

  defaultVariants: {
    variant: "filled",
    color: "primary",
    size: "s",
    shape: "round",
    toggle: false,
    selected: false,
    fullWidth: false,
    isLoading: false,
    groupVariant: "none",
    groupOrientation: "horizontal",
    groupSize: "m",
    groupShape: "round",
    groupPosition: "only",
    groupInteraction: "idle",
  },
});

// ============ HELPER STYLES ============

export const buttonIcon = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
});

export const buttonIconOverlay = style([
  buttonIcon,
  {
    position: "absolute",
    inset: 0,
  },
]);

export const buttonContent = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: buttonIconGap,
  transition: "opacity 0.2s ease-in-out",
});

export const buttonTextHidden = style({
  opacity: 0,
});
