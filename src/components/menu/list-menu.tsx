import { useRef } from "react";
import { type AriaMenuProps, useMenu } from "react-aria";
import { type Key, useTreeState } from "react-stately";
import { ItemMenu } from "./item-menu";
import * as styles from "./list-menu.css";

interface ListMenuProps<T extends object> extends AriaMenuProps<T> {
  onClose: () => void;
  nonClosingKeys?: Iterable<Key>;
}

export function ListMenu<T extends object>({
  nonClosingKeys,
  ...props
}: ListMenuProps<T>) {
  const ref = useRef<HTMLUListElement>(null);
  const state = useTreeState(props);
  const { menuProps } = useMenu(props, state, ref);
  const nonClosingKeySet =
    nonClosingKeys instanceof Set ? nonClosingKeys : new Set(nonClosingKeys);

  return (
    <ul {...menuProps} ref={ref} className={styles.list}>
      {[...state.collection].map((item) => (
        <ItemMenu
          key={item.key}
          item={item}
          state={state}
          onClose={props.onClose}
          closeOnSelect={!nonClosingKeySet.has(item.key)}
        />
      ))}
    </ul>
  );
}
