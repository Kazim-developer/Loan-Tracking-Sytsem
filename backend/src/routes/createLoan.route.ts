import express from "express";
import requireAuth from "../middlewares/requireAuth.middleware.js";
import createLoan from "../controllers/createLoan.controller.js";
import validateLoanData from "../middlewares/validateLoanData.middleware.js";
import { loanDataSchema } from "../validators/loanDataSchema.validator.js";
import { checkUsageLimit } from "../middlewares/checkUsageLimit.middleware.js";

const createLoanRouter = express.Router();

createLoanRouter.post(
  "/create-loan",
  requireAuth,
  checkUsageLimit("totalLoans"),
  checkUsageLimit("activeLoans"),
  validateLoanData(loanDataSchema),
  createLoan,
);

export default createLoanRouter;
