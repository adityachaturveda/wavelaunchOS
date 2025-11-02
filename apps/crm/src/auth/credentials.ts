import type { AdapterUser } from "next-auth/adapters";
import type { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import { z } from "zod";

export const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

export type CredentialsInput = z.infer<typeof credentialsSchema>;

export type AuthorizeDependencies = {
  prisma: Pick<PrismaClient, "user">;
  compareFn?: (password: string, hash: string) => Promise<boolean>;
};

export async function authorizeWithCredentials(
  { prisma, compareFn = compare }: AuthorizeDependencies,
  { email, password }: CredentialsInput,
): Promise<AdapterUser | null> {
  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      passwordHash: true,
      role: true,
      status: true,
    },
  });

  if (!user?.passwordHash) {
    return null;
  }

  const isValid = await compareFn(password, user.passwordHash);
  if (!isValid) {
    return null;
  }

  if (user.status !== "ACTIVE") {
    return null;
  }

  const adapterUser: AdapterUser = {
    id: user.id,
    email: user.email,
    role: user.role,
    status: user.status,
    emailVerified: null,
    name: null,
    image: null,
  };

  return adapterUser;
}
