import { useRef } from "react";
import { mergeProps, useFocusRing, useTableColumnHeader } from "react-aria";
import type { Node, TableState } from "react-stately";
import * as styles from "./table.css";

interface TableColumnHeaderProps<T> {
  column: Node<T>;
  state: TableState<T>;
}

export function TableColumnHeader<T extends object>({
  column,
  state,
}: TableColumnHeaderProps<T>) {
  const ref = useRef<HTMLTableCellElement | null>(null);
  const { columnHeaderProps } = useTableColumnHeader(
    { node: column },
    state,
    ref,
  );
  const { focusProps } = useFocusRing();
  const arrowIcon = state.sortDescriptor?.direction === "ascending" ? "▲" : "▼";

  const colSpan =
    "colSpan" in column && typeof column.colSpan === "number"
      ? column.colSpan
      : 1;

  return (
    <th
      {...mergeProps(columnHeaderProps, focusProps)}
      colSpan={colSpan}
      className={styles.columnHeader({
        align: colSpan > 1 ? "center" : "left",
      })}
      ref={ref}
    >
      {column.rendered}
      {column.props.allowsSorting && (
        <span
          aria-hidden="true"
          className={styles.sortIcon({
            isVisible: state.sortDescriptor?.column === column.key,
          })}
        >
          {arrowIcon}
        </span>
      )}
    </th>
  );
}
