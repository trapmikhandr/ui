import { useScheduleEditorConfigContext } from "./schedule-editor.context";
import { minutesToTime } from "./schedule-editor.utils";
import * as styles from "./time-column-schedule-editor.css";

export function TimeColumnScheduleEditor() {
  const { timeSlots } = useScheduleEditorConfigContext();

  return (
    <>
      {timeSlots.map((time, index) => (
        <div
          key={time}
          className={styles.timeCell}
          data-last={index === timeSlots.length - 1}
          style={{
            gridColumn: 1,
            gridRow: index + 2,
          }}
        >
          <span className={styles.timeInfo}>{minutesToTime(time)}</span>
        </div>
      ))}
    </>
  );
}
