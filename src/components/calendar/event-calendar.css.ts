import { keyframes, style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { colorContract, globalContract } from "@/themes";
import { CALENDAR } from "./calendar.constants";

const eventFillProgress = keyframes({
  "0%": { width: "0%" },
  "100%": { width: "100%" },
});

export const eventButton = recipe({
  base: {
    inset: globalContract.spacing.xs,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: globalContract.spacing.none,
    padding: `${globalContract.spacing.xs} ${globalContract.spacing.sm}`,
    borderRadius: globalContract.shape.sm,
    borderLeft: `${CALENDAR.eventAccentWidth} solid transparent`,
    cursor: "pointer",
    overflow: "hidden",
    textAlign: "left",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    fontSize: globalContract.typography.label.medium.fontSize,
    fontWeight: globalContract.typography.label.medium.fontWeight,
    lineHeight: globalContract.typography.label.medium.lineHeight,
    border: "none",
    userSelect: "none",
    WebkitUserSelect: "none",
    WebkitTouchCallout: "none",
    // manipulation, not none: vertical scrolling started on an event must work;
    // dragging is activated through TouchSensor's delay, which calls preventDefault
    // after activation.
    touchAction: "manipulation",
    transition: "opacity 0.15s ease-out, box-shadow 0.15s ease-out",
    selectors: {
      "&[aria-pressed]": {
        opacity: colorContract.state.dragOpacity,
      },
    },
  },
  variants: {
    status: {
      scheduled: {
        backgroundColor: colorContract.event.scheduled.background,
        color: colorContract.event.scheduled.text,
        borderLeftColor: colorContract.event.scheduled.text,
      },
      ongoing: {
        backgroundColor: colorContract.event.ongoing.background,
        color: colorContract.event.ongoing.text,
        borderLeftColor: colorContract.event.ongoing.text,
      },
      completed: {
        backgroundColor: colorContract.event.completed.background,
        color: colorContract.event.completed.text,
        borderLeftColor: colorContract.event.completed.text,
      },
      cancelled: {
        backgroundColor: colorContract.event.cancelled.background,
        color: colorContract.event.cancelled.text,
        borderLeftColor: colorContract.event.cancelled.text,
      },
      no_show: {
        backgroundColor: colorContract.event.noShow.background,
        color: colorContract.event.noShow.text,
        borderLeftColor: colorContract.event.noShow.text,
      },
      pending: {
        backgroundColor: colorContract.event.pending.background,
        color: colorContract.event.pending.text,
        borderLeft: `${CALENDAR.eventAccentWidth} dashed ${colorContract.event.pending.text}`,
      },
      future_pending: {
        backgroundColor: colorContract.event.pending.background,
        color: colorContract.event.pending.text,
        borderLeft: `${CALENDAR.eventAccentWidth} dashed ${colorContract.event.pending.text}`,
        opacity: 0.35,
        filter: "blur(0.5px)",
      },
    },
    isDraggable: {
      // DragOverlay has no grid cell: do not stretch through absolute/inset/percentages;
      // fill the overlay whose size dnd-kit already measured from the original event.
      true: {
        position: "relative",
        inset: "auto",
        width: "100%",
        height: "100%",
        cursor: "move",
        boxShadow: globalContract.elevation.level3,
      },
    },
    isEdgeNavActive: {
      true: {
        outline: `2px solid ${colorContract.primary.base}`,
        outlineOffset: "-2px",
        transform: "scale(0.95)",
        transition:
          "transform 150ms cubic-bezier(0.4, 0, 0.2, 1), outline 150ms ease, outline-offset 150ms ease",
        selectors: {
          "&::after": {
            content: '""',
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            backgroundColor: colorContract.primary.base,
            opacity: 0.15,
            animation: `${eventFillProgress} var(--edge-nav-interval) linear forwards`,
          },
        },
      },
    },
  },
  defaultVariants: {
    status: "scheduled",
  },
});

export const eventTitle = style({
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  width: "100%",
});

export const eventTime = style({
  fontSize: "10px",
  opacity: 0.8,
  marginTop: "1px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  width: "100%",
});
