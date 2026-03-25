const bcrypt = require("bcryptjs");

const ROLES = [
  { name: "superadmin", description: "Full system access", is_system: true },
  { name: "admin", description: "Admin dashboard access", is_system: true },
  { name: "user", description: "Standard user access", is_system: true },
];

exports.seed = async function seed(knex) {
  // Upsert core roles (scalable for future roles).
  for (const role of ROLES) {
    await knex("roles")
      .insert(role)
      .onConflict("name")
      .merge({ description: role.description, is_system: role.is_system });
  }

  // Create or update the default admin user.
  const adminRole = await knex("roles").select("id").where({ name: "admin" }).first();
  const passwordHash = await bcrypt.hash("Admin@123", 12);

  await knex("users")
    .insert({
      name: "Admin",
      email: "admin@gmail.com",
      password_hash: passwordHash,
      role_id: adminRole.id,
    })
    .onConflict("email")
    .merge({
      name: "Admin",
      password_hash: passwordHash,
      role_id: adminRole.id,
    });
};
