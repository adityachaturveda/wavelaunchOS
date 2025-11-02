import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { AuthorizationError, requireAdmin } from "@/auth/role";
import { DuplicateEmailError, createUser, listUsers } from "@/lib/users";

export async function GET() {
  try {
    await requireAdmin();
    const users = await listUsers();
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    if (error instanceof AuthorizationError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    console.error("Failed to list users", error);
    return NextResponse.json({ error: "Unable to list users" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await requireAdmin();
    const body = await request.json();
    const user = await createUser(body, session.user.id);
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    if (error instanceof AuthorizationError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.flatten() }, { status: 400 });
    }

    if (error instanceof DuplicateEmailError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    console.error("Failed to create user", error);
    return NextResponse.json({ error: "Unable to create user" }, { status: 500 });
  }
}
