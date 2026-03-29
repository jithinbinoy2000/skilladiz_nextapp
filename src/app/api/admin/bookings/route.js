import { ok, created, badRequest, notFound, conflict, serverError } from "@/lib/api/response";
import { requireAdmin } from "@/lib/api/auth-guard";
import { createBooking, findConflict } from "@/lib/db/bookings-repo";
import { getUserByEmail } from "@/lib/auth/user-repo";

export const runtime = "nodejs";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * POST /api/admin/bookings
 * Manual booking creation — admin only, bypasses payments.
 * Creates booking as "confirmed" immediately.
 */
export async function POST(request) {
  try {
    const { response } = await requireAdmin();
    if (response) return response;

    const body = await request.json();
    const { game_id, slot_id, date_booked, user_email } = body;

    if (!game_id || !slot_id || !date_booked || !user_email) {
      return badRequest("game_id, slot_id, date_booked, and user_email are required");
    }
    if (!DATE_RE.test(date_booked)) {
      return badRequest("date_booked must be in YYYY-MM-DD format");
    }

    const user = await getUserByEmail(user_email);
    if (!user) return notFound(`No user found with email: ${user_email}`);

    const existing = await findConflict(slot_id, date_booked);
    if (existing) return conflict("This slot is already booked for the selected date");

    const booking = await createBooking({
      user_id: user.id,
      game_id,
      slot_id,
      date_booked,
      status: "confirmed",
    });

    return created(booking);
  } catch (err) {
    return serverError(err);
  }
}
