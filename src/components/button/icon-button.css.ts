import { createVar } from "@vanilla-extract/css";
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
import { groupCompoundVariants, groupVariants } from "./group-variants.css";

const colorBase = createVar();
const colorOn = createVar();
const colorContainer = createVar();
const colorOnContainer = createVar();
const iconButtonSquareCorner = createVar();

export const iconButton = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    cursor: "pointer",
    padding: 0,
    position: "relative",
    overflow: "hidden",
    ...focusTransition,
    flexShrink: 0,
    outline: "none",

    selectors: {
      "&:disabled": {
        cursor: "not-allowed",
        opacity: colorContract.state.disabledOpacity,
      },
      "&:focus-visible": focusRing(),
      "&:active:not(:disabled)": {
        transform: "scale(0.92)",
      },
      '&[data-changing="true"]': {
        transform: "scale(0.8) rotate(15deg)",
        opacity: 0,
      },
    },
  },

  variants: {
    variant: {
      standard: {
        backgroundColor: "transparent",
        color: colorBase,
        border: "1px solid transparent",
        ":hover": { backgroundColor: transparentHoverMix(colorBase) },
        ":active": { backgroundColor: transparentActiveMix(colorBase) },
      },
      filled: {
        color: colorOn,
        backgroundColor: colorBase,
        border: "none",
        ":hover": { backgroundColor: hoverMix(colorBase, colorOn) },
        ":active": { backgroundColor: activeMix(colorBase, colorOn) },
      },
      tonal: {
        color: colorOnContainer,
        backgroundColor: colorContainer,
        border: "none",
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
    },

    shape: {
      circle: { borderRadius: globalContract.shape.full },
      round: { borderRadius: globalContract.shape.full },
      rounded: { borderRadius: globalContract.shape.sm },
      square: { borderRadius: iconButtonSquareCorner },
    },

    color: {
      neutral: {
        vars: {
          [colorBase]: colorContract.onSurface.variant,
          [colorOn]: colorContract.surface.default,
          [colorContainer]: colorContract.surface.containerHighest,
          [colorOnContainer]: colorContract.onSurface.variant,
        },
      },
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
        width: "32px",
        height: "32px",
        fontSize: "18px",
        vars: { [iconButtonSquareCorner]: globalContract.shape.xs },
      },
      s: {
        width: "40px",
        height: "40px",
        fontSize: "20px",
        vars: { [iconButtonSquareCorner]: globalContract.shape.sm },
      },
      m: {
        width: "56px",
        height: "56px",
        fontSize: "24px",
        vars: { [iconButtonSquareCorner]: globalContract.shape.sm },
      },
      l: {
        width: "96px",
        height: "96px",
        fontSize: "32px",
        vars: { [iconButtonSquareCorner]: globalContract.shape.lg },
      },
      xl: {
        width: "136px",
        height: "136px",
        fontSize: "40px",
        vars: { [iconButtonSquareCorner]: "20px" },
      },
      sm: {
        width: "32px",
        height: "32px",
        fontSize: "18px",
        vars: { [iconButtonSquareCorner]: globalContract.shape.xs },
      },
      md: {
        width: "40px",
        height: "40px",
        fontSize: "24px",
        vars: { [iconButtonSquareCorner]: globalContract.shape.sm },
      },
      lg: {
        width: "48px",
        height: "48px",
        fontSize: "28px",
        vars: { [iconButtonSquareCorner]: globalContract.shape.sm },
      },
    },

    widthMode: {
      default: {},
      narrow: {},
      wide: {},
    },

    toggle: { true: {}, false: {} },
    selected: { true: {}, false: {} },

    ...groupVariants,
  },

  compoundVariants: [
    // standard toggle selected: persistent surface tint
    {
      variants: { toggle: true, variant: "standard", selected: true },
      style: {
        backgroundColor: colorContract.surface.containerHighest,
        color: colorContract.onSurface.default,
        ":hover": {
          backgroundColor: hoverMix(
            colorContract.surface.containerHighest,
            colorContract.onSurface.default,
          ),
        },
        ":active": {
          backgroundColor: activeMix(
            colorContract.surface.containerHighest,
            colorContract.onSurface.default,
          ),
        },
      },
    },
    {
      variants: { toggle: true, shape: "circle", selected: true },
      style: { borderRadius: iconButtonSquareCorner },
    },
    {
      variants: { toggle: true, shape: "round", selected: true },
      style: { borderRadius: iconButtonSquareCorner },
    },
    {
      variants: { toggle: true, shape: "square", selected: true },
      style: { borderRadius: globalContract.shape.full },
    },
    // filled toggle unselected: surface-variant container (M3 spec)
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
    // tonal toggle unselected: surface-variant container (M3 spec)
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
    // outlined toggle selected: filled appearance, no border
    {
      variants: { toggle: true, variant: "outlined", selected: true },
      style: {
        backgroundColor: colorBase,
        color: colorOn,
        border: "none",
        ":hover": { backgroundColor: hoverMix(colorBase, colorOn) },
        ":active": { backgroundColor: activeMix(colorBase, colorOn) },
      },
    },
    {
      variants: { toggle: true, variant: "filled", selected: true },
      style: {
        backgroundColor: colorBase,
        color: colorOn,
        border: "none",
        ":hover": { backgroundColor: hoverMix(colorBase, colorOn) },
        ":active": { backgroundColor: activeMix(colorBase, colorOn) },
      },
    },
    {
      variants: { toggle: true, variant: "tonal", selected: true },
      style: {
        backgroundColor: colorBase,
        color: colorOn,
        border: "none",
        ":hover": { backgroundColor: hoverMix(colorBase, colorOn) },
        ":active": { backgroundColor: activeMix(colorBase, colorOn) },
      },
    },
    {
      variants: { groupVariant: "standard", groupInteraction: "selected" },
      style: { borderRadius: globalContract.shape.md },
    },
    ...groupCompoundVariants(iconButtonSquareCorner),
    { variants: { size: "xs", widthMode: "narrow" }, style: { width: "28px" } },
    { variants: { size: "s", widthMode: "narrow" }, style: { width: "32px" } },
    { variants: { size: "m", widthMode: "narrow" }, style: { width: "48px" } },
    { variants: { size: "l", widthMode: "narrow" }, style: { width: "64px" } },
    {
      variants: { size: "xl", widthMode: "narrow" },
      style: { width: "104px" },
    },
    { variants: { size: "xs", widthMode: "wide" }, style: { width: "40px" } },
    { variants: { size: "s", widthMode: "wide" }, style: { width: "52px" } },
    { variants: { size: "m", widthMode: "wide" }, style: { width: "72px" } },
    { variants: { size: "l", widthMode: "wide" }, style: { width: "128px" } },
    { variants: { size: "xl", widthMode: "wide" }, style: { width: "184px" } },
  ],

  defaultVariants: {
    variant: "standard",
    color: "neutral",
    size: "s",
    widthMode: "default",
    shape: "round",
    toggle: false,
    selected: false,
    groupVariant: "none",
    groupOrientation: "horizontal",
    groupSize: "m",
    groupShape: "round",
    groupPosition: "only",
    groupInteraction: "idle",
  },
});
