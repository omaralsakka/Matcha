const express = require("express");
const app = express();
const cors = require("cors");
const usersRouter = require("./controllers/users");
const insertFakeUsers = require("./utils/insertFakeUsers");
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "10mb" }));

app.use("/api/user", usersRouter);
// this is function to insert fake users for testing purposes
// insertFakeUsers();
module.exports = app;
