import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { colorContract, globalContract } from "@/themes";

/**
 * Avatar color palette.
 * Use only accent colors (primary, secondary, tertiary).
 * Error/success/warning are semantic status colors, not identity colors.
 */
const avatarColors = [
  {
    bg: colorContract.primary.container,
    text: colorContract.primary.onContainer,
  },
  {
    bg: colorContract.secondary.container,
    text: colorContract.secondary.onContainer,
  },
  {
    bg: colorContract.tertiary.container,
    text: colorContract.tertiary.onContainer,
  },
] as const;

/**
 * Wrapper for positioning the status indicator.
 */
export const avatarWrapper = style({
  position: "relative",
  display: "inline-flex",
  flexShrink: 0,
});

export const avatarRecipe = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: globalContract.shape.full,
    fontFamily: globalContract.typography.fontFamily.brand,
    fontWeight: globalContract.typography.title.medium.fontWeight,
    flexShrink: 0,
    overflow: "hidden",
    userSelect: "none",
  },
  variants: {
    size: {
      small: {
        width: "32px",
        height: "32px",
        fontSize: globalContract.typography.label.medium.fontSize,
      },
      medium: {
        width: "40px",
        height: "40px",
        fontSize: globalContract.typography.title.small.fontSize,
      },
      large: {
        width: "56px",
        height: "56px",
        fontSize: globalContract.typography.title.medium.fontSize,
      },
      xlarge: {
        width: "72px",
        height: "72px",
        fontSize: globalContract.typography.title.large.fontSize,
      },
    },
    colorIndex: {
      0: {
        backgroundColor: avatarColors[0].bg,
        color: avatarColors[0].text,
      },
      1: {
        backgroundColor: avatarColors[1].bg,
        color: avatarColors[1].text,
      },
      2: {
        backgroundColor: avatarColors[2].bg,
        color: avatarColors[2].text,
      },
    },
  },
  defaultVariants: {
    size: "medium",
    colorIndex: 0,
  },
});

/**
 * Status indicator — a small circle in the avatar's bottom-right corner.
 * Shows connection status (success/warning/error).
 */
export const statusIndicatorRecipe = recipe({
  base: {
    position: "absolute",
    bottom: 0,
    right: 0,
    borderRadius: globalContract.shape.full,
    // border: `2px solid ${colorContract.surface.container}`,
    boxSizing: "content-box",
  },
  variants: {
    size: {
      small: {
        width: "8px",
        height: "8px",
      },
      medium: {
        width: "10px",
        height: "10px",
      },
      large: {
        width: "12px",
        height: "12px",
      },
      xlarge: {
        width: "14px",
        height: "14px",
      },
    },
    status: {
      success: {
        backgroundColor: colorContract.success.base,
      },
      warning: {
        backgroundColor: colorContract.warning.base,
      },
      error: {
        backgroundColor: colorContract.error.base,
      },
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

export const AVATAR_COLORS_COUNT = avatarColors.length;
