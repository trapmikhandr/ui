/**
 * Utility for transparent buttons (Text, Outlined).
 * Blends the text color with transparency.
 * 12% color + 88% transparency (M3 spec).
 */
export const transparentActiveMix = (fg: string) =>
  `color-mix(in srgb, ${fg} 12%, transparent)`;
