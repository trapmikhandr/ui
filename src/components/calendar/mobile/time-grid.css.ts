import { createVar, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { colorContract, globalContract } from "@/themes";
import {
  HOUR_HEIGHT_DEFAULT,
  MOBILE_HEADER_HEIGHT,
  MOBILE_TIME_COL_WIDTH,
  MOBILE_Z,
} from "./mobile.constants";

/** Hour height is a runtime variable changed by pinch gestures without re-rendering. */
export const hourHeightVar = createVar();

export const gridRoot = style({
  vars: {
    [hourHeightVar]: `${HOUR_HEIGHT_DEFAULT}px`,
  },
  display: "flex",
  flexDirection: "column",
  height: "100%",
  minHeight: 0,
  overflow: "hidden",
  backgroundColor: colorContract.surface.default,
  // Vertical movement is handled by native scrolling; horizontal movement uses use-gesture.
  touchAction: "pan-y",
});

// ── Day header ───────────────────────────────────────────────────────────────

export const headerRow = style({
  display: "flex",
  flexShrink: 0,
  height: MOBILE_HEADER_HEIGHT,
  borderBottom: `1px solid ${colorContract.outline.variant}`,
  backgroundColor: colorContract.surface.container,
});

export const headerCorner = style({
  width: MOBILE_TIME_COL_WIDTH,
  flexShrink: 0,
});

export const headerViewport = style({
  flex: 1,
  overflow: "hidden",
});

export const headerTrack = style({
  display: "flex",
  height: "100%",
  willChange: "transform",
});

export const headerDay = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: globalContract.spacing.xs,
  minWidth: 0,
});

export const headerWeekday = style({
  fontSize: globalContract.typography.label.small.fontSize,
  fontWeight: globalContract.typography.label.small.fontWeight,
  lineHeight: globalContract.typography.label.small.lineHeight,
  color: colorContract.onSurface.muted,
  textTransform: "uppercase",
});

export const headerDayNumber = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "28px",
    height: "28px",
    padding: `0 ${globalContract.spacing.xs}`,
    borderRadius: globalContract.shape.full,
    fontSize: globalContract.typography.title.medium.fontSize,
    fontWeight: globalContract.typography.title.medium.fontWeight,
    lineHeight: 1,
    color: colorContract.onSurface.default,
  },
  variants: {
    isToday: {
      true: {
        backgroundColor: colorContract.primary.base,
        color: colorContract.primary.on,
      },
    },
  },
});

// ── Scrollable body ──────────────────────────────────────────────────────────

export const scrollContainer = style({
  flex: 1,
  minHeight: 0,
  display: "flex",
  overflowY: "auto",
  overflowX: "hidden",
  overscrollBehaviorY: "contain",
  touchAction: "pan-y",
  scrollbarWidth: "thin",
  scrollbarColor: `${colorContract.outline.default} transparent`,
});

export const gridContentHeight = style({
  // 24 hours at the current hour height.
  height: `calc(${hourHeightVar} * 24)`,
});

export const timeColumn = style([
  gridContentHeight,
  {
    position: "relative",
    width: MOBILE_TIME_COL_WIDTH,
    flexShrink: 0,
    backgroundColor: colorContract.surface.default,
    zIndex: MOBILE_Z.sticky,
  },
]);

export const timeLabel = style({
  position: "absolute",
  right: globalContract.spacing.sm,
  transform: "translateY(-50%)",
  fontSize: globalContract.typography.label.small.fontSize,
  fontWeight: globalContract.typography.label.small.fontWeight,
  color: colorContract.onSurface.variant,
  whiteSpace: "nowrap",
});

export const bodyViewport = style([
  gridContentHeight,
  {
    flex: 1,
    minWidth: 0,
    overflow: "hidden",
    position: "relative",
  },
]);

export const bodyTrack = style([
  gridContentHeight,
  {
    display: "flex",
    willChange: "transform",
  },
]);

// ── Day column ───────────────────────────────────────────────────────────────

export const dayColumn = style({
  position: "relative",
  height: "100%",
  minWidth: 0,
  borderLeft: `1px solid ${colorContract.outline.variant}`,
});

export const hourLine = style({
  position: "absolute",
  left: 0,
  right: 0,
  height: 0,
  borderTop: `1px solid ${colorContract.outline.variant}`,
});

export const nonWorkingBlock = style({
  position: "absolute",
  left: 0,
  right: 0,
  backgroundColor: colorContract.surface.dim,
  opacity: 0.5,
  pointerEvents: "none",
});

// ── Current-time line ────────────────────────────────────────────────────────

export const nowLine = style({
  position: "absolute",
  left: 0,
  right: 0,
  height: 0,
  borderTop: `2px solid ${colorContract.error.base}`,
  zIndex: MOBILE_Z.nowLine,
  pointerEvents: "none",
});

export const nowDot = style({
  position: "absolute",
  left: 0,
  top: 0,
  width: "9px",
  height: "9px",
  transform: "translate(-50%, -50%)",
  borderRadius: globalContract.shape.full,
  backgroundColor: colorContract.error.base,
});

// ── Drag overlay ─────────────────────────────────────────────────────────────

export const dragOverlayChip = style({
  height: "100%",
  transform: "scale(1.05)",
  transition: "transform 150ms cubic-bezier(0.2, 0, 0, 1)",
});
