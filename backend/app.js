require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./controllers/userRouter");
const usersRouter = require("./controllers/usersRouter");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(cors());

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "10mb" }));
app.use(express.text());

app.use("/api/user", userRouter);
app.use("/api/users", usersRouter);


module.exports = app;
