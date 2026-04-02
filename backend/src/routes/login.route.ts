import express from "express";
import validateFormData from "../middlewares/validateFormData.middleware.js";
import loginSchema from "../validators/loginSchema.validator.js";
import createLoginSession from "../controllers/createLoginSession.controller.js";

const loginRouter = express.Router();

loginRouter.post("/login", validateFormData(loginSchema), createLoginSession);

export default loginRouter;
