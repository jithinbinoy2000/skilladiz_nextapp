import { ok, notFound, serverError } from "@/lib/api/response";
import { requireAdmin } from "@/lib/api/auth-guard";
import { getUserTotalPoints, getTransactionsByUser } from "@/lib/db/transactions-repo";
import db from "@/lib/db/knex.cjs";

export const runtime = "nodejs";

// GET /api/admin/gamers/:id — full gamer profile for admin view
export async function GET(_, { params }) {
  try {
    const { response } = await requireAdmin();
    if (response) return response;

    const { id } = params;

    const user = await db("users")
      .select(
        "users.id",
        "users.name",
        "users.email",
        "users.phone",
        "users.tag_name",
        "users.avatar_url",
        "users.is_active",
        "users.created_at",
        "roles.name as role"
      )
      .join("roles", "roles.id", "users.role_id")
      .where("users.id", id)
      .whereNull("users.deleted_at")
      .first();

    if (!user) return notFound("User not found");

    const [points, bookingStats, bookings, transactions, membership] = await Promise.all([
      getUserTotalPoints(id),

      db("bookings")
        .where("bookings.user_id", id)
        .leftJoin("games", "games.id", "bookings.game_id")
        .select(
          db.raw("count(bookings.id) as total_booked"),
          db.raw("count(bookings.id) filter (where bookings.status = 'completed') as total_completed"),
          db.raw("coalesce(sum(games.duration_minutes) filter (where bookings.status = 'completed'), 0) as total_minutes_played")
        )
        .first(),

      db("bookings")
        .select(
          "bookings.id",
          "bookings.date_booked",
          "bookings.status",
          "bookings.created_at",
          "bookings.payment_intent_id",
          "games.title as game_title",
          "time_slots.start_time",
          "time_slots.end_time"
        )
        .join("games", "games.id", "bookings.game_id")
        .join("time_slots", "time_slots.id", "bookings.slot_id")
        .where("bookings.user_id", id)
        .orderBy("bookings.date_booked", "desc"),

      getTransactionsByUser(id),

      db("memberships")
        .where({ user_id: id })
        .orderBy("created_at", "desc")
        .first(),
    ]);

    return ok({
      ...user,
      points,
      total_booked: Number(bookingStats?.total_booked ?? 0),
      total_completed: Number(bookingStats?.total_completed ?? 0),
      total_hours_played: Math.round((Number(bookingStats?.total_minutes_played ?? 0) / 60) * 10) / 10,
      bookings,
      transactions,
      membership: membership || null,
    });
  } catch (err) {
    return serverError(err);
  }
}
