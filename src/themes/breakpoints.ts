/**
 * BREAKPOINTS
 *
 * Single source of truth for breakpoint values: sprinkles conditions and
 * @media keys in component *.css.ts files use these values so they stay in sync.
 */

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

export type BreakpointName = keyof typeof BREAKPOINTS;

export const media = {
  /** min-width: from the breakpoint and wider (mobile-first, like sprinkles conditions) */
  up(breakpoint: BreakpointName): string {
    return `screen and (min-width: ${BREAKPOINTS[breakpoint]}px)`;
  },
  /** max-width: up to and including the breakpoint (desktop-first, like component @media rules) */
  down(breakpoint: BreakpointName): string {
    return `screen and (max-width: ${BREAKPOINTS[breakpoint]}px)`;
  },
} as const;
