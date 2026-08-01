import { createContext, useContext } from "react";
import type { ToggleGroupState } from "react-stately";
import type {
  ButtonGroupKey,
  ButtonGroupSelectionMode,
} from "./button-group.types";

export type ButtonGroupContextValue = {
  selectionMode: ButtonGroupSelectionMode;
  state: ToggleGroupState | null;
  onAction?: (key: ButtonGroupKey) => void;
};

export const ButtonGroupContext = createContext<ButtonGroupContextValue | null>(
  null,
);

export function useButtonGroupContext(): ButtonGroupContextValue {
  const context = useContext(ButtonGroupContext);

  if (!context) {
    throw new Error("ButtonGroup items must be rendered inside ButtonGroup.");
  }

  return context;
}
