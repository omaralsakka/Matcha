const app = require("./app");
const http = require("http");
const cors = require("cors");
const config = require("./utils/config");
const { Server } = require("socket.io");
const queryTools = require("./queries/queryTools");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // console.log("user connected : ", socket.id)

  socket.on("join_room", (data) => {
    socket.join(data);
    // console.log(`user with id ${socket.id} joined room : ${data}`)
  });

  socket.on("send_message", (data) => {
	queryTools.insertNotifications(data);
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    // console.log("user disconnected : ", socket.id) // socket.id is "user id in the socket server";
  });
}); // event listener, connection is the id or name for the event

server.listen(config.PORT, () => {
  console.log(`Server running on port:${config.PORT}`);
});
