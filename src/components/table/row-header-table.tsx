import type { ReactNode } from "react";
import { useRef } from "react";
import { useTableHeaderRow } from "react-aria";
import type { Node, TableState } from "react-stately";
import * as styles from "./table.css";

interface TableHeaderRowProps<T> {
  item: Node<T>;
  state: TableState<T>;
  children: ReactNode;
}

export function TableHeaderRow<T extends object>({
  item,
  state,
  children,
}: TableHeaderRowProps<T>) {
  const ref = useRef<HTMLTableRowElement | null>(null);
  const { rowProps } = useTableHeaderRow({ node: item }, state, ref);

  return (
    <tr {...rowProps} ref={ref} className={styles.headerRow}>
      {children}
    </tr>
  );
}
