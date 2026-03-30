import db from "./knex.cjs";

const TABLE = "transactions";
const POINTS_PER_EVENT = 5;

export async function createTransaction(data) {
  const [row] = await db(TABLE).insert(data).returning("*");
  return row;
}

/**
 * Award points for a booking event (purchase or game completion).
 * Creates a points_earned transaction row.
 */
export async function awardPoints(userId, referenceId, description) {
  return createTransaction({
    user_id: userId,
    type: "points_earned",
    amount_cents: 0,
    points: POINTS_PER_EVENT,
    reference_id: referenceId,
    description,
  });
}

/**
 * Record a purchase transaction (called from Stripe webhook).
 */
export async function recordPurchase(userId, amountCents, referenceId, description) {
  return createTransaction({
    user_id: userId,
    type: "purchase",
    amount_cents: amountCents,
    points: 0,
    reference_id: referenceId,
    description,
  });
}

export async function getTransactionsByUser(userId) {
  return db(TABLE)
    .where({ user_id: userId })
    .orderBy("created_at", "desc");
}

/**
 * Sum of points earned by a user.
 */
export async function getUserTotalPoints(userId) {
  const row = await db(TABLE)
    .where({ user_id: userId, type: "points_earned" })
    .sum("points as total")
    .first();
  return Number(row?.total ?? 0);
}
