import { fromZonedTime, toZonedTime } from "date-fns-tz";
import type {
  DateString,
  TimeRange,
  TimeString,
  WeekDay,
  WorkingHoursConfig,
} from "./calendar.types";

export const WEEK_DAYS: WeekDay[] = [
  "sun",
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
];
/**
 * Date → "2025-01-15"
 */
export function toDateString(date: Date): DateString {
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, "0");
  const d = date.getDate().toString().padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Date → "mon" | "tue" | ...
 */
export function getWeekDay(date: Date): WeekDay {
  return WEEK_DAYS[date.getDay()];
}

/**
 * Generates an array of visible dates.
 */
export function getVisibleDates(
  currentDate: Date,
  columns: number,
  weekOffset: number,
  weekStartsOn: WeekDay | "active",
  allowedDays: WeekDay[],
): Date[] {
  const dates: Date[] = [];

  const current = new Date(currentDate);
  const currentDayIndex = current.getDay();

  // Find the start of the week.
  const startOfWeekIndex =
    weekStartsOn === "active"
      ? currentDayIndex
      : WEEK_DAYS.indexOf(weekStartsOn);

  // Move to the start of the week (the offset is 0 for "active").
  const daysToSubtract = (currentDayIndex - startOfWeekIndex + 7) % 7;
  current.setDate(current.getDate() - daysToSubtract);

  // Apply weekOffset.
  current.setDate(current.getDate() + weekOffset * 7);

  // Collect dates.
  let collected = 0;
  const dayPointer = new Date(current);

  while (collected < columns) {
    const weekDay = getWeekDay(dayPointer);

    if (allowedDays.includes(weekDay)) {
      dates.push(new Date(dayPointer));
      collected++;
    }

    dayPointer.setDate(dayPointer.getDate() + 1);
  }

  return dates;
}

/**
 * Generates an array of time slots.
 */
export function getTimeSlots(timeRange: TimeRange, step: number): TimeString[] {
  const slots: TimeString[] = [];

  const [startHour, startMin] = timeRange.start.split(":").map(Number);
  const [endHour, endMin] = timeRange.end.split(":").map(Number);

  const startMinutes = startHour * 60 + startMin;
  const endMinutes = endHour * 60 + endMin;

  for (let m = startMinutes; m < endMinutes; m += step) {
    const h = Math.floor(m / 60);
    const min = m % 60;
    slots.push(
      `${h.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}`,
    );
  }

  return slots;
}

/**
 * Checks whether a time falls within working hours.
 *
 * `date`/`time` are given in `displayTimezone` (the calendar layout). If
 * `workingHours` has its own `timezone` (the timezone in which the weekly
 * pattern was defined) and it differs from `displayTimezone`, the point is
 * first converted to `workingHours.timezone`; otherwise the 09:00–18:00 pattern
 * would stay fixed to the same digits instead of shifting with events.
 */
export function checkIsWorkingHour(
  date: DateString,
  time: TimeString,
  workingHours: WorkingHoursConfig | null,
  displayTimezone: string,
): boolean {
  if (!workingHours) return true; // no restrictions

  // Check overrides (defined for an exact calendar date; do not shift them).
  if (workingHours.overrides?.[date] !== undefined) {
    const override = workingHours.overrides[date];
    if (override === null) return false; // day off
    return isMinutesInRanges(
      timeToMinutes(time),
      Array.isArray(override) ? override : [override],
    );
  }

  const sourceTimezone = workingHours.timezone ?? displayTimezone;

  const [y, m, d] = date.split("-").map(Number);
  const [h, min] = time.split(":").map(Number);

  let dayOfWeek: WeekDay;
  let minutesInSource: number;

  if (sourceTimezone === displayTimezone) {
    // Without an offset, use regular calendar arithmetic without date-fns-tz.
    dayOfWeek = getWeekDay(new Date(y, m - 1, d));
    minutesInSource = h * 60 + min;
  } else {
    const instant = fromZonedTime(
      new Date(y, m - 1, d, h, min),
      displayTimezone,
    );
    const zonedInSource = toZonedTime(instant, sourceTimezone);
    dayOfWeek = getWeekDay(zonedInSource);
    minutesInSource =
      zonedInSource.getHours() * 60 + zonedInSource.getMinutes();
  }

  const defaultHours = workingHours.default[dayOfWeek];
  if (defaultHours === null || defaultHours === undefined) return false;

  return isMinutesInRanges(
    minutesInSource,
    Array.isArray(defaultHours) ? defaultHours : [defaultHours],
  );
}

function isMinutesInRanges(minutes: number, ranges: TimeRange[]): boolean {
  return ranges.some((range) => {
    const start = timeToMinutes(range.start);
    const end = timeToMinutes(range.end);
    return minutes >= start && minutes < end;
  });
}

function timeToMinutes(time: TimeString): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

/**
 * Type guard for draggable event data.
 */
export function isDraggableEventData(
  data: unknown,
): data is { event: { id: string; startDate: string; endDate: string } } {
  if (!data || typeof data !== "object") return false;
  const obj = data as Record<string, unknown>;

  if (!obj.event || typeof obj.event !== "object") return false;
  const event = obj.event as Record<string, unknown>;

  return (
    typeof event.id === "string" &&
    typeof event.startDate === "string" &&
    typeof event.endDate === "string"
  );
}

/**
 * Type guard for droppable slot data.
 */
export function isDroppableSlotData(
  data: unknown,
): data is { date: DateString; time: TimeString } {
  if (!data || typeof data !== "object") return false;
  const obj = data as Record<string, unknown>;

  return typeof obj.date === "string" && typeof obj.time === "string";
}

/**
 * Generates a unique ID for a time slot.
 */
export function generateTimestampId(
  date: DateString,
  time: TimeString,
): string {
  return `${date}_${time}`;
}

/**
 * Converts an ISO string (UTC) to a time string ("HH:mm") in the given timezone.
 */
export function getLocalTimeFromISO(
  isoString: string,
  timezone: string,
): TimeString {
  const dateObj = toZonedTime(new Date(isoString), timezone);
  const h = dateObj.getHours().toString().padStart(2, "0");
  const m = dateObj.getMinutes().toString().padStart(2, "0");
  return `${h}:${m}`;
}

/**
 * Converts an ISO string (UTC) to a date string ("YYYY-MM-DD") in the given timezone.
 */
export function getLocalDateFromISO(
  isoString: string,
  timezone: string,
): DateString {
  return toDateString(toZonedTime(new Date(isoString), timezone));
}

/**
 * The current instant represented as the given timezone's wall-clock time.
 * Local getters (getHours/getDate/...) on the result read time in `timezone`.
 */
export function zonedNow(timezone: string): Date {
  return toZonedTime(new Date(), timezone);
}
