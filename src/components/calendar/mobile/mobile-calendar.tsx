import {
  DndContext,
  type DragEndEvent,
  type DragMoveEvent,
  DragOverlay,
  type DragStartEvent,
  type Modifier,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import clsx from "clsx";
import { fromZonedTime, toZonedTime } from "date-fns-tz";
import { useCallback, useMemo, useRef, useState } from "react";
import type { CalendarEvent, DateString, TimeString } from "../calendar.types";
import { checkIsWorkingHour } from "../calendar.utils";
import {
  DAY_EDGE_NAV_INTERVAL,
  DAY_EDGE_NAV_ZONE,
  DRAG_VIBRATE_MS,
  EDGE_NAV_VIBRATE_MS,
  HOUR_HEIGHT_DEFAULT,
  SNAP_MINUTES,
} from "./mobile.constants";
import type { MobileCalendarProps, StripMode } from "./mobile.types";
import { VISIBLE_COLUMNS } from "./mobile.types";
import {
  addWallDays,
  groupEventsByDay,
  minutesToTimeString,
  startOfWallDay,
  startOfWallWeek,
  toDateString,
  vibrate,
} from "./mobile.utils";
import { mobileRoot } from "./mobile-calendar.css";
import { MobileEventChip } from "./mobile-event";
import { MobileScheduleView } from "./schedule-view";
import { dragOverlayChip } from "./time-grid.css";
import { TimeGridCarousel } from "./time-grid-carousel";

const MOUSE_SENSOR_OPTIONS = {
  activationConstraint: {
    distance: 5, // a regular click remains a click
  },
};

const TOUCH_SENSOR_OPTIONS = {
  activationConstraint: {
    delay: 250, // long-press delay for drag activation
    tolerance: 5, // larger movement scrolls/swipes, cancelling the drag
  },
};

/**
 * Mobile calendar: agenda plus a daily grid (1/3/7 days) with a gesture
 * carousel, pinch zoom, and drag-and-drop through long press.
 */
export function MobileCalendar(props: MobileCalendarProps) {
  const {
    view,
    events = [],
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone,
    currentDate: controlledDate,
    onCurrentDateChange,
    isLoading,
  } = props;

  const [uncontrolledDate, setUncontrolledDate] = useState(() => new Date());
  const currentDate = controlledDate ?? uncontrolledDate;

  const setCurrentDate = useCallback(
    (date: Date) => {
      if (onCurrentDateChange) {
        onCurrentDateChange(date);
      } else {
        setUncontrolledDate(date);
      }
    },
    [onCurrentDateChange],
  );

  const eventsByDay = useMemo(
    () => groupEventsByDay(events, timezone),
    [events, timezone],
  );

  if (view === "schedule") {
    return (
      <MobileScheduleView
        eventsByDay={eventsByDay}
        timezone={timezone}
        hideEmptyDays={props.hideEmptyDays ?? true}
        onVisibleRangeChange={props.onVisibleRangeChange}
        onEventClick={props.onEventClick}
        className={props.className}
        currentDate={currentDate}
        onCurrentDateChange={setCurrentDate}
        isLoading={isLoading}
      />
    );
  }

  return (
    <MobileGridView
      {...props}
      mode={view}
      events={events}
      timezone={timezone}
      eventsByDay={eventsByDay}
      currentDate={currentDate}
      setCurrentDate={setCurrentDate}
    />
  );
}

interface MobileGridViewProps extends MobileCalendarProps {
  mode: StripMode;
  events: CalendarEvent[];
  timezone: string;
  eventsByDay: ReturnType<typeof groupEventsByDay>;
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
}

/** Gets the finger/pointer X coordinate: activation point plus accumulated
 * delta (the same approach used in desktop calendar.tsx). */
function getDragClientX(event: DragMoveEvent): number | null {
  const activator = event.activatorEvent;
  if (!activator) return null;

  if ("clientX" in activator && typeof activator.clientX === "number") {
    return activator.clientX + event.delta.x;
  }
  if ("touches" in activator) {
    const touch =
      (activator as TouchEvent).touches?.[0] ??
      (activator as TouchEvent).changedTouches?.[0];
    if (touch && typeof touch.clientX === "number") {
      return touch.clientX + event.delta.x;
    }
  }
  return null;
}

function MobileGridView({
  mode,
  events,
  timezone,
  eventsByDay,
  currentDate,
  setCurrentDate,
  weekStartsOn = "mon",
  workingHours,
  minDate,
  defaultHourHeight = HOUR_HEIGHT_DEFAULT,
  onEventDrop,
  onEventClick,
  onSlotClick,
  className,
}: MobileGridViewProps) {
  const cols = VISIBLE_COLUMNS[mode];

  const zonedCurrent = useMemo(
    () => toZonedTime(currentDate, timezone),
    [currentDate, timezone],
  );

  const anchor = useMemo(
    () =>
      mode === "week"
        ? startOfWallWeek(zonedCurrent, weekStartsOn)
        : startOfWallDay(zonedCurrent),
    [mode, zonedCurrent, weekStartsOn],
  );

  const hourHeightRef = useRef(defaultHourHeight);
  const scrollRef = useRef<HTMLDivElement>(null);
  const bodyViewportRef = useRef<HTMLDivElement>(null);

  const [activeEvent, setActiveEvent] = useState<CalendarEvent | null>(null);
  const [previewSlot, setPreviewSlot] = useState<{
    date: DateString;
    time: TimeString;
  } | null>(null);

  // Refs for current values are used in setInterval callbacks and dnd-kit
  // callbacks to avoid stale closures.
  const activeEventRef = useRef(activeEvent);
  activeEventRef.current = activeEvent;
  const previewSlotRef = useRef(previewSlot);
  previewSlotRef.current = previewSlot;
  const zonedCurrentRef = useRef(zonedCurrent);
  zonedCurrentRef.current = zonedCurrent;
  const anchorRef = useRef(anchor);
  anchorRef.current = anchor;

  const edgeNavRef = useRef<{
    id: ReturnType<typeof setInterval>;
    direction: "left" | "right";
  } | null>(null);

  const clearEdgeNav = useCallback(() => {
    if (edgeNavRef.current) {
      clearInterval(edgeNavRef.current.id);
      edgeNavRef.current = null;
    }
  }, []);

  const startEdgeNav = useCallback(
    (direction: "left" | "right") => {
      if (edgeNavRef.current) {
        if (edgeNavRef.current.direction === direction) return;
        clearInterval(edgeNavRef.current.id);
      }

      // In week mode, edges switch the entire week; otherwise, they switch one day.
      const step = (mode === "week" ? 7 : 1) * (direction === "right" ? 1 : -1);

      const id = setInterval(() => {
        if (minDate) {
          const nextAnchor = addWallDays(anchorRef.current, step);
          if (toDateString(nextAnchor) < minDate) return;
        }
        vibrate(EDGE_NAV_VIBRATE_MS);
        setCurrentDate(
          fromZonedTime(addWallDays(zonedCurrentRef.current, step), timezone),
        );
      }, DAY_EDGE_NAV_INTERVAL);

      edgeNavRef.current = { id, direction };
    },
    [mode, minDate, setCurrentDate, timezone],
  );

  const onShiftDays = useCallback(
    (days: number) => {
      setCurrentDate(
        fromZonedTime(addWallDays(zonedCurrentRef.current, days), timezone),
      );
    },
    [setCurrentDate, timezone],
  );

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const found = events.find((e) => e.id === event.active.id);
      if (!found) return;
      vibrate(DRAG_VIBRATE_MS);
      setActiveEvent(found);
    },
    [events],
  );

  const handleDragMove = useCallback(
    (event: DragMoveEvent) => {
      const rect = bodyViewportRef.current?.getBoundingClientRect();
      const translated = event.active.rect.current?.translated;
      const dragged = activeEventRef.current;
      if (!rect || !translated || !dragged) return;

      const pointerX =
        getDragClientX(event) ?? translated.left + translated.width / 2;

      // Edge zones: holding switches a day (or a week in week mode).
      if (pointerX < rect.left + DAY_EDGE_NAV_ZONE) {
        startEdgeNav("left");
      } else if (pointerX > rect.right - DAY_EDGE_NAV_ZONE) {
        startEdgeNav("right");
      } else {
        clearEdgeNav();
      }

      // Target slot: the column comes from the finger's X coordinate, minutes from the event's top edge.
      const colWidth = rect.width / cols;
      const colIdx = Math.min(
        cols - 1,
        Math.max(0, Math.floor((pointerX - rect.left) / colWidth)),
      );
      const date = toDateString(addWallDays(anchorRef.current, colIdx));

      const yInGrid = translated.top - rect.top;
      const rawMinutes = (yInGrid / hourHeightRef.current) * 60;

      const durationMin =
        (new Date(dragged.endDate).getTime() -
          new Date(dragged.startDate).getTime()) /
        60000;
      const maxStart = Math.max(0, 1440 - durationMin);
      const minutes = Math.min(
        maxStart,
        Math.max(0, Math.round(rawMinutes / SNAP_MINUTES) * SNAP_MINUTES),
      );
      const time = minutesToTimeString(minutes);

      setPreviewSlot((prev) =>
        prev && prev.date === date && prev.time === time
          ? prev
          : { date, time },
      );
    },
    [cols, startEdgeNav, clearEdgeNav],
  );

  const handleDragEnd = useCallback(
    (_event: DragEndEvent) => {
      clearEdgeNav();
      const dragged = activeEventRef.current;
      const target = previewSlotRef.current;

      setActiveEvent(null);
      setPreviewSlot(null);

      if (!dragged || !target) return;

      if (minDate && target.date < minDate) return;
      if (
        !checkIsWorkingHour(
          target.date,
          target.time,
          workingHours ?? null,
          timezone,
        )
      ) {
        return;
      }

      // Wall-clock slot time to actual instant (same calculation as on desktop).
      const [year, month, day] = target.date.split("-").map(Number);
      const [hours, minutes] = target.time.split(":").map(Number);
      const newStart = fromZonedTime(
        new Date(year, month - 1, day, hours, minutes),
        timezone,
      );

      const durationMs =
        new Date(dragged.endDate).getTime() -
        new Date(dragged.startDate).getTime();
      const newEnd = new Date(newStart.getTime() + durationMs);

      onEventDrop?.(
        dragged.id,
        newStart.toISOString(),
        newEnd.toISOString(),
        dragged,
      );
    },
    [minDate, workingHours, timezone, onEventDrop, clearEdgeNav],
  );

  const handleDragCancel = useCallback(() => {
    clearEdgeNav();
    setActiveEvent(null);
    setPreviewSlot(null);
  }, [clearEdgeNav]);

  // The overlay snaps to the grid: X to day columns, Y to quarter-hours.
  const snapModifier = useCallback<Modifier>(
    ({ transform }) => {
      const rect = bodyViewportRef.current?.getBoundingClientRect();
      if (!rect) return transform;
      const quarter = hourHeightRef.current * (SNAP_MINUTES / 60);
      const colWidth = rect.width / cols;
      return {
        ...transform,
        x: Math.round(transform.x / colWidth) * colWidth,
        y: Math.round(transform.y / quarter) * quarter,
      };
    },
    [cols],
  );

  // The overlay event shows the target slot time in real time.
  const overlayEvent = useMemo(() => {
    if (!activeEvent) return null;
    if (!previewSlot) return activeEvent;

    const [year, month, day] = previewSlot.date.split("-").map(Number);
    const [hours, minutes] = previewSlot.time.split(":").map(Number);
    const newStart = fromZonedTime(
      new Date(year, month - 1, day, hours, minutes),
      timezone,
    );
    const durationMs =
      new Date(activeEvent.endDate).getTime() -
      new Date(activeEvent.startDate).getTime();

    return {
      ...activeEvent,
      startDate: newStart.toISOString(),
      endDate: new Date(newStart.getTime() + durationMs).toISOString(),
    };
  }, [activeEvent, previewSlot, timezone]);

  const sensors = useSensors(
    useSensor(MouseSensor, MOUSE_SENSOR_OPTIONS),
    useSensor(TouchSensor, TOUCH_SENSOR_OPTIONS),
  );

  return (
    <div className={clsx(mobileRoot, className)}>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragMove={handleDragMove}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <TimeGridCarousel
          mode={mode}
          anchor={anchor}
          timezone={timezone}
          eventsByDay={eventsByDay}
          workingHours={workingHours ?? null}
          minDate={minDate}
          defaultHourHeight={defaultHourHeight}
          hourHeightRef={hourHeightRef}
          scrollRef={scrollRef}
          bodyViewportRef={bodyViewportRef}
          isEventDragging={activeEvent !== null}
          onShiftDays={onShiftDays}
          onEventClick={onEventClick}
          onSlotClick={onSlotClick}
        />

        <DragOverlay modifiers={[snapModifier]} dropAnimation={null}>
          {overlayEvent ? (
            <div className={dragOverlayChip}>
              <MobileEventChip
                key={`${overlayEvent.id}-${overlayEvent.startDate}`}
                isOverlay
                event={overlayEvent}
                timezone={timezone}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
