import { Request, Response } from "express";
import { prisma } from "../db/prisma.js";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import { sendEmail } from "../services/emailNotifications.service.js";
import crypto from "crypto";

const createForgotPassword = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;

    const user = await prisma.user.findFirst({ where: { email } });

    if (!user) {
      return res.status(200).json({
        message: "If an account exists, a reset link has been sent",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    await prisma.passwordResetToken.deleteMany({
      where: { userId: user.id },
    });

    await prisma.passwordResetToken.create({
      data: {
        token: hashedToken,
        userId: user.id,
        expiresAt: new Date(Date.now() + 1000 * 60 * 15),
      },
    });

    await sendEmail(
      user.email,
      "onboarding@resend.dev",
      "Reset your password",
      `
    <h1>Reset link will be invalid after 15 minutes</h1>
    <p>Click the link below to reset your password:</p>
    <a href="http://localhost:3000/reset-password?token=${token}">
      Reset Password
    </a>
  `,
    );

    res.status(200).json({
      message: "a reset link has been sent",
    });
  },
);

export default createForgotPassword;
