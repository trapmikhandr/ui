import { slotHeightPx } from "./calendar.constants";
import {
  useCalendarConfigContext,
  useCalendarDragTimeContext,
  useCalendarHourHeightContext,
} from "./calendar.context";
import { getLocalTimeFromISO } from "./calendar.utils";
import {
  draggedRangeBar,
  draggedRangeColumn,
  draggedRangeLabel,
} from "./dragged-time-calendar.css";

function minutesOf(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

/**
 * Time bar on the sticky time-column that mirrors the dragged event's range
 * (like Google Calendar). It shows the target time even when the day column
 * itself is currently out of view due to horizontal scrolling.
 */
export function DraggedTimeIndicator() {
  const { timeRange, timeStep, timezone, timeSlots } =
    useCalendarConfigContext();
  const { draggedTimeRange } = useCalendarDragTimeContext();
  const { hourHeight } = useCalendarHourHeightContext();

  if (!draggedTimeRange) return null;

  const startTime = getLocalTimeFromISO(
    draggedTimeRange.start.toISOString(),
    timezone,
  );
  const endTime = getLocalTimeFromISO(
    draggedTimeRange.end.toISOString(),
    timezone,
  );

  const rangeStart = minutesOf(startTime);
  const rangeEnd = minutesOf(endTime);
  const visibleStart = minutesOf(timeRange.start);
  const visibleEnd = minutesOf(timeRange.end);

  const clippedStart = Math.max(rangeStart, visibleStart);
  const clippedEnd = Math.min(rangeEnd, visibleEnd);
  if (clippedEnd <= clippedStart) return null;

  const slotHeight = slotHeightPx(timeStep, hourHeight);
  // Position uses transform (a Composite layer, without Layout/Paint on each drag tick).
  const translateY = `calc(${(clippedStart - visibleStart) / timeStep} * ${slotHeight})`;
  // +1px compensates for the subpixel gap between the bar's border-bottom and
  // the grid's hour line. It does not depend on timeStep, unlike a numerator
  // adjustment in minutes.
  const height = `calc(${(clippedEnd - clippedStart) / timeStep} * ${slotHeight} + 1px)`;

  return (
    <div
      className={draggedRangeColumn}
      style={{ gridRow: `2 / span ${timeSlots.length}` }}
      aria-hidden
    >
      <div
        className={draggedRangeBar}
        style={{ transform: `translateY(${translateY})`, height }}
      >
        <span className={draggedRangeLabel}>{startTime}</span>
        <span className={draggedRangeLabel}>{endTime}</span>
      </div>
    </div>
  );
}
