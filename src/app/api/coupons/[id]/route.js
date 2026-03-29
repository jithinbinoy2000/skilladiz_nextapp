import { ok, noContent, badRequest, notFound, serverError } from "@/lib/api/response";
import { requireAdmin } from "@/lib/api/auth-guard";
import { getCouponById, updateCoupon, softDeleteCoupon } from "@/lib/db/coupons-repo";

export const runtime = "nodejs";

export async function GET(_, { params }) {
  try {
    const { response } = await requireAdmin();
    if (response) return response;

    const coupon = await getCouponById(params.id);
    if (!coupon) return notFound("Coupon not found");
    return ok(coupon);
  } catch (err) {
    return serverError(err);
  }
}

export async function PATCH(request, { params }) {
  try {
    const { response } = await requireAdmin();
    if (response) return response;

    const body = await request.json();
    const allowed = ["code", "discount_type", "discount_value", "max_uses", "expiry_date"];
    const updates = Object.fromEntries(
      Object.entries(body).filter(([k]) => allowed.includes(k))
    );
    if (!Object.keys(updates).length) return badRequest("No valid fields to update");
    if (updates.code) updates.code = String(updates.code).toUpperCase().trim();

    const coupon = await updateCoupon(params.id, updates);
    if (!coupon) return notFound("Coupon not found");
    return ok(coupon);
  } catch (err) {
    return serverError(err);
  }
}

// DELETE — soft delete to preserve booking history
export async function DELETE(_, { params }) {
  try {
    const { response } = await requireAdmin();
    if (response) return response;

    const coupon = await softDeleteCoupon(params.id);
    if (!coupon) return notFound("Coupon not found");
    return noContent();
  } catch (err) {
    return serverError(err);
  }
}
