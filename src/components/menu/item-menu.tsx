import { useRef } from "react";
import { useMenuItem } from "react-aria";
import type { Node, TreeState } from "react-stately";
import * as styles from "./item-menu.css";

interface MenuItemProps<T extends object> {
  item: Node<T>;
  state: TreeState<T>;
  onClose: () => void;
  /** false — the item (for example, a submenu trigger) does not close the menu on selection. @default true */
  closeOnSelect?: boolean;
}

export function ItemMenu<T extends object>({
  item,
  state,
  onClose,
  closeOnSelect,
}: MenuItemProps<T>) {
  const ref = useRef<HTMLLIElement>(null);

  const { menuItemProps, isFocused, isDisabled } = useMenuItem(
    {
      key: item.key,
      onClose,
      closeOnSelect,
    },
    state,
    ref,
  );

  return (
    <li
      {...menuItemProps}
      ref={ref}
      className={styles.item({ isFocused, isDisabled })}
    >
      {item.rendered}
    </li>
  );
}
