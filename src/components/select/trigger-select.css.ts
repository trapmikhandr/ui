import { style } from "@vanilla-extract/css";
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

export const triggerSelect = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "space-between", // Key difference from a regular button.
    borderRadius: globalContract.shape.sm,
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
    width: "100%",
    minWidth: "200px",

    ":focus-visible": focusRing(),

    selectors: {
      "&:disabled": {
        cursor: "not-allowed",
        opacity: colorContract.state.disabledOpacity,
      },

      "&:active:not(:disabled)": {
        transform: "scale(0.98)",
      },
    },
  },

  variants: {
    variant: {
      outlined: {
        backgroundColor: "transparent",
        color: colorContract.onSurface.default,
        border: `1px solid ${colorContract.outline.default}`,
        ":hover": {
          backgroundColor: transparentHoverMix(colorContract.onSurface.default),
        },
        ":active": {
          backgroundColor: transparentActiveMix(
            colorContract.onSurface.default,
          ),
        },
      },

      filled: {
        backgroundColor: colorContract.surface.container,
        color: colorContract.onSurface.default,
        ":hover": {
          backgroundColor: hoverMix(
            colorContract.surface.container,
            colorContract.onSurface.default,
          ),
        },
        ":active": {
          backgroundColor: activeMix(
            colorContract.surface.container,
            colorContract.onSurface.default,
          ),
        },
      },
    },

    size: {
      small: {
        padding: `${globalContract.spacing.xs} ${globalContract.spacing.sm}`,
        fontSize: globalContract.typography.label.small.fontSize,
        minHeight: "32px",
      },
      medium: {
        padding: `${globalContract.spacing.sm} ${globalContract.spacing.md}`,
        fontSize: globalContract.typography.label.medium.fontSize,
        minHeight: "40px",
      },
      large: {
        padding: `${globalContract.spacing.sm} ${globalContract.spacing.lg}`,
        fontSize: globalContract.typography.label.large.fontSize,
        minHeight: "48px",
      },
    },

    isInvalid: {
      true: {
        borderColor: colorContract.error.base,
        ":focus-visible": focusRing(colorContract.error.base),
      },
    },

    isOpen: {
      true: focusRing(),
    },
  },

  defaultVariants: {
    variant: "outlined",
    size: "medium",
  },
});

export const triggerSelectContent = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: globalContract.spacing.sm,
  width: "100%",
});

export const triggerSelectValue = style({
  flex: 1,
  textAlign: "left",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const triggerSelectIcon = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  transition: "transform 0.2s ease-in-out",

  selectors: {
    "[data-open='true'] &": {
      transform: "rotate(180deg)",
    },
  },
});
