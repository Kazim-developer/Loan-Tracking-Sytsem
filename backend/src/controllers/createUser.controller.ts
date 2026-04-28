import { prisma } from "../db/prisma.js";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import bcrypt from "bcrypt";
import AppError from "../utils/customErrorClass.js";
import createFreeSubscriptionTransaction from "../utils/createFreeSubscriptionTransaction.js";
import { Request, Response } from "express";

const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 12);

  const existingUser = await prisma.user.findUnique({
    where: { email },
    include: { accounts: true },
  });

  // USER EXISTS → add credentials account + subscription
  if (existingUser) {
    const credentialsAccount = existingUser.accounts.find(
      (acc) => acc.provider === "credentials",
    );

    if (credentialsAccount) {
      throw new AppError("Email already registered, login instead", 409);
    }

    await prisma.$transaction(async (tx) => {
      const account = await tx.account.create({
        data: {
          userId: existingUser.id,
          provider: "credentials",
          providerAccountId: email,
          passwordHash: hashedPassword,
        },
      });

      await createFreeSubscriptionTransaction(tx, account.id);
    });

    return res.status(201).json({
      message: "Password login added with free subscription",
    });
  }

  // NEW USER → create user + account + subscription
  await prisma.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: { email },
    });

    const account = await tx.account.create({
      data: {
        userId: user.id,
        provider: "credentials",
        providerAccountId: email,
        passwordHash: hashedPassword,
      },
    });

    await createFreeSubscriptionTransaction(tx, account.id);
  });

  res.status(201).json({
    message: "User created with free subscription",
  });
});

export default createUser;
