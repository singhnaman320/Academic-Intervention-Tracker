import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/api/students", "/api/interventions", "/api/users", "/api/dashboard"];
const publicAuthRoutes = ["/login", "/register"];

export function proxy(request: NextRequest) {
  const token = request.cookies.get("ait_session")?.value;
  const pathname = request.nextUrl.pathname;

  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = publicAuthRoutes.some((route) => pathname.startsWith(route));

  if (!token && isProtected) {
    const url = new URL("/login", request.url);
    url.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(url);
  }

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register", "/api/:path*"],
};
