import { ok, serverError } from "@/lib/api/response";
import { requireSession } from "@/lib/api/auth-guard";
import { getUserTotalPoints } from "@/lib/db/transactions-repo";
import db from "@/lib/db/knex.cjs";

export const runtime = "nodejs";

// GET /api/user/stats — points, booking stats, hours played
export async function GET() {
  try {
    const { session, response } = await requireSession();
    if (response) return response;

    const userId = session.user.id;

    const [points, bookingStats] = await Promise.all([
      getUserTotalPoints(userId),

      db("bookings")
        .where("bookings.user_id", userId)
        .leftJoin("games", "games.id", "bookings.game_id")
        .select(
          db.raw("count(bookings.id) as total_booked"),
          db.raw("count(bookings.id) filter (where bookings.status = 'completed') as total_completed"),
          db.raw("coalesce(sum(games.duration_minutes) filter (where bookings.status = 'completed'), 0) as total_minutes_played")
        )
        .first(),
    ]);

    return ok({
      points,
      total_booked: Number(bookingStats?.total_booked ?? 0),
      total_completed: Number(bookingStats?.total_completed ?? 0),
      total_hours_played: Math.round((Number(bookingStats?.total_minutes_played ?? 0) / 60) * 10) / 10,
    });
  } catch (err) {
    return serverError(err);
  }
}
