import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      role: "ADMIN" | "FOUNDER" | "TEAM_MEMBER";
      status: "ACTIVE" | "DEACTIVATED";
    };
  }

  interface User {
    id: string;
    email: string;
    role: "ADMIN" | "FOUNDER" | "TEAM_MEMBER";
    status: "ACTIVE" | "DEACTIVATED";
  }
}

declare module "next-auth/adapters" {
  interface AdapterUser {
    role: "ADMIN" | "FOUNDER" | "TEAM_MEMBER";
    status: "ACTIVE" | "DEACTIVATED";
    emailVerified: Date | null;
    name: string | null;
    image: string | null;
  }
}
