import { useVirtualizer } from "@tanstack/react-virtual";
import clsx from "clsx";
import { toZonedTime } from "date-fns-tz";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import type { DateString } from "../calendar.types";
import { getLocalTimeFromISO, zonedNow } from "../calendar.utils";
import type { DayEventInterval } from "./mobile.types";
import { toDateString } from "./mobile.utils";
import {
  birthdayCard,
  dayChip,
  dayChipNumber,
  dayChipWeekday,
  dayEvents,
  dayRow,
  emptyDayNote,
  monthRow,
  monthRowIcon,
  monthRowText,
  scheduleEventCard,
  scheduleEventTime,
  scheduleEventTitle,
  scheduleRoot,
  scrollArea,
  stickyMonth,
  virtualInner,
  virtualRow,
} from "./schedule-view.css";

type ScheduleItem =
  | { type: "month"; key: string; label: string }
  | {
      type: "day";
      key: DateString;
      date: DateString;
      monthLabel: string;
      intervals: DayEventInterval[];
    };

function monthLabelOf(date: DateString): string {
  const [y, m] = date.split("-").map(Number);
  return new Date(y, m - 1, 1).toLocaleDateString("ru-RU", {
    month: "long",
    year: "numeric",
  });
}

function estimateItem(item: ScheduleItem): number {
  if (item.type === "month") return 144;
  const cards = Math.max(item.intervals.length, 1);
  return 16 + cards * 60;
}

const WinterSVG = () => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgba(255,255,255,0.25)"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    role="img"
    aria-label="Snowflake"
  >
    <line x1="12" y1="2" x2="12" y2="22" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
    <line x1="4.93" y1="19.07" x2="19.07" y2="4.93" />
    <polyline points="10 4 12 6 14 4" />
    <polyline points="10 20 12 18 14 20" />
    <polyline points="4 10 6 12 4 14" />
    <polyline points="20 10 22 12 20 14" />
  </svg>
);

const SpringSVG = () => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgba(255,255,255,0.25)"
    strokeWidth="1.5"
    role="img"
    aria-label="Flower"
  >
    <circle cx="12" cy="12" r="3" fill="rgba(255,255,255,0.15)" />
    <path d="M12 9c.8-2 2.5-3 4-3s2.5 1 2 2.5-3 3.2-6 3.5Z" />
    <path d="M15 12c2 .8 3 2.5 3 4s-1 2.5-2.5 2-3.2-3-3.5-6Z" />
    <path d="M12 15c-.8 2-2.5 3-4 3s-2.5-1-2-2.5 3-3.2 6-3.5Z" />
    <path d="M9 12c-2-.8-3-2.5-3-4s1-2.5 2.5-2 3.2 3 3.5 6Z" />
  </svg>
);

const SummerSVG = () => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgba(255,255,255,0.25)"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    role="img"
    aria-label="Sun"
  >
    <circle cx="12" cy="12" r="5" fill="rgba(255,255,255,0.15)" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const AutumnSVG = () => (
  <svg
    width="80"
    height="80"
    viewBox="0 0 24 24"
    fill="none"
    stroke="rgba(255,255,255,0.25)"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    role="img"
    aria-label="Leaf"
  >
    <path d="M12 2A10 10 0 0 0 2 12c0 4.4 3.6 8 8 8h2a10 10 0 0 0 10-10V2Z" />
    <path d="M12 2v20" />
    <path d="M12 12c2.5-2.5 5-2.5 5-2.5" />
    <path d="M12 16c1.5-1.5 3-1.5 3-1.5" />
    <path d="M12 8c1.5-1.5 3-1.5 3-1.5" />
  </svg>
);

const SEASONS_CONFIG: Record<
  number,
  {
    gradient: string;
    icon: string;
    color: string;
  }
> = {
  12: {
    gradient: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
    color: "#ffffff",
    icon: "winter",
  },
  1: {
    gradient: "linear-gradient(135deg, #2b5876 0%, #4e4376 100%)",
    color: "#ffffff",
    icon: "winter",
  },
  2: {
    gradient: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
    color: "#ffffff",
    icon: "winter",
  },
  3: {
    gradient: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    color: "#ffffff",
    icon: "spring",
  },
  4: {
    gradient: "linear-gradient(135deg, #3a7bd5 0%, #3a6073 100%)",
    color: "#ffffff",
    icon: "spring",
  },
  5: {
    gradient: "linear-gradient(135deg, #e94e77 0%, #f4d03f 100%)",
    color: "#ffffff",
    icon: "spring",
  },
  6: {
    gradient: "linear-gradient(135deg, #f12711 0%, #f5af19 100%)",
    color: "#ffffff",
    icon: "summer",
  },
  7: {
    gradient: "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)",
    color: "#ffffff",
    icon: "summer",
  },
  8: {
    gradient: "linear-gradient(135deg, #ff9966 0%, #ff5e62 100%)",
    color: "#ffffff",
    icon: "summer",
  },
  9: {
    gradient: "linear-gradient(135deg, #e65c00 0%, #F9D423 100%)",
    color: "#ffffff",
    icon: "autumn",
  },
  10: {
    gradient: "linear-gradient(135deg, #870000 0%, #190a05 100%)",
    color: "#ffffff",
    icon: "autumn",
  },
  11: {
    gradient: "linear-gradient(135deg, #616161 0%, #9bc5c3 100%)",
    color: "#ffffff",
    icon: "autumn",
  },
};

function MonthIllustrationRow({
  item,
}: {
  item: Extract<ScheduleItem, { type: "month" }>;
}) {
  const parts = item.key.split("-");
  const monthNum = parts.length >= 3 ? Number(parts[2]) : 1;
  const config = SEASONS_CONFIG[monthNum] || SEASONS_CONFIG[1];

  let decoration = <SummerSVG />;
  if (config.icon === "winter") decoration = <WinterSVG />;
  else if (config.icon === "spring") decoration = <SpringSVG />;
  else if (config.icon === "autumn") decoration = <AutumnSVG />;

  return (
    <div
      className={monthRow}
      style={{
        background: config.gradient,
        color: config.color,
      }}
    >
      <div className={monthRowText}>{item.label}</div>
      <div className={monthRowIcon}>{decoration}</div>
    </div>
  );
}

export interface MobileScheduleViewProps {
  eventsByDay: Map<DateString, DayEventInterval[]>;
  timezone: string;
  hideEmptyDays: boolean;
  onVisibleRangeChange?: (start: DateString, end: DateString) => void;
  onEventClick?: (eventId: string, target: HTMLElement) => void;
  className?: string;
  currentDate?: Date;
  onCurrentDateChange?: (date: Date) => void;
  isLoading?: boolean;
}

/**
 * Agenda: a virtualized vertical list of days with events, grouped by month,
 * with the month for the current viewport pinned. The application provides
 * infinite loading: onVisibleRangeChange reports the visible range and external
 * code loads additional events.
 */
export function MobileScheduleView({
  eventsByDay,
  timezone,
  hideEmptyDays,
  onVisibleRangeChange,
  onEventClick,
  className,
  currentDate,
  onCurrentDateChange,
  isLoading,
}: MobileScheduleViewProps) {
  const todayStr = toDateString(zonedNow(timezone));

  const items = useMemo<ScheduleItem[]>(() => {
    const daySet = new Set(eventsByDay.keys());
    daySet.add(todayStr); // always show today, even when empty

    if (currentDate) {
      daySet.add(toDateString(toZonedTime(currentDate, timezone)));
    }

    let dates = [...daySet].sort();

    if (!hideEmptyDays && dates.length > 1) {
      // Continuous date range from the first to the last date.
      const filled: DateString[] = [];
      const [y, m, d] = dates[0].split("-").map(Number);
      const cursor = new Date(y, m - 1, d);
      const last = dates[dates.length - 1];
      while (true) {
        const dateStr = toDateString(cursor);
        filled.push(dateStr);
        if (dateStr >= last) break;
        cursor.setDate(cursor.getDate() + 1);
      }
      dates = filled;
    }

    const out: ScheduleItem[] = [];
    let prevMonth = "";
    for (const date of dates) {
      const month = date.slice(0, 7);
      const label = monthLabelOf(date);
      if (month !== prevMonth) {
        out.push({ type: "month", key: `month-${month}`, label });
        prevMonth = month;
      }
      out.push({
        type: "day",
        key: date,
        date,
        monthLabel: label,
        intervals: eventsByDay.get(date) ?? [],
      });
    }
    return out;
  }, [eventsByDay, hideEmptyDays, todayStr, currentDate, timezone]);

  const scrollRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: (index) => estimateItem(items[index]),
    overscan: 6,
  });

  // Initial position: today (or the nearest future day).
  const lastScrolledDateRef = useRef<string | null>(null);
  const isProgrammaticScrollRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear the timer on unmount.
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const targetDate = currentDate ? toDateString(currentDate) : todayStr;
    if (lastScrolledDateRef.current === targetDate) return;

    const targetMonthStr = targetDate.slice(0, 7);
    const isTodayTarget = targetDate === todayStr;

    let index = -1;
    if (!isTodayTarget) {
      // Look for the month card first (the large seasonal card).
      index = items.findIndex(
        (item) =>
          item.type === "month" && item.key === `month-${targetMonthStr}`,
      );
    }

    // If the card is not found or we navigate to "Today", scroll to the day itself.
    if (index === -1) {
      index = items.findIndex(
        (item) => item.type === "day" && item.date >= targetDate,
      );
    }
    if (index >= 0) {
      lastScrolledDateRef.current = targetDate;
      isProgrammaticScrollRef.current = true;
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

      virtualizer.scrollToIndex(index, { align: "start" });

      scrollTimeoutRef.current = setTimeout(() => {
        isProgrammaticScrollRef.current = false;
      }, 800);
    }
  }, [currentDate, todayStr, items, virtualizer]);

  // Loading older data adds items above; compensate for the scroll so the
  // visible area does not jump (an estimate later refined by measure).
  const prevFirstKeyRef = useRef<string | null>(null);
  useLayoutEffect(() => {
    const firstKey = items[0]?.key ?? null;
    const prevKey = prevFirstKeyRef.current;
    if (prevKey && firstKey && firstKey !== prevKey) {
      const prevIndex = items.findIndex((item) => item.key === prevKey);
      if (prevIndex > 0) {
        const added = items
          .slice(0, prevIndex)
          .reduce((sum, item) => sum + estimateItem(item), 0);
        const el = scrollRef.current;
        if (el) el.scrollTop += added;
      }
    }
    prevFirstKeyRef.current = firstKey;
  }, [items]);

  const virtualItems = virtualizer.getVirtualItems();

  // Sync currentDate in the parent while scrolling so the header month updates.
  const firstVisibleItem = virtualItems[0];
  const firstVisibleDay = firstVisibleItem
    ? items[firstVisibleItem.index]
    : null;
  const visibleDateStr =
    firstVisibleDay?.type === "day"
      ? firstVisibleDay.date
      : firstVisibleDay?.type === "month"
        ? `${firstVisibleDay.key.slice(6)}-01` // key is 'month-YYYY-MM'
        : null;

  useEffect(() => {
    if (
      isLoading ||
      isProgrammaticScrollRef.current ||
      !visibleDateStr ||
      !onCurrentDateChange ||
      !currentDate
    ) {
      return;
    }
    const currentStr = toDateString(currentDate);
    // Update the parent only when the month changes (compare YYYY-MM).
    if (visibleDateStr.slice(0, 7) !== currentStr.slice(0, 7)) {
      const nextDate = new Date(visibleDateStr);
      lastScrolledDateRef.current = toDateString(nextDate); // Prevent a reverse-scroll effect.
      onCurrentDateChange(nextDate);
    }
  }, [visibleDateStr, onCurrentDateChange, currentDate, isLoading]);

  // Pinned month comes from the first visible item.
  const stickyLabel = useMemo(() => {
    const first = virtualItems[0];
    if (!first) return "";
    const item = items[first.index];
    return item.type === "month" ? item.label : item.monthLabel;
  }, [virtualItems, items]);

  // Report the visible day range (debounced) as a signal to load more data.
  const visibleDays = virtualItems
    .map((v) => items[v.index])
    .filter(
      (item): item is Extract<ScheduleItem, { type: "day" }> =>
        item?.type === "day",
    );
  const rangeKey =
    visibleDays.length > 0
      ? `${visibleDays[0].date}..${visibleDays[visibleDays.length - 1].date}`
      : "";
  const onVisibleRangeChangeRef = useRef(onVisibleRangeChange);
  onVisibleRangeChangeRef.current = onVisibleRangeChange;
  useEffect(() => {
    if (!rangeKey) return;
    const [start, end] = rangeKey.split("..");
    const id = setTimeout(
      () => onVisibleRangeChangeRef.current?.(start, end),
      250,
    );
    return () => clearTimeout(id);
  }, [rangeKey]);

  return (
    <div className={clsx(scheduleRoot, className)}>
      {stickyLabel && <div className={stickyMonth}>{stickyLabel}</div>}

      <div ref={scrollRef} className={scrollArea}>
        <div
          className={virtualInner}
          style={{ height: virtualizer.getTotalSize() }}
        >
          {virtualItems.map((virtualItem) => {
            const item = items[virtualItem.index];
            return (
              <div
                key={item.key}
                ref={virtualizer.measureElement}
                data-index={virtualItem.index}
                className={virtualRow}
                style={{ transform: `translateY(${virtualItem.start}px)` }}
              >
                {item.type === "month" ? (
                  <MonthIllustrationRow item={item} />
                ) : (
                  <ScheduleDayRow
                    item={item}
                    isToday={item.date === todayStr}
                    timezone={timezone}
                    onEventClick={onEventClick}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface ScheduleDayRowProps {
  item: Extract<ScheduleItem, { type: "day" }>;
  isToday: boolean;
  timezone: string;
  onEventClick?: (eventId: string, target: HTMLElement) => void;
}

function ScheduleDayRow({
  item,
  isToday,
  timezone,
  onEventClick,
}: ScheduleDayRowProps) {
  const [y, m, d] = item.date.split("-").map(Number);
  const wallDate = new Date(y, m - 1, d);

  return (
    <div className={dayRow}>
      <div className={dayChip}>
        <span className={dayChipWeekday}>
          {wallDate.toLocaleDateString("ru-RU", { weekday: "short" })}
        </span>
        <span className={dayChipNumber({ isToday })}>{d}</span>
      </div>

      <div className={dayEvents}>
        {item.intervals.length === 0 ? (
          <div className={emptyDayNote}>No events</div>
        ) : (
          item.intervals.map(({ event }) => {
            const isBirthday =
              event.title.toLowerCase().includes("birthday") ||
              event.title.toLowerCase().includes("birthday");

            return (
              <button
                key={event.id}
                type="button"
                className={clsx(
                  scheduleEventCard({
                    status: event.status ?? "scheduled",
                  }),
                  isBirthday && birthdayCard,
                )}
                onClick={(e) => onEventClick?.(event.id, e.currentTarget)}
              >
                <span className={scheduleEventTitle}>
                  {isBirthday ? `🎈 ${event.title}` : event.title}
                </span>
                <span className={scheduleEventTime}>
                  {`${getLocalTimeFromISO(event.startDate, timezone)}–${getLocalTimeFromISO(event.endDate, timezone)}`}
                </span>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
