/**
 * Blends colors according to Material Design 3.
 * Pressed/Active = 12% content color over the background (M3 spec).
 */
export const activeMix = (bg: string, fg: string) =>
  `color-mix(in srgb, ${bg}, ${fg} 12%)`;
