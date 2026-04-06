import { prisma } from "../db/prisma.js";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import bcrypt from "bcrypt";
import AppError from "../utils/customErrorClass.js";
import crypto from "crypto";

const createLoginSession = asyncHandler(async (req: any, res: any) => {
  const { email, password } = req.body;

  const account = await prisma.account.findUnique({
    where: {
      provider_providerAccountId: {
        provider: "credentials",
        providerAccountId: email,
      },
    },
    include: {
      user: true,
      subscription: {
        include: {
          plan: true,
        },
      },
    },
  });

  if (!account || !account.passwordHash) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordValid = await bcrypt.compare(password, account.passwordHash);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  // Subscription checks
  if (!account.subscription) {
    // auto-create free subscription
    const freePlan = await prisma.plan.findUnique({
      where: { name: "Free" },
    });

    if (!freePlan) {
      throw new AppError("System error: Free plan missing", 500);
    }

    const subscription = await prisma.subscription.create({
      data: {
        accountId: account.id,
        planId: freePlan.id,
        status: "ACTIVE",
        billingCycle: "MONTHLY",
        startDate: new Date(),
      },
      include: { plan: true },
    });

    account.subscription = subscription;
  }

  if (account.subscription.status !== "ACTIVE") {
    throw new AppError("Subscription is not active", 403);
  }

  if (
    account.subscription.endDate &&
    account.subscription.endDate < new Date()
  ) {
    throw new AppError("Subscription expired", 403);
  }

  // Delete expired sessions
  await prisma.session.deleteMany({
    where: {
      expiresAt: { lt: new Date() },
    },
  });

  // Limit sessions per ACCOUNT
  const sessions = await prisma.session.findMany({
    where: { accountId: account.id },
    orderBy: { createdAt: "asc" },
  });

  if (sessions.length >= 5) {
    await prisma.session.delete({
      where: { id: sessions[0].id },
    });
  }

  const sessionToken = crypto.randomBytes(32).toString("hex");

  const session = await prisma.session.create({
    data: {
      userId: account.userId,
      accountId: account.id,
      sessionToken,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    },
  });

  res.cookie("session_token", sessionToken, {
    httpOnly: true,
    secure: false, // true in production
    sameSite: "lax",
    expires: session.expiresAt,
  });

  res.status(200).json({
    status: "success",
    message: "Logged in successfully",
    email: account.user.email,
    method: account.provider,
    subscription: {
      plan: account.subscription.plan.name,
      status: account.subscription.status,
      limits: {
        maxClients: account.subscription.plan.maxClients,
        maxAccounts: account.subscription.plan.maxAccounts,
      },
    },
  });
});

export default createLoginSession;
