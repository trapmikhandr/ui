import { createGlobalTheme } from "@vanilla-extract/css";
import { densityContract } from "./contracts/density.contract.css";
import { globalContract } from "./contracts/global.contract.css";

// Default — :root, always active.
createGlobalTheme(":root", densityContract, {
  controlHeight: "40px",
  controlPaddingX: globalContract.spacing.md, // 16px
  controlRadius: globalContract.shape.lg, // 16px (button)
  formGap: globalContract.spacing.smd, // 12px
});

// Compact — tables, schedule editor, and dense interfaces.
createGlobalTheme(`[data-density="compact"]`, densityContract, {
  controlHeight: "32px",
  controlPaddingX: globalContract.spacing.smd, // 12px
  controlRadius: globalContract.shape.md, // 12px
  formGap: globalContract.spacing.sm, // 8px
});

// Comfortable — client-booking forms and mobile scenarios.
createGlobalTheme(`[data-density="comfortable"]`, densityContract, {
  controlHeight: "48px",
  controlPaddingX: globalContract.spacing.mdl, // 20px
  controlRadius: globalContract.shape.xl, // 28px
  formGap: globalContract.spacing.md, // 16px
});
