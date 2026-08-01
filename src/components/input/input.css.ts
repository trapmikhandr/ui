import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { focusRing, focusTransition } from "@/shared/utils";
import { colorContract, globalContract } from "@/themes";
import { densityContract } from "@/themes/contracts/density.contract.css";

// Input-field container.
export const container = style({
  display: "flex",
  flexDirection: "column",
  gap: globalContract.spacing.xs,
  width: "100%",
  position: "relative",
});

export const comboboxError = style({
  paddingBottom: globalContract.spacing.md,
});

// Input element (M3 outlined style).
export const inputRecipe = recipe({
  base: {
    appearance: "none",
    width: "100%",
    height: densityContract.controlHeight,
    padding: `0 ${densityContract.controlPaddingX}`,
    borderRadius: globalContract.shape.sm,
    border: `1px solid ${colorContract.outline.default}`,
    backgroundColor: "transparent",
    color: colorContract.onSurface.default,
    fontFamily: globalContract.typography.fontFamily.brand,
    fontSize: globalContract.typography.body.large.fontSize,
    lineHeight: globalContract.typography.body.large.lineHeight,
    ...focusTransition,
    boxSizing: "border-box",

    "::placeholder": {
      color: colorContract.onSurface.variant,
      opacity: colorContract.state.disabledOpacity,
    },

    ":focus-visible": {
      ...focusRing(),
      borderColor: colorContract.primary.base,
    },

    ":disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
      borderColor: colorContract.onSurface.variant, // Muted border
      backgroundColor: colorContract.surface.container, // Slightly gray background.
    },
  },

  variants: {
    error: {
      true: {
        borderColor: colorContract.error.base,
        ":focus-visible": {
          ...focusRing(colorContract.error.base),
          borderColor: colorContract.error.base,
        },
      },
    },
    hasLeftIcon: {
      true: { paddingLeft: globalContract.spacing["2xl"] }, // 48px
    },
    hasRightIcon: {
      true: { paddingRight: globalContract.spacing["2xl"] },
    },
  },
});

// Label styles.
export const labelStyle = style({
  color: colorContract.onSurface.variant,
  fontSize: globalContract.typography.label.large.fontSize,
  lineHeight: globalContract.typography.label.large.lineHeight,
  letterSpacing: globalContract.typography.label.large.letterSpacing,
  fontWeight: globalContract.typography.label.large.fontWeight,
});

// Helper text and error message styles.
export const supportTextStyle = style({
  position: "absolute",
  bottom: "0",
  left: "0",
  fontSize: globalContract.typography.body.small.fontSize,
  lineHeight: globalContract.typography.body.small.lineHeight,
  color: colorContract.onSurface.variant,
});

// Icon container.
export const iconContainer = recipe({
  base: {
    position: "absolute",
    top: "0",
    height: densityContract.controlHeight,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: globalContract.spacing["2xl"], // 48px
    color: colorContract.onSurface.variant,
  },
  variants: {
    position: {
      left: {
        left: 0,
        pointerEvents: "none", // The leading icon is not clickable.
      },
      right: {
        right: 0,
        pointerEvents: "auto", // The trailing icon is clickable (for the clear button).
      },
    },
  },
});
