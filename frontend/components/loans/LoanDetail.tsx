"use client";

import { formatCurrency } from "@/utils/formatCurrency";
import { StatusBadge } from "./StatusBadge";

export default function LoanDetail({ data }) {
  let totalPaid;

  if (data.loan.hasInstallments) {
    totalPaid =
      data.installments.reduce((acc, p) => {
        return p.status === "PAID" ? acc + p.amount : acc;
      }, 0) ?? 0;
  } else {
    totalPaid =
      data.loan.loanPayments?.reduce((acc, p) => acc + p.amount, 0) ?? 0;
  }

  const totalPayable = data.loan.totalPayable;
  const remaining = Math.max(totalPayable - totalPaid, 0);

  const progress = Math.min((totalPaid / totalPayable) * 100, 100);

  return (
    <div className="p-6 rounded-2xl bg-white shadow-md border border-gray-100 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-[500] tracking-wide text-gray-900">
          {data.loan.client.name.toUpperCase()}
        </h1>

        <StatusBadge status={data.loan.repaymentStatus} size="lg" />
      </div>

      {/* Date */}
      <div className="text-sm text-gray-500">
        Starting date:{" "}
        <span className="text-gray-700 font-medium">
          {new Date(data.loan.startingDate).toLocaleDateString()}
        </span>
      </div>

      <div className="text-sm text-gray-500">
        Interest:{" "}
        <span className="text-gray-700 font-medium">
          {data.loan.interestRate + "%" + " — " + data.loan.interestType}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Repayment Progress</span>
          <span className="font-medium text-green-600">
            {progress.toFixed(1)}%
          </span>
        </div>

        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2  gap-4 pt-2">
        <div className="p-3 rounded-lg bg-gray-50">
          <span className="text-xs text-gray-500">Loan Amount</span>
          <h1 className="text-2xl font-[500] text-blue-600">
            {formatCurrency(data.loan.totalAmount)}
          </h1>
        </div>

        <div className="p-3 rounded-lg bg-gray-50">
          <span className="text-xs text-gray-500">Total Payable</span>
          <h1 className="text-2xl font-[500] text-purple-600">
            {formatCurrency(totalPayable)}
          </h1>
        </div>

        <div className="p-3 rounded-lg bg-gray-50">
          <span className="text-xs text-gray-500">Paid Amount</span>
          <h1 className="text-2xl font-[500] text-green-600">
            {formatCurrency(totalPaid)}
          </h1>
        </div>

        <div className="p-3 rounded-lg bg-gray-50">
          <span className="text-xs text-gray-500">Remaining</span>
          <h1 className="text-2xl font-[500] text-red-600">
            {formatCurrency(remaining)}
          </h1>
        </div>
      </div>
    </div>
  );
}
