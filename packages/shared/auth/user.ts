import { z } from "zod";

export const userRoleSchema = z.enum(["ADMIN", "FOUNDER", "TEAM_MEMBER"]);

export const userStatusSchema = z.enum(["ACTIVE", "DEACTIVATED"]);

export const createUserSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string().min(1, "Password is required"),
  role: userRoleSchema,
});

export const updateUserSchema = z.object({
  role: userRoleSchema.optional(),
  status: userStatusSchema.optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;

export function isAdmin(role: string | null | undefined): boolean {
  return role === "ADMIN";
}
