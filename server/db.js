const Pool = require("pg").Pool;

const pool = new Pool({
  // user: "postgres",
  // password: "Sanman01",
  // host: "localhost",
  // port: 5432,
  // database: "perntodo"
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DATABASE,
  host: process.env.POSTGRES_HOST,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT
});

module.exports = pool;
