import { describe, expect, it } from "vitest";

import { assertPasswordStrength, validatePasswordStrength } from "../../auth/password";

describe("validatePasswordStrength", () => {
  it("returns success for passwords meeting all criteria", () => {
    const result = validatePasswordStrength("StrongPass!234");
    expect(result.success).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("collects all unmet requirements", () => {
    const result = validatePasswordStrength("short");
    expect(result.success).toBe(false);
    expect(result.errors).toEqual(
      expect.arrayContaining([
        "Password must be at least 12 characters long.",
        "Password must include at least one uppercase letter.",
        "Password must include at least one number.",
        "Password must include at least one special character.",
      ]),
    );
  });
});

describe("assertPasswordStrength", () => {
  it("does nothing for valid passwords", () => {
    expect(() => assertPasswordStrength("AnotherGood#123")).not.toThrow();
  });

  it("throws with concatenated error messages for invalid passwords", () => {
    expect(() => assertPasswordStrength("weakpass"))
      .toThrow(/at least 12 characters|uppercase letter|number|special character/i);
  });
});
