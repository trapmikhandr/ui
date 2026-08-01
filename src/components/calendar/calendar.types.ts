// ============================================
// BASIC TYPES
// ============================================

import type { PropsWithChildren } from "react";

export type WeekDay = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

/** ISO string: "2025-01-15T09:00:00Z" */
export type ISODateString = string;

/** Local time: "09:00", "14:30". */
export type TimeString = string;

/** Date without time: "2025-01-15". */
export type DateString = string;

export interface TimeRange {
  start: TimeString;
  end: TimeString;
}

// ============================================
// EVENTS
// ============================================

export type EventStatus =
  | "scheduled"
  | "ongoing"
  | "completed"
  | "cancelled"
  | "no_show"
  /** Generated from a pattern but not saved yet; unlike isGhost, it can be dragged. */
  | "pending"
  /** Projection of a future recurrence used to check conflicts in upcoming months. */
  | "future_pending";

export interface CalendarEvent {
  id: string;
  title: string;

  /** ISO string in UTC. */
  startDate: ISODateString;
  endDate: ISODateString;

  /** Event status: scheduled, ongoing, completed, or cancelled. */
  status?: EventStatus;
  description?: string;
  resizable?: boolean;
  draggable?: boolean;
  isGhost?: boolean;
}

// ============================================
// WORKING HOURS
// ============================================

export interface WorkingHoursConfig {
  /** Base schedule by weekday. */
  default: Partial<Record<WeekDay, TimeRange | TimeRange[] | null>>;

  /** Overrides for specific dates (format: "2025-01-15"). */
  overrides?: Record<DateString, TimeRange | TimeRange[] | null>;

  /** IANA timezone in which `default` is defined (defaults to the calendar display timezone). */
  timezone?: string;
}

// ============================================
// CALENDAR PROPS
// ============================================

export interface CalendarProps extends PropsWithChildren {
  // === Structure ===
  columns?: number;
  days?: "all" | WeekDay[];
  weekOffset?: number;
  weekStartsOn?: WeekDay | "active";
  /** Week-switch trigger mode during drag-and-drop.
   * "pointer" uses the mouse pointer position (default);
   * "block" uses the geometric center of the dragged event block. */
  edgeNavTriggerMode?: "pointer" | "block";

  // === Time ===
  timeRange?: TimeRange;
  timeStep?: 15 | 30 | 60;
  /** IANA display timezone (for example, "Europe/Moscow"). Defaults to the browser timezone. */
  timezone?: string;
  /** HOUR height in px; controls grid density for any timeStep
   * (slot height = hourHeight * timeStep/60). Built-in values are used when omitted
   * (see `getSlotHeight` in calendar.constants.ts). */
  hourHeight?: number;

  // === Data ===
  events?: CalendarEvent[];
  workingHours?: WorkingHoursConfig;
  minDate?: DateString;

  // === Navigation ===
  currentDate?: Date;
  onCurrentDateChange?: (date: Date) => void;
  onNavigate?: (direction: "prev" | "next" | "today") => void;

  // === Event callbacks ===
  onEventDrop?: (
    eventId: string,
    startDate: ISODateString,
    endDate: ISODateString,
    /** Original event. After cross-week movement it may no longer be present
     * in the visible week's event list, so the saved copy is exposed. */
    originalEvent: CalendarEvent,
  ) => void;
  onEventResize?: (
    eventId: string,
    startDate: ISODateString,
    endDate: ISODateString,
  ) => void;
  onEventClick?: (eventId: string, target: HTMLElement) => void;
  onSlotClick?: (date: DateString, time: TimeString) => void;
}
