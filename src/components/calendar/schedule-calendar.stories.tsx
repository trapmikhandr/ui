import type { Meta, StoryObj } from "@storybook/react";
import { Profiler, type ProfilerOnRenderCallback, useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import type { CalendarEvent, WorkingHoursConfig } from "./calendar.types";
import { ScheduleCalendar } from "./schedule-calendar";

const meta: Meta<typeof ScheduleCalendar> = {
  title: "Components/Calendar/ScheduleCalendar",
  component: ScheduleCalendar,
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
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ScheduleCalendar>;

// Generate local dates so events always fall within visible calendar slots (08:00–20:00).
const today = new Date();
const y = today.getFullYear();
const m = today.getMonth();
const d = today.getDate();
const todayStr = `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Session with Masha (upcoming)",
    startDate: new Date(y, m, d, 9, 0).toISOString(),
    endDate: new Date(y, m, d, 10, 0).toISOString(),
    status: "scheduled",
  },
  {
    id: "2",
    title: "Session with Peter (ongoing)",
    startDate: new Date(y, m, d, 11, 0).toISOString(),
    endDate: new Date(y, m, d, 12, 0).toISOString(),
    status: "ongoing",
  },
  {
    id: "3",
    title: "Session with Nikolai (completed)",
    startDate: new Date(y, m, d, 14, 0).toISOString(),
    endDate: new Date(y, m, d, 15, 0).toISOString(),
    status: "completed",
  },
  {
    id: "4",
    title: "Session with Anna (cancelled)",
    startDate: new Date(y, m, d, 16, 0).toISOString(),
    endDate: new Date(y, m, d, 17, 0).toISOString(),
    status: "cancelled",
  },
];

// Working hours.
const workingHours: WorkingHoursConfig = {
  default: {
    mon: { start: "09:00", end: "18:00" },
    tue: { start: "09:00", end: "18:00" },
    wed: { start: "09:00", end: "18:00" },
    thu: { start: "09:00", end: "18:00" },
    fri: { start: "09:00", end: "17:00" },
    sat: null,
    sun: null,
  },
};

// ============================================
// STORIES
// ============================================

export const Default: Story = {
  name: "Default (7 days)",
  args: {
    events: mockEvents,
    timeRange: { start: "08:00", end: "20:00" },
  },
};

export const WithWorkingHours: Story = {
  name: "With working hours",
  args: {
    events: mockEvents,
    workingHours,
    timeRange: { start: "08:00", end: "20:00" },
  },
};

export const FiveDays: Story = {
  name: "5 days (Mon–Fri)",
  args: {
    events: mockEvents,
    columns: 5,
    days: ["mon", "tue", "wed", "thu", "fri"],
    timeRange: { start: "08:00", end: "18:00" },
  },
};

export const SingleDay: Story = {
  name: "1 day",
  args: {
    events: mockEvents,
    columns: 1,
    timeRange: { start: "08:00", end: "20:00" },
  },
};

export const ThreeDays: Story = {
  name: "3 days",
  args: {
    events: mockEvents,
    columns: 3,
    timeRange: { start: "09:00", end: "18:00" },
  },
};

export const HalfHourStep: Story = {
  name: "30-minute step",
  args: {
    events: mockEvents,
    timeStep: 30,
    timeRange: { start: "09:00", end: "14:00" },
  },
};

export const WithCallbacks: Story = {
  name: "With callbacks (see console)",
  args: {
    events: mockEvents,
    timeRange: { start: "08:00", end: "20:00" },
    onEventClick: (eventId) => console.log("Event clicked:", eventId),
    onEventDrop: (eventId, start, end) =>
      console.log("Event dropped:", { eventId, start, end }),
    onSlotClick: (date, time) => console.log("Slot clicked:", { date, time }),
    onNavigate: (direction) => console.log("Navigate:", direction),
  },
};

export const Empty: Story = {
  name: "Empty calendar",
  args: {
    events: [],
    timeRange: { start: "09:00", end: "18:00" },
  },
};

export const ManyEvents: Story = {
  name: "Many events",
  args: {
    events: [
      ...mockEvents,
      {
        id: "4",
        title: "Session with Sasha",
        startDate: new Date(y, m, d, 10, 0).toISOString(),
        endDate: new Date(y, m, d, 11, 0).toISOString(),
        status: "scheduled",
      },
      {
        id: "5",
        title: "Session with Dmitri",
        startDate: new Date(y, m, d, 13, 0).toISOString(),
        endDate: new Date(y, m, d, 14, 0).toISOString(),
        status: "ongoing",
      },
      {
        id: "6",
        title: "Session with Olga",
        startDate: new Date(y, m, d, 15, 0).toISOString(),
        endDate: new Date(y, m, d, 16, 0).toISOString(),
        status: "completed",
      },
    ],
    timeRange: { start: "08:00", end: "18:00" },
  },
};

export const Interactive: Story = {
  render: function InteractiveCalendar() {
    const [events, setEvents] = useState<CalendarEvent[]>(mockEvents);

    const handleEventDrop = (
      eventId: string,
      startDate: string,
      endDate: string,
    ) => {
      setEvents((prev) =>
        prev.map((event) =>
          event.id === eventId ? { ...event, startDate, endDate } : event,
        ),
      );
    };

    return (
      <ScheduleCalendar
        events={events}
        timeRange={{ start: "08:00", end: "20:00" }}
        onEventDrop={handleEventDrop}
      />
    );
  },
};

/**
 * Measurement (2026-07-29), manual drag in Storybook, real browser: average
 * render duration is ~3ms per commit, without spikes into tens of milliseconds.
 *
 * The number of commits is not meaningful — it is proportional to the number
 * of slots crossed by the pointer during the drag (dependent on the user,
 * not the code). The meaningful metric is the duration of each render
 * (actualDuration), not the number of renders.
 */
export const InteractiveWithPerfLogging: Story = {
  name: "Perf: log render duration to the console (drag an event)",
  render: function ProfiledInteractiveCalendar() {
    const [events, setEvents] = useState<CalendarEvent[]>(mockEvents);

    const handleEventDrop = (
      eventId: string,
      startDate: string,
      endDate: string,
    ) => {
      setEvents((prev) =>
        prev.map((event) =>
          event.id === eventId ? { ...event, startDate, endDate } : event,
        ),
      );
    };

    // Official React API for measuring render cost — works in a real browser
    // with a real layout, without jsdom/dnd-kit mocks.
    // actualDuration is the time React actually spent on this render.
    const onRender: ProfilerOnRenderCallback = (_id, phase, actualDuration) => {
      console.log(`[commit perf] ${phase}: ${actualDuration.toFixed(2)}ms`);
    };

    return (
      <Profiler id="ScheduleCalendar" onRender={onRender}>
        <ScheduleCalendar
          events={events}
          timeRange={{ start: "08:00", end: "20:00" }}
          onEventDrop={handleEventDrop}
        />
      </Profiler>
    );
  },
};

export const InteractiveTest: Story = {
  name: "Test: interaction (play function)",
  args: {
    events: mockEvents,
    timeRange: { start: "08:00", end: "20:00" },
  },
  play: async ({ canvasElement }) => {
    // Emulate user actions in the play function.
    const canvas = within(canvasElement);

    // 1. Find "Session with Masha (upcoming)" by its text.
    const eventMasha = await canvas.findByText("Session with Masha (upcoming)");

    // 2. Verify that it rendered and is visible.
    await expect(eventMasha).toBeInTheDocument();

    // 3. Simulate clicking the event.
    await userEvent.click(eventMasha);

    // 4. Find a slot (for example, by aria-label "Time slot 09:00 on ...").
    // Because the date is dynamic (today), find it by its time text.
    const slot0900 = await canvas.findByLabelText(
      new RegExp(`Time slot 09:00 on ${todayStr}`),
    );
    await expect(slot0900).toBeInTheDocument();
  },
};
