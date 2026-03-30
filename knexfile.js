const dotenv = require("dotenv");

// Load envs for CLI usage.
dotenv.config({ path: ".env.development" });
dotenv.config({ path: ".env.local" });
dotenv.config();
console.log(process.env.DB_PASSWORD, process.env.DB_USER)
// Knex configuration for migrations and seeds.
module.exports = {
  client: "pg",
  connection: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
  },
  migrations: {
    directory: "./src/database/migrations",
    tableName: "knex_migrations",
  },
  seeds: {
    directory: "./src/database/seeds",
  },
};
