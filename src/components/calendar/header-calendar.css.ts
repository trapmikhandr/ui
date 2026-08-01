import { style } from "@vanilla-extract/css";
import { globalContract } from "@/themes";

export const header = style({
  display: "flex",
  alignItems: "center",
  gap: globalContract.spacing.sm,
  marginBottom: globalContract.spacing.md,
  "@media": {
    "screen and (max-width: 768px)": {
      gap: globalContract.spacing.xs,
      marginBottom: globalContract.spacing.sm,
      padding: `0 ${globalContract.spacing.sm}`,
    },
  },
});

export const navigation = style({
  display: "flex",
  alignItems: "center",
  gap: globalContract.spacing.xs,
});

// Slot for additional actions (for example, the grid-density switch), aligned
// to the right edge of the header row after the month selector.
export const actionsSlot = style({
  display: "flex",
  alignItems: "center",
  gap: globalContract.spacing.xs,
  marginLeft: "auto",
});

export const todayBtn = style({
  borderRadius: "24px !important",
  paddingInline: "16px !important",
});

export const monthSelectorButton = style({
  fontSize: "20px",
  fontWeight: "bold",
  textTransform: "capitalize",
  padding: `${globalContract.spacing.xs} ${globalContract.spacing.sm}`,
});

export const monthPickerContainer = style({
  padding: "16px",
  minWidth: "240px",
});

export const monthPickerHeader = style({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "12px",
});

export const monthPickerGrid = style({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "8px",
});
