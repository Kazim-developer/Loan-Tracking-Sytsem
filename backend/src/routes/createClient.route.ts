import express from "express";
import validateFormData from "../middlewares/validateFormData.middleware.js";
import createClientSchema from "../validators/createClientSchema.validator.js";
import { createClient } from "../controllers/createClient.controller.js";
import requireAuth from "../middlewares/requireAuth.middleware.js";
import { checkUsageLimit } from "../middlewares/checkUsageLimit.middleware.js";

const createClientRouter = express.Router();

createClientRouter.post(
  "/create-client",
  requireAuth,
  checkUsageLimit("clients"),
  validateFormData(createClientSchema),
  createClient,
);

export default createClientRouter;
