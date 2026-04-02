import express from "express";
import validateFormData from "../middlewares/validateFormData.middleware.js";
import createResetPassword from "../controllers/createResetPassword.controller.js";
import { resetPasswordSchema } from "../validators/resetPasswordSchema.validator.js";

const resetPasswordRouter = express.Router();

resetPasswordRouter.post(
  "/reset-password",
  validateFormData(resetPasswordSchema),
  createResetPassword,
);

export default resetPasswordRouter;
