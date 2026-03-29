import { ok, created, badRequest, serverError } from "@/lib/api/response";
import { requireAdmin } from "@/lib/api/auth-guard";
import { getAllCoupons, createCoupon } from "@/lib/db/coupons-repo";

export const runtime = "nodejs";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

// GET /api/coupons — admin only
export async function GET() {
  try {
    const { response } = await requireAdmin();
    if (response) return response;

    const coupons = await getAllCoupons();
    return ok(coupons);
  } catch (err) {
    return serverError(err);
  }
}

// POST /api/coupons — admin only
export async function POST(request) {
  try {
    const { response } = await requireAdmin();
    if (response) return response;

    const body = await request.json();
    const { code, discount_type, discount_value, max_uses, expiry_date } = body;

    if (!code || !discount_type || discount_value == null || !expiry_date) {
      return badRequest("code, discount_type, discount_value, and expiry_date are required");
    }
    if (!["percentage", "fixed"].includes(discount_type)) {
      return badRequest("discount_type must be 'percentage' or 'fixed'");
    }
    if (!DATE_RE.test(expiry_date)) return badRequest("expiry_date must be YYYY-MM-DD");

    const coupon = await createCoupon({
      code: String(code).toUpperCase().trim(),
      discount_type,
      discount_value: Number(discount_value),
      max_uses: Number(max_uses || 1),
      current_uses: 0,
      expiry_date,
    });

    return created(coupon);
  } catch (err) {
    return serverError(err);
  }
}
