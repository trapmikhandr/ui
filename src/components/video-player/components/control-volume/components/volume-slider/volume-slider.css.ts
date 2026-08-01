import { style } from "@vanilla-extract/css";
import { colorContract, globalContract } from "@/themes";

// ============================================================================
// Main volume-slider container.
// ============================================================================
export const volumeSlider = style({
  width: "60px",
  height: "4px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
});

// ============================================================================
// Slider track.
// ============================================================================
export const volumeSliderTracker = style({
  position: "relative",
  height: "4px",
  width: "100%",
  backgroundColor: colorContract.surface.containerHigh,
  borderRadius: globalContract.shape.sm,

  // Restored and optimized the transition.
  // transition: 'height 0.2s ease-in-out',

  ":hover": {
    height: "6px",
  },
});

// ============================================================================
// Progress (filled portion of the slider).
// ============================================================================
export const volumeSliderProgress = style({
  position: "absolute",
  height: "100%",
  width: "100%",
  backgroundColor: colorContract.primary.base,
  borderRadius: globalContract.shape.sm,

  transition: "width 0.15s ease-in-out",
});

// ============================================================================
// Thumb.
// ============================================================================
export const volumeSliderThumb = style({
  position: "absolute",
  top: "50%",
  width: "12px",
  height: "12px",
  backgroundColor: colorContract.surface.containerHighest,
  borderRadius: "50%",
  cursor: "grab",

  transition: "background-color 0.2s ease-in-out, transform 0.15s ease-in-out",

  border: `2px solid ${colorContract.primary.base}`,

  ":hover": {
    transform: "translate(-50%, -50%) scale(1.3)",
    backgroundColor: colorContract.primary.base,
  },

  ":active": {
    cursor: "grabbing",
    transform: "translate(-50%, -50%) scale(1.1)",
  },

  ":focus-visible": {
    outline: `2px solid ${colorContract.primary.base}`,
    outlineOffset: "4px",
  },
});
