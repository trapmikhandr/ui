import type { ReactNode } from "react";
import { useRef } from "react";
import { mergeProps, useFocusRing, useTableRow } from "react-aria";
import type { Node, TableState } from "react-stately";
import * as styles from "./table.css";

interface TableRowProps<T> {
  item: Node<T>;
  children: ReactNode;
  state: TableState<T>;
  isInteractive?: boolean;
}

export function TableRow<T extends object>({
  item,
  children,
  state,
  isInteractive = false,
}: TableRowProps<T>) {
  const ref = useRef<HTMLTableRowElement | null>(null);
  const isSelected = state.selectionManager.isSelected(item.key);
  const { rowProps, isPressed } = useTableRow(
    {
      node: item,
    },
    state,
    ref,
  );
  const { focusProps } = useFocusRing();

  return (
    <tr
      {...mergeProps(rowProps, focusProps)}
      className={styles.row({
        isSelected,
        isPressed,
        isInteractive,
      })}
      ref={ref}
    >
      {children}
    </tr>
  );
}
