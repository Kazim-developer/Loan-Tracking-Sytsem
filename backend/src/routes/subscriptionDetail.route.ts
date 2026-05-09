import express from "express";
import requireAuth from "../middlewares/requireAuth.middleware.js";
import { getSubscriptionDetail } from "../controllers/getSubscriptionDetail.controller.js";

const subscriptionDetailRouter = express.Router();

subscriptionDetailRouter.get(
  "/subscription",
  requireAuth,
  getSubscriptionDetail,
);

export default subscriptionDetailRouter;
