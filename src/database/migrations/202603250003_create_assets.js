exports.up = async function up(knex) {
  await knex.schema.createTable("assets", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("type", 40).notNullable();
    table.text("path").notNullable();
    table
      .uuid("uploaded_by")
      .references("id")
      .inTable("users")
      .onDelete("SET NULL");
    table.timestamps(true, true);
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTableIfExists("assets");
};
