import { createGlobalThemeContract } from "@vanilla-extract/css";

export interface DensityContract {
  [key: string]: string;
  controlHeight: string;
  controlPaddingX: string;
  controlRadius: string;
  formGap: string;
}

export const densityContract = createGlobalThemeContract<DensityContract>({
  controlHeight: "density-control-height",
  controlPaddingX: "density-control-padding-x",
  controlRadius: "density-control-radius",
  formGap: "density-form-gap",
});
