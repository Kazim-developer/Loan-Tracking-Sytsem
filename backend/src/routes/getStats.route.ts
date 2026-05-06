import express from "express";
import requireAuth from "../middlewares/requireAuth.middleware.js";
import { getStats } from "../controllers/getStats.controller.js";

const getStatsRouter = express.Router();

getStatsRouter.get("/stats", requireAuth, getStats);

export default getStatsRouter;
