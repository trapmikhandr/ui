/**
 * LIGHT THEME
 *
 * Light color theme based on M3.
 * Values are taken from primitives/palettes.ts.
 */

import { createGlobalTheme } from "@vanilla-extract/css";
import { colorContractRaw } from "./contracts/color.contract.css";
import { colors } from "./primitives/colors";

// Helper for generating semantic colors from the palette (for success/warning).
const createSemanticFromPalette = (palette: Record<string, string>) => ({
  base: palette["40"],
  on: palette["100"],
  container: palette["90"],
  onContainer: palette["10"],
});
const {
  schemes: { light },
  palettes,
} = colors;

export const lightTheme = createGlobalTheme(
  '[data-theme="light"]',
  colorContractRaw,
  {
    // === PRIMARY ===
    primary: {
      base: light.primary,
      on: light.onPrimary,
      container: light.primaryContainer,
      onContainer: light.onPrimaryContainer,
    },

    // === SECONDARY ===
    secondary: {
      base: light.secondary,
      on: light.onSecondary,
      container: light.secondaryContainer,
      onContainer: light.onSecondaryContainer,
    },

    // === TERTIARY ===
    tertiary: {
      base: light.tertiary,
      on: light.onTertiary,
      container: light.tertiaryContainer,
      onContainer: light.onTertiaryContainer,
    },

    // === ERROR ===
    error: {
      base: light.error,
      on: light.onError,
      container: light.errorContainer,
      onContainer: light.onErrorContainer,
    },

    // === SUCCESS (not in the scheme; use the palette) ===
    success: createSemanticFromPalette(palettes.success),

    // === WARNING (not in the scheme; use the palette) ===
    warning: createSemanticFromPalette(palettes.warning),

    // === SURFACE ===
    surface: {
      default: light.surface,
      dim: light.surfaceDim,
      bright: light.surfaceBright,
      containerLowest: light.surfaceContainerLowest,
      containerLow: light.surfaceContainerLow,
      container: light.surfaceContainer,
      containerHigh: light.surfaceContainerHigh,
      containerHighest: light.surfaceContainerHighest,
    },

    // === ON SURFACE ===
    onSurface: {
      // Primary text (headings and body).
      // Use schemes.light.onSurface.
      default: light.onSurface,
      // Secondary text (subtitles and placeholders).
      // Use schemes.light.onSurfaceVariant.
      variant: light.onSurfaceVariant,
      // Muted text (disabled and low-emphasis labels).
      // The scheme has no direct "muted" color.
      // Option A (opacity): use rgba, but it is difficult to map.
      // Option B (flat color): use outlineVariant, the lightest gray in the theme.
      muted: light.outlineVariant,
    },

    // === OUTLINE ===
    outline: {
      default: light.outline,
      variant: light.outlineVariant,
    },

    // === INVERSE ===
    inverse: {
      surface: light.inverseSurface,
      onSurface: light.inverseOnSurface,
      primary: light.inversePrimary,
    },

    // === SPECIAL ===
    scrim: light.scrim,
    shadow: light.primary,

    // === STATE LAYERS ===
    state: {
      hoverOpacity: "0.08",
      pressedOpacity: "0.10",
      focusOpacity: "0.10",
      dragOpacity: "0.16",
      disabledOpacity: "0.38",
      disabledContainerOpacity: "0.12",
    },

    // === EVENT - Calendar event colors ===
    event: {
      // Upcoming sessions use secondary (soft sage), not primary (the most common
      // status should not occupy the brand color) or neutral surface (it blends
      // with unavailable slots, which also use surface.container).
      scheduled: {
        background: light.secondaryContainer,
        text: light.onSecondaryContainer,
      },
      // Current session - tertiary (teal, highlighted right now).
      ongoing: {
        background: light.tertiaryContainer,
        text: light.onTertiaryContainer,
      },
      // Completed session - success (green, "completed successfully").
      // Tone 95 rather than 90: the static success palette has higher chroma
      // than M3-generated primary/secondary/tertiary, so tone 90 looks neon.
      completed: {
        background: palettes.success["95"],
        text: palettes.success["10"],
      },
      // Cancelled session - error (red).
      cancelled: {
        background: light.errorContainer,
        text: light.onErrorContainer,
      },
      // No-show - warning (yellow-orange, "needs attention"), not neutral gray.
      noShow: {
        background: palettes.warning["90"],
        text: palettes.warning["10"],
      },
      // Generated from a pattern but not saved - muted surface plus a dashed border in the component.
      pending: {
        background: light.surfaceContainerHighest,
        text: light.onSurfaceVariant,
      },
    },
  },
);
