const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./utils/config");

app.get("/db", async (req, res) => {
  try {
    const db = await config.pool.query("SELECT * FROM users");
    res.json(db);
  } catch (err) {
    console.error(err);
  }
});
app.use(express.json());

module.exports = app;
