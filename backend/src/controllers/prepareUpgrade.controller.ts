import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import { prisma } from "../db/prisma.js";
import { paddle } from "../lib/paddle.js";

export const prepareUpgrade = asyncHandler(async (req, res) => {
  const accountId = req.sessionData?.accountId;

  const subscription = await prisma.subscription.findUniqueOrThrow({
    where: { accountId },
  });

  // only if cancellation pending
  if (subscription.cancelAt) {
    await paddle.subscriptions.update(subscription.providerSubscriptionId!, {
      scheduledChange: null,
    });

    await prisma.subscription.update({
      where: { accountId },
      data: {
        autoRenew: true,
        cancelAt: null,
      },
    });
  }

  res.status(200).json({
    success: true,
  });
});
