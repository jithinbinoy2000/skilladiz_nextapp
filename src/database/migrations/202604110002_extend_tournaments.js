exports.up = async function up(knex) {
  await knex.schema.alterTable("tournaments", (table) => {
    table.string("category", 100);
    table.text("rules_policies");
    table.string("registration_start", 10); // YYYY-MM-DD
    table.string("registration_end", 10);   // YYYY-MM-DD
    table.integer("current_registrations").notNullable().defaultTo(0);
    table.string("winner_name", 255);
    table.string("winner_image_url", 500);
    table.jsonb("result_images").defaultTo("[]"); // array of image URLs
  });
};

exports.down = async function down(knex) {
  await knex.schema.alterTable("tournaments", (table) => {
    table.dropColumn("category");
    table.dropColumn("rules_policies");
    table.dropColumn("registration_start");
    table.dropColumn("registration_end");
    table.dropColumn("current_registrations");
    table.dropColumn("winner_name");
    table.dropColumn("winner_image_url");
    table.dropColumn("result_images");
  });
};
