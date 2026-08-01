import { useDroppable } from "@dnd-kit/core";
import { useCalendarConfigContext } from "./calendar.context";
import type { DateString, TimeString } from "./calendar.types";
import { generateTimestampId } from "./calendar.utils";
import { timeSlotButton } from "./time-slot-calendar.css";

export interface CalendarTimeSlotProps {
  date: DateString;
  time: TimeString;
  gridColumn: number;
  gridRow: number;
}

export function CalendarTimeSlot({
  date,
  time,
  gridColumn,
  gridRow,
}: CalendarTimeSlotProps) {
  const { isWorkingHour, onSlotClick } = useCalendarConfigContext();

  const isWorking = isWorkingHour(date, time);

  const handleClick = () => {
    onSlotClick?.(date, time);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  const slotId = generateTimestampId(date, time);

  const { isOver, setNodeRef } = useDroppable({
    id: slotId,
    data: { date, time },
  });

  return (
    /* biome-ignore lint/a11y/noStaticElementInteractions: div acts as a droppable container with conditional button role */
    /* biome-ignore lint/a11y/useAriaPropsSupportedByRole: aria-label is valid for role="button" when isWorking is true */
    <div
      ref={setNodeRef}
      data-over={isOver}
      role={isWorking ? "button" : undefined}
      tabIndex={isWorking ? 0 : undefined}
      className={timeSlotButton({
        isWorking,
        isHour: time.endsWith(":00"),
      })}
      style={{
        gridColumn,
        gridRow,
      }}
      onClick={isWorking ? handleClick : undefined}
      onKeyDown={isWorking ? handleKeyDown : undefined}
      aria-label={`Time slot ${time} on ${date}`}
    />
  );
}
