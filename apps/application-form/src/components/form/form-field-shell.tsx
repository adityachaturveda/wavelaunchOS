import type { ReactNode } from "react";
import clsx from "clsx";

interface FormFieldShellProps {
  title: string;
  description?: string;
  children: ReactNode;
  columns?: 1 | 2;
  className?: string;
}

export function FormFieldShell({ title, description, children, columns = 2, className }: FormFieldShellProps) {
  return (
    <section
      className={clsx(
        "space-y-4 rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm transition hover:border-slate-300",
        "md:p-8",
        className
      )}
    >
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        {description ? <p className="text-sm text-slate-600">{description}</p> : null}
      </div>
      <div
        className={clsx("grid gap-4", {
          "md:grid-cols-2": columns === 2,
          "md:grid-cols-1": columns === 1,
        })}
      >
        {children}
      </div>
    </section>
  );
}
