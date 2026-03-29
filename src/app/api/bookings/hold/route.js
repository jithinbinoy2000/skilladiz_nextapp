import { ok, created, badRequest, conflict, serverError } from "@/lib/api/response";
import { requireGamer } from "@/lib/api/auth-guard";
import db from "@/lib/db/knex.cjs";

export const runtime = "nodejs";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * POST /api/bookings/hold
 * Temporarily holds a slot for 10 minutes (pending status).
 * A second call by the same user on the same slot replaces the existing hold.
 *
 * Body: { game_id, slot_id, date_booked }
 * Returns: { booking_id }
 */
export async function POST(request) {
  try {
    const { session, response } = await requireGamer();
    if (response) return response;

    const body = await request.json();
    const { game_id, slot_id, date_booked } = body;

    if (!game_id || !slot_id || !date_booked) {
      return badRequest("game_id, slot_id, and date_booked are required");
    }
    if (!DATE_RE.test(date_booked)) {
      return badRequest("date_booked must be in YYYY-MM-DD format");
    }

    // Check shop leave
    const leaveRow = await db("shop_leaves").where({ leave_date: date_booked }).first();
    if (leaveRow) return conflict("The shop is closed on this date");

    // Check for hard conflicts (confirmed/completed by anyone)
    const hardConflict = await db("bookings")
      .where({ slot_id, date_booked })
      .whereIn("status", ["confirmed", "completed"])
      .first();
    if (hardConflict) return conflict("This slot has already been confirmed");

    // Check for soft lock by ANOTHER user (pending within 10 min)
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();
    const softConflict = await db("bookings")
      .where({ slot_id, date_booked, status: "pending" })
      .where("created_at", ">", tenMinutesAgo)
      .whereNot("user_id", session.user.id)
      .first();
    if (softConflict) return conflict("This slot is temporarily held by another user. Try again in a few minutes.");

    // Release any existing hold by THIS user on this slot+date so we don't pile up
    await db("bookings")
      .where({ slot_id, date_booked, user_id: session.user.id, status: "pending" })
      .delete();

    // Create fresh pending hold
    const [booking] = await db("bookings")
      .insert({
        user_id: session.user.id,
        game_id,
        slot_id,
        date_booked,
        status: "pending",
      })
      .returning("*");

    return created({ booking_id: booking.id, expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString() });
  } catch (err) {
    return serverError(err);
  }
}
