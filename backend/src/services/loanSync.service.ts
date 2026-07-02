import { prisma } from "../db/prisma.js";
import { calculateLoanState } from "../utils/calculateLoanState.js";

export async function syncLoanStatuses() {
  // -----------------------------
  // Today
  // -----------------------------
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  // =====================================================
  // STEP 1 : UPDATE INSTALLMENT STATUS
  // =====================================================

  await prisma.loanInstallment.updateMany({
    where: {
      status: {
        not: "PAID",
      },
      dueDate: {
        lt: startOfToday,
      },
    },
    data: {
      status: "OVERDUE",
    },
  });

  await prisma.loanInstallment.updateMany({
    where: {
      status: {
        not: "PAID",
      },
      dueDate: {
        gte: startOfToday,
        lte: endOfToday,
      },
    },
    data: {
      status: "DUE",
    },
  });

  // =====================================================
  // STEP 2 : FETCH LOANS
  // =====================================================

  const loans = await prisma.loan.findMany({
    select: {
      id: true,
      accountId: true,

      status: true,
      repaymentStatus: true,

      totalAmount: true,
      hasInstallments: true,
      endDate: true,

      installments: {
        select: {
          status: true,
        },
      },

      loanPayments: {
        select: {
          amount: true,
        },
      },
    },
  });

  // =====================================================
  // STEP 3 : CALCULATE + COMPARE
  // =====================================================

  const loanUpdates = [];

  const usageMap = new Map<string, number>();

  for (const loan of loans) {
    const calculated = calculateLoanState(loan);

    const stateChanged =
      calculated.status !== loan.status ||
      calculated.repaymentStatus !== loan.repaymentStatus;

    if (!stateChanged) continue;

    loanUpdates.push(
      prisma.loan.update({
        where: {
          id: loan.id,
        },
        data: {
          status: calculated.status,
          repaymentStatus: calculated.repaymentStatus,
        },
      }),
    );

    // Loan just became CLOSED
    if (loan.status === "ACTIVE" && calculated.status === "CLOSED") {
      usageMap.set(loan.accountId, (usageMap.get(loan.accountId) ?? 0) + 1);
    }
  }

  // =====================================================
  // STEP 4 : UPDATE LOANS
  // =====================================================

  if (loanUpdates.length > 0) {
    await prisma.$transaction(loanUpdates);
  }

  // =====================================================
  // STEP 5 : UPDATE USAGE
  // =====================================================

  const usageUpdates = [];

  for (const [accountId, count] of usageMap.entries()) {
    usageUpdates.push(
      prisma.usage.update({
        where: {
          accountId,
        },
        data: {
          usedActiveLoans: {
            decrement: count,
          },
        },
      }),
    );
  }

  if (usageUpdates.length > 0) {
    await prisma.$transaction(usageUpdates);
  }

  console.log(`Loan Sync Complete | Updated: ${loanUpdates.length} loan(s)`);
}
