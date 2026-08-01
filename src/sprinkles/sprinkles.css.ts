/**
 * SPRINKLES - Type-safe atomic CSS utilities
 *
 * Usage:
 * ```tsx
 * import { sprinkles } from "@trapmikhandr/ui";
 *
 * <div className={sprinkles({ p: "lg", gap: "md", display: "flex" })}>
 * ```
 */

import { createSprinkles, defineProperties } from "@vanilla-extract/sprinkles";
import { media } from "../themes/breakpoints";
import { colorContractRaw } from "../themes/contracts/color.contract.css";
import { globalContractRaw } from "../themes/contracts/global.contract.css";

/**
 * Responsive conditions for adaptive styles
 */
const responsiveConditions = {
  conditions: {
    default: {},
    sm: { "@media": media.up("sm") },
    md: { "@media": media.up("md") },
    lg: { "@media": media.up("lg") },
    xl: { "@media": media.up("xl") },
  },
  defaultCondition: "default",
  responsiveArray: ["default", "sm", "md", "lg", "xl"],
} as const;

/**
 * LAYOUT PROPERTIES
 */
const layoutProperties = defineProperties({
  ...responsiveConditions,
  properties: {
    display: [
      "none",
      "flex",
      "block",
      "inline",
      "inline-flex",
      "grid",
      "inline-grid",
    ],
    flexDirection: ["row", "column", "row-reverse", "column-reverse"],
    flexWrap: ["wrap", "nowrap", "wrap-reverse"],
    alignItems: ["stretch", "flex-start", "center", "flex-end", "baseline"],
    justifyContent: [
      "flex-start",
      "center",
      "flex-end",
      "space-between",
      "space-around",
      "space-evenly",
    ],
    alignSelf: [
      "auto",
      "flex-start",
      "center",
      "flex-end",
      "stretch",
      "baseline",
    ],
    flex: ["1", "auto", "initial", "none"],
    position: ["static", "relative", "absolute", "fixed", "sticky"],
    overflow: ["visible", "hidden", "scroll", "auto"],
    overflowX: ["visible", "hidden", "scroll", "auto"],
    overflowY: ["visible", "hidden", "scroll", "auto"],
    textAlign: ["left", "center", "right", "justify"],
    whiteSpace: ["normal", "nowrap", "pre", "pre-wrap", "pre-line"],
  },
});

/**
 * SPACING PROPERTIES
 */
const spacingProperties = defineProperties({
  ...responsiveConditions,
  properties: {
    gap: globalContractRaw.spacing,
    rowGap: globalContractRaw.spacing,
    columnGap: globalContractRaw.spacing,
    padding: globalContractRaw.spacing,
    paddingTop: globalContractRaw.spacing,
    paddingBottom: globalContractRaw.spacing,
    paddingLeft: globalContractRaw.spacing,
    paddingRight: globalContractRaw.spacing,
    margin: globalContractRaw.spacing,
    marginTop: globalContractRaw.spacing,
    marginBottom: globalContractRaw.spacing,
    marginLeft: globalContractRaw.spacing,
    marginRight: globalContractRaw.spacing,
  },
  shorthands: {
    paddingX: ["paddingLeft", "paddingRight"],
    paddingY: ["paddingTop", "paddingBottom"],
    marginX: ["marginLeft", "marginRight"],
    marginY: ["marginTop", "marginBottom"],
    p: ["padding"],
    px: ["paddingLeft", "paddingRight"],
    py: ["paddingTop", "paddingBottom"],
    pt: ["paddingTop"],
    pb: ["paddingBottom"],
    pl: ["paddingLeft"],
    pr: ["paddingRight"],
    m: ["margin"],
    mx: ["marginLeft", "marginRight"],
    my: ["marginTop", "marginBottom"],
    mt: ["marginTop"],
    mb: ["marginBottom"],
    ml: ["marginLeft"],
    mr: ["marginRight"],
  },
});

/**
 * SHAPE PROPERTIES
 */
const shapeProperties = defineProperties({
  properties: {
    borderRadius: globalContractRaw.shape,
  },
  shorthands: {
    rounded: ["borderRadius"],
  },
});

/**
 * COLOR PROPERTIES
 */
const colorProperties = defineProperties({
  properties: {
    backgroundColor: {
      "surface-default": colorContractRaw.surface.default,
      "surface-dim": colorContractRaw.surface.dim,
      "surface-bright": colorContractRaw.surface.bright,
      "surface-container-lowest": colorContractRaw.surface.containerLowest,
      "surface-container-low": colorContractRaw.surface.containerLow,
      "surface-container": colorContractRaw.surface.container,
      "surface-container-high": colorContractRaw.surface.containerHigh,
      "surface-container-highest": colorContractRaw.surface.containerHighest,
      primary: colorContractRaw.primary.base,
      "primary-container": colorContractRaw.primary.container,
      secondary: colorContractRaw.secondary.base,
      "secondary-container": colorContractRaw.secondary.container,
      tertiary: colorContractRaw.tertiary.base,
      "tertiary-container": colorContractRaw.tertiary.container,
      error: colorContractRaw.error.base,
      "error-container": colorContractRaw.error.container,
      success: colorContractRaw.success.base,
      "success-container": colorContractRaw.success.container,
      warning: colorContractRaw.warning.base,
      "warning-container": colorContractRaw.warning.container,
      "inverse-surface": colorContractRaw.inverse.surface,
      transparent: "transparent",
    },
    color: {
      "on-surface": colorContractRaw.onSurface.default,
      "on-surface-variant": colorContractRaw.onSurface.variant,
      "on-surface-muted": colorContractRaw.onSurface.muted,
      "on-primary": colorContractRaw.primary.on,
      "on-primary-container": colorContractRaw.primary.onContainer,
      "on-secondary": colorContractRaw.secondary.on,
      "on-secondary-container": colorContractRaw.secondary.onContainer,
      "on-tertiary": colorContractRaw.tertiary.on,
      "on-tertiary-container": colorContractRaw.tertiary.onContainer,
      "on-error": colorContractRaw.error.on,
      "on-error-container": colorContractRaw.error.onContainer,
      "on-success": colorContractRaw.success.on,
      "on-success-container": colorContractRaw.success.onContainer,
      "on-warning": colorContractRaw.warning.on,
      "on-warning-container": colorContractRaw.warning.onContainer,
      "on-inverse-surface": colorContractRaw.inverse.onSurface,
      primary: colorContractRaw.primary.base,
      secondary: colorContractRaw.secondary.base,
      tertiary: colorContractRaw.tertiary.base,
      error: colorContractRaw.error.base,
      success: colorContractRaw.success.base,
      warning: colorContractRaw.warning.base,
    },
    borderColor: {
      outline: colorContractRaw.outline.default,
      "outline-variant": colorContractRaw.outline.variant,
      primary: colorContractRaw.primary.base,
      secondary: colorContractRaw.secondary.base,
      error: colorContractRaw.error.base,
      transparent: "transparent",
    },
  },
  shorthands: {
    bg: ["backgroundColor"],
  },
});

/**
 * SIZE PROPERTIES
 */
const sizeProperties = defineProperties({
  properties: {
    width: {
      full: "100%",
      screen: "100vw",
      auto: "auto",
      fit: "fit-content",
      min: "min-content",
      max: "max-content",
    },
    height: {
      full: "100%",
      screen: "100vh",
      auto: "auto",
      fit: "fit-content",
      min: "min-content",
      max: "max-content",
    },
    minWidth: {
      0: "0",
      full: "100%",
      fit: "fit-content",
      min: "min-content",
      max: "max-content",
    },
    minHeight: {
      0: "0",
      full: "100%",
      fit: "fit-content",
      min: "min-content",
      max: "max-content",
    },
    maxWidth: {
      full: "100%",
      screen: "100vw",
      fit: "fit-content",
      min: "min-content",
      max: "max-content",
    },
    maxHeight: {
      full: "100%",
      screen: "100vh",
      fit: "fit-content",
      min: "min-content",
      max: "max-content",
    },
  },
  shorthands: {
    w: ["width"],
    h: ["height"],
  },
});

/**
 * ELEVATION PROPERTIES
 */
const elevationProperties = defineProperties({
  properties: {
    boxShadow: globalContractRaw.elevation,
  },
  shorthands: {
    elevation: ["boxShadow"],
  },
});

/**
 * Z-INDEX PROPERTIES
 */
const zIndexProperties = defineProperties({
  properties: {
    zIndex: globalContractRaw.zIndex,
  },
  shorthands: {
    z: ["zIndex"],
  },
});

/**
 * BORDER PROPERTIES
 */
const borderProperties = defineProperties({
  properties: {
    borderWidth: {
      none: "0",
      thin: "1px",
      medium: "2px",
    },
    borderStyle: ["none", "solid", "dashed", "dotted"],
  },
});

/**
 * Sprinkles function for atomic styles.
 */
export const sprinkles = createSprinkles(
  layoutProperties,
  spacingProperties,
  shapeProperties,
  colorProperties,
  sizeProperties,
  elevationProperties,
  zIndexProperties,
  borderProperties,
);

/**
 * Type for sprinkles props.
 */
export type Sprinkles = Parameters<typeof sprinkles>[0];
