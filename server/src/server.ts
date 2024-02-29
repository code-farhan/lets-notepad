//Necessary Imports
import { ApiConfig } from "./config";
import { Server, Socket } from "socket.io";
import { DELTA } from "./server.dtos";

// Initialize Socket.io
const io = new Server(ApiConfig.PORT, ApiConfig.corsOptions);

// io handlers
io.on("connection", (socket: Socket) => {
  socket.on("send-changes", (delta: DELTA) => {
    console.log(delta)
    socket.broadcast.emit("receive-changes", delta);
  });
});
