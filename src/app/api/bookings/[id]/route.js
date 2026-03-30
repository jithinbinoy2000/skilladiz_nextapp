import { ok, forbidden, notFound, badRequest, serverError } from "@/lib/api/response";
import { requireGamer } from "@/lib/api/auth-guard";
import { getBookingById, updateBookingStatus } from "@/lib/db/bookings-repo";
import { awardPoints } from "@/lib/db/transactions-repo";
import db from "@/lib/db/knex.cjs";

export const runtime = "nodejs";

const VALID_STATUSES = ["pending", "confirmed", "completed", "cancelled"];

// GET /api/bookings/:id
export async function GET(_, { params }) {
  try {
    const { session, response } = await requireGamer();
    if (response) return response;

    const booking = await getBookingById(params.id);
    if (!booking) return notFound("Booking not found");

    const isOwner = booking.user_id === session.user.id;
    const isAdmin = ["admin", "superadmin"].includes(session.user.role);
    if (!isOwner && !isAdmin) return forbidden();

    return ok(booking);
  } catch (err) {
    return serverError(err);
  }
}

// PATCH /api/bookings/:id — update status
export async function PATCH(request, { params }) {
  try {
    const { session, response } = await requireGamer();
    if (response) return response;

    const body = await request.json();
    const { status, payment_intent_id } = body;

    if (!status || !VALID_STATUSES.includes(status)) {
      return badRequest(`status must be one of: ${VALID_STATUSES.join(", ")}`);
    }

    const booking = await getBookingById(params.id);
    if (!booking) return notFound("Booking not found");

    const isOwner = booking.user_id === session.user.id;
    const isAdmin = ["admin", "superadmin"].includes(session.user.role);

    // Gamers can only cancel their own bookings; admins can set any status
    if (!isAdmin) {
      if (!isOwner) return forbidden();
      if (status !== "cancelled") return forbidden("Gamers may only cancel bookings");
    }

    const extra = payment_intent_id ? { payment_intent_id } : {};
    const updated = await updateBookingStatus(params.id, status, extra);

    // Award 5 points when admin marks a game as completed
    if (status === "completed" && isAdmin) {
      const gameRow = await db("games")
        .select("title")
        .where("id", booking.game_id)
        .first();
      awardPoints(
        booking.user_id,
        params.id,
        `Points for completing: ${gameRow?.title ?? "game"}`
      ).catch(() => {});
    }

    return ok(updated);
  } catch (err) {
    return serverError(err);
  }
}
