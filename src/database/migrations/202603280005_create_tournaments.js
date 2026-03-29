exports.up = async function up(knex) {
  await knex.schema.createTable("tournaments", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("name", 255).notNullable();
    // DATE stored as TEXT — YYYY-MM-DD
    table.string("date", 10).notNullable();
    // Time stored as plain string e.g. "18:00"
    table.string("time", 10).notNullable();
    table.decimal("entry_fee", 10, 2).notNullable().defaultTo(0);
    table.decimal("prize_pool", 10, 2).notNullable().defaultTo(0);
    table.integer("max_participants").notNullable();
    table.text("description");
    table.string("banner_url", 500);
    table
      .enu(
        "status",
        ["upcoming", "registration_open", "ongoing", "completed", "cancelled"],
        { useNative: true, enumName: "tournament_status_enum" }
      )
      .notNullable()
      .defaultTo("upcoming");
    table.timestamps(true, true);
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTableIfExists("tournaments");
  await knex.raw('DROP TYPE IF EXISTS "tournament_status_enum"');
};
