import { forwardRef } from "react";
import clsx from "clsx";
import type {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

interface BaseProps {
  label: string;
  name: string;
  required?: boolean;
  helperText?: string;
  error?: string;
}

interface InputProps
  extends BaseProps,
    Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type" | "name"> {
  type?: "text" | "email" | "number" | "url" | "date";
}

export const TextInput = forwardRef<HTMLInputElement, InputProps>(function TextInput(
  { label, name, type = "text", required, helperText, error, ...rest },
  ref
) {
  return (
    <label className="flex flex-col gap-1 text-sm text-slate-700">
      <span className="font-medium">
        {label}
        {required ? <span className="text-rose-600">*</span> : null}
      </span>
      <input
        ref={ref}
        name={name}
        type={type}
        aria-required={required}
        aria-invalid={Boolean(error)}
        className={clsx(
          "h-11 rounded-lg border bg-white px-3 text-base font-normal transition focus-visible:outline-none",
          error
            ? "border-rose-500 focus-visible:ring-2 focus-visible:ring-rose-200"
            : "border-slate-300 focus-visible:border-slate-900 focus-visible:ring-2 focus-visible:ring-slate-200"
        )}
        {...rest}
      />
      {helperText && !error ? <span className="text-xs text-slate-500">{helperText}</span> : null}
      {error ? <span className="text-xs text-rose-600">{error}</span> : null}
    </label>
  );
});

interface TextAreaProps
  extends BaseProps,
    Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "children" | "name" | "rows"> {
  rows?: number;
}

export const TextAreaInput = forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextAreaInput(
  { label, name, required, helperText, error, rows = 4, ...rest },
  ref
) {
  return (
    <label className="flex flex-col gap-1 text-sm text-slate-700">
      <span className="font-medium">
        {label}
        {required ? <span className="text-rose-600">*</span> : null}
      </span>
      <textarea
        ref={ref}
        name={name}
        rows={rows}
        aria-required={required}
        aria-invalid={Boolean(error)}
        className={clsx(
          "rounded-lg border bg-white px-3 py-2 text-base font-normal transition focus-visible:outline-none",
          error
            ? "border-rose-500 focus-visible:ring-2 focus-visible:ring-rose-200"
            : "border-slate-300 focus-visible:border-slate-900 focus-visible:ring-2 focus-visible:ring-slate-200"
        )}
        {...rest}
      />
      {helperText && !error ? <span className="text-xs text-slate-500">{helperText}</span> : null}
      {error ? <span className="text-xs text-rose-600">{error}</span> : null}
    </label>
  );
});

interface SelectProps
  extends BaseProps,
    Omit<SelectHTMLAttributes<HTMLSelectElement>, "size" | "multiple" | "children" | "name"> {
  options: readonly string[];
  placeholder?: string;
}

export const SelectInput = forwardRef<HTMLSelectElement, SelectProps>(function SelectInput(
  { label, name, required, helperText, error, options, placeholder, ...rest },
  ref
) {
  return (
    <label className="flex flex-col gap-1 text-sm text-slate-700">
      <span className="font-medium">
        {label}
        {required ? <span className="text-rose-600">*</span> : null}
      </span>
      <select
        ref={ref}
        name={name}
        aria-required={required}
        aria-invalid={Boolean(error)}
        className={clsx(
          "h-11 rounded-lg border bg-white px-3 text-base font-normal transition focus-visible:outline-none",
          error
            ? "border-rose-500 focus-visible:ring-2 focus-visible:ring-rose-200"
            : "border-slate-300 focus-visible:border-slate-900 focus-visible:ring-2 focus-visible:ring-slate-200"
        )}
        defaultValue=""
        {...rest}
      >
        <option value="" disabled>
          {placeholder ?? "Select an option"}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {helperText && !error ? <span className="text-xs text-slate-500">{helperText}</span> : null}
      {error ? <span className="text-xs text-rose-600">{error}</span> : null}
    </label>
  );
});

interface MultiSelectProps extends BaseProps {
  options: readonly string[];
  value: string[];
  onChange: (next: string[]) => void;
}

export function MultiSelectInput({
  label,
  name,
  required,
  helperText,
  error,
  options,
  value,
  onChange,
}: MultiSelectProps) {
  return (
    <fieldset className="space-y-2 rounded-lg border border-dashed border-slate-300 bg-white/60 px-3 py-2">
      <legend className="text-sm font-medium text-slate-700">
        {label}
        {required ? <span className="text-rose-600">*</span> : null}
      </legend>
      <div className="grid gap-2">
        {options.map((option) => (
          <label key={option} className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              name={name}
              value={option}
              checked={value.includes(option)}
              onChange={(event) => {
                const checked = event.target.checked;
                onChange(checked ? [...value, option] : value.filter((existing) => existing !== option));
              }}
              className="h-4 w-4 rounded border-slate-300 text-slate-900 focus-visible:outline-slate-900"
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
      {helperText && !error ? <span className="text-xs text-slate-500">{helperText}</span> : null}
      {error ? <span className="text-xs text-rose-600">{error}</span> : null}
    </fieldset>
  );
}
