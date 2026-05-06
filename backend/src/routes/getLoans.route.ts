import express from "express";
import requireAuth from "../middlewares/requireAuth.middleware.js";
import getLoans from "../controllers/getLoans.controller.js";
import { syncLoanState } from "../middlewares/syncLoanState.middleware.js";

const getLoansRouter = express.Router();

getLoansRouter.get("/loans", requireAuth, syncLoanState, getLoans);

export default getLoansRouter;
