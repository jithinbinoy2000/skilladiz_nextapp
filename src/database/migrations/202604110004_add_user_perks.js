/**
 * Adds per-user perk overrides:
 *   personal_discount_rate  — admin-set % discount for this user (overrides plan)
 */
exports.up = async function up(knex) {
  await knex.schema.alterTable("users", (table) => {
    table
      .decimal("personal_discount_rate", 5, 2)
      .notNullable()
      .defaultTo(0)
      .comment("Admin-set personal discount override (%)");
  });
};

exports.down = async function down(knex) {
  await knex.schema.alterTable("users", (table) => {
    table.dropColumn("personal_discount_rate");
  });
};
