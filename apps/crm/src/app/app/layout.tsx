import { ReactNode } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

type NavigationItem = {
  href: string;
  label: string;
  requiresAdmin?: boolean;
};

const NAVIGATION: NavigationItem[] = [
  { href: "/app", label: "Dashboard" },
  { href: "/app/creators", label: "Creators" },
  { href: "/app/brands", label: "Brands" },
  { href: "/app/projects", label: "Projects" },
  { href: "/app/credentials", label: "Credentials" },
  { href: "/app/deliverables", label: "Deliverables" },
  { href: "/app/audit", label: "Audit Logs" },
  { href: "/app/settings", label: "Settings" },
  { href: "/app/admin/users", label: "User Management", requiresAdmin: true },
];

export default async function AppLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  async function handleSignOut() {
    "use server";

    await signOut({ redirectTo: "/login" });
  }

  const isAdmin = session.user.role === "ADMIN";

  return (
    <div className="flex min-h-screen bg-zinc-50 text-zinc-900 dark:bg-black dark:text-zinc-100">
      <aside className="hidden w-64 flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950 lg:flex">
        <div className="border-b border-zinc-200 px-6 py-6 dark:border-zinc-800">
          <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Studio OS</p>
          <h1 className="mt-1 text-lg font-semibold">Creator Relationship Manager</h1>
        </div>
        <nav className="flex-1 space-y-1 px-4 py-6">
          {NAVIGATION.filter((item) => (item.requiresAdmin ? isAdmin : true)).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center rounded-md px-3 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-900 dark:hover:text-zinc-50"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-zinc-200 px-6 py-6 dark:border-zinc-800">
          <div className="mb-4 text-sm text-zinc-600 dark:text-zinc-300">
            <p className="font-medium">{session.user.email}</p>
            <p className="capitalize text-zinc-500 dark:text-zinc-400">{session.user.role.toLowerCase()}</p>
          </div>
          <form action={handleSignOut}>
            <Button type="submit" variant="outline" className="w-full">
              Sign out
            </Button>
          </form>
        </div>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="border-b border-zinc-200 bg-white/90 px-6 py-4 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80 lg:hidden">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Studio OS</p>
              <h1 className="text-lg font-semibold">Creator Relationship Manager</h1>
            </div>
            <form action={handleSignOut}>
              <Button type="submit" variant="outline">
                Sign out
              </Button>
            </form>
          </div>
        </header>
        <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-8">{children}</main>
      </div>
    </div>
  );
}
