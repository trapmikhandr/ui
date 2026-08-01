import { keyframes, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { globalContract } from "@/themes";

export const fabMenuRoot = style({
  position: "relative",
  display: "inline-flex",
  flexDirection: "column",
  alignItems: "flex-end",
  gap: globalContract.spacing.md,
});

// Actions list — positioned above the trigger FAB
export const fabMenuActions = style({
  display: "flex",
  flexDirection: "column-reverse",
  alignItems: "flex-end",
  gap: globalContract.spacing.md,
  listStyle: "none",
  margin: 0,
  padding: 0,
});

const fadeIn = keyframes({
  from: { opacity: 0, transform: "scale(0.7) translateY(12px)" },
  to: { opacity: 1, transform: "scale(1) translateY(0)" },
});

const fadeOut = keyframes({
  from: { opacity: 1, transform: "scale(1) translateY(0)" },
  to: { opacity: 0, transform: "scale(0.7) translateY(12px)" },
});

export const fabMenuAction = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    gap: globalContract.spacing.md,
    justifyContent: "flex-end",
  },
  variants: {
    visible: {
      // fill-mode: both (not forwards) keeps the animation's initial frame
      // during the staggered animation-delay (fab-menu.tsx). Otherwise the
      // element is fully visible before its delay and suddenly drops away,
      // causing a flash when opening or closing.
      true: {
        animation: `${fadeIn} 0.2s ease both`,
        pointerEvents: "auto",
      },
      false: {
        animation: `${fadeOut} 0.15s ease both`,
        pointerEvents: "none",
      },
    },
  },
  defaultVariants: { visible: false },
});

export const fabMenuActionLabel = style({
  backgroundColor: globalContract.elevation.level0,
  color: "inherit",
  fontSize: globalContract.typography.label.large.fontSize,
  fontFamily: globalContract.typography.fontFamily.brand,
  fontWeight: globalContract.typography.label.large.fontWeight,
  padding: `${globalContract.spacing.xs} ${globalContract.spacing.sm}`,
  borderRadius: globalContract.shape.sm,
  whiteSpace: "nowrap",
  boxShadow: globalContract.elevation.level1,
  userSelect: "none",
});

export const fabMenuTriggerIcon = recipe({
  base: {
    display: "flex",
    transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
  },
  variants: {
    open: {
      true: { transform: "rotate(45deg)" },
      false: { transform: "rotate(0deg)" },
    },
  },
  defaultVariants: { open: false },
});
