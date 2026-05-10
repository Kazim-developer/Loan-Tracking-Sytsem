import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import AppError from "../utils/customErrorClass.js";
import { prisma } from "../db/prisma.js";

export const getSubscriptionDetail = asyncHandler(
  async (req: Request, res: Response) => {
    const accountId = req.sessionData?.accountId;

    if (!accountId) {
      throw new AppError("unauthorized", 401);
    }

    const subscription = await prisma.subscription.findUnique({
      where: { accountId },
      select: {
        autoRenew: true,
        cancelAt: true,
        endDate: true,
        plan: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!subscription) {
      throw new AppError("no subscription found", 401);
    }

    res.status(200).json({
      message: "success",
      subscription: {
        activeSubscriptionPlan: subscription?.plan?.name ?? null,
        autoRenew: subscription?.autoRenew ?? null,
        cancelAt: subscription?.cancelAt
          ? subscription.cancelAt.toISOString().split("T")[0]
          : null,
        endDate: subscription?.endDate ?? null,
      },
    });
  },
);
