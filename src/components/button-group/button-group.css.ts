import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { globalContract } from "@/themes";

export const buttonGroup = recipe({
  base: {
    border: 0,
    margin: 0,
    padding: 0,
    display: "inline-flex",
    maxWidth: "100%",
    minInlineSize: 0,
  },
  variants: {
    orientation: {
      horizontal: {
        flexDirection: "row",
        alignItems: "center",
      },
      vertical: {
        flexDirection: "column",
        alignItems: "stretch",
      },
    },
    size: {
      xs: {},
      s: {},
      m: {},
      l: {},
      xl: {},
    },
    shape: {
      round: {},
      square: {},
    },
    variant: {
      standard: {
        flexWrap: "wrap",
      },
      connected: {
        gap: "2px",
        flexWrap: "nowrap",
      },
    },
  },
  compoundVariants: [
    {
      variants: { variant: "standard", size: "xs" },
      style: { gap: "18px" },
    },
    {
      variants: { variant: "standard", size: "s" },
      style: { gap: globalContract.spacing.smd },
    },
    {
      variants: { variant: "standard", size: "m" },
      style: { gap: globalContract.spacing.sm },
    },
    {
      variants: { variant: "standard", size: "l" },
      style: { gap: globalContract.spacing.sm },
    },
    {
      variants: { variant: "standard", size: "xl" },
      style: { gap: globalContract.spacing.sm },
    },
  ],
  defaultVariants: {
    orientation: "horizontal",
    variant: "standard",
    size: "m",
    shape: "round",
  },
});

export const buttonGroupStandard = style({});
export const buttonGroupConnected = style({});
