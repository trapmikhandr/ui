import { recipe } from "@vanilla-extract/recipes";
import { colorContract, globalContract } from "@/themes";

export const toolbar = recipe({
  base: {
    boxSizing: "border-box",
    alignItems: "center",
  },
  variants: {
    colorScheme: {
      standard: {
        backgroundColor: colorContract.surface.container,
        color: colorContract.onSurface.default,
      },
      vibrant: {
        backgroundColor: colorContract.primary.container,
        color: colorContract.primary.onContainer,
      },
    },
    variant: {
      docked: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
        minHeight: 64,
        padding: `${globalContract.spacing.sm} ${globalContract.spacing.md}`,
        borderTop: `1px solid ${colorContract.outline.variant}`,
      },
      floating: {
        display: "inline-flex",
        alignItems: "center",
        height: 64,
        padding: globalContract.spacing.sm,
        borderRadius: globalContract.shape.full,
        gap: globalContract.spacing.xs,
        boxShadow: globalContract.elevation.level2,
      },
    },
    orientation: {
      horizontal: { flexDirection: "row" },
      vertical: {
        flexDirection: "column",
        height: "auto",
        width: "fit-content",
      },
    },
    // On web / large screens a docked toolbar can be embedded inline with rounded corners
    rounded: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: { colorScheme: "vibrant", variant: "docked" },
      style: { borderTop: "none" },
    },
    {
      variants: { colorScheme: "standard", variant: "floating" },
      style: {
        backgroundColor: colorContract.surface.containerHighest,
        border: `1px solid ${colorContract.outline.variant}`,
        boxShadow: globalContract.elevation.level3,
      },
    },
    {
      variants: { variant: "docked", rounded: true },
      style: {
        borderRadius: globalContract.shape.md,
        borderTop: "none",
        border: `1px solid ${colorContract.outline.variant}`,
      },
    },
    {
      variants: { colorScheme: "vibrant", variant: "docked", rounded: true },
      style: {
        borderRadius: globalContract.shape.md,
        borderTop: "none",
        border: "none",
      },
    },
  ],
  defaultVariants: {
    colorScheme: "standard",
    variant: "docked",
    orientation: "horizontal",
    rounded: false,
  },
});
