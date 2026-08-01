import { keyframes, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { focusRing } from "../../shared/utils/focus-ring";
import { colorContract, globalContract } from "../../themes";

const slideIn = keyframes({
  from: {
    transform: "translateX(100%)",
    opacity: 0,
  },
  to: {
    transform: "translateX(0)",
    opacity: 1,
  },
});

export const toastRegion = style({
  position: "fixed",
  bottom: globalContract.spacing.lg,
  right: globalContract.spacing.lg,
  display: "flex",
  flexDirection: "column",
  gap: globalContract.spacing.sm,
  zIndex: globalContract.zIndex.tooltip,
  outline: "none",
});

export const toast = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    gap: globalContract.spacing.md,
    padding: globalContract.spacing.md,
    paddingRight: globalContract.spacing.sm,
    borderRadius: globalContract.shape.md,
    boxShadow: globalContract.elevation.level3,
    minWidth: "280px",
    maxWidth: "400px",
    animation: `${slideIn} 200ms ease-out`,
    outline: "none",
  },
  variants: {
    variant: {
      info: {
        backgroundColor: colorContract.surface.containerHighest,
        color: colorContract.onSurface.default,
      },
      success: {
        backgroundColor: colorContract.success.container,
        color: colorContract.success.onContainer,
      },
      error: {
        backgroundColor: colorContract.error.container,
        color: colorContract.error.onContainer,
      },
      warning: {
        backgroundColor: colorContract.warning.container,
        color: colorContract.warning.onContainer,
      },
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

export const toastContent = style({
  flex: 1,
  fontSize: globalContract.typography.body.medium.fontSize,
  lineHeight: globalContract.typography.body.medium.lineHeight,
});

export const toastIcon = style({
  flexShrink: 0,
});

export const toastCloseButton = style({
  flexShrink: 0,
  padding: globalContract.spacing.xs,
  borderRadius: globalContract.shape.full,
  border: "none",
  background: "transparent",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "inherit",
  opacity: 0.7,
  transition: "opacity 150ms",
  ":hover": {
    opacity: 1,
  },
  ":focus-visible": focusRing(),
});
