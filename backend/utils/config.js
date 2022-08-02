require("dotenv").config();
const POOL = require("pg").Pool;

const PORT = process.env.PORT;

const pool = new POOL({
  user: "postgres",
  password: "123456",
  host: "localhost",
  port: 5432,
});

module.exports = {
  PORT,
  pool,
};
