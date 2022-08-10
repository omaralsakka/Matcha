const express = require("express");
const app = express();
const cors = require("cors");
const usersRouter = require("./controllers/users");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "10mb" }));

app.use("/api/users", usersRouter);

module.exports = app;
