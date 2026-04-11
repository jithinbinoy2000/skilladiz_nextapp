import { ok, created, badRequest, serverError } from "@/lib/api/response";
import { requireAdmin } from "@/lib/api/auth-guard";
import {
  getAllMembershipPlans,
  createMembershipPlan,
} from "@/lib/db/membership-plans-repo";

export const runtime = "nodejs";

// GET /api/admin/membership-plans
export async function GET() {
  try {
    const { response } = await requireAdmin();
    if (response) return response;
    const plans = await getAllMembershipPlans();
    return ok(plans);
  } catch (err) {
    return serverError(err);
  }
}

// POST /api/admin/membership-plans
export async function POST(request) {
  try {
    const { response } = await requireAdmin();
    if (response) return response;

    const body = await request.json();
    const {
      name,
      description,
      price,
      duration_days,
      duration_label,
      credit_points_per_hour,
      discount_rate,
      is_discount_enabled,
      is_active,
    } = body;

    if (!name || price == null || !duration_days) {
      return badRequest("name, price, and duration_days are required");
    }

    const plan = await createMembershipPlan({
      name: String(name).trim(),
      description: description ? String(description).trim() : null,
      price: Number(price),
      duration_days: Number(duration_days),
      duration_label: duration_label ? String(duration_label).trim() : null,
      credit_points_per_hour: Number(credit_points_per_hour || 0),
      discount_rate: Number(discount_rate || 0),
      is_discount_enabled: Boolean(is_discount_enabled),
      is_active: is_active !== false,
    });

    return created(plan);
  } catch (err) {
    return serverError(err);
  }
}
