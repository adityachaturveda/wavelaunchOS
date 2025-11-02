import { describe, expect, it, vi } from "vitest";

import { AuthorizeDependencies, authorizeWithCredentials } from "../credentials";

describe("authorizeWithCredentials", () => {
  const prismaMock = {
    user: {
      findUnique: vi.fn(),
    },
  } as unknown as AuthorizeDependencies["prisma"];

  const baseDeps = {
    prisma: prismaMock,
  };

  const findUniqueMock = prismaMock.user.findUnique as unknown as ReturnType<typeof vi.fn>;

  const validUser = {
    id: "user-123",
    email: "admin@studio-os.com",
    passwordHash: "hashed-password",
    role: "ADMIN" as const,
    status: "ACTIVE" as const,
  };

  it("returns user identity when credentials are valid", async () => {
    findUniqueMock.mockResolvedValue(validUser);
    const compareFn = vi.fn().mockResolvedValue(true);

    const result = await authorizeWithCredentials({ ...baseDeps, compareFn }, { email: validUser.email!, password: "Password!123" });

    expect(compareFn).toHaveBeenCalledWith("Password!123", "hashed-password");
    expect(result).toEqual({
      id: validUser.id,
      email: validUser.email,
      role: validUser.role,
      status: validUser.status,
      emailVerified: null,
      name: null,
      image: null,
    });
  });

  it("returns null when user is not found", async () => {
    findUniqueMock.mockResolvedValue(null);

    const result = await authorizeWithCredentials(baseDeps, { email: "missing@studio-os.com", password: "DoesNotMatter1!" });

    expect(result).toBeNull();
  });

  it("returns null when password comparison fails", async () => {
    findUniqueMock.mockResolvedValue(validUser);
    const compareFn = vi.fn().mockResolvedValue(false);

    const result = await authorizeWithCredentials({ ...baseDeps, compareFn }, { email: validUser.email!, password: "WrongPass!123" });

    expect(compareFn).toHaveBeenCalled();
    expect(result).toBeNull();
  });

  it("returns null when user status is not active", async () => {
    findUniqueMock.mockResolvedValue({ ...validUser, status: "DEACTIVATED" as const });
    const compareFn = vi.fn().mockResolvedValue(true);

    const result = await authorizeWithCredentials({ ...baseDeps, compareFn }, { email: validUser.email!, password: "Password!123" });

    expect(result).toBeNull();
  });
});
