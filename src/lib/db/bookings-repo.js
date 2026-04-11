import db from "./knex.cjs";

const TABLE = "bookings";

export async function getBookingById(id) {
  return db(TABLE).where({ id }).first();
}

export async function getBookingsByUser(userId) {
  return db(TABLE)
    .where({ user_id: userId })
    .orderBy("date_booked", "desc")
    .orderBy("created_at", "desc");
}

export async function getBookingsByDate(dateBooked) {
  return db(TABLE).where({ date_booked: dateBooked });
}

export async function getAllBookings({ status } = {}) {
  const q = db(TABLE)
    .select(
      "bookings.id",
      "bookings.date_booked",
      "bookings.status",
      "bookings.payment_intent_id",
      "bookings.created_at",
      "bookings.game_id",
      "bookings.user_id",
      "users.name as user_name",
      "users.email as user_email",
      "games.title as game_title",
      "time_slots.start_time",
      "time_slots.end_time"
    )
    .join("users", "users.id", "bookings.user_id")
    .join("games", "games.id", "bookings.game_id")
    .join("time_slots", "time_slots.id", "bookings.slot_id")
    .orderBy("bookings.date_booked", "desc");
  if (status) q.where("bookings.status", status);
  return q;
}

/**
 * Check for a conflicting booking on the same slot + date.
 * Returns the conflicting row or undefined.
 */
export async function findConflict(slotId, dateBooked, excludeBookingId = null) {
  const q = db(TABLE)
    .where({ slot_id: slotId, date_booked: dateBooked })
    .whereNotIn("status", ["cancelled"])
    .first();
  if (excludeBookingId) q.whereNot({ id: excludeBookingId });
  return q;
}

export async function createBooking(data) {
  const [booking] = await db(TABLE).insert(data).returning("*");
  return booking;
}

export async function updateBookingStatus(id, status, extra = {}) {
  const [booking] = await db(TABLE)
    .where({ id })
    .update({ status, ...extra })
    .returning("*");
  return booking;
}
