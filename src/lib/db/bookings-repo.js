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
  const q = db(TABLE).orderBy("date_booked", "desc");
  if (status) q.where({ status });
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
