import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { colorContract, globalContract } from "@/themes";

export const tabList = style({
  display: "flex",
  width: "100%",
  position: "relative",
  backgroundColor: colorContract.surface.default,
  overflowX: "auto",
  scrollbarWidth: "none",
  selectors: {
    "&::-webkit-scrollbar": { display: "none" },
  },
});

export const tabListBorder = style({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  height: 1,
  backgroundColor: colorContract.outline.variant,
});

export const tab = recipe({
  base: {
    flex: 1,
    minWidth: 64,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: globalContract.spacing.xs,
    border: "none",
    background: "none",
    cursor: "pointer",
    position: "relative",
    color: colorContract.onSurface.variant,
    fontFamily: globalContract.typography.fontFamily.brand,
    fontSize: globalContract.typography.title.small.fontSize,
    lineHeight: globalContract.typography.title.small.lineHeight,
    fontWeight: globalContract.typography.title.small.fontWeight,
    whiteSpace: "nowrap",
    transition: "color 0.2s ease",
    outline: "none",
    zIndex: 1,

    selectors: {
      "&:hover": {
        color: colorContract.onSurface.default,
      },
      "&:focus-visible": {
        outline: `2px solid ${colorContract.primary.base}`,
        outlineOffset: "-2px",
        borderRadius: globalContract.shape.xs,
      },
      "&:disabled": {
        opacity: 0.38,
        cursor: "not-allowed",
      },
    },
  },

  variants: {
    variant: {
      primary: {
        paddingTop: 6, // 6dp per spec (top to icon)
        paddingBottom: 16, // 16dp per spec (text to bottom/indicator)
        paddingInline: globalContract.spacing.lg, // 24dp per spec
        minHeight: 64,
      },
      secondary: {
        paddingTop: globalContract.spacing.sm, // 8dp
        paddingBottom: 16, // 16dp per spec (text to bottom/indicator)
        paddingInline: globalContract.spacing.md, // 16dp per spec
        minHeight: 48,
      },
    },
    isActive: {
      true: {},
      false: {},
    },
  },

  compoundVariants: [
    // Primary active: text = primary
    {
      variants: { variant: "primary", isActive: true },
      style: { color: colorContract.primary.base, fontWeight: "600" },
    },
    // Secondary active: text = on-surface (NOT primary)
    {
      variants: { variant: "secondary", isActive: true },
      style: { color: colorContract.onSurface.default, fontWeight: "600" },
    },
  ],

  defaultVariants: {
    variant: "secondary",
    isActive: false,
  },
});

export const tabIndicator = recipe({
  base: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: "3px 3px 0 0",
    backgroundColor: colorContract.primary.base,
    transform: "scaleX(0)",
    transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
    zIndex: 2,
  },

  variants: {
    variant: {
      // 2dp inset on each side per spec
      primary: { height: 3, left: 2, right: 2 },
      // Full width per spec
      secondary: { height: 2, left: 0, right: 0 },
    },
    isActive: {
      true: { transform: "scaleX(1)" },
      false: {},
    },
  },

  defaultVariants: {
    variant: "secondary",
    isActive: false,
  },
});

export const tabIcon = recipe({
  base: {
    fontSize: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 24,
    height: 24,
    color: colorContract.onSurface.variant,
    transition: "color 0.2s ease",
  },
  variants: {
    isActive: {
      true: { color: colorContract.primary.base },
      false: {},
    },
  },
});
