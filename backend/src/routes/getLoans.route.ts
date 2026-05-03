import express from "express";
import requireAuth from "../middlewares/requireAuth.middleware.js";
import getLoans from "../controllers/getLoans.controller.js";
import { updateLoanStatus } from "../middlewares/updateLoanStatus.middleware.js";

const getLoansRouter = express.Router();

getLoansRouter.get("/loans", requireAuth, updateLoanStatus, getLoans);

export default getLoansRouter;
