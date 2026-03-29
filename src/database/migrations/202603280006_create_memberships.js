exports.up = async function up(knex) {
  await knex.schema.createTable("memberships", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table
      .uuid("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table
      .enu("status", ["active", "expired", "cancelled"], {
        useNative: true,
        enumName: "membership_status_enum",
      })
      .notNullable()
      .defaultTo("active");
    // DATE stored as TEXT — YYYY-MM-DD
    table.string("due_date", 10).notNullable();
    table.string("plan_name", 100);
    table.decimal("amount_paid", 10, 2);
    table.string("payment_intent_id", 255);
    table.timestamps(true, true);
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTableIfExists("memberships");
  await knex.raw('DROP TYPE IF EXISTS "membership_status_enum"');
};
