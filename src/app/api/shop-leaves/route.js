import { ok, created, badRequest, conflict, serverError } from "@/lib/api/response";
import { requireAdmin } from "@/lib/api/auth-guard";
import { getAllLeaves, createLeave } from "@/lib/db/shop-leaves-repo";

export const runtime = "nodejs";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

// GET /api/shop-leaves — public (frontend needs to block these dates in calendar)
export async function GET() {
  try {
    const leaves = await getAllLeaves();
    return ok(leaves);
  } catch (err) {
    return serverError(err);
  }
}

// POST /api/shop-leaves — admin only
export async function POST(request) {
  try {
    const { response } = await requireAdmin();
    if (response) return response;

    const body = await request.json();
    const { leave_date, reason } = body;

    if (!leave_date) return badRequest("leave_date is required");
    if (!DATE_RE.test(leave_date)) return badRequest("leave_date must be YYYY-MM-DD");

    try {
      const leave = await createLeave({ leave_date, reason: reason || null });
      return created(leave);
    } catch (dbErr) {
      // Unique constraint violation means duplicate date
      if (dbErr.code === "23505") return conflict("A leave already exists for this date");
      throw dbErr;
    }
  } catch (err) {
    return serverError(err);
  }
}
