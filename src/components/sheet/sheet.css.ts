import { style } from "@vanilla-extract/css";
import { type RecipeVariants, recipe } from "@vanilla-extract/recipes";
import { colorContract, globalContract, media } from "@/themes";

// Base styles for the Sheet overlay (Scrim)
export const sheetOverlay = style({
  position: "fixed",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  display: "flex",
  zIndex: globalContract.zIndex.modal,
  backgroundColor: `color-mix(in srgb, ${colorContract.scrim} 32%, transparent)`,
});

// Recipe for the Sheet container
export const sheetRecipe = recipe({
  base: {
    position: "fixed",
    backgroundColor: colorContract.surface.containerHigh,
    display: "flex",
    flexDirection: "column",
    zIndex: globalContract.zIndex.modal,
    maxHeight: "100dvh",
    maxWidth: "100vw",
  },
  variants: {
    side: {
      right: {
        top: 0,
        bottom: 0,
        right: 0,
        borderTopLeftRadius: globalContract.shape.extraLarge,
        borderBottomLeftRadius: globalContract.shape.extraLarge,
      },
      left: {
        top: 0,
        bottom: 0,
        left: 0,
        borderTopRightRadius: globalContract.shape.extraLarge,
        borderBottomRightRadius: globalContract.shape.extraLarge,
      },
      bottom: {
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        maxHeight: "90dvh",
        borderTopLeftRadius: globalContract.shape.extraLarge,
        borderTopRightRadius: globalContract.shape.extraLarge,
      },
    },
    isModal: {
      true: {
        boxShadow: globalContract.elevation.level1,
      },
      false: {
        boxShadow: globalContract.elevation.level0,
      },
    },
  },
  compoundVariants: [
    {
      variants: { side: "right", isModal: true },
      style: { width: "380px" },
    },
    {
      variants: { side: "right", isModal: false },
      style: { width: "420px" },
    },
    {
      variants: { side: "left", isModal: true },
      style: { width: "380px" },
    },
    {
      variants: { side: "left", isModal: false },
      style: { width: "420px" },
    },
  ],
  defaultVariants: {
    side: "right",
    isModal: true,
  },
});

// Drag zone for Bottom Sheet: full-width strip at the top, drag starts only
// here — drag on the whole sheet would block touch scrolling of the body
export const dragHandleArea = style({
  alignSelf: "stretch",
  display: "flex",
  justifyContent: "center",
  paddingTop: globalContract.spacing.lg,
  paddingBottom: globalContract.spacing.sm,
  touchAction: "none",
  cursor: "grab",
  selectors: {
    "&:active": {
      cursor: "grabbing",
    },
  },
});

export const dragHandle = style({
  width: "32px",
  height: "4px",
  backgroundColor: colorContract.outline.variant,
  borderRadius: globalContract.shape.full,
});

export const sheetTitle = style({
  color: colorContract.onSurface.default,
  fontFamily: globalContract.typography.fontFamily.brand,
  fontSize: globalContract.typography.title.large.fontSize,
  fontWeight: globalContract.typography.title.large.fontWeight,
  lineHeight: globalContract.typography.title.large.lineHeight,
});

export const sheetHeader = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: globalContract.spacing.smd,
  flexShrink: 0,
  paddingTop: globalContract.spacing.lg,
  paddingLeft: globalContract.spacing.lg,
  paddingRight: globalContract.spacing.lg,
  paddingBottom: globalContract.spacing.md,
  "@media": {
    [media.down("md")]: {
      paddingTop: globalContract.spacing.md,
      paddingLeft: globalContract.spacing.md,
      paddingRight: globalContract.spacing.md,
    },
  },
});

export const sheetTitleWrapper = style({
  display: "flex",
  alignItems: "center",
  gap: globalContract.spacing.smd,
});

export const sheetBody = style({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  overflowY: "auto",
  paddingBottom: globalContract.spacing.lg,
  paddingLeft: globalContract.spacing.lg,
  paddingRight: globalContract.spacing.lg,
  "@media": {
    [media.down("md")]: {
      paddingBottom: globalContract.spacing.md,
      paddingLeft: globalContract.spacing.md,
      paddingRight: globalContract.spacing.md,
    },
  },
});

export type SheetVariants = RecipeVariants<typeof sheetRecipe>;
