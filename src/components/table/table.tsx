import { useRef } from "react";
import type { AriaTableProps } from "react-aria";
import { useTable } from "react-aria";
import {
  Cell,
  Column,
  Row,
  TableBody,
  TableHeader,
  type TableStateProps,
  useTableState,
} from "react-stately";
import { TableCell } from "./cell-table";
import { TableColumnHeader } from "./column-header-table";
import { TableRowGroup } from "./header-table";
import { TableHeaderRow } from "./row-header-table";
import { TableRow } from "./row-table";
import * as styles from "./table.css";

interface TableProps<T extends object>
  extends AriaTableProps,
    TableStateProps<T> {}

function RootTable<T extends object>(props: TableProps<T>) {
  const { selectionMode, selectionBehavior } = props;
  const state = useTableState({
    ...props,
    showSelectionCheckboxes:
      selectionMode === "multiple" && selectionBehavior !== "replace",
  });

  const ref = useRef<HTMLTableElement | null>(null);
  const { collection } = state;
  const { gridProps } = useTable(props, state, ref);

  return (
    <table {...gridProps} ref={ref} className={styles.table}>
      <TableRowGroup type="thead">
        {collection.headerRows.map((headerRow) => (
          <TableHeaderRow key={headerRow.key} item={headerRow} state={state}>
            {[...headerRow.childNodes].map((column) => (
              <TableColumnHeader
                key={column.key}
                column={column}
                state={state}
              />
            ))}
          </TableHeaderRow>
        ))}
      </TableRowGroup>
      <TableRowGroup type="tbody">
        {[...collection.body.childNodes].map((row) => (
          <TableRow
            key={row.key}
            item={row}
            state={state}
            isInteractive={!!props.onRowAction}
          >
            {[...row.childNodes].map((cell) => (
              <TableCell key={cell.key} cell={cell} state={state} />
            ))}
          </TableRow>
        ))}
      </TableRowGroup>
    </table>
  );
}

export const Table = Object.assign(RootTable, {
  Header: TableHeader,
  Body: TableBody,
  Column: Column,
  Row: Row,
  Cell: Cell,
});
