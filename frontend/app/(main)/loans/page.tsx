"use client";

import useShowElementStore from "@/stores/showElement.store";
import LoanHandling from "@/components/loans/LoanHandling";
import clsx from "clsx";
import ClientModelContainer from "@/components/clients/ClientModelContainer";
import LoanModelContainer from "@/components/loans/LoanModelContainer";
import LoansTable from "@/components/loans/LoansTable";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import {
  getLoans,
  RepaymentStatus,
  RepaymentType,
  Status,
} from "@/utils/getLoans";
import { updateSchedule } from "@/utils/updateSchedule";
import ProtectedRoute from "@/components/providers/ProtectedRoute";
import PageChanger from "@/components/loans/PageChanger";

export default function LoansPage() {
  const showCreateClientModel = useShowElementStore(
    (s) => s.showCreateClientModel,
  );
  const showCreateLoanModel = useShowElementStore((s) => s.showCreateLoanModel);

  const [page, setPage] = useState<number>(1);
  const limit = 10;

  const searchParams = useSearchParams();

  const borrowerNameFiltering = searchParams.get("search") ?? "";

  const rawStatus = searchParams.get("status");
  const rawRepaymentStatus = searchParams.get("repay_status");
  const rawRepaymentType = searchParams.get("repay_type");

  const statusFilter =
    rawStatus && rawStatus !== "ALL" ? (rawStatus as Status) : undefined;

  const repaymentStatusFilter =
    rawRepaymentStatus && rawRepaymentStatus !== "ALL"
      ? (rawRepaymentStatus as RepaymentStatus)
      : undefined;

  const repaymentTypeFilter =
    rawRepaymentType && rawRepaymentType !== "ALL"
      ? (rawRepaymentType as RepaymentType)
      : undefined;

  const { data } = useQuery({
    queryKey: [
      "loans",
      page,
      borrowerNameFiltering,
      statusFilter,
      repaymentStatusFilter,
      repaymentTypeFilter,
    ],
    queryFn: () =>
      getLoans(
        page,
        limit,
        borrowerNameFiltering || undefined,
        statusFilter,
        repaymentTypeFilter,
        repaymentStatusFilter,
      ),
    keepPreviousData: true,
  });

  useQuery({
    queryKey: ["loan-status"],
    queryFn: updateSchedule,
    refetchOnWindowFocus: false,
  });

  const loans = data?.data || [];
  const pagination = data?.pagination;

  return (
    <ProtectedRoute>
      <section className={clsx("center-section py-[3rem]")}>
        <LoanHandling />

        <LoansTable data={loans} />
        <PageChanger page={page} pagination={pagination} setPage={setPage} />
        {showCreateClientModel && <ClientModelContainer />}
        {showCreateLoanModel && <LoanModelContainer />}
      </section>
    </ProtectedRoute>
  );
}
