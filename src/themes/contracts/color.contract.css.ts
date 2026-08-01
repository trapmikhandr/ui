/**
 * COLOR CONTRACT
 *
 * Contract for M3-style color tokens.
 * Defines the structure, but not the values.
 * Values are provided by light.css.ts and dark.css.ts.
 *
 * M3 structure:
 * - primary, secondary, tertiary — accent colors
 * - error, success, warning — status colors (success/warning are M3 extensions)
 * - surface — surfaces and backgrounds
 * - outline — borders
 * - state — overlays for interaction states (hover, pressed, etc.)
 */

import { createThemeContract } from "@vanilla-extract/css";

// ═══════════════════════════════════════════════════════════════════════════
// INTERFACES WITH JSDOC
// ═══════════════════════════════════════════════════════════════════════════

type CSSVarFunction = `var(--${string})`;

/**
 * PRIMARY - Main accent elements
 * Used for primary actions and important interface elements.
 */
interface PrimaryContract {
  [key: string]: CSSVarFunction;
  /** Main action color. Use for action buttons, active elements, and FABs. */
  base: CSSVarFunction;
  /** Text/icons ON a primary background. Always use with primary.base for contrast. */
  on: CSSVarFunction;
  /** Soft background for primary elements. Use for chips, badges, and highlighted areas. */
  container: CSSVarFunction;
  /** Text on the container. Always use with primary.container for contrast. */
  onContainer: CSSVarFunction;
}

/**
 * SECONDARY - Secondary accent elements
 * Used for less important actions and interface elements.
 */
interface SecondaryContract {
  [key: string]: CSSVarFunction;
  /** Secondary action color. Use for secondary buttons, filters, and toggles. */
  base: CSSVarFunction;
  /** Text/icons ON a secondary background. */
  on: CSSVarFunction;
  /** Soft background for secondary elements. Use for tags and badges. */
  container: CSSVarFunction;
  /** Text on secondary.container. */
  onContainer: CSSVarFunction;
}

/**
 * TERTIARY - Additional accent elements
 * Used to create contrast with primary and secondary.
 */
interface TertiaryContract {
  [key: string]: CSSVarFunction;
  /** Tertiary color. Use for accents and contrasting elements. */
  base: CSSVarFunction;
  /** Text/icons ON a tertiary background. */
  on: CSSVarFunction;
  /** Soft background for tertiary elements. */
  container: CSSVarFunction;
  /** Text on tertiary.container. */
  onContainer: CSSVarFunction;
}

/**
 * ERROR - Errors and destructive actions
 * Used to display errors and warnings about destructive actions.
 */
interface ErrorContract {
  [key: string]: CSSVarFunction;
  /** Error color. Use for error messages, destructive buttons, and validation. */
  base: CSSVarFunction;
  /** Text/icons ON an error background. */
  on: CSSVarFunction;
  /** Soft error background. Use for alerts and error banners. */
  container: CSSVarFunction;
  /** Text on error.container. */
  onContainer: CSSVarFunction;
}

/**
 * SUCCESS - Successful actions (M3 extension)
 * Used to display successful results.
 */
interface SuccessContract {
  [key: string]: CSSVarFunction;
  /** Success color. Use for success notifications and confirmations. */
  base: CSSVarFunction;
  /** Text/icons ON a success background. */
  on: CSSVarFunction;
  /** Soft success background. Use for success banners and toasts. */
  container: CSSVarFunction;
  /** Text on success.container. */
  onContainer: CSSVarFunction;
}

/**
 * WARNING - Warnings (M3 extension)
 * Used to display warnings.
 */
interface WarningContract {
  [key: string]: CSSVarFunction;
  /** Warning color. Use for warning notifications. */
  base: CSSVarFunction;
  /** Text/icons ON a warning background. */
  on: CSSVarFunction;
  /** Soft warning background. Use for warning banners. */
  container: CSSVarFunction;
  /** Text on warning.container. */
  onContainer: CSSVarFunction;
}

/**
 * SURFACE - Surface hierarchy
 * Used to create depth and levels in the interface.
 * Each subsequent level creates more visual elevation.
 */
interface SurfaceContract {
  [key: string]: CSSVarFunction;
  /** Base application background. Use for the body background. */
  default: CSSVarFunction;
  /** Dimmed background. Use for subdued areas. */
  dim: CSSVarFunction;
  /** Bright background. Use for highlighted areas. */
  bright: CSSVarFunction;
  /** Lowest layer. Use for the page background and main layout. */
  containerLowest: CSSVarFunction;
  /** Low layer. Use for sidebars and navigation drawers. */
  containerLow: CSSVarFunction;
  /** Medium layer. Use for cards, panels, calendars, and lists. */
  container: CSSVarFunction;
  /** High layer. Use for dropdown menus and elevated elements. */
  containerHigh: CSSVarFunction;
  /** Highest layer. Use for modals, dialogs, and popover menus. */
  containerHighest: CSSVarFunction;
}

/**
 * ON SURFACE - Text on surface backgrounds
 * Used for text and icons on surface backgrounds.
 */
interface OnSurfaceContract {
  [key: string]: CSSVarFunction;
  /** Primary text. Use for headings, body text, and body content. */
  default: CSSVarFunction;
  /** Secondary text. Use for subtitles, descriptions, and metadata. */
  variant: CSSVarFunction;
  /** Muted text. Use for disabled elements, inactive items, and supporting text. */
  muted: CSSVarFunction;
}

/**
 * OUTLINE - Borders and dividers
 * Used to create borders and divider lines.
 */
interface OutlineContract {
  [key: string]: CSSVarFunction;
  /** Borders for important elements. Use for input borders, button borders, and active elements. */
  default: CSSVarFunction;
  /** Soft dividers. Use for grid lines, list dividers, and low-emphasis borders. */
  variant: CSSVarFunction;
}

/**
 * INVERSE - Inverted colors
 * Used to create contrast in special cases.
 */
interface InverseContract {
  [key: string]: CSSVarFunction;
  /** Inverted background. Use for snackbars and dark tooltips. */
  surface: CSSVarFunction;
  /** Text on an inverted background. */
  onSurface: CSSVarFunction;
  /** Primary color on an inverted background. */
  primary: CSSVarFunction;
}

/**
 * STATE LAYERS - Opacity for interaction states
 * Used with an element's main color to provide visual feedback.
 * Applied through rgba() or opacity.
 */
interface StateContract {
  [key: string]: CSSVarFunction;
  /** 0.08 - Hover effect. Use for button and link hover states. */
  hoverOpacity: CSSVarFunction;
  /** 0.12 - Press effect. Use for pressed button states. */
  pressedOpacity: CSSVarFunction;
  /** 0.12 - Focus effect. Use for focus rings and focus states. */
  focusOpacity: CSSVarFunction;
  /** 0.16 - Drag effect. Use for dragged element states. */
  dragOpacity: CSSVarFunction;
  /** 0.38 - Disabled opacity. Use for disabled text and icons. */
  disabledOpacity: CSSVarFunction;
  /** 0.12 - Disabled container opacity. Use for disabled button backgrounds. */
  disabledContainerOpacity: CSSVarFunction;
}

/**
 * EVENT STATUS - Colors for event statuses
 */
interface EventStatusContract {
  [key: string]: CSSVarFunction;
  /** Event background color. */
  background: CSSVarFunction;
  /** Event text color. */
  text: CSSVarFunction;
}

/**
 * EVENT - Colors for calendar events
 * Used to visually distinguish events by status.
 */
interface EventContract {
  [key: string]: EventStatusContract;
  /** Upcoming sessions. Use for scheduled events. */
  scheduled: EventStatusContract;
  /** Current session. Use for events in progress. */
  ongoing: EventStatusContract;
  /** Completed session. Use for finished events. */
  completed: EventStatusContract;
  /** Cancelled session. Use for cancelled events. */
  cancelled: EventStatusContract;
  /** Client no-show. Use for events the client did not attend. */
  noShow: EventStatusContract;
  /** Generated from a pattern but not saved yet. Use for schedule-generation previews. */
  pending: EventStatusContract;
}

/**
 * COLOR CONTRACT - Complete color-token interface
 */
export interface ColorContractType {
  /** Main accent elements. Primary actions and important elements. */
  primary: PrimaryContract;
  /** Secondary accent elements. Less important actions. */
  secondary: SecondaryContract;
  /** Additional accent elements. Contrast with primary/secondary. */
  tertiary: TertiaryContract;
  /** Errors and destructive actions. */
  error: ErrorContract;
  /** Successful actions (M3 extension). */
  success: SuccessContract;
  /** Warnings (M3 extension). */
  warning: WarningContract;
  /** Surface hierarchy. Depth and levels in the interface. */
  surface: SurfaceContract;
  /** Text on surface backgrounds. */
  onSurface: OnSurfaceContract;
  /** Borders and dividers. */
  outline: OutlineContract;
  /** Inverted colors. Contrast for special cases. */
  inverse: InverseContract;
  /** Backdrop for modals. Use for overlays beneath modal windows. */
  scrim: CSSVarFunction;
  /**
   * Shadow color (part of the M3 specification).
   * @deprecated Use globalContract.elevation.level1-5 instead of shadow directly.
   */
  shadow: CSSVarFunction;
  /** Opacity for interaction states (hover, pressed, focus, drag, disabled). */
  state: StateContract;
  /** Colors for calendar events. */
  event: EventContract;
}

// ═══════════════════════════════════════════════════════════════════════════
// CONTRACT IMPLEMENTATION
// ═══════════════════════════════════════════════════════════════════════════

const _colorContract = createThemeContract({
  primary: {
    base: null,
    on: null,
    container: null,
    onContainer: null,
  },

  secondary: {
    base: null,
    on: null,
    container: null,
    onContainer: null,
  },

  tertiary: {
    base: null,
    on: null,
    container: null,
    onContainer: null,
  },

  error: {
    base: null,
    on: null,
    container: null,
    onContainer: null,
  },

  success: {
    base: null,
    on: null,
    container: null,
    onContainer: null,
  },

  warning: {
    base: null,
    on: null,
    container: null,
    onContainer: null,
  },

  surface: {
    default: null,
    dim: null,
    bright: null,
    containerLowest: null,
    containerLow: null,
    container: null,
    containerHigh: null,
    containerHighest: null,
  },

  onSurface: {
    default: null,
    variant: null,
    muted: null,
  },

  outline: {
    default: null,
    variant: null,
  },

  inverse: {
    surface: null,
    onSurface: null,
    primary: null,
  },

  scrim: null,
  shadow: null,

  state: {
    hoverOpacity: null,
    pressedOpacity: null,
    focusOpacity: null,
    dragOpacity: null,
    disabledOpacity: null,
    disabledContainerOpacity: null,
  },

  event: {
    scheduled: {
      background: null,
      text: null,
    },
    ongoing: {
      background: null,
      text: null,
    },
    completed: {
      background: null,
      text: null,
    },
    cancelled: {
      background: null,
      text: null,
    },
    noShow: {
      background: null,
      text: null,
    },
    pending: {
      background: null,
      text: null,
    },
  },
});

/**
 * Internal contract used by createGlobalTheme.
 * @internal
 */
export const colorContractRaw = _colorContract;

/**
 * colorContract with JSDoc typing for IDE support.
 * Use this object to access color tokens in components.
 */
export const colorContract: ColorContractType =
  _colorContract as unknown as ColorContractType;

export type ColorContract = typeof _colorContract;
