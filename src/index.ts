import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import cors from "cors";
import socketHandler from "./sockets";
import digitalRoutes from "./modules/digital-module/digital";
import dotenv from 'dotenv';
import 'reflect-metadata';
import swaggerSetup from './swagger';

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const server = createServer(app);
const port = process.env.PORT || 3000;
const hostname: string = process.env.HOSTNAME;
const io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> =
  new Server(server);

app.use(digitalRoutes(io));

socketHandler(io);
swaggerSetup(app);

server.listen({ host: hostname, port: port }, () => {
  console.log(`server running at http://localhost:${port}`);
  console.log(`API docs can be found at http://${hostname}:${port}/api-docs or ${process.env.SERVER_UR}/api-docs`);
});
