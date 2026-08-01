import { memo } from "react";
import * as styles from "./day-header-schedule-editor.css";
import { useScheduleEditorConfigContext } from "./schedule-editor.context";
import type { WeekDay } from "./schedule-editor.types";

const WEEKDAY_SHORT_LABELS: Record<WeekDay, string> = {
  monday: "Mon",
  tuesday: "Tue",
  wednesday: "Wed",
  thursday: "Thu",
  friday: "Fri",
  saturday: "Sat",
  sunday: "Sun",
};

interface DayHeaderScheduleEditorProps {
  day: WeekDay;
  columnIndex: number;
  isLast: boolean;
}

export const DayHeaderScheduleEditor = memo(function DayHeaderScheduleEditor({
  day,
  columnIndex,
  isLast,
}: DayHeaderScheduleEditorProps) {
  const { constraints } = useScheduleEditorConfigContext();

  const constraintSchedule = constraints?.schedule[day];
  let constraintText = "";

  if (constraintSchedule) {
    if (!constraintSchedule.enabled || constraintSchedule.slots.length === 0) {
      constraintText = "Day off";
    } else {
      constraintText = constraintSchedule.slots
        .map((s) => `${s.start}–${s.end}`)
        .join(", ");
    }
  }

  return (
    <div
      className={styles.dayHeader}
      data-last={isLast}
      style={{
        gridColumn: columnIndex + 2,
        gridRow: 1,
      }}
    >
      <span className={styles.dayName}>{WEEKDAY_SHORT_LABELS[day]}</span>
      {constraintText && (
        <span className={styles.constraintHint}>{constraintText}</span>
      )}
    </div>
  );
});
