import type { Meta, StoryObj } from "@storybook/react";
import { DataTable, type Column } from "../components/DataTable";

type User = { id: number; name: string; email: string; age: number; active: boolean; };

const sample: User[] = [
  { id: 1, name: "Ada Lovelace", email: "ada@calc.io", age: 36, active: true },
  { id: 2, name: "Grace Hopper", email: "grace@navy.mil", age: 85, active: false },
  { id: 3, name: "Linus Torvalds", email: "linus@kernel.org", age: 55, active: true },
];

const columns: Column<User>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "email", title: "Email", dataIndex: "email" },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
  { key: "active", title: "Active", dataIndex: "active", sortable: true,
    render: (v) => (v ? "Yes" : "No")
  },
];

const meta: Meta<typeof DataTable<User>> = {
  title: "Data/DataTable",
  component: DataTable<User>,
};
export default meta;

type Story = StoryObj<typeof DataTable<User>>;

export const Basic: Story = { args: { data: sample, columns } };

export const Selectable: Story = {
  args: { data: sample, columns, selectable: true },
};

export const Loading: Story = {
  args: { data: [], columns, loading: true },
};

export const Empty: Story = {
  args: { data: [], columns },
};
