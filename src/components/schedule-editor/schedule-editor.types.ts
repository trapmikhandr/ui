// ════════════════════════════════════════════
// WORKING HOURS TYPES (duck-typed, compatible with @poliglot/core)
// UI package must not depend on @poliglot/core directly
// ════════════════════════════════════════════

export const WEEKDAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

export type WeekDay = (typeof WEEKDAYS)[number];

// ════════════════════════════════════════════
// TIME TYPES
// Times are represented as minutes from midnight (e.g. 09:00 = 540, 17:30 = 1050).
// Use minutesToTime() for display, timeToMinutes() to parse "HH:MM" strings from DB.
// ════════════════════════════════════════════

/** Represents a single continuous time interval in minutes from midnight. */
export interface TimeSlot {
  /** Start time in minutes from midnight (e.g. 540 = 09:00). */
  start: number;
  /** End time in minutes from midnight (e.g. 1080 = 18:00). */
  end: number;
}

/** Defines the schedule for a single day. */
export interface DaySchedule {
  /** Whether this day is enabled (is a working day). */
  enabled: boolean;
  /** An array of time slots that are active for this day. */
  slots: TimeSlot[];
}

/** A single occupied time slot with a session count. */
export interface OccupiedTimeSlot {
  /** Start time in minutes from midnight. */
  start: number;
  /** End time in minutes from midnight. */
  end: number;
  /** The number of sessions occupying this slot. */
  count: number;
}

/** Defines occupied slots for a single day. */
export interface OccupiedDaySchedule {
  /** Whether this day has any occupied slots. */
  enabled: boolean;
  /** An array of occupied time slots. */
  slots: OccupiedTimeSlot[];
}

/** Occupied slots configuration — passed to ScheduleEditor to show booked time. */
export interface OccupiedSlotsConfig {
  /** Occupied slots per day of the week. */
  schedule: Record<WeekDay, OccupiedDaySchedule>;
}

/** The main configuration object for a weekly schedule. */
export interface WorkingHoursConfig {
  /** A record mapping each day of the week to its schedule. */
  schedule: Record<WeekDay, DaySchedule>;
  /** The IANA timezone identifier (e.g., "Europe/Moscow"). */
  timezone?: string;
}

// ════════════════════════════════════════════
// SCHEDULE EDITOR TYPES
// ════════════════════════════════════════════

/** Defines a time range in minutes from midnight. */
export interface TimeRange {
  /** Start time in minutes from midnight. */
  start: number;
  /** End time in minutes from midnight. */
  end: number;
}

/** A single cell in the grid, representing a discrete time interval on a specific day. */
export interface GridSlot {
  /** Unique identifier for the slot, e.g., "monday_540". */
  id: string;
  /** The day of the week this slot belongs to. */
  day: WeekDay;
  /** The time of this slot in minutes from midnight (e.g. 540 = 09:00). */
  minutes: number;
  /** Whether this slot is within the allowed `constraints`. */
  isWithinConstraints: boolean;
  /** Whether this slot is currently selected as part of a working block. */
  isSelected: boolean;
  /** Whether this slot is occupied by an existing session. */
  isOccupied: boolean;
}

/** A visual block representing one continuous period of selected time slots. */
export interface WorkingBlock {
  /** Unique identifier for the block, e.g., "monday_540-1020". */
  id: string;
  /** The day of the week this block belongs to. */
  day: WeekDay;
  /** The start time of the block in minutes from midnight. */
  startMinutes: number;
  /** The end time of the block in minutes from midnight. */
  endMinutes: number;
  /** The number of individual grid slots this block spans. */
  slotCount: number;
}

/** A visual block representing an occupied time period from an existing session. */
export interface OccupiedBlock {
  /** Unique identifier for the block, e.g., "monday_occupied_540-600". */
  id: string;
  /** The day of the week this block belongs to. */
  day: WeekDay;
  /** The start time of the block in minutes from midnight. */
  startMinutes: number;
  /** The end time of the block in minutes from midnight. */
  endMinutes: number;
  /** The number of sessions occupying this slot. */
  count: number;
}

/** Represents the state of a user's current pointer interaction (drag or resize). */
export interface SelectionState {
  /** True if a selection or resize action is in progress. */
  isSelecting: boolean;
  /** The day of the week where the interaction is happening. */
  day: WeekDay | null;
  /** The ID of the slot where the interaction started. */
  startSlotId: string | null;
  /** The ID of the slot currently under the pointer. */
  currentSlotId: string | null;
  /** The type of interaction being performed. */
  mode: "add" | "remove" | "resize-top" | "resize-bottom" | null;
  /** The ID of the block being resized, if applicable. */
  resizingBlockId: string | null;
}

export const INITIAL_SELECTION_STATE: SelectionState = {
  isSelecting: false,
  day: null,
  startSlotId: null,
  currentSlotId: null,
  mode: null,
  resizingBlockId: null,
};

/** Holds temporary data for visualizing the result of a resize operation before it's finalized. */
export interface ResizePreview {
  /** The ID of the block being resized. */
  blockId: string;
  /** The day of the week where the resize is happening. */
  day: WeekDay;
  /** The potential new start time in minutes from midnight. */
  startMinutes: number;
  /** The potential new end time in minutes from midnight. */
  endMinutes: number;
}

// ════════════════════════════════════════════
// COMPONENT PROPS
// ════════════════════════════════════════════

export interface ScheduleEditorProps {
  /** The configuration object that defines the schedule to be displayed and edited. */
  value: WorkingHoursConfig;
  /** Callback function that is invoked with the new configuration whenever the schedule is modified. */
  onChange: (config: WorkingHoursConfig) => void;
  /**
   * An optional schedule that acts as a boundary. The user can only select times
   * that are within the slots defined in `constraints`.
   * @example
   * const constraints = { schedule: { monday: { enabled: true, slots: [{ start: 480, end: 1020 }] }, ... } };
   */
  constraints?: WorkingHoursConfig;
  /**
   * An optional schedule representing already occupied time slots.
   * Occupied slots are displayed as muted blocks and cannot be selected.
   */
  occupiedSlots?: OccupiedSlotsConfig;
  /**
   * The overall time range to display in the editor's vertical axis.
   * @default { start: 420, end: 1260 } (07:00 – 21:00)
   */
  timeRange?: TimeRange;
  /**
   * The duration of each time slot in minutes.
   * @default 15
   */
  timeStep?: 15 | 30 | 60;
  /**
   * If true, the editor is completely disabled and no interactions are allowed.
   * @default false
   */
  disabled?: boolean;
  /**
   * If true, the editor is in read-only mode. Interactions are disabled, but the
   * visual appearance is different from the `disabled` state.
   * @default false
   */
  readOnly?: boolean;
  /**
   * If true, allows the working blocks to be resized by dragging their edges.
   * @default true
   */
  allowResize?: boolean;
}

// ════════════════════════════════════════════
// CONTEXT
// ════════════════════════════════════════════

export interface ScheduleEditorConfigContextValue {
  // ════════════════════════════════════════════
  // Data & Config
  // ════════════════════════════════════════════

  /** The current working hours configuration being edited. */
  value: WorkingHoursConfig;
  /** The schedule constraints (e.g., organization's working hours) that limit selectable times. */
  constraints: WorkingHoursConfig | null;
  /** The computed 2D map of all individual time slots for all days. The backing data model for the grid. */
  gridSlots: Record<WeekDay, GridSlot[]>;
  /** The computed array of visible, continuous blocks of time, derived from `gridSlots`. */
  workingBlocks: Record<WeekDay, WorkingBlock[]>;
  /** The computed array of occupied blocks from existing sessions. */
  occupiedBlocks: Record<WeekDay, OccupiedBlock[]>;
  /** The visible time range for the editor. */
  timeRange: TimeRange;
  /** The duration of a single slot in minutes (e.g., 15, 30, 60). */
  timeStep: number;
  /** An array of time values in minutes from midnight for the vertical time axis. */
  timeSlots: number[];
  /** The height of a single slot in pixels, derived from timeStep and hourHeight. */
  slotHeight: number;

  // ════════════════════════════════════════════
  // Actions
  // ════════════════════════════════════════════

  /** Action triggered when a user clicks on a working block, typically to remove it. */
  handleBlockClick: (block: WorkingBlock) => void;

  // ════════════════════════════════════════════
  // UI State
  // ════════════════════════════════════════════

  /** Whether the entire editor is disabled (no interactions allowed). */
  disabled: boolean;
  /** Whether the editor is in read-only mode (interactions disabled, but visually distinct from `disabled`). */
  readOnly: boolean;
  /** Whether the blocks can be resized by dragging their edges. */
  allowResize: boolean;
}

export interface ScheduleEditorSelectionContextValue {
  // ════════════════════════════════════════════
  // Interaction State
  // ════════════════════════════════════════════

  /** The current state of a user's interaction (e.g., dragging to select, resizing a block). */
  selectionState: SelectionState;
  /** A `Set` of slot IDs that are part of the current drag-selection preview. Used for visual feedback. */
  previewSelection: Set<string>;
  /** An object containing the preview dimensions of a block being resized. */
  resizePreview: ResizePreview | null;

  // ════════════════════════════════════════════
  // Actions
  // ════════════════════════════════════════════

  /** Action triggered when a user presses down on a time slot to initiate selection or resizing. */
  handleSlotPointerDown: (slot: GridSlot) => void;
  /** Action triggered when a user drags the pointer into a new time slot while selecting. */
  handleSlotPointerEnter: (slot: GridSlot) => void;
  /** Action triggered when a user releases the pointer, finalizing a selection or resize action. */
  handlePointerUp: () => void;
  /** Action triggered when a user presses down on a block's resize handle. */
  handleResizeStart: (
    block: WorkingBlock,
    edge: "top" | "bottom",
    e: React.PointerEvent,
  ) => void;
}
