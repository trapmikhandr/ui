/**
 * mobile.utils.ts — wall-clock date handling and event preparation.
 *
 * Every Date here is a toZonedTime result: local getters read time in the
 * calendar display time zone (the same convention as calendar.tsx).
 */

import { toZonedTime } from "date-fns-tz";
import type {
  CalendarEvent,
  DateString,
  TimeString,
  WeekDay,
  WorkingHoursConfig,
} from "../calendar.types";
import {
  checkIsWorkingHour,
  getWeekDay,
  toDateString,
  WEEK_DAYS,
} from "../calendar.utils";
import type { DayEventInterval } from "./mobile.types";

export function addWallDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function startOfWallDay(date: Date): Date {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

export function startOfWallWeek(date: Date, weekStartsOn: WeekDay): Date {
  const day = startOfWallDay(date);
  const shift = (day.getDay() - WEEK_DAYS.indexOf(weekStartsOn) + 7) % 7;
  return addWallDays(day, -shift);
}

/** Number of calendar days between two wall-clock dates (b - a). */
export function diffWallDays(a: Date, b: Date): number {
  const DAY_MS = 24 * 60 * 60 * 1000;
  return Math.round(
    (startOfWallDay(b).getTime() - startOfWallDay(a).getTime()) / DAY_MS,
  );
}

export function minutesToTimeString(minutes: number): TimeString {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function wallMinutesOfDay(date: Date): number {
  return date.getHours() * 60 + date.getMinutes();
}

/**
 * Groups events by local date; multi-day events appear on each day in the
 * range, with intervals clipped to day boundaries.
 */
export function groupEventsByDay(
  events: CalendarEvent[],
  timezone: string,
): Map<DateString, DayEventInterval[]> {
  const map = new Map<DateString, DayEventInterval[]>();

  for (const event of events) {
    const startZoned = toZonedTime(new Date(event.startDate), timezone);
    const endZoned = toZonedTime(new Date(event.endDate), timezone);
    if (endZoned <= startZoned) continue;

    const lastDay = startOfWallDay(endZoned);
    for (
      let day = startOfWallDay(startZoned);
      day <= lastDay;
      day = addWallDays(day, 1)
    ) {
      const dateStr = toDateString(day);
      const isFirst = day.getTime() === startOfWallDay(startZoned).getTime();
      const isLast = day.getTime() === lastDay.getTime();

      const startMin = isFirst ? wallMinutesOfDay(startZoned) : 0;
      const endMin = isLast ? wallMinutesOfDay(endZoned) : 1440;
      if (isLast && endMin === 0) continue; // The event ended exactly at midnight.

      let list = map.get(dateStr);
      if (!list) {
        list = [];
        map.set(dateStr, list);
      }
      list.push({ event, startMin, endMin });
    }
  }

  for (const list of map.values()) {
    list.sort((a, b) => a.startMin - b.startMin);
  }

  return map;
}

export interface MinuteInterval {
  startMin: number;
  endMin: number;
}

/** Step for checking unavailable intervals (minutes). */
const NON_WORKING_STEP = 30;

/**
 * Unavailable intervals for day background fill: check working hours in
 * 30-minute steps and merge adjacent unavailable segments.
 */
export function getNonWorkingIntervals(
  date: DateString,
  workingHours: WorkingHoursConfig | null,
  timezone: string,
  minDate?: DateString,
): MinuteInterval[] {
  if (minDate && date < minDate) return [{ startMin: 0, endMin: 1440 }];
  if (!workingHours) return [];

  const intervals: MinuteInterval[] = [];
  let current: MinuteInterval | null = null;

  for (let m = 0; m < 1440; m += NON_WORKING_STEP) {
    const isWorking = checkIsWorkingHour(
      date,
      minutesToTimeString(m),
      workingHours,
      timezone,
    );

    if (isWorking) {
      current = null;
    } else if (current) {
      current.endMin = m + NON_WORKING_STEP;
    } else {
      current = { startMin: m, endMin: m + NON_WORKING_STEP };
      intervals.push(current);
    }
  }

  return intervals;
}

/** Wall-clock date for a strip column (0 is the first buffer column). */
export function stripColumnDate(
  stripStart: Date,
  columnIndex: number,
): DateString {
  return toDateString(addWallDays(stripStart, columnIndex));
}

export function vibrate(ms: number): void {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(ms);
  }
}

export { getWeekDay, toDateString };
