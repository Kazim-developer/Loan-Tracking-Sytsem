import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import AppError from "../utils/customErrorClass.js";
import { prisma } from "../db/prisma.js";
import { redis } from "../config/redis.js";

export const getSubscriptionDetail = asyncHandler(
  async (req: Request, res: Response) => {
    const accountId = req.sessionData?.accountId;

    if (!accountId) {
      throw new AppError("unauthorized", 401);
    }

    const cacheKey = `subscription-plan:${accountId}`;
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
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

    const response = {
      message: "success",
      subscription: {
        activeSubscriptionPlan: subscription?.plan?.name ?? null,
        autoRenew: subscription?.autoRenew ?? null,
        cancelAt: subscription?.cancelAt
          ? subscription.cancelAt.toISOString().split("T")[0]
          : null,
        endDate: subscription?.endDate ?? null,
      },
    };

    await redis.set(cacheKey, JSON.stringify(response));
    await redis.expire(cacheKey, 300);

    res.status(200).json(response);
  },
);
