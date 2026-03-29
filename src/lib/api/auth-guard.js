import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/options";
import { forbidden, unauthorized } from "@/lib/api/response";

/**
 * Retrieves the current session or returns a 401 response.
 *
 * Usage:
 *   const { session, response } = await requireSession(request);
 *   if (response) return response;
 */
export async function requireSession() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return { session: null, response: unauthorized() };
  }
  return { session, response: null };
}

/**
 * Requires one of the provided roles.
 * allowedRoles: string | string[]
 *
 * Usage:
 *   const { session, response } = await requireRole("admin");
 *   if (response) return response;
 */
export async function requireRole(allowedRoles) {
  const { session, response } = await requireSession();
  if (response) return { session: null, response };

  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  const userRole = session.user.role; // set in NextAuth JWT callback

  if (!roles.includes(userRole)) {
    return { session: null, response: forbidden("Insufficient permissions") };
  }

  return { session, response: null };
}

/** Shorthand helpers */
export const requireAdmin = () => requireRole(["admin", "superadmin"]);
export const requireSuperAdmin = () => requireRole("superadmin");
export const requireGamer = () => requireRole(["gamer", "admin", "superadmin"]);
