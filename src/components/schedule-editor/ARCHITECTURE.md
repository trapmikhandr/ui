# Schedule Editor — Architecture

## Files

| File | Purpose |
|------|---------|
| `index.ts` | Public API exports |
| `schedule-editor.types.ts` | All types: Time24, GridSlot, WorkingBlock, SelectionState, context |
| `schedule-editor.tsx` | Main component: state, computed data, handlers, context provider |
| `schedule-editor.context.ts` | React context + useScheduleEditorContext hook |
| `schedule-editor.utils.ts` | Pure functions: time conversion, grid building, slot merge/split, preview |
| `grid-schedule-editor.tsx` | CSS Grid layout: headers + time column + 7 day columns |
| `day-header-schedule-editor.tsx` | Day name header (Mon-Sun) |
| `time-column-schedule-editor.tsx` | Left column with time labels |
| `day-column-schedule-editor.tsx` | One day: slots + block overlays |
| `slot-schedule-editor.tsx` | Single interactive time cell (button) |
| `block-schedule-editor.tsx` | Working block overlay with resize handles |
| `schedule-editor.stories.tsx` | Storybook stories |
| `*.css.ts` | Vanilla Extract styles for each component |

## Component Tree

```
ScheduleEditor (state + context)
└── GridScheduleEditor (CSS Grid)
    ├── DayHeaderScheduleEditor x7
    ├── TimeColumnScheduleEditor (time labels)
    └── DayColumnScheduleEditor x7
        ├── BlockScheduleEditor x N (overlays)
        └── SlotScheduleEditor x N (buttons)
```

## Data Flow

```
Props: value, onChange, constraints?, timeRange?, timeStep?
          │
          ▼
   ┌─ timeSlots[]        ← generateTimeSlots(timeRange, timeStep)
   ├─ gridSlots           ← buildGridSlots(value, constraints, timeSlots)
   └─ workingBlocks       ← buildWorkingBlocks(gridSlots, timeStep)
          │
          ▼  (via Context)
     Sub-components render grid + block overlays
          │
          ▼  (user interaction)
     pointerDown → pointerEnter (drag) → pointerUp
          │
          ▼
     addSlots / removeSlots / resizeBlock → onChange(newConfig)
```

## Key Types

- **Time24** = `` `${number}:${number}` `` — compile-time "HH:MM" format hint
- **GridSlot** — single cell: `{ day, time, isSelected, isWithinConstraints }`
- **WorkingBlock** — continuous selected range: `{ day, startTime, endTime }`
- **SelectionState** — current drag/resize interaction state

## Two-Layer Rendering

Slots (buttons in flexbox) are the interactive layer — handle pointer events.
Blocks (absolute positioned overlays) are the visual layer — show working hours + resize handles.

## Interactions

| Action | Flow |
|--------|------|
| Drag to select | pointerDown on slot → pointerEnter updates preview → pointerUp adds slots |
| Drag to deselect | Same, but mode="remove" if started on selected slot |
| Resize block | pointerDown on resize handle → drag → pointerUp applies new size |
| Delete block | Right-click on block |
