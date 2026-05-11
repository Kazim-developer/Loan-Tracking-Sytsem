import express from "express";
import passport from "passport";
import googleRouter from "./routes/googleAuth.route.js";
import cors from "cors";

import "./middlewares/googleAuth.middleware.js";

import errorHandler from "./middlewares/globalErrorHandler.middleware.js";
import signupRouter from "./routes/signup.route.js";
import cookieParser from "cookie-parser";
import loginRouter from "./routes/login.route.js";
import forgotPasswordRouter from "./routes/forgotPassword.route.js";
import resetPasswordRouter from "./routes/resetPassword.route.js";
import currentUserRouter from "./routes/currentUser.route.js";
import logoutRouter from "./routes/logout.route.js";
import { paddleWebhookHandler } from "./controllers/paddleWebhookHandler.controller.js";
import cancelSubscriptionRouter from "./routes/cancelSubscription.route.js";
import createClientRouter from "./routes/createClient.route.js";
import searchClientsRouter from "./routes/searchClients.route.js";
import createLoanRouter from "./routes/createLoan.route.js";
import getLoansRouter from "./routes/getLoans.route.js";
import getLoanDetailRouter from "./routes/getLoanDetail.route.js";
import updateInstallmentStatusRouter from "./routes/updateInstallmentStatus.route.js";
import addLoanPaymentRouter from "./routes/addLoanPayment.route.js";
import getStatsRouter from "./routes/getStats.route.js";
import supportRouter from "./routes/support.route.js";
import subscriptionDetailRouter from "./routes/subscriptionDetail.route.js";
import prepareUpgradeRouter from "./routes/prepareUpgrade.route.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://loqvio.com",
      "https://www.loqvio.com",
    ],
    credentials: true,
  }),
);

app.post(
  "/paddle-webhook",
  express.raw({ type: "application/json" }),
  paddleWebhookHandler,
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("backend is working");
});

// auth routes
app.use(googleRouter);
app.use("/auth", signupRouter);
app.use("/auth", loginRouter);
app.use("/auth", forgotPasswordRouter);
app.use("/auth", resetPasswordRouter);
app.use("/auth", logoutRouter);

// /me route
app.use(currentUserRouter);
app.use(subscriptionDetailRouter);

// cancel subscription route
app.use(cancelSubscriptionRouter);
app.use(prepareUpgradeRouter);

// client routes
app.use(createClientRouter);
app.use(searchClientsRouter);

// loan routes
app.use(createLoanRouter);
app.use(getLoansRouter);
app.use(getLoanDetailRouter);
app.use(updateInstallmentStatusRouter);
app.use(addLoanPaymentRouter);
app.use(getStatsRouter);

// support
app.use(supportRouter);

// global error middleware
app.use(errorHandler);

export default app;
