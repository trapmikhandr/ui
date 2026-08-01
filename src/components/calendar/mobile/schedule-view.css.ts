import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { colorContract, globalContract } from "@/themes";
import { MOBILE_Z } from "./mobile.constants";

export const scheduleRoot = style({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  minHeight: 0,
  overflow: "hidden",
  backgroundColor: colorContract.surface.default,
});

/** Month for the current scroll area, fixed at the top. */
export const stickyMonth = style({
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  height: "40px",
  paddingInline: globalContract.spacing.md,
  fontSize: globalContract.typography.title.medium.fontSize,
  fontWeight: globalContract.typography.title.medium.fontWeight,
  color: colorContract.onSurface.default,
  backgroundColor: colorContract.surface.container,
  borderBottom: `1px solid ${colorContract.outline.variant}`,
  zIndex: MOBILE_Z.sticky,
  textTransform: "capitalize",
});

export const scrollArea = style({
  flex: 1,
  minHeight: 0,
  overflowY: "auto",
  overscrollBehaviorY: "contain",
  scrollbarWidth: "thin",
  scrollbarColor: `${colorContract.outline.default} transparent`,
});

/** Inner container spanning the full virtual list height. */
export const virtualInner = style({
  position: "relative",
  width: "100%",
});

export const virtualRow = style({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
});

export const monthRow = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  height: "120px",
  marginInline: globalContract.spacing.md,
  marginTop: globalContract.spacing.md,
  marginBottom: globalContract.spacing.sm,
  paddingInline: globalContract.spacing.lg,
  borderRadius: globalContract.shape.md,
  overflow: "hidden",
  position: "relative",
  boxShadow: globalContract.elevation.level1,
});

export const monthRowText = style({
  fontSize: globalContract.typography.headline.small.fontSize,
  fontWeight: "bold",
  textTransform: "capitalize",
  zIndex: 1,
});

export const monthRowIcon = style({
  position: "absolute",
  right: "16px",
  bottom: "-10px",
  opacity: 0.8,
  zIndex: 0,
  transform: "rotate(-15deg)",
});

export const birthdayCard = style({
  background: "linear-gradient(135deg, #ffeef8 0%, #ffdfd3 100%) !important",
  color: "#a03058 !important",
  borderLeft: "4px solid #ff69b4",
  boxShadow: globalContract.elevation.level1,
});

export const dayRow = style({
  display: "flex",
  gap: globalContract.spacing.sm,
  paddingInline: globalContract.spacing.md,
  paddingBlock: globalContract.spacing.xs,
});

export const dayChip = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: globalContract.spacing.xs,
  width: "48px",
  flexShrink: 0,
});

export const dayChipWeekday = style({
  fontSize: globalContract.typography.label.small.fontSize,
  fontWeight: globalContract.typography.label.small.fontWeight,
  color: colorContract.onSurface.muted,
  textTransform: "uppercase",
});

export const dayChipNumber = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    borderRadius: globalContract.shape.full,
    fontSize: globalContract.typography.title.medium.fontSize,
    fontWeight: globalContract.typography.title.medium.fontWeight,
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

export const dayEvents = style({
  flex: 1,
  minWidth: 0,
  display: "flex",
  flexDirection: "column",
  gap: globalContract.spacing.xs,
});

/** Agenda event card (its own recipe; eventButton uses grid geometry). */
export const scheduleEventCard = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    gap: globalContract.spacing.none,
    padding: `${globalContract.spacing.sm} ${globalContract.spacing.md}`,
    borderRadius: globalContract.shape.md,
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    width: "100%",
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",
  },
  variants: {
    status: {
      scheduled: {
        backgroundColor: colorContract.event.scheduled.background,
        color: colorContract.event.scheduled.text,
      },
      ongoing: {
        backgroundColor: colorContract.event.ongoing.background,
        color: colorContract.event.ongoing.text,
      },
      completed: {
        backgroundColor: colorContract.event.completed.background,
        color: colorContract.event.completed.text,
      },
      cancelled: {
        backgroundColor: colorContract.event.cancelled.background,
        color: colorContract.event.cancelled.text,
      },
      no_show: {
        backgroundColor: colorContract.event.noShow.background,
        color: colorContract.event.noShow.text,
      },
      pending: {
        backgroundColor: colorContract.event.pending.background,
        color: colorContract.event.pending.text,
      },
      future_pending: {
        backgroundColor: colorContract.event.pending.background,
        color: colorContract.event.pending.text,
        opacity: 0.35,
        filter: "blur(0.5px)",
      },
    },
  },
  defaultVariants: {
    status: "scheduled",
  },
});

export const scheduleEventTitle = style({
  fontSize: globalContract.typography.label.large.fontSize,
  fontWeight: globalContract.typography.label.large.fontWeight,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const scheduleEventTime = style({
  fontSize: globalContract.typography.label.small.fontSize,
  opacity: 0.8,
});

export const emptyDayNote = style({
  display: "flex",
  alignItems: "center",
  minHeight: "32px",
  paddingInline: globalContract.spacing.md,
  fontSize: globalContract.typography.label.medium.fontSize,
  color: colorContract.onSurface.muted,
});
