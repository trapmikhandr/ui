import type {
  CalendarEvent,
  DateString,
  ISODateString,
  TimeString,
  WeekDay,
  WorkingHoursConfig,
} from "../calendar.types";

/** Mobile calendar display mode. */
export type MobileCalendarView = "schedule" | "day" | "3day" | "week";

/** Modes with a time grid (everything except agenda). */
export type StripMode = Exclude<MobileCalendarView, "schedule">;

export const VISIBLE_COLUMNS: Record<StripMode, number> = {
  day: 1,
  "3day": 3,
  week: 7,
};

export interface MobileCalendarProps {
  view: MobileCalendarView;

  // === Data ===
  events?: CalendarEvent[];
  workingHours?: WorkingHoursConfig;
  minDate?: DateString;

  // === Time ===
  /** IANA display time zone. Defaults to the browser time zone. */
  timezone?: string;
  /** First day of the week for week mode. */
  weekStartsOn?: WeekDay;
  /** Initial hour height in px (changed by pinch gestures within 35–120). */
  defaultHourHeight?: number;

  // === Navigation ===
  currentDate?: Date;
  onCurrentDateChange?: (date: Date) => void;
  isLoading?: boolean;

  // === Schedule view ===
  /** Hide days without events in schedule mode (like Google Calendar). */
  hideEmptyDays?: boolean;
  /** Visible day range changed (scroll/swipe) — signal to load more data. */
  onVisibleRangeChange?: (start: DateString, end: DateString) => void;

  // === Event callbacks ===
  onEventDrop?: (
    eventId: string,
    startDate: ISODateString,
    endDate: ISODateString,
    originalEvent: CalendarEvent,
  ) => void;
  onEventClick?: (eventId: string, target: HTMLElement) => void;
  onSlotClick?: (date: DateString, time: TimeString) => void;

  className?: string;
}

/** Event converted to minutes within a specific day (clipped to day boundaries). */
export interface DayEventInterval {
  event: CalendarEvent;
  /** Minutes from 00:00 on this day. */
  startMin: number;
  endMin: number;
}

/** Interval plus column calculated by the overlap layout. */
export interface PositionedDayEvent extends DayEventInterval {
  /** Column index within the overlapping-event cluster. */
  column: number;
  /** Total columns in the cluster (share the day's width equally). */
  columns: number;
}
