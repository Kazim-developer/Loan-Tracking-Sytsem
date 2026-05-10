import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import { prisma } from "../db/prisma.js";
import AppError from "../utils/customErrorClass.js";

export const getStats = asyncHandler(async (req: Request, res: Response) => {
  const accountId = req.sessionData?.accountId;

  if (!accountId) {
    throw new AppError("not authenticated", 403);
  }

  const totalLoanAmount = await prisma.loan.aggregate({
    where: { accountId },
    _sum: { totalAmount: true },
  });

  const totalPayableAmount = await prisma.loan.aggregate({
    where: { accountId },
    _sum: { totalPayable: true },
  });

  const totalInstallmentsPaid = await prisma.loanInstallment.aggregate({
    where: { loan: { accountId }, status: "PAID" },
    _sum: { amount: true },
  });

  const totalPaidLoanPayments = await prisma.loanPayment.aggregate({
    where: { loan: { accountId, hasInstallments: false } },
    _sum: { amount: true },
  });

  const totalPaidAmount =
    (totalInstallmentsPaid._sum.amount ?? 0) +
    (totalPaidLoanPayments._sum.amount ?? 0);

  // total overdue calculation

  const installmentOverdueAmount = await prisma.loanInstallment.aggregate({
    where: { loan: { accountId }, status: "OVERDUE" },
    _sum: { amount: true },
  });

  const overdueLoans = await prisma.loan.findMany({
    where: {
      accountId,
      hasInstallments: false,
      endDate: {
        lt: new Date(),
      },
    },
    select: {
      id: true,
      totalPayable: true,
      loanPayments: {
        select: { amount: true },
      },
    },
  });

  let nonInstallmentOverdue = 0;

  for (const loan of overdueLoans) {
    const paid = loan.loanPayments.reduce((acc, p) => acc + p.amount, 0);

    const remaining = loan.totalPayable - paid;

    if (remaining > 0) {
      nonInstallmentOverdue += remaining;
    }
  }

  const totalOverdueAmount =
    (installmentOverdueAmount._sum.amount ?? 0) + nonInstallmentOverdue;

  const usage = await prisma.usage.findUnique({
    where: { accountId },
    select: { usedTotalLoans: true, usedActiveLoans: true, usedClients: true },
  });

  const currentPlan = await prisma.account.findUnique({
    where: { id: accountId },
    select: {
      subscription: {
        select: {
          plan: {
            select: {
              maxTotalLoans: true,
              maxActiveLoans: true,
              maxClients: true,
            },
          },
        },
      },
    },
  });

  res.status(200).json({
    message: "success",
    stats: {
      totalLoanAmount: totalLoanAmount._sum.totalAmount,
      totalPayableAmount: totalPayableAmount._sum.totalPayable,
      totalPaidAmount,
      totalOverdueAmount,
    },
    usage: {
      totalLoans: {
        used: usage?.usedTotalLoans,
        limit: currentPlan?.subscription?.plan.maxTotalLoans,
      },
      activeLoans: {
        used: usage?.usedActiveLoans,
        limit: currentPlan?.subscription?.plan.maxActiveLoans,
      },
      clients: {
        used: usage?.usedClients,
        limit: currentPlan?.subscription?.plan.maxClients,
      },
    },
  });
});
