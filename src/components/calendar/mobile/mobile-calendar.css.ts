import { style } from "@vanilla-extract/css";
import { colorContract } from "@/themes";

export const mobileRoot = style({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  minHeight: 0,
  overflow: "hidden",
  backgroundColor: colorContract.surface.default,
});
