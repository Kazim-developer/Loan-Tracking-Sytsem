import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import AppError from "../utils/customErrorClass.js";
import { prisma } from "../db/prisma.js";

export const getLoanDetail = asyncHandler(
  async (req: Request, res: Response) => {
    const { accountId } = req?.sessionData;

    if (!accountId) {
      throw new AppError("unauthenticated", 403);
    }

    const { loanId } = req.params;

    const page = Number(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    if (!loanId) {
      throw new AppError("Loan ID is required", 400);
    }

    const loan = await prisma.loan.findUnique({
      where: { id: loanId as string },
      select: {
        id: true,
        totalAmount: true,
        hasInstallments: true,
        totalPayable: true,
        startingDate: true,
        endDate: true,
        repaymentStatus: true,
        interestRate: true,
        interestType: true,
        lastInstallmentDate: true,
        installmentFrequency: true,

        client: {
          select: {
            name: true,
            email: true,
            phone: true,
          },
        },

        loanPayments: {
          select: {
            amount: true,
            paidAt: true,
          },
        },
      },
    });

    if (!loan) {
      throw new AppError("Loan not found", 404);
    }

    const [installments, totalCount] = await Promise.all([
      prisma.loanInstallment.findMany({
        where: { loanId: loanId as string },
        skip,
        take: limit,
        orderBy: {
          dueDate: "asc",
        },
        select: {
          id: true,
          amount: true,
          dueDate: true,
          status: true,
          paidAt: true,
        },
      }),

      prisma.loanInstallment.count({
        where: { loanId: loanId as string },
      }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({
      message: "success",
      loan,
      installments,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages,
      },
    });
  },
);
