import { z } from "zod";

const passwordSchema = z
  .string()
  .min(12, "Password must be at least 12 characters long.")
  .regex(/[A-Z]/, "Password must include at least one uppercase letter.")
  .regex(/[a-z]/, "Password must include at least one lowercase letter.")
  .regex(/[0-9]/, "Password must include at least one number.")
  .regex(/[^A-Za-z0-9]/, "Password must include at least one special character.");

export type PasswordValidationResult = {
  success: boolean;
  errors: string[];
};

/**
 * Validates a password against the Studio OS security policy.
 */
export function validatePasswordStrength(password: string): PasswordValidationResult {
  const result = passwordSchema.safeParse(password);
  if (result.success) {
    return { success: true, errors: [] };
  }

  const errors = result.error.issues.map((issue: z.ZodIssue) => issue.message);
  return { success: false, errors };
}

/**
 * Throws an error if the password does not meet complexity requirements.
 */
export function assertPasswordStrength(password: string): void {
  const check = validatePasswordStrength(password);
  if (!check.success) {
    throw new Error(check.errors.join(" "));
  }
}
