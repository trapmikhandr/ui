import { recipe } from "@vanilla-extract/recipes";
import {
  colorContract,
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
} from "@/themes";
// Import the design tokens.

export const textRecipe = recipe({
  base: {
    margin: 0,
    fontFamily: fontFamily.plain, // Default font.
    textDecoration: "none",
  },

  variants: {
    // === M3 TYPE SCALE ===
    // Connect all tokens according to the M3 specification.
    variant: {
      // --- DISPLAY ---
      displayLarge: {
        fontSize: fontSize.displayLarge,
        lineHeight: lineHeight.displayLarge,
        letterSpacing: letterSpacing.displayLarge,
        fontWeight: fontWeight.regular,
      },
      displayMedium: {
        fontSize: fontSize.displayMedium,
        lineHeight: lineHeight.displayMedium,
        letterSpacing: letterSpacing.displayMedium,
        fontWeight: fontWeight.regular,
      },
      displaySmall: {
        fontSize: fontSize.displaySmall,
        lineHeight: lineHeight.displaySmall,
        letterSpacing: letterSpacing.displaySmall,
        fontWeight: fontWeight.regular,
      },

      // --- HEADLINE ---
      headlineLarge: {
        fontSize: fontSize.headlineLarge,
        lineHeight: lineHeight.headlineLarge,
        letterSpacing: letterSpacing.headlineLarge,
        fontWeight: fontWeight.regular,
      },
      headlineMedium: {
        fontSize: fontSize.headlineMedium,
        lineHeight: lineHeight.headlineMedium,
        letterSpacing: letterSpacing.headlineMedium,
        fontWeight: fontWeight.regular,
      },
      headlineSmall: {
        fontSize: fontSize.headlineSmall,
        lineHeight: lineHeight.headlineSmall,
        letterSpacing: letterSpacing.headlineSmall,
        fontWeight: fontWeight.regular,
      },

      // --- TITLE ---
      titleLarge: {
        fontSize: fontSize.titleLarge,
        lineHeight: lineHeight.titleLarge,
        letterSpacing: letterSpacing.titleLarge,
        fontWeight: fontWeight.regular, // Sometimes medium, but usually regular in M3.
      },
      titleMedium: {
        fontSize: fontSize.titleMedium,
        lineHeight: lineHeight.titleMedium,
        letterSpacing: letterSpacing.titleMedium,
        fontWeight: fontWeight.medium, // M3 specs
      },
      titleSmall: {
        fontSize: fontSize.titleSmall,
        lineHeight: lineHeight.titleSmall,
        letterSpacing: letterSpacing.titleSmall,
        fontWeight: fontWeight.medium,
      },

      // --- BODY ---
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

      // --- LABEL ---
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
    },

    // === COLORS ===
    color: {
      default: { color: colorContract.onSurface.default },
      variant: { color: colorContract.onSurface.variant },
      muted: { color: colorContract.onSurface.muted },
      primary: { color: colorContract.primary.base },
      error: { color: colorContract.error.base },
      success: { color: colorContract.success.base },
      inverse: { color: colorContract.inverse.onSurface },
      inherit: { color: "inherit" },
      warning: { color: colorContract.warning.base },
    },

    // === FONT FAMILY ===
    font: {
      brand: { fontFamily: fontFamily.brand },
      plain: { fontFamily: fontFamily.plain },
      mono: { fontFamily: fontFamily.mono },
    },

    // === WEIGHT (override) ===
    weight: {
      regular: { fontWeight: fontWeight.regular },
      medium: { fontWeight: fontWeight.medium },
      semibold: { fontWeight: fontWeight.semibold },
      bold: { fontWeight: fontWeight.bold },
    },

    align: {
      left: { textAlign: "left" },
      center: { textAlign: "center" },
      right: { textAlign: "right" },
      justify: { textAlign: "justify" },
    },

    truncate: {
      true: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "block",
        maxWidth: "100%",
      },
    },
  },

  defaultVariants: {
    variant: "bodyMedium",
    color: "default",
    font: "plain",
    align: "left",
  },
});
