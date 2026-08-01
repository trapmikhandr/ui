import { memo } from "react";
import { BlockScheduleEditor } from "./block-schedule-editor";
import * as styles from "./day-column-schedule-editor.css";
import { OccupiedBlockScheduleEditor } from "./occupied-block-schedule-editor";
import { useScheduleEditorConfigContext } from "./schedule-editor.context";
import type { WeekDay } from "./schedule-editor.types";
import { SlotScheduleEditor } from "./slot-schedule-editor";

interface DayColumnScheduleEditorProps {
  day: WeekDay;
  columnIndex: number;
  isLast: boolean;
}

export const DayColumnScheduleEditor = memo(function DayColumnScheduleEditor({
  day,
  columnIndex,
  isLast,
}: DayColumnScheduleEditorProps) {
  const { gridSlots, workingBlocks, occupiedBlocks, timeSlots } =
    useScheduleEditorConfigContext();

  const daySlots = gridSlots[day];
  const dayBlocks = workingBlocks[day];
  const dayOccupiedBlocks = occupiedBlocks[day];

  const firstSlotMinutes = daySlots.length > 0 ? daySlots[0].minutes : 0;

  return (
    <div
      className={styles.slotsContainer}
      data-last={isLast}
      style={{
        gridColumn: columnIndex + 2,
        gridRow: `2 / span ${timeSlots.length}`,
      }}
    >
      {/* Occupied blocks (absolute positioned, non-interactive) */}
      {dayOccupiedBlocks.map((block) => (
        <OccupiedBlockScheduleEditor
          key={block.id}
          block={block}
          firstSlotMinutes={firstSlotMinutes}
        />
      ))}

      {/* Visual blocks (absolute positioned overlays) */}
      {dayBlocks.map((block) => (
        <BlockScheduleEditor
          key={block.id}
          block={block}
          firstSlotMinutes={firstSlotMinutes}
        />
      ))}

      {/* Interactive slots */}
      {daySlots.map((slot) => (
        <SlotScheduleEditor key={slot.id} slot={slot} />
      ))}
    </div>
  );
});
