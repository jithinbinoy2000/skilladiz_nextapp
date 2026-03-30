import { ok, badRequest, unauthorized, serverError } from "@/lib/api/response";
import { requireSession } from "@/lib/api/auth-guard";
import { getUserPasswordHash, updateUserPassword } from "@/lib/auth/user-repo";
import { verifyPassword, hashPassword } from "@/lib/auth/password";

export const runtime = "nodejs";

// POST /api/user/change-password
export async function POST(request) {
  try {
    const { session, response } = await requireSession();
    if (response) return response;

    const body = await request.json();
    const { current_password, new_password } = body;

    if (!current_password || !new_password) {
      return badRequest("current_password and new_password are required");
    }
    if (new_password.length < 8) {
      return badRequest("new_password must be at least 8 characters");
    }

    const currentHash = await getUserPasswordHash(session.user.id);
    if (!currentHash) {
      // OAuth-only account — no password to change
      return badRequest("No password set for this account (OAuth login)");
    }

    const valid = await verifyPassword(current_password, currentHash);
    if (!valid) return unauthorized("Current password is incorrect");

    const newHash = await hashPassword(new_password);
    await updateUserPassword(session.user.id, newHash);

    return ok({ message: "Password updated successfully" });
  } catch (err) {
    return serverError(err);
  }
}
