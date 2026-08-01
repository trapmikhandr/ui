/**
 * Blends colors according to Material Design 3.
 * Hover = 8% content color over the background.
 */
export const hoverMix = (bg: string, fg: string) =>
  `color-mix(in srgb, ${bg}, ${fg} 8%)`;
