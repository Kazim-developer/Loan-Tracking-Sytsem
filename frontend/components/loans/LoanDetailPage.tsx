"use client";

import { getLoanDetail } from "@/handlers/getLoanDetail";
import { useQuery } from "@tanstack/react-query";
import BackArrow from "../icons/BackArrow";
import { useRouter, useSearchParams } from "next/navigation";
import LoanDetail from "./LoanDetail";
import InstallmentsTable from "./InstallmentsTable";
import FilteringSelection from "./FilteringSelection";
import PageChanger from "./PageChanger";
import { useState } from "react";
import useShowElementStore from "@/stores/showElement.store";
import AddPaymentForm from "./AddPaymentForm";
import LoanPaymentTable from "./LoanPaymentTable";

type LoanDetail = {
  loanId: string;
};

export default function LoanDetailPage({ loanId }: LoanDetail) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState<number>(1);

  const statusFilter = searchParams.get("status") ?? "ALL";

  const showAddPaymentModel = useShowElementStore((s) => s.showAddPaymentModel);
  const setShowAddPaymentModel = useShowElementStore(
    (s) => s.setShowAddPaymentModel,
  );

  const { data } = useQuery({
    queryKey: ["loan", loanId, page, statusFilter],
    queryFn: () => getLoanDetail(loanId, page),
    enabled: loanId ? true : false,
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 30,

    refetchOnWindowFocus: false,
    refetchOnReconnect: false,

    retry: 1,
  });

  if (!data) return <h1>Loading ...</h1>;

  const pagination = data?.pagination;

  const totalPaid =
    data.loan.loanPayments?.reduce((acc, p) => acc + p.amount, 0) ?? 0;

  const isFullyPaid = totalPaid >= data.loan.totalPayable;

  return (
    <section className="center-section my-[3rem]">
      <div className="flex flex-col gap-[2rem]">
        <div
          className="w-[fit-content] flex justify-center items-center gap-2 cursor-pointer"
          onClick={() => router.back()}
        >
          <BackArrow size="5" />
          <span className="">Back to Loans</span>
        </div>
        {!data?.loan?.hasInstallments && (
          <div className="flex justify-end items-center">
            <button
              className="px-3 py-2 bg-black text-white rounded-[10px] disabled:opacity-50"
              onClick={() => setShowAddPaymentModel(true)}
              disabled={isFullyPaid}
            >
              + Add Payment
            </button>
          </div>
        )}
        <LoanDetail data={data} />
      </div>
      {data.loan.hasInstallments ? (
        <div className="flex flex-col gap-[2rem] mt-[2rem]">
          <h1 className=" font-[500] text-2xl">All Installments</h1>
          <div className="flex flex-col gap-[1rem]">
            <div className="flex justify-start">
              <FilteringSelection
                options={["ALL", "PENDING", "PAID", "DUE", "OVERDUE"]}
                type="status"
                label="Status"
              />
            </div>
            <InstallmentsTable data={data.installments} />
          </div>
          <PageChanger page={page} pagination={pagination} setPage={setPage} />
        </div>
      ) : (
        <div className="flex flex-col gap-[2rem] mt-[2rem]">
          <h1 className=" font-[500] text-2xl">All Payments</h1>
          <LoanPaymentTable data={data.loan.loanPayments} />
          <PageChanger page={page} pagination={pagination} setPage={setPage} />
        </div>
      )}
      {showAddPaymentModel && <AddPaymentForm data={data} />}
    </section>
  );
}
