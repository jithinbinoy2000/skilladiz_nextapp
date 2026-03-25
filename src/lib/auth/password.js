import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

// Hash user passwords before saving to DB.
export async function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

// Compare user-supplied password with stored hash.
export async function verifyPassword(password, passwordHash) {
  return bcrypt.compare(password, passwordHash);
}
