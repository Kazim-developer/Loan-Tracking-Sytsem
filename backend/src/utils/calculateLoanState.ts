type Loan = {
  totalAmount: any;
  hasInstallments: boolean;
  endDate: Date | null;
  installments: {
    status: "PENDING" | "PARTIAL" | "PAID" | "DUE" | "OVERDUE";
  }[];
  loanPayments: {
    amount: any;
  }[];
};

export function calculateLoanState(loan: Loan) {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 59, 999);

  let status: "ACTIVE" | "CLOSED" = "ACTIVE";

  let repaymentStatus: "PENDING" | "PARTIAL" | "PAID" | "DUE" | "OVERDUE" =
    "PENDING";

  // =============================
  // INSTALLMENT LOAN
  // =============================
  if (loan.hasInstallments) {
    const total = loan.installments.length;

    const paidCount = loan.installments.filter(
      (i) => i.status === "PAID",
    ).length;

    const overdueExists = loan.installments.some((i) => i.status === "OVERDUE");

    const dueExists = loan.installments.some((i) => i.status === "DUE");

    if (paidCount === total && total > 0) {
      status = "CLOSED";
      repaymentStatus = "PAID";
    } else if (overdueExists) {
      repaymentStatus = "OVERDUE";
    } else if (dueExists) {
      repaymentStatus = "DUE";
    } else if (paidCount > 0) {
      repaymentStatus = "PARTIAL";
    }
  }

  // =============================
  // DIRECT LOAN
  // =============================
  else {
    const totalPaid = loan.loanPayments.reduce(
      (sum, p) => sum + Number(p.amount),
      0,
    );

    if (totalPaid >= Number(loan.totalAmount)) {
      status = "CLOSED";
      repaymentStatus = "PAID";
    } else {
      if (loan.endDate) {
        if (loan.endDate < startOfToday) {
          repaymentStatus = "OVERDUE";
        } else if (loan.endDate >= startOfToday && loan.endDate <= endOfToday) {
          repaymentStatus = "DUE";
        } else if (totalPaid > 0) {
          repaymentStatus = "PARTIAL";
        }
      }
    }
  }

  return {
    status,
    repaymentStatus,
  };
}
