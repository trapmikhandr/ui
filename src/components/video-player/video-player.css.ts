import { style } from "@vanilla-extract/css";
import { colorContract, globalContract } from "@/themes";

// Main video-player container.
export const videoPlayer = style({
  position: "relative",
  maxWidth: "800px",
  backgroundColor: "#000",
  borderRadius: globalContract.shape.lg,
  overflow: "hidden",
  boxShadow: globalContract.elevation.level2,
});

// Video element.
export const videoElement = style({
  width: "100%",
  display: "block",
  backgroundColor: "#000",
});

// Debug information.
export const debugStatus = style({
  position: "absolute",
  top: globalContract.spacing.sm,
  left: globalContract.spacing.sm,
  backgroundColor: "#000",
  color: colorContract.inverse.onSurface,
  padding: `${globalContract.spacing.xs} ${globalContract.spacing.sm}`,
  borderRadius: globalContract.shape.md,
  fontFamily: "monospace",
  fontSize: globalContract.typography.body.medium.fontSize,
  zIndex: 10,
  border: `1px solid ${colorContract.outline.variant}`,
  backdropFilter: "blur(4px)",
});

export const layoutModal = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  selectors: {
    '&[data-is-modal="true"]': {
      position: "fixed",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "#000",
    },
  },
});

export const layoutVideo = style({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  top: 0,
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end",
});

export const layoutInfo = style({
  position: "relative",
  cursor: "pointer",
  outline: "none",
  width: "100%",
  height: "100%",
  backgroundColor: "transparent",
  border: "none",
});

// Video controls with CSS visibility logic.
export const layoutControls = style({
  padding: globalContract.spacing.sm,
  opacity: 1, // Visible by default when the video is paused.
  transition: "opacity 0.2s ease-in-out",
  minHeight: "51px",
  paddingTop: globalContract.spacing.xs,
  zIndex: 5,
  backdropFilter: "blur(8px)",
  display: "flex",
  alignItems: "flex-end",
  // CSS VISIBILITY LOGIC:
  // RULE 1: Hide controls while the video is playing.
  selectors: {
    [`${videoPlayer}[data-is-playing="true"] &`]: {
      opacity: 0,
    },
    // RULE 2: Show controls while the video is playing and hovered.
    [`${videoPlayer}[data-is-playing="true"]:hover &`]: {
      opacity: 1,
    },
    // RULE 3: Keep controls visible while the video is paused.
    [`${videoPlayer}[data-is-playing="false"] &`]: {
      opacity: 1,
    },
  },
});

export const controlsWrapper = style({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

// Container for control buttons.
export const controlsContainer = style({
  display: "flex",
  alignItems: "center",
  gap: globalContract.spacing.xs,
  height: "100%",
});

// Timeline.
export const timelineContainer = style({
  display: "flex",
  width: "100%",
  flex: 1,
});

export const controlsButtons = style({
  display: "flex",
});

// Control buttons.
export const controlButton = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  border: "none",
  backgroundColor: "#000",
  color: colorContract.inverse.onSurface,
  cursor: "pointer",
  transition: "background-color 0.2s ease-in-out, transform 0.15s ease-in-out",
  ":hover": {
    backgroundColor: colorContract.inverse.surface,
    transform: "scale(1.1)",
  },
  ":active": {
    transform: "scale(0.95)",
  },
  ":focus-visible": {
    outline: `2px solid ${colorContract.primary.base}`,
    outlineOffset: "2px",
  },
});

export const timeDisplayContainer = style({
  display: "flex",
  alignItems: "center",
  minWidth: "80px",
});

export const controlLoopContainer = style({
  marginLeft: globalContract.spacing.sm,
});

export const controlFullscreen = style({
  marginLeft: "auto",
});
