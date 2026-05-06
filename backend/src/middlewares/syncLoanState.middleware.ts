import { Request, Response, NextFunction } from "express";
import asyncHandler from "./asyncHandler.middleware.js";
import { prisma } from "../db/prisma.js";
import { start } from "node:repl";

export const syncLoanState = asyncHandler(
  async (req: Request, _: Response, next: NextFunction) => {
    const { accountId } = req.sessionData;
    // const now = new Date();
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    // ===== STEP 1: UPDATE INSTALLMENT TIME-BASED STATUS =====
    await prisma.loanInstallment.updateMany({
      where: {
        loan: { accountId },
        status: { not: "PAID" }, // 👈 IMPORTANT
        dueDate: { lt: startOfToday },
      },
      data: { status: "OVERDUE" },
    });

    await prisma.loanInstallment.updateMany({
      where: {
        loan: { accountId },
        status: { not: "PAID" },
        dueDate: {
          gte: startOfToday,
          lte: endOfToday,
        },
      },
      data: { status: "DUE" },
    });

    // ===== STEP 2: FETCH LOANS =====
    const loans = await prisma.loan.findMany({
      where: { accountId },
      select: {
        id: true,
        status: true,
        totalAmount: true,
        hasInstallments: true,
        endDate: true,
        installments: {
          select: { status: true },
        },
        loanPayments: {
          select: { amount: true },
        },
      },
    });

    const updates: any[] = [];
    const newlyClosedLoans: string[] = [];

    for (const loan of loans) {
      let newStatus: "ACTIVE" | "CLOSED" = "ACTIVE";
      let repaymentStatus: "PENDING" | "PARTIAL" | "PAID" | "DUE" | "OVERDUE" =
        "PENDING";

      // ===== CASE 1: INSTALLMENTS =====
      if (loan.hasInstallments) {
        const total = loan.installments.length;
        const paidCount = loan.installments.filter(
          (i) => i.status === "PAID",
        ).length;

        const overdueExists = loan.installments.some(
          (i) => i.status === "OVERDUE",
        );

        const dueExists = loan.installments.some((i) => i.status === "DUE");

        if (paidCount === total && total > 0) {
          newStatus = "CLOSED";
          repaymentStatus = "PAID";
        } else if (overdueExists) {
          repaymentStatus = "OVERDUE";
        } else if (dueExists) {
          repaymentStatus = "DUE";
        } else if (paidCount > 0) {
          repaymentStatus = "PARTIAL";
        }
      }

      // ===== CASE 2: DIRECT LOANS =====
      else {
        const totalPaid = loan.loanPayments.reduce(
          (sum, p) => sum + Number(p.amount),
          0,
        );

        if (totalPaid >= Number(loan.totalAmount)) {
          newStatus = "CLOSED";
          repaymentStatus = "PAID";
        } else {
          if (loan.endDate < startOfToday) {
            repaymentStatus = "OVERDUE";
          } else if (
            loan.endDate >= startOfToday &&
            loan.endDate <= endOfToday
          ) {
            repaymentStatus = "DUE";
          } else if (totalPaid > 0) {
            repaymentStatus = "PARTIAL";
          }
        }
      }

      // ===== TRACK NEWLY CLOSED =====
      if (newStatus === "CLOSED" && loan.status !== "CLOSED") {
        newlyClosedLoans.push(loan.id);
      }

      updates.push({
        id: loan.id,
        status: newStatus,
        repaymentStatus,
      });
    }

    // ===== APPLY UPDATES =====
    if (updates.length > 0) {
      await prisma.$transaction(
        updates.map((u) =>
          prisma.loan.update({
            where: { id: u.id },
            data: {
              status: u.status,
              repaymentStatus: u.repaymentStatus,
            },
          }),
        ),
      );
    }

    // ===== USAGE UPDATE =====
    if (newlyClosedLoans.length > 0) {
      await prisma.usage.update({
        where: { accountId },
        data: {
          usedActiveLoans: {
            decrement: newlyClosedLoans.length,
          },
        },
      });
    }

    next();
  },
);
