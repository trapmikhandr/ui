import { memo } from "react";
import {
  useScheduleEditorConfigContext,
  useScheduleEditorSelectionContext,
} from "./schedule-editor.context";
import type { GridSlot } from "./schedule-editor.types";
import { minutesToTime } from "./schedule-editor.utils";
import * as styles from "./slot-schedule-editor.css";

interface SlotScheduleEditorProps {
  slot: GridSlot;
}

export const SlotScheduleEditor = memo(function SlotScheduleEditor({
  slot,
}: SlotScheduleEditorProps) {
  const { disabled, readOnly, slotHeight } = useScheduleEditorConfigContext();
  const {
    selectionState,
    previewSelection,
    handleSlotPointerDown,
    handleSlotPointerEnter,
  } = useScheduleEditorSelectionContext();

  const isInPreview = previewSelection.has(slot.id);
  const isPreviewAdd = isInPreview && selectionState.mode === "add";
  const isPreviewRemove = isInPreview && selectionState.mode === "remove";
  const isInteractive =
    slot.isWithinConstraints && !slot.isOccupied && !disabled && !readOnly;

  return (
    <button
      type="button"
      disabled={!isInteractive}
      style={{ height: `${slotHeight}px` }}
      className={styles.slot({
        isWithinConstraints: slot.isWithinConstraints,
        isSelected: slot.isSelected,
        isInPreview,
        isPreviewAdd: isPreviewAdd || undefined,
        isPreviewRemove: isPreviewRemove || undefined,
      })}
      data-slot-id={slot.id}
      data-day={slot.day}
      data-time={slot.minutes}
      aria-label={`${slot.day} ${minutesToTime(slot.minutes)}`}
      aria-pressed={slot.isSelected}
      onPointerDown={
        isInteractive
          ? (e) => {
              // We prevent default to avoid focus change on button click
              // which would disrupt the drag-selection flow
              e.preventDefault();
              handleSlotPointerDown(slot);
            }
          : undefined
      }
      onPointerEnter={
        isInteractive ? () => handleSlotPointerEnter(slot) : undefined
      }
      // The onClick event on a button handles both mouse and keyboard.
      // We use it here to correctly finish the "selection" for keyboard users.
      onClick={
        isInteractive
          ? (e) => {
              e.preventDefault();
              // For keyboard interaction, we need to end the selection immediately
              // to simulate a single "click" rather than a drag.
              requestAnimationFrame(() => {
                document.dispatchEvent(new PointerEvent("pointerup"));
              });
            }
          : undefined
      }
    />
  );
});
