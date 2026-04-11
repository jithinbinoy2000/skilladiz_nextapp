/**
 * Widen registration_start / registration_end to store "YYYY-MM-DD HH:MM"
 * (was varchar(10), now varchar(20)).
 */
exports.up = async function up(knex) {
  await knex.schema.alterTable("tournaments", (table) => {
    table.string("registration_start", 20).alter();
    table.string("registration_end",   20).alter();
  });
};

exports.down = async function down(knex) {
  await knex.schema.alterTable("tournaments", (table) => {
    table.string("registration_start", 10).alter();
    table.string("registration_end",   10).alter();
  });
};
