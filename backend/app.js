const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./utils/config");
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const dbCreated = await config.pool.query("SELECT * FROM matcha");
    console.log(res.json);
  } catch (err) {
    const createDb = await config.pool.query("CREATE DATABASE matcha");
  }
});
module.exports = app;
