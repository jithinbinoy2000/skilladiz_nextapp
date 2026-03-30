// CJS entry to avoid bundling optional sqlite drivers in Turbopack.
const knex = require("knex");

const db = knex({
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
  },
  pool: { min: 2, max: 10 },
});

module.exports = db;
