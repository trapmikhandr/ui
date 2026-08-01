import { style } from "@vanilla-extract/css";
import { globalContract } from "@/themes";

export const root = style({
  display: "flex",
  flexDirection: "column",
  gap: globalContract.spacing.md,
  userSelect: "none",
});
