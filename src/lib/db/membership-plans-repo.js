import db from "./knex.cjs";

const TABLE = "membership_plans";

export async function getAllMembershipPlans({ activeOnly = false } = {}) {
  const q = db(TABLE).orderBy("created_at", "asc");
  if (activeOnly) q.where({ is_active: true });
  return q;
}

export async function getMembershipPlanById(id) {
  return db(TABLE).where({ id }).first();
}

export async function createMembershipPlan(data) {
  const [plan] = await db(TABLE).insert(data).returning("*");
  return plan;
}

export async function updateMembershipPlan(id, data) {
  const [plan] = await db(TABLE).where({ id }).update(data).returning("*");
  return plan;
}

export async function deleteMembershipPlan(id) {
  return db(TABLE).where({ id }).delete();
}
