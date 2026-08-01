import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import {
  focusRing,
  focusTransition,
  transparentActiveMix,
  transparentHoverMix,
} from "@/shared/utils";
import { colorContract, globalContract } from "@/themes";

export const segmentedButtonGroup = style({
  display: "flex",
  width: "100%",
  margin: 0,
  padding: 0,
  minWidth: 0,
  borderRadius: globalContract.shape.full,
  border: `1px solid ${colorContract.outline.default}`,
});

export const segmentButton = recipe({
  base: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: globalContract.spacing.sm,
    border: "none",
    borderRight: `1px solid ${colorContract.outline.default}`,
    backgroundColor: "transparent",
    color: colorContract.onSurface.variant,
    fontFamily: globalContract.typography.fontFamily.brand,
    fontWeight: globalContract.typography.label.large.fontWeight,
    fontSize: globalContract.typography.label.large.fontSize,
    lineHeight: globalContract.typography.label.large.lineHeight,
    borderRadius: 0,
    cursor: "pointer",
    outline: "none",
    position: "relative",
    zIndex: 0,
    ...focusTransition,

    selectors: {
      "&:first-child": {
        borderTopLeftRadius: globalContract.shape.full,
        borderBottomLeftRadius: globalContract.shape.full,
      },
      "&:last-child": {
        borderRight: "none",
        borderTopRightRadius: globalContract.shape.full,
        borderBottomRightRadius: globalContract.shape.full,
      },
      "&:focus-visible": {
        ...focusRing(),
        outlineOffset: "1px",
        zIndex: 1,
      },
      "&:disabled": {
        cursor: "not-allowed",
        opacity: colorContract.state.disabledOpacity,
      },
    },
  },

  variants: {
    size: {
      small: {
        padding: `${globalContract.spacing.xs} ${globalContract.spacing.md}`,
        minHeight: "32px",
        fontSize: globalContract.typography.label.small.fontSize,
      },
      medium: {
        padding: `${globalContract.spacing.sm} ${globalContract.spacing.lg}`,
        minHeight: "40px",
      },
      large: {
        padding: `${globalContract.spacing.sm} ${globalContract.spacing.xl}`,
        minHeight: "48px",
      },
    },

    isSelected: {
      true: {
        backgroundColor: colorContract.secondary.container,
        color: colorContract.secondary.onContainer,
        selectors: {
          "&:hover": {
            backgroundColor: transparentHoverMix(
              colorContract.secondary.onContainer,
            ),
          },
          "&:active": {
            backgroundColor: transparentActiveMix(
              colorContract.secondary.onContainer,
            ),
          },
        },
      },
      false: {
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
    size: "medium",
    isSelected: false,
  },
});

export const segmentNum = style({
  color: colorContract.onSurface.muted,
  fontSize: "12px",
  fontWeight: 500,
  lineHeight: 1,
  minWidth: "16px",
});
