const express = require("express");
const app = express();
const cors = require("cors");
const config = require("./utils/config");
const usersRouter = require("./controllers/users");

app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);

module.exports = app;
