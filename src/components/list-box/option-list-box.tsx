import { useRef } from "react";
import { useOption } from "react-aria";
import type { Node, useListState } from "react-stately";
import * as styles from "./option-list-box.css";

interface OptionListBoxProps<T extends object> {
  item: Node<T>;
  state: ReturnType<typeof useListState<T>>;
}

export function OptionListBox<T extends object>({
  item,
  state,
}: OptionListBoxProps<T>) {
  const ref = useRef<HTMLLIElement>(null);

  const { optionProps, isSelected, isFocused, isDisabled } = useOption(
    { key: item.key },
    state,
    ref,
  );

  return (
    <li
      {...optionProps}
      ref={ref}
      className={styles.option({
        isFocused,
        isSelected,
        isDisabled,
      })}
    >
      {item.rendered}
    </li>
  );
}
