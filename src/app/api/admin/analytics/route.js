import { ok, serverError } from "@/lib/api/response";
import { requireAdmin } from "@/lib/api/auth-guard";
import db from "@/lib/db/knex.cjs";

export const runtime = "nodejs";

export async function GET() {
  try {
    const { response } = await requireAdmin();
    if (response) return response;

    // ── Aggregate stats ───────────────────────────────────────────────────
    const [
      [{ count: total_bookings }],
      [{ count: confirmed_bookings }],
      [{ count: active_members }],
      [{ sum: total_revenue }],
      [{ count: total_gamers }],
    ] = await Promise.all([
      db("bookings").count("id as count"),
      db("bookings").whereIn("status", ["confirmed", "completed"]).count("id as count"),
      db("memberships").where({ status: "active" }).count("id as count"),
      db("memberships").whereNotNull("amount_paid").sum("amount_paid as sum"),
      db("users")
        .join("roles", "roles.id", "users.role_id")
        .whereIn("roles.name", ["user", "gamer"])
        .whereNull("users.deleted_at")
        .count("users.id as count"),
    ]);

    // ── Last 7 days chart data ────────────────────────────────────────────
    const today = new Date();
    const chartDates = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      chartDates.push(d.toISOString().slice(0, 10));
    }

    const sevenDaysAgo = chartDates[0];
    const rawCounts = await db("bookings")
      .where("date_booked", ">=", sevenDaysAgo)
      .groupBy("date_booked")
      .select("date_booked", db.raw("count(id) as count"));

    const countMap = {};
    for (const row of rawCounts) countMap[row.date_booked] = Number(row.count);

    const chart = chartDates.map((date) => ({
      date,
      count: countMap[date] || 0,
    }));

    // ── Recent 10 bookings with joins ─────────────────────────────────────
    const recent_bookings = await db("bookings")
      .select(
        "bookings.id",
        "bookings.date_booked",
        "bookings.status",
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
      .orderBy("bookings.created_at", "desc")
      .limit(10);

    return ok({
      stats: {
        total_bookings: Number(total_bookings),
        confirmed_bookings: Number(confirmed_bookings),
        active_members: Number(active_members),
        total_revenue: Number(total_revenue || 0),
        total_gamers: Number(total_gamers),
      },
      chart,
      recent_bookings,
    });
  } catch (err) {
    return serverError(err);
  }
}
