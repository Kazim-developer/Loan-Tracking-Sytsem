import AppError from "../utils/customErrorClass.js";
import { prisma } from "../db/prisma.js";
import { Request, Response, NextFunction } from "express";

type FeatureName =
  | "email_reminder"
  | "excel_report"
  | "automatic_reminder"
  | "team_access";

const checkFeatureLimits = (featureName: FeatureName) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    const accountId = req.sessionData?.accountId;

    if (!accountId) {
      return next(new AppError("Account not found in session", 401));
    }

    const subscription = await prisma.subscription.findUnique({
      where: { accountId },
    });

    if (!subscription) {
      return next(new AppError("Subscription not found", 403));
    }

    const feature = await prisma.planFeature.findFirst({
      where: {
        planId: subscription.planId,
        key: featureName,
      },
    });

    if (!feature || !feature.enabled) {
      return next(
        new AppError(
          `Feature "${featureName}" is not available in your current plan`,
          403,
        ),
      );
    }

    next();
  };
};

export default checkFeatureLimits;
