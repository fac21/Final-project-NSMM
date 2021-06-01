const pg = require("pg");
const dotenv = require("dotenv");

dotenv.config();

const DB_URL = process.env.DATABASE_URL;

if (!DB_URL) throw new Error("No database URL env var!");

const options = {
  connectionString: DB_URL,
};

const db = new pg.Pool(options);

module.exports = db;
