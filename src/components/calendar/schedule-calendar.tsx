import type { ReactNode } from "react";
import { Calendar } from "./calendar";
import type { CalendarProps } from "./calendar.types";
import { CalendarGrid } from "./grid-calendar";
import { CalendarHeader } from "./header-calendar";

export interface ScheduleCalendarProps extends CalendarProps {
  hideHeader?: boolean;
  /** Additional actions in the calendar header row (see CalendarHeaderProps). */
  headerActions?: ReactNode;
}

export function ScheduleCalendar({
  hideHeader,
  headerActions,
  ...props
}: ScheduleCalendarProps) {
  return (
    <Calendar {...props}>
      {!hideHeader && <CalendarHeader actions={headerActions} />}
      <CalendarGrid />
    </Calendar>
  );
}
