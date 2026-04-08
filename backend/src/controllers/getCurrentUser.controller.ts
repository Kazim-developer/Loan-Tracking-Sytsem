import { prisma } from "../db/prisma.js";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";

const getCurrentUser = asyncHandler(async (req: any, res: any) => {
  const user = req.user;
  const accountId = req.sessionData.accountId;

  const userAccount = await prisma.account.findFirst({
    where: { userId: user.id },
  });

  const subscription = await prisma.subscription.findUnique({
    where: { accountId },
    include: {
      plan: true,
    },
  });

  res.status(200).json({
    status: "success",
    user: {
      email: user.email,
      name: user.name,
      imageUrl: user.imageUrl,
      loginMethod: userAccount?.provider,
      isAuthenticated: true,
      isGoogleLogin: userAccount?.provider === "google" ? true : false,
      activeSubscriptionPlan: subscription?.plan.name,
    },
  });
});

export default getCurrentUser;
