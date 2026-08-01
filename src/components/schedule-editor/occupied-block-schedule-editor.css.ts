import { style } from "@vanilla-extract/css";
import { colorContract, globalContract } from "@/themes";

export const block = style({
  appearance: "none",
  position: "absolute",
  left: "2px",
  right: "2px",
  backgroundColor: colorContract.surface.containerHighest,
  border: `1px solid ${colorContract.outline.variant}`,
  borderRadius: globalContract.shape.xs,
  cursor: "default",
  overflow: "hidden",
  zIndex: 1,
  opacity: 0.7,
  pointerEvents: "none",
});

export const blockContent = style({
  padding: `${globalContract.spacing.xs} ${globalContract.spacing.sm}`,
  fontSize: globalContract.typography.label.small.fontSize,
  fontWeight: globalContract.typography.label.medium.fontWeight,
  lineHeight: globalContract.typography.label.small.lineHeight,
  color: colorContract.onSurface.muted,
  textAlign: "center",
});
