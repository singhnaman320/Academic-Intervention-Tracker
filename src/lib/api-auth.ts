import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import type { SessionUser, UserRole } from "@/lib/types";

const SESSION_COOKIE = "ait_session";

export async function requireApiUser() {
  const user = await getSessionUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}

export function assertRole(user: SessionUser, roles: UserRole[]) {
  if (!roles.includes(user.role)) {
    throw new Error("Forbidden");
  }
}

export function unauthorizedResponse() {
  const response = NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  response.cookies.delete(SESSION_COOKIE);
  return response;
}

export function forbiddenResponse() {
  return NextResponse.json({ message: "Forbidden" }, { status: 403 });
}
