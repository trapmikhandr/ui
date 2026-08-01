import { type RefObject, useRef } from "react";
import type { AriaListBoxOptions } from "react-aria";
import { useListBox } from "react-aria";
import {
  Item,
  type ListProps,
  type ListState,
  useListState,
} from "react-stately";
import * as styles from "./list-box.css";
import { OptionListBox } from "./option-list-box";

interface ListBoxRootProps<T extends object>
  extends AriaListBoxOptions<T>,
    ListProps<T> {
  state?: ListState<T>;
  /**
   * External ref for the <ul>, needed when an outside hook (for example useComboBox)
   * also needs this DOM node (to scroll to the active option while typing).
   */
  listBoxRef?: RefObject<HTMLUListElement | null>;
}

export interface ListBoxViewProps<T extends object> {
  state: ListState<T>;
  listBoxProps: ReturnType<typeof useListBox>["listBoxProps"];
  listBoxRef?: RefObject<HTMLUListElement | null>;
}

/** Renders a list from an existing state and already configured listbox behavior. */
export function ListBoxView<T extends object>({
  state,
  listBoxProps,
  listBoxRef,
}: ListBoxViewProps<T>) {
  return (
    <ul {...listBoxProps} ref={listBoxRef} className={styles.listBoxContainer}>
      {[...state.collection].map((item) => (
        <OptionListBox key={item.key} item={item} state={state} />
      ))}
    </ul>
  );
}

function ListBoxRoot<T extends object>(props: ListBoxRootProps<T>) {
  const internalRef = useRef<HTMLUListElement>(null);
  const { state: providedState, listBoxRef, ...ariaProps } = props;
  const ref = listBoxRef ?? internalRef;

  const internalState = useListState(ariaProps);
  const state = providedState ?? internalState;

  const { listBoxProps } = useListBox(ariaProps, state, ref);

  return (
    <ListBoxView state={state} listBoxProps={listBoxProps} listBoxRef={ref} />
  );
}

export const ListBox = Object.assign(ListBoxRoot, {
  Item,
});
