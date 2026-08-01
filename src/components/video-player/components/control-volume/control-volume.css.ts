import { style } from "@vanilla-extract/css";
import { globalContract } from "@/themes";

// ============================================================================
// Main volume-control container.
// ============================================================================
export const controlVolume = style({
  position: "relative",
  display: "flex",
  alignItems: "center",
  height: "40px",
  gap: globalContract.spacing.sm,
});

// ============================================================================
// Volume-slider container.
// ============================================================================
export const volumeSliderContainer = style({
  display: "flex",
  alignItems: "center",
});

// ============================================================================
// Slider inside the container.
// ============================================================================
export const volumeSliderWrapper = style({
  width: 0,
  transformOrigin: "left",
  transform: "scaleX(0)",

  transition:
    "transform 150ms cubic-bezier(0.4, 0, 1, 1), width 200ms cubic-bezier(0.4, 0, 1, 1)",

  selectors: {
    // Show the slider when controlVolume is hovered.
    [`${controlVolume}:hover &`]: {
      width: 75, // ← This value can become a token if needed.
      transform: "scaleX(1)",
    },

    // Keep the slider visible while the user is moving it.
    [`${controlVolume}[data-slider-active="true"] &`]: {
      width: 75,
      transform: "scaleX(1)",
    },
  },
});
