import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/db";
import { env } from "@/lib/env";
import { UserModel } from "@/models/user";
import type { SessionUser } from "@/lib/types";

const SESSION_COOKIE = "ait_session";
const secretKey = new TextEncoder().encode(env.JWT_SECRET);

export async function hashPassword(value: string) {
  return bcrypt.hash(value, 12);
}

export async function verifyPassword(value: string, hash: string) {
  return bcrypt.compare(value, hash);
}

export async function signSession(user: SessionUser) {
  return new SignJWT(user)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey);
}

export async function setSessionCookie(user: SessionUser) {
  const token = await signSession(user);
  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getSessionUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secretKey);
    const sessionUser = payload as unknown as SessionUser;

    await connectToDatabase();
    const existingUser = await UserModel.exists({ _id: sessionUser.id });

    if (!existingUser) {
      await clearSessionCookie();
      // User was removed from database, force logout
      throw new Error("USER_REMOVED");
    }

    return sessionUser;
  } catch (error) {
    await clearSessionCookie();
    // Handle both JWT errors and user removal
    if (error instanceof Error && error.message === "USER_REMOVED") {
      // This will be caught by the caller to handle redirect
      throw error;
    }
    return null;
  }
}

export async function requireSessionUser() {
  try {
    const user = await getSessionUser();

    if (!user) {
      redirect("/login");
    }

    return user;
  } catch (error) {
    if (error instanceof Error && error.message === "USER_REMOVED") {
      // User was removed from database, redirect to login with message
      redirect("/login?error=user_removed");
    }
    
    // Other errors, redirect to login
    redirect("/login");
  }
}
