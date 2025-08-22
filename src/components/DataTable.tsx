// src/components/DataTable.tsx
import * as React from "react";
import { cn } from "../lib/cn";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
  render?: (value: T[keyof T], record: T, rowIndex: number) => React.ReactNode;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  className?: string;
  /** if you later need controlled selection: expose selectedKeys/ onChange */
}

type SortState = { key: string; order: "asc" | "desc" } | null;

function compare(a: unknown, b: unknown) {
  if (a == null && b == null) return 0;
  if (a == null) return -1;
  if (b == null) return 1;

  // number
  if (typeof a === "number" && typeof b === "number") return a - b;
  // boolean
  if (typeof a === "boolean" && typeof b === "boolean") return (a === b) ? 0 : a ? 1 : -1;
  // date-like
  const aDate = a instanceof Date ? a : new Date(a as any);
  const bDate = b instanceof Date ? b : new Date(b as any);
  if (!isNaN(+aDate) && !isNaN(+bDate)) return +aDate - +bDate;

  // string fallback
  return String(a).localeCompare(String(b));
}

export function DataTable<T>({
  data,
  columns,
  loading,
  selectable,
  onRowSelect,
  className,
}: DataTableProps<T>) {
  const [sort, setSort] = React.useState<SortState>(null);
  const [selected, setSelected] = React.useState<Set<number>>(new Set());

  const sorted = React.useMemo(() => {
    if (!sort) return data;
    const col = columns.find((c) => c.key === sort.key);
    if (!col) return data;
    const arr = [...data];
    arr.sort((ra, rb) => {
      const r = compare(ra[col.dataIndex], rb[col.dataIndex]);
      return sort.order === "asc" ? r : -r;
    });
    return arr;
  }, [data, columns, sort]);

  const toggleSort = (key: string) => {
    setSort((prev) => {
      if (!prev || prev.key !== key) return { key, order: "asc" };
      return prev.order === "asc" ? { key, order: "desc" } : null; // third click clears sort
    });
  };

  const toggleRow = (idx: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx);
      else next.add(idx);
      onRowSelect?.(Array.from(next).map((i) => sorted[i]));
      return next;
    });
  };

  const toggleAll = () => {
    setSelected((prev) => {
      if (prev.size === sorted.length) {
        onRowSelect?.([]);
        return new Set();
      }
      const all = new Set(sorted.map((_, i) => i));
      onRowSelect?.(sorted);
      return all;
    });
  };

  const colCount = columns.length + (selectable ? 1 : 0);

  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <table className="min-w-full border-separate border-spacing-0">
        <thead className="bg-zinc-50 dark:bg-zinc-900 sticky top-0">
          <tr>
            {selectable && (
              <th className="sticky left-0 z-10 bg-inherit px-3 py-2 text-left text-sm font-medium text-zinc-700 dark:text-zinc-300 border-b">
                <input
                  type="checkbox"
                  aria-label="Select all rows"
                  checked={selected.size === sorted.length && sorted.length > 0}
                  onChange={toggleAll}
                />
              </th>
            )}
            {columns.map((c) => {
              const ariaSort =
                sort?.key === c.key ? (sort.order === "asc" ? "ascending" : "descending") : "none";
              return (
                <th
                  key={c.key}
                  scope="col"
                  aria-sort={ariaSort as any}
                  className={cn(
                    "px-3 py-2 text-left text-sm font-semibold text-zinc-700 dark:text-zinc-200 border-b",
                    c.sortable && "cursor-pointer select-none"
                  )}
                  onClick={c.sortable ? () => toggleSort(c.key) : undefined}
                >
                  <span className="inline-flex items-center gap-1">
                    {c.title}
                    {c.sortable && (
                      <span aria-hidden className="text-xs">
                        {sort?.key !== c.key ? "↕" : sort.order === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody aria-busy={loading || undefined}>
          {loading && (
            <tr>
              <td colSpan={colCount} className="px-3 py-6 text-center text-sm text-zinc-500">
                Loading…
              </td>
            </tr>
          )}

          {!loading && sorted.length === 0 && (
            <tr>
              <td colSpan={colCount} className="px-3 py-6 text-center text-sm text-zinc-500">
                No data available.
              </td>
            </tr>
          )}

          {!loading &&
            sorted.map((row, i) => {
              const isSelected = selected.has(i);
              return (
                <tr
                  key={i}
                  className={cn(
                    "border-b last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-900",
                    isSelected && "bg-indigo-50/60 dark:bg-indigo-950/30"
                  )}
                >
                  {selectable && (
                    <td className="sticky left-0 z-10 bg-inherit px-3 py-2">
                      <input
                        type="checkbox"
                        aria-label={`Select row ${i + 1}`}
                        checked={isSelected}
                        onChange={() => toggleRow(i)}
                      />
                    </td>
                  )}
                  {columns.map((c) => {
                    const value = row[c.dataIndex];
                    return (
                      <td key={String(c.key)} className="px-3 py-2 text-sm text-zinc-800 dark:text-zinc-200">
                        {c.render ? c.render(value, row, i) : (value as any)?.toString?.() ?? ""}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
