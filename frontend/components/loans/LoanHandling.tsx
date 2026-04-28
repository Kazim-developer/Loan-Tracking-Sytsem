"use client";

import PlusIcon from "@/components/icons/PlusIcon";
import FilteringSelection from "@/components/loans/FilteringSelection";
import useShowElementStore from "@/stores/showElement.store";
import { useEffect, useRef } from "react";

export default function LoanHandling() {
  const inputRef = useRef(null);

  const setShowCreateLoanModel = useShowElementStore(
    (s) => s.setShowCreateLoanModel,
  );

  const setShowCreateClientModel = useShowElementStore(
    (s) => s.setShowCreateClientModel,
  );

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  return (
    <section className="grid grid-cols-4 gap-[1rem]">
      <input
        className="col-span-2 p-2 border-2 border-[#aaa] rounded-[10px] focus:outline-none"
        type="text"
        placeholder="Search by client name or loan ID..."
        ref={inputRef}
      />
      <FilteringSelection options={["All", "Paid", "Pending", "Partial"]} />
      <button
        className="create-client"
        onClick={() => setShowCreateClientModel(true)}
      >
        <PlusIcon size={"5"} />
        Create Loan
      </button>
    </section>
  );
}
