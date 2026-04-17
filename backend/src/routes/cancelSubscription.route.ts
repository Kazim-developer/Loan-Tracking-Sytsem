import express from "express";
import { cancelSubscription } from "../controllers/cancelSubscription.controller.js";
import requireAuth from "../middlewares/requireAuth.middleware.js";

const cancelSubscriptionRouter = express.Router();

cancelSubscriptionRouter.get(
  "/subscription/cancel",
  requireAuth,
  cancelSubscription,
);

export default cancelSubscriptionRouter;
