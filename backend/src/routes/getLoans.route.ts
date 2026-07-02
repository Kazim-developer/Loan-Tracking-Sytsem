import express from "express";
import requireAuth from "../middlewares/requireAuth.middleware.js";
import getLoans from "../controllers/getLoans.controller.js";

const getLoansRouter = express.Router();

getLoansRouter.get("/loans", requireAuth, getLoans);

export default getLoansRouter;
