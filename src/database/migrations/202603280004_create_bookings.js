exports.up = async function up(knex) {
  await knex.schema.createTable("bookings", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table
      .uuid("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("RESTRICT");
    table
      .uuid("game_id")
      .notNullable()
      .references("id")
      .inTable("games")
      .onDelete("RESTRICT");
    table
      .uuid("slot_id")
      .notNullable()
      .references("id")
      .inTable("time_slots")
      .onDelete("RESTRICT");
    // Nullable — applied coupon at booking time
    table
      .uuid("coupon_id")
      .nullable()
      .references("id")
      .inTable("coupons")
      .onDelete("SET NULL");
    // DATE stored as TEXT — YYYY-MM-DD (never a SQL DATE/TIMESTAMP)
    table.string("date_booked", 10).notNullable();
    table
      .enu("status", ["pending", "confirmed", "completed", "cancelled"], {
        useNative: true,
        enumName: "booking_status_enum",
      })
      .notNullable()
      .defaultTo("pending");
    // Stripe PaymentIntent ID
    table.string("payment_intent_id", 255);
    table.timestamps(true, true);
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTableIfExists("bookings");
  await knex.raw('DROP TYPE IF EXISTS "booking_status_enum"');
};
