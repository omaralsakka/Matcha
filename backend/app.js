const express = require("express");
const app = express();
const cors = require("cors");
const usersRouter = require("./controllers/users");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

app.use("/api/users", usersRouter);

module.exports = app;
