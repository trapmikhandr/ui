import { useEffect, useState } from "react";
import { slotHeightPx } from "./calendar.constants";
import {
  useCalendarConfigContext,
  useCalendarHourHeightContext,
} from "./calendar.context";
import { toDateString, zonedNow } from "./calendar.utils";
import { nowColumn, nowDot, nowLine } from "./current-time-calendar.css";

function minutesOf(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

/**
 * Horizontal "now" line in today's column. It renders only when today is in
 * the visible range and the current time is inside timeRange.
 * The indicator is a grid element in the target column; its vertical position
 * uses the same slot height (slotHeightPx) as the grid rows.
 */
export function CurrentTimeIndicator() {
  const { visibleDates, timeSlots, timeRange, timeStep, timezone } =
    useCalendarConfigContext();
  const { hourHeight } = useCalendarHourHeightContext();
  const [now, setNow] = useState(() => zonedNow(timezone));

  useEffect(() => {
    setNow(zonedNow(timezone));
    const id = setInterval(() => setNow(zonedNow(timezone)), 60_000);
    return () => clearInterval(id);
  }, [timezone]);

  const today = toDateString(now);
  const todayIndex = visibleDates.findIndex((d) => toDateString(d) === today);
  if (todayIndex === -1) return null;

  const startMinutes = minutesOf(timeRange.start);
  const endMinutes = minutesOf(timeRange.end);
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  if (nowMinutes < startMinutes || nowMinutes >= endMinutes) return null;

  const slotsFromTop = (nowMinutes - startMinutes) / timeStep;
  const top = `calc(${slotsFromTop} * ${slotHeightPx(timeStep, hourHeight)})`;

  return (
    <div
      className={nowColumn}
      style={{
        gridColumn: todayIndex + 2,
        gridRow: `2 / span ${timeSlots.length}`,
      }}
      aria-hidden
    >
      <div className={nowLine} style={{ top }}>
        <span className={nowDot} />
      </div>
    </div>
  );
}
