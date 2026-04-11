import { ok, serverError } from "@/lib/api/response";
import { requireAdmin } from "@/lib/api/auth-guard";
import db from "@/lib/db/knex.cjs";
import { getUserTotalPoints } from "@/lib/db/transactions-repo";

export const runtime = "nodejs";

export async function GET() {
  try {
    const { response } = await requireAdmin();
    if (response) return response;

    // Base gamer list
    const gamers = await db("users")
      .select(
        "users.id",
        "users.name",
        "users.email",
        "users.phone",
        "users.is_active",
        "users.personal_discount_rate",
        "users.created_at",
        "roles.name as role"
      )
      .join("roles", "roles.id", "users.role_id")
      .whereIn("roles.name", ["user", "gamer"])
      .whereNull("users.deleted_at")
      .orderBy("users.created_at", "desc");

    if (!gamers.length) return ok([]);

    const ids = gamers.map((g) => g.id);

    // Booking counts per user
    const bookingCounts = await db("bookings")
      .whereIn("user_id", ids)
      .groupBy("user_id")
      .select("user_id", db.raw("count(id) as count"));

    const countMap = {};
    for (const r of bookingCounts) countMap[r.user_id] = Number(r.count);

    // Total spent (from memberships) per user
    const spentRows = await db("memberships")
      .whereIn("user_id", ids)
      .groupBy("user_id")
      .select("user_id", db.raw("coalesce(sum(amount_paid), 0) as total"));

    const spentMap = {};
    for (const r of spentRows) spentMap[r.user_id] = Number(r.total);

    // Latest membership per user (subquery)
    const memberships = await db("memberships as m")
      .whereIn("m.user_id", ids)
      .whereRaw(
        "m.id = (SELECT id FROM memberships WHERE user_id = m.user_id ORDER BY created_at DESC LIMIT 1)"
      )
      .select("m.id", "m.user_id", "m.status", "m.due_date", "m.plan_name");

    const membershipMap = {};
    for (const m of memberships) membershipMap[m.user_id] = m;

    // Last booking date per user
    const lastBookings = await db("bookings")
      .whereIn("user_id", ids)
      .groupBy("user_id")
      .select("user_id", db.raw("max(date_booked) as last_booking_date"));

    const lastBookingMap = {};
    for (const r of lastBookings) lastBookingMap[r.user_id] = r.last_booking_date;

    // Points per user (single aggregation query)
    const pointsRows = await db("transactions")
      .whereIn("user_id", ids)
      .where({ type: "points_earned" })
      .groupBy("user_id")
      .select("user_id", db.raw("coalesce(sum(points), 0) as total_points"));

    const pointsMap = {};
    for (const r of pointsRows) pointsMap[r.user_id] = Number(r.total_points);

    const enriched = gamers.map((g) => ({
      ...g,
      booking_count: countMap[g.id] || 0,
      total_spent: spentMap[g.id] || 0,
      membership: membershipMap[g.id] || null,
      last_booking_date: lastBookingMap[g.id] || null,
      points: pointsMap[g.id] || 0,
    }));

    return ok(enriched);
  } catch (err) {
    return serverError(err);
  }
}
