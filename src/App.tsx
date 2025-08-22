// src/App.tsx
import { useState } from "react";
import { InputField } from "./components/InputField";
import { DataTable } from "./components/DataTable";
import type { Column as ColumnType } from "./components/DataTable";

type User = {
  id: number;
  name: string;
  email: string;
  age: number;
  active: boolean;
};

export default function App() {
  // Input state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // DataTable state
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const users: User[] = [
    { id: 1, name: "Ada Lovelace", email: "ada@calc.io", age: 36, active: true },
    { id: 2, name: "Grace Hopper", email: "grace@navy.mil", age: 85, active: false },
    { id: 3, name: "Linus Torvalds", email: "linus@kernel.org", age: 55, active: true },
  ];

  const columns: ColumnType<User>[] = [
    { key: "name", title: "Name", dataIndex: "name", sortable: true },
    { key: "email", title: "Email", dataIndex: "email" },
    { key: "age", title: "Age", dataIndex: "age", sortable: true },
    { key: "active", title: "Active", dataIndex: "active", render: (v) => (v ? "Yes" : "No") },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-6">
      <div className="max-w-5xl mx-auto space-y-12">
        <h1 className="text-3xl font-extrabold text-center text-indigo-600 dark:text-indigo-400 mb-8">
          🌟 UI Components Demo
        </h1>

        {/* InputField Section */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">InputField Examples</h2>

          <div className="space-y-4">
            <InputField
              label="Email"
              placeholder="name@example.com"
              helperText="We’ll never share your email."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              size="md"
            />

            <InputField
              label="Password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText="Min 8 characters"
              errorMessage="Password too short"
              invalid={password.length > 0 && password.length < 8}
              variant="filled"
              size="md"
              clearable
            />

            <InputField
              label="Disabled Input"
              placeholder="Can't type here"
              disabled
              variant="ghost"
              size="sm"
            />
          </div>
        </section>

        {/* DataTable Section */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">DataTable Examples</h2>

          <DataTable<User>
            data={users}
            columns={columns}
            selectable
            onRowSelect={setSelectedUsers}
            loading={false}
          />

          <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900 rounded-lg text-indigo-800 dark:text-indigo-200 font-medium">
            <strong>Selected Users:</strong> {selectedUsers.map((u) => u.name).join(", ") || "None"}
          </div>

          <h3 className="mt-6 text-lg font-semibold">Empty State</h3>
          <DataTable<User> data={[]} columns={columns} selectable />

          <h3 className="mt-6 text-lg font-semibold">Loading State</h3>
          <DataTable<User> data={[]} columns={columns} loading selectable />
        </section>
      </div>
    </div>
  );
}
