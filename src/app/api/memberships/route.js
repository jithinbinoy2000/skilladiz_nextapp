import { ok, created, badRequest, serverError } from "@/lib/api/response";
import { requireAdmin, requireGamer } from "@/lib/api/auth-guard";
import { getAllMemberships, createMembership } from "@/lib/db/memberships-repo";

export const runtime = "nodejs";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

// GET /api/memberships — admin sees all
export async function GET() {
  try {
    const { response } = await requireAdmin();
    if (response) return response;

    const memberships = await getAllMemberships();
    return ok(memberships);
  } catch (err) {
    return serverError(err);
  }
}

// POST /api/memberships — admin creates a membership for a user
export async function POST(request) {
  try {
    const { response } = await requireAdmin();
    if (response) return response;

    const body = await request.json();
    const { user_id, due_date, plan_name, amount_paid, payment_intent_id } = body;

    if (!user_id || !due_date) return badRequest("user_id and due_date are required");
    if (!DATE_RE.test(due_date)) return badRequest("due_date must be in YYYY-MM-DD format");

    const membership = await createMembership({
      user_id,
      due_date,
      status: "active",
      plan_name: plan_name || null,
      amount_paid: amount_paid ? Number(amount_paid) : null,
      payment_intent_id: payment_intent_id || null,
    });

    return created(membership);
  } catch (err) {
    return serverError(err);
  }
}
