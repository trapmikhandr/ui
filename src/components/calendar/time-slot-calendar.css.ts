import { recipe } from "@vanilla-extract/recipes";
import { transparentHoverMix } from "@/shared/utils";
import { colorContract } from "@/themes";
import { CALENDAR } from "./calendar.constants";

// Half-hour lines are lighter than hour lines; both derive from the divider
// token and therefore change correctly in dark theme.
const hourDivider = colorContract.outline.variant;

export const timeSlotButton = recipe({
  base: {
    position: "relative",
    // Stretch across the grid cell: the absolutely positioned event measures its height from this div.
    height: "100%",
    boxSizing: "border-box",
    // Only the left (vertical) border is enabled by default so lines do not double.
    borderLeft: `${CALENDAR.gridLine} solid ${hourDivider}`,
    transition: "background-color 0.12s ease",
  },
  variants: {
    isWorking: {
      true: {
        backgroundColor: "transparent",
        cursor: "pointer",
        selectors: {
          "&:hover": {
            backgroundColor: transparentHoverMix(
              colorContract.onSurface.variant,
            ),
          },
        },
      },
      // Non-working hours use a subtle surface tone, not a solid dim layer.
      false: {
        backgroundColor: colorContract.surface.container,
        cursor: "default",
      },
    },
    // Hour start: render a horizontal line.
    isHour: {
      true: { borderTop: `${CALENDAR.gridLine} solid ${hourDivider}` },
      false: {},
    },
  },
  defaultVariants: {
    isWorking: true,
  },
});
