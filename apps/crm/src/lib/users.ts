import bcrypt from "bcryptjs";
import crypto from "node:crypto";

import prisma from "@/lib/prisma";
import { recordAuditEvent } from "@/lib/audit";
import { assertPasswordStrength } from "@studio-os/shared/auth/password";
import {
  CreateUserInput,
  UpdateUserInput,
  createUserSchema,
  updateUserSchema,
  userRoleSchema,
  userStatusSchema,
} from "@studio-os/shared/auth/user";

const USER_SELECT = {
  id: true,
  email: true,
  role: true,
  status: true,
  createdAt: true,
  updatedAt: true,
} as const;

const isRecordNotFoundError = (error: unknown): error is { code: string } =>
  Boolean(error) && typeof error === "object" && "code" in (error as { code?: string }) && (error as { code?: string }).code === "P2025";

export type UserSummary = Awaited<ReturnType<typeof listUsers>>[number];

export class DuplicateEmailError extends Error {
  status = 409;

  constructor(message = "A user with this email already exists.") {
    super(message);
    this.name = "DuplicateEmailError";
  }
}

export class UserNotFoundError extends Error {
  status = 404;

  constructor(message = "User not found.") {
    super(message);
    this.name = "UserNotFoundError";
  }
}

export async function listUsers(): Promise<
  Array<{
    id: string;
    email: string;
    role: "ADMIN" | "FOUNDER" | "TEAM_MEMBER";
    status: "ACTIVE" | "DEACTIVATED";
    createdAt: Date;
    updatedAt: Date;
  }>
> {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: USER_SELECT,
  });

  return users;
}

export async function createUser(input: CreateUserInput, actorId: string) {
  const payload = createUserSchema.parse(input);

  const existingUser = await prisma.user.findUnique({
    where: { email: payload.email },
    select: { id: true },
  });

  if (existingUser) {
    throw new DuplicateEmailError();
  }

  assertPasswordStrength(payload.password);

  const passwordHash = await bcrypt.hash(payload.password, 12);

  const user = await prisma.user.create({
    data: {
      email: payload.email,
      passwordHash,
      role: payload.role,
    },
    select: USER_SELECT,
  });

  await recordAuditEvent({
    action: "USER_CREATED",
    entityType: "User",
    entityId: user.id,
    actorId,
    metadata: { email: user.email, role: user.role },
  });

  return user;
}

export async function updateUser(userId: string, input: UpdateUserInput, actorId: string) {
  const payload = updateUserSchema.parse(input);

  console.log("[updateUser]", { userId, input, actorId });

  if (!payload.role && !payload.status) {
    throw new Error("No updates provided.");
  }

  if (payload.role && !userRoleSchema.safeParse(payload.role).success) {
    throw new Error("Invalid role provided.");
  }

  if (payload.status && !userStatusSchema.safeParse(payload.status).success) {
    throw new Error("Invalid status provided.");
  }

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        role: payload.role ?? undefined,
        status: payload.status ?? undefined,
      },
      select: USER_SELECT,
    });

    const metadata: Record<string, string> = {};
    if (payload.role) {
      metadata.role = payload.role;
    }
    if (payload.status) {
      metadata.status = payload.status;
    }

    await recordAuditEvent({
      action: "USER_UPDATED",
      entityType: "User",
      entityId: user.id,
      actorId,
      metadata,
    });

    return user;
  } catch (error: unknown) {
    if (isRecordNotFoundError(error)) {
      throw new UserNotFoundError();
    }

    throw error;
  }
}

export async function resetUserPassword(userId: string, actorId: string) {
  const tempPassword = generateTemporaryPassword();
  assertPasswordStrength(tempPassword);
  const passwordHash = await bcrypt.hash(tempPassword, 12);

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { passwordHash, status: "ACTIVE" },
      select: USER_SELECT,
    });

    await recordAuditEvent({
      action: "USER_PASSWORD_RESET",
      entityType: "User",
      entityId: user.id,
      actorId,
    });

    return { user, tempPassword };
  } catch (error: unknown) {
    if (isRecordNotFoundError(error)) {
      throw new UserNotFoundError();
    }

    throw error;
  }
}

function generateTemporaryPassword(): string {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>/?";
  const allChars = uppercase + lowercase + numbers + symbols;

  const pick = (chars: string) => chars[crypto.randomInt(0, chars.length)];

  const required = [pick(uppercase), pick(lowercase), pick(numbers), pick(symbols)];
  const remainingLength = 16 - required.length;
  const remaining = Array.from({ length: remainingLength }, () => pick(allChars));

  const passwordArray = [...required, ...remaining];
  // Shuffle to avoid predictable positions
  for (let i = passwordArray.length - 1; i > 0; i -= 1) {
    const j = crypto.randomInt(0, i + 1);
    [passwordArray[i], passwordArray[j]] = [passwordArray[j], passwordArray[i]];
  }

  return passwordArray.join("");
}
