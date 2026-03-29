import { ok, created, badRequest, conflict, serverError } from "@/lib/api/response";
import { requireGamer, requireAdmin } from "@/lib/api/auth-guard";
import {
  getAllBookings,
  createBooking,
  findConflict,
} from "@/lib/db/bookings-repo";
import { isLeaveDay } from "@/lib/db/shop-leaves-repo";
import { getCouponByCode, incrementCouponUse } from "@/lib/db/coupons-repo";

export const runtime = "nodejs";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

// GET /api/bookings — admin sees all; gamers handled via /api/bookings/my
export async function GET(request) {
  try {
    const { response, session } = await requireAdmin();
    if (response) return response;

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || undefined;
    const bookings = await getAllBookings({ status });
    return ok(bookings);
  } catch (err) {
    return serverError(err);
  }
}

// POST /api/bookings — authenticated gamers or admins
export async function POST(request) {
  try {
    const { session, response } = await requireGamer();
    if (response) return response;

    const body = await request.json();
    const { game_id, slot_id, date_booked, coupon_code } = body;

    if (!game_id || !slot_id || !date_booked) {
      return badRequest("game_id, slot_id, and date_booked are required");
    }
    if (!DATE_RE.test(date_booked)) {
      return badRequest("date_booked must be in YYYY-MM-DD format");
    }

    // Reject bookings on shop leave days
    if (await isLeaveDay(date_booked)) {
      return conflict("The shop is closed on this date");
    }

    // Check slot availability
    const existing = await findConflict(slot_id, date_booked);
    if (existing) return conflict("This slot is already booked for the selected date");

    let coupon_id = null;
    if (coupon_code) {
      const coupon = await getCouponByCode(coupon_code);
      if (!coupon) return badRequest("Invalid or expired coupon code");

      const today = new Date().toISOString().slice(0, 10);
      if (coupon.expiry_date < today) return badRequest("Coupon has expired");
      if (coupon.current_uses >= coupon.max_uses) return badRequest("Coupon usage limit reached");

      coupon_id = coupon.id;
      await incrementCouponUse(coupon.id);
    }

    const booking = await createBooking({
      user_id: session.user.id,
      game_id,
      slot_id,
      date_booked,
      coupon_id,
      status: "pending",
    });

    return created(booking);
  } catch (err) {
    return serverError(err);
  }
}
