import express from "express";
import requireAuth from "../middlewares/requireAuth.middleware.js";
import validateFormData from "../middlewares/validateFormData.middleware.js";
import { supportSchema } from "../validators/supportSchema.validator.js";
import { clientEmail } from "../controllers/clientEmail.controller.js";

const supportRouter = express.Router();

supportRouter.post(
  "/support",
  requireAuth,
  validateFormData(supportSchema),
  clientEmail,
);

export default supportRouter;
