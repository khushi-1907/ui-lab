// src/components/InputField.tsx
import * as React from "react";
import { cn } from "../lib/cn";

type Variant = "filled" | "outlined" | "ghost";
type Size = "sm" | "md" | "lg";

export interface InputFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "value" | "onChange"> {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: Variant;
  size?: Size;
  /** Optional quality-of-life props */
  loading?: boolean;      // <-- remove if strict
  clearable?: boolean;    // <-- remove if strict
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      value,
      onChange,
      label,
      placeholder,
      helperText,
      errorMessage,
      disabled,
      invalid,
      variant = "outlined",
      size = "md",
      loading = false,
      clearable = true,
      id,
      className,
      ...rest
    },
    ref
  ) => {
    const uid = React.useId();
    const inputId = id ?? `input-${uid}`;
    const descId = `desc-${uid}`;

    const [uncontrolled, setUncontrolled] = React.useState<string>(rest.defaultValue?.toString() ?? "");
    const isControlled = value != null;
    const val = isControlled ? value! : uncontrolled;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isControlled) onChange?.(e);
      else setUncontrolled(e.target.value);
    };

    const handleClear = () => {
      const event = { target: { value: "" } } as React.ChangeEvent<HTMLInputElement>;
      if (isControlled) onChange?.(event);
      else setUncontrolled("");
    };

    const sizeCls: Record<Size, string> = {
      sm: "h-9 text-sm px-3",
      md: "h-10 text-base px-3.5",
      lg: "h-12 text-lg px-4",
    };

    const variantCls: Record<Variant, string> = {
      outlined:
        "border border-zinc-300 bg-white dark:bg-zinc-900 focus:border-indigo-500",
      filled:
        "border border-transparent bg-zinc-100 dark:bg-zinc-800 focus:ring-2 focus:ring-indigo-500",
      ghost:
        "border border-transparent bg-transparent focus:ring-2 focus:ring-indigo-500",
    };

    const invalidCls = invalid
      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
      : "";

    return (
      <div className={cn("w-full", className)}>
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1 block text-sm font-medium text-zinc-800 dark:text-zinc-200"
          >
            {label}
          </label>
        )}

        <div className="relative">
          <input
            id={inputId}
            ref={ref}
            value={val}
            onChange={handleChange}
            placeholder={placeholder}
            disabled={disabled || loading}
            aria-invalid={invalid || undefined}
            aria-describedby={helperText || errorMessage ? descId : undefined}
            aria-busy={loading || undefined}
            className={cn(
              "w-full rounded-xl outline-none transition shadow-sm",
              "placeholder:text-zinc-400 dark:placeholder:text-zinc-500",
              "disabled:opacity-60 disabled:cursor-not-allowed",
              "focus:outline-none",
              sizeCls[size],
              variantCls[variant],
              invalidCls
            )}
            {...rest}
          />

          {/* Clear button */}
          {clearable && !!val && !(disabled || loading) && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear input"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-sm text-zinc-600 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              ×
            </button>
          )}

          {/* Loading spinner */}
          {loading && (
            <div
              className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2"
              role="status"
              aria-live="polite"
            >
              <svg
                className="h-5 w-5 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.25" strokeWidth="4"/>
                <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="4"/>
              </svg>
            </div>
          )}
        </div>

        {(helperText || (invalid && errorMessage)) && (
          <p id={descId} className={cn(
              "mt-1 text-xs",
              invalid ? "text-red-600" : "text-zinc-600 dark:text-zinc-400"
            )}
            aria-live="polite">
            {invalid ? errorMessage : helperText}
          </p>
        )}
      </div>
    );
  }
);
InputField.displayName = "InputField";
