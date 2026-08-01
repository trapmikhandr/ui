import { forwardRef } from "react";
import { Draggable } from "@/components/drag-n-drop";
import type { CalendarEvent } from "../calendar.types";
import { getLocalTimeFromISO } from "../calendar.utils";
import { eventButton, eventTime, eventTitle } from "../event-calendar.css";
import { MOBILE_Z } from "./mobile.constants";
import type { PositionedDayEvent } from "./mobile.types";
import { hourHeightVar } from "./time-grid.css";

interface MobileEventChipProps
  extends React.ComponentPropsWithoutRef<"button"> {
  event: CalendarEvent;
  timezone: string;
  /** true — the chip lives in DragOverlay and fills the measured dnd-kit size. */
  isOverlay?: boolean;
  isDragging?: boolean;
  onEventClick?: (eventId: string, target: HTMLElement) => void;
}

/** Event chip: reuses the desktop calendar eventButton recipe,
 * but is positioned absolutely from the day's minutes (see MobilePositionedEvent). */
export const MobileEventChip = forwardRef<
  HTMLButtonElement,
  MobileEventChipProps
>(
  (
    { event, timezone, isOverlay, isDragging, onEventClick, style, ...props },
    ref,
  ) => {
    const start = getLocalTimeFromISO(event.startDate, timezone);
    const end = getLocalTimeFromISO(event.endDate, timezone);
    const durationMinutes =
      (new Date(event.endDate).getTime() -
        new Date(event.startDate).getTime()) /
      60000;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onEventClick?.(event.id, e.currentTarget);
    };

    return (
      <button
        ref={ref}
        type="button"
        className={eventButton({
          status: event.status ?? "scheduled",
          isDraggable: isOverlay,
        })}
        {...props}
        style={{
          ...style,
          opacity: isDragging ? 0.3 : event.isGhost ? 0.5 : undefined,
        }}
        onClick={handleClick}
      >
        <span className={eventTitle}>{event.title}</span>
        {durationMinutes >= 30 && (
          <span className={eventTime}>{`${start}–${end}`}</span>
        )}
      </button>
    );
  },
);

interface MobilePositionedEventProps {
  positioned: PositionedDayEvent;
  timezone: string;
  onEventClick?: (eventId: string, target: HTMLElement) => void;
}

/** Draggable wrapper plus inline geometry (top/height from the hour-height CSS
 * variable, left/width from the overlapping-event cluster column). */
export function MobilePositionedEvent({
  positioned,
  timezone,
  onEventClick,
}: MobilePositionedEventProps) {
  const { event, startMin, endMin, column, columns } = positioned;

  const widthPct = 100 / columns;

  return (
    <Draggable
      id={event.id}
      data={{ event }}
      disabled={event.isGhost || event.draggable === false}
      asChild
    >
      <MobileEventChip
        event={event}
        timezone={timezone}
        onEventClick={onEventClick}
        style={{
          position: "absolute",
          top: `calc(${hourHeightVar} * ${startMin / 60})`,
          height: `calc(${hourHeightVar} * ${(endMin - startMin) / 60})`,
          minHeight: "18px",
          left: `${column * widthPct}%`,
          width: `calc(${widthPct}% - 3px)`,
          zIndex: MOBILE_Z.event,
        }}
      />
    </Draggable>
  );
}
