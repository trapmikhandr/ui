import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { focusRing, focusTransition } from "@/shared/utils";
import { colorContract, globalContract } from "@/themes";

// Field wrapper visually matches TriggerSelect (outlined M3 field),
// but focus lives on the inner <input>, not on the wrapper itself.
export const triggerCombobox = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: globalContract.spacing.sm,
    borderRadius: globalContract.shape.sm,
    fontFamily: globalContract.typography.fontFamily.brand,
    position: "relative",
    width: "100%",
    minWidth: "200px",
    boxSizing: "border-box",
    ...focusTransition,

    selectors: {
      "&:has(:disabled)": {
        cursor: "not-allowed",
        opacity: colorContract.state.disabledOpacity,
      },
    },
  },

  variants: {
    variant: {
      outlined: {
        backgroundColor: "transparent",
        border: `1px solid ${colorContract.outline.default}`,
        ":focus-within": focusRing(),
      },
      filled: {
        backgroundColor: colorContract.surface.container,
        border: "1px solid transparent",
        ":focus-within": focusRing(),
      },
    },

    size: {
      small: {
        padding: `${globalContract.spacing.xs} ${globalContract.spacing.sm}`,
        minHeight: "32px",
      },
      medium: {
        padding: `${globalContract.spacing.sm} ${globalContract.spacing.md}`,
        minHeight: "40px",
      },
      large: {
        padding: `${globalContract.spacing.sm} ${globalContract.spacing.lg}`,
        minHeight: "48px",
      },
    },

    isInvalid: {
      true: {
        borderColor: colorContract.error.base,
        ":focus-within": focusRing(colorContract.error.base),
      },
    },
  },

  defaultVariants: {
    variant: "outlined",
    size: "medium",
  },
});

export const triggerComboboxInput = recipe({
  base: {
    appearance: "none",
    flex: 1,
    minWidth: 0,
    border: "none",
    outline: "none",
    background: "transparent",
    color: colorContract.onSurface.default,
    fontFamily: "inherit",
    fontWeight: globalContract.typography.label.large.fontWeight,
    fontSize: globalContract.typography.label.large.fontSize,
    lineHeight: globalContract.typography.label.large.lineHeight,
    letterSpacing: globalContract.typography.label.large.letterSpacing,

    "::placeholder": {
      color: colorContract.onSurface.variant,
    },

    ":disabled": {
      cursor: "not-allowed",
    },
  },
});

export const triggerComboboxIcon = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  border: "none",
  background: "transparent",
  padding: 0,
  color: colorContract.onSurface.variant,
  cursor: "pointer",
  transition: "transform 0.2s ease-in-out",

  selectors: {
    "&:disabled": {
      cursor: "not-allowed",
    },
    "[data-open='true'] &": {
      transform: "rotate(180deg)",
    },
  },
});
