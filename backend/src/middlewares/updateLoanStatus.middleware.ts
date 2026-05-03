import { NextFunction, Request, Response } from "express";
import { prisma } from "../db/prisma.js";
import asyncHandler from "./asyncHandler.middleware.js";

export const updateLoanStatus = asyncHandler(
  async (req: Request, _: Response, next: NextFunction) => {
    const { accountId } = req.sessionData;

    const loans = await prisma.loan.findMany({
      where: {
        accountId,
        status: { not: "CLOSED" },
      },
      select: {
        id: true,
        totalAmount: true,
        hasInstallments: true,
        installments: {
          select: { status: true },
        },
        loanPayments: {
          select: { amount: true },
        },
      },
    });

    const updates: {
      id: string;
      status: "ACTIVE" | "CLOSED";
      repaymentStatus: "PAID" | "PARTIAL";
    }[] = [];

    for (let loan of loans) {
      // ===== CASE 1: WITH INSTALLMENTS =====
      if (loan.hasInstallments) {
        const total = loan.installments.length;

        if (total === 0) continue;

        const paidCount = loan.installments.filter(
          (i) => i.status === "PAID",
        ).length;

        if (paidCount === total) {
          // FULLY PAID
          updates.push({
            id: loan.id,
            status: "CLOSED",
            repaymentStatus: "PAID",
          });
        } else if (paidCount > 0) {
          // PARTIAL
          updates.push({
            id: loan.id,
            status: "ACTIVE",
            repaymentStatus: "PARTIAL",
          });
        }
      }

      // ===== CASE 2: WITHOUT INSTALLMENTS =====
      else {
        const totalPaid = loan.loanPayments.reduce(
          (sum, p) => sum + Number(p.amount),
          0,
        );

        if (totalPaid >= Number(loan.totalAmount)) {
          // FULL
          updates.push({
            id: loan.id,
            status: "CLOSED",
            repaymentStatus: "PAID",
          });
        } else if (totalPaid > 0) {
          // PARTIAL
          updates.push({
            id: loan.id,
            status: "ACTIVE",
            repaymentStatus: "PARTIAL",
          });
        }
      }
    }

    // Execute updates (batch but per-row data differs → transaction)
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

    next();
  },
);
