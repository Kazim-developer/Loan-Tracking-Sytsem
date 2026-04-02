import express from "express";
import requireAuth from "../middlewares/requireAuth.middleware.js";
import getCurrentUser from "../controllers/getCurrentUser.controller.js";

const currentUserRouter = express.Router();

currentUserRouter.get("/me", requireAuth, getCurrentUser);

export default currentUserRouter;
