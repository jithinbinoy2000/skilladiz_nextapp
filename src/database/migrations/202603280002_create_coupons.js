// Created before bookings so bookings can hold a nullable FK to coupons.
exports.up = async function up(knex) {
  await knex.schema.createTable("coupons", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table.string("code", 50).notNullable().unique();
    table
      .enu("discount_type", ["percentage", "fixed"], {
        useNative: true,
        enumName: "discount_type_enum",
      })
      .notNullable();
    table.decimal("discount_value", 10, 2).notNullable();
    table.integer("max_uses").notNullable().defaultTo(1);
    table.integer("current_uses").notNullable().defaultTo(0);
    // DATE stored as TEXT — YYYY-MM-DD
    table.string("expiry_date", 10).notNullable();
    // Soft delete — preserve coupon history
    table.timestamp("deleted_at");
    table.timestamps(true, true);
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTableIfExists("coupons");
  await knex.raw('DROP TYPE IF EXISTS "discount_type_enum"');
};
