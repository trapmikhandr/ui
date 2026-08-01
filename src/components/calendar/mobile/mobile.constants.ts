/**
 * mobile.constants.ts — mobile calendar dimensions, gesture thresholds, and z-layers.
 *
 * Like calendar.constants.ts for desktop, all "magic" numbers are collected
 * here. Hour height is the only runtime value (a CSS variable changed by
 * pinch gestures); the rest are build-time values.
 */

/** CSS variable for hour height: the only source of vertical scale.
 * All grid top/height values use CSS calc() from it, so pinch-zoom does not
 * require a React re-render. */
export const HOUR_HEIGHT_VAR = "--cal-hour-height";

export const HOUR_HEIGHT_MIN = 35;
export const HOUR_HEIGHT_DEFAULT = 60;
export const HOUR_HEIGHT_MAX = 120;

/** Time quantization step during drag-and-drop (minutes). */
export const SNAP_MINUTES = 60;
/** Time quantization step when tapping an empty slot (minutes). */
export const TAP_SLOT_MINUTES = 60;

export const MOBILE_TIME_COL_WIDTH = 48;
export const MOBILE_HEADER_HEIGHT = 64;

// ── Swipe-carousel thresholds ────────────────────────────────────────────────

/** Speed (px/ms) above which release is treated as a flick gesture. */
export const FLICK_VELOCITY = 0.5;
/** Fraction of page width after which a swipe advances a full page. */
export const PAGE_FRACTION = 0.5;
/** Resistance coefficient when pulling beyond page-buffer boundaries. */
export const RUBBERBAND_COEF = 0.35;

// ── Drag-n-drop ──────────────────────────────────────────────────────────────

/** Edge-zone width (px); holding there advances the day during a drag. */
export const DAY_EDGE_NAV_ZONE = 28;
/** Day-advance interval while holding in the edge zone (ms). */
export const DAY_EDGE_NAV_INTERVAL = 650;
/** Vibration on drag activation (ms). */
export const DRAG_VIBRATE_MS = 50;
/** Short vibration tick when advancing a day in the edge zone (ms). */
export const EDGE_NAV_VIBRATE_MS = 15;

/** Mobile-grid z-layers: events < current-time line < sticky header/column. */
export const MOBILE_Z = {
  event: 1,
  nowLine: 2,
  sticky: 10,
  dragOverlay: 20,
} as const;
