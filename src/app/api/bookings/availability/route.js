import { ok, badRequest, serverError } from "@/lib/api/response";
import db from "@/lib/db/knex.cjs";

export const runtime = "nodejs";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * GET /api/bookings/availability?game_id=xxx&date=YYYY-MM-DD
 *
 * Public endpoint — returns:
 * {
 *   is_leave_day: boolean,
 *   leave_reason: string | null,
 *   slots: [{ id, start_time, end_time, is_available }]
 * }
 *
 * A slot is unavailable if a booking exists for that slot+date with status
 * 'confirmed' | 'completed', OR 'pending' created within the last 10 minutes
 * (slot-lock window).
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const game_id = searchParams.get("game_id");
    const date = searchParams.get("date");

    if (!game_id || !date) {
      return badRequest("game_id and date query params are required");
    }
    if (!DATE_RE.test(date)) {
      return badRequest("date must be in YYYY-MM-DD format");
    }

    // 1. Check if this is a shop leave day
    const leaveRow = await db("shop_leaves").where({ leave_date: date }).first();

    if (leaveRow) {
      return ok({
        is_leave_day: true,
        leave_reason: leaveRow.reason || "Shop is closed on this day",
        slots: [],
      });
    }

    // 2. Fetch all time slots for this game
    const slots = await db("time_slots")
      .where({ game_id })
      .orderBy("start_time");

    if (!slots.length) {
      return ok({ is_leave_day: false, leave_reason: null, slots: [] });
    }

    // 3. Find booked slot IDs for this date
    //    "hard" taken: confirmed / completed
    //    "soft" locked: pending created within last 10 minutes (slot hold)
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();

    const takenRows = await db("bookings")
      .where("date_booked", date)
      .whereIn("game_id", [game_id])
      .where(function () {
        this.whereIn("status", ["confirmed", "completed"]).orWhere(
          function () {
            this.where("status", "pending").where(
              "created_at",
              ">",
              tenMinutesAgo
            );
          }
        );
      })
      .select("slot_id", "status", "created_at");

    const takenSlotIds = new Set(takenRows.map((r) => r.slot_id));

    const enriched = slots.map((s) => ({
      id: s.id,
      start_time: s.start_time,
      end_time: s.end_time,
      is_available: !takenSlotIds.has(s.id),
    }));

    return ok({ is_leave_day: false, leave_reason: null, slots: enriched });
  } catch (err) {
    return serverError(err);
  }
}
