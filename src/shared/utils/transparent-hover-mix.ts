/**
 * Utility for transparent buttons (Text, Outlined).
 * Blends the text color with transparency.
 * 8% color + 92% transparency.
 */
export const transparentHoverMix = (fg: string) =>
  `color-mix(in srgb, ${fg} 8%, transparent)`;
