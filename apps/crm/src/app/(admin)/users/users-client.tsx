"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useMemo, useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type UserRole = "ADMIN" | "FOUNDER" | "TEAM_MEMBER";
type UserStatus = "ACTIVE" | "DEACTIVATED";

type UserSummary = {
  id: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string | Date;
  updatedAt: string | Date;
};

type NormalizedUser = {
  id: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
};

type UsersClientProps = {
  initialUsers: UserSummary[];
  currentUserId: string;
};

type FormState = {
  email: string;
  password: string;
  role: UserRole;
};

const ROLE_OPTIONS: { value: UserRole; label: string }[] = [
  { value: "ADMIN", label: "Admin" },
  { value: "FOUNDER", label: "Founder" },
  { value: "TEAM_MEMBER", label: "Team Member" },
];

const DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "2-digit",
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
  timeZone: "UTC",
});

function normalizeUserSummary(user: UserSummary): NormalizedUser {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    status: user.status,
    createdAt: typeof user.createdAt === "string" ? user.createdAt : user.createdAt.toISOString(),
    updatedAt: typeof user.updatedAt === "string" ? user.updatedAt : user.updatedAt.toISOString(),
  };
}

function formatTimestamp(value: string) {
  return DATE_FORMATTER.format(new Date(value));
}

export function UsersClient({ initialUsers, currentUserId }: UsersClientProps) {
  const [users, setUsers] = useState<NormalizedUser[]>(() => initialUsers.map(normalizeUserSummary));
  const [formState, setFormState] = useState<FormState>({ email: "", password: "", role: "TEAM_MEMBER" });
  const [formError, setFormError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const sortedUsers = useMemo(
    () =>
      [...users].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
    [users],
  );

  function handleChange(field: keyof FormState) {
    return (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
      setFormState((prev) => ({ ...prev, [field]: event.target.value }));
    };
  }

  async function handleCreateUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    setFeedback(null);

    startTransition(async () => {
      try {
        const response = await fetch("/api/admin/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formState),
        });

        const data = (await response.json().catch(() => ({}))) as { user?: UserSummary; error?: string };

        if (!response.ok || !data.user) {
          throw new Error(data.error ?? "Failed to create user");
        }

        setUsers((prev) => [normalizeUserSummary(data.user!), ...prev]);
        setFormState({ email: "", password: "", role: "TEAM_MEMBER" });
        setFeedback(`User ${data.user.email} created.`);
      } catch (error) {
        if (error instanceof Error) {
          setFormError(error.message);
        } else {
          setFormError("An unexpected error occurred");
        }
      }
    });
  }

  async function handleRoleUpdate(user: NormalizedUser, role: UserRole) {
    if (user.role === role) {
      return;
    }

    setFeedback(null);
    setFormError(null);

    startTransition(async () => {
      try {
        console.log("[roleUpdate]", { id: user.id, role });
        const response = await fetch(`/api/admin/users/${user.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ role }),
        });

        const data = (await response.json().catch(() => ({}))) as { user?: UserSummary; error?: string };

        if (!response.ok || !data.user) {
          throw new Error(data.error ?? "Unable to update role");
        }

        const normalized = normalizeUserSummary(data.user);
        setUsers((prev) => prev.map((item) => (item.id === normalized.id ? normalized : item)));
        setFeedback(`Updated ${normalized.email} role to ${normalized.role.replace("_", " ")}.`);
      } catch (error) {
        if (error instanceof Error) {
          setFormError(error.message);
        } else {
          setFormError("An unexpected error occurred");
        }
      }
    });
  }

  async function handleToggleStatus(user: UserSummary) {
    setFeedback(null);
    setFormError(null);

    const nextStatus: UserStatus = user.status === "ACTIVE" ? "DEACTIVATED" : "ACTIVE";

    startTransition(async () => {
      try {
        const response = await fetch(`/api/admin/users/${user.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: nextStatus }),
        });

        const data = (await response.json().catch(() => ({}))) as { user?: UserSummary; error?: string };

        if (!response.ok || !data.user) {
          throw new Error(data.error ?? "Unable to update user");
        }

        const normalized = normalizeUserSummary(data.user);
        setUsers((prev) => prev.map((item) => (item.id === normalized.id ? normalized : item)));
        setFeedback(`User ${normalized.email} is now ${normalized.status.toLowerCase()}.`);
      } catch (error) {
        if (error instanceof Error) {
          setFormError(error.message);
        } else {
          setFormError("An unexpected error occurred");
        }
      }
    });
  }

  async function handleResetPassword(user: UserSummary) {
    setFeedback(null);
    setFormError(null);

    startTransition(async () => {
      try {
        const response = await fetch(`/api/admin/users/${user.id}`, {
          method: "POST",
        });

        const data = (await response.json().catch(() => ({}))) as { tempPassword?: string; error?: string };

        if (!response.ok || !data.tempPassword) {
          throw new Error(data.error ?? "Unable to reset password");
        }

        setFeedback(`Temporary password for ${user.email}: ${data.tempPassword}`);
      } catch (error) {
        if (error instanceof Error) {
          setFormError(error.message);
        } else {
          setFormError("An unexpected error occurred");
        }
      }
    });
  }

  function renderStatusBadge(status: UserStatus) {
    const styles =
      status === "ACTIVE"
        ? "rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700"
        : "rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700";
    return <span className={styles}>{status === "ACTIVE" ? "Active" : "Deactivated"}</span>;
  }

  const isSubmitting = isPending;

  return (
    <div className="space-y-8">
      <section className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold">Invite Team Member</h2>
        <p className="mt-1 text-sm text-zinc-500">Create a new user with a role-specific access level.</p>
        <form className="mt-4 grid gap-4 md:grid-cols-3" onSubmit={handleCreateUser}>
          <div className="md:col-span-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formState.email}
              onChange={handleChange("email")}
              required
              placeholder="team@studio-os.com"
              disabled={isSubmitting}
            />
          </div>
          <div className="md:col-span-1">
            <Label htmlFor="password">Initial Password</Label>
            <Input
              id="password"
              type="password"
              value={formState.password}
              onChange={handleChange("password")}
              required
              placeholder="Strong password"
              disabled={isSubmitting}
            />
          </div>
          <div className="md:col-span-1">
            <Label htmlFor="role">Role</Label>
            <select
              id="role"
              className="mt-2 block w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-zinc-900 focus:outline-none"
              value={formState.role}
              onChange={handleChange("role")}
              disabled={isSubmitting}
            >
              {ROLE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-3 flex items-center justify-end gap-3">
            {formError && <p className="text-sm text-red-600">{formError}</p>}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create User"}
            </Button>
          </div>
        </form>
      </section>

      <section className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Team Members</h2>
          {feedback && <p className="text-sm text-emerald-600">{feedback}</p>}
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full divide-y divide-zinc-200 text-sm">
            <thead className="bg-zinc-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-zinc-600">Email</th>
                <th className="px-4 py-3 text-left font-medium text-zinc-600">Role</th>
                <th className="px-4 py-3 text-left font-medium text-zinc-600">Status</th>
                <th className="px-4 py-3 text-left font-medium text-zinc-600">Created</th>
                <th className="px-4 py-3 text-left font-medium text-zinc-600">Updated</th>
                <th className="px-4 py-3 text-left font-medium text-zinc-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {sortedUsers.map((user) => {
                const isSelf = user.id === currentUserId;
                return (
                  <tr key={user.id} className="hover:bg-zinc-50">
                    <td className="whitespace-nowrap px-4 py-3 font-medium text-zinc-900">{user.email}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-zinc-600">
                      <select
                        className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-sm shadow-sm focus:border-zinc-900 focus:outline-none"
                        value={user.role}
                        onChange={(event) => handleRoleUpdate(user, event.target.value as UserRole)}
                        disabled={isSubmitting || user.id === currentUserId}
                      >
                        {ROLE_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">{renderStatusBadge(user.status)}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-zinc-500">
                      {formatTimestamp(user.createdAt)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-zinc-500">
                      {formatTimestamp(user.updatedAt)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          disabled={isSubmitting || isSelf}
                          onClick={() => handleToggleStatus(user)}
                        >
                          {user.status === "ACTIVE" ? "Deactivate" : "Reactivate"}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          disabled={isSubmitting}
                          onClick={() => handleResetPassword(user)}
                        >
                          Reset Password
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
