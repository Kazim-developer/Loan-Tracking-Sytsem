import { Request, Response } from "express";
import asyncHandler from "../middlewares/asyncHandler.middleware.js";
import AppError from "../utils/customErrorClass.js";
import { prisma } from "../db/prisma.js";
import { toDate } from "../utils/toDate.js";

const createLoan = asyncHandler(async (req: Request, res: Response) => {
  const { startingDate, endDate, ...rest } = req.body;
  const accountId = req.sessionData?.accountId;

  const result = await prisma.$transaction(async (tx) => {
    const user = await tx.account.findUnique({
      where: { id: accountId },
      include: {
        usage: true,
        subscription: {
          include: {
            plan: true,
          },
        },
      },
    });

    if (!user?.subscription?.plan || !user?.usage) {
      throw new AppError("Subscription not found", 403);
    }

    const { subscription, usage } = user;

    // ✅ limits
    if (
      subscription.plan.maxActiveLoans !== null &&
      usage.usedActiveLoans >= subscription.plan.maxActiveLoans
    ) {
      throw new AppError("Active loan limit reached", 403);
    }

    if (
      subscription.plan.maxTotalLoans !== null &&
      usage.usedTotalLoans >= subscription.plan.maxTotalLoans
    ) {
      throw new AppError("Total loan limit reached", 403);
    }

    let loan;

    const start = toDate(startingDate);

    if (!rest.hasInstallments) {
      const end = toDate(endDate);

      if (start.getTime() >= end.getTime()) {
        throw new AppError("End date must be after start date", 403);
      }
      loan = await tx.loan.create({
        data: {
          ...rest,
          accountId,
          startingDate: start,
          endDate: end,
          status: "ACTIVE",
        },
      });
    } else {
      const { installmentData, ...loanData } = rest;
      const {
        installmentSchedule,
        firstInstallmentDate,
        lastInstallmentDate,
        ...installments
      } = installmentData;

      const firstInstallment = toDate(firstInstallmentDate);
      const lastInstallment = toDate(lastInstallmentDate);

      if (installments.installmentFrequency === "WEEKLY") {
        const diffDays =
          (lastInstallment.getTime() - firstInstallment.getTime()) /
          (1000 * 60 * 60 * 24);

        if (diffDays < 7) {
          throw new AppError(
            "Weekly installment dates require at least 7 days gap",
            403,
          );
        }
      }
      if (installments.installmentFrequency === "MONTHLY") {
        const minDate = firstInstallment;
        minDate.setMonth(minDate.getMonth() + 1);

        if (lastInstallment < minDate) {
          throw new AppError(
            "Monthly installment dates require at least 1 month gap",
            403,
          );
        }
      }

      if (!installmentSchedule?.length) {
        throw new AppError("Invalid installment schedule", 400);
      }

      loan = await tx.loan.create({
        data: {
          ...loanData,
          ...installments,
          accountId,
          firstInstallmentDate: firstInstallment,
          lastInstallmentDate: lastInstallment,
          startingDate: start,
          status: "ACTIVE",
        },
      });

      await tx.loanInstallment.createMany({
        data: installmentSchedule.map((inst) => ({
          loanId: loan.id,
          ...inst,
        })),
      });
    }

    await tx.usage.update({
      where: { accountId },
      data: {
        usedTotalLoans: { increment: 1 },
        usedActiveLoans: { increment: 1 },
      },
    });

    return loan;
  });

  res.status(201).json({
    message: "loan is created",
    result,
  });
});

export default createLoan;
