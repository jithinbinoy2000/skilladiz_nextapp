import { ok, serverError } from "@/lib/api/response";
import { requireGamer } from "@/lib/api/auth-guard";
import db from "@/lib/db/knex.cjs";

export const runtime = "nodejs";

// GET /api/bookings/my — returns the current gamer's bookings with game & slot info
export async function GET() {
  try {
    const { session, response } = await requireGamer();
    if (response) return response;

    const bookings = await db("bookings")
      .select(
        "bookings.id",
        "bookings.date_booked",
        "bookings.status",
        "bookings.created_at",
        "games.title as game_title",
        "games.image_urls",
        "time_slots.start_time",
        "time_slots.end_time"
      )
      .join("games", "games.id", "bookings.game_id")
      .join("time_slots", "time_slots.id", "bookings.slot_id")
      .where("bookings.user_id", session.user.id)
      .orderBy("bookings.date_booked", "desc")
      .orderBy("time_slots.start_time");

    return ok(bookings);
  } catch (err) {
    return serverError(err);
  }
}
