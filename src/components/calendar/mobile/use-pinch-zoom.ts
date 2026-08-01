import { usePinch } from "@use-gesture/react";
import { type RefObject, useRef } from "react";
import { HOUR_HEIGHT_MAX, HOUR_HEIGHT_MIN } from "./mobile.constants";
import { hourHeightVar } from "./time-grid.css";

/** CSS variable name without the var(...) wrapper, for style.setProperty. */
export const HOUR_HEIGHT_VAR_NAME = hourHeightVar.slice(4, -1);

interface PinchZoomMemo {
  /** Initial distance between fingers. */
  d0: number;
  /** Hour height at gesture start. */
  h0: number;
  /** Pinch point relative to the top of the scroll container (px). */
  originY: number;
  /** Content position beneath the fingers in hours — the scale anchor. */
  contentHours: number;
}

interface UsePinchZoomArgs {
  /** Element that owns the hour-height CSS variable. */
  rootRef: RefObject<HTMLDivElement | null>;
  /** Grid's vertical scroll container (also the gesture target). */
  scrollRef: RefObject<HTMLDivElement | null>;
  /** Current hour height for JS calculations (dnd snapping, etc.). */
  hourHeightRef: { current: number };
  /** Disable zoom during other gestures (for example, dragging). */
  enabled?: boolean;
}

/**
 * Vertical pinch-to-zoom for the time grid: changes the hour-height CSS variable
 * directly (without a React re-render) and keeps the hour beneath the fingers
 * in place by adjusting scrollTop in the same frame.
 */
export function usePinchZoom({
  rootRef,
  scrollRef,
  hourHeightRef,
  enabled = true,
}: UsePinchZoomArgs) {
  const enabledRef = useRef(enabled);
  enabledRef.current = enabled;

  usePinch(
    ({ first, da: [distance], origin: [, originClientY], memo, event }) => {
      if (!enabledRef.current) return memo;

      // Ignore regular wheel scrolling (including mobile-browser overscroll emulation).
      // Allow only Ctrl pinch gestures on desktop trackpads.
      if (event && event.type === "wheel" && !(event as WheelEvent).ctrlKey) {
        return memo;
      }

      // Block native page zoom (eventOptions.passive: false).
      event.preventDefault();

      const scrollEl = scrollRef.current;
      const rootEl = rootRef.current;
      if (!scrollEl || !rootEl) return memo;

      let state = memo as PinchZoomMemo | undefined;
      if (first || !state) {
        const rect = scrollEl.getBoundingClientRect();
        const originY = originClientY - rect.top;
        const h0 = hourHeightRef.current;
        state = {
          d0: Math.max(distance, 1),
          h0,
          originY,
          contentHours: (scrollEl.scrollTop + originY) / h0,
        };
      }

      const scale = distance / state.d0;
      const height = Math.min(
        HOUR_HEIGHT_MAX,
        Math.max(HOUR_HEIGHT_MIN, state.h0 * scale),
      );

      hourHeightRef.current = height;
      rootEl.style.setProperty(HOUR_HEIGHT_VAR_NAME, `${height}px`);
      // Anchor: the hour beneath the fingers stays beneath them.
      scrollEl.scrollTop = state.contentHours * height - state.originY;

      return state;
    },
    {
      target: scrollRef,
      eventOptions: { passive: false },
    },
  );
}
