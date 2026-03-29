import { ok, badRequest, serverError } from "@/lib/api/response";
import { requireAdmin } from "@/lib/api/auth-guard";
import db from "@/lib/db/knex.cjs";

export const runtime = "nodejs";

export async function GET(request) {
  try {
    const { response } = await requireAdmin();
    if (response) return response;

    const { searchParams } = new URL(request.url);
    const year = searchParams.get("year");
    const month = searchParams.get("month");

    if (!year || !month) return badRequest("year and month query params are required");

    const mm = String(Number(month)).padStart(2, "0");
    const startDate = `${year}-${mm}-01`;
    const endDate = new Date(Number(year), Number(month), 1)
      .toISOString()
      .slice(0, 10);

    const rows = await db("bookings")
      .where("date_booked", ">=", startDate)
      .where("date_booked", "<", endDate)
      .groupBy("date_booked")
      .select("date_booked", db.raw("count(id) as count"));

    // Return as plain object: { 'YYYY-MM-DD': count }
    const counts = {};
    for (const row of rows) {
      counts[row.date_booked] = Number(row.count);
    }

    return ok(counts);
  } catch (err) {
    return serverError(err);
  }
}
