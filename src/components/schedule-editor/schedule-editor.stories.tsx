import type { Meta, StoryObj } from "@storybook/react";
import { useMemo, useState } from "react";
import { Button } from "../button";
import { ScheduleEditor } from "./schedule-editor";
import type {
  DaySchedule,
  OccupiedDaySchedule,
  OccupiedSlotsConfig,
  WorkingHoursConfig,
} from "./schedule-editor.types";

const meta: Meta<typeof ScheduleEditor> = {
  title: "Components/Calendar/ScheduleEditor",
  component: ScheduleEditor,
  parameters: {
    layout: "padded",
  },
  decorators: [
    (Story) => (
      <div
        style={{
          border: "1px solid #e5e5e5",
          borderRadius: "8px",
          padding: "16px",
          backgroundColor: "transparent",
          minHeight: "600px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ScheduleEditor>;

// ════════════════════════════════════════════
// MOCK DATA
// ════════════════════════════════════════════

const disabledDay: DaySchedule = { enabled: false, slots: [] };
const disabledOccupiedDay: OccupiedDaySchedule = { enabled: false, slots: [] };
const defaultWorkday: DaySchedule = {
  enabled: true,
  slots: [{ start: 540, end: 1080 }],
};

const EMPTY_SCHEDULE: WorkingHoursConfig = {
  schedule: {
    monday: disabledDay,
    tuesday: disabledDay,
    wednesday: disabledDay,
    thursday: disabledDay,
    friday: disabledDay,
    saturday: disabledDay,
    sunday: disabledDay,
  },
};

const DEFAULT_SCHEDULE: WorkingHoursConfig = {
  schedule: {
    monday: defaultWorkday,
    tuesday: defaultWorkday,
    wednesday: defaultWorkday,
    thursday: defaultWorkday,
    friday: defaultWorkday,
    saturday: disabledDay,
    sunday: disabledDay,
  },
};

const COMPLEX_SCHEDULE: WorkingHoursConfig = {
  schedule: {
    monday: {
      enabled: true,
      slots: [
        { start: 540, end: 720 },
        { start: 840, end: 1080 },
      ],
    },
    tuesday: {
      enabled: true,
      slots: [{ start: 600, end: 960 }],
    },
    wednesday: {
      enabled: true,
      slots: [
        { start: 480, end: 660 },
        { start: 780, end: 1020 },
      ],
    },
    thursday: defaultWorkday,
    friday: {
      enabled: true,
      slots: [{ start: 540, end: 840 }],
    },
    saturday: disabledDay,
    sunday: disabledDay,
  },
};

const ORG_CONSTRAINTS: WorkingHoursConfig = {
  schedule: {
    monday: {
      enabled: true,
      slots: [{ start: 480, end: 1200 }],
    },
    tuesday: {
      enabled: true,
      slots: [{ start: 480, end: 1200 }],
    },
    wednesday: {
      enabled: true,
      slots: [{ start: 480, end: 1200 }],
    },
    thursday: {
      enabled: true,
      slots: [{ start: 480, end: 1200 }],
    },
    friday: {
      enabled: true,
      slots: [{ start: 480, end: 1080 }],
    },
    saturday: {
      enabled: true,
      slots: [{ start: 600, end: 900 }],
    },
    sunday: disabledDay,
  },
};

const OCCUPIED_SLOTS: OccupiedSlotsConfig = {
  schedule: {
    monday: {
      enabled: true,
      slots: [{ start: 540, end: 600, count: 4 }],
    },
    tuesday: {
      enabled: true,
      slots: [
        { start: 600, end: 630, count: 6 },
        { start: 840, end: 900, count: 2 },
      ],
    },
    wednesday: {
      enabled: true,
      slots: [{ start: 540, end: 585, count: 8 }],
    },
    thursday: disabledOccupiedDay,
    friday: {
      enabled: true,
      slots: [{ start: 660, end: 720, count: 3 }],
    },
    saturday: disabledOccupiedDay,
    sunday: disabledOccupiedDay,
  },
};

// ════════════════════════════════════════════
// STORIES
// ════════════════════════════════════════════

export const Empty: Story = {
  name: "Empty schedule",
  args: {
    value: EMPTY_SCHEDULE,
    onChange: (config) => console.log("Changed:", config),
  },
};

export const Default: Story = {
  name: "Mon–Fri 9–18",
  args: {
    value: DEFAULT_SCHEDULE,
    onChange: (config) => console.log("Changed:", config),
  },
};

export const WithConstraints: Story = {
  name: "With organization constraints",
  args: {
    value: DEFAULT_SCHEDULE,
    constraints: ORG_CONSTRAINTS,
    onChange: (config) => console.log("Changed:", config),
  },
};

export const ComplexSchedule: Story = {
  name: "Complex schedule (lunches, different days)",
  args: {
    value: COMPLEX_SCHEDULE,
    onChange: (config) => console.log("Changed:", config),
  },
};

export const ReadOnly: Story = {
  name: "Read-only",
  args: {
    value: DEFAULT_SCHEDULE,
    readOnly: true,
    onChange: () => {},
  },
};

export const Disabled: Story = {
  name: "Locked",
  args: {
    value: DEFAULT_SCHEDULE,
    disabled: true,
    onChange: () => {},
  },
};

export const WithOccupiedSlots: Story = {
  name: "With occupied slots",
  render: function OccupiedSlotsScheduleEditor() {
    const [value, setValue] = useState<WorkingHoursConfig>(EMPTY_SCHEDULE);

    return (
      <ScheduleEditor
        value={value}
        onChange={setValue}
        constraints={ORG_CONSTRAINTS}
        occupiedSlots={OCCUPIED_SLOTS}
        timeStep={15}
      />
    );
  },
};

export const Interactive: Story = {
  name: "Interactive (with save/cancel)",
  render: function InteractiveScheduleEditor() {
    // Initial data "from the server".
    const [savedValue, setSavedValue] =
      useState<WorkingHoursConfig>(DEFAULT_SCHEDULE);

    // Local editor state.
    const [currentValue, setCurrentValue] =
      useState<WorkingHoursConfig>(savedValue);

    // Simulate submitting data.
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isDirty = useMemo(
      () => JSON.stringify(currentValue) !== JSON.stringify(savedValue),
      [currentValue, savedValue],
    );

    const handleSave = () => {
      console.log("Saving...", currentValue);
      setIsSubmitting(true);
      setTimeout(() => {
        setSavedValue(currentValue);
        setIsSubmitting(false);
        console.log("Saved!");
      }, 1500); // Simulate network latency.
    };

    const handleCancel = () => {
      console.log("Cancelling changes");
      setCurrentValue(savedValue);
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          flex: 1,
        }}
      >
        <ScheduleEditor
          value={currentValue}
          onChange={setCurrentValue}
          constraints={ORG_CONSTRAINTS}
          disabled={isSubmitting}
        />

        {/* --- SAVE/CANCEL FOOTER --- */}
        {isDirty && (
          <div
            style={{
              position: "sticky",
              bottom: 0,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px",
              background: "rgba(255, 255, 255, 0.8)",
              backdropFilter: "blur(4px)",
              borderTop: "1px solid #e5e5e5",
              borderRadius: "0 0 8px 8px",
              margin: "-16px",
              marginTop: "auto",
            }}
          >
            <span style={{ color: "#005a9e", fontSize: "14px" }}>
              There are unsaved changes
            </span>
            <div style={{ display: "flex", gap: "8px" }}>
              <Button
                variant="outlined"
                onClick={handleCancel}
                isDisabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button onClick={handleSave} isLoading={isSubmitting}>
                Save
              </Button>
            </div>
          </div>
        )}

        {/* --- JSON PREVIEW --- */}
        <details>
          <summary
            style={{ cursor: "pointer", fontWeight: 500, padding: "8px 0" }}
          >
            Current value (JSON)
          </summary>
          <pre
            style={{
              padding: "16px",
              background: "#f5f5f5",
              borderRadius: "8px",
              fontSize: "12px",
              overflow: "auto",
              maxHeight: "300px",
            }}
          >
            {JSON.stringify(currentValue, null, 2)}
          </pre>
        </details>
      </div>
    );
  },
};
