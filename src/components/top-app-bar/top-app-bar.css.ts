import { style } from "@vanilla-extract/css";
import { colorContract, globalContract } from "@/themes";

export const bar = style({
  display: "grid",
  gridTemplateColumns: "48px 1fr 48px",
  alignItems: "center",
  minHeight: "56px",
  padding: `0 ${globalContract.spacing.xs}`,
  backgroundColor: colorContract.surface.default,
  borderBottom: `1px solid ${colorContract.outline.variant}`,
  boxSizing: "border-box",
  flexShrink: 0,
});

export const slot = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const title = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  overflow: "hidden",
  padding: `0 ${globalContract.spacing.xs}`,
  textAlign: "center",
  color: colorContract.onSurface.default,
  fontSize: globalContract.typography.title.medium.fontSize,
  lineHeight: globalContract.typography.title.medium.lineHeight,
  fontWeight: globalContract.typography.title.medium.fontWeight,
});
