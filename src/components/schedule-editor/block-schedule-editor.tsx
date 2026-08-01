import { memo } from "react";
import * as styles from "./block-schedule-editor.css";
import {
  useScheduleEditorConfigContext,
  useScheduleEditorSelectionContext,
} from "./schedule-editor.context";
import type { WorkingBlock } from "./schedule-editor.types";
import { minutesToTime } from "./schedule-editor.utils";

interface BlockScheduleEditorProps {
  block: WorkingBlock;
  firstSlotMinutes: number;
}

export const BlockScheduleEditor = memo(function BlockScheduleEditor({
  block,
  firstSlotMinutes,
}: BlockScheduleEditorProps) {
  const {
    handleBlockClick,
    disabled,
    readOnly,
    timeStep,
    slotHeight,
    allowResize,
  } = useScheduleEditorConfigContext();
  const { selectionState, resizePreview, handleResizeStart } =
    useScheduleEditorSelectionContext();

  const isInteractive = !disabled && !readOnly;
  const isResizable = isInteractive && allowResize;
  const isResizing =
    selectionState.isSelecting && selectionState.resizingBlockId === block.id;

  // Use preview dimensions if this block is being resized
  const preview = resizePreview?.blockId === block.id ? resizePreview : null;

  const startMinutes = preview ? preview.startMinutes : block.startMinutes;
  const endMinutes = preview ? preview.endMinutes : block.endMinutes;

  const startOffset = startMinutes - firstSlotMinutes;
  const duration = endMinutes - startMinutes;

  const top = (startOffset / timeStep) * slotHeight;
  const height = (duration / timeStep) * slotHeight;

  const displayStart = minutesToTime(startMinutes);
  const displayEnd = minutesToTime(endMinutes);

  return (
    <button
      type="button"
      className={styles.block}
      style={{
        top: `${top}px`,
        height: `${height}px`,
        pointerEvents: isResizing ? "none" : "auto",
      }}
      onContextMenu={
        isInteractive
          ? (e) => {
              e.preventDefault();
              e.stopPropagation();
              handleBlockClick(block);
            }
          : undefined
      }
      aria-label={`Working hours ${displayStart} – ${displayEnd}`}
    >
      {isResizable && (
        <div
          className={styles.resizeHandleTop}
          onPointerDown={
            isInteractive
              ? (e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleResizeStart(block, "top", e);
                }
              : undefined
          }
        />
      )}

      <div className={styles.blockContent}>
        {displayStart} – {displayEnd}
      </div>

      {isResizable && (
        <div
          className={styles.resizeHandleBottom}
          onPointerDown={
            isInteractive
              ? (e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleResizeStart(block, "bottom", e);
                }
              : undefined
          }
        />
      )}
    </button>
  );
});
