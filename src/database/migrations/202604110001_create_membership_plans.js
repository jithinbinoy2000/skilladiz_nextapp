exports.up = async function up(knex) {
  await knex.schema.createTable("membership_plans", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("name", 100).notNullable();
    table.text("description");
    table.decimal("price", 10, 2).notNullable().defaultTo(0);
    // Duration in days — admin enters value + unit; store as days for simplicity
    table.integer("duration_days").notNullable().defaultTo(30);
    table.string("duration_label", 50); // e.g. "1 Month", "3 Months", "1 Year"
    table.decimal("credit_points_per_hour", 10, 2).notNullable().defaultTo(0);
    table.decimal("discount_rate", 5, 2).notNullable().defaultTo(0); // percentage 0-100
    table.boolean("is_discount_enabled").notNullable().defaultTo(false);
    table.boolean("is_active").notNullable().defaultTo(true);
    table.timestamps(true, true);
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTableIfExists("membership_plans");
};
