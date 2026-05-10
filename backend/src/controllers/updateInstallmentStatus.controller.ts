import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import AppError from "../utils/customErrorClass.js";
import { prisma } from "../db/prisma.js";

export const updateInstallmentStatus = asyncHandler(
  async (req: Request, res: Response) => {
    const accountId = req?.sessionData?.accountId;

    if (!accountId) {
      throw new AppError("unauthenticated", 403);
    }

    const { installId } = req.params;

    if (!installId) {
      throw new AppError("installment ID is required", 400);
    }

    await prisma.loanInstallment.update({
      where: { id: installId as string },
      data: {
        status: "PAID",
        paidAt: new Date(),
      },
    });

    res.status(200).json({ message: "successful updated" });
  },
);
