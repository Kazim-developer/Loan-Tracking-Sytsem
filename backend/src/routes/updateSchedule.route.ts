import express from "express";
import requireAuth from "../middlewares/requireAuth.middleware.js";
import { updateSchedule } from "../controllers/updateSchedule.controller.js";

const updateScheduleRouter = express.Router();

updateScheduleRouter.post("/loanSchedule", requireAuth, updateSchedule);

export default updateScheduleRouter;
