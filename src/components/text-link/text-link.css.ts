import { recipe } from "@vanilla-extract/recipes";
import { focusRing } from "@/shared/utils";
import {
  colorContract,
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
} from "@/themes";

export const textLinkRecipe = recipe({
  base: {
    fontFamily: fontFamily.plain,
    textDecoration: "none",
    cursor: "pointer",
    transition: "color 0.2s ease, text-decoration 0.2s ease",

    ":hover": {
      textDecoration: "underline",
    },

    ":focus-visible": focusRing(),
  },

  variants: {
    variant: {
      bodyLarge: {
        fontSize: fontSize.bodyLarge,
        lineHeight: lineHeight.bodyLarge,
        letterSpacing: letterSpacing.bodyLarge,
        fontWeight: fontWeight.regular,
      },
      bodyMedium: {
        fontSize: fontSize.bodyMedium,
        lineHeight: lineHeight.bodyMedium,
        letterSpacing: letterSpacing.bodyMedium,
        fontWeight: fontWeight.regular,
      },
      bodySmall: {
        fontSize: fontSize.bodySmall,
        lineHeight: lineHeight.bodySmall,
        letterSpacing: letterSpacing.bodySmall,
        fontWeight: fontWeight.regular,
      },
      labelLarge: {
        fontSize: fontSize.labelLarge,
        lineHeight: lineHeight.labelLarge,
        letterSpacing: letterSpacing.labelLarge,
        fontWeight: fontWeight.medium,
      },
      labelMedium: {
        fontSize: fontSize.labelMedium,
        lineHeight: lineHeight.labelMedium,
        letterSpacing: letterSpacing.labelMedium,
        fontWeight: fontWeight.medium,
      },
      labelSmall: {
        fontSize: fontSize.labelSmall,
        lineHeight: lineHeight.labelSmall,
        letterSpacing: letterSpacing.labelSmall,
        fontWeight: fontWeight.medium,
      },
      inherit: {
        fontSize: "inherit",
        lineHeight: "inherit",
        letterSpacing: "inherit",
        fontWeight: "inherit",
      },
    },

    color: {
      primary: {
        color: colorContract.primary.base,
        ":hover": {
          color: colorContract.primary.base,
        },
      },
      secondary: {
        color: colorContract.secondary.base,
        ":hover": {
          color: colorContract.secondary.base,
        },
      },
      default: {
        color: colorContract.onSurface.default,
        ":hover": {
          color: colorContract.primary.base,
        },
      },
      inherit: {
        color: "inherit",
        ":hover": {
          color: colorContract.primary.base,
        },
      },
    },

    underline: {
      always: {
        textDecoration: "underline",
      },
      hover: {
        textDecoration: "none",
        ":hover": {
          textDecoration: "underline",
        },
      },
      none: {
        textDecoration: "none",
        ":hover": {
          textDecoration: "none",
        },
      },
    },
  },

  defaultVariants: {
    variant: "bodyMedium",
    color: "primary",
    underline: "hover",
  },
});
