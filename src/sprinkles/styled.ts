/**
 * Typed wrapper around sprinkles with JSDoc
 */

import type { GlobalContractType } from "../themes/contracts/global.contract.css";
import { sprinkles } from "./sprinkles.css";

type SpacingKey = keyof GlobalContractType["spacing"];
type ShapeKey = keyof GlobalContractType["shape"];
type ElevationKey = keyof GlobalContractType["elevation"];
type ZIndexKey = keyof GlobalContractType["zIndex"];

type Display =
  | "none"
  | "flex"
  | "block"
  | "inline"
  | "inline-flex"
  | "grid"
  | "inline-grid";
type FlexDirection = "row" | "column" | "row-reverse" | "column-reverse";
type FlexWrap = "wrap" | "nowrap" | "wrap-reverse";
type AlignItems = "stretch" | "flex-start" | "center" | "flex-end" | "baseline";
type JustifyContent =
  | "flex-start"
  | "center"
  | "flex-end"
  | "space-between"
  | "space-around"
  | "space-evenly";
type Position = "static" | "relative" | "absolute" | "fixed" | "sticky";
type Overflow = "visible" | "hidden" | "scroll" | "auto";
type TextAlign = "left" | "center" | "right" | "justify";

type BackgroundColor =
  | "surface-default"
  | "surface-dim"
  | "surface-bright"
  | "surface-container-lowest"
  | "surface-container-low"
  | "surface-container"
  | "surface-container-high"
  | "surface-container-highest"
  | "primary"
  | "primary-container"
  | "secondary"
  | "secondary-container"
  | "tertiary"
  | "tertiary-container"
  | "error"
  | "error-container"
  | "success"
  | "success-container"
  | "warning"
  | "warning-container"
  | "inverse-surface"
  | "transparent";

type TextColor =
  | "on-surface"
  | "on-surface-variant"
  | "on-surface-muted"
  | "on-primary"
  | "on-primary-container"
  | "on-secondary"
  | "on-secondary-container"
  | "on-tertiary"
  | "on-tertiary-container"
  | "on-error"
  | "on-error-container"
  | "on-success"
  | "on-success-container"
  | "on-warning"
  | "on-warning-container"
  | "on-inverse-surface"
  | "primary"
  | "secondary"
  | "tertiary"
  | "error"
  | "success"
  | "warning";

type BorderColor =
  | "outline"
  | "outline-variant"
  | "primary"
  | "secondary"
  | "error"
  | "transparent";

type SizeValue = "full" | "screen" | "auto" | "fit" | "min" | "max";
type BorderWidth = "none" | "thin" | "medium";
type BorderStyle = "none" | "solid" | "dashed" | "dotted";

export interface StyledProps {
  // Layout
  display?: Display;
  flexDirection?: FlexDirection;
  flexWrap?: FlexWrap;
  alignItems?: AlignItems;
  justifyContent?: JustifyContent;
  position?: Position;
  overflow?: Overflow;
  overflowX?: Overflow;
  overflowY?: Overflow;
  textAlign?: TextAlign;

  // Spacing (uses SpacingKey with JSDoc from GlobalContractType)
  gap?: SpacingKey;
  rowGap?: SpacingKey;
  columnGap?: SpacingKey;
  p?: SpacingKey;
  px?: SpacingKey;
  py?: SpacingKey;
  pt?: SpacingKey;
  pb?: SpacingKey;
  pl?: SpacingKey;
  pr?: SpacingKey;
  m?: SpacingKey;
  mx?: SpacingKey;
  my?: SpacingKey;
  mt?: SpacingKey;
  mb?: SpacingKey;
  ml?: SpacingKey;
  mr?: SpacingKey;

  // Shape (uses ShapeKey with JSDoc from GlobalContractType)
  rounded?: ShapeKey;

  // Colors
  bg?: BackgroundColor;
  color?: TextColor;
  borderColor?: BorderColor;

  // Size
  w?: SizeValue;
  h?: SizeValue;

  // Elevation (uses ElevationKey with JSDoc from GlobalContractType)
  elevation?: ElevationKey;

  // Z-Index (uses ZIndexKey with JSDoc from GlobalContractType)
  z?: ZIndexKey;

  // Border
  borderWidth?: BorderWidth;
  borderStyle?: BorderStyle;
}

/**
 * Typed wrapper around sprinkles
 *
 * Hovering over spacing, shape, elevation, and zIndex values
 * displays the JSDoc from the contracts.
 */
export function s(props: StyledProps): string {
  return sprinkles(props as Parameters<typeof sprinkles>[0]);
}
