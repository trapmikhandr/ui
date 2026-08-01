import { style } from "@vanilla-extract/css";
import { colorContract, globalContract } from "@/themes";

export const bar = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  backgroundColor: colorContract.surface.container,
  borderTop: `1px solid ${colorContract.outline.variant}`,
  boxSizing: "border-box",
  overflow: "hidden",
});

export const barNav = style({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  flex: 1,
  padding: `${globalContract.spacing.xs} 0`,
  boxSizing: "border-box",
});
