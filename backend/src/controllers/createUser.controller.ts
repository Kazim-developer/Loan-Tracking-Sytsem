import { prisma } from "../db/prisma.js";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import bcrypt from "bcrypt";
import AppError from "../utils/customErrorClass.js";

const createUser = asyncHandler(async (req: any, res: any) => {
  const { email, password } = req.body;

  const existingUser = await prisma.user.findUnique({
    where: { email },
    include: { accounts: true },
  });

  const hashedPassword = await bcrypt.hash(password, 12);

  // If user already exists
  if (existingUser) {
    const credentialsAccount = existingUser.accounts.find(
      (acc) => acc.provider === "credentials",
    );

    // User already has credentials login
    if (credentialsAccount) {
      throw new AppError("Email already registered, login instead", 409);
    }

    // User exists but only Google login → add credentials login
    await prisma.account.create({
      data: {
        userId: existingUser.id,
        provider: "credentials",
        providerAccountId: email,
        passwordHash: hashedPassword,
      },
    });

    return res.status(201).json({
      message: "Password login added to your account",
    });
  }

  // If user does not exist → create new user
  const user = await prisma.user.create({
    data: {
      email,
      accounts: {
        create: {
          provider: "credentials",
          providerAccountId: email,
          passwordHash: hashedPassword,
        },
      },
    },
  });

  res.status(201).json({
    message: "User created",
    userId: user.id,
  });
});

export default createUser;
