import { keyframes, style } from "@vanilla-extract/css";
import { colorContract, globalContract } from "../../themes";

const indeterminate = keyframes({
  "0%": {
    transform: "translateX(-100%)",
  },
  "100%": {
    transform: "translateX(400%)",
  },
});

export const container = style({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  height: "3px",
  zIndex: globalContract.zIndex.tooltip,
  overflow: "hidden",
  backgroundColor: colorContract.primary.container,
});

export const bar = style({
  height: "100%",
  width: "25%",
  backgroundColor: colorContract.primary.base,
  animation: `${indeterminate} 1.5s ease-in-out infinite`,
});
