/**
 * calendar.constants.ts — single source of truth for schedule calendar dimensions and z-layers.
 *
 * All magic numbers are collected here: changing a value in one place applies
 * to the inline grid-template (grid-calendar.tsx) and all styles (cells, events,
 * current-time line, and scrolling). Values are build-time strings/numbers
 * inserted as regular CSS values.
 */

export const HEADER_HEIGHT = 56;
export const TIME_COL_WIDTH = 56;
/** Week-switch interval while holding drag-and-drop in edge zones (ms). */
export const EDGE_NAV_INTERVAL = 1000;

export const CALENDAR = {
  /**
   * Height of one HOUR in px — the base unit for grid height.
   * Slot height is derived from it and the time step (see slotHeightPx), so
   * changing the step changes the subdivision, not the calendar's total height.
   */
  hourHeight: 48,
  /** Height of the day header row. */
  headerHeight: `${HEADER_HEIGHT}px`,
  /** Width of the left time-label column. */
  timeColWidth: `${TIME_COL_WIDTH}px`,
  /** Minimum day-column width before horizontal scrolling is enabled. */
  dayMinWidth: "0px",
  /** Diameter of the day-number circle. */
  dayChipSize: "28px",
  /** Thickness of grid hairline borders. */
  gridLine: "1px",
  /** Thickness of the current-time line. */
  nowLineWidth: "2px",
  /** Diameter of the current-time marker dot. */
  nowDotSize: "9px",
  /** Width of the event's left accent bar. */
  eventAccentWidth: "3px",
  /** Scrollbar track width. */
  scrollbarSize: "10px",
  /** Transparent spacing around the scrollbar thumb. */
  scrollbarThumbInset: "2px",
} as const;

/**
 * @param hourHeight Optional hour-height override (`Calendar` prop).
 * When provided, slot height is proportional: hourHeight * (timeStep/60).
 * Otherwise, built-in values selected visually for each step are used.
 */
export function getSlotHeight(timeStep: number, hourHeight?: number): number {
  if (hourHeight !== undefined) {
    return Math.round(hourHeight * (timeStep / 60));
  }
  if (timeStep <= 15) return 20; // 4 slots × 20px = 80px/hour
  if (timeStep <= 30) return 40; // 2 slots × 40px = 80px/hour
  return CALENDAR.hourHeight;
}

export function slotHeightPx(timeStep: number, hourHeight?: number): string {
  return `${getSlotHeight(timeStep, hourHeight)}px`;
}

/** z-layers: events < current-time line < sticky header/column < drag overlay
 * (drawn over the opaque sticky time-column background, so it must be above it) < corner. */
export const CALENDAR_Z = {
  event: 0,
  nowLine: 1,
  sticky: 20,
  draggedRange: 21,
  corner: 30,
  edgeNavZone: 40,
} as const;

/** Width of the week-switch edge zone during drag (px), shared by coordinate
 * detection (handleDragMove) and the visual hint (WeekSwitchZones). */
export const EDGE_NAV_ZONE_WIDTH = 60;
