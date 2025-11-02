import { NextResponse } from "next/server";
import { auth } from "@/auth";

const PUBLIC_PATHS = ["/login", "/api/auth", "/_next", "/favicon", "/assets", "/public"];
const ADMIN_PATH_PREFIXES = ["/app/api/admin", "/app/users"];

export default auth((req) => {
  const { nextUrl } = req;
  const isPublicPath = PUBLIC_PATHS.some((path) => nextUrl.pathname.startsWith(path));

  if (isPublicPath) {
    return NextResponse.next();
  }

  if (!req.auth && nextUrl.pathname.startsWith("/app")) {
    const callbackUrl = nextUrl.pathname + nextUrl.search;
    const loginUrl = new URL("/login", nextUrl.origin);
    if (callbackUrl) {
      loginUrl.searchParams.set("callbackUrl", callbackUrl);
    }
    return NextResponse.redirect(loginUrl);
  }

  if (req.auth?.user?.status !== "ACTIVE") {
    const loginUrl = new URL("/login", nextUrl.origin);
    loginUrl.searchParams.set("reason", "deactivated");
    return NextResponse.redirect(loginUrl);
  }

  const isAdminPath = ADMIN_PATH_PREFIXES.some((prefix) => nextUrl.pathname.startsWith(prefix));

  if (isAdminPath && req.auth?.user?.role !== "ADMIN") {
    if (nextUrl.pathname.startsWith("/app/api")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const appUrl = new URL("/app", nextUrl.origin);
    return NextResponse.redirect(appUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/(app)(.*)", "/", "/((?!_next/static|_next/image|favicon.ico).*)"],
};
