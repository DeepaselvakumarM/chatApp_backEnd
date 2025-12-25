const { Pool } = require("pg");

// db config using cloud neon postgresql
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

module.exports = pool;
