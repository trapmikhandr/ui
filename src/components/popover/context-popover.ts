import { createContext, type RefObject, useContext } from "react";
import type { AriaPopoverProps, OverlayTriggerAria } from "react-aria";
import type { OverlayTriggerState } from "react-stately";

interface ContextPopoverValue<T extends HTMLElement = HTMLElement> {
  state: OverlayTriggerState;
  triggerRef: RefObject<T | null>;
  triggerProps: OverlayTriggerAria["triggerProps"];
  placement: AriaPopoverProps["placement"];
  showArrow?: boolean;
  offset: number;
}

// Using HTMLElement as the base type since Context cannot be generic
export const ContextPopover =
  createContext<ContextPopoverValue<HTMLElement> | null>(null);

export function usePopoverContext<T extends HTMLElement = HTMLElement>() {
  const context = useContext(ContextPopover);
  if (!context) {
    throw new Error("Popover components must be used within <Popover>");
  }
  return context as ContextPopoverValue<T>;
}
