/**
 * SHAPE PRIMITIVES
 *
 * Border-radius values in the M3 style.
 * M3 uses semantic names for corner shapes.
 */

export const shapes = {
  none: "0",
  extraSmall: "0.25rem", // 4px
  small: "0.5rem", // 8px
  medium: "0.75rem", // 12px
  large: "1rem", // 16px
  extraLarge: "1.75rem", // 28px
  full: "9999px",
} as const;

export type Shapes = typeof shapes;
