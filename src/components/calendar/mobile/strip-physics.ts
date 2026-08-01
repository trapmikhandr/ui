/**
 * strip-physics.ts — pure snap mathematics for the swipe carousel.
 *
 * Sign convention: moving left (movementPx < 0) moves forward in time
 * (positive day shift); moving right moves backward.
 */

import {
  FLICK_VELOCITY,
  PAGE_FRACTION,
  RUBBERBAND_COEF,
} from "./mobile.constants";
import { type StripMode, VISIBLE_COLUMNS } from "./mobile.types";

export interface SnapInput {
  /** Final track offset from its resting position (px). */
  movementPx: number;
  /** Signed horizontal velocity at release (px/ms). */
  velocityPxMs: number;
  /** Visible page width (px). */
  pageWidth: number;
  mode: StripMode;
}

/**
 * Day shift after release (0 means return to the starting position).
 *
 * - Flick (|v| ≥ FLICK_VELOCITY) advances a full page in the swipe direction,
 *   regardless of distance.
 * - A long swipe (≥ 50% of the width) advances a full page.
 * - Otherwise day/3day snap to the nearest day column (a micro-swipe rounds
 *   to 0 and returns), while week always returns to its starting position.
 */
export function resolveSnapShift({
  movementPx,
  velocityPxMs,
  pageWidth,
  mode,
}: SnapInput): number {
  if (pageWidth <= 0) return 0;

  const cols = VISIBLE_COLUMNS[mode];

  if (Math.abs(velocityPxMs) >= FLICK_VELOCITY) {
    return velocityPxMs < 0 ? cols : -cols;
  }

  if (Math.abs(movementPx) >= PAGE_FRACTION * pageWidth) {
    return movementPx < 0 ? cols : -cols;
  }

  if (mode === "week") return 0;

  const colWidth = pageWidth / cols;
  return Math.round(-movementPx / colWidth);
}

/**
 * Elastic resistance beyond [min, max]: outside the bounds, the track extends
 * only by RUBBERBAND_COEF of the excess distance.
 */
export function rubberband(value: number, min: number, max: number): number {
  if (value < min) return min - (min - value) * RUBBERBAND_COEF;
  if (value > max) return max + (value - max) * RUBBERBAND_COEF;
  return value;
}
