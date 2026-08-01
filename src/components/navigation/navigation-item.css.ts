import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import {
  focusRing,
  focusTransition,
  transparentActiveMix,
  transparentHoverMix,
} from "@/shared/utils";
import { colorContract, globalContract } from "@/themes";

export const item = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    textDecoration: "none",
    border: "none",
    background: "none",
    color: colorContract.onSurface.variant,
    font: "inherit",
    ...focusTransition,

    ":focus-visible": focusRing(),
  },

  variants: {
    mode: {
      drawer: {
        flexDirection: "row",
        gap: globalContract.spacing.md,
        height: "56px",
        paddingInline: globalContract.spacing.md,
        borderRadius: globalContract.shape.full,

        selectors: {
          "&:hover:not(.active):not([data-active='true'])": {
            backgroundColor: transparentHoverMix(
              colorContract.onSurface.variant,
            ),
          },
          "&:active:not(.active):not([data-active='true'])": {
            backgroundColor: transparentActiveMix(
              colorContract.onSurface.variant,
            ),
          },
          "&.active, &[data-active='true']": {
            backgroundColor: colorContract.secondary.container,
            color: colorContract.secondary.onContainer,
          },
        },
      },

      rail: {
        flexDirection: "column",
        alignItems: "center",
        gap: globalContract.spacing.xs,
        width: "100%",
        paddingBlock: globalContract.spacing.xs,
        borderRadius: globalContract.shape.sm,
        background: "none",

        selectors: {
          "&:hover": {
            backgroundColor: transparentHoverMix(
              colorContract.onSurface.variant,
            ),
          },
          "&:active": {
            backgroundColor: transparentActiveMix(
              colorContract.onSurface.variant,
            ),
          },
        },
      },

      bar: {
        flexDirection: "column",
        alignItems: "center",
        gap: globalContract.spacing.xs,
        flex: 1,
        paddingBlock: globalContract.spacing.sm,

        selectors: {
          "&:hover": {
            backgroundColor: transparentHoverMix(
              colorContract.onSurface.variant,
            ),
          },
          "&:active": {
            backgroundColor: transparentActiveMix(
              colorContract.onSurface.variant,
            ),
          },
        },
      },
    },
  },

  defaultVariants: {
    mode: "drawer",
  },
});

export const itemIndicator = recipe({
  base: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: globalContract.shape.full,
    transition: "background-color 0.2s",
    color: "inherit",
  },

  variants: {
    mode: {
      drawer: {},

      rail: {
        width: "56px",
        height: "32px",

        selectors: {
          ".active > &, [data-active='true'] > &": {
            backgroundColor: colorContract.secondary.container,
            color: colorContract.secondary.onContainer,
          },
        },
      },

      bar: {
        width: "64px",
        height: "32px",

        selectors: {
          ".active > &, [data-active='true'] > &": {
            backgroundColor: colorContract.secondary.container,
            color: colorContract.secondary.onContainer,
          },
        },
      },
    },
  },

  defaultVariants: {
    mode: "drawer",
  },
});

export const itemLabel = recipe({
  base: {
    whiteSpace: "nowrap",
    fontFamily: globalContract.typography.fontFamily.brand,
  },

  variants: {
    mode: {
      drawer: {
        fontSize: globalContract.typography.label.large.fontSize,
        fontWeight: globalContract.typography.label.large.fontWeight,
        lineHeight: globalContract.typography.label.large.lineHeight,
      },

      rail: {
        fontSize: globalContract.typography.label.small.fontSize,
        fontWeight: globalContract.typography.label.small.fontWeight,
        lineHeight: globalContract.typography.label.small.lineHeight,
        textAlign: "center",
      },

      bar: {
        fontSize: globalContract.typography.label.small.fontSize,
        fontWeight: globalContract.typography.label.small.fontWeight,
        lineHeight: globalContract.typography.label.small.lineHeight,
        textAlign: "center",
      },
    },
  },

  defaultVariants: {
    mode: "drawer",
  },
});

export const itemIconWrap = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "inherit",
});

export const itemBadge = style({
  position: "absolute",
  top: "-4px",
  right: "-4px",
  minWidth: "16px",
  height: "16px",
  borderRadius: globalContract.shape.full,
  backgroundColor: colorContract.error.base,
  color: colorContract.error.on,
  fontSize: "11px",
  fontWeight: "600",
  lineHeight: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0 4px",
  boxSizing: "border-box",
  pointerEvents: "none",
});

export const itemBadgeDot = style({
  position: "absolute",
  top: "0px",
  right: "0px",
  width: "8px",
  height: "8px",
  borderRadius: globalContract.shape.full,
  backgroundColor: colorContract.error.base,
  pointerEvents: "none",
});
