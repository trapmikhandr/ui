import {
  DndContext,
  type DragEndEvent,
  type DragMoveEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  type Modifier,
  MouseSensor,
  pointerWithin,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { fromZonedTime, toZonedTime } from "date-fns-tz";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { EDGE_NAV_INTERVAL, TIME_COL_WIDTH } from "./calendar.constants";
import {
  CalendarConfigContext,
  type CalendarConfigContextValue,
  CalendarDataContext,
  type CalendarDataContextValue,
  CalendarDragTimeContext,
  type CalendarDragTimeContextValue,
  CalendarEdgeNavContext,
  type CalendarEdgeNavContextValue,
  CalendarHourHeightContext,
  type CalendarHourHeightContextValue,
} from "./calendar.context";
import type {
  CalendarEvent,
  CalendarProps,
  DateString,
  TimeString,
} from "./calendar.types";
import {
  WEEK_DAYS as ALL_DAYS,
  checkIsWorkingHour,
  generateTimestampId,
  getLocalDateFromISO,
  getLocalTimeFromISO,
  getTimeSlots,
  getVisibleDates,
  isDroppableSlotData,
} from "./calendar.utils";
import { CalendarEvent as Event } from "./event-calendar";

const DEFAULT_TIME_RANGE = { start: "00:00", end: "24:00" };

const MOUSE_SENSOR_OPTIONS = {
  activationConstraint: {
    distance: 5, // start dragging only after a 5px movement (preserves regular clicks)
  },
};

const TOUCH_SENSOR_OPTIONS = {
  activationConstraint: {
    delay: 250, // activation delay (ms)
    tolerance: 5, // allowed movement (px)
  },
};

export function Calendar({
  children,
  columns = 7,
  days = "all",
  weekOffset = 0,
  weekStartsOn = "mon",
  edgeNavTriggerMode = "pointer",
  timeRange = DEFAULT_TIME_RANGE,
  timeStep = 60,
  timezone = Intl.DateTimeFormat().resolvedOptions().timeZone,
  hourHeight,
  events = [],
  workingHours,
  minDate,
  currentDate: controlledDate,
  onCurrentDateChange,
  onNavigate,
  onEventDrop,
  onEventResize,
  onEventClick,
  onSlotClick,
}: CalendarProps) {
  // Controlled / uncontrolled. `currentDate` is the actual instant;
  // the weekday layout is calculated through `zonedCurrentDate` below.
  const [uncontrolledDate, setUncontrolledDate] = useState(() => new Date());
  const currentDate = controlledDate ?? uncontrolledDate;
  const zonedCurrentDate = useMemo(
    () => toZonedTime(currentDate, timezone),
    [currentDate, timezone],
  );

  // Drag state
  const [activeEvent, setActiveEvent] = useState<CalendarEvent | null>(null);
  const [overSlot, setOverSlot] = useState<{
    date: DateString;
    time: TimeString;
  } | null>(null);

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

  const containerRef = useRef<HTMLDivElement>(null);

  // Which edge zone is currently armed (the week-switch timer is ticking),
  // to highlight the WeekSwitchZones visual hint.
  const [edgeNavDirection, setEdgeNavDirection] = useState<
    "left" | "right" | null
  >(null);
  const [isScrolledToLeft, setIsScrolledToLeft] = useState(true);
  const [isScrolledToRight, setIsScrolledToRight] = useState(false);
  const scrollIntervalRef = useRef<{
    id: ReturnType<typeof setInterval>;
    direction: "left" | "right";
  } | null>(null);

  // Ref storing the current currentDate to avoid stale closures and functional updates in setInterval.
  const currentDateRef = useRef(currentDate);
  useEffect(() => {
    currentDateRef.current = currentDate;
  }, [currentDate]);

  const clearScrollInterval = useCallback(() => {
    setEdgeNavDirection(null);
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current.id);
      scrollIntervalRef.current = null;
    }
  }, []);

  const startScrollInterval = useCallback(
    (direction: "left" | "right") => {
      if (scrollIntervalRef.current) {
        if (scrollIntervalRef.current.direction === direction) return;
        clearInterval(scrollIntervalRef.current.id);
      }

      setEdgeNavDirection(direction);

      const intervalId = setInterval(() => {
        const newZoned = toZonedTime(currentDateRef.current, timezone);
        newZoned.setDate(
          newZoned.getDate() + (direction === "right" ? columns : -columns),
        );
        setCurrentDate(fromZonedTime(newZoned, timezone));
      }, EDGE_NAV_INTERVAL); // interval for switching weeks/ranges from constants (prevents overly fast jumps)

      scrollIntervalRef.current = { id: intervalId, direction };
    },
    [columns, timezone, setCurrentDate],
  );

  const handleDragMove = useCallback(
    (event: DragMoveEvent) => {
      const currentRect = event.active.rect.current?.translated;
      if (!containerRef.current || !currentRect) {
        clearScrollInterval();
        return;
      }

      const rect = containerRef.current.getBoundingClientRect();
      let dragX: number | null = null;

      // In "pointer" mode, try to get the pointer/touch coordinate.
      if (edgeNavTriggerMode === "pointer" && event.activatorEvent) {
        const activator = event.activatorEvent;
        if ("clientX" in activator && typeof activator.clientX === "number") {
          dragX = activator.clientX + event.delta.x;
        } else if (
          "touches" in activator &&
          (activator as TouchEvent).touches?.[0]
        ) {
          const touch = (activator as TouchEvent).touches[0];
          if (typeof touch.clientX === "number") {
            dragX = touch.clientX + event.delta.x;
          }
        } else if (
          "changedTouches" in activator &&
          (activator as TouchEvent).changedTouches?.[0]
        ) {
          const touch = (activator as TouchEvent).changedTouches[0];
          if (typeof touch.clientX === "number") {
            dragX = touch.clientX + event.delta.x;
          }
        }
      }

      // Fall back to the block center (or use it when "block" mode is selected).
      if (dragX === null) {
        dragX = currentRect.left + currentRect.width / 2;
      }

      const TRIGGER_THRESHOLD = 24;

      const scrollLeft = containerRef.current.scrollLeft;
      const scrollWidth = containerRef.current.scrollWidth;
      const clientWidth = containerRef.current.clientWidth;

      const scrolledToLeft = scrollLeft <= 8;
      const scrolledToRight = scrollLeft + clientWidth >= scrollWidth - 8;

      const isNearRight =
        dragX > rect.right - TRIGGER_THRESHOLD && scrolledToRight;
      const isNearLeft =
        dragX < rect.left + TRIGGER_THRESHOLD && scrolledToLeft;

      if (isNearRight) {
        startScrollInterval("right");
      } else if (isNearLeft) {
        startScrollInterval("left");
      } else {
        clearScrollInterval();
      }
    },
    [startScrollInterval, clearScrollInterval, edgeNavTriggerMode],
  );

  // Listen for scrolling during a drag to update edge-zone visibility in real time.
  useEffect(() => {
    const isDragging = activeEvent !== null;
    if (!isDragging || !containerRef.current) return;

    const checkScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      setIsScrolledToLeft(el.scrollLeft <= 8);
      setIsScrolledToRight(
        el.scrollLeft + el.clientWidth >= el.scrollWidth - 8,
      );
    };

    checkScroll();

    const el = containerRef.current;
    el.addEventListener("scroll", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
    };
  }, [activeEvent]);

  useEffect(() => {
    return () => clearScrollInterval();
  }, [clearScrollInterval]);

  // Normalize days.
  const allowedDays = days === "all" ? ALL_DAYS : days;

  // Calculate visible dates in the selected timezone layout.
  const visibleDates = useMemo(
    () =>
      getVisibleDates(
        zonedCurrentDate,
        columns,
        weekOffset,
        weekStartsOn,
        allowedDays,
      ),
    [zonedCurrentDate, columns, weekOffset, weekStartsOn, allowedDays],
  );

  // Calculate time slots.
  const timeSlots = useMemo(
    () => getTimeSlots(timeRange, timeStep),
    [timeRange, timeStep],
  );

  // Group events by slot for O(1) lookup.
  const eventsMap = useMemo(() => {
    const map = new Map<string, CalendarEvent[]>();

    for (const event of events) {
      // Ignore ghost items when calculating intersections/rendering.
      if (event.isGhost) continue;

      const dateStr = getLocalDateFromISO(event.startDate, timezone);
      const timeStr = getLocalTimeFromISO(event.startDate, timezone);
      const slotId = generateTimestampId(dateStr, timeStr);
      let slots = map.get(slotId);

      if (!slots) {
        slots = [];
        map.set(slotId, slots);
      }

      slots.push(event);
    }

    return map;
  }, [events, timezone]);

  const getEventsForSlot = useCallback(
    (date: DateString, time: TimeString): CalendarEvent[] => {
      const slotId = generateTimestampId(date, time);
      return eventsMap.get(slotId) ?? [];
    },
    [eventsMap],
  );

  const isWorkingHour = useCallback(
    (date: DateString, time: TimeString): boolean => {
      if (minDate && date < minDate) return false;
      return checkIsWorkingHour(date, time, workingHours ?? null, timezone);
    },
    [workingHours, minDate, timezone],
  );

  const isDroppable = useCallback(
    (date: DateString, time: TimeString): boolean => {
      return isWorkingHour(date, time);
    },
    [isWorkingHour],
  );

  // Navigation. prev/next shift the weekday pattern in the `timezone` layout,
  // then convert back to an actual instant. The exposed `currentDate` remains
  // a real instant, independent of the timezone.
  const navigate = useCallback(
    (direction: "prev" | "next" | "today" | Date) => {
      if (onNavigate && typeof direction === "string") {
        onNavigate(direction);
      }

      if (direction instanceof Date) {
        return setCurrentDate(direction);
      }

      if (direction === "today") {
        return setCurrentDate(new Date());
      }

      const newZonedDate = toZonedTime(currentDate, timezone);
      newZonedDate.setDate(
        newZonedDate.getDate() + (direction === "prev" ? -columns : columns),
      );

      setCurrentDate(fromZonedTime(newZonedDate, timezone));
    },
    [currentDate, columns, onNavigate, setCurrentDate, timezone],
  );

  const overlayEvent = useMemo(() => {
    if (!activeEvent) return null;
    if (!overSlot) return activeEvent;

    // Calculate new time boundaries in real time while moving the event.
    const originalStart = new Date(activeEvent.startDate);
    const originalEnd = new Date(activeEvent.endDate);
    const durationMs = originalEnd.getTime() - originalStart.getTime();

    const [year, month, day] = overSlot.date.split("-").map(Number);
    const [hours, minutes] = overSlot.time.split(":").map(Number);
    const newStart = fromZonedTime(
      new Date(year, month - 1, day, hours, minutes),
      timezone,
    );
    const newEnd = new Date(newStart.getTime() + durationMs);

    return {
      ...activeEvent,
      startDate: newStart.toISOString(),
      endDate: newEnd.toISOString(),
    };
  }, [activeEvent, overSlot, timezone]);

  // Isolated context: changes on every drag tick but re-renders
  // only DraggedTimeIndicator, not the entire grid (see calendar.context.ts).
  const dragTimeValue = useMemo<CalendarDragTimeContextValue>(
    () => ({
      draggedTimeRange: overlayEvent
        ? {
            start: new Date(overlayEvent.startDate),
            end: new Date(overlayEvent.endDate),
          }
        : null,
    }),
    [overlayEvent],
  );

  // Isolated context: hourHeight almost never changes (it is a static
  // app prop), so it is separate and unrelated config changes
  // (timeRange, workingHours, etc.) do not affect its consumers.
  const hourHeightValue = useMemo<CalendarHourHeightContextValue>(
    () => ({ hourHeight }),
    [hourHeight],
  );

  // Isolated context: changes on every scroll event during a drag
  // (see checkScroll above). WeekSwitchZones is the only consumer,
  // so these fields are separate from CalendarConfigContext.
  const edgeNavValue = useMemo<CalendarEdgeNavContextValue>(
    () => ({
      edgeNavDirection,
      isScrolledToLeft,
      isScrolledToRight,
    }),
    [edgeNavDirection, isScrolledToLeft, isScrolledToRight],
  );

  // Context values
  const configValue = useMemo<CalendarConfigContextValue>(
    () => ({
      columns,
      days: allowedDays,
      weekOffset,
      weekStartsOn,
      containerRef,
      isEventDragging: activeEvent !== null,
      timeRange,
      timeStep,
      timezone,
      workingHours: workingHours ?? null,
      visibleDates,
      timeSlots,
      isWorkingHour,
      isDroppable,
      navigate,
      onEventDrop,
      onEventResize,
      onEventClick,
      onSlotClick,
    }),
    [
      columns,
      allowedDays,
      weekOffset,
      weekStartsOn,
      activeEvent,
      timeRange,
      timeStep,
      timezone,
      workingHours,
      visibleDates,
      timeSlots,
      isWorkingHour,
      isDroppable,
      navigate,
      onEventDrop,
      onEventResize,
      onEventClick,
      onSlotClick,
    ],
  );

  const dataValue = useMemo<CalendarDataContextValue>(
    () => ({
      currentDate,
      events,
      getEventsForSlot,
    }),
    [currentDate, events, getEventsForSlot],
  );

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const { active } = event;
      const eventId = active.id;
      const found = events.find((e) => e.id === eventId);
      if (!found) return;

      setActiveEvent(found);
    },
    [events],
  );

  const handleDragOver = useCallback((event: DragOverEvent) => {
    const { over } = event;
    if (over && isDroppableSlotData(over.data.current)) {
      const { date, time } = over.data.current;
      setOverSlot({ date, time });
    } else {
      setOverSlot(null);
    }
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      clearScrollInterval();
      const { over } = event;

      // Read the event from state rather than active.data.current: after
      // cross-week navigation the original node is unmounted and dnd-kit
      // places an empty defaultData object in active.data.
      const draggedEvent = activeEvent;

      setActiveEvent(null);
      setOverSlot(null);

      if (!over || !draggedEvent) return;

      const overData = over.data.current;
      if (!isDroppableSlotData(overData)) {
        return;
      }

      const { date, time } = overData;

      if (!isWorkingHour(date, time)) {
        return;
      }

      // Create a date for the new slot: (year, month, day, hours, minutes)
      // are interpreted as wall-clock time in `timezone`, not the browser timezone.
      const [year, month, day] = date.split("-").map(Number);
      const [hours, minutes] = time.split(":").map(Number);

      const newStartDateObj = fromZonedTime(
        new Date(year, month - 1, day, hours, minutes),
        timezone,
      );
      const newStartDate = newStartDateObj.toISOString();

      // Preserve the same duration.
      const originalStart = new Date(draggedEvent.startDate);
      const originalEnd = new Date(draggedEvent.endDate);
      const durationMs = originalEnd.getTime() - originalStart.getTime();

      const newEndDate = new Date(
        newStartDateObj.getTime() + durationMs,
      ).toISOString();

      onEventDrop?.(draggedEvent.id, newStartDate, newEndDate, draggedEvent);
    },
    [onEventDrop, isWorkingHour, timezone, clearScrollInterval, activeEvent],
  );

  const handleDragCancel = useCallback(() => {
    clearScrollInterval();
    setActiveEvent(null);
    setOverSlot(null);
  }, [clearScrollInterval]);

  const calendarDragModifier = useCallback<Modifier>(
    ({ transform, activeNodeRect, over }) => {
      if (!containerRef.current || !activeNodeRect) {
        return transform;
      }

      const rect = containerRef.current.getBoundingClientRect();
      const minX = rect.left + TIME_COL_WIDTH;
      const maxX = rect.right - activeNodeRect.width;

      let targetX = transform.x;
      const targetY = over?.rect
        ? over.rect.top - activeNodeRect.top
        : transform.y;

      if (over?.rect) {
        targetX = over.rect.left - activeNodeRect.left;
      }

      // Clamp the X coordinate so the event does not move beyond the day columns.
      const currentLeft = activeNodeRect.left + targetX;
      const clampedLeft = Math.max(minX, Math.min(maxX, currentLeft));

      return {
        ...transform,
        x: clampedLeft - activeNodeRect.left,
        y: targetY,
      };
    },
    [],
  );

  const sensors = useSensors(
    useSensor(MouseSensor, MOUSE_SENSOR_OPTIONS),
    useSensor(TouchSensor, TOUCH_SENSOR_OPTIONS),
  );

  return (
    <CalendarConfigContext.Provider value={configValue}>
      <CalendarDataContext.Provider value={dataValue}>
        <CalendarDragTimeContext.Provider value={dragTimeValue}>
          <CalendarHourHeightContext.Provider value={hourHeightValue}>
            <CalendarEdgeNavContext.Provider value={edgeNavValue}>
              <DndContext
                sensors={sensors}
                collisionDetection={pointerWithin}
                onDragEnd={handleDragEnd}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragMove={handleDragMove}
                onDragCancel={handleDragCancel}
              >
                {children}
                <DragOverlay modifiers={[calendarDragModifier]}>
                  {overlayEvent ? (
                    <Event
                      key={`${overlayEvent.id}-${overlayEvent.startDate}-${currentDate.getTime()}`}
                      isDraggable
                      event={overlayEvent}
                    />
                  ) : null}
                </DragOverlay>
              </DndContext>
            </CalendarEdgeNavContext.Provider>
          </CalendarHourHeightContext.Provider>
        </CalendarDragTimeContext.Provider>
      </CalendarDataContext.Provider>
    </CalendarConfigContext.Provider>
  );
}
