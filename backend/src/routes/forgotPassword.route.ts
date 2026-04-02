import express from "express";
import validateFormData from "../middlewares/validateFormData.middleware.js";
import { forgotPasswordSchema } from "../validators/forgotPasswordSchema.validator.js";
import createForgotPassword from "../controllers/createForgotPassword.controller.js";

const forgotPasswordRouter = express.Router();

forgotPasswordRouter.post(
  "/forgot-password",
  validateFormData(forgotPasswordSchema),
  createForgotPassword,
);

export default forgotPasswordRouter;
