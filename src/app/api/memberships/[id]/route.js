import { ok, badRequest, notFound, serverError } from "@/lib/api/response";
import { requireAdmin } from "@/lib/api/auth-guard";
import { updateMembership } from "@/lib/db/memberships-repo";

export const runtime = "nodejs";

// PATCH /api/memberships/:id — admin updates status or due_date
export async function PATCH(request, { params }) {
  try {
    const { response } = await requireAdmin();
    if (response) return response;

    const body = await request.json();
    const allowed = ["status", "due_date", "plan_name", "amount_paid", "payment_intent_id"];
    const updates = Object.fromEntries(
      Object.entries(body).filter(([k]) => allowed.includes(k))
    );
    if (!Object.keys(updates).length) return badRequest("No valid fields to update");

    const membership = await updateMembership(params.id, updates);
    if (!membership) return notFound("Membership not found");
    return ok(membership);
  } catch (err) {
    return serverError(err);
  }
}
