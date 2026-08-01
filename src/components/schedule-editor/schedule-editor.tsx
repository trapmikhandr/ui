import { useCallback, useMemo, useRef, useState } from "react";
import { GridScheduleEditor } from "./grid-schedule-editor";
import {
  ScheduleEditorConfigContext,
  ScheduleEditorSelectionContext,
} from "./schedule-editor.context";
import * as styles from "./schedule-editor.css";
import {
  type GridSlot,
  INITIAL_SELECTION_STATE,
  type ResizePreview,
  type ScheduleEditorProps,
  type SelectionState,
  type TimeRange,
  type WorkingBlock,
} from "./schedule-editor.types";
import {
  addSlotsToSchedule,
  buildGridSlots,
  buildOccupiedBlocks,
  buildWorkingBlocks,
  computePreviewSelection,
  computeResizePreview,
  generateTimeSlots,
  removeBlockFromSchedule,
  removeSlotsFromSchedule,
  resizeBlockInSchedule,
} from "./schedule-editor.utils";

const DEFAULT_TIME_RANGE: TimeRange = { start: 0, end: 1440 };
const DEFAULT_TIME_STEP = 15;

export function ScheduleEditor({
  value,
  onChange,
  constraints,
  occupiedSlots,
  timeRange = DEFAULT_TIME_RANGE,
  timeStep = DEFAULT_TIME_STEP,
  disabled = false,
  readOnly = false,
  allowResize = true,
}: ScheduleEditorProps) {
  // ────────────────────────────────────────────
  // Computed data
  // ────────────────────────────────────────────

  const timeSlots = useMemo(
    () => generateTimeSlots(timeRange, timeStep),
    [timeRange, timeStep],
  );

  const slotHeight = useMemo(() => {
    if (timeStep <= 15) return 32;
    if (timeStep <= 30) return 40;
    return 48;
  }, [timeStep]);

  const gridSlots = useMemo(
    () =>
      buildGridSlots(
        value,
        constraints ?? null,
        occupiedSlots ?? null,
        timeSlots,
      ),
    [value, constraints, occupiedSlots, timeSlots],
  );

  const workingBlocks = useMemo(
    () => buildWorkingBlocks(gridSlots, timeStep),
    [gridSlots, timeStep],
  );

  const occupiedBlocks = useMemo(
    () => buildOccupiedBlocks(occupiedSlots ?? null),
    [occupiedSlots],
  );

  // ────────────────────────────────────────────
  // Selection state
  // ────────────────────────────────────────────

  const [selectionState, setSelectionState] = useState<SelectionState>(
    INITIAL_SELECTION_STATE,
  );

  const previewSelection = useMemo(
    () => computePreviewSelection(selectionState, gridSlots),
    [selectionState, gridSlots],
  );

  const resizePreview: ResizePreview | null = useMemo(
    () =>
      computeResizePreview(selectionState, gridSlots, workingBlocks, timeStep),
    [selectionState, gridSlots, workingBlocks, timeStep],
  );

  // ────────────────────────────────────────────
  // Handlers
  // ────────────────────────────────────────────

  const handleSlotPointerDown = useCallback(
    (slot: GridSlot) => {
      if (disabled || readOnly || !slot.isWithinConstraints) return;

      const mode = slot.isSelected ? "remove" : "add";

      setSelectionState({
        isSelecting: true,
        day: slot.day,
        startSlotId: slot.id,
        currentSlotId: slot.id,
        mode,
        resizingBlockId: null,
      });
    },
    [disabled, readOnly],
  );

  const rafRef = useRef(0);

  const handleSlotPointerEnter = useCallback(
    (slot: GridSlot) => {
      if (!selectionState.isSelecting) return;
      if (slot.day !== selectionState.day) return;
      if (!slot.isWithinConstraints) return;

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setSelectionState((prev) => ({
          ...prev,
          currentSlotId: slot.id,
        }));
      });
    },
    [selectionState.isSelecting, selectionState.day],
  );

  const handlePointerUp = useCallback(() => {
    if (!selectionState.isSelecting || !selectionState.day) {
      setSelectionState(INITIAL_SELECTION_STATE);
      return;
    }

    const day = selectionState.day;

    // Handle resize
    if (
      (selectionState.mode === "resize-top" ||
        selectionState.mode === "resize-bottom") &&
      resizePreview
    ) {
      const block = workingBlocks[day]?.find(
        (b) => b.id === selectionState.resizingBlockId,
      );
      if (block) {
        const newDaySchedule = resizeBlockInSchedule(
          value.schedule[day],
          block,
          resizePreview.startMinutes,
          resizePreview.endMinutes,
          timeStep,
        );

        onChange({
          ...value,
          schedule: {
            ...value.schedule,
            [day]: newDaySchedule,
          },
        });
      }

      setSelectionState(INITIAL_SELECTION_STATE);
      return;
    }

    // Handle add/remove selection
    if (selectionState.mode === "add" || selectionState.mode === "remove") {
      const daySlots = gridSlots[day];
      const startIdx = daySlots.findIndex(
        (s) => s.id === selectionState.startSlotId,
      );
      const endIdx = daySlots.findIndex(
        (s) => s.id === selectionState.currentSlotId,
      );

      if (startIdx !== -1 && endIdx !== -1) {
        const min = Math.min(startIdx, endIdx);
        const max = Math.max(startIdx, endIdx);
        const selectedSlots = daySlots
          .slice(min, max + 1)
          .filter((s) => s.isWithinConstraints);

        if (selectedSlots.length > 0) {
          const newDaySchedule =
            selectionState.mode === "add"
              ? addSlotsToSchedule(value.schedule[day], selectedSlots, timeStep)
              : removeSlotsFromSchedule(
                  value.schedule[day],
                  selectedSlots,
                  timeStep,
                );

          onChange({
            ...value,
            schedule: {
              ...value.schedule,
              [day]: newDaySchedule,
            },
          });
        }
      }
    }

    setSelectionState(INITIAL_SELECTION_STATE);
  }, [
    selectionState,
    gridSlots,
    value,
    onChange,
    timeStep,
    resizePreview,
    workingBlocks,
  ]);

  const handleBlockClick = useCallback(
    (block: WorkingBlock) => {
      if (disabled || readOnly) return;

      const newDaySchedule = removeBlockFromSchedule(
        value.schedule[block.day],
        block,
        timeStep,
      );

      onChange({
        ...value,
        schedule: {
          ...value.schedule,
          [block.day]: newDaySchedule,
        },
      });
    },
    [disabled, readOnly, value, onChange, timeStep],
  );

  const handleResizeStart = useCallback(
    (block: WorkingBlock, edge: "top" | "bottom") => {
      if (disabled || readOnly) return;

      const startSlotId =
        edge === "top"
          ? `${block.day}_${block.startMinutes}`
          : `${block.day}_${block.endMinutes - timeStep}`;

      setSelectionState({
        isSelecting: true,
        day: block.day,
        startSlotId,
        currentSlotId: startSlotId,
        mode: edge === "top" ? "resize-top" : "resize-bottom",
        resizingBlockId: block.id,
      });
    },
    [disabled, readOnly, timeStep],
  );

  // ────────────────────────────────────────────
  // Context values
  // ────────────────────────────────────────────

  const configValue = useMemo(
    () => ({
      value,
      constraints: constraints ?? null,
      gridSlots,
      workingBlocks,
      occupiedBlocks,
      timeRange,
      timeStep,
      timeSlots,
      slotHeight,
      handleBlockClick,
      disabled,
      readOnly,
      allowResize,
    }),
    [
      value,
      constraints,
      gridSlots,
      workingBlocks,
      occupiedBlocks,
      timeRange,
      timeStep,
      timeSlots,
      slotHeight,
      handleBlockClick,
      disabled,
      readOnly,
      allowResize,
    ],
  );

  const selectionValue = useMemo(
    () => ({
      selectionState,
      previewSelection,
      resizePreview,
      handleSlotPointerDown,
      handleSlotPointerEnter,
      handlePointerUp,
      handleResizeStart,
    }),
    [
      selectionState,
      previewSelection,
      resizePreview,
      handleSlotPointerDown,
      handleSlotPointerEnter,
      handlePointerUp,
      handleResizeStart,
    ],
  );

  return (
    <ScheduleEditorConfigContext.Provider value={configValue}>
      <ScheduleEditorSelectionContext.Provider value={selectionValue}>
        <div className={styles.root}>
          <GridScheduleEditor />
        </div>
      </ScheduleEditorSelectionContext.Provider>
    </ScheduleEditorConfigContext.Provider>
  );
}
