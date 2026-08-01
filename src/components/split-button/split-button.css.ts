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

// Shared color vars — set on root, inherited by both button parts
export const colorBase = createVar();
export const colorOn = createVar();
export const colorContainer = createVar();
export const colorOnContainer = createVar();

// ─── Root container — sets color vars ────────────────────────────────────────

export const splitRoot = recipe({
  base: {
    display: "inline-flex",
    alignItems: "stretch",
    flexShrink: 0,
  },
  variants: {
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
  },
  defaultVariants: { color: "primary" },
});

// ─── Shared button base ───────────────────────────────────────────────────────

const buttonBase = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  height: "40px",
  border: "none",
  cursor: "pointer",
  outline: "none",
  fontFamily: globalContract.typography.fontFamily.brand,
  fontWeight: globalContract.typography.label.large.fontWeight,
  fontSize: globalContract.typography.label.large.fontSize,
  lineHeight: globalContract.typography.label.large.lineHeight,
  letterSpacing: globalContract.typography.label.large.letterSpacing,
  ...focusTransition,
  selectors: {
    "&:disabled": {
      cursor: "not-allowed",
      opacity: colorContract.state.disabledOpacity,
    },
    "&:focus-visible": focusRing(),
    "&:active:not(:disabled)": { transform: "scale(0.97)" },
  },
} as const;

// ─── Main action button (left, pill on left edge) ─────────────────────────────

export const splitMain = recipe({
  base: {
    ...buttonBase,
    paddingLeft: globalContract.spacing.lg,
    paddingRight: globalContract.spacing.md,
    borderTopLeftRadius: globalContract.shape.full,
    borderBottomLeftRadius: globalContract.shape.full,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    gap: globalContract.spacing.sm,
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
        borderRight: "none",
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
  },
  defaultVariants: { variant: "filled" },
});

// ─── Divider between main and chevron ────────────────────────────────────────

export const splitDivider = recipe({
  base: {
    width: "1px",
    flexShrink: 0,
    alignSelf: "stretch",
  },
  variants: {
    variant: {
      filled: { backgroundColor: colorOn, opacity: 0.3 },
      tonal: { backgroundColor: colorOnContainer, opacity: 0.3 },
      outlined: { backgroundColor: colorContract.outline.default },
      elevated: { backgroundColor: colorBase, opacity: 0.2 },
    },
  },
  defaultVariants: { variant: "filled" },
});

// ─── Chevron / dropdown trigger (right, pill on right edge) ──────────────────

export const splitChevron = recipe({
  base: {
    ...buttonBase,
    width: "40px",
    padding: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: globalContract.shape.full,
    borderBottomRightRadius: globalContract.shape.full,
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
        borderLeft: "none",
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
        },
        ":active": {
          backgroundColor: activeMix(
            colorContract.surface.containerLow,
            colorBase,
          ),
        },
      },
    },
  },
  defaultVariants: { variant: "filled" },
});

// ─── Dropdown menu ────────────────────────────────────────────────────────────

export const splitDropdown = style({
  position: "absolute",
  top: "calc(100% + 4px)",
  right: 0,
  minWidth: "180px",
  backgroundColor: colorContract.surface.container,
  borderRadius: globalContract.shape.md,
  boxShadow: globalContract.elevation.level2,
  padding: `${globalContract.spacing.xs} 0`,
  listStyle: "none",
  margin: 0,
  zIndex: 100,
  overflow: "hidden",
});

export const splitDropdownItem = style({
  display: "flex",
  alignItems: "center",
  width: "100%",
  padding: `${globalContract.spacing.sm} ${globalContract.spacing.md}`,
  border: "none",
  backgroundColor: "transparent",
  color: colorContract.onSurface.default,
  fontFamily: globalContract.typography.fontFamily.brand,
  fontSize: globalContract.typography.label.large.fontSize,
  fontWeight: globalContract.typography.label.large.fontWeight,
  cursor: "pointer",
  textAlign: "left",
  ...focusTransition,

  ":hover": {
    backgroundColor: transparentHoverMix(colorContract.onSurface.default),
  },
  ":active": {
    backgroundColor: transparentActiveMix(colorContract.onSurface.default),
  },
  selectors: {
    "&:focus-visible": focusRing(),
    "&:disabled": {
      cursor: "not-allowed",
      opacity: colorContract.state.disabledOpacity,
    },
  },
});
