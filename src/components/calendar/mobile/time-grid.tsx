import { memo, useMemo } from "react";
import type {
  DateString,
  TimeString,
  WorkingHoursConfig,
} from "../calendar.types";
import { layoutDayEvents } from "./event-layout";
import { TAP_SLOT_MINUTES } from "./mobile.constants";
import type { DayEventInterval } from "./mobile.types";
import { getNonWorkingIntervals, minutesToTimeString } from "./mobile.utils";
import { MobilePositionedEvent } from "./mobile-event";
import {
  dayColumn,
  headerDay,
  headerDayNumber,
  headerWeekday,
  hourHeightVar,
  hourLine,
  nonWorkingBlock,
  nowDot,
  nowLine,
  timeColumn,
  timeLabel,
} from "./time-grid.css";

const HOURS = Array.from({ length: 23 }, (_, i) => i + 1);

/** Time-label column 01:00–23:00 (00:00 and 24:00 are not labeled). */
export function MobileTimeColumn() {
  return (
    <div className={timeColumn} aria-hidden>
      {HOURS.map((hour) => (
        <span
          key={hour}
          className={timeLabel}
          style={{ top: `calc(${hourHeightVar} * ${hour})` }}
        >
          {`${String(hour).padStart(2, "0")}:00`}
        </span>
      ))}
    </div>
  );
}

interface HeaderDayCellProps {
  weekdayLabel: string;
  dayNumber: number;
  isToday: boolean;
  widthPct: number;
}

export function MobileHeaderDayCell({
  weekdayLabel,
  dayNumber,
  isToday,
  widthPct,
}: HeaderDayCellProps) {
  return (
    <div className={headerDay} style={{ flex: `0 0 ${widthPct}%` }}>
      <span className={headerWeekday}>{weekdayLabel}</span>
      <span className={headerDayNumber({ isToday })}>{dayNumber}</span>
    </div>
  );
}

interface MobileDayColumnProps {
  date: DateString;
  intervals: DayEventInterval[];
  timezone: string;
  workingHours: WorkingHoursConfig | null;
  minDate?: DateString;
  widthPct: number;
  /** Current-time minutes — only for today's column, otherwise null. */
  nowMinutes: number | null;
  onEventClick?: (eventId: string, target: HTMLElement) => void;
  onSlotClick?: (date: DateString, time: TimeString) => void;
}

export const MobileDayColumn = memo(function MobileDayColumn({
  date,
  intervals,
  timezone,
  workingHours,
  minDate,
  widthPct,
  nowMinutes,
  onEventClick,
  onSlotClick,
}: MobileDayColumnProps) {
  const positioned = useMemo(() => layoutDayEvents(intervals), [intervals]);

  const nonWorking = useMemo(
    () => getNonWorkingIntervals(date, workingHours, timezone, minDate),
    [date, workingHours, timezone, minDate],
  );

  const handleColumnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onSlotClick) return;
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.height <= 0) return;
    const minutes = ((e.clientY - rect.top) / rect.height) * 1440;
    const snapped = Math.floor(minutes / TAP_SLOT_MINUTES) * TAP_SLOT_MINUTES;
    onSlotClick(date, minutesToTimeString(snapped));
  };

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: tapping an empty area is an optional shortcut; slots have no keyboard equivalent on the mobile grid.
    // biome-ignore lint/a11y/noStaticElementInteractions: see above.
    <div
      className={dayColumn}
      style={{ flex: `0 0 ${widthPct}%` }}
      onClick={handleColumnClick}
    >
      {nonWorking.map(({ startMin, endMin }) => (
        <div
          key={startMin}
          className={nonWorkingBlock}
          style={{
            top: `calc(${hourHeightVar} * ${startMin / 60})`,
            height: `calc(${hourHeightVar} * ${(endMin - startMin) / 60})`,
          }}
        />
      ))}

      {HOURS.map((hour) => (
        <div
          key={hour}
          className={hourLine}
          style={{ top: `calc(${hourHeightVar} * ${hour})` }}
        />
      ))}

      {positioned.map((item) => (
        <MobilePositionedEvent
          key={`${item.event.id}-${item.startMin}`}
          positioned={item}
          timezone={timezone}
          onEventClick={onEventClick}
        />
      ))}

      {nowMinutes !== null && (
        <div
          className={nowLine}
          style={{ top: `calc(${hourHeightVar} * ${nowMinutes / 60})` }}
          aria-hidden
        >
          <span className={nowDot} />
        </div>
      )}
    </div>
  );
});
