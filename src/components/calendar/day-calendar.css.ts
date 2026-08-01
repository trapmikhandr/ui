import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { colorContract, globalContract } from "@/themes";
import { CALENDAR, CALENDAR_Z } from "./calendar.constants";

export const dayHeader = recipe({
  base: {
    position: "sticky",
    top: 0,
    zIndex: CALENDAR_Z.sticky,
    height: CALENDAR.headerHeight,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: globalContract.spacing.xs,
    backgroundColor: colorContract.surface.container,
    borderBottom: `${CALENDAR.gridLine} solid ${colorContract.outline.variant}`,
  },
  variants: {
    isLast: {
      true: {},
      false: {},
    },
  },
});

export const weekdayLabel = style({
  fontSize: globalContract.typography.label.small.fontSize,
  fontWeight: globalContract.typography.label.small.fontWeight,
  lineHeight: globalContract.typography.label.small.lineHeight,
  color: colorContract.onSurface.muted,
  textTransform: "uppercase",
});

export const dayNumber = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: CALENDAR.dayChipSize,
    height: CALENDAR.dayChipSize,
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
      false: {},
    },
  },
});
