import type { Meta, StoryObj } from "@storybook/react";
import { InputField, type InputFieldProps } from "../components/InputField";
import { useState } from "react";

const meta: Meta<typeof InputField> = {
  title: "Forms/InputField",
  component: InputField,
  argTypes: {
    variant: { control: "select", options: ["filled","outlined","ghost"] },
    size: { control: "select", options: ["sm","md","lg"] },
  },
};
export default meta;

type Story = StoryObj<typeof InputField>;

export const Playground: Story = {
  args: {
    label: "Email",
    placeholder: "name@example.com",
    helperText: "We’ll never share your email.",
    variant: "outlined",
    size: "md",
  },
  render: (args: InputFieldProps) => {
    const [val, setVal] = useState("");
    return (
      <div className="max-w-sm">
        <InputField {...args} value={val} onChange={(e)=>setVal(e.target.value)} />
      </div>
    );
  }
};

export const Invalid: Story = {
  args: {
    label: "Username",
    placeholder: "your_handle",
    invalid: true,
    errorMessage: "This username is taken.",
  },
};

export const Loading: Story = {
  args: { label: "Searching", placeholder: "Type to search…", loading: true },
};
