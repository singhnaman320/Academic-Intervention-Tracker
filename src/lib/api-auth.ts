import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import type { SessionUser, UserRole } from "@/lib/types";

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
  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}

export function forbiddenResponse() {
  return NextResponse.json({ message: "Forbidden" }, { status: 403 });
}
