import { ok, badRequest, notFound, serverError } from "@/lib/api/response";
import { requireSession } from "@/lib/api/auth-guard";
import { getUserProfile, updateUserProfile } from "@/lib/auth/user-repo";

export const runtime = "nodejs";

// GET /api/user/profile — current user's full profile
export async function GET() {
  try {
    const { session, response } = await requireSession();
    if (response) return response;

    const profile = await getUserProfile(session.user.id);
    if (!profile) return notFound("User not found");

    return ok(profile);
  } catch (err) {
    return serverError(err);
  }
}

// PATCH /api/user/profile — update name, email, phone, tag_name
export async function PATCH(request) {
  try {
    const { session, response } = await requireSession();
    if (response) return response;

    const body = await request.json();
    const { name, email, phone, tag_name } = body;

    if (name !== undefined && typeof name !== "string") return badRequest("name must be a string");
    if (email !== undefined && typeof email !== "string") return badRequest("email must be a string");
    if (phone !== undefined && typeof phone !== "string") return badRequest("phone must be a string");
    if (tag_name !== undefined && typeof tag_name !== "string") return badRequest("tag_name must be a string");

    const updated = await updateUserProfile(session.user.id, { name, email, phone, tag_name });
    return ok(updated);
  } catch (err) {
    return serverError(err);
  }
}
