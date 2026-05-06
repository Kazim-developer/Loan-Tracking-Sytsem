"use client";

import PlusIcon from "@/components/icons/PlusIcon";
import FilteringSelection from "@/components/loans/FilteringSelection";
import useShowElementStore from "@/stores/showElement.store";
import { useState, useEffect, useRef } from "react";
import updateQueryParam from "@/utils/updateQueryParam";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoanHandling() {
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const setShowCreateClientModel = useShowElementStore(
    (s) => s.setShowCreateClientModel,
  );

  const router = useRouter();
  const searchParams = useSearchParams();

  const [inputValue, setInputValue] = useState(
    searchParams.get("search") ?? "",
  );

  const handleSearchChange = (value: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      updateQueryParam("search", value, searchParams, router);
    }, 300);
  };

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  return (
    <section className="flex flex-col gap-[2rem]">
      <div className="flex justify-end">
        <button
          className="create-client"
          onClick={() => setShowCreateClientModel(true)}
        >
          <PlusIcon size={"5"} />
          Create
        </button>
      </div>
      <div className="grid grid-cols-4 max-[700px]:grid-cols-3 max-[480px]:grid-cols-1 gap-4 items-end">
        <div className="max-[700px]:col-span-2 max-[480px]:col-span-1">
          <p className="text-[#aaa] ml-2 mb-2">Borrower name</p>
          <input
            className="p-2 border-2 border-[#aaa] rounded-[10px] focus:outline-none w-full"
            type="text"
            placeholder="Search..."
            value={inputValue}
            onChange={(e) => {
              const value = e.target.value;
              setInputValue(value);
              handleSearchChange(value);
            }}
            ref={inputRef}
          />
        </div>

        <FilteringSelection
          options={["ALL", "ACTIVE", "CLOSED"]}
          type="status"
          label="Status"
        />

        <FilteringSelection
          options={["ALL", "ONE-TIME", "INSTALLMENTS"]}
          type="repay_type"
          label="Repay. Type"
        />
        <FilteringSelection
          options={["ALL", "PENDING", "PAID", "PARTIAL", "DUE", "OVERDUE"]}
          type="repay_status"
          label="Repay. Status"
        />
      </div>
    </section>
  );
}
