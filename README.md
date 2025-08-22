UI Lab – React Component Assignment

🎨 React Component Development Assignment
Focus Area: UI Components
Tech Stack: React · TypeScript · TailwindCSS (CDN) · Storybook

📦 Project Overview

This project demonstrates two reusable React components built with TypeScript and styled using TailwindCSS via CDN:

InputField – Flexible input with validation states, variants, sizes, and optional features like clear button and password toggle.

DataTable – Generic table with sorting, row selection, loading & empty states, fully typed with TypeScript generics.

The components are documented in Storybook for interactive exploration.

⚙️ Features
InputField

Text input with label, placeholder, helper text, error message

States: disabled, invalid, loading

Variants: filled, outlined, ghost

Sizes: small, medium, large

Optional: clear button, password toggle

Light & dark theme support via Tailwind

DataTable

Displays tabular data

Column sorting on sortable columns

Row selection (single/multiple)

Loading state

Empty state

Fully typed with TypeScript generics

🏗 Project Structure
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


Storybook stories are located in src/components alongside components.

App.tsx provides a quick interactive demo for both components.

🚀 Setup Instructions

Clone the repo:

git clone <your-repo-url>
cd ui-lab


Install dependencies:

npm install


Start the development server:

npm run dev


Open browser: http://localhost:5173

Run Storybook:

npm run storybook


Open browser: http://localhost:6006

Interactively test components, variants, states, and sizes.

Run tests:

npm run test
npm run test:watch  # optional watch mode

🌈 Styling & Theme

TailwindCSS included via CDN (no build step needed)

Light & dark themes supported with dark: variants

Modern, responsive, and accessible UI

💡 Usage Example
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

📘 Storybook Deployment

Option 1: Chromatic

npx chromatic --project-token=<YOUR_PROJECT_TOKEN>


Option 2: Vercel

npm run build-storybook


Deploy the storybook-static folder as a static site.

📝 Approach

Components are generic and reusable.

Used TypeScript generics and proper typings for safety.

Tailwind utility classes for rapid styling, responsive design, and dark mode support.

Storybook used to document all component variants and states.

Vitest + Testing Library for basic unit and interaction tests.

✅ Assignment Completion Checklist

 InputField component with all variants, states, and features

 DataTable component with sorting, selection, loading & empty states

 TypeScript typing for all components

 Responsive design

 Light & dark theme support

 Storybook documentation and interactive demo

 Smoke test App.tsx for live preview

 Basic unit tests