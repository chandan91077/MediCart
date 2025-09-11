require('dotenv').config();
const http   = require('http');
const app    = require('./src/App');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3001",
    methods: ["GET","POST"],
  },
});

io.on("connection", socket => {
  console.log(`user Connected: ${socket.id}`);
  socket.on("join_room", data => socket.join(data));
  socket.on("send_message", data => socket.to(data.room).emit("receive_message", data));
  socket.on("disconnect", () => console.log("User disconnected", socket.id));
});

const PORT = process.env.PORT || 8001;
server.listen(PORT, () => console.log(`API & socket on port ${PORT}`));
