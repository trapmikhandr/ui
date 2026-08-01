import type { Meta, StoryObj } from "@storybook/react";
import { useRef } from "react";
import { CALENDAR, slotHeightPx } from "./calendar.constants";
import {
  CalendarConfigContext,
  type CalendarConfigContextValue,
  CalendarDragTimeContext,
  type CalendarDragTimeContextValue,
  CalendarHourHeightContext,
  type CalendarHourHeightContextValue,
} from "./calendar.context";
import { getTimeSlots, WEEK_DAYS } from "./calendar.utils";
import { DraggedTimeIndicator } from "./dragged-time-calendar";
import { gridContainer } from "./grid-calendar.css";
import { CalendarTimeColumn } from "./time-column-calendar";

/**
 * Isolated styling fixture for DraggedTimeIndicator. It renders a
 * time column and a line with a FIXED range, without a real dnd-kit drag,
 * so the CSS can be inspected without holding the pointer.
 */
function DraggedTimeIndicatorPreview({
  timeStep = 15,
  draggedStart = "10:30",
  draggedEnd = "11:00",
  hourHeight,
}: {
  timeStep?: 15 | 30 | 60;
  draggedStart?: string;
  draggedEnd?: string;
  hourHeight?: number;
}) {
  const timeRange = { start: "09:00", end: "18:00" };
  const timezone = "UTC";
  const timeSlots = getTimeSlots(timeRange, timeStep);
  const containerRef = useRef<HTMLDivElement>(null);

  const configValue: CalendarConfigContextValue = {
    columns: 1,
    days: WEEK_DAYS,
    weekOffset: 0,
    weekStartsOn: "mon",
    containerRef,
    timeRange,
    timeStep,
    timezone,
    workingHours: null,
    visibleDates: [new Date("2025-01-06T00:00:00Z")],
    timeSlots,
    isEventDragging: true,
    isWorkingHour: () => true,
    isDroppable: () => true,
    navigate: () => {},
  };

  const dragTimeValue: CalendarDragTimeContextValue = {
    draggedTimeRange: {
      start: new Date(`2025-01-06T${draggedStart}:00Z`),
      end: new Date(`2025-01-06T${draggedEnd}:00Z`),
    },
  };

  const hourHeightValue: CalendarHourHeightContextValue = { hourHeight };

  return (
    <CalendarConfigContext.Provider value={configValue}>
      <CalendarDragTimeContext.Provider value={dragTimeValue}>
        <CalendarHourHeightContext.Provider value={hourHeightValue}>
          <div
            className={gridContainer}
            style={{
              gridTemplateColumns: `${CALENDAR.timeColWidth} 240px`,
              gridTemplateRows: `${CALENDAR.headerHeight} repeat(${timeSlots.length}, ${slotHeightPx(timeStep, hourHeight)})`,
              maxWidth: "320px",
            }}
          >
            <CalendarTimeColumn />
            {/* Empty day column — background only, for visual context. */}
            <div
              style={{
                gridColumn: 2,
                gridRow: `2 / span ${timeSlots.length}`,
                borderLeft: "1px solid #e0e0e0",
              }}
            />
            <DraggedTimeIndicator />
          </div>
        </CalendarHourHeightContext.Provider>
      </CalendarDragTimeContext.Provider>
    </CalendarConfigContext.Provider>
  );
}

const meta: Meta<typeof DraggedTimeIndicatorPreview> = {
  title: "Components/Calendar/DraggedTimeIndicator",
  component: DraggedTimeIndicatorPreview,
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof DraggedTimeIndicatorPreview>;

export const Default: Story = {
  name: "10:30–11:00, 15-minute step",
  args: {
    timeStep: 15,
    draggedStart: "10:30",
    draggedEnd: "11:00",
  },
};

export const OnHourBoundary: Story = {
  name: "Exactly on hour boundaries (10:00–11:00)",
  args: {
    timeStep: 15,
    draggedStart: "10:00",
    draggedEnd: "11:00",
  },
};

export const HalfHourStep: Story = {
  name: "30-minute step",
  args: {
    timeStep: 30,
    draggedStart: "10:30",
    draggedEnd: "11:30",
  },
};

export const HourStep: Story = {
  name: "60-minute step",
  args: {
    timeStep: 60,
    draggedStart: "10:00",
    draggedEnd: "12:00",
  },
};
