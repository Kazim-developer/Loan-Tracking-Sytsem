import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import AppError from "../utils/customErrorClass.js";
import { sendEmail } from "../services/emailNotifications.service.js";

export const clientEmail = asyncHandler(async (req: Request, res: Response) => {
  const accountId = req.sessionData?.accountId;

  const { email, supportType, message, name } = req.body;

  if (!accountId) {
    throw new AppError("Unauthorized", 403);
  }

  if (!email || !supportType || !message || !name) {
    throw new AppError("All fields are required", 400);
  }

  if (message.length > 500) {
    throw new AppError("Message cannot exceed 500 characters", 400);
  }

  await sendEmail(
    "Loqvio Support <support@send.loqvio.com>",
    "support@loqvio.com",
    `Support Request - ${supportType}`,
    `
    <h2>New Support Request</h2>

    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Support Type:</strong> ${supportType}</p>

    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `,
  );

  res.status(200).json({
    success: true,
    message: "Support request submitted successfully",
  });
});
