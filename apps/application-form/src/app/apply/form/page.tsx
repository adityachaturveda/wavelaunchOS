"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import {
  Controller,
  FormProvider,
  type Path,
  useForm,
} from "react-hook-form";
import clsx from "clsx";

import {
  applicationFormSchema,
  applicationFormSections,
  type ApplicationFormSubmission,
} from "@studio-os/shared";
import { defaultApplicationFormValues } from "@/lib/application-form-defaults";
import { ApplicationFormProgress } from "@/components/progress/application-form-progress";
import { FormFieldShell } from "@/components/form/form-field-shell";
import { MultiSelectInput, SelectInput, TextAreaInput, TextInput } from "@/components/form/inputs";

const sections = applicationFormSections;
const totalSteps = sections.length;
const isSubmissionApiEnabled = process.env.NEXT_PUBLIC_ENABLE_SUBMISSION_API === "true";

export default function ApplicationFormPage() {
  const router = useRouter();
  const formMethods = useForm<ApplicationFormSubmission>({
    resolver: zodResolver(applicationFormSchema),
    defaultValues: defaultApplicationFormValues,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  const {
    control,
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = formMethods;

  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const currentSection = sections[currentStep];

  const sectionFieldPaths = useMemo(
    () =>
      currentSection.fields.map(
        (field) => `${currentSection.id}.${field.name}` as Path<ApplicationFormSubmission>
      ),
    [currentSection]
  );

  const submitForm = handleSubmit(async (data) => {
    setSubmissionError(null);
    setIsSubmitting(true);

    try {
      if (isSubmissionApiEnabled) {
        const response = await fetch("/api/application-form/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          const errorBody = await response.json().catch(() => ({}));
          throw new Error(errorBody?.message ?? "We couldn’t submit your application. Please try again.");
        }
      } else {
        await new Promise((resolve) => setTimeout(resolve, 900));
      }

      router.push("/apply/success" + (isSubmissionApiEnabled ? "" : "?mode=mock"));
    } catch (error) {
      setSubmissionError(
        error instanceof Error
          ? error.message
          : "Something went wrong while submitting. Please try again."
      );
      setIsSubmitting(false);
    }
  });

  const goNext = async () => {
    const isStepValid = await trigger(sectionFieldPaths);
    if (isStepValid) {
      setCurrentStep((step) => Math.min(step + 1, totalSteps - 1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goBack = () => {
    setCurrentStep((step) => Math.max(step - 1, 0));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getFieldError = (sectionId: keyof ApplicationFormSubmission, fieldName: string) => {
    const sectionError = errors[sectionId];
    if (!sectionError || typeof sectionError !== "object") return undefined;
    const fieldError = (sectionError as Record<string, { message?: string }>)[fieldName];
    return fieldError?.message;
  };

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={submitForm}
        className="grid gap-10 lg:grid-cols-[260px_1fr] lg:items-start"
        noValidate
      >
        <ApplicationFormProgress sections={sections} currentStep={currentStep} />

        <div className="space-y-8">
          <header className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              Step {currentStep + 1} of {totalSteps}
            </span>
            <h2 className="text-3xl font-semibold text-slate-900">{currentSection.title}</h2>
            {currentSection.description ? (
              <p className="max-w-2xl text-sm text-slate-600">{currentSection.description}</p>
            ) : null}
          </header>

          <div className="space-y-6">
            <FormFieldShell title={currentSection.title} description={currentSection.description}>
              {currentSection.fields.map((field) => {
                const name = `${currentSection.id}.${field.name}` as Path<ApplicationFormSubmission>;
                const fieldError = getFieldError(currentSection.id, field.name);
                const spanClass = clsx(
                  field.type === "textarea" || field.type === "multi-select" ? "md:col-span-2" : undefined
                );

                switch (field.type) {
                  case "textarea":
                    return (
                      <div key={field.name} className={spanClass}>
                        <TextAreaInput
                          label={field.label}
                          required={field.required}
                          helperText={field.helperText}
                          error={fieldError}
                          rows={5}
                          {...register(name)}
                        />
                      </div>
                    );
                  case "select":
                    return (
                      <div key={field.name} className={spanClass}>
                        <SelectInput
                          label={field.label}
                          required={field.required}
                          helperText={field.helperText}
                          error={fieldError}
                          options={field.options ?? []}
                          placeholder="Select an option"
                          {...register(name)}
                        />
                      </div>
                    );
                  case "multi-select":
                    return (
                      <div key={field.name} className={spanClass}>
                        <Controller
                          control={control}
                          name={name}
                          render={({ field: controllerField }) => (
                            <MultiSelectInput
                              label={field.label}
                              name={name}
                              required={field.required}
                              helperText={field.helperText}
                              error={fieldError}
                              options={field.options ?? []}
                              value={(controllerField.value as string[]) ?? []}
                              onChange={(next) => controllerField.onChange(next)}
                            />
                          )}
                        />
                      </div>
                    );
                  default: {
                    const inputType =
                      field.type === "email"
                        ? "email"
                        : field.type === "url"
                        ? "url"
                        : field.type === "date"
                        ? "date"
                        : field.type === "number"
                        ? "number"
                        : "text";
                    return (
                      <div key={field.name} className={spanClass}>
                        <TextInput
                          label={field.label}
                          type={inputType}
                          required={field.required}
                          helperText={field.helperText}
                          error={fieldError}
                          inputMode={field.type === "number" ? "numeric" : undefined}
                          {...register(name)}
                        />
                      </div>
                    );
                  }
                }
              })}
            </FormFieldShell>
          </div>

          {submissionError ? (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {submissionError}
            </div>
          ) : null}

          <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={goBack}
              className={clsx(
                "inline-flex w-full items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-400 hover:text-slate-900 sm:w-auto",
                currentStep === 0 && "invisible"
              )}
            >
              Back
            </button>

            {currentStep < totalSteps - 1 ? (
              <button
                type="button"
                onClick={goNext}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-auto"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
              >
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : null}
                {isSubmitting ? "Submitting your application…" : "Submit application"}
              </button>
            )}
          </div>

          <p className="text-xs text-slate-500">
            We respect your privacy. Submitting this form does not guarantee acceptance into Wavelaunch Studio.
            {!isSubmissionApiEnabled
              ? " Backend submission is mocked until the secure API ships (Story 2.3)."
              : null}
          </p>
        </div>
      </form>
    </FormProvider>
  );
}
