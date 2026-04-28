"use client";

import useShowElementStore from "@/stores/showElement.store";
import LoanHandling from "@/components/loans/LoanHandling";
import clsx from "clsx";
import ClientModelContainer from "@/components/clients/ClientModelContainer";
import LoanModelContainer from "@/components/loans/LoanModelContainer";
import LoansTable from "@/components/loans/LoansTable";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getLoans } from "@/utils/getLoans";

export default function LoanPage() {
  const showCreateClientModel = useShowElementStore(
    (s) => s.showCreateClientModel,
  );
  const showCreateLoanModel = useShowElementStore((s) => s.showCreateLoanModel);

  const [page, setPage] = useState<number>(1);
  const limit = 10;

  const { data, isLoading } = useQuery({
    queryKey: ["loans", page],
    queryFn: () => getLoans(page, limit),

    // keeps previous page data while new page loads (smooth UX)
    keepPreviousData: true,
  });

  const loans = data?.data || [];
  const pagination = data?.pagination;
  return (
    <section className={clsx("center-section py-[3rem]")}>
      <LoanHandling />

      <LoansTable data={loans} />
      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          disabled={page === 1}
        >
          Prev
        </button>

        <span>
          Page {page} of {pagination?.totalPages || 1}
        </span>

        <button
          onClick={() =>
            setPage((p) =>
              pagination?.totalPages
                ? Math.min(p + 1, pagination.totalPages)
                : p,
            )
          }
          disabled={page === pagination?.totalPages}
        >
          Next
        </button>
      </div>
      {showCreateClientModel && <ClientModelContainer />}
      {showCreateLoanModel && <LoanModelContainer />}
    </section>
  );
}
