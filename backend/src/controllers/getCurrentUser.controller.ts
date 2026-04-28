import { Request, Response } from "express";
import { prisma } from "../db/prisma.js";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";

const getCurrentUser = asyncHandler(async (req: Request, res: Response) => {
  const accountId = req.sessionData?.accountId;

  if (!accountId) {
    return res.status(401).json({
      status: "unauthorized",
    });
  }

  const [account, subscription] = await prisma.$transaction([
    prisma.account.findUnique({
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
      },
    }),

    prisma.subscription.findUnique({
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
    }),
  ]);

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
      activeSubscriptionPlan: subscription?.plan?.name ?? null,
      autoRenew: subscription?.autoRenew ?? null,
      cancelAt: subscription?.cancelAt
        ? subscription.cancelAt.toISOString().split("T")[0]
        : null,
      endDate: subscription?.endDate ?? null,
    },
  });
});

export default getCurrentUser;
