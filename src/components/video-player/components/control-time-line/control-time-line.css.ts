import { style } from "@vanilla-extract/css";
import { colorContract, globalContract } from "@/themes";

// ============================================================================
// Main timeline container.
// ============================================================================
export const controlTimeLine = style({
  height: "20px",
  marginInline: globalContract.spacing.sm,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  width: "100%",

  // Disabled state.
  selectors: {
    '&[data-disabled="true"]': {
      cursor: "not-allowed",
      opacity: 0.6,
    },
  },
});

// ============================================================================
// Track (the bar the thumb moves along).
// ============================================================================
export const track = style({
  position: "relative",
  width: "100%",
  height: "6px",
  // width: '100%',
  backgroundColor: colorContract.surface.containerHigh,
  borderRadius: globalContract.shape.sm,

  // transition: 'height 0.2s ease-in-out',

  // Make the track slightly taller on hover.
  selectors: {
    [`${controlTimeLine}:hover &`]: {
      height: "8px",
    },
  },
});

// ============================================================================
// Filled progress portion.
// ============================================================================
export const progressFill = style({
  position: "absolute",
  top: 0,
  left: 0,
  height: "100%",
  width: "100%",
  backgroundColor: colorContract.primary.base,
  borderRadius: globalContract.shape.sm,

  // transition: 'width 0.15s ease-in-out', // ← Specific property (width only).

  // Optional active-state glow.
  selectors: {
    [`${controlTimeLine}:hover &`]: {
      boxShadow: `0 0 8px ${colorContract.primary.base}`,
    },
  },
});

// ============================================================================
// Thumb.
// ============================================================================
export const thumb = style({
  position: "absolute",
  top: "50%",
  width: "12px",
  height: "12px",
  backgroundColor: colorContract.surface.containerHighest,
  borderRadius: "50%",
  cursor: "grab",
  transform: "translate(-50%, -50%)",

  transition:
    "background-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out, transform 0.15s ease-in-out",

  border: `2px solid ${colorContract.primary.base}`,

  // Interaction states.
  ":hover": {
    transform: "translate(-50%, -50%) scale(1.5)",
    boxShadow: `0 0 8px ${colorContract.primary.base}`,
  },

  ":active": {
    transform: "translate(-50%, -50%) scale(1.5)",
    cursor: "grabbing",
    backgroundColor: colorContract.primary.base,
  },

  // Focus state during keyboard navigation.
  ":focus-visible": {
    outline: `2px solid ${colorContract.primary.base}`,
    outlineOffset: "4px",
  },

  selectors: {
    // Disabled state.
    '&[data-disabled="true"]': {
      cursor: "not-allowed",
      backgroundColor: colorContract.surface.containerHigh,
      borderColor: colorContract.outline.variant,
      opacity: 0.6,
    },
  },
});
