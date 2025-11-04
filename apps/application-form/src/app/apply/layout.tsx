import type { ReactNode } from "react";
import Link from "next/link";

import "../../globals.css";

interface ApplyLayoutProps {
  children: ReactNode;
}

export default function ApplyLayout({ children }: ApplyLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-100 via-white to-slate-100">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
              Wavelaunch Studio
            </p>
            <h1 className="text-2xl font-semibold text-slate-900">Creator & Brand Application</h1>
          </div>
          <Link
            href="https://wavelaunch.studio"
            className="text-sm font-medium text-slate-600 underline-offset-4 transition hover:text-slate-900 hover:underline"
          >
            Learn about our programs
          </Link>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-6 py-10 sm:py-14">
        {children}
      </main>
      <footer className="border-t border-slate-200 bg-white/70 py-6 text-center text-sm text-slate-500">
        Wavelaunch Studio © {new Date().getFullYear()} · Applications reviewed weekly
      </footer>
    </div>
  );
}
