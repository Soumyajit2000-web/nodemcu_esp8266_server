import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { DigitalPins } from "./ts/enum";

const app = express();
const server = createServer(app);
const port = process.env.PORT || 3000;
const hostname: string = "0.0.0.0";
const io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> =
  new Server(server);

app.get("/", (req, res) => {
  res.send("Hello, TypeScript Express!");
});

app.get("/send-message", (req, res) => {
  io.emit("message", "Hi from server");
  res.send("Message should be sent!");
});

app.get("/digital", (req, res) => {
  const payload = { pin: DigitalPins.D1, status: 1 };
  const stringifiedPayload = JSON.stringify(payload)
  io.emit("digital", stringifiedPayload);
  res.send("Digital pin updated!");
});

io.on("connection", (socket) => {
  console.log("connected to a user.");
  socket.on("ping", (msg) => {
    console.log("Ping message: ", msg);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen({ host: hostname, port: port }, () => {
  console.log(`server running at http://localhost:${port}`);
  console.log(`server running at http://192.168.0.101:${port}`);
});
