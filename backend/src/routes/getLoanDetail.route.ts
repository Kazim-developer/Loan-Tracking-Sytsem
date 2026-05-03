import express from "express";
import requireAuth from "../middlewares/requireAuth.middleware.js";
import { getLoanDetail } from "../controllers/getLoanDetail.controller.js";

const getLoanDetailRouter = express.Router();

getLoanDetailRouter.get("/loans/:loanId", requireAuth, getLoanDetail);

export default getLoanDetailRouter;
