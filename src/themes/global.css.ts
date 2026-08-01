/**
 * GLOBAL THEME
 *
 * Tokens that do not change between light and dark themes.
 * Applied to :root once.
 */

import { createGlobalTheme, globalStyle } from "@vanilla-extract/css";
import { colorContract } from "./contracts/color.contract.css";
import {
  globalContract,
  globalContractRaw,
} from "./contracts/global.contract.css";
import { shapes } from "./primitives/shapes";
import { spacing } from "./primitives/spacing";
import {
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
} from "./primitives/typography";

createGlobalTheme(":root", globalContractRaw, {
  // === SPACING ===
  spacing: {
    none: spacing[0],
    xs: spacing[1], // 4px
    sm: spacing[2], // 8px
    smd: spacing[3], // 12px
    md: spacing[4], // 16px
    mdl: spacing[5], // 20px
    lg: spacing[6], // 24px
    xl: spacing[8], // 32px
    "2xl": spacing[12], // 48px
    "3xl": spacing[16], // 64px
  },

  // === TYPOGRAPHY ===
  typography: {
    // Font families
    fontFamily: {
      brand: fontFamily.brand,
      plain: fontFamily.plain,
      mono: fontFamily.mono,
    },

    // Display — Inter, semibold, tight tracking
    display: {
      large: {
        fontSize: fontSize.displayLarge,
        lineHeight: lineHeight.displayLarge,
        letterSpacing: "-0.015em",
        fontWeight: fontWeight.semibold,
      },
      medium: {
        fontSize: fontSize.displayMedium,
        lineHeight: lineHeight.displayMedium,
        letterSpacing: "-0.012em",
        fontWeight: fontWeight.semibold,
      },
      small: {
        fontSize: fontSize.displaySmall,
        lineHeight: lineHeight.displaySmall,
        letterSpacing: "-0.01em",
        fontWeight: fontWeight.semibold,
      },
    },

    // Headline — Inter, semibold, tight tracking
    headline: {
      large: {
        fontSize: fontSize.headlineLarge,
        lineHeight: lineHeight.headlineLarge,
        letterSpacing: "-0.01em",
        fontWeight: fontWeight.semibold,
      },
      medium: {
        fontSize: fontSize.headlineMedium,
        lineHeight: lineHeight.headlineMedium,
        letterSpacing: "-0.008em",
        fontWeight: fontWeight.semibold,
      },
      small: {
        fontSize: fontSize.headlineSmall,
        lineHeight: lineHeight.headlineSmall,
        letterSpacing: "-0.005em",
        fontWeight: fontWeight.semibold,
      },
    },

    // Title
    title: {
      large: {
        fontSize: fontSize.titleLarge,
        lineHeight: lineHeight.titleLarge,
        letterSpacing: letterSpacing.titleLarge,
        fontWeight: fontWeight.regular,
      },
      medium: {
        fontSize: fontSize.titleMedium,
        lineHeight: lineHeight.titleMedium,
        letterSpacing: letterSpacing.titleMedium,
        fontWeight: fontWeight.medium,
      },
      small: {
        fontSize: fontSize.titleSmall,
        lineHeight: lineHeight.titleSmall,
        letterSpacing: letterSpacing.titleSmall,
        fontWeight: fontWeight.medium,
      },
    },

    // Body
    body: {
      large: {
        fontSize: fontSize.bodyLarge,
        lineHeight: lineHeight.bodyLarge,
        letterSpacing: letterSpacing.bodyLarge,
        fontWeight: fontWeight.regular,
      },
      medium: {
        fontSize: fontSize.bodyMedium,
        lineHeight: lineHeight.bodyMedium,
        letterSpacing: letterSpacing.bodyMedium,
        fontWeight: fontWeight.regular,
      },
      small: {
        fontSize: fontSize.bodySmall,
        lineHeight: lineHeight.bodySmall,
        letterSpacing: letterSpacing.bodySmall,
        fontWeight: fontWeight.regular,
      },
    },

    // Label
    label: {
      large: {
        fontSize: fontSize.labelLarge,
        lineHeight: lineHeight.labelLarge,
        letterSpacing: letterSpacing.labelLarge,
        fontWeight: fontWeight.medium,
      },
      medium: {
        fontSize: fontSize.labelMedium,
        lineHeight: lineHeight.labelMedium,
        letterSpacing: letterSpacing.labelMedium,
        fontWeight: fontWeight.medium,
      },
      small: {
        fontSize: fontSize.labelSmall,
        lineHeight: lineHeight.labelSmall,
        letterSpacing: letterSpacing.labelSmall,
        fontWeight: fontWeight.medium,
      },
    },
  },

  // === SHAPE ===
  shape: {
    none: shapes.none,
    xs: shapes.extraSmall,
    sm: shapes.small,
    md: shapes.medium,
    lg: shapes.large,
    xl: shapes.extraLarge,
    full: shapes.full,
  },

  // === Z-INDEX ===
  zIndex: {
    hide: "-1",
    base: "0",
    dropdown: "1000",
    sticky: "1100",
    fixed: "1200",
    modal: "1300",
    popover: "1400",
    tooltip: "1500",
  },

  // === ELEVATION (M3 Shadows) ===
  // Uses colorContract.shadow as the seed color for M3 tinted elevation.
  // Shadows are automatically recolored with the primary color when the theme changes.
  elevation: {
    level0: "0px 0px 0px 0px transparent",
    level1: `0px 1px 2px 0px color-mix(in srgb, ${colorContract.shadow}, transparent 70%), 0px 1px 3px 1px color-mix(in srgb, ${colorContract.shadow}, transparent 85%)`,
    level2: `0px 1px 2px 0px color-mix(in srgb, ${colorContract.shadow}, transparent 70%), 0px 2px 6px 2px color-mix(in srgb, ${colorContract.shadow}, transparent 85%)`,
    level3: `0px 4px 8px 3px color-mix(in srgb, ${colorContract.shadow}, transparent 85%), 0px 1px 3px 0px color-mix(in srgb, ${colorContract.shadow}, transparent 70%)`,
    level4: `0px 6px 10px 4px color-mix(in srgb, ${colorContract.shadow}, transparent 85%), 0px 2px 3px 0px color-mix(in srgb, ${colorContract.shadow}, transparent 70%)`,
    level5: `0px 8px 12px 6px color-mix(in srgb, ${colorContract.shadow}, transparent 85%), 0px 4px 4px 0px color-mix(in srgb, ${colorContract.shadow}, transparent 70%)`,
  },
});

globalStyle("html", {
  fontSize: "16px",
});

globalStyle("body", {
  margin: 0,
  fontFamily: globalContract.typography.fontFamily.brand,
  backgroundColor: colorContract.surface.default,
  color: colorContract.onSurface.default,
});

// Global scrollbar styles (Material Design 3).
globalStyle("*", {
  scrollbarWidth: "thin",
  scrollbarColor: `${colorContract.outline.variant} transparent`,
});

globalStyle("*::-webkit-scrollbar", {
  width: "8px",
  height: "8px",
});

globalStyle("*::-webkit-scrollbar-track", {
  backgroundColor: "transparent",
});

globalStyle("*::-webkit-scrollbar-thumb", {
  backgroundColor: colorContract.outline.variant,
  borderRadius: globalContract.shape.full,
});

globalStyle("*::-webkit-scrollbar-thumb:hover", {
  backgroundColor: colorContract.onSurface.variant,
});
