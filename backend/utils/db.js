const POOL = require("pg").Pool;
require("dotenv").config();

const pool = new POOL({
  user: process.env.DBUSER,
  password: process.env.DBPASS,
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  database: process.env.DB,
});

module.exports = pool;
