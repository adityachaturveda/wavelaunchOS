import { Metadata } from "next";

import { requireAdmin } from "@/auth/role";
import { listUsers } from "@/lib/users";
import { UsersClient } from "./users-client";

export const metadata: Metadata = {
  title: "User Management | Studio OS CRM",
  description: "Manage team member access and roles.",
};

export default async function UsersPage() {
  const session = await requireAdmin();
  const users = await listUsers();

  return <UsersClient initialUsers={users} currentUserId={session.user.id} />;
}
