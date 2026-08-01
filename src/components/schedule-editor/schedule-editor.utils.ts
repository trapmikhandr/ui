import { addDays, startOfWeek } from "date-fns";
import { fromZonedTime, toZonedTime } from "date-fns-tz";
import type {
  DaySchedule,
  GridSlot,
  OccupiedBlock,
  OccupiedSlotsConfig,
  ResizePreview,
  SelectionState,
  TimeRange,
  TimeSlot,
  WeekDay,
  WorkingBlock,
  WorkingHoursConfig,
} from "./schedule-editor.types";
import { WEEKDAYS } from "./schedule-editor.types";

// ════════════════════════════════════════════
// HELPERS
// ════════════════════════════════════════════

function emptyWeekRecord<T>(): Record<WeekDay, T[]> {
  return {
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  };
}

// ════════════════════════════════════════════
// TIME HELPERS
// ════════════════════════════════════════════

/** Parses an "HH:MM" string from DB/core into minutes from midnight. */
export function timeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

/** Formats minutes from midnight into a display string "HH:MM". */
export function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`;
}

// ════════════════════════════════════════════
// TIME SLOT GENERATION
// ════════════════════════════════════════════

export function generateTimeSlots(
  timeRange: TimeRange,
  step: number,
): number[] {
  const slots: number[] = [];
  for (let m = timeRange.start; m < timeRange.end; m += step) {
    slots.push(m);
  }
  return slots;
}

// ════════════════════════════════════════════
// GRID BUILDING
// ════════════════════════════════════════════

function isTimeInDaySchedule(minutes: number, schedule: DaySchedule): boolean {
  if (!schedule.enabled) return false;
  return schedule.slots.some(
    (slot) => minutes >= slot.start && minutes < slot.end,
  );
}

const WEEKDAY_INDEX: Record<WeekDay, number> = {
  monday: 0,
  tuesday: 1,
  wednesday: 2,
  thursday: 3,
  friday: 4,
  saturday: 5,
  sunday: 6,
};

const JS_DAY_TO_WEEKDAY: WeekDay[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export function buildGridSlots(
  value: WorkingHoursConfig,
  constraints: WorkingHoursConfig | null,
  occupiedSlots: OccupiedSlotsConfig | null,
  timeSlots: number[],
): Record<WeekDay, GridSlot[]> {
  const result = emptyWeekRecord<GridSlot>();

  const valueTz = value.timezone;
  const constraintsTz = constraints?.timezone;

  // Calculate current Monday once as reference for dynamic timezone shifting
  const currentMonday = startOfWeek(new Date(), { weekStartsOn: 1 });

  for (const day of WEEKDAYS) {
    result[day] = timeSlots.map((minutes) => {
      let isWithinConstraints = true;

      if (constraints) {
        if (!valueTz || !constraintsTz || valueTz === constraintsTz) {
          isWithinConstraints = isTimeInDaySchedule(
            minutes,
            constraints.schedule[day],
          );
        } else {
          // Timezones are different, shift the slot time to constraint's timezone
          const dayIdx = WEEKDAY_INDEX[day];
          const hours = Math.floor(minutes / 60);
          const mins = minutes % 60;

          // Construct reference date in value.timezone (specialist's timezone)
          const localDate = addDays(currentMonday, dayIdx);
          localDate.setHours(hours, mins, 0, 0);
          const instant = fromZonedTime(localDate, valueTz);

          // Convert to constraints.timezone (org's timezone)
          const targetDate = toZonedTime(instant, constraintsTz);
          const shiftedDay = JS_DAY_TO_WEEKDAY[targetDate.getDay()];
          const shiftedMinutes =
            targetDate.getHours() * 60 + targetDate.getMinutes();

          isWithinConstraints = isTimeInDaySchedule(
            shiftedMinutes,
            constraints.schedule[shiftedDay],
          );
        }
      }

      const isSelected = isTimeInDaySchedule(minutes, value.schedule[day]);
      const isOccupied = occupiedSlots
        ? isTimeInDaySchedule(minutes, occupiedSlots.schedule[day])
        : false;

      return {
        id: `${day}_${minutes}`,
        day,
        minutes,
        isWithinConstraints,
        isSelected,
        isOccupied,
      };
    });
  }

  return result;
}

// ════════════════════════════════════════════
// WORKING BLOCKS
// ════════════════════════════════════════════

export function buildWorkingBlocks(
  gridSlots: Record<WeekDay, GridSlot[]>,
  timeStep: number,
): Record<WeekDay, WorkingBlock[]> {
  const result = emptyWeekRecord<WorkingBlock>();

  for (const day of WEEKDAYS) {
    const selectedSlots = gridSlots[day].filter((s) => s.isSelected);

    if (selectedSlots.length === 0) {
      result[day] = [];
      continue;
    }

    const blocks: WorkingBlock[] = [];
    let currentGroup: GridSlot[] = [selectedSlots[0]];

    for (let i = 1; i < selectedSlots.length; i++) {
      const prev = selectedSlots[i - 1];
      const curr = selectedSlots[i];

      if (curr.minutes === prev.minutes + timeStep) {
        currentGroup.push(curr);
      } else {
        blocks.push(createBlock(currentGroup, timeStep));
        currentGroup = [curr];
      }
    }

    blocks.push(createBlock(currentGroup, timeStep));
    result[day] = blocks;
  }

  return result;
}

function createBlock(slots: GridSlot[], timeStep: number): WorkingBlock {
  const first = slots[0];
  const last = slots[slots.length - 1];
  const endMinutes = last.minutes + timeStep;

  return {
    id: `${first.day}_${first.minutes}-${endMinutes}`,
    day: first.day,
    startMinutes: first.minutes,
    endMinutes,
    slotCount: slots.length,
  };
}

// ════════════════════════════════════════════
// OCCUPIED BLOCKS
// ════════════════════════════════════════════

export function buildOccupiedBlocks(
  occupiedSlots: OccupiedSlotsConfig | null,
): Record<WeekDay, OccupiedBlock[]> {
  const result = emptyWeekRecord<OccupiedBlock>();

  if (!occupiedSlots) return result;

  for (const day of WEEKDAYS) {
    const daySchedule = occupiedSlots.schedule[day];
    if (!daySchedule.enabled || daySchedule.slots.length === 0) continue;

    result[day] = daySchedule.slots.map((slot) => ({
      id: `${day}_occupied_${slot.start}-${slot.end}`,
      day,
      startMinutes: slot.start,
      endMinutes: slot.end,
      count: slot.count ?? 1,
    }));
  }

  return result;
}

// ════════════════════════════════════════════
// SLOT MERGING
// ════════════════════════════════════════════

export function mergeTimeSlots(slots: TimeSlot[]): TimeSlot[] {
  if (slots.length === 0) return [];

  const sorted = [...slots].sort((a, b) => a.start - b.start);
  const merged: TimeSlot[] = [{ ...sorted[0] }];

  for (let i = 1; i < sorted.length; i++) {
    const current = sorted[i];
    const last = merged[merged.length - 1];

    if (current.start <= last.end) {
      if (current.end > last.end) {
        last.end = current.end;
      }
    } else {
      merged.push({ ...current });
    }
  }

  return merged;
}

// ════════════════════════════════════════════
// SCHEDULE MODIFICATION
// ════════════════════════════════════════════

export function addSlotsToSchedule(
  schedule: DaySchedule,
  slotsToAdd: GridSlot[],
  timeStep: number,
): DaySchedule {
  const newSlots: TimeSlot[] = [
    ...schedule.slots,
    ...slotsToAdd.map((s) => ({
      start: s.minutes,
      end: s.minutes + timeStep,
    })),
  ];

  const merged = mergeTimeSlots(newSlots);

  return {
    enabled: merged.length > 0,
    slots: merged,
  };
}

export function removeSlotsFromSchedule(
  schedule: DaySchedule,
  slotsToRemove: GridSlot[],
  timeStep: number,
): DaySchedule {
  const removeSet = new Set(slotsToRemove.map((s) => s.minutes));
  const newSlots: TimeSlot[] = [];

  for (const slot of schedule.slots) {
    let segmentStart = slot.start;

    for (let m = slot.start; m < slot.end; m += timeStep) {
      if (removeSet.has(m)) {
        if (segmentStart < m) {
          newSlots.push({ start: segmentStart, end: m });
        }
        segmentStart = m + timeStep;
      }
    }

    if (segmentStart < slot.end) {
      newSlots.push({ start: segmentStart, end: slot.end });
    }
  }

  return {
    enabled: newSlots.length > 0,
    slots: newSlots,
  };
}

export function removeBlockFromSchedule(
  schedule: DaySchedule,
  block: WorkingBlock,
  timeStep: number,
): DaySchedule {
  const slotsToRemove: GridSlot[] = [];
  for (let m = block.startMinutes; m < block.endMinutes; m += timeStep) {
    slotsToRemove.push({
      id: `${block.day}_${m}`,
      day: block.day,
      minutes: m,
      isWithinConstraints: true,
      isSelected: true,
      isOccupied: false,
    });
  }

  return removeSlotsFromSchedule(schedule, slotsToRemove, timeStep);
}

export function resizeBlockInSchedule(
  schedule: DaySchedule,
  block: WorkingBlock,
  newStartMinutes: number,
  newEndMinutes: number,
  timeStep: number,
): DaySchedule {
  const cleaned = removeBlockFromSchedule(schedule, block, timeStep);

  const newSlots: TimeSlot[] = [
    ...cleaned.slots,
    { start: newStartMinutes, end: newEndMinutes },
  ];

  const merged = mergeTimeSlots(newSlots);

  return {
    enabled: merged.length > 0,
    slots: merged,
  };
}

// ════════════════════════════════════════════
// PREVIEW COMPUTATION
// ════════════════════════════════════════════

export function computePreviewSelection(
  selectionState: SelectionState,
  gridSlots: Record<WeekDay, GridSlot[]>,
): Set<string> {
  if (
    !selectionState.isSelecting ||
    !selectionState.day ||
    !selectionState.startSlotId ||
    !selectionState.currentSlotId
  ) {
    return new Set();
  }

  if (selectionState.mode !== "add" && selectionState.mode !== "remove") {
    return new Set();
  }

  const daySlots = gridSlots[selectionState.day];
  const startIdx = daySlots.findIndex(
    (s) => s.id === selectionState.startSlotId,
  );
  const endIdx = daySlots.findIndex(
    (s) => s.id === selectionState.currentSlotId,
  );

  if (startIdx === -1 || endIdx === -1) return new Set();

  const min = Math.min(startIdx, endIdx);
  const max = Math.max(startIdx, endIdx);

  return new Set(
    daySlots
      .slice(min, max + 1)
      .filter((s) => s.isWithinConstraints)
      .map((s) => s.id),
  );
}

export function computeResizePreview(
  selectionState: SelectionState,
  gridSlots: Record<WeekDay, GridSlot[]>,
  workingBlocks: Record<WeekDay, WorkingBlock[]>,
  timeStep: number,
): ResizePreview | null {
  if (
    !selectionState.isSelecting ||
    !selectionState.day ||
    !selectionState.currentSlotId ||
    !selectionState.resizingBlockId
  ) {
    return null;
  }

  if (
    selectionState.mode !== "resize-top" &&
    selectionState.mode !== "resize-bottom"
  ) {
    return null;
  }

  const block = workingBlocks[selectionState.day]?.find(
    (b) => b.id === selectionState.resizingBlockId,
  );
  if (!block) return null;

  const currentSlot = gridSlots[selectionState.day]?.find(
    (s) => s.id === selectionState.currentSlotId,
  );
  if (!currentSlot) return null;

  let newStartMinutes = block.startMinutes;
  let newEndMinutes = block.endMinutes;

  if (selectionState.mode === "resize-top") {
    if (currentSlot.minutes < block.endMinutes) {
      newStartMinutes = currentSlot.minutes;
    }
  } else {
    const newEnd = currentSlot.minutes + timeStep;
    if (newEnd > block.startMinutes) {
      newEndMinutes = newEnd;
    }
  }

  if (newStartMinutes >= newEndMinutes) return null;

  return {
    blockId: block.id,
    day: selectionState.day,
    startMinutes: newStartMinutes,
    endMinutes: newEndMinutes,
  };
}

// ════════════════════════════════════════════
// COPY DAY
// ════════════════════════════════════════════

export function copyDaySchedule(
  config: WorkingHoursConfig,
  fromDay: WeekDay,
  toDays: WeekDay[],
): WorkingHoursConfig {
  const sourceSchedule = config.schedule[fromDay];

  const newSchedule = { ...config.schedule };
  for (const day of toDays) {
    newSchedule[day] = {
      enabled: sourceSchedule.enabled,
      slots: sourceSchedule.slots.map((s) => ({ ...s })),
    };
  }

  return {
    ...config,
    schedule: newSchedule,
  };
}
