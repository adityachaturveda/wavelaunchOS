import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { AuthorizationError, requireAdmin } from "@/auth/role";
import { DuplicateEmailError, UserNotFoundError, resetUserPassword, updateUser } from "@/lib/users";

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ userId: string }> },
) {
  try {
    const session = await requireAdmin();
    const body = await request.json();
    const { userId } = await context.params;
    const resolvedUserId = userId ?? (body?.userId as string | undefined);
    const updatePayload = {
      role: body?.role,
      status: body?.status,
    };

    if (!resolvedUserId) {
      return NextResponse.json({ error: "User id is required." }, { status: 400 });
    }

    const user = await updateUser(resolvedUserId, updatePayload, session.user.id);
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    if (error instanceof AuthorizationError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }

    if (error instanceof UserNotFoundError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    if (error instanceof DuplicateEmailError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.error("Failed to update user", error);
    return NextResponse.json({ error: "Unable to update user" }, { status: 500 });
  }
}

export async function POST(
  _request: NextRequest,
  context: { params: Promise<{ userId: string }> },
) {
  try {
    const session = await requireAdmin();
    const { userId } = await context.params;
    const { user, tempPassword } = await resetUserPassword(userId, session.user.id);
    return NextResponse.json({ user, tempPassword }, { status: 200 });
  } catch (error) {
    if (error instanceof AuthorizationError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    if (error instanceof UserNotFoundError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    console.error("Failed to reset password", error);
    return NextResponse.json({ error: "Unable to reset password" }, { status: 500 });
  }
}
