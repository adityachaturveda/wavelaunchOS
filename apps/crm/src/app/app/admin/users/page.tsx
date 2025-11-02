import { Metadata } from "next";

import { requireAdmin } from "@/auth/role";
import { listUsers } from "@/lib/users";
import { UsersClient } from "@/app/(admin)/users/users-client";

export const metadata: Metadata = {
  title: "User Management | Studio OS CRM",
  description: "Manage team member access and permissions.",
};

export default async function AdminUsersPage() {
  const session = await requireAdmin();
  const users = await listUsers();

  return <UsersClient initialUsers={users} currentUserId={session.user.id} />;
}
