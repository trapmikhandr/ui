import { style } from "@vanilla-extract/css";
import { colorContract } from "@/themes";

/**
 * ARROW
 * Popover arrow (a diamond rotated by 45°).
 */
export const arrow = style({
  position: "absolute",
  width: 8,
  height: 8,
  backgroundColor: colorContract.surface.containerHighest,
  borderLeft: `1px solid ${colorContract.outline.variant}`,
  borderTop: `1px solid ${colorContract.outline.variant}`,

  selectors: {
    // Use "starts with" (^=) so "top start" is treated as "top".

    // If placement starts with 'top', place the arrow at the bottom.
    '&[data-placement^="top"]': {
      bottom: -5, // Half the height (12px / 2) so the arrow protrudes.
      transform: "translateX(-50%) rotate(225deg)",
    },

    // If placement starts with 'bottom', place the arrow at the top.
    '&[data-placement^="bottom"]': {
      top: -5,
      transform: "translateX(-50%) rotate(45deg)",
    },

    // If placement starts with 'left', place the arrow on the right.
    '&[data-placement^="left"]': {
      right: -5,
      transform: "translateY(-50%) rotate(135deg)",
    },

    // If placement starts with 'right', place the arrow on the left.
    '&[data-placement^="right"]': {
      left: -5,
      transform: "translateY(-50%) rotate(-45deg)",
    },
  },
});
