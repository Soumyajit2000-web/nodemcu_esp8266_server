import { Server } from 'socket.io';

export default (io: Server) => {
  io.on("connection", (socket) => {
    console.log("connected to a user.");

    socket.on("ping", (msg) => {
      console.log("Ping message: ", msg);
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};