import { prisma } from "../db/prisma.js";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";

const getCurrentUser = asyncHandler(async (req: any, res: any) => {
  // const user = req.user;
  const accountId = req.sessionData.accountId;

  const userAccount = await prisma.account.findFirst({
    where: { id: accountId },
    include: { user: true },
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
      accountId: userAccount?.id,
      userId: userAccount?.user.id,
      email: userAccount?.user.email,
      name: userAccount?.name,
      imageUrl: userAccount?.imageUrl,
      loginMethod: userAccount?.provider,
      isAuthenticated: true,
      isGoogleLogin: userAccount?.provider === "google" ? true : false,
      activeSubscriptionPlan: subscription?.plan.name,
    },
  });
});

export default getCurrentUser;
