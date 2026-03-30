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

// Fetch full profile (includes phone, tag_name, avatar_url).
export async function getUserProfile(id) {
  const row = await db("users")
    .select(
      "users.id",
      "users.name",
      "users.email",
      "users.phone",
      "users.tag_name",
      "users.avatar_url",
      "users.created_at",
      "roles.name as role"
    )
    .join("roles", "roles.id", "users.role_id")
    .where("users.id", id)
    .whereNull("users.deleted_at")
    .first();
  return row || null;
}

// Update profile fields (name, email, phone, tag_name).
export async function updateUserProfile(id, { name, email, phone, tag_name }) {
  const updates = {};
  if (name !== undefined) updates.name = name;
  if (email !== undefined) updates.email = email;
  if (phone !== undefined) updates.phone = phone;
  if (tag_name !== undefined) updates.tag_name = tag_name;

  const [row] = await db("users")
    .where({ id })
    .update({ ...updates, updated_at: db.fn.now() })
    .returning(["id", "name", "email", "phone", "tag_name", "avatar_url"]);
  return row || null;
}

// Fetch password_hash for a user (used during password change).
export async function getUserPasswordHash(id) {
  const row = await db("users").select("password_hash").where({ id }).first();
  return row?.password_hash || null;
}

// Update password hash.
export async function updateUserPassword(id, newHash) {
  await db("users")
    .where({ id })
    .update({ password_hash: newHash, updated_at: db.fn.now() });
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
