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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 p-4 md:p-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <header className="text-center py-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent mb-3">
            UI Components Demo
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our collection of beautifully designed, accessible form and data components
          </p>
        </header>

        {/* InputField Section */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 md:p-8 space-y-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Input Components</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <InputField
                label="Email Address"
                placeholder="name@example.com"
                helperText="We'll never share your email."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                size="md"
              />

              <InputField
                label="Password"
                type="password"
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
            </div>
            
            <div className="space-y-4">
              <InputField
                label="Disabled Input"
                placeholder="Can't type here"
                disabled
                variant="ghost"
                size="sm"
                helperText="This field is disabled"
              />
              
              <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Input Values</h3>
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <p>Email: {email || "Not provided"}</p>
                  <p>Password: {password ? "•".repeat(password.length) : "Not provided"}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DataTable Section */}
        <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 md:p-8 space-y-6 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Data Components</h2>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">User Data</h3>
              <DataTable<User>
                data={users}
                columns={columns}
                selectable
                onRowSelect={setSelectedUsers}
                loading={false}
              />
            </div>

            {selectedUsers.length > 0 && (
              <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg border border-indigo-100 dark:border-indigo-800/50">
                <div className="flex items-center gap-2 text-indigo-800 dark:text-indigo-200 font-medium mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Selected Users</span>
                </div>
                <div className="text-sm text-indigo-700 dark:text-indigo-300">
                  {selectedUsers.map((u) => u.name).join(", ")}
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">Empty State</h3>
                <DataTable<User> data={[]} columns={columns} selectable />
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">Loading State</h3>
                <DataTable<User> data={[]} columns={columns} loading selectable />
              </div>
            </div>
          </div>
        </section>

        <footer className="text-center py-6 text-gray-500 dark:text-gray-500 text-sm">
          <p>Beautiful UI Components • Built with React & Tailwind CSS</p>
        </footer>
      </div>
    </div>
  );
}