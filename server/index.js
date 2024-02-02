const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

// initializing our app
const app = express();
const port = process.env.NODE_ENV || 5000;

// middlewares
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5174",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User is ${socket.id}`);

  socket.on("send_chat", (data) => {
    socket.broadcast.emit("recive_chat",data)
  });
});

server.listen(port, () => {
  console.log(`Server is Running on ${port}`);
});
