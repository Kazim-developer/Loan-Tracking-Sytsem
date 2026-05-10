"use client";

import { formatCurrency } from "@/utils/formatCurrency";
import { StatusBadge } from "./StatusBadge";
import { toTitleCase } from "@/utils/toTitleCase";
import { getLoanDuration } from "@/utils/getLoanDuration";
import { LoanPayment } from "./LoanDetailPage";

export type InstallmentPayment = {
  amount: number;
  status: string;
};

export default function LoanDetail({ data }: { data: any }) {
  let totalPaid;

  if (data.loan.hasInstallments) {
    totalPaid =
      data.installments.reduce((acc: number, p: InstallmentPayment) => {
        return p.status === "PAID" ? acc + p.amount : acc;
      }, 0) ?? 0;
  } else {
    totalPaid =
      data.loan.loanPayments?.reduce(
        (acc: number, p: LoanPayment) => acc + p.amount,
        0,
      ) ?? 0;
  }

  const totalPayable = data.loan.totalPayable;
  const remaining = Math.max(totalPayable - totalPaid, 0);

  const progress = Math.min((totalPaid / totalPayable) * 100, 100);

  return (
    <div className="relative p-6 rounded-2xl bg-white shadow-md border border-gray-100 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-xl font-[500] text-gray-900">
          {toTitleCase(data.loan.client.name)}
        </h1>

        <div className="mt-2 text-sm flex gap-2 max-[550px]:flex-col">
          <div className="flex gap-2">
            <span className="font-medium">Email:</span>
            <span className="text-gray-500">{data.loan.client.email}</span>
          </div>
          <div className="flex gap-2">
            <span className="font-medium">Ph:</span>
            <span className="text-gray-500">
              {data.loan.client.phone ?? "not given"}
            </span>
          </div>
        </div>
      </div>
      <div className="absolute top-6 right-6">
        <StatusBadge status={data.loan.repaymentStatus} size="lg" />
      </div>

      {/* LOAN DETAILS (NEW SECTION) */}
      <div className="grid grid-cols-4 max-[850px]:grid-cols-2 max-[450px]:grid-cols-1 gap-4 text-sm rounded-xl">
        <div className="bg-gray-50 rounded-xl p-3 border">
          <span className="text-gray-500">Starting Date</span>
          <p className="font-medium text-gray-800">
            {new Date(data.loan.startingDate).toLocaleDateString()}
          </p>
        </div>
        <div className="bg-gray-50 rounded-xl p-3 border">
          <span className="text-gray-500">Annual Interest %</span>
          <p className="font-medium text-gray-800">
            {data.loan.interestRate
              ? `${data.loan.interestRate}% — ${data.loan.interestType.toLowerCase().slice(0, 3)}`
              : "-"}
          </p>
        </div>
        <div className="bg-gray-50 rounded-xl p-3 border">
          <span className="text-gray-500">
            {data.loan.hasInstallments ? "Last Ins. Date" : "End Date"}
          </span>
          <p className="font-medium text-gray-800">
            {data.loan.hasInstallments
              ? `${new Date(data.loan.lastInstallmentDate).toLocaleDateString()}`
              : `${new Date(data.loan.endDate).toLocaleDateString()}`}
          </p>
        </div>
        <div className="bg-gray-50 rounded-xl p-3 border">
          <span className="text-gray-500">Duration</span>
          <p className="font-medium text-gray-800">
            {data.loan.hasInstallments
              ? `${getLoanDuration(data.loan.startingDate, data.loan.lastInstallmentDate)}`
              : `${getLoanDuration(data.loan.startingDate, data.loan.endDate)}`}
          </p>
        </div>
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
      <div className="grid grid-cols-2 gap-4 pt-2 max-[700px]:grid-cols-1">
        <div className="p-3 rounded-lg bg-gray-50 w-full min-w-0">
          <span className="text-xs text-gray-500">Loan Amount</span>
          <h1 className="text-2xl font-[500] text-blue-600 truncate">
            {formatCurrency(data.loan.totalAmount)}
          </h1>
        </div>

        <div className="p-3 rounded-lg bg-gray-50 w-full min-w-0">
          <span className="text-xs text-gray-500">Total Payable</span>
          <h1 className="text-2xl font-[500] text-purple-600 truncate">
            {formatCurrency(totalPayable)}
          </h1>
        </div>

        <div className="p-3 rounded-lg bg-gray-50 w-full min-w-0">
          <span className="text-xs text-gray-500">Paid Amount</span>
          <h1 className="text-2xl font-[500] text-green-600 truncate">
            {formatCurrency(totalPaid)}
          </h1>
        </div>

        <div className="p-3 rounded-lg bg-gray-50 w-full min-w-0">
          <span className="text-xs text-gray-500">Remaining</span>
          <h1 className="text-2xl font-[500] text-red-600 truncate">
            {formatCurrency(remaining)}
          </h1>
        </div>
      </div>
    </div>
  );
}
