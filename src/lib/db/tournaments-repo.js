import db from "./knex.cjs";

const TABLE = "tournaments";

export async function getAllTournaments({ status } = {}) {
  const q = db(TABLE).orderBy("date", "asc");
  if (status) q.where({ status });
  return q;
}

export async function getTournamentById(id) {
  return db(TABLE).where({ id }).first();
}

export async function createTournament(data) {
  const [tournament] = await db(TABLE).insert(data).returning("*");
  return tournament;
}

export async function updateTournament(id, data) {
  const [tournament] = await db(TABLE).where({ id }).update(data).returning("*");
  return tournament;
}

export async function deleteTournament(id) {
  return db(TABLE).where({ id }).delete();
}
