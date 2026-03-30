/**
 * Transactions table — records every purchase and points event.
 *
 * type:
 *   'purchase'      — money paid for a booking
 *   'points_earned' — points awarded after purchase or game completion
 *
 * reference_id: booking.id that triggered this transaction (nullable for manual grants)
 */
exports.up = async function up(knex) {
  await knex.schema.createTable("transactions", (table) => {
    table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
    table
      .uuid("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE");
    table
      .enu(
        "type",
        ["purchase", "points_earned"],
        { useNative: true, enumName: "transaction_type_enum" }
      )
      .notNullable();
    // Amount in cents for purchases; 0 for points-only entries
    table.integer("amount_cents").notNullable().defaultTo(0);
    // Points awarded by this transaction
    table.integer("points").notNullable().defaultTo(0);
    // Optional FK to the booking that triggered this
    table.uuid("reference_id").nullable();
    // Human-readable note
    table.string("description", 255);
    table.timestamps(true, true);
  });

  // Index for fast per-user lookups
  await knex.schema.table("transactions", (table) => {
    table.index(["user_id", "created_at"]);
  });
};

exports.down = async function down(knex) {
  await knex.schema.dropTableIfExists("transactions");
  await knex.raw('DROP TYPE IF EXISTS "transaction_type_enum"');
};
