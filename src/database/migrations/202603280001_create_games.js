exports.up = async function up(knex) {
  await knex.schema.createTable("games", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("title", 255).notNullable();
    table.text("description");
    // Array of image URLs stored as JSON
    table.jsonb("image_urls").notNullable().defaultTo("[]");
    table.integer("duration_minutes").notNullable();
    table.boolean("active_status").notNullable().defaultTo(true);
    // Soft delete — preserves historical booking references
    table.timestamp("deleted_at");
    table.timestamps(true, true);
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTableIfExists("games");
};
