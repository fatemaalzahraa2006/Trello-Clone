
const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 3001;
const CLIENT_URLS = (process.env.CLIENT_URL || "http://localhost:5173,http://localhost:5174,http://localhost:3000").split(",");

const app = express();
app.use(cors({ origin: CLIENT_URLS }));
app.get("/health", (req, res) => res.json({ ok: true }));

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: { origin: CLIENT_URLS, methods: ["GET", "POST"] },
});

const BOARD_EVENTS = ["card:created", "card:moved", "list:updated", "comment:added"];
const room = (boardId) => "board-" + boardId;

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-board", (boardId) => {
    if (boardId == null) return;
    socket.join(room(boardId));
    console.log(socket.id, "joined", room(boardId));
  });

  socket.on("leave-board", (boardId) => {
    if (boardId == null) return;
    socket.leave(room(boardId));
    console.log(socket.id, "left", room(boardId));
  });

  BOARD_EVENTS.forEach((event) => {
    socket.on(event, (payload) => {
      if (!payload || payload.boardId == null) return; 
      socket.to(room(payload.boardId)).emit(event, payload);
    });
  });

  socket.on("disconnect", () => console.log("User disconnected:", socket.id));
});

httpServer.listen(PORT, () => console.log("Server running on port " + PORT));