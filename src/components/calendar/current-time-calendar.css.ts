import { style } from "@vanilla-extract/css";
import { colorContract, globalContract } from "@/themes";
import { CALENDAR, CALENDAR_Z } from "./calendar.constants";

// The container fills today's day column (a grid element); the line is limited
// to this column rather than spanning the entire week.
export const nowColumn = style({
  position: "relative",
  pointerEvents: "none",
  zIndex: CALENDAR_Z.nowLine,
});

export const nowLine = style({
  position: "absolute",
  left: 0,
  right: 0,
  height: 0,
  borderTop: `${CALENDAR.nowLineWidth} solid ${colorContract.error.base}`,
});

export const nowDot = style({
  position: "absolute",
  left: 0,
  top: 0,
  width: CALENDAR.nowDotSize,
  height: CALENDAR.nowDotSize,
  transform: "translate(-50%, -50%)",
  borderRadius: globalContract.shape.full,
  backgroundColor: colorContract.error.base,
});
