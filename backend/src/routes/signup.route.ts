import express from "express";

import { signupSchema } from "../validators/signupSchema.validator.js";
import validateFormData from "../middlewares/validateFormData.middleware.js";
import createUser from "../controllers/createUser.controller.js";

const signupRouter = express.Router();

signupRouter.post("/signup", validateFormData(signupSchema), createUser);

export default signupRouter;
