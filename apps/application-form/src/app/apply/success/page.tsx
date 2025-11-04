import Link from "next/link";
import { redirect } from "next/navigation";

interface SuccessPageProps {
  searchParams: { mode?: string };
}

export default function ApplicationSuccessPage({ searchParams }: SuccessPageProps) {
  const isMockMode = searchParams.mode === "mock";

  if (!searchParams) {
    redirect("/apply");
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center justify-center gap-10 px-6 py-16 text-center">
      <div className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-500">Application received</p>
        <h1 className="text-4xl font-semibold text-slate-900">Thank you for submitting!</h1>
        <p className="mx-auto max-w-xl text-base text-slate-600">
          Well review your details and reach out within 5 business days. In the meantime, youll receive
          a copy of your responses at the email you provided.
        </p>
        {isMockMode ? (
          <p className="mx-auto max-w-xl rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            Heads up: submissions are currently stored locally while our secure API is being finished (Story 2.3).
            Well migrate your data automatically once the live backend is enabled.
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 text-sm text-slate-600">
        <span className="font-medium text-slate-900">What happens next?</span>
        <ul className="list-disc space-y-1 text-left text-slate-600 sm:text-center sm:[&>li]:ml-6">
          <li>We review every application manually to find the best partner fit.</li>
          <li>Youll get an invite to schedule an intro call if theres a match.</li>
          <li>Follow-up questions or additional materials will be requested via email.</li>
        </ul>
      </div>

      <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
        <Link
          href="https://wavelaunch.studio"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Explore Wavelaunch Studio
        </Link>
        <Link
          href="/apply"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-600 transition hover:border-slate-400 hover:text-slate-900"
        >
          Submit another application
        </Link>
      </div>
    </div>
  );
}
