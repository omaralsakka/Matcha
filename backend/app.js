require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const userRouter = require("./controllers/userRouter");
const usersRouter = require("./controllers/usersRouter");
const notificationRouter = require("./controllers/notificationRouter");
const insertFakeUsers = require("./utils/insertFakeUsers");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(cors());


app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "10mb" }));


app.use("/api/user", userRouter);
app.use("/api/users", usersRouter);
app.use("/api/notification", notificationRouter);

// this is function to insert fake users for testing purposes
// insertFakeUsers();
module.exports = app;
