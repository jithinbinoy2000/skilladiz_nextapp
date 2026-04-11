exports.up = async function up(knex) {
  await knex.schema.createTable("gallery", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("title", 255);
    table
      .enu("type", ["image", "video", "embed"], {
        useNative: true,
        enumName: "gallery_type_enum",
      })
      .notNullable()
      .defaultTo("image");
    table.string("url", 1000).notNullable(); // file URL or embed URL
    table.string("thumbnail_url", 1000);     // optional thumbnail for videos
    table.string("category", 100);
    table.boolean("is_visible").notNullable().defaultTo(true);
    table.integer("sort_order").notNullable().defaultTo(0);
    table.timestamps(true, true);
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTableIfExists("gallery");
  await knex.raw('DROP TYPE IF EXISTS "gallery_type_enum"');
};
