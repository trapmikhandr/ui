import type { AriaMenuProps } from "react-aria";
import type { Key } from "react-stately";
import { Popover } from "../popover";
import { useMenuContext } from "./context-menu";
import { ListMenu } from "./list-menu";

interface ContentMenuProps<T extends object>
  extends Omit<AriaMenuProps<T>, "onClose"> {
  children: AriaMenuProps<T>["children"];
  /**
   * Keys for items that should NOT close the menu on selection — for example,
   * a submenu trigger (Menu.SubTrigger) that only opens the nested list.
   */
  nonClosingKeys?: Iterable<Key>;
  /** Non-modal popover (without underlay or focus capture) for nested submenus. */
  isNonModal?: boolean;
}

export function ContentMenu<T extends object>({
  children,
  nonClosingKeys,
  isNonModal,
  ...props
}: ContentMenuProps<T>) {
  const { state, menuProps } = useMenuContext();

  return (
    <Popover.Content unstyled isNonModal={isNonModal}>
      <ListMenu<T>
        {...props}
        {...menuProps}
        onClose={state.close}
        nonClosingKeys={nonClosingKeys}
      >
        {children}
      </ListMenu>
    </Popover.Content>
  );
}
