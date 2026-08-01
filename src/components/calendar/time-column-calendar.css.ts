import { style } from "@vanilla-extract/css";
import { colorContract, globalContract } from "@/themes";
import { CALENDAR, CALENDAR_Z } from "./calendar.constants";

export const timeCell = style({
  position: "sticky",
  left: 0,
  zIndex: CALENDAR_Z.sticky,
  display: "flex",
  justifyContent: "flex-end",
  // The label is anchored to the cell's top edge, the line for that hour.
  alignItems: "flex-start",
  paddingInline: globalContract.spacing.sm,
  backgroundColor: colorContract.surface.container,
});

export const timeLabel = style({
  fontSize: globalContract.typography.label.small.fontSize,
  fontWeight: globalContract.typography.label.small.fontWeight,
  lineHeight: globalContract.typography.label.small.lineHeight,
  color: colorContract.onSurface.variant,
  // Center the text exactly on the line (the cell's top edge), like Google
  // Calendar, rather than placing it below; shift it upward by half its height.
  transform: "translateY(-50%)",
});

export const cornerCell = style({
  position: "sticky",
  top: 0,
  left: 0,
  zIndex: CALENDAR_Z.corner,
  backgroundColor: colorContract.surface.container,
  borderBottom: `${CALENDAR.gridLine} solid ${colorContract.outline.variant}`,
});
