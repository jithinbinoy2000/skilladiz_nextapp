exports.up = async function up(knex) {
  await knex.schema.alterTable("games", (table) => {
    table.string("redirect_url", 2048).nullable().defaultTo("/home-2");
  });
};

exports.down = async function down(knex) {
  await knex.schema.alterTable("games", (table) => {
    table.dropColumn("redirect_url");
  });
};
