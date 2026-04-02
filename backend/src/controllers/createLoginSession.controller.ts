import { prisma } from "../db/prisma.js";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import bcrypt from "bcrypt";
import AppError from "../utils/customErrorClass.js";
import crypto from "crypto";

const createLoginSession = asyncHandler(async (req: any, res: any) => {
  const { email, password } = req.body;

  const account = await prisma.account.findFirst({
    where: {
      provider: "credentials",
      providerAccountId: email,
    },
    include: {
      user: true,
    },
  });

  if (!account || !account.passwordHash) {
    throw new AppError("Invalid email or password", 401);
  }

  const isPasswordValid = await bcrypt.compare(password, account.passwordHash);

  if (!isPasswordValid) {
    throw new AppError("Invalid email or password", 401);
  }

  // Delete expired sessions
  await prisma.session.deleteMany({
    where: {
      expiresAt: {
        lt: new Date(),
      },
    },
  });

  // Limit sessions per user
  const sessions = await prisma.session.findMany({
    where: { userId: account.userId },
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
      sessionToken,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
    },
  });

  res.cookie("session_token", sessionToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    expires: session.expiresAt,
  });

  res.status(200).json({
    status: "success",
    message: "Logged in successfully",
    email: account.user.email,
    method: account.provider,
  });
});

export default createLoginSession;
