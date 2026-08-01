import { createContext, type RefObject, useContext } from "react";
import type { AriaButtonProps, AriaMenuOptions } from "react-aria";
import type { MenuTriggerState } from "react-stately";

interface ContextMenuValue {
  state: MenuTriggerState;
  triggerRef: RefObject<HTMLButtonElement | null>;
  menuTriggerProps: AriaButtonProps;
  // Exclude collection props and selection handlers: ListMenu uses
  // its own generic T for menu items.
  menuProps: Omit<
    AriaMenuOptions<HTMLElement>,
    "items" | "children" | "onAction"
  >;
}

export const ContextMenu = createContext<ContextMenuValue | null>(null);

export function useMenuContext() {
  const context = useContext(ContextMenu);
  if (!context) {
    throw new Error("Menu components must be used within <Menu>");
  }
  return context;
}
