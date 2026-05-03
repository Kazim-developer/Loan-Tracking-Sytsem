import express from "express";
import requireAuth from "../middlewares/requireAuth.middleware.js";
import { addLoanPayment } from "../controllers/addLoanPayment.controller.js";
import validateFormData from "../middlewares/validateFormData.middleware.js";
import { addLoanPaymentSchema } from "../validators/addLoanPayment.validator.js";

const addLoanPaymentRouter = express.Router();

addLoanPaymentRouter.post(
  "/loanPayment",
  requireAuth,
  validateFormData(addLoanPaymentSchema),
  addLoanPayment,
);

export default addLoanPaymentRouter;
