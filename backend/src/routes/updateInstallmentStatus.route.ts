import express from "express";
import requireAuth from "../middlewares/requireAuth.middleware.js";
import { updateInstallmentStatus } from "../controllers/updateInstallmentStatus.controller.js";

const updateInstallmentStatusRouter = express.Router();

updateInstallmentStatusRouter.post(
  "/installs/:installId/payment",
  requireAuth,
  updateInstallmentStatus,
);

export default updateInstallmentStatusRouter;
