// backend/server.js
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors({
  origin: "http://localhost:3001"
}));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // When a message is received, broadcast it to everyone (including sender)
  socket.on("private_message", ({ to, content }) => {
    io.emit("message", {
      from: socket.id,
      content
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

server.listen(3002, () => {
  console.log("Server is running on http://localhost:3002");
});
