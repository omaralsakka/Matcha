require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors"); // chat
const Pusher = require("pusher"); // chat
const bodyParser = require("body-parser");
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

app.use(bodyParser.urlencoded({ extended: false })); // chat 
app.use(bodyParser.json()); // chat
const pusher = new Pusher({ // chat
	appId: process.env.appId,
	key: process.env.key,
	secret: process.env.secret,
	cluster: process.env.cluster,
	useTLS: true,
});

app.post("/message", (req, res) => { // chat
	console.log(req.body)
	const payload = req.body;
	console.log(req.query.channel)
	pusher.trigger(req.query.channel, "message", payload);
	res.send(payload);
});

app.use("/api/user", userRouter);
app.use("/api/users", usersRouter);
app.use("/api/notification", notificationRouter);

// this is function to insert fake users for testing purposes
// insertFakeUsers();
module.exports = app;
