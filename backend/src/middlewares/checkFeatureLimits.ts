import AppError from "../utils/customErrorClass.js";
import { prisma } from "../db/prisma.js";

const checkFeatureLimits = (featureName: string) => {
  return async (req: any, res: any, next: any) => {
    const { accountId } = req.sessionData;

    if (!accountId) {
      return next(new AppError("Account not found in session", 401));
    }

    // Load subscription + plan
    const subscription = await prisma.subscription.findUnique({
      where: { accountId },
      include: { plan: true },
    });

    if (!subscription || !subscription.plan) {
      return next(new AppError("Subscription or plan not found", 403));
    }

    if (subscription.status !== "ACTIVE") {
      return next(new AppError("Subscription inactive", 403));
    }

    const features = subscription.plan.features || {};

    // Check feature flag
    if (!features[featureName]) {
      return next(
        new AppError(
          `Feature "${featureName}" not available in your current plan`,
          403,
        ),
      );
    }

    next();
  };
};

export default checkFeatureLimits;
