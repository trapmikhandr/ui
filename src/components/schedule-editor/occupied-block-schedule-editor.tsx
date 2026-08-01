import { memo } from "react";
import * as styles from "./occupied-block-schedule-editor.css";
import { useScheduleEditorConfigContext } from "./schedule-editor.context";
import type { OccupiedBlock } from "./schedule-editor.types";
import { minutesToTime } from "./schedule-editor.utils";

interface OccupiedBlockScheduleEditorProps {
  block: OccupiedBlock;
  firstSlotMinutes: number;
}

export const OccupiedBlockScheduleEditor = memo(
  function OccupiedBlockScheduleEditor({
    block,
    firstSlotMinutes,
  }: OccupiedBlockScheduleEditorProps) {
    const { slotHeight, timeStep } = useScheduleEditorConfigContext();
    const startOffset = block.startMinutes - firstSlotMinutes;
    const duration = block.endMinutes - block.startMinutes;

    const top = (startOffset / timeStep) * slotHeight;
    const height = (duration / timeStep) * slotHeight;

    return (
      <button
        type="button"
        className={styles.block}
        style={{
          top: `${top}px`,
          height: `${height}px`,
        }}
        aria-label={`Occupied ${minutesToTime(block.startMinutes)} – ${minutesToTime(block.endMinutes)}, ${block.count} sessions`}
      >
        <div className={styles.blockContent}>
          {minutesToTime(block.startMinutes)} –{" "}
          {minutesToTime(block.endMinutes)} · {block.count}
        </div>
      </button>
    );
  },
);
