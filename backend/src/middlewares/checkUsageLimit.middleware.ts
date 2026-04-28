import { Request, Response, NextFunction } from "express";
import { prisma } from "../db/prisma.js";
import AppError from "../utils/customErrorClass.js";
import {
  UsageResource,
  usageConfig,
} from "../config/usagePlanMapping.config.js";

export const checkUsageLimit =
  (resource: UsageResource) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    const accountId = req.sessionData?.accountId;

    if (!accountId) {
      throw new AppError("unauthorized", 401);
    }

    const account = await prisma.account.findUnique({
      where: { id: accountId },
      include: {
        usage: true,
        subscription: true,
      },
    });

    if (!account) {
      throw new AppError("account not found", 404);
    }

    const planId = account.subscription?.planId;

    if (!planId) {
      throw new AppError("no active subscription", 403);
    }

    const plan = await prisma.plan.findUnique({
      where: { id: planId },
    });

    if (!plan) {
      throw new AppError("plan not found", 404);
    }

    const config = usageConfig[resource];

    const used = account.usage?.[config.usedField] ?? 0;
    const limit = plan[config.limitField] ?? Infinity;

    if (used >= limit) {
      throw new AppError(`${resource} limit reached`, 400);
    }

    next();
  };
