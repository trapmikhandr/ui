import { toZonedTime } from "date-fns-tz";
import { Draggable } from "@/components/drag-n-drop";
import { getSlotHeight } from "./calendar.constants";
import {
  useCalendarConfigContext,
  useCalendarDataContext,
  useCalendarHourHeightContext,
} from "./calendar.context";
import { toDateString } from "./calendar.utils";
import { dayHeader, dayNumber, weekdayLabel } from "./day-calendar.css";
import { CalendarEvent } from "./event-calendar";
import { CalendarTimeSlot } from "./time-slot-calendar";

export interface CalendarDayProps {
  date: Date;
  columnIndex: number;
  isLast: boolean;
}

export function CalendarDay({ date, columnIndex, isLast }: CalendarDayProps) {
  const { timeSlots, timeRange, timeStep, timezone } =
    useCalendarConfigContext();
  const { events } = useCalendarDataContext();
  const { hourHeight } = useCalendarHourHeightContext();

  const dateString = toDateString(date);
  const isToday =
    dateString === toDateString(toZonedTime(new Date(), timezone));
  const gridColumn = columnIndex + 2;

  // Filter events for this day.
  const dayEvents = events.filter((event) => {
    const startZoned = toZonedTime(new Date(event.startDate), timezone);
    const endZoned = toZonedTime(new Date(event.endDate), timezone);
    const eventStartDayStr = toDateString(startZoned);
    const eventEndDayStr = toDateString(endZoned);
    return eventStartDayStr <= dateString && eventEndDayStr >= dateString;
  });

  const [sh, sm] = timeRange.start.split(":").map(Number);
  const [eh, em] = timeRange.end.split(":").map(Number);
  const dayStartMinutes = sh * 60 + sm;
  const dayEndMinutes = eh * 60 + em;

  const slotHeight = getSlotHeight(timeStep, hourHeight);
  const pxPerMinute = slotHeight / timeStep;

  return (
    <>
      <div className={dayHeader({ isLast })} style={{ gridColumn, gridRow: 1 }}>
        <span className={weekdayLabel}>
          {date.toLocaleDateString("ru-RU", { weekday: "short" })}
        </span>
        <span className={dayNumber({ isToday })}>{date.getDate()}</span>
      </div>

      {timeSlots.map((time, index) => (
        <CalendarTimeSlot
          key={time}
          date={dateString}
          time={time}
          gridColumn={gridColumn}
          gridRow={index + 2}
        />
      ))}

      {/* Absolute event overlay. */}
      {dayEvents.length > 0 &&
        (() => {
          // 1. Prepare intervals for each event.
          const computedEvents = dayEvents
            .map((event) => {
              const startZoned = toZonedTime(
                new Date(event.startDate),
                timezone,
              );
              const endZoned = toZonedTime(new Date(event.endDate), timezone);
              const eventStartDayStr = toDateString(startZoned);
              const eventEndDayStr = toDateString(endZoned);

              const startMinutes =
                eventStartDayStr < dateString
                  ? 0
                  : startZoned.getHours() * 60 + startZoned.getMinutes();

              const endMinutes =
                eventEndDayStr > dateString
                  ? 1440
                  : endZoned.getHours() * 60 + endZoned.getMinutes();

              const eventStart = Math.max(dayStartMinutes, startMinutes);
              const eventEnd = Math.min(dayEndMinutes, endMinutes);

              if (eventStart >= eventEnd) return null;

              const top = (eventStart - dayStartMinutes) * pxPerMinute;
              const height = (eventEnd - eventStart) * pxPerMinute;

              return {
                event,
                eventStart,
                eventEnd,
                top,
                height,
              };
            })
            .filter((item): item is NonNullable<typeof item> => item !== null)
            .sort(
              (a, b) => a.eventStart - b.eventStart || b.eventEnd - a.eventEnd,
            );

          if (computedEvents.length === 0) return null;

          // 2. Cluster events that overlap in time.
          type ComputedItem = (typeof computedEvents)[number] & {
            _colIndex?: number;
            _maxCols?: number;
          };

          const items: ComputedItem[] = computedEvents;
          const clusters: ComputedItem[][] = [];
          let currentCluster: ComputedItem[] = [];
          let currentClusterEnd = -1;

          for (const item of items) {
            if (
              currentCluster.length === 0 ||
              item.eventStart < currentClusterEnd
            ) {
              currentCluster.push(item);
              if (item.eventEnd > currentClusterEnd) {
                currentClusterEnd = item.eventEnd;
              }
            } else {
              clusters.push(currentCluster);
              currentCluster = [item];
              currentClusterEnd = item.eventEnd;
            }
          }
          if (currentCluster.length > 0) {
            clusters.push(currentCluster);
          }

          // 3. Distribute each cluster across sub-columns.
          for (const cluster of clusters) {
            const columns: ComputedItem[][] = [];

            for (const item of cluster) {
              let placed = false;
              for (let i = 0; i < columns.length; i++) {
                const lastInCol = columns[i][columns[i].length - 1];
                if (lastInCol.eventEnd <= item.eventStart) {
                  columns[i].push(item);
                  item._colIndex = i;
                  placed = true;
                  break;
                }
              }
              if (!placed) {
                item._colIndex = columns.length;
                columns.push([item]);
              }
            }

            const totalCols = columns.length;
            for (const item of cluster) {
              item._maxCols = totalCols;
            }
          }

          return (
            <div
              style={{
                gridColumn,
                gridRow: `2 / span ${timeSlots.length}`,
                position: "relative",
                pointerEvents: "none",
                width: "100%",
                height: "100%",
              }}
            >
              {items.map((item) => {
                const totalCols = item._maxCols || 1;
                const colIndex = item._colIndex || 0;

                const widthPercent = 100 / totalCols;
                const leftPercent = colIndex * widthPercent;

                return (
                  <Draggable
                    key={item.event.id}
                    id={item.event.id}
                    data={{ event: item.event }}
                    disabled={item.event.isGhost}
                    asChild
                  >
                    <CalendarEvent
                      event={item.event}
                      style={{
                        position: "absolute",
                        top: `${item.top}px`,
                        height: `${item.height}px`,
                        left: `calc(${leftPercent}% + 2px)`,
                        width: `calc(${widthPercent}% - 4px)`,
                        pointerEvents: "auto",
                      }}
                    />
                  </Draggable>
                );
              })}
            </div>
          );
        })()}
    </>
  );
}
