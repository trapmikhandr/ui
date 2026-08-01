/**
 * THEME
 *
 * Design system based on Material Design 3.
 *
 * Usage:
 *
 * ```tsx
 * import { colorContract, globalContract, lightTheme, darkTheme } from '@/theme'
 *
 * // In a component:
 * const button = style({
 *   backgroundColor: colorContract.primary.base,
 *   padding: globalContract.spacing.md,
 *   borderRadius: globalContract.shape.md,
 *   fontSize: globalContract.typography.label.large.fontSize,
 * })
 *
 * // Switch the theme:
 * <div className={isDark ? darkTheme : lightTheme}>
 *   <App />
 * </div>
 * ```
 *
 * Token structure (M3):
 *
 * ┌─────────────────────────────────────────┐
 * │  PRIMITIVES (primitives/)               │
 * │  Base values — not used directly        │
 * │  by components                          │
 * └─────────────────────────────────────────┘
 *                    ↓
 * ┌─────────────────────────────────────────┐
 * │  CONTRACTS (contracts/)                 │
 * │  Token structure without values         │
 * │  colorContract — changes per theme      │
 * │  globalContract — remains unchanged     │
 * └─────────────────────────────────────────┘
 *                    ↓
 * ┌─────────────────────────────────────────┐
 * │  THEMES (themes/)                       │
 * │  Concrete token values                  │
 * │  lightTheme, darkTheme — CSS classes    │
 * │  global — applied to :root              │
 * └─────────────────────────────────────────┘
 */

// Predefined animations for components
export * from "./animations.css";
// Single source of truth for sprinkles conditions and @media keys
export * from "./breakpoints";
// Contracts used by components
export type {
  ColorContract,
  DensityContract,
  GlobalContract,
} from "./contracts";
export { colorContract, densityContract, globalContract } from "./contracts";
export { darkTheme } from "./dark.css";
// CSS classes used to apply themes
export * from "./density.css";
export * from "./global.css";
export { lightTheme } from "./light.css";
// Primitives — usually not needed directly, but exported for customization
export {
  colors,
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  shapes,
  spacing,
} from "./primitives";
