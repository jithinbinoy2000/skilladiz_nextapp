exports.up = async function up(knex) {
  await knex.schema.createTable("time_slots", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table
      .uuid("game_id")
      .notNullable()
      .references("id")
      .inTable("games")
      .onDelete("CASCADE");
    // Times stored as plain strings e.g. "09:00", "10:30"
    table.string("start_time", 10).notNullable();
    table.string("end_time", 10).notNullable();
    table.timestamps(true, true);
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTableIfExists("time_slots");
};
