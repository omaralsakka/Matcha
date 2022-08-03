const POOL = require("pg").Pool;
require("dotenv").config();

DBUSER = process.env.DBUSER;
PW = process.env.PW;
HOST = process.env.HOST;
DBPORT = process.env.DBPORT;
DB = process.env.DB;

const pool = new POOL({
  user: DBUSER,
  password: PW,
  host: HOST,
  port: DBPORT,
  database: DB,
});

module.exports = pool;
