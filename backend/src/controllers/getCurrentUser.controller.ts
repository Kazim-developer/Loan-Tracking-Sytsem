import { Request, Response } from "express";
import { prisma } from "../db/prisma.js";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import AppError from "../utils/customErrorClass.js";

const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
  const accountId = req.sessionData?.accountId;

  if (!accountId) {
    throw new AppError("unauthorized", 401);
  }

  const account = await prisma.account.findUnique({
    where: { id: accountId },
    select: {
      id: true,
      name: true,
      imageUrl: true,
      provider: true,
      user: {
        select: {
          id: true,
          email: true,
        },
      },
      subscription: { select: { plan: { select: { name: true } } } },
    },
  });

  if (!account) {
    return res.status(401).json({
      status: "fail",
      message: "Unauthorized",
    });
  }

  res.status(200).json({
    status: "success",
    user: {
      accountId: account.id,
      userId: account.user.id,
      email: account.user.email,
      name: account.name,
      imageUrl: account.imageUrl,
      loginMethod: account.provider,
      isAuthenticated: true,
      isGoogleLogin: account.provider === "google",
      subscriptionPlan: account.subscription?.plan.name,
    },
  });
});

export default getCurrentUser;
