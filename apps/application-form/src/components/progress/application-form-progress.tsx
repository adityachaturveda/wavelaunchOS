import clsx from "clsx";
import type { ApplicationFormSectionMeta } from "@studio-os/shared";

interface ApplicationFormProgressProps {
  sections: ApplicationFormSectionMeta[];
  currentStep: number;
}

export function ApplicationFormProgress({ sections, currentStep }: ApplicationFormProgressProps) {
  return (
    <nav aria-label="Application progress" className="space-y-4">
      <p className="text-sm font-medium text-slate-600">Application progress</p>
      <ol className="space-y-3">
        {sections.map((section, index) => {
          const isActive = index === currentStep;
          const isComplete = index < currentStep;

          return (
            <li key={section.id} className="flex items-center gap-3">
              <span
                className={clsx(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-semibold transition",
                  isActive && "border-slate-900 bg-slate-900 text-white",
                  isComplete && !isActive && "border-emerald-500 bg-emerald-500 text-white",
                  !isActive && !isComplete && "border-slate-300 text-slate-500"
                )}
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <div className="flex flex-col">
                <span
                  className={clsx(
                    "text-sm font-semibold",
                    isActive ? "text-slate-900" : "text-slate-600",
                    isComplete && "text-emerald-600"
                  )}
                >
                  {section.title}
                </span>
                {section.description ? (
                  <span className="text-xs text-slate-500">{section.description}</span>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
