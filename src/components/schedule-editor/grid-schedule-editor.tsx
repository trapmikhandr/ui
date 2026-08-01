import { useCallback, useEffect } from "react";
import { DayColumnScheduleEditor } from "./day-column-schedule-editor";
import { DayHeaderScheduleEditor } from "./day-header-schedule-editor";
import * as styles from "./grid-schedule-editor.css";
import { SCHEDULE_EDITOR, slotHeightPx } from "./schedule-editor.constants";
import {
  useScheduleEditorConfigContext,
  useScheduleEditorSelectionContext,
} from "./schedule-editor.context";
import { WEEKDAYS } from "./schedule-editor.types";
import { TimeColumnScheduleEditor } from "./time-column-schedule-editor";

export function GridScheduleEditor() {
  const { timeSlots, timeStep, gridSlots } = useScheduleEditorConfigContext();
  const { selectionState, handlePointerUp, handleSlotPointerEnter } =
    useScheduleEditorSelectionContext();

  // Global pointerup listener when selecting/resizing
  useEffect(() => {
    if (selectionState.isSelecting) {
      const onPointerUp = () => handlePointerUp();
      document.addEventListener("pointerup", onPointerUp);
      document.addEventListener("pointercancel", onPointerUp);
      return () => {
        document.removeEventListener("pointerup", onPointerUp);
        document.removeEventListener("pointercancel", onPointerUp);
      };
    }
  }, [selectionState.isSelecting, handlePointerUp]);

  // pointermove for touch: determine slot under finger via elementFromPoint
  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!selectionState.isSelecting) return;

      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (!el) return;

      const slotEl = el.closest("[data-slot-id]") as HTMLElement | null;
      if (!slotEl) return;

      const slotId = slotEl.dataset.slotId;
      const day = slotEl.dataset.day;
      if (!slotId || !day) return;

      // Find the slot in gridSlots
      const slot = gridSlots[day as keyof typeof gridSlots]?.find(
        (s) => s.id === slotId,
      );
      if (slot) {
        handleSlotPointerEnter(slot);
      }
    },
    [selectionState.isSelecting, gridSlots, handleSlotPointerEnter],
  );

  return (
    // biome-ignore lint/a11y/useSemanticElements: <no need>
    <div
      className={styles.grid}
      style={{
        gridTemplateColumns: `${SCHEDULE_EDITOR.timeColWidth} repeat(${WEEKDAYS.length}, 1fr)`,
        gridTemplateRows: `${SCHEDULE_EDITOR.headerHeight} repeat(${timeSlots.length}, ${slotHeightPx(timeStep)})`,
      }}
      onPointerMove={selectionState.isSelecting ? handlePointerMove : undefined}
      role="grid"
      aria-label="Weekly schedule editor"
    >
      {/* Corner spacer */}
      <div
        className={styles.cornerSpacer}
        style={{ gridColumn: 1, gridRow: 1 }}
      />

      {/* Day headers */}
      {WEEKDAYS.map((day, index) => (
        <DayHeaderScheduleEditor
          key={day}
          day={day}
          columnIndex={index}
          isLast={index === WEEKDAYS.length - 1}
        />
      ))}

      {/* Time labels */}
      <TimeColumnScheduleEditor />

      {/* Day columns with slots and blocks */}
      {WEEKDAYS.map((day, index) => (
        <DayColumnScheduleEditor
          key={day}
          day={day}
          columnIndex={index}
          isLast={index === WEEKDAYS.length - 1}
        />
      ))}
    </div>
  );
}
