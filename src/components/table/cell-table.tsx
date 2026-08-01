import { useRef } from "react";
import { mergeProps, useFocusRing, useTableCell } from "react-aria";
import type { Node, TableState } from "react-stately";
import * as styles from "./table.css";

interface TableCellProps<T> {
  cell: Node<T>;
  state: TableState<T>;
}

export function TableCell<T extends object>({
  cell,
  state,
}: TableCellProps<T>) {
  const ref = useRef<HTMLTableCellElement | null>(null);
  const { gridCellProps } = useTableCell({ node: cell }, state, ref);
  const { focusProps } = useFocusRing();

  return (
    <td
      {...mergeProps(gridCellProps, focusProps)}
      className={styles.cell()}
      ref={ref}
    >
      {cell.rendered}
    </td>
  );
}
