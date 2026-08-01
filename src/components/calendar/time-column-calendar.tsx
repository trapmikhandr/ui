import { useCalendarConfigContext } from "./calendar.context";
import { cornerCell, timeCell, timeLabel } from "./time-column-calendar.css";

/** Slot indices where a time-column cell should start: each hour boundary
 * (":00") plus the first slot, in case the visible range starts mid-hour
 * (custom working hours). */
function getCellStartIndexes(timeSlots: string[]): number[] {
  const indexes: number[] = [];
  timeSlots.forEach((time, index) => {
    if (index === 0 || time.endsWith(":00")) indexes.push(index);
  });
  return indexes;
}

export function CalendarTimeColumn() {
  const { timeSlots } = useCalendarConfigContext();
  const cellStartIndexes = getCellStartIndexes(timeSlots);

  return (
    <>
      {/* Empty corner cell (header row, time column). */}
      <div className={cornerCell} style={{ gridColumn: 1, gridRow: 1 }} />

      {/* One cell per HOUR (not per slot), stretched with gridRow span to the
          next hour boundary. The cell background is the same at every grid
          step, so fewer DOM nodes do not change the visual result. */}
      {cellStartIndexes.map((startIndex, i) => {
        const time = timeSlots[startIndex];
        const nextStartIndex = cellStartIndexes[i + 1] ?? timeSlots.length;
        const rowSpan = nextStartIndex - startIndex;

        return (
          <div
            key={time}
            className={timeCell}
            style={{
              gridColumn: 1,
              gridRow: `${startIndex + 2} / span ${rowSpan}`, // +2 because row 1 is the header
            }}
          >
            {time.endsWith(":00") && <span className={timeLabel}>{time}</span>}
          </div>
        );
      })}
    </>
  );
}
