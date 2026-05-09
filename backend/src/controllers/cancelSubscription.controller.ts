import { paddle } from "../lib/paddle.js";
import { prisma } from "../db/prisma.js";
import AppError from "../utils/customErrorClass.js";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import { Request, Response } from "express";

export const cancelSubscription = asyncHandler(
  async (req: Request, res: Response) => {
    const accountId = req.sessionData?.accountId;

    if (!accountId) {
      throw new AppError("account id required to cancel subscription", 401);
    }

    const subscription = await prisma.subscription.findUniqueOrThrow({
      where: { accountId },
    });

    if (!subscription.autoRenew) {
      throw new AppError(
        `subscription cancellation is already scheduled on ${subscription.endDate}`,
        403,
      );
    }

    await paddle.subscriptions.cancel(subscription.providerSubscriptionId!, {
      effectiveFrom: "next_billing_period",
    });

    await prisma.subscription.update({
      where: {
        accountId,
      },
      data: {
        autoRenew: false,
        cancelAt: subscription.endDate,
      },
    });

    res.status(200).json({
      message: "Cancellation scheduled successfully",
    });
  },
);
