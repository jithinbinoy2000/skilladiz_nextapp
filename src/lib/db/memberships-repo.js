import db from "./knex.cjs";

const TABLE = "memberships";

export async function getMembershipByUser(userId) {
  return db(TABLE)
    .where({ user_id: userId })
    .orderBy("created_at", "desc")
    .first();
}

export async function getActiveMembership(userId) {
  return db(TABLE).where({ user_id: userId, status: "active" }).first();
}

export async function createMembership(data) {
  const [membership] = await db(TABLE).insert(data).returning("*");
  return membership;
}

export async function updateMembership(id, data) {
  const [membership] = await db(TABLE).where({ id }).update(data).returning("*");
  return membership;
}

export async function getAllMemberships({ status } = {}) {
  const q = db(TABLE).orderBy("created_at", "desc");
  if (status) q.where({ status });
  return q;
}
