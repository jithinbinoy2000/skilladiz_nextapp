import db from "./knex.cjs";

const TABLE = "time_slots";

export async function getSlotsByGame(gameId) {
  return db(TABLE).where({ game_id: gameId }).orderBy("start_time");
}

export async function getSlotById(id) {
  return db(TABLE).where({ id }).first();
}

export async function createSlot(data) {
  const [slot] = await db(TABLE).insert(data).returning("*");
  return slot;
}

export async function updateSlot(id, data) {
  const [slot] = await db(TABLE).where({ id }).update(data).returning("*");
  return slot;
}

export async function deleteSlot(id) {
  return db(TABLE).where({ id }).delete();
}
