import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import AppError from "../utils/customErrorClass.js";
import { prisma } from "../db/prisma.js";

export const addLoanPayment = asyncHandler(
  async (req: Request, res: Response) => {
    const { accountId } = req.sessionData;
    const data = req.body;

    console.log(data);

    if (!accountId) {
      throw new AppError("unauthenticated", 403);
    }

    const { id: loanId, payment } = data;

    if (!loanId) {
      throw new AppError("Loan id is required", 400);
    }

    if (!payment || payment <= 0) {
      throw new AppError("Invalid payment amount", 400);
    }

    const result = await prisma.$transaction(async (tx) => {
      // 1. Fetch loan + payments
      const loan = await tx.loan.findFirst({
        where: {
          id: loanId,
          accountId,
        },
        include: {
          loanPayments: {
            select: { amount: true },
          },
        },
      });

      if (!loan) {
        throw new AppError("Loan not found", 404);
      }

      if (loan.status === "CLOSED") {
        throw new AppError("Loan already closed", 400);
      }

      const totalPaid = loan.loanPayments.reduce(
        (sum, p) => sum + Number(p.amount),
        0,
      );

      const remaining = Number(loan.totalPayable) - totalPaid;

      if (remaining <= 0) {
        throw new AppError("Loan already fully paid", 400);
      }

      if (payment > remaining) {
        throw new AppError("Payment exceeds remaining amount", 400);
      }

      const newPayment = await tx.loanPayment.create({
        data: {
          loanId,
          amount: payment,
          paidAt: new Date(),
        },
      });

      return newPayment;
    });

    res.status(201).json({
      success: true,
      message: "Payment added successfully",
    });
  },
);
