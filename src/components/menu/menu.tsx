import { type PropsWithChildren, useRef } from "react";
import { useMenuTrigger } from "react-aria";
import {
  Item,
  type MenuTriggerProps,
  useMenuTriggerState,
} from "react-stately";
import { Popover } from "@/components";
import type { PopoverProps } from "@/components/popover/popover";
import { ContentMenu } from "./content-menu";
import { ContextMenu } from "./context-menu";
import { SubmenuTrigger } from "./submenu-trigger";
import { TriggerMenu } from "./trigger-menu";

interface MenuRootProps
  extends Omit<MenuTriggerProps, "trigger">,
    PropsWithChildren {
  /** @default "bottom start" — use "right top" for nested submenus (Menu.SubTrigger). */
  placement?: PopoverProps["placement"];
  offset?: PopoverProps["offset"];
}

function MenuRoot({
  children,
  placement = "bottom start",
  offset,
  ...props
}: MenuRootProps) {
  const state = useMenuTriggerState(props);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const { menuTriggerProps, menuProps } = useMenuTrigger({}, state, triggerRef);

  return (
    <ContextMenu.Provider
      value={{
        state,
        triggerRef,
        menuTriggerProps,
        menuProps,
      }}
    >
      <Popover
        isOpen={state.isOpen}
        onOpenChange={state.setOpen}
        triggerRef={triggerRef}
        placement={placement}
        offset={offset}
      >
        {children}
      </Popover>
    </ContextMenu.Provider>
  );
}

// ============================================
// EXPORT
// ============================================

export const Menu = Object.assign(MenuRoot, {
  Trigger: TriggerMenu,
  Content: ContentMenu,
  Item,
  SubTrigger: SubmenuTrigger,
});
