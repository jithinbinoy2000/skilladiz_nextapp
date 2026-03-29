import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { ADMIN_ROLES, ROLES } from "./lib/auth/roles";

const isAdminPath = (pathname) => pathname.startsWith("/admin");
const isSuperadminPath = (pathname) => pathname.startsWith("/superadmin");

export async function proxy(req) {
  const { pathname } = req.nextUrl;

  if (!isAdminPath(pathname) && !isSuperadminPath(pathname)) {
    return NextResponse.next();
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    const loginUrl = new URL("/auth", req.url);
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  const role = token.role || ROLES.USER;

  if (isSuperadminPath(pathname) && role !== ROLES.SUPERADMIN) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  if (isAdminPath(pathname) && !ADMIN_ROLES.includes(role)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/superadmin/:path*"],
};
