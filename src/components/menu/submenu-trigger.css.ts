import { style } from "@vanilla-extract/css";
import { globalContract } from "@/themes";

export const row = style({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: globalContract.spacing.sm,
  width: "100%",
});

export const label = style({
  display: "flex",
  alignItems: "center",
  gap: globalContract.spacing.sm,
  minWidth: 0,
});

export const chevron = style({
  flexShrink: 0,
  marginLeft: globalContract.spacing.sm,
});

// Zero-size anchor in the item's top-right corner. The nested Popover
// (placement="right top") is positioned from it without relying on the
// React Aria Menu.Trigger props/ref (see submenu-trigger.tsx).
export const anchor = style({
  position: "absolute",
  top: 0,
  right: 0,
  width: 0,
  height: 0,
});
