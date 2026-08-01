import { keyframes } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { colorContract } from "@/themes";
import { CALENDAR_Z } from "./calendar.constants";

const nudgeLeft = keyframes({
  "0%, 100%": { transform: "translateX(0)" },
  "50%": { transform: "translateX(-4px)" },
});

const nudgeRight = keyframes({
  "0%, 100%": { transform: "translateX(0)" },
  "50%": { transform: "translateX(4px)" },
});

export const zone = recipe({
  base: {
    position: "fixed",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // Purely visual hint: edge detection uses coordinates in handleDragMove;
    // the zone must not intercept pointer events.
    pointerEvents: "none",
    zIndex: CALENDAR_Z.edgeNavZone,
    color: colorContract.primary.base,
    opacity: 0.6,
    transition: "opacity 150ms ease",
  },
  variants: {
    side: {
      left: {
        background: `linear-gradient(to right, ${colorContract.primary.container}, transparent)`,
      },
      right: {
        background: `linear-gradient(to left, ${colorContract.primary.container}, transparent)`,
      },
    },
    active: {
      true: { opacity: 1 },
      false: {},
    },
  },
});

export const zoneIcon = recipe({
  base: {
    // borderRadius: globalContract.shape.full,
    // backgroundColor: colorContract.primary.container,
    // color: colorContract.primary.onContainer,
    // padding: globalContract.spacing.xs,
  },
  variants: {
    side: {
      left: {},
      right: {},
    },
    active: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: { side: "left" },
      style: { animation: `${nudgeLeft} 600ms ease-in-out infinite` },
    },
    {
      variants: { side: "right" },
      style: { animation: `${nudgeRight} 600ms ease-in-out infinite` },
    },
  ],
});
