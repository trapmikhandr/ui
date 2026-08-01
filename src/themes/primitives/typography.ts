/**
 * TYPOGRAPHY PRIMITIVES
 *
 * Base typography values.
 * Structure based on the M3 type scale:
 * display, headline, title, body, label
 *
 * Each category has large, medium, and small variants.
 */

export const fontFamily = {
  // The consuming application owns the actual brand font. This fallback keeps
  // the UI package usable without imposing a font or a font asset.
  brand:
    'var(--app-font-family-brand, system-ui, -apple-system, "Segoe UI", sans-serif)',
  plain: 'system-ui, -apple-system, "Segoe UI", sans-serif',
  mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
} as const;

export const fontWeight = {
  regular: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

export const fontSize = {
  // Display
  displayLarge: "3.5625rem", // 57px
  displayMedium: "2.8125rem", // 45px
  displaySmall: "2.25rem", // 36px

  // Headline
  headlineLarge: "2rem", // 32px
  headlineMedium: "1.75rem", // 28px
  headlineSmall: "1.5rem", // 24px

  // Title
  titleLarge: "1.375rem", // 22px
  titleMedium: "1rem", // 16px
  titleSmall: "0.875rem", // 14px

  // Body
  bodyLarge: "1rem", // 16px
  bodyMedium: "0.875rem", // 14px
  bodySmall: "0.75rem", // 12px

  // Label
  labelLarge: "0.875rem", // 14px
  labelMedium: "0.75rem", // 12px
  labelSmall: "0.6875rem", // 11px
} as const;

export const lineHeight = {
  // Display
  displayLarge: "4rem", // 64px
  displayMedium: "3.25rem", // 52px
  displaySmall: "2.75rem", // 44px

  // Headline
  headlineLarge: "2.5rem", // 40px
  headlineMedium: "2.25rem", // 36px
  headlineSmall: "2rem", // 32px

  // Title
  titleLarge: "1.75rem", // 28px
  titleMedium: "1.5rem", // 24px
  titleSmall: "1.25rem", // 20px

  // Body
  bodyLarge: "1.5rem", // 24px
  bodyMedium: "1.25rem", // 20px
  bodySmall: "1rem", // 16px

  // Label
  labelLarge: "1.25rem", // 20px
  labelMedium: "1rem", // 16px
  labelSmall: "1rem", // 16px
} as const;

export const letterSpacing = {
  // Display
  displayLarge: "-0.015625rem", // -0.25px
  displayMedium: "0",
  displaySmall: "0",

  // Headline
  headlineLarge: "0",
  headlineMedium: "0",
  headlineSmall: "0",

  // Title
  titleLarge: "0",
  titleMedium: "0.009375rem", // 0.15px
  titleSmall: "0.00625rem", // 0.1px

  // Body
  bodyLarge: "0.03125rem", // 0.5px
  bodyMedium: "0.015625rem", // 0.25px
  bodySmall: "0.025rem", // 0.4px

  // Label
  labelLarge: "0.00625rem", // 0.1px
  labelMedium: "0.03125rem", // 0.5px
  labelSmall: "0.03125rem", // 0.5px
} as const;

export type FontFamily = typeof fontFamily;
export type FontWeight = typeof fontWeight;
export type FontSize = typeof fontSize;
export type LineHeight = typeof lineHeight;
export type LetterSpacing = typeof letterSpacing;
