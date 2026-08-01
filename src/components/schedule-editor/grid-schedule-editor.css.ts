import { style } from "@vanilla-extract/css";
import { colorContract, globalContract } from "@/themes";

export const grid = style({
  display: "grid",
  border: `1px solid ${colorContract.outline.variant}`,
  borderRadius: globalContract.shape.md,
  overflow: "hidden",
  backgroundColor: colorContract.surface.container,
  touchAction: "none",
});

export const cornerSpacer = style({
  borderBottom: `1px solid ${colorContract.outline.variant}`,
  borderRight: `1px solid ${colorContract.outline.variant}`,
  backgroundColor: colorContract.surface.containerLow,
});
