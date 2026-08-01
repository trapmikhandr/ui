/**
 * schedule-editor.constants.ts — single source of truth for schedule-editor dimensions and z-layers.
 *
 * All "magic" numbers are collected here: changing a value in one place
 * updates the inline grid-template (grid-schedule-editor.tsx) and all styles
 * (cells and blocks).
 */

export const SCHEDULE_EDITOR = {
  /**
   * Height of one HOUR in px — the base grid-height unit.
   * Slot height is derived from it and the step (see slotHeightPx), so changing
   * the step changes the subdivision, not the overall calendar height.
   */
  hourHeight: 48,
  /** Height of the day-header row (auto-adjusted to content). */
  headerHeight: "auto",
  /** Width of the left column with time labels. */
  timeColWidth: "64px",
  /** Thickness of grid hairline borders. */
  gridLine: "1px",
} as const;

/**
 * Height of one slot for the current step. Cell height decreases as the step
 * decreases, but never drops below 32px to preserve clickability and readable time labels.
 */
export function slotHeightPx(timeStep: number): string {
  if (timeStep <= 15) return "32px";
  if (timeStep <= 30) return "40px";
  return `${SCHEDULE_EDITOR.hourHeight}px`;
}
