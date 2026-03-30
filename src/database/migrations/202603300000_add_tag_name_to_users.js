exports.up = async function up(knex) {
  await knex.schema.alterTable("users", (table) => {
    table.string("tag_name", 50);
  });
};

exports.down = async function down(knex) {
  await knex.schema.alterTable("users", (table) => {
    table.dropColumn("tag_name");
  });
};
