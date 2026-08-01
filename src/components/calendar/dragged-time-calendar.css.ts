import { style } from "@vanilla-extract/css";
import { colorContract, globalContract } from "@/themes";
import { CALENDAR_Z } from "./calendar.constants";

// The time column uses the same sticky context as CalendarTimeColumn, otherwise
// the bar would move during horizontal week scrolling. Its z-index is above
// sticky (time-cell has an opaque background and zIndex: sticky=20, so a lower
// bar would be covered and invisible).
export const draggedRangeColumn = style({
  position: "sticky",
  left: 0,
  gridColumn: 1,
  pointerEvents: "none",
  zIndex: CALENDAR_Z.draggedRange,
});

export const draggedRangeBar = style({
  position: "absolute",
  // Position is always set with transform (from JS), not top, so the browser
  // moves an already-rendered layer on every drag tick (Composite) without
  // recalculating Layout/Paint. top:0 is the base for translateY.
  top: 0,
  left: 0,
  right: 0,
  willChange: "transform",
  // Without border-box, borders (2px+2px) are added on top of the JS-provided
  // height, moving the bottom edge 4px below the calculated position.
  boxSizing: "border-box",
  borderTop: `2px solid ${colorContract.primary.base}`,
  borderBottom: `2px solid ${colorContract.primary.base}`,
  backgroundColor: colorContract.primary.container,
  paddingInline: `${globalContract.spacing.xs}`,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  selectors: {
    "&::before": {
      content: '""',
      position: "absolute",
      top: "-6px",
      left: "0",
      width: "100%",
      height: "4px",
      backgroundColor: colorContract.surface.container,
    },
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: "-6px",
      left: "0",
      width: "100%",
      height: "4px",
      backgroundColor: colorContract.surface.container,
      zIndex: "-1",
    },
  },
});

export const draggedRangeLabel = style({
  fontSize: globalContract.typography.label.small.fontSize,
  fontWeight: 600,
  color: colorContract.primary.base,
  backgroundColor: colorContract.surface.default,
  borderRadius: globalContract.shape.md,
  paddingInline: `${globalContract.spacing.xs}`,
  transform: "translateY(-50%)",
  width: "fit-content",
  alignSelf: "flex-end",
  selectors: {
    "&:last-child": {
      alignSelf: "flex-start",
      transform: "translateY(50%)",
    },
  },
});
