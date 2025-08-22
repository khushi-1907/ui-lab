import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataTable, type Column } from "../../components/DataTable";
import { vi } from "vitest";

type Row = { id: number; name: string; age: number; };
const rows: Row[] = [
  { id: 1, name: "C", age: 30 },
  { id: 2, name: "A", age: 20 },
  { id: 3, name: "B", age: 40 },
];
const cols: Column<Row>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
];

describe("DataTable", () => {
  it("sorts by column when header clicked", async () => {
    const user = userEvent.setup();
    render(<DataTable data={rows} columns={cols} />);
    const nameHeader = screen.getByText("Name");
    await user.click(nameHeader); // asc
    const cells = screen.getAllByRole("cell");
    expect(cells[0]).toHaveTextContent("A"); // first row's Name cell
  });

  it("selects rows and calls callback", async () => {
    const user = userEvent.setup();
    const onRowSelect = vi.fn();
    render(<DataTable data={rows} columns={cols} selectable onRowSelect={onRowSelect} />);
    const checkboxes = screen.getAllByRole("checkbox");
    await user.click(checkboxes[1]); // first row checkbox
    expect(onRowSelect).toHaveBeenCalledWith([rows[0]]);
  });
});
       