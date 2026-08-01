import { createContext, type RefObject, useContext } from "react";
import type {
  CalendarEvent,
  DateString,
  TimeRange,
  TimeString,
  WeekDay,
  WorkingHoursConfig,
} from "./calendar.types";

export interface CalendarConfigContextValue {
  // Configuration
  columns: number;
  days: WeekDay[];
  weekOffset: number;
  weekStartsOn: WeekDay | "active";
  containerRef: RefObject<HTMLDivElement | null>;
  timeRange: TimeRange;
  timeStep: 15 | 30 | 60;
  timezone: string;

  // Configuration data
  workingHours: WorkingHoursConfig | null;
  minDate?: DateString;

  // Derived configuration values
  visibleDates: Date[];
  timeSlots: TimeString[];

  // Drag: isEventDragging changes twice per drag (start/end) and is needed by
  // grid-calendar.tsx (touchAction), so it remains here unlike
  // edgeNavDirection/isScrolledToLeft/isScrolledToRight (see CalendarEdgeNavContext).
  isEventDragging: boolean;

  // Helpers
  isWorkingHour: (date: DateString, time: TimeString) => boolean;
  isDroppable: (date: DateString, time: TimeString) => boolean;

  // Actions
  navigate: (direction: "prev" | "next" | "today" | Date) => void;

  // Callbacks
  onEventDrop?: (
    eventId: string,
    startDate: string,
    endDate: string,
    originalEvent: CalendarEvent,
  ) => void;
  onEventResize?: (eventId: string, startDate: string, endDate: string) => void;
  onEventClick?: (eventId: string, target: HTMLElement) => void;
  onSlotClick?: (date: DateString, time: TimeString) => void;
}

export interface CalendarDataContextValue {
  // State
  currentDate: Date;

  // Data
  events: CalendarEvent[];

  // Data access helpers
  getEventsForSlot: (date: DateString, time: TimeString) => CalendarEvent[];
}

// Narrow context for the live time range of the dragged event. It changes on
// every onDragOver tick; placing it in CalendarConfigContext would re-render
// the whole grid (every cell and event), rather than only the indicator bar.
// It is isolated so drag re-renders affect only DraggedTimeIndicator.
export interface CalendarDragTimeContextValue {
  draggedTimeRange: { start: Date; end: Date } | null;
}

// Separate context for hourHeight (Calendar prop; see getSlotHeight in
// calendar.constants.ts). It almost never changes (it is a static app prop),
// so it is isolated from CalendarConfigContext: changes to unrelated config
// fields (timeRange, workingHours, etc.) do not affect hourHeight consumers.
export interface CalendarHourHeightContextValue {
  hourHeight?: number;
}

// Separate context for the week-switch edge-zone hint.
// edgeNavDirection/isScrolledToLeft/isScrolledToRight change on every scroll
// event during a drag (see calendar.tsx). WeekSwitchZones is the only real
// consumer. They used to live in CalendarConfigContext, causing the whole grid
// (all events and days) to re-render even though no other component needed them.
export interface CalendarEdgeNavContextValue {
  edgeNavDirection: "left" | "right" | null;
  isScrolledToLeft: boolean;
  isScrolledToRight: boolean;
}

export const CalendarConfigContext =
  createContext<CalendarConfigContextValue | null>(null);
export const CalendarDataContext =
  createContext<CalendarDataContextValue | null>(null);
export const CalendarDragTimeContext =
  createContext<CalendarDragTimeContextValue | null>(null);
export const CalendarHourHeightContext =
  createContext<CalendarHourHeightContextValue | null>(null);
export const CalendarEdgeNavContext =
  createContext<CalendarEdgeNavContextValue | null>(null);

export function useCalendarConfigContext() {
  const context = useContext(CalendarConfigContext);
  if (!context) {
    throw new Error("useCalendarConfigContext must be used within <Calendar>");
  }
  return context;
}

export function useCalendarDataContext() {
  const context = useContext(CalendarDataContext);
  if (!context) {
    throw new Error("useCalendarDataContext must be used within <Calendar>");
  }
  return context;
}

export function useCalendarDragTimeContext() {
  const context = useContext(CalendarDragTimeContext);
  if (!context) {
    throw new Error(
      "useCalendarDragTimeContext must be used within <Calendar>",
    );
  }
  return context;
}

export function useCalendarHourHeightContext() {
  const context = useContext(CalendarHourHeightContext);
  if (!context) {
    throw new Error(
      "useCalendarHourHeightContext must be used within <Calendar>",
    );
  }
  return context;
}

export function useCalendarEdgeNavContext() {
  const context = useContext(CalendarEdgeNavContext);
  if (!context) {
    throw new Error("useCalendarEdgeNavContext must be used within <Calendar>");
  }
  return context;
}
