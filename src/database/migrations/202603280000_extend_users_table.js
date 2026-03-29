// Adds platform-specific columns to the existing users table.
exports.up = async function up(knex) {
  await knex.schema.alterTable("users", (table) => {
    table.string("avatar_url", 500);
    table.string("phone", 20);
    table.boolean("is_active").notNullable().defaultTo(true);
    // Soft-delete support for users
    table.timestamp("deleted_at");
  });
};

exports.down = async function down(knex) {
  await knex.schema.alterTable("users", (table) => {
    table.dropColumn("avatar_url");
    table.dropColumn("phone");
    table.dropColumn("is_active");
    table.dropColumn("deleted_at");
  });
};
