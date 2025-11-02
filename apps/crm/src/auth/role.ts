import { auth } from "@/auth";

export type UserRole = "ADMIN" | "FOUNDER" | "TEAM_MEMBER";
export type UserStatus = "ACTIVE" | "DEACTIVATED";

export class AuthorizationError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.name = "AuthorizationError";
  }
}

export async function requireRole(requiredRole: UserRole) {
  const session = await auth();

  if (!session?.user) {
    throw new AuthorizationError("Unauthorized", 401);
  }

  if (session.user.status !== "ACTIVE") {
    throw new AuthorizationError("User account is inactive", 403);
  }

  if (session.user.role !== requiredRole) {
    throw new AuthorizationError("Forbidden", 403);
  }

  return session;
}

export async function requireAdmin() {
  return requireRole("ADMIN");
}
