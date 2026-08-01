export type ButtonGroupKey = string | number;

export type ButtonGroupVariant = "standard" | "connected";
export type ButtonGroupOrientation = "horizontal" | "vertical";
export type ButtonGroupPosition = "first" | "middle" | "last" | "only";
export type ButtonGroupSelectionMode = "none" | "single" | "multiple";
export type ButtonGroupSize = "xs" | "s" | "m" | "l" | "xl";
export type ButtonGroupShape = "round" | "square";

export type ButtonGroupInteraction =
  | "idle"
  | "pressed"
  | "selected"
  | "adjacentToPressed"
  | "adjacentToSelected";

export interface ButtonGroupState {
  variant: ButtonGroupVariant;
  orientation: ButtonGroupOrientation;
  size: ButtonGroupSize;
  shape: ButtonGroupShape;
  position: ButtonGroupPosition;
  interaction: ButtonGroupInteraction;
}

export interface GroupedButtonPrivateProps {
  __group?: ButtonGroupState;
}

export type ButtonGroupSelection = ButtonGroupKey | Set<ButtonGroupKey> | null;
