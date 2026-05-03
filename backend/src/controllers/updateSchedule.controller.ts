import { Request, Response } from "express";
import { prisma } from "../db/prisma.js";
import AppError from "../utils/customErrorClass.js";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";

export const updateSchedule = asyncHandler(
  async (req: Request, res: Response) => {
    const accountId = req.sessionData?.accountId;

    if (!accountId) {
      throw new AppError("unauthorized", 403);
    }

    const now = new Date();

    await prisma.loanInstallment.updateMany({
      where: {
        loan: { accountId },
        dueDate: { lt: now },
        status: { not: "OVERDUE" },
      },
      data: { status: "OVERDUE" },
    });

    await prisma.loanInstallment.updateMany({
      where: {
        loan: { accountId },
        dueDate: { equals: now },
        status: { not: "DUE" },
      },
      data: { status: "DUE" },
    });

    await prisma.loan.updateMany({
      where: {
        accountId,
        hasInstallments: false,
        endDate: { lt: now },
        repaymentStatus: { not: "OVERDUE" },
      },
      data: { repaymentStatus: "OVERDUE" },
    });

    await prisma.loan.updateMany({
      where: {
        accountId,
        hasInstallments: false,
        endDate: { equals: now },
        repaymentStatus: { not: "DUE" },
      },
      data: { repaymentStatus: "DUE" },
    });

    return res.status(200).json({
      success: true,
      message: "Loan statuses updated",
    });
  },
);
