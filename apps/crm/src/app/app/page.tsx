import Link from "next/link";

export default function AppDashboardPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold">CRM Dashboard</h1>
        <p className="text-sm text-zinc-500">
          Track creator relationships, campaign work, and team access. Use the shortcuts below or the
          navigation to jump into the areas you manage most often.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <Link
          href="/app/admin/users"
          className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm transition hover:border-zinc-300 hover:shadow-md"
        >
          <p className="text-sm font-semibold text-zinc-900">User Management</p>
          <p className="mt-2 text-sm text-zinc-500">
            Invite team members, update roles, and activate or deactivate access.
          </p>
        </Link>

        <Link
          href="/app/creators"
          className="rounded-lg border border-zinc-200 bg-white p-5 text-zinc-400 shadow-sm"
        >
          <p className="text-sm font-semibold">Creators</p>
          <p className="mt-2 text-sm">Coming soon — organize influencer and creator profiles.</p>
        </Link>

        <Link
          href="/app/projects"
          className="rounded-lg border border-zinc-200 bg-white p-5 text-zinc-400 shadow-sm"
        >
          <p className="text-sm font-semibold">Projects</p>
          <p className="mt-2 text-sm">Coming soon — plan campaign deliverables and track progress.</p>
        </Link>
      </div>
    </div>
  );
}
