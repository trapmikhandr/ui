import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import type { CalendarEvent, WorkingHoursConfig } from "../calendar.types";
import type { MobileCalendarView } from "./mobile.types";
import { MobileCalendar } from "./mobile-calendar";

const meta: Meta<typeof MobileCalendar> = {
  title: "Components/Calendar/MobileCalendar",
  component: MobileCalendar,
  parameters: {
    layout: "centered",
    viewport: { defaultViewport: "mobile1" },
  },
  decorators: [
    (Story) => (
      // Phone frame: gestures and the carousel are meaningful only in a narrow viewport.
      <div
        style={{
          width: "390px",
          height: "720px",
          border: "1px solid #e5e5e5",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MobileCalendar>;

const today = new Date();
const y = today.getFullYear();
const m = today.getMonth();
const d = today.getDate();

const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Session with Masha",
    startDate: new Date(y, m, d, 9, 0).toISOString(),
    endDate: new Date(y, m, d, 10, 0).toISOString(),
    status: "scheduled",
  },
  {
    id: "2",
    title: "Session with Peter",
    startDate: new Date(y, m, d, 9, 30).toISOString(),
    endDate: new Date(y, m, d, 10, 30).toISOString(),
    status: "ongoing",
  },
  {
    id: "3",
    title: "Session with Nikolai",
    startDate: new Date(y, m, d, 14, 0).toISOString(),
    endDate: new Date(y, m, d, 15, 0).toISOString(),
    status: "completed",
  },
  {
    id: "4",
    title: "Short consultation",
    startDate: new Date(y, m, d, 16, 0).toISOString(),
    endDate: new Date(y, m, d, 16, 15).toISOString(),
    status: "scheduled",
  },
  {
    id: "5",
    title: "Session with Anna",
    startDate: new Date(y, m, d + 1, 11, 0).toISOString(),
    endDate: new Date(y, m, d + 1, 12, 0).toISOString(),
    status: "scheduled",
  },
  {
    id: "6",
    title: "Session with Olga",
    startDate: new Date(y, m, d + 2, 10, 0).toISOString(),
    endDate: new Date(y, m, d + 2, 11, 0).toISOString(),
    status: "cancelled",
  },
  {
    id: "7",
    title: "Session with Dmitri",
    startDate: new Date(y, m, d + 7, 13, 0).toISOString(),
    endDate: new Date(y, m, d + 7, 14, 0).toISOString(),
    status: "scheduled",
  },
];

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

export const Day: Story = {
  args: { view: "day", events: mockEvents, workingHours },
};

export const ThreeDay: Story = {
  name: "3 days",
  args: { view: "3day", events: mockEvents, workingHours },
};

export const Week: Story = {
  name: "Week",
  args: { view: "week", events: mockEvents, workingHours },
};

export const Schedule: Story = {
  name: "Agenda",
  args: { view: "schedule", events: mockEvents },
};

export const ScheduleWithEmptyDays: Story = {
  name: "Agenda: show empty days",
  args: { view: "schedule", events: mockEvents, hideEmptyDays: false },
};

export const Interactive: Story = {
  name: "Interactive: swipes, zoom, drag-and-drop",
  render: function InteractiveMobileCalendar() {
    const [view, setView] = useState<MobileCalendarView>("3day");
    const [events, setEvents] = useState(mockEvents);

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
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <div style={{ display: "flex", gap: "4px", padding: "8px" }}>
          {(["schedule", "day", "3day", "week"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setView(mode)}
              style={{ fontWeight: view === mode ? 700 : 400 }}
            >
              {mode}
            </button>
          ))}
        </div>
        <div style={{ flex: 1, minHeight: 0 }}>
          <MobileCalendar
            view={view}
            events={events}
            workingHours={workingHours}
            onEventDrop={handleEventDrop}
            onEventClick={(id) => console.log("event click:", id)}
            onSlotClick={(date, time) => console.log("slot click:", date, time)}
            onVisibleRangeChange={(start, end) =>
              console.log("visible range:", start, end)
            }
          />
        </div>
      </div>
    );
  },
};
