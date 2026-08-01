import { createVar } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import {
  activeMix,
  focusRing,
  focusTransition,
  hoverMix,
} from "@/shared/utils";
import { colorContract, globalContract } from "@/themes";

const shadow = createVar();
const shadowHover = createVar();

export const fab = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    border: "none",
    cursor: "pointer",
    position: "relative",
    outline: "none",
    ...focusTransition,
    vars: {
      [shadow]: globalContract.elevation.level3,
      [shadowHover]: globalContract.elevation.level4,
    },
    boxShadow: shadow,

    ":hover": { boxShadow: shadowHover },
    ":focus-visible": focusRing(),

    selectors: {
      "&:disabled": {
        cursor: "not-allowed",
        opacity: colorContract.state.disabledOpacity,
      },
      "&:active:not(:disabled)": {
        transform: "scale(0.95)",
        boxShadow: shadow,
      },
    },
  },

  variants: {
    color: {
      surface: {
        backgroundColor: colorContract.surface.containerHigh,
        color: colorContract.onSurface.default,
        ":hover": {
          backgroundColor: hoverMix(
            colorContract.surface.containerHigh,
            colorContract.onSurface.default,
          ),
        },
        ":active": {
          backgroundColor: activeMix(
            colorContract.surface.containerHigh,
            colorContract.onSurface.default,
          ),
        },
      },
      primary: {
        backgroundColor: colorContract.primary.container,
        color: colorContract.primary.onContainer,
        ":hover": {
          backgroundColor: hoverMix(
            colorContract.primary.container,
            colorContract.primary.onContainer,
          ),
        },
        ":active": {
          backgroundColor: activeMix(
            colorContract.primary.container,
            colorContract.primary.onContainer,
          ),
        },
      },
      secondary: {
        backgroundColor: colorContract.secondary.container,
        color: colorContract.secondary.onContainer,
        ":hover": {
          backgroundColor: hoverMix(
            colorContract.secondary.container,
            colorContract.secondary.onContainer,
          ),
        },
        ":active": {
          backgroundColor: activeMix(
            colorContract.secondary.container,
            colorContract.secondary.onContainer,
          ),
        },
      },
      tertiary: {
        backgroundColor: colorContract.tertiary.container,
        color: colorContract.tertiary.onContainer,
        ":hover": {
          backgroundColor: hoverMix(
            colorContract.tertiary.container,
            colorContract.tertiary.onContainer,
          ),
        },
        ":active": {
          backgroundColor: activeMix(
            colorContract.tertiary.container,
            colorContract.tertiary.onContainer,
          ),
        },
      },
    },

    size: {
      small: {
        width: "40px",
        height: "40px",
        borderRadius: globalContract.shape.md,
        fontSize: "20px",
      },
      medium: {
        width: "56px",
        height: "56px",
        borderRadius: globalContract.shape.lg,
        fontSize: "24px",
      },
      large: {
        width: "96px",
        height: "96px",
        borderRadius: globalContract.shape.xl,
        fontSize: "36px",
      },
    },

    // Extended FAB: icon + label, pill shape
    extended: {
      true: {
        width: "auto",
        height: "56px",
        borderRadius: globalContract.shape.full,
        paddingInline: globalContract.spacing.lg,
        gap: globalContract.spacing.smd,
        fontFamily: globalContract.typography.fontFamily.brand,
        fontWeight: globalContract.typography.label.large.fontWeight,
        fontSize: globalContract.typography.label.large.fontSize,
        lineHeight: globalContract.typography.label.large.lineHeight,
        letterSpacing: globalContract.typography.label.large.letterSpacing,
      },
      false: {},
    },

    lowered: {
      true: {
        vars: {
          [shadow]: globalContract.elevation.level1,
          [shadowHover]: globalContract.elevation.level2,
        },
      },
      false: {},
    },
  },

  defaultVariants: {
    color: "surface",
    size: "medium",
    extended: false,
    lowered: false,
  },
});
