import { keyframes, style } from "@vanilla-extract/css";
import { colorContract, globalContract } from "../../themes/contracts";

// Entrance animation (M3 style: fade in + slight scale).
const enterKeyframe = keyframes({
  from: { opacity: 0, transform: "scale(0.95)" },
  to: { opacity: 1, transform: "scale(1)" },
});

export const tooltipContainer = style({
  // M3: Inverse Surface
  backgroundColor: colorContract.inverse.surface,
  color: colorContract.inverse.onSurface,

  // Typography: Body Small (compact)
  fontFamily: globalContract.typography.fontFamily.plain,
  fontSize: globalContract.typography.body.small.fontSize,
  lineHeight: globalContract.typography.body.small.lineHeight,
  fontWeight: globalContract.typography.body.small.fontWeight,

  // Shape & Spacing
  borderRadius: globalContract.shape.xs, // 4px
  padding: `${globalContract.spacing.xs} ${globalContract.spacing.sm}`, // 4px 8px

  // Layout
  maxWidth: "200px",
  wordWrap: "break-word",
  boxSizing: "border-box",

  // Layering
  zIndex: globalContract.zIndex.tooltip,

  // Animation
  animation: `${enterKeyframe} 200ms cubic-bezier(0.0, 0, 0.2, 1)`, // Standard easing
  transformOrigin: "top center", // Position-dependent in theory; centered for simplicity.
  pointerEvents: "none", // The tooltip must not intercept the pointer.
});
