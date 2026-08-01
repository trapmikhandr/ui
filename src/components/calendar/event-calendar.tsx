import { toZonedTime } from "date-fns-tz";
import { forwardRef } from "react";
import { EDGE_NAV_INTERVAL } from "./calendar.constants";
import {
  useCalendarConfigContext,
  useCalendarEdgeNavContext,
} from "./calendar.context";
import type { CalendarEvent as CalendarEventType } from "./calendar.types";
import { eventButton, eventTime, eventTitle } from "./event-calendar.css";

export interface CalendarEventProps
  extends React.ComponentPropsWithoutRef<"button"> {
  event: CalendarEventType;
  isDraggable?: boolean;
  isDragging?: boolean;
}

export const CalendarEvent = forwardRef<HTMLButtonElement, CalendarEventProps>(
  ({ event, style, onClick, isDraggable, isDragging, ...props }, ref) => {
    const { onEventClick, timeStep, timezone } = useCalendarConfigContext();
    const { edgeNavDirection } = useCalendarEdgeNavContext();

    const isEdgeNavActive = !!(isDraggable && edgeNavDirection);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onClick?.(e);
      onEventClick?.(event.id, e.currentTarget);
    };

    const start = new Date(event.startDate);
    const end = new Date(event.endDate);
    const durationMinutes = (end.getTime() - start.getTime()) / 60000;
    const span = Math.max(1, durationMinutes / timeStep);

    const dynamicStyle = {
      ...style,
      opacity: isDragging ? 0.3 : event.isGhost ? 0.5 : 1,
      // Span height is needed only inside the grid; dnd-kit controls DragOverlay size.
      height:
        style?.height ??
        (!isDraggable && span > 1
          ? `calc(${span * 100}% + ${span - 1}px)`
          : undefined),
      zIndex: isDragging ? 1 : span > 1 ? 10 : undefined,
      "--edge-nav-interval": `${EDGE_NAV_INTERVAL}ms`,
    } as React.CSSProperties;

    const formatTime = (date: Date) => {
      const zoned = toZonedTime(date, timezone);
      const h = String(zoned.getHours()).padStart(2, "0");
      const m = String(zoned.getMinutes()).padStart(2, "0");
      return `${h}:${m}`;
    };

    const timeRangeStr = `${formatTime(start)}–${formatTime(end)}`;

    return (
      <button
        ref={ref}
        type="button"
        className={eventButton({
          status: event.status ?? "scheduled",
          isDraggable,
          isEdgeNavActive,
        })}
        {...props}
        style={dynamicStyle}
        onClick={handleClick}
      >
        <span className={eventTitle}>{event.title}</span>
        {durationMinutes >= 30 && (
          <span className={eventTime}>{timeRangeStr}</span>
        )}
      </button>
    );
  },
);
