import { ok, notFound, badRequest, serverError } from "@/lib/api/response";
import { requireAdmin } from "@/lib/api/auth-guard";
import {
  getMembershipPlanById,
  updateMembershipPlan,
  deleteMembershipPlan,
} from "@/lib/db/membership-plans-repo";

export const runtime = "nodejs";

// GET /api/admin/membership-plans/[id]
export async function GET(_, { params }) {
  try {
    const { response } = await requireAdmin();
    if (response) return response;
    const plan = await getMembershipPlanById(params.id);
    if (!plan) return notFound("Plan not found");
    return ok(plan);
  } catch (err) {
    return serverError(err);
  }
}

// PUT /api/admin/membership-plans/[id]
export async function PUT(request, { params }) {
  try {
    const { response } = await requireAdmin();
    if (response) return response;

    const existing = await getMembershipPlanById(params.id);
    if (!existing) return notFound("Plan not found");

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

    if (name !== undefined && !String(name).trim()) {
      return badRequest("name cannot be empty");
    }

    const updates = {};
    if (name !== undefined) updates.name = String(name).trim();
    if (description !== undefined) updates.description = description ? String(description).trim() : null;
    if (price !== undefined) updates.price = Number(price);
    if (duration_days !== undefined) updates.duration_days = Number(duration_days);
    if (duration_label !== undefined) updates.duration_label = duration_label ? String(duration_label).trim() : null;
    if (credit_points_per_hour !== undefined) updates.credit_points_per_hour = Number(credit_points_per_hour);
    if (discount_rate !== undefined) updates.discount_rate = Number(discount_rate);
    if (is_discount_enabled !== undefined) updates.is_discount_enabled = Boolean(is_discount_enabled);
    if (is_active !== undefined) updates.is_active = Boolean(is_active);

    const plan = await updateMembershipPlan(params.id, updates);
    return ok(plan);
  } catch (err) {
    return serverError(err);
  }
}

// DELETE /api/admin/membership-plans/[id]
export async function DELETE(_, { params }) {
  try {
    const { response } = await requireAdmin();
    if (response) return response;
    const existing = await getMembershipPlanById(params.id);
    if (!existing) return notFound("Plan not found");
    await deleteMembershipPlan(params.id);
    return ok({ deleted: true });
  } catch (err) {
    return serverError(err);
  }
}
