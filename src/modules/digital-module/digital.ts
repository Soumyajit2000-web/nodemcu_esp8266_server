import { Router } from "express";
import { Server } from "socket.io";
import { validationMiddleware } from "../../middlewares/validationMiddleware";
import { DigitalPinDTO } from "./dto/DigitalPinDTO";

const router = Router();

export default (io: Server) => {
  //This endpoint is for testing purpose
  /**
   * @swagger
   * /send-message:
   *   get:
   *     summary: Send a test message
   *     responses:
   *       200:
   *         description: Message should be sent!
   */
  router.use("/send-message", (req, res) => {
    io.emit("message", "Hi from server");
    res.send("Message should be sent!");
  });

  //This endpoint is for controlling digital pins
  /**
   * @swagger
   * /digital:
   *   post:
   *     summary: Control digital pins
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               pin:
   *                 type: integer
   *                 example: 16
   *               status:
   *                 type: integer
   *                 example: 1
   *     responses:
   *       200:
   *         description: Digital pin updated!
   *       400:
   *         description: Validation error
   */
  router.post("/digital", validationMiddleware(DigitalPinDTO), (req, res) => {
    const payload = { pin: req.body.pin, status: req.body.status };
    const stringifiedPayload = JSON.stringify(payload);
    io.emit("digital", stringifiedPayload);
    res.send("Digital pin updated!");
  });

  return router;
};
