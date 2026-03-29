exports.up = async function up(knex) {
  await knex.schema.createTable("shop_leaves", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    // DATE stored as TEXT — YYYY-MM-DD; unique so no duplicate leave days
    table.string("leave_date", 10).notNullable().unique();
    table.text("reason");
    table.timestamps(true, true);
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTableIfExists("shop_leaves");
};
