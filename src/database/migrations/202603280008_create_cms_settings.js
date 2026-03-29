exports.up = async function up(knex) {
  await knex.schema.createTable("cms_settings", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    // Unique section identifier e.g. 'hero', 'features', 'about', 'footer'
    table.string("section_name", 100).notNullable().unique();
    table.boolean("is_visible").notNullable().defaultTo(true);
    // Flexible JSON blob: text, image URLs, social links, logos, CTAs
    table.jsonb("content").notNullable().defaultTo("{}");
    table.timestamps(true, true);
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTableIfExists("cms_settings");
};
