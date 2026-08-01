/**
 * DARK THEME
 *
 * Dark color theme based on M3.
 * Dark themes use lighter tones (80 instead of 40).
 */

import { createGlobalTheme } from "@vanilla-extract/css";
import { colorContractRaw } from "./contracts/color.contract.css";
import { colors } from "./primitives/colors";

// Helper for generating semantic colors from the palette (for success/warning).
const createDarkSemanticFromPalette = (palette: Record<string, string>) => ({
  base: palette["80"], // Lighter tone.
  on: palette["20"], // Dark text.
  container: palette["30"], // Dark container.
  onContainer: palette["90"], // Light text on the container.
});
const {
  schemes: { dark },
  palettes,
} = colors;

export const darkTheme = createGlobalTheme(
  '[data-theme="dark"]',
  colorContractRaw,
  {
    // === PRIMARY ===
    primary: {
      base: dark.primary,
      on: dark.onPrimary,
      container: dark.primaryContainer,
      onContainer: dark.onPrimaryContainer,
    },

    // === SECONDARY ===
    secondary: {
      base: dark.secondary,
      on: dark.onSecondary,
      container: dark.secondaryContainer,
      onContainer: dark.onSecondaryContainer,
    },

    // === TERTIARY ===
    tertiary: {
      base: dark.tertiary,
      on: dark.onTertiary,
      container: dark.tertiaryContainer,
      onContainer: dark.onTertiaryContainer,
    },

    // === ERROR ===
    error: {
      base: dark.error,
      on: dark.onError,
      container: dark.errorContainer,
      onContainer: dark.onErrorContainer,
    },

    // === SUCCESS (not in the scheme; use the palette) ===
    success: createDarkSemanticFromPalette(palettes.success),

    // === WARNING (not in the scheme; use the palette) ===
    warning: createDarkSemanticFromPalette(palettes.warning),

    // === SURFACE ===
    surface: {
      default: dark.surface,
      dim: dark.surfaceDim,
      bright: dark.surfaceBright,
      containerLowest: dark.surfaceContainerLowest,
      containerLow: dark.surfaceContainerLow,
      container: dark.surfaceContainer,
      containerHigh: dark.surfaceContainerHigh,
      containerHighest: dark.surfaceContainerHighest,
    },

    // === ON SURFACE ===
    onSurface: {
      // Primary text (headings and body).
      // Use schemes.dark.onSurface.
      default: dark.onSurface,
      // Secondary text (subtitles and placeholders).
      // Use schemes.dark.onSurfaceVariant.
      variant: dark.onSurfaceVariant,
      // Muted text (disabled and low-emphasis labels).
      // The scheme has no direct "muted" color.
      // Option A (opacity): use rgba, but it is difficult to map.
      // Option B (flat color): use outline, the lightest gray in the theme.
      muted: dark.outline,
    },

    // === OUTLINE ===
    outline: {
      default: dark.outline,
      variant: dark.outlineVariant,
    },

    // === INVERSE ===
    inverse: {
      surface: dark.inverseSurface,
      onSurface: dark.inverseOnSurface,
      primary: dark.inversePrimary,
    },

    // === SPECIAL ===
    scrim: dark.scrim,
    shadow: dark.primary,

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
        background: dark.secondaryContainer,
        text: dark.onSecondaryContainer,
      },
      // Current session - tertiary (teal, highlighted right now).
      ongoing: {
        background: dark.tertiaryContainer,
        text: dark.onTertiaryContainer,
      },
      // Completed session - success (green, "completed successfully").
      // Tone 20 rather than 30 keeps the same saturation as light.css.ts,
      // but is less noticeable on a dark background.
      completed: {
        background: palettes.success["20"],
        text: palettes.success["90"],
      },
      // Cancelled session - error (red).
      cancelled: {
        background: dark.errorContainer,
        text: dark.onErrorContainer,
      },
      // No-show - warning (yellow-orange, "needs attention"), not neutral gray.
      noShow: {
        background: palettes.warning["30"],
        text: palettes.warning["90"],
      },
      // Generated from a pattern but not saved - muted surface plus a dashed border in the component.
      pending: {
        background: dark.surfaceContainerHighest,
        text: dark.onSurfaceVariant,
      },
    },
  },
);
