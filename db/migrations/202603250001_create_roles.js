exports.up = async function up(knex) {
  await knex.schema.createTable("roles", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("name", 50).notNullable().unique();
    table.string("description", 255);
    table.boolean("is_system").notNullable().defaultTo(true);
    table.timestamps(true, true);
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTableIfExists("roles");
};
