import express from "express";
import requireAuth from "../middlewares/requireAuth.middleware.js";
import { prepareUpgrade } from "../controllers/prepareUpgrade.controller.js";

const prepareUpgradeRouter = express.Router();

prepareUpgradeRouter.post(
  "/subscription/prepare-upgrade",
  requireAuth,
  prepareUpgrade,
);

export default prepareUpgradeRouter;
