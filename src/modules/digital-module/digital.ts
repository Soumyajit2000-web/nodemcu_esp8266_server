import { Router } from "express";
import { Server } from "socket.io";
import { validationMiddleware } from "../../middlewares/validationMiddleware";
import { DigitalPinDTO } from "./dto/DigitalPinDTO";

const router = Router();

export default (io: Server) => {
  //This endpoint is for testing purpose
  router.use("/send-message", (req, res) => {
    io.emit("message", "Hi from server");
    res.send("Message should be sent!");
  });

  //This endpoint is for controlling digital pins
  router.post("/digital", validationMiddleware(DigitalPinDTO), (req, res) => {
    const payload = { pin: req.body.pin, status: req.body.status };
    const stringifiedPayload = JSON.stringify(payload);
    io.emit("digital", stringifiedPayload);
    res.send("Digital pin updated!");
  });

  return router;
};
