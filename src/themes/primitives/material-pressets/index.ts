/**
 * COLOR PRESETS
 * Builds color palettes from JSON files and shared values.
 */

// 1. Import the JSON file directly.
import greenJson from "./green/material-theme.json";
import greenCustomJson from "./green-custom/material-theme.json";
import terracottaJson from "./terracotta/material-theme.json";
import yellowJson from "./yellow/material-theme.json";

// 2. Define static palettes (Success, Warning, Error),
// because Material Builder JSON exports only brand colors in the "palettes" section.
const staticColors = {
  white: "#ffffff",
  black: "#000000",
  transparent: "transparent",
  error: {
    0: "#000000",
    10: "#410002",
    20: "#690005",
    30: "#93000A",
    40: "#BA1A1A",
    50: "#DE3730",
    60: "#FF5449",
    70: "#FF897D",
    80: "#FFB4AB",
    90: "#FFDAD6",
    95: "#FFEDEA",
    99: "#FFFBFF",
    100: "#FFFFFF",
  },
  success: {
    0: "#000000",
    10: "#002106",
    20: "#00390f",
    30: "#005319",
    40: "#006e24",
    50: "#008a30",
    60: "#00a73c",
    70: "#2fc456",
    80: "#54e070",
    90: "#72fd89",
    95: "#c4ffca",
    99: "#f5fff4",
    100: "#ffffff",
  },
  warning: {
    0: "#000000",
    10: "#261900",
    20: "#402d00",
    30: "#5c4300",
    40: "#7a5900",
    50: "#997100",
    60: "#b98a00",
    70: "#d9a300",
    80: "#f9bd00",
    90: "#ffe08a",
    95: "#fff0c9",
    99: "#fffbff",
    100: "#ffffff",
  },
} as const;

// 3. Build the Terracotta preset.
// Map JSON fields (kebab-case) to our fields (camelCase).
export const terracotta = {
  schemes: terracottaJson.schemes,

  palettes: {
    // 2. Brand palettes from JSON.
    primary: terracottaJson.palettes.primary,
    secondary: terracottaJson.palettes.secondary,
    tertiary: terracottaJson.palettes.tertiary,
    neutral: terracottaJson.palettes.neutral,
    neutralVariant: terracottaJson.palettes["neutral-variant"],

    // 3. Merge the static palettes.
    // colors.palettes.success is now available.
    ...staticColors,
  },
} as const;

export const yellow = {
  schemes: yellowJson.schemes,

  palettes: {
    // 2. Brand palettes from JSON.
    primary: yellowJson.palettes.primary,
    secondary: yellowJson.palettes.secondary,
    tertiary: yellowJson.palettes.tertiary,
    neutral: yellowJson.palettes.neutral,
    neutralVariant: yellowJson.palettes["neutral-variant"],

    // 3. Merge the static palettes.
    // colors.palettes.success is now available.
    ...staticColors,
  },
} as const;

export const green = {
  schemes: greenJson.schemes,

  palettes: {
    // 2. Brand palettes from JSON.
    primary: greenJson.palettes.primary,
    secondary: greenJson.palettes.secondary,
    tertiary: greenJson.palettes.tertiary,
    neutral: greenJson.palettes.neutral,
    neutralVariant: greenJson.palettes["neutral-variant"],

    // 3. Merge the static palettes.
    // colors.palettes.success is now available.
    ...staticColors,
  },
} as const;

export const greenCustom = {
  schemes: greenCustomJson.schemes,

  palettes: {
    // 2. Brand palettes from JSON.
    primary: greenCustomJson.palettes.primary,
    secondary: greenCustomJson.palettes.secondary,
    tertiary: greenCustomJson.palettes.tertiary,
    neutral: greenCustomJson.palettes.neutral,
    neutralVariant: greenCustomJson.palettes["neutral-variant"],

    // 3. Merge the static palettes.
    // colors.palettes.success is now available.
    ...staticColors,
  },
} as const;

// Type for use in other files.
export type ColorPreset = typeof terracotta;

// Export the preset collection for convenient switching.
export const presets = {
  terracotta,
  yellow,
  green,
  // Add other presets here, for example: ocean, blue, and so on.
};

export type PresetName = keyof typeof presets;
