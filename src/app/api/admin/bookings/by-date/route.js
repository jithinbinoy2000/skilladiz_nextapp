import { ok, badRequest, serverError } from "@/lib/api/response";
import { requireAdmin } from "@/lib/api/auth-guard";
import db from "@/lib/db/knex.cjs";

export const runtime = "nodejs";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export async function GET(request) {
  try {
    const { response } = await requireAdmin();
    if (response) return response;

    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    if (!date || !DATE_RE.test(date)) {
      return badRequest("date query param must be in YYYY-MM-DD format");
    }

    const bookings = await db("bookings")
      .select(
        "bookings.id",
        "bookings.date_booked",
        "bookings.status",
        "bookings.payment_intent_id",
        "bookings.created_at",
        "users.name as user_name",
        "users.email as user_email",
        "games.title as game_title",
        "time_slots.start_time",
        "time_slots.end_time"
      )
      .join("users", "users.id", "bookings.user_id")
      .join("games", "games.id", "bookings.game_id")
      .join("time_slots", "time_slots.id", "bookings.slot_id")
      .where("bookings.date_booked", date)
      .orderBy("time_slots.start_time");

    return ok(bookings);
  } catch (err) {
    return serverError(err);
  }
}
