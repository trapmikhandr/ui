import { style } from "@vanilla-extract/css";
import { colorContract, globalContract } from "@/themes";
import { animations } from "@/themes/animations.css";

// ============================================================================
// Modal-mode container.
// ============================================================================
export const layoutOverlayContainer = style({
  // Regular container by default.
  position: "relative",
});

// ============================================================================
// Content that can become modal.
// ============================================================================
export const layoutOverlayContent = style({
  // Regular positioning by default.
  position: "relative",

  // Modal mode through CSS.
  selectors: {
    '[data-modal-overlay="true"] &[data-modal="true"]': {
      // Turn the container into a modal.
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      zIndex: globalContract.zIndex.modal,
      // Entrance animation.
      animation: `${animations.scaleIn} 0.3s ease-out`,
    },
  },
});

// ============================================================================
// Backdrop overlay.
// ============================================================================
export const layoutOverlayBackdrop = style({
  // Hidden by default.
  display: "none",

  selectors: {
    // Show when the container is in modal mode.
    '[data-modal-overlay="true"] &': {
      display: "block",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: colorContract.scrim,
      zIndex: globalContract.zIndex.modal,
      backdropFilter: "blur(4px)",
      animation: `${animations.fadeIn} 0.3s ease-out`,
    },
  },
});
