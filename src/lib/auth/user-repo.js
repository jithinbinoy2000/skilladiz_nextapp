import db from "@/lib/db/knex.cjs";
import { ROLES } from "./roles";

// Fetch user by email (case-insensitive).
export async function getUserByEmail(email) {
  const row = await db("users")
    .select("users.id", "users.name", "users.email", "users.password_hash", "roles.name as role")
    .join("roles", "roles.id", "users.role_id")
    .whereRaw("LOWER(users.email) = LOWER(?)", [email])
    .first();
  return row || null;
}

// Fetch user by id for sessions.
export async function getUserById(id) {
  const row = await db("users")
    .select("users.id", "users.name", "users.email", "roles.name as role")
    .join("roles", "roles.id", "users.role_id")
    .where("users.id", id)
    .first();
  return row || null;
}

// Create user with password hash (email+password flow).
export async function createUserWithPassword({ name, email, passwordHash, role = ROLES.USER }) {
  const roleRow = await db("roles").select("id").where({ name: role }).first();
  const row = await db("users")
    .insert({
      name,
      email,
      password_hash: passwordHash,
      role_id: roleRow?.id,
    })
    .returning(["id", "name", "email"]);
  return row?.[0] || null;
}

// Upsert user for OAuth (Google) logins.
export async function upsertOAuthUser({ name, email, role = ROLES.USER }) {
  const roleRow = await db("roles").select("id").where({ name: role }).first();
  const row = await db("users")
    .insert({
      name,
      email,
      role_id: roleRow?.id,
    })
    .onConflict("email")
    .merge({ name })
    .returning(["id", "name", "email"]);
  return row?.[0] || null;
}
