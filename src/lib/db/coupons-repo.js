import db from "./knex.cjs";

const TABLE = "coupons";

export async function getAllCoupons({ includeDeleted = false } = {}) {
  const q = db(TABLE).orderBy("created_at", "desc");
  if (!includeDeleted) q.whereNull("deleted_at");
  return q;
}

export async function getCouponByCode(code) {
  return db(TABLE)
    .whereNull("deleted_at")
    .whereRaw("LOWER(code) = LOWER(?)", [code])
    .first();
}

export async function getCouponById(id) {
  return db(TABLE).where({ id }).first();
}

export async function createCoupon(data) {
  const [coupon] = await db(TABLE).insert(data).returning("*");
  return coupon;
}

export async function updateCoupon(id, data) {
  const [coupon] = await db(TABLE).where({ id }).update(data).returning("*");
  return coupon;
}

/** Atomically increments current_uses. Returns updated row. */
export async function incrementCouponUse(id) {
  const [coupon] = await db(TABLE)
    .where({ id })
    .increment("current_uses", 1)
    .returning("*");
  return coupon;
}

/** Soft-delete — preserves coupon history on existing bookings */
export async function softDeleteCoupon(id) {
  const [coupon] = await db(TABLE)
    .where({ id })
    .update({ deleted_at: db.fn.now() })
    .returning("*");
  return coupon;
}
