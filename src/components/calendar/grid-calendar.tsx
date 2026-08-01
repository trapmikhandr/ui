import { useEffect } from "react";
import { CALENDAR, getSlotHeight, slotHeightPx } from "./calendar.constants";
import {
  useCalendarConfigContext,
  useCalendarHourHeightContext,
} from "./calendar.context";
import { zonedNow } from "./calendar.utils";
import { CurrentTimeIndicator } from "./current-time-calendar";
import { CalendarDay } from "./day-calendar";
import { DraggedTimeIndicator } from "./dragged-time-calendar";
import { gridContainer } from "./grid-calendar.css";
import { CalendarTimeColumn } from "./time-column-calendar";
import { WeekSwitchZones } from "./week-switch-zone-calendar";

export function CalendarGrid() {
  const {
    timeSlots,
    visibleDates,
    timeStep,
    timeRange,
    timezone,
    containerRef,
    isEventDragging,
  } = useCalendarConfigContext();
  const { hourHeight } = useCalendarHourHeightContext();

  // Slot height depends on the step so the hour (and total calendar) height stays constant.
  const slotHeight = slotHeightPx(timeStep, hourHeight);

  // Scroll to the current time on mount.
  // biome-ignore lint/correctness/useExhaustiveDependencies: ref.current is read once on mount; reactivity is unnecessary.
  useEffect(() => {
    if (!containerRef.current) return;

    const now = zonedNow(timezone);
    const nowMinutes = now.getHours() * 60 + now.getMinutes();

    const [startHour, startMin] = timeRange.start.split(":").map(Number);
    const startMinutes = startHour * 60 + startMin;

    if (nowMinutes >= startMinutes) {
      const minutesFromStart = nowMinutes - startMinutes;
      const slotsFromStart = minutesFromStart / timeStep;
      const height = getSlotHeight(timeStep, hourHeight);

      const pxFromStart = slotsFromStart * height;
      const containerHeight = containerRef.current.clientHeight;

      // Position the current time roughly one third from the top for visual comfort.
      const scrollOffset = Math.max(0, pxFromStart - containerHeight / 3);

      containerRef.current.scrollTop = scrollOffset;
    }
  }, [timezone, timeStep, timeRange.start, hourHeight]);

  return (
    <div
      ref={containerRef}
      className={gridContainer}
      style={{
        gridTemplateColumns: `${CALENDAR.timeColWidth} repeat(${visibleDates.length}, minmax(${CALENDAR.dayMinWidth}, 1fr))`,
        gridTemplateRows: `${CALENDAR.headerHeight} repeat(${timeSlots.length}, ${slotHeight})`,
        touchAction: isEventDragging ? "none" : "auto",
      }}
    >
      <CalendarTimeColumn />

      {visibleDates.map((date, index) => (
        <CalendarDay
          key={date.toISOString()}
          date={date}
          columnIndex={index}
          isLast={index === visibleDates.length - 1}
        />
      ))}

      <CurrentTimeIndicator />
      <DraggedTimeIndicator />
      <WeekSwitchZones />
    </div>
  );
}
