import db from "./knex.cjs";

const TABLE = "games";

export async function getAllGames({ includeDeleted = false } = {}) {
  const q = db(TABLE).orderBy("created_at", "desc");
  if (!includeDeleted) q.whereNull("deleted_at");
  return q;
}

export async function getGameById(id) {
  return db(TABLE).where({ id }).whereNull("deleted_at").first();
}

export async function createGame(data) {
  const [game] = await db(TABLE).insert(data).returning("*");
  return game;
}

export async function updateGame(id, data) {
  const [game] = await db(TABLE).where({ id }).update(data).returning("*");
  return game;
}

/** Soft-delete — retains historical booking references */
export async function softDeleteGame(id) {
  const [game] = await db(TABLE)
    .where({ id })
    .update({ deleted_at: db.fn.now() })
    .returning("*");
  return game;
}
