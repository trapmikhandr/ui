import type { ReactNode } from "react";
import { useTableRowGroup } from "react-aria";
import * as styles from "./table.css";

interface TableRowGroupProps {
  type: "thead" | "tbody" | "tfoot";
  children: ReactNode;
}

export function TableRowGroup({ type: Element, children }: TableRowGroupProps) {
  const { rowGroupProps } = useTableRowGroup();
  return (
    <Element
      {...rowGroupProps}
      className={Element === "thead" ? styles.headerGroup : styles.bodyGroup}
    >
      {children}
    </Element>
  );
}
