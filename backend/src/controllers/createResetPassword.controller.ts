import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import { prisma } from "../db/prisma.js";
import AppError from "../utils/customErrorClass.js";
import bcrypt from "bcrypt";
import crypto from "crypto";

const createResetPassword = asyncHandler(async (req: any, res: any) => {
  const { token, newPassword } = req.body;

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const resetToken = await prisma.passwordResetToken.findUnique({
    where: { token: hashedToken },
  });

  if (!resetToken) {
    throw new AppError("Invalid token", 400);
  }

  if (resetToken.expiresAt < new Date()) {
    throw new AppError("Token expired", 400);
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  await prisma.account.updateMany({
    where: {
      userId: resetToken.userId,
      provider: "credentials",
    },
    data: {
      passwordHash: hashedPassword,
    },
  });

  // Delete token after use
  await prisma.passwordResetToken.delete({
    where: { token: hashedToken },
  });

  res.status(200).json({
    message: "Password reset successful",
  });
});

export default createResetPassword;
