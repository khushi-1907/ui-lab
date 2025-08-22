# UI Lab – React Component Assignment

🎨 **React Component Development Assignment**  
Focus Area: **UI Components**  
Tech Stack: **React · TypeScript · TailwindCSS (CDN) · Storybook**

---

## 📦 Project Overview

This project demonstrates **two reusable React components** built with TypeScript and styled using TailwindCSS via CDN:

1. **InputField** – Flexible input with validation states, variants, sizes, and optional features like clear button and password toggle.
2. **DataTable** – Generic table with sorting, row selection, loading & empty states, fully typed with TypeScript generics.

The components are documented in **Storybook** for interactive exploration.

---

## ⚙️ Setup Instructions

1. Clone the repository:
git clone https://github.com/khushi-1907/ui-lab.git
cd ui-lab 
Install dependencies:
npm install

Start the development server:
npm run dev

Open browser: http://localhost:5173

Run Storybook locally:
npm run storybook
Open browser: http://localhost:6006

Run tests:
npm run test
npm run test:watch  # optional

##🌈 Component Usage
InputField
<InputField
  label="Email"
  placeholder="name@example.com"
  helperText="We’ll never share your email."
  variant="outlined"
  size="md"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

DataTable
<DataTable<User>
  data={users}
  columns={columns}
  selectable
  onRowSelect={setSelectedUsers}
  loading={false}
/>

🌐 Storybook Preview
Live Storybook: https://ui-lab-pi.vercel.app/

🎬 Screenshots
InputField variants & states:
<img width="1153" height="495" alt="image" src="https://github.com/user-attachments/assets/2d42c82e-4eba-4333-8e4b-7de81819ab52" />

DataTable interactions:
<img width="1077" height="754" alt="image" src="https://github.com/user-attachments/assets/20b1f8fe-b29b-45a4-8194-295b22c637a4" />

📝 Approach
Components are generic and reusable.
Used TypeScript generics and proper typings for safety.
Tailwind utility classes for rapid styling, responsive design, and dark mode support.
Storybook documents all component variants and states.
Vitest + Testing Library for unit and interaction tests.

✅ Assignment Completion Checklist
 InputField component with all variants, states, and features
 DataTable component with sorting, selection, loading & empty states
 TypeScript typing for all components
 Responsive design
 Light & dark theme support
 Storybook documentation and interactive demo
 Smoke test App.tsx for live preview
 Basic unit tests

🏗 Project Structure
```graphql
src/
 ├─ components/
 │   ├─ InputField.tsx
 │   ├─ DataTable.tsx
 │   └─ __tests__/
 │       ├─ InputField.test.tsx
 │       └─ DataTable.test.tsx
 ├─ lib/
 │   └─ cn.ts           # Utility for className concatenation
 ├─ App.tsx             # Smoke test/demo for components
 └─ main.tsx
package.json
tsconfig.json
vite.config.ts
README.md
