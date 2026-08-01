import { type ReactNode, type RefObject, useRef } from "react";
import { type AriaPopoverProps, useOverlayTrigger } from "react-aria";
import type { OverlayTriggerProps } from "react-stately";
import { useOverlayTriggerState } from "react-stately";
import { ContentPopover } from "./content-popover";
import { ContextPopover } from "./context-popover";
import { TriggerPopover } from "./trigger-popover";

// ============================================
// POPOVER ROOT COMPONENT
// ============================================

export interface PopoverProps<T extends HTMLElement = HTMLElement>
  extends OverlayTriggerProps {
  children: ReactNode;
  showArrow?: boolean;
  placement?: AriaPopoverProps["placement"];
  offset?: number;

  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  triggerRef?: RefObject<T | null>;
}

function PopoverRoot<T extends HTMLElement = HTMLElement>({
  children,
  onOpenChange,
  isOpen: controlledIsOpen,
  triggerRef: externalTriggerRef,
  showArrow = false,
  placement = "bottom",
  offset = 8,
  ...props
}: PopoverProps<T>) {
  const internalTriggerRef = useRef<HTMLButtonElement>(null);
  const triggerRef = externalTriggerRef ?? internalTriggerRef;

  const state = useOverlayTriggerState({
    ...props,
    isOpen: controlledIsOpen,
    onOpenChange,
  });

  const { triggerProps } = useOverlayTrigger(
    { type: "dialog" },
    state,
    triggerRef,
  );

  return (
    <ContextPopover.Provider
      value={{
        state,
        triggerRef,
        triggerProps: triggerProps,
        placement,
        showArrow,
        offset,
      }}
    >
      {children}
    </ContextPopover.Provider>
  );
}

// ============================================
// COMPOUND COMPONENT
// ============================================

export const Popover = Object.assign(PopoverRoot, {
  Trigger: TriggerPopover,
  Content: ContentPopover,
});
