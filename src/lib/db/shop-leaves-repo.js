import db from "./knex.cjs";

const TABLE = "shop_leaves";

export async function getAllLeaves() {
  return db(TABLE).orderBy("leave_date", "asc");
}

export async function isLeaveDay(date) {
  const row = await db(TABLE).where({ leave_date: date }).first();
  return Boolean(row);
}

export async function createLeave(data) {
  const [leave] = await db(TABLE).insert(data).returning("*");
  return leave;
}

export async function deleteLeave(id) {
  return db(TABLE).where({ id }).delete();
}
